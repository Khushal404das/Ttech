import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Maximize2,
  Minimize2,
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
  Mail,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import type { ChatMessage, ProjectInquiry } from '../types';

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
    label: '💰 SaaS MVP Ballpark Cost',
    prompt: 'What is the ballpark cost and timeline for building a SaaS MVP with user auth, billing, and dashboard?',
  },
  {
    label: '⚡ .NET 9 + React 19 Stack',
    prompt: 'Why does Ttech SOLUTIONS recommend .NET Core 9 paired with React 19 for enterprise web applications?',
  },
  {
    label: '⏱️ Sprint & Delivery Velocity',
    prompt: 'How do your two-week agile sprints work, and when do I get to see live working demos?',
  },
  {
    label: '📜 Source Code & IP Ownership',
    prompt: 'Do we own 100% of the intellectual property and git repositories once the project is completed?',
  },
  {
    label: '🛡️ 30-Day Warranty & SLA',
    prompt: 'What post-launch warranty and ongoing maintenance SLAs are included with your builds?',
  },
];

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-advisor',
  role: 'model',
  content: `👋 **Welcome to Ttech SOLUTIONS!**\n\nI am your **Real-Time Technical Solutions Advisor**. I can instantly answer your questions about:\n\n- **Ballpark Pricing & Milestones** (MVPs, custom SaaS, mobile apps)\n- **Architecture & Tech Stacks** (.NET 9, React 19, Supabase, Azure, AI pipelines)\n- **Development Cadence** (2-week sprints, live demos, zero lock-in)\n- **Code Ownership & 30-Day Post-Launch Warranty**\n\nAsk any question below, or tap one of the quick topics to get started!`,
  timestamp: Date.now(),
};

export const QuickChatFAB: React.FC<QuickChatFABProps> = ({
  onTransferToInquiry,
  onOpenEstimator,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Quick Lead Capture state (instant 20s alternative to main inquiry form)
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
      // focus input on open
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
          model: 'gemini-3.8-flash',
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
      setErrorMessage(err.message || 'Unable to fetch response. Please try again.');
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

    // Collect user questions/topics
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

  // Submit Fast Lead Callback (Alternative to main inquiry form)
  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) return;

    setLeadSubmitting(true);
    try {
      const payload: ProjectInquiry = {
        clientName: leadName.trim(),
        email: leadContact.includes('@') ? leadContact.trim() : 'provided_phone_only',
        phone: !leadContact.includes('@') ? leadContact.trim() : 'provided_email_only',
        serviceType: leadService,
        budgetRange: 'Quick Chat Callback Request',
        timeline: 'Fast Track (Immediate Discovery)',
        preferredTech: '.NET 9 / React 19 / Modern Fullstack',
        projectDescription: `[Quick Chat Modal Fast Callback]\nContact: ${leadContact}\nNeed: ${leadNotes || 'Quick consultation requested via chat FAB.'}`,
        status: 'new',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'inquiries'), payload);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#38bdf8', '#3b82f6', '#10b981'],
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
      setErrorMessage('Failed to submit callback request. Please use our main form or retry.');
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
          <div className="relative max-w-xs bg-white/95 border border-[#2563EB]/30  p-3.5 rounded-2xl shadow-2xl shadow-cyan-950/40 text-left animate-in fade-in slide-in-from-bottom-3 duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              className="absolute top-2 right-2 text-[#7B8AA3] hover:text-[#0B1220] p-1 rounded-md cursor-pointer"
              aria-label="Dismiss quick chat bubble"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-[#2563EB]/20">
                <Bot className="w-4 h-4 text-[#0B1220]" />
              </div>
              <div className="pr-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#2563EB] font-semibold mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Online · Tech Architect</span>
                </div>
                <p className="text-xs text-[#475569] font-medium leading-snug">
                  Have a quick question about pricing, tech stack, or delivery?
                </p>
                <button
                  onClick={() => {
                    setShowTeaser(false);
                    setIsOpen(true);
                  }}
                  className="mt-2 text-[11px] font-semibold text-[#2563EB] hover:text-[#2563EB] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Chat with Us Live</span>
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
          aria-label={isOpen ? 'Close quick chat' : 'Open quick chat with technical advisor'}
          aria-expanded={isOpen}
          className={`group relative flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'w-13 h-13 bg-[#F1F7FF] border border-[#60A5FA] text-[#475569] hover:text-[#0B1220] hover:border-[#60A5FA] shadow-xl'
              : 'w-14 h-14 bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 text-[#0B1220] shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95'
          }`}
        >
          {/* Animated Glow Halo */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-2xl bg-[#2563EB]/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquareText className="w-6 h-6 transition-transform group-hover:scale-110" />
              {/* Online Green Pulse Indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
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
          aria-label="Quick Technical Chat Advisor"
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#070e1e]/95  border border-[#2563EB]/30 shadow-2xl shadow-cyan-950/60 overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[680px] sm:h-[720px] rounded-3xl'
              : 'bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[420px] h-[580px] max-h-[82vh] rounded-3xl'
          }`}
        >
          {/* Modal Header */}
          <div className="px-4 py-3.5 bg-white border-b border-[#DCE8F8] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-md shadow-[#2563EB]/20 shrink-0">
                <Bot className="w-5 h-5 text-[#0B1220]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#DCE8F8]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0B1220] font-display">Ttech Solutions</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EAF2FF] border border-cyan-700/50 text-[#2563EB] font-semibold uppercase">
                    Advisor
                  </span>
                </div>
                <p className="text-[11px] text-[#7B8AA3] flex items-center gap-1">
                  <span>Fast Answers</span>
                  <span>·</span>
                  <span className="text-emerald-400">Online</span>
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1 text-[#7B8AA3]">
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
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore compact size' : 'Expand window'}
                className="hidden sm:block p-1.5 rounded-lg hover:text-[#0B1220] hover:bg-[#F1F7FF] transition-colors cursor-pointer"
                aria-label={isExpanded ? 'Minimize size' : 'Maximize size'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
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
          <div className="grid grid-cols-2 p-1 bg-white border-b border-[#DCE8F8] text-xs font-semibold text-center shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-white text-[#2563EB] shadow-sm'
                  : 'text-[#7B8AA3] hover:text-[#475569]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Quick AI Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('quick-lead')}
              className={`py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'quick-lead'
                  ? 'bg-white text-[#2563EB] shadow-sm'
                  : 'text-[#7B8AA3] hover:text-[#475569]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>20s Fast Callback</span>
            </button>
          </div>

          {/* TAB 1: Real-Time Chat Experience */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-[#EAF2FF] border border-cyan-800/60 flex items-center justify-center shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-[#2563EB]" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed transition-all ${
                          isUser
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-[#0B1220] shadow-md shadow-cyan-900/30'
                            : 'bg-white border border-[#DCE8F8] text-[#475569] shadow-sm'
                        }`}
                      >
                        {/* Text Content with simple markdown styling */}
                        <div className="whitespace-pre-wrap space-y-2">
                          {msg.content.split('\n\n').map((paragraph, pIdx) => {
                            // Check if bullet points
                            if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                              const items = paragraph.split('\n');
                              return (
                                <ul key={pIdx} className="space-y-1 my-1 pl-1">
                                  {items.map((item, iIdx) => (
                                    <li key={iIdx} className="flex items-start gap-1.5">
                                      <span className="text-[#2563EB] shrink-0 mt-0.5">•</span>
                                      <span>
                                        {item
                                          .replace(/^[-*]\s+/, '')
                                          .split(/(\*\*.*?\*\*)/g)
                                          .map((part, bIdx) =>
                                            part.startsWith('**') && part.endsWith('**') ? (
                                              <strong key={bIdx} className="text-[#0B1220] font-semibold">
                                                {part.slice(2, -2)}
                                              </strong>
                                            ) : (
                                              part
                                            )
                                          )}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }

                            // Regular paragraphs with bold support
                            return (
                              <p key={pIdx}>
                                {paragraph.split(/(\*\*.*?\*\*)/g).map((part, bIdx) =>
                                  part.startsWith('**') && part.endsWith('**') ? (
                                    <strong key={bIdx} className="text-[#0B1220] font-semibold">
                                      {part.slice(2, -2)}
                                    </strong>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            );
                          })}
                        </div>

                        {/* Actions for Assistant messages (Copy & Transfer) */}
                        {!isUser && (
                          <div className="mt-2.5 pt-2 border-t border-[#DCE8F8] flex items-center justify-between text-[10px] text-[#7B8AA3]">
                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="flex items-center gap-1 hover:text-[#475569] transition-colors cursor-pointer"
                              title="Copy answer"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
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
                                className="flex items-center gap-1 text-[#2563EB] hover:text-[#2563EB] font-medium cursor-pointer"
                              >
                                <span>Use in Project Form</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 mt-1">
                          <User className="w-4 h-4 text-blue-300" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF2FF] border border-cyan-800/60 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <div className="bg-white border border-[#DCE8F8] rounded-2xl px-4 py-3 text-xs text-[#2563EB] flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                      <span>Formulating technical recommendation...</span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <button
                      onClick={() => handleSendMessage()}
                      className="text-xs text-[#2563EB] underline shrink-0 cursor-pointer"
                    >
                      Retry
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div className="px-3 py-2 bg-white/80 border-t border-[#DCE8F8] shrink-0">
                <div className="text-[10px] uppercase font-mono text-[#7B8AA3] mb-1.5 px-1 font-semibold flex items-center justify-between">
                  <span>Quick Questions:</span>
                  {onTransferToInquiry && (
                    <button
                      onClick={handleTransferToMainForm}
                      className="text-[#2563EB] hover:underline capitalize"
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
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#DCE8F8] hover:border-[#2563EB]/50 text-[11px] text-[#475569] hover:text-[#0B1220] whitespace-nowrap transition-colors shrink-0 cursor-pointer disabled:opacity-50"
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
                    placeholder="Type a question (e.g. estimate for .NET & React app)..."
                    className="flex-1 max-h-24 bg-white border border-[#DCE8F8] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-cyan-500 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-[#3B82F6] text-[#0B1220] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-[#2563EB]/20 shrink-0 cursor-pointer"
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
                    className="text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Prefer a human callback?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 20-Second Fast Lead Callback (Direct Alternative to Main Form) */}
          {activeTab === 'quick-lead' && (
            <div className="flex-1 flex flex-col p-5 overflow-y-auto">
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
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
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white border border-emerald-500/30 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h5 className="text-sm font-bold text-[#0B1220] mb-1">Request Received!</h5>
                  <p className="text-xs text-[#475569] max-w-xs mb-4">
                    Our lead architect has received your note and will review your specifications shortly.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLeadSuccess(false)}
                      className="px-3 py-1.5 bg-[#F1F7FF] hover:bg-[#EAF2FF] text-[#475569] text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another
                    </button>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#3B82F6] text-[#0B1220] text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Return to Chat
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickLeadSubmit} className="space-y-3.5 flex-1 flex flex-col">
                  <div>
                    <label className="block text-[#475569] text-[11px] font-medium mb-1">
                      Your Name <span className="text-[#2563EB]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g., Alex Mercer"
                      className="w-full px-3 py-2 bg-white border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#475569] text-[11px] font-medium mb-1">
                      Email or WhatsApp Number <span className="text-[#2563EB]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      placeholder="e.g., alex@company.com or +92 348 9763998"
                      className="w-full px-3 py-2 bg-white border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#475569] text-[11px] font-medium mb-1">
                      Project Area of Interest
                    </label>
                    <select
                      value={leadService}
                      onChange={(e) => setLeadService(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] cursor-pointer"
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
                    <label className="block text-[#475569] text-[11px] font-medium mb-1">
                      Quick Note (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={leadNotes}
                      onChange={(e) => setLeadNotes(e.target.value)}
                      placeholder="Briefly describe what you're building or target budget..."
                      className="w-full px-3 py-2 bg-white border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] resize-none"
                    />
                  </div>

                  <div className="pt-2 mt-auto space-y-2">
                    <button
                      type="submit"
                      disabled={leadSubmitting || !leadName.trim() || !leadContact.trim()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[#0B1220] text-xs font-bold transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-mono font-medium transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct WhatsApp: +92 348 9763998</span>
                    </a>
                  </div>

                  {/* Link to main comprehensive inquiry section */}
                  <div className="text-center pt-2">
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

