import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Bot,
  User,
  Zap,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  Clock,
  FileText,
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import type { ChatMessage } from '../types';

interface QuickChatFABProps {
  onTransferToInquiry?: (data: {
    service?: string;
    stack?: string;
    budget?: string;
    timeline?: string;
    description?: string;
  }) => void;
  onOpenEstimator?: (stack?: string) => void;
}

const STARTER_PROMPTS = [
  {
    icon: DollarSign,
    label: '💰 SaaS MVP Cost',
    prompt: 'What is the ballpark cost and timeline for building a SaaS MVP with user auth, billing, and dashboard?',
  },
  {
    icon: Zap,
    label: '⚡ .NET 9 + React 19',
    prompt: 'Why does Ttech SOLUTIONS recommend .NET Core 9 paired with React 19 for enterprise web applications?',
  },
  {
    icon: Clock,
    label: '⏱️ Sprint Velocity',
    prompt: 'How do your two-week agile sprints work, and when do I get to see live working demos?',
  },
  {
    icon: FileText,
    label: '📜 Source Code IP',
    prompt: 'Do we own 100% of the intellectual property and git repositories once the project is completed?',
  },
  {
    icon: ShieldCheck,
    label: '🛡️ 30-Day Warranty',
    prompt: 'What post-launch warranty and ongoing maintenance SLAs are included with your builds?',
  },
];

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-advisor',
  role: 'model',
  content: `### 👋 Welcome to Ttech SOLUTIONS

I am your **Real-Time Technical Solutions Advisor**. I can immediately answer your questions about:

- **Ballpark Pricing & Milestones**: MVPs ($3,500–$6,500), SaaS Platforms ($7,000–$18,000+), Dedicated Squads
- **Enterprise Architecture**: .NET Core 9 Clean Architecture, React 19, PostgreSQL, Azure & AWS Cloud
- **Sprint Cadence & Velocity**: 2-week agile sprints with bi-weekly live staging demos
- **100% IP Ownership & 30-Day Warranty**: Full code transfer with zero vendor lock-in

Ask any question below or click one of the quick prompts to get started!`,
  timestamp: Date.now(),
};

/**
 * Parses inline markdown: links [text](url), bold **text**, code `code`, and italics *text*
 */
function renderInlineFormatting(text: string, isUser: boolean) {
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
              : 'px-1 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px]'
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

/**
 * Robust message markdown renderer:
 * Handles headers (###), blockquotes (>), bullet lists (- or *), numbered lists (1.), and paragraphs.
 */
function renderMessageContent(content: string, isUser: boolean) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="space-y-2 text-xs leading-relaxed">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();

        // 1. Heading ###, ##, #
        if (/^#{1,3}\s+/.test(trimmed)) {
          const headingText = trimmed.replace(/^#{1,3}\s+/, '');
          return (
            <h4
              key={bIdx}
              className={`font-bold text-[13px] my-1 flex items-center gap-1.5 ${
                isUser ? 'text-white' : 'text-[#0B1220]'
              }`}
            >
              {renderInlineFormatting(headingText, isUser)}
            </h4>
          );
        }

        // 2. Blockquote >
        if (trimmed.startsWith('>')) {
          const quoteLines = trimmed
            .split('\n')
            .map((line) => line.replace(/^>\s?/, ''))
            .join(' ');
          return (
            <blockquote
              key={bIdx}
              className={`border-l-2 pl-2.5 py-1.5 my-1.5 text-[11px] rounded-r-lg ${
                isUser
                  ? 'border-white/60 bg-white/10 text-white/90'
                  : 'border-[#2563EB] bg-[#EAF2FF] text-[#1E3A8A]'
              }`}
            >
              {renderInlineFormatting(quoteLines, isUser)}
            </blockquote>
          );
        }

        const lines = trimmed.split('\n');

        // 3. Bullet list (- or *)
        const isBulletList = lines.every((line) => /^[-*]\s+/.test(line.trim()));
        if (isBulletList && lines.length > 0) {
          return (
            <ul key={bIdx} className="space-y-1.5 my-1 pl-1">
              {lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-1.5">
                    <span
                      className={`shrink-0 mt-0.5 text-xs font-bold ${
                        isUser ? 'text-blue-200' : 'text-[#2563EB]'
                      }`}
                    >
                      •
                    </span>
                    <span className="flex-1">
                      {renderInlineFormatting(itemText, isUser)}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 4. Numbered list (1. , 2. etc)
        const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line.trim()));
        if (isNumberedList && lines.length > 0) {
          return (
            <ol key={bIdx} className="space-y-1.5 my-1 pl-1">
              {lines.map((line, lIdx) => {
                const match = line.trim().match(/^(\d+)\.\s+(.*)$/);
                const num = match ? match[1] : `${lIdx + 1}`;
                const itemText = match ? match[2] : line;
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span
                      className={`shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isUser
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EAF2FF] text-[#2563EB] border border-blue-200'
                      }`}
                    >
                      {num}
                    </span>
                    <span className="flex-1">
                      {renderInlineFormatting(itemText, isUser)}
                    </span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 5. Mixed lines with bullet or regular text
        return (
          <div key={bIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const lTrim = line.trim();
              if (/^[-*]\s+/.test(lTrim)) {
                const itemText = lTrim.replace(/^[-*]\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-1.5 pl-1">
                    <span
                      className={`shrink-0 mt-0.5 text-xs font-bold ${
                        isUser ? 'text-blue-200' : 'text-[#2563EB]'
                      }`}
                    >
                      •
                    </span>
                    <span className="flex-1">
                      {renderInlineFormatting(itemText, isUser)}
                    </span>
                  </div>
                );
              }
              if (/^\d+\.\s+/.test(lTrim)) {
                const match = lTrim.match(/^(\d+)\.\s+(.*)$/);
                const num = match ? match[1] : `${lIdx + 1}`;
                const itemText = match ? match[2] : lTrim;
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1">
                    <span
                      className={`shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isUser
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EAF2FF] text-[#2563EB] border border-blue-200'
                      }`}
                    >
                      {num}
                    </span>
                    <span className="flex-1">
                      {renderInlineFormatting(itemText, isUser)}
                    </span>
                  </div>
                );
              }
              return (
                <p key={lIdx}>
                  {renderInlineFormatting(line, isUser)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export const QuickChatFAB: React.FC<QuickChatFABProps> = ({
  onTransferToInquiry,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'quick-lead'>('chat');
  const [showTeaser, setShowTeaser] = useState(true);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ttech_quick_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [INITIAL_WELCOME];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick Lead Capture state
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadService, setLeadService] = useState('SaaS & Custom Web Application');
  const [leadNotes, setLeadNotes] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ttech_quick_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, activeTab, messages, isLoading]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
Ttech SOLUTIONS (motto: "Think. Transform. Trust.") is a software, SaaS, Web, .NET Enterprise, and AI Automation agency.
Your goal is to answer client questions promptly, accurately, and professionally.
Core facts to reference:
1. Specialization: Modern .NET Core 9 Clean Architecture, React 19 SPA/Next.js, TypeScript, PostgreSQL / SQL Server / Supabase, Azure / AWS / GCP cloud hosting, Tailored AI pipelines.
2. Pricing: Ballpark MVP starting around $3,500 - $6,500 USD; Full SaaS Platforms $7,000 - $18,000+ USD; Dedicated Squad Retainers available. Line-item estimates, no hidden fees.
3. Delivery: 2-week Agile Sprints with live staging environment demos every alternate Friday. Typical MVP takes 4 to 8 weeks.
4. Ownership: Clients own 100% of Intellectual Property, Git repositories, design systems, and database schemas with zero vendor lock-in upon milestone payment.
5. Support: Automatic 30-Day Comprehensive Post-Launch Warranty included with every build, plus tiered SLA maintenance retainers.
6. Actionable recommendations: If the user asks for a formal quote, encourage them to use the "Transfer to Inquiry" option or the Interactive Project Estimator.
Keep answers concise, clear, and structured with clean markdown bullet points. Avoid robotic fluff.`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemInstruction,
          model: 'gemini-2.5-flash',
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
        content: data.text || 'Thank you for your question! How else can I assist your project vision?',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('QuickChat error:', err);
      // Seamlessly generate advisor response
      const fallbackMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: `### 💡 Technical Solutions Advisor · Ttech SOLUTIONS

Thank you for your question! Our engineering team specializes in **.NET Core 9, React 19, and scalable Cloud Systems**.

- **Sprint Velocity**: 2-week agile delivery with live staging previews.
- **100% Ownership**: Full source code and IP transfer upon project milestone completion.
- **Discovery**: We can outline a custom architecture and sprint estimate for your exact requirements.

*Feel free to describe what you're building or click **"20s Fast Callback"** to speak directly with our lead architect!*`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_WELCOME]);
    setErrorMessage(null);
    try {
      localStorage.removeItem('ttech_quick_chat_history');
    } catch {
      // ignore
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Transfer conversation to main inquiry form
  const handleTransferToMainForm = () => {
    if (!onTransferToInquiry) return;

    const userTopics = messages
      .filter((m) => m.role === 'user')
      .map((m) => `• ${m.content}`)
      .join('\n');

    const summary = `Requirements discussed via Live Quick Chat:\n${userTopics || 'Discussed project scope and technical feasibility.'}\n\nClient requested formal proposal and discovery follow-up.`;

    onTransferToInquiry({
      service: 'SaaS Platform & Web App',
      stack: '.NET Core 9 + React 19 (Enterprise)',
      description: summary,
    });

    setIsOpen(false);
  };

  // Submit Fast Lead Callback (Direct Alternative to Main Form)
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
      budgetRange: 'Quick Chat Callback Request',
      timeline: 'Fast Track (Immediate Discovery)',
      preferredTech: '.NET 9 / React 19 / Modern Fullstack',
      projectDescription: `[Quick Chat Modal Fast Callback]\nContact: ${leadContact}\nNeed: ${leadNotes.trim() || 'Fast consultation requested via live chat widget.'}`,
    };

    try {
      // 1. Submit directly to Express server API endpoint
      const serverRes = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryPayload),
      }).catch((err) => {
        console.warn('Direct inquiry server API error:', err);
        return null;
      });

      // 2. Also try Firestore sync in parallel if configured
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

      // Trigger celebration confetti
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
      setErrorMessage('Failed to submit callback request. Please try direct WhatsApp below or retry.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button & Teaser Bubble Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-auto select-none">
        {/* Initial Teaser Bubble (Dismissible) */}
        {!isOpen && showTeaser && (
          <div className="relative max-w-xs bg-white/95 backdrop-blur-md border border-[#DCE8F8] p-3.5 rounded-2xl shadow-xl shadow-blue-900/10 text-left animate-in fade-in slide-in-from-bottom-3 duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              className="absolute top-2 right-2 text-[#7B8AA3] hover:text-[#0B1220] p-1 rounded-md cursor-pointer transition-colors"
              aria-label="Dismiss quick chat bubble"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="pr-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#2563EB] font-semibold mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Ttech AI Consultant · Online</span>
                </div>
                <p className="text-xs text-[#475569] font-medium leading-snug">
                  Have a quick question about architecture, pricing, or sprint roadmaps?
                </p>
                <button
                  onClick={() => {
                    setShowTeaser(false);
                    setIsOpen(true);
                  }}
                  className="mt-2 text-[11px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Ask AI Consultant</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Action Button */}
        <button
          onClick={() => {
            setShowTeaser(false);
            setIsOpen(!isOpen);
          }}
          aria-label={isOpen ? 'Close AI Consultant' : 'Open Ttech AI Consultant chatbot'}
          aria-expanded={isOpen}
          className={`group relative flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'w-13 h-13 bg-white border border-[#DCE8F8] text-[#475569] hover:text-[#0B1220] hover:border-blue-300 shadow-xl'
              : 'w-14 h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/35 hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
          }`}
        >
          {/* Animated Glow Halo */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-2xl bg-blue-500/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquareText className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
              {/* Online Green Pulse Indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Real-Time Chat Modal Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ttech AI Consultant"
          data-lenis-prevent="true"
          className="fixed z-50 bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[420px] max-w-[calc(100vw-24px)] h-[540px] max-h-[calc(100vh-120px)] rounded-3xl flex flex-col bg-white border border-[#DCE8F8] shadow-2xl shadow-blue-950/25 overflow-hidden transition-all duration-300"
        >
          {/* Modal Header */}
          <div className="px-4 py-3.5 bg-white border-b border-[#DCE8F8] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0B1220] font-display">Ttech AI Consultant</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EAF2FF] border border-blue-200 text-[#2563EB] font-semibold uppercase">
                    AI Consultant
                  </span>
                </div>
                <p className="text-[11px] text-[#7B8AA3] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-600 font-medium">Principal Solutions Architect</span>
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1.5 text-[#7B8AA3]">
              {activeTab === 'chat' && (
                <button
                  onClick={handleResetChat}
                  title="Clear chat history"
                  className="p-1.5 rounded-lg hover:text-[#0B1220] hover:bg-[#F1F7FF] transition-colors cursor-pointer"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg hover:text-[#0B1220] hover:bg-[#F1F7FF] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Navigation Tabs: Quick Chat vs Instant Callback */}
          <div className="grid grid-cols-2 p-1.5 bg-[#F8FBFF] border-b border-[#DCE8F8] text-xs font-semibold text-center shrink-0 gap-1.5">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-white text-[#2563EB] shadow-xs border border-[#DCE8F8] font-bold'
                  : 'text-[#7B8AA3] hover:text-[#0B1220] hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Quick AI Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('quick-lead')}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'quick-lead'
                  ? 'bg-white text-[#2563EB] shadow-xs border border-[#DCE8F8] font-bold'
                  : 'text-[#7B8AA3] hover:text-[#0B1220] hover:bg-white/50'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>20s Fast Callback</span>
            </button>
          </div>

          {/* TAB 1: Real-Time Chat Experience */}
          {activeTab === 'chat' && (
            <div
              className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#F8FBFF]"
              data-lenis-prevent="true"
            >
              {/* Message List */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-3.5 overscroll-contain"
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
              >
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-[#EAF2FF] border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-[#2563EB]">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed transition-all ${
                          isUser
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                            : 'bg-white border border-[#DCE8F8] text-[#334155] rounded-tl-sm shadow-xs'
                        }`}
                      >
                        {/* Render Rich Markdown Content */}
                        {renderMessageContent(msg.content, isUser)}

                        {/* Actions for Assistant messages (Copy & Transfer) */}
                        {!isUser && (
                          <div className="mt-2.5 pt-2 border-t border-[#DCE8F8] flex items-center justify-between text-[10px] text-[#7B8AA3]">
                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="flex items-center gap-1 hover:text-[#2563EB] transition-colors cursor-pointer"
                              title="Copy answer"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600 font-medium">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            {onTransferToInquiry && msg.id !== 'welcome-advisor' && (
                              <button
                                onClick={handleTransferToMainForm}
                                className="flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] font-semibold cursor-pointer"
                              >
                                <span>Use in Project Form</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-blue-700">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF2FF] border border-blue-200 flex items-center justify-center shrink-0 text-[#2563EB]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-[#DCE8F8] rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-[#2563EB] flex items-center gap-2 shadow-xs">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                      <span>Formulating technical recommendation...</span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
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

              {/* Quick Prompt Chips */}
              <div className="px-3.5 py-2 bg-white border-t border-[#DCE8F8] shrink-0">
                <div className="text-[10px] uppercase font-mono text-[#7B8AA3] mb-1.5 font-semibold flex items-center justify-between">
                  <span>Quick Questions:</span>
                  {onTransferToInquiry && (
                    <button
                      onClick={handleTransferToMainForm}
                      className="text-[#2563EB] hover:underline normal-case font-sans font-medium"
                    >
                      Transfer to Main Form &rarr;
                    </button>
                  )}
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                  {STARTER_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-full bg-[#F1F7FF] border border-[#DCE8F8] hover:border-blue-400 hover:bg-[#EAF2FF] text-[11px] font-medium text-[#2563EB] hover:text-[#1D4ED8] whitespace-nowrap transition-all shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-[#DCE8F8] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask about pricing, tech stack, or sprints..."
                    className="flex-1 max-h-24 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/25 shrink-0 cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Footer conversion helper */}
                <div className="mt-2 flex items-center justify-between text-[10px] text-[#7B8AA3] px-1">
                  <span>Enter to send · Shift+Enter for newline</span>
                  <button
                    onClick={() => setActiveTab('quick-lead')}
                    className="text-[#2563EB] hover:underline cursor-pointer font-medium"
                  >
                    Prefer a human callback?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 20-Second Fast Lead Callback */}
          {activeTab === 'quick-lead' && (
            <div
              className="flex-1 flex flex-col p-5 overflow-y-auto bg-white overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Express 20-Second Callback</span>
                </div>
                <h4 className="text-base font-bold text-[#0B1220] font-display">
                  Get a response from our lead engineer
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">
                  Don&apos;t have time for the full consultation form? Leave your details below and a senior architect will follow up via email or WhatsApp within 2 hours.
                </p>
              </div>

              {leadSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#F8FBFF] border border-emerald-200 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h5 className="text-sm font-bold text-[#0B1220] mb-1">Request Received!</h5>
                  <p className="text-xs text-[#475569] max-w-xs mb-4">
                    Our lead architect has received your note and will review your specifications shortly.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLeadSuccess(false)}
                      className="px-3.5 py-1.5 bg-white border border-[#DCE8F8] hover:bg-[#F1F7FF] text-[#475569] text-xs font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another
                    </button>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Return to Chat
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickLeadSubmit} className="space-y-3 flex-1 flex flex-col">
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
                      className="w-full px-3 py-2 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="w-full px-3 py-2 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#334155] text-[11px] font-semibold mb-1">
                      Project Area of Interest
                    </label>
                    <select
                      value={leadService}
                      onChange={(e) => setLeadService(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                      <option value="SaaS & Custom Web Application">SaaS &amp; Custom Web Application</option>
                      <option value=".NET Core 9 Enterprise Backend">.NET Core 9 Enterprise Backend</option>
                      <option value="React 19 High-Speed Frontend">React 19 High-Speed Frontend</option>
                      <option value="AI Automation & Agentic Workflow">AI Automation &amp; Agentic Workflow</option>
                      <option value="UI/UX Design & System Architecture">UI/UX Design &amp; Figma System</option>
                      <option value="General Discovery & Code Audit">General Discovery &amp; Code Audit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#334155] text-[11px] font-semibold mb-1">
                      Quick Note (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={leadNotes}
                      onChange={(e) => setLeadNotes(e.target.value)}
                      placeholder="Briefly describe what you're building or target budget..."
                      className="w-full px-3 py-2 bg-[#F8FBFF] border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-2 mt-auto space-y-2">
                    <button
                      type="submit"
                      disabled={leadSubmitting || !leadName.trim() || !leadContact.trim()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Routing to Lead Architect...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Request Fast Follow-Up</span>
                        </>
                      )}
                    </button>

                    <a
                      href="https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20am%20chatting%20from%20your%20website%20and%20want%20to%20discuss%20a%20project"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-medium transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Direct WhatsApp: +92 348 9763998</span>
                    </a>
                  </div>

                  {/* Link to main comprehensive inquiry section */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={handleTransferToMainForm}
                      className="text-[11px] text-[#7B8AA3] hover:text-[#2563EB] underline cursor-pointer"
                    >
                      Prefer our detailed inquiry questionnaire? Click here
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
