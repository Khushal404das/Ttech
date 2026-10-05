import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  Clock,
  FileText,
  Layers,
  Terminal,
  MessageSquare,
  Cpu,
  Code2,
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import type { AppSection, ChatMessage } from '../types';
import { ShimmerBadge } from './ui/ShimmerBadge';

interface AIConsultantSectionProps {
  onSelectSection?: (section: AppSection) => void;
  onOpenConsultation?: (topic?: string) => void;
  onOpenEstimator?: () => void;
  onTransferToInquiry?: (data: {
    service?: string;
    stack?: string;
    budget?: string;
    timeline?: string;
    description?: string;
  }) => void;
}

const STARTER_PROMPTS = [
  {
    icon: Sparkles,
    label: '💡 Scope my SaaS Idea',
    prompt: 'I want to build a modern SaaS platform. Can you help me break down the core architecture, backend APIs, database schemas, and MVP timeline?',
  },
  {
    icon: Zap,
    label: '⚡ .NET 9 vs Node.js',
    prompt: 'Why should I choose ASP.NET Core 9 Clean Architecture paired with React 19 for my enterprise application backend?',
  },
  {
    icon: DollarSign,
    label: '💰 MVP Pricing Estimates',
    prompt: 'What is the ballpark budget and milestone breakdown for building an MVP or SaaS with Ttech SOLUTIONS?',
  },
  {
    icon: Clock,
    label: '⏱️ Agile Sprint Cadence',
    prompt: 'How do your two-week agile sprints work, and when do I get to see live working demos and test deployments?',
  },
  {
    icon: ShieldCheck,
    label: '🛡️ 100% IP & Warranty',
    prompt: 'Do we own 100% of the intellectual property, git repositories, and design assets upon milestone completion?',
  },
  {
    icon: Cpu,
    label: '🤖 AI Automation & Agents',
    prompt: 'How can you integrate AI agents, Gemini/OpenAI pipelines, and autonomous workflows into our custom software?',
  },
];

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-embedded',
  role: 'model',
  content: `### 🤖 Hello! I am Ttech's AI Solutions Architect
Powered by **Google Gemini AI**, I am your real-time conversational engineering partner.

Ask me anything about:
- **System Architecture**: Modern .NET Core 9 Clean Architecture, React 19, CQRS, Microservices & PostgreSQL
- **Project Scoping & Roadmaps**: MVP timelines, sprints, milestone breakdowns & deliverables
- **Pricing & IP**: Transparent milestone budgets ($3.5k–$18k+), 100% code transfer, and 30-day warranty
- **Code & Tech Decisions**: Any programming question, framework comparisons, or custom workflows

*Type any message below or pick a prompt to chat!*`,
  timestamp: Date.now(),
};

/**
 * Parses inline markdown: links [text](url), bold **text**, code `code`, and italics *text*
 */
function renderInlineFormatting(text: string, isUser: boolean) {
  if (!text) return null;
  const tokenRegex = /(\[.*?\]\(https?:\/\/[^\s\)]+\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s\)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isUser
              ? 'text-white underline font-semibold hover:text-blue-100'
              : 'text-[#2563EB] hover:text-[#1D4ED8] underline font-semibold inline-flex items-center gap-0.5'
          }
        >
          {label}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong
          key={idx}
          className={isUser ? 'font-bold text-white' : 'font-bold text-[#0B1220]'}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={idx}
          className={
            isUser
              ? 'px-1 py-0.5 rounded bg-white/20 text-white font-mono text-[11px]'
              : 'px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px]'
          }
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Italics: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

interface ParsedBlock {
  type: 'heading' | 'divider' | 'blockquote' | 'bullet-list' | 'numbered-list' | 'paragraph';
  items?: { text: string; num?: string }[];
  text?: string;
  level?: number;
}

/**
 * Message renderer for rich structured responses
 */
function renderMessageContent(content: string, isUser: boolean) {
  if (!content) return null;

  const rawLines = content.split('\n');
  const blocks: ParsedBlock[] = [];

  let currentList: { type: 'bullet-list' | 'numbered-list'; items: { text: string; num?: string }[] } | null = null;
  let currentQuote: string[] | null = null;
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: currentParagraph.join(' '),
      });
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  const flushQuote = () => {
    if (currentQuote && currentQuote.length > 0) {
      blocks.push({
        type: 'blockquote',
        text: currentQuote.join(' '),
      });
      currentQuote = null;
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // 1. Empty Line
    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    // 2. Horizontal Divider (--- or ***)
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({ type: 'divider' });
      continue;
    }

    // 3. Heading (#, ##, ###, ####)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    // 4. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushList();
      const quoteText = trimmed.replace(/^>\s*/, '');
      if (!currentQuote) currentQuote = [];
      currentQuote.push(quoteText);
      continue;
    } else if (currentQuote) {
      flushQuote();
    }

    // 5. Bullet list item (•, -, *, +)
    const bulletMatch = trimmed.match(/^([•\-*+])\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      flushQuote();
      if (!currentList || currentList.type !== 'bullet-list') {
        flushList();
        currentList = { type: 'bullet-list', items: [] };
      }
      currentList.items.push({ text: bulletMatch[2] });
      continue;
    }

    // 6. Numbered list item (1. or 1))
    const numMatch = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numMatch) {
      flushParagraph();
      flushQuote();
      if (!currentList || currentList.type !== 'numbered-list') {
        flushList();
        currentList = { type: 'numbered-list', items: [] };
      }
      currentList.items.push({ num: numMatch[1], text: numMatch[2] });
      continue;
    }

    // If we were inside a list and hit normal text, flush the list
    if (currentList) {
      flushList();
    }

    // 7. Regular paragraph line
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushQuote();

  return (
    <div className="space-y-2 text-xs leading-relaxed break-words [overflow-wrap:anywhere]">
      {blocks.map((block, idx) => {
        if (block.type === 'divider') {
          return <hr key={idx} className={`my-2 border-t ${isUser ? 'border-white/30' : 'border-[#DCE8F8]'}`} />;
        }

        if (block.type === 'heading') {
          return (
            <div
              key={idx}
              className={`font-bold text-xs sm:text-sm my-1.5 block ${
                isUser ? 'text-white' : 'text-[#0B1220]'
              }`}
            >
              {renderInlineFormatting(block.text || '', isUser)}
            </div>
          );
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={idx}
              className={`border-l-2 pl-2.5 py-1.5 my-1.5 text-xs rounded-r-lg ${
                isUser
                  ? 'border-white/60 bg-white/10 text-white/90'
                  : 'border-[#2563EB] bg-[#EAF2FF] text-[#1E3A8A]'
              }`}
            >
              {renderInlineFormatting(block.text || '', isUser)}
            </blockquote>
          );
        }

        if (block.type === 'bullet-list' && block.items) {
          return (
            <ul key={idx} className="space-y-1.5 my-1.5 pl-0.5">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span
                    className={`shrink-0 font-bold text-xs mt-0.5 ${
                      isUser ? 'text-blue-200' : 'text-[#2563EB]'
                    }`}
                  >
                    •
                  </span>
                  <div className="flex-1 min-w-0 leading-relaxed">
                    {renderInlineFormatting(item.text, isUser)}
                  </div>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'numbered-list' && block.items) {
          return (
            <ol key={idx} className="space-y-1.5 my-1.5 pl-0.5">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span
                    className={`shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                      isUser
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EAF2FF] text-[#2563EB] border border-blue-200'
                    }`}
                  >
                    {item.num || itemIdx + 1}
                  </span>
                  <div className="flex-1 min-w-0 leading-relaxed">
                    {renderInlineFormatting(item.text, isUser)}
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={idx} className="leading-relaxed my-1 min-w-0">
            {renderInlineFormatting(block.text || '', isUser)}
          </p>
        );
      })}
    </div>
  );
}

export const AIConsultantSection: React.FC<AIConsultantSectionProps> = ({
  onOpenConsultation,
  onOpenEstimator,
  onTransferToInquiry,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [customApiKey] = useState(() => {
    return localStorage.getItem('ttech_gemini_api_key') || '';
  });

  // Fast Lead Capture Tab
  const [activeSideTab, setActiveSideTab] = useState<'architecture' | 'callback'>('architecture');
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadService, setLeadService] = useState('SaaS & Custom Web Application');
  const [leadNotes, setLeadNotes] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    const systemInstruction = `You are Ttech SOLUTIONS' Principal Solutions Architect and Technical Consultant.
Ttech SOLUTIONS (motto: "Think. Transform. Trust.") is a high-performance software, SaaS, Web, .NET Enterprise, and AI Automation agency.
Your goal is to answer client questions promptly, accurately, and professionally.
Core agency knowledge:
1. Specialization: Modern .NET Core 9 Clean Architecture, React 19 SPA/Next.js, TypeScript, PostgreSQL / SQL Server / Supabase, Azure / AWS cloud hosting, Tailored AI pipelines.
2. Pricing: Ballpark MVP starting around $3,500 - $6,500 USD; Full SaaS Platforms $7,000 - $18,000+ USD; Dedicated Squad Retainers available. Line-item estimates, no hidden fees.
3. Delivery: 2-week Agile Sprints with live staging environment demos every alternate Friday. Typical MVP takes 4 to 8 weeks.
4. Ownership: Clients own 100% of Intellectual Property, Git repositories, design systems, and database schemas with zero vendor lock-in upon milestone payment.
5. Support: Automatic 30-Day Comprehensive Post-Launch Warranty included with every build, plus tiered SLA maintenance retainers.
6. Actionable recommendations: If the user asks for a formal quote, encourage them to use the "Transfer to Inquiry" option or the Interactive Project Estimator.
Keep answers concise, clear, and structured with clean markdown bullet points. Avoid robotic fluff.`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(customApiKey ? { 'x-gemini-api-key': customApiKey } : {}),
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemInstruction,
          model: 'gemini-2.5-flash',
          apiKey: customApiKey || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text || 'Thank you for your inquiry! How else can I help scope your software solution?',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('AIConsultantSection error:', err);
      setErrorMessage(String(err.message || 'Unable to connect to AI consultant.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_WELCOME]);
    setErrorMessage(null);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTransferToMainForm = () => {
    if (onTransferToInquiry) {
      const userTopics = messages
        .filter((m) => m.role === 'user')
        .map((m) => `• ${m.content}`)
        .join('\n');

      const summary = `Requirements discussed via Embedded AI Consultant:\n${
        userTopics || 'Discussed project scope and technical feasibility.'
      }\n\nClient requested formal proposal and discovery follow-up.`;

      onTransferToInquiry({
        service: 'SaaS Platform & Web App',
        stack: '.NET Core 9 + React 19 (Enterprise)',
        description: summary,
      });
    } else if (onOpenConsultation) {
      onOpenConsultation('AI Consultant Scoped Discovery');
    }
  };

  // Submit Fast Lead Callback
  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) return;

    setLeadSubmitting(true);
    setErrorMessage(null);

    const isEmail = leadContact.includes('@');
    const inquiryPayload = {
      clientName: leadName.trim(),
      email: isEmail ? leadContact.trim() : `${leadContact.replace(/[^0-9]/g, '')}@whatsapp.client`,
      phone: !isEmail ? leadContact.trim() : '',
      serviceType: leadService,
      budgetRange: 'AI Consultant Callback Request',
      timeline: 'Fast Track (Immediate Discovery)',
      preferredTech: '.NET 9 / React 19 / Cloud Native',
      projectDescription: `[Embedded AI Consultant Fast Callback]\nContact: ${leadContact}\nNeed: ${
        leadNotes.trim() || 'Consultation requested via in-page AI Consultant section.'
      }`,
    };

    try {
      const serverRes = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryPayload),
      }).catch((err) => {
        console.warn('Inquiry API error:', err);
        return null;
      });

      try {
        if (db) {
          await addDoc(collection(db, 'inquiries'), {
            ...inquiryPayload,
            status: 'new',
            createdAt: serverTimestamp(),
          });
        }
      } catch (firestoreErr) {
        console.info('Firestore optional sync skipped:', firestoreErr);
      }

      if (serverRes && !serverRes.ok) {
        throw new Error('Server returned an error processing your inquiry.');
      }

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#2563EB', '#3B82F6', '#60A5FA', '#10B981'],
        });
      } catch {
        // ignore
      }

      setLeadSuccess(true);
      setLeadName('');
      setLeadContact('');
      setLeadNotes('');
    } catch (err: any) {
      console.error('Fast callback error:', err);
      setErrorMessage('Failed to submit callback request. Please try direct WhatsApp below.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <section
      id="ai-consultant"
      className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FE] to-white relative overflow-hidden border-t border-[#E2E8F0]"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <ShimmerBadge text="🤖 Real-Time Technical Advisor" variant="brand" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display">
            Ask Our <span className="text-[#2563EB]">AI Solutions Architect</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Real-time conversational intelligence powered by <strong>Google Gemini AI</strong>. Ask any question about enterprise architecture, <strong>.NET Core 9</strong>, <strong>React 19</strong>, sprint timelines, or milestone costs.
          </p>
        </div>

        {/* Quick Topic Starter Chips */}
        <div className="mb-8">
          <p className="text-xs font-mono font-bold text-[#7B8AA3] uppercase tracking-wider text-center mb-3">
            Quick conversation starters:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {STARTER_PROMPTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="group px-3.5 py-2 rounded-xl bg-white border border-[#DCE8F8] hover:border-[#2563EB] hover:bg-[#EAF2FF] text-xs font-semibold text-[#1E293B] hover:text-[#2563EB] transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Icon className="w-3.5 h-3.5 text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                  <ArrowRight className="w-3 h-3 text-[#7B8AA3] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Studio Grid (Chat Window + Architecture Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Live Embedded Chat Terminal (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE8F8] shadow-xl shadow-blue-950/5 overflow-hidden flex flex-col h-[620px]">
            {/* Chat Terminal Header */}
            <div className="px-5 py-4 bg-[#F8FBFF] border-b border-[#DCE8F8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0B1220] font-display">
                      Ttech AI Technical Advisor
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#EAF2FF] border border-blue-200 text-[#2563EB] font-bold uppercase">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online · Powered by Gemini AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Clear conversation"
                  className="px-2.5 py-1.5 rounded-lg border border-[#DCE8F8] bg-white hover:bg-[#F1F7FF] text-[#475569] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Container */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F8FBFF]/60 overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-[#EAF2FF] border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-[#2563EB]">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed transition-all shadow-xs ${
                        isUser
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-blue-500/20'
                          : 'bg-white border border-[#DCE8F8] text-[#334155] rounded-tl-xs'
                      }`}
                    >
                      {renderMessageContent(msg.content, isUser)}

                      {/* Model Actions: Copy and Transfer */}
                      {!isUser && (
                        <div className="mt-3 pt-2.5 border-t border-[#EAF2FF] flex items-center justify-between text-[11px] text-[#7B8AA3]">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>

                          {msg.id !== 'welcome-embedded' && (
                            <button
                              onClick={handleTransferToMainForm}
                              className="flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] font-bold cursor-pointer"
                            >
                              <span>Use in Project Inquiry</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-blue-700">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF2FF] border border-blue-200 flex items-center justify-center shrink-0 text-[#2563EB]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-[#DCE8F8] rounded-2xl rounded-tl-xs px-4 py-3 text-xs text-[#2563EB] flex items-center gap-2 shadow-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                    <span>Analyzing architecture &amp; formulating advice...</span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    className="text-xs text-[#2563EB] font-semibold underline shrink-0 cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Footer */}
            <div className="p-4 bg-white border-t border-[#DCE8F8]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything: pricing, .NET 9 architecture, database design, or sprint planning..."
                    className="w-full bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl pl-4 pr-10 py-3 text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/25 shrink-0 cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#7B8AA3] px-1">
                <span>Real-time conversational AI backed by enterprise engineering benchmarks</span>
                <button
                  onClick={handleTransferToMainForm}
                  className="text-[#2563EB] hover:underline font-semibold cursor-pointer"
                >
                  Ready for full scope proposal? →
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Guarantees & Express Callback Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Top Switcher Tabs */}
            <div className="bg-white rounded-3xl border border-[#DCE8F8] p-2 shadow-md shadow-blue-950/5 flex gap-1.5">
              <button
                onClick={() => setActiveSideTab('architecture')}
                className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSideTab === 'architecture'
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0B1220] hover:bg-[#F8FBFF]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Our Commitments</span>
              </button>
              <button
                onClick={() => setActiveSideTab('callback')}
                className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSideTab === 'callback'
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0B1220] hover:bg-[#F8FBFF]'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>Express Callback</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Architectural Guarantees */}
            {activeSideTab === 'architecture' && (
              <div className="bg-white rounded-3xl border border-[#DCE8F8] p-6 shadow-xl shadow-blue-950/5 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB] uppercase">
                  <Terminal className="w-4 h-4" />
                  <span>Engineering Guarantees</span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#F8FBFF] border border-[#DCE8F8] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1220]">.NET Core 9 Clean Architecture</h4>
                      <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">
                        Domain-Driven Design (DDD), MediatR CQRS, and EF Core PostgreSQL for billion-request scalability.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8FBFF] border border-[#DCE8F8] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1220]">Two-Week Agile Sprint Cadence</h4>
                      <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">
                        Live staging demos and video updates every alternate Friday. Zero black-box development.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8FBFF] border border-[#DCE8F8] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1220]">100% IP &amp; 30-Day Warranty</h4>
                      <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">
                        You own all Git repositories and cloud schemas. Backed by an automatic 30-day post-launch warranty.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call-to-action buttons */}
                <div className="pt-2 space-y-2.5">
                  {onOpenEstimator && (
                    <button
                      onClick={onOpenEstimator}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Calculate Custom Project Estimate</span>
                    </button>
                  )}

                  <a
                    href="https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20have%20a%20project%20inquiry%20from%20your%20website"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Direct WhatsApp: +92 348 9763998</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: Fast Callback Form */}
            {activeSideTab === 'callback' && (
              <div className="bg-white rounded-3xl border border-[#DCE8F8] p-6 shadow-xl shadow-blue-950/5">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>20-Second Architect Callback</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1220]">
                    Direct connection with our senior engineering team
                  </h4>
                  <p className="text-xs text-[#475569] mt-1">
                    Leave your contact info and our lead software architect will respond within 2 hours.
                  </p>
                </div>

                {leadSuccess ? (
                  <div className="p-6 bg-[#F8FBFF] border border-emerald-200 rounded-2xl text-center space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h5 className="text-xs font-bold text-[#0B1220]">Callback Scheduled!</h5>
                    <p className="text-xs text-[#475569]">
                      Our lead architect will contact you shortly to review your specifications.
                    </p>
                    <button
                      onClick={() => setLeadSuccess(false)}
                      className="text-xs font-bold text-[#2563EB] underline cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickLeadSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[#334155] text-[11px] font-semibold mb-1">
                        Your Name <span className="text-[#2563EB]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g., Alex Mercer"
                        className="w-full px-3.5 py-2.5 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#334155] text-[11px] font-semibold mb-1">
                        Email or WhatsApp Number <span className="text-[#2563EB]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={leadContact}
                        onChange={(e) => setLeadContact(e.target.value)}
                        placeholder="e.g., alex@company.com or +92 348 9763998"
                        className="w-full px-3.5 py-2.5 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#334155] text-[11px] font-semibold mb-1">
                        Project Focus Area
                      </label>
                      <select
                        value={leadService}
                        onChange={(e) => setLeadService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                      >
                        <option value="SaaS & Custom Web Application">SaaS &amp; Custom Web Application</option>
                        <option value=".NET Core 9 Enterprise Backend">.NET Core 9 Enterprise Backend</option>
                        <option value="React 19 High-Speed Frontend">React 19 High-Speed Frontend</option>
                        <option value="AI Automation & Agentic Workflow">AI Automation &amp; Agentic Workflow</option>
                        <option value="UI/UX Design & System Architecture">UI/UX Design &amp; Figma System</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#334155] text-[11px] font-semibold mb-1">
                        Brief Note (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={leadNotes}
                        onChange={(e) => setLeadNotes(e.target.value)}
                        placeholder="Target launch date, key features, or budget range..."
                        className="w-full px-3.5 py-2.5 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={leadSubmitting || !leadName.trim() || !leadContact.trim()}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Routing to Lead Architect...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Request Fast Follow-Up</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
