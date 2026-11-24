/**
 * Contact-form / callback inquiries.
 *
 * Every valid inquiry is:
 *   1. saved to data/inquiries.jsonl (one JSON object per line), and
 *   2. emailed to you, when SMTP settings are present in .env.
 *
 * The visitor only sees "success" if at least one of those worked, so a
 * lead can no longer silently disappear.
 */
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import type { Request, Response } from 'express';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.jsonl');

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface Inquiry {
  id: string;
  receivedAt: string;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  preferredTech: string;
  projectDescription: string;
  source: string;
  ip: string;
}

/* ------------------------------------------------------------------ */
/* Simple per-IP rate limit (stops form spam / floods)                 */
/* ------------------------------------------------------------------ */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ */
/* Storage                                                             */
/* ------------------------------------------------------------------ */

function save(inquiry: Inquiry): boolean {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.appendFileSync(DATA_FILE, JSON.stringify(inquiry) + '\n', 'utf8');
    return true;
  } catch (err) {
    console.error('Could not save inquiry to disk:', err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Email                                                               */
/* ------------------------------------------------------------------ */

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function sendEmail(inquiry: Inquiry): Promise<boolean> {
  if (!smtpConfigured()) return false;
  const to = process.env.INQUIRY_TO || process.env.SMTP_USER!;
  const rows: [string, string][] = [
    ['Name', inquiry.clientName],
    ['Email', inquiry.email],
    ['Phone / WhatsApp', inquiry.phone || '—'],
    ['Service', inquiry.serviceType || '—'],
    ['Budget', inquiry.budgetRange || '—'],
    ['Timeline', inquiry.timeline || '—'],
    ['Preferred tech', inquiry.preferredTech || '—'],
    ['Came from', inquiry.source],
    ['Received', new Date(inquiry.receivedAt).toUTCString()],
  ];
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nProject description:\n${inquiry.projectDescription || '—'}\n\nReference: ${inquiry.id}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#1D4ED8;margin:0 0 12px">New project inquiry — ${esc(inquiry.clientName)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 10px;background:#F1F7FF;font-weight:bold;width:150px">${esc(k)}</td><td style="padding:6px 10px;border-bottom:1px solid #DCE8F8">${esc(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <h3 style="margin:18px 0 6px">Project description</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.5">${esc(inquiry.projectDescription || '—')}</p>
      <p style="color:#7B8AA3;font-size:12px">Reply to this email to answer ${esc(inquiry.clientName)} directly. Ref: ${esc(inquiry.id)}</p>
    </div>`;

  try {
    await getTransporter().sendMail({
      from: `"Ttech Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo: EMAIL_RE.test(inquiry.email) ? `"${inquiry.clientName.replace(/"/g, '')}" <${inquiry.email}>` : undefined,
      subject: `New inquiry: ${inquiry.serviceType || 'Project'} — ${inquiry.clientName}`,
      text,
      html,
    });
    return true;
  } catch (err: any) {
    console.error('Inquiry email failed:', err?.message || err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Express handler                                                     */
/* ------------------------------------------------------------------ */

export async function handleInquiry(req: Request, res: Response) {
  const body = req.body || {};

  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if (clean(body.website_hp, 200)) {
    return res.json({ success: true, message: 'Inquiry received.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a few minutes, or contact us on WhatsApp.' });
  }

  const clientName = clean(body.clientName, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  if (!clientName) return res.status(400).json({ error: 'Please enter your name.' });
  // The chat "callback" form may send a phone number instead of a real email.
  if (!EMAIL_RE.test(email) && !phone) {
    return res.status(400).json({ error: 'Please enter a valid email address or phone number.' });
  }

  const inquiry: Inquiry = {
    id: `TT-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    clientName,
    email: EMAIL_RE.test(email) && !email.endsWith('@whatsapp.client') ? email : '',
    phone,
    serviceType: clean(body.serviceType, 120),
    budgetRange: clean(body.budgetRange, 120),
    timeline: clean(body.timeline, 120),
    preferredTech: clean(body.preferredTech, 200),
    projectDescription: clean(body.projectDescription, 4000),
    source: clean(body.source, 60) || 'Contact form',
    ip,
  };

  const saved = save(inquiry);
  const emailed = await sendEmail(inquiry);
  console.log(`Inquiry ${inquiry.id} from ${clientName}: saved=${saved} emailed=${emailed}`);

  if (!saved && !emailed) {
    return res.status(500).json({
      error: 'Sorry, we could not receive your message right now. Please contact us on WhatsApp or email instead.',
    });
  }
  return res.json({
    success: true,
    id: inquiry.id,
    message: 'Inquiry received. Our team will reply within 24 hours.',
  });
}

export function inquiryStatus() {
  return { emailConfigured: smtpConfigured(), storageFile: DATA_FILE };
}
