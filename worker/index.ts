/**
 * Cloudflare Worker for ttechsolutionz.dev
 *
 * Static pages and files are served straight from ./dist (see wrangler.jsonc).
 * This Worker only handles the API the site calls:
 *   GET  /api/health      – status check
 *   POST /api/chat        – AI consultant (Gemini, with built-in fallback)
 *   POST /api/inquiries   – contact form & callback requests
 *
 * Secrets are set in the Cloudflare dashboard (Settings → Variables & Secrets):
 *   GEMINI_API_KEY                         – AI chat
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID  – instant inquiry alerts on Telegram
 *   RESEND_API_KEY (+ RESEND_FROM)         – inquiry emails via resend.com
 */
import { advisorReply, SYSTEM_PROMPT } from '../chat-advisor';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  GEMINI_API_KEY?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  INQUIRY_TO?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/* ------------------------------------------------------------------ */
/* Spam protection: per-IP limit (per Worker instance)                  */
/* ------------------------------------------------------------------ */

const hits = new Map<string, number[]>();
function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

/* ------------------------------------------------------------------ */
/* /api/chat                                                           */
/* ------------------------------------------------------------------ */

type Turn = { role: string; content: string };

const GEMINI_MODELS = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];

async function askGemini(key: string, history: Turn[]): Promise<string | null> {
  const firstUser = history.findIndex((m) => m.role === 'user');
  const contents = history.slice(Math.max(firstUser, 0)).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));
  const deadline = Date.now() + 14000;
  for (const model of GEMINI_MODELS) {
    const remaining = deadline - Date.now();
    if (remaining < 2000) break;
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.5, maxOutputTokens: 2048 },
        }),
        signal: AbortSignal.timeout(Math.min(9000, remaining)),
      });
      if (res.status === 401 || res.status === 403) return null; // bad key: don't try other models
      if (!res.ok) continue;
      const data: any = await res.json();
      const text = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || '').join('').trim();
      if (text) return text;
    } catch {
      // timeout / network: try the next model
    }
  }
  return null;
}

async function handleChat(request: Request, env: Env, ip: string): Promise<Response> {
  if (rateLimited(`chat:${ip}`, 40, 10 * 60 * 1000)) {
    return json({ error: 'Too many messages. Please wait a few minutes, or contact us on WhatsApp.' }, 429);
  }
  const body: any = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) return json({ error: 'Valid messages array is required.' }, 400);

  const history: Turn[] = messages
    .slice(-16)
    .map((m: any) => ({ role: m?.role === 'user' ? 'user' : 'model', content: String(m?.content || '').slice(0, 2000) }))
    .filter((m: Turn) => m.content.trim());

  const key = (env.GEMINI_API_KEY || '').trim();
  if (key) {
    const text = await askGemini(key, history);
    if (text) return json({ text, role: 'model', provider: 'gemini-api' });
  }
  return json({ text: advisorReply(history), role: 'model', model: 'ttech-ai-advisor' });
}

/* ------------------------------------------------------------------ */
/* /api/inquiries                                                      */
/* ------------------------------------------------------------------ */

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function sendTelegram(env: Env, text: string): Promise<boolean> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendEmail(env: Env, subject: string, html: string, replyTo?: string): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.INQUIRY_TO) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: env.RESEND_FROM || 'Ttech Website <onboarding@resend.dev>',
        to: [env.INQUIRY_TO],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function handleInquiry(request: Request, env: Env, ip: string): Promise<Response> {
  const body: any = await request.json().catch(() => ({}));

  // Honeypot: bots fill hidden fields — pretend success, send nothing
  if (clean(body.website_hp, 200)) return json({ success: true, message: 'Inquiry received.' });

  if (rateLimited(`inq:${ip}`, 5, 10 * 60 * 1000)) {
    return json({ error: 'Too many requests. Please wait a few minutes, or contact us on WhatsApp.' }, 429);
  }

  const clientName = clean(body.clientName, 120);
  const emailRaw = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  if (!clientName) return json({ error: 'Please enter your name.' }, 400);
  if (!EMAIL_RE.test(emailRaw) && !phone) return json({ error: 'Please enter a valid email address or phone number.' }, 400);
  const email = EMAIL_RE.test(emailRaw) && !emailRaw.endsWith('@whatsapp.client') ? emailRaw : '';

  const inquiry = {
    id: `TT-${Date.now().toString(36).toUpperCase()}`,
    clientName,
    email,
    phone,
    serviceType: clean(body.serviceType, 120),
    budgetRange: clean(body.budgetRange, 120),
    timeline: clean(body.timeline, 120),
    preferredTech: clean(body.preferredTech, 200),
    projectDescription: clean(body.projectDescription, 3000),
    source: clean(body.source, 60) || 'Website',
  };

  const rows: [string, string][] = [
    ['Name', inquiry.clientName],
    ['Email', inquiry.email || '—'],
    ['Phone / WhatsApp', inquiry.phone || '—'],
    ['Service', inquiry.serviceType || '—'],
    ['Budget', inquiry.budgetRange || '—'],
    ['Timeline', inquiry.timeline || '—'],
    ['Came from', inquiry.source],
  ];

  const telegramText =
    `<b>New inquiry ${esc(inquiry.id)}</b>\n` +
    rows.map(([k, v]) => `<b>${esc(k)}:</b> ${esc(v)}`).join('\n') +
    `\n\n${esc(inquiry.projectDescription || '(no description)').slice(0, 3000)}`;

  const emailHtml =
    `<h2 style="color:#1D4ED8;font-family:Arial">New project inquiry — ${esc(inquiry.clientName)}</h2>` +
    `<table style="font-family:Arial;font-size:14px;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:6px 10px;background:#F1F7FF;font-weight:bold">${esc(k)}</td><td style="padding:6px 10px">${esc(v)}</td></tr>`).join('') +
    `</table><h3 style="font-family:Arial">Project description</h3><p style="font-family:Arial;white-space:pre-wrap">${esc(inquiry.projectDescription || '—')}</p>` +
    `<p style="font-family:Arial;color:#7B8AA3;font-size:12px">Ref ${esc(inquiry.id)}</p>`;

  const [telegram, emailed] = await Promise.all([
    sendTelegram(env, telegramText),
    sendEmail(env, `New inquiry: ${inquiry.serviceType || 'Project'} — ${inquiry.clientName}`, emailHtml, inquiry.email || undefined),
  ]);
  console.log(`Inquiry ${inquiry.id}: telegram=${telegram} email=${emailed}`);

  if (!telegram && !emailed) {
    // Never pretend: the visitor is told to use WhatsApp/email instead
    return json(
      { error: 'Sorry, we could not receive your message right now. Please contact us on WhatsApp (+92 348 9763998) or email teatech.solutionz@gmail.com.' },
      503,
    );
  }
  return json({ success: true, id: inquiry.id, message: 'Inquiry received. Our team will reply within 24 hours.' });
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    try {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return json({
          status: 'ok',
          ai: Boolean(env.GEMINI_API_KEY),
          inquiries: { telegram: Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID), email: Boolean(env.RESEND_API_KEY) },
          timestamp: new Date().toISOString(),
        });
      }
      if (url.pathname === '/api/chat' && request.method === 'POST') return await handleChat(request, env, ip);
      if (url.pathname === '/api/inquiries' && request.method === 'POST') return await handleInquiry(request, env, ip);
      return json({ error: 'Not found' }, 404);
    } catch (err: any) {
      console.error('API error', url.pathname, err?.message || err);
      return json({ error: 'Something went wrong. Please try again, or contact us on WhatsApp.' }, 500);
    }
  },
};
