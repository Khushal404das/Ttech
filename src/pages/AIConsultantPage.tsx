import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  BrainCircuit,
  DollarSign,
  Cloud,
  Code2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Layers,
  FileDown,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ShimmerBadge } from '../components/ui/ShimmerBadge';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Footer } from '../components/Footer';

interface ConsultantPersona {
  id: string;
  name: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge: string;
  systemInstruction: string;
  samplePrompts: string[];
}

const PERSONAS: ConsultantPersona[] = [
  {
    id: 'architect',
    name: 'Principal Solutions Architect',
    role: 'Enterprise Systems & Full-Stack',
    icon: BrainCircuit,
    badge: 'Architecture',
    description: 'Specializes in .NET 9 Clean Architecture, React 19, CQRS, Microservices, and high-load databases.',
    systemInstruction: `You are Ttech SOLUTIONS' Principal Solutions Architect.
Provide production-grade software architecture, data schemas, API contracts, and technology stack recommendations.
Specialization: .NET 9, React 19, TypeScript, PostgreSQL, SQL Server, Redis, Clean Architecture, MediatR, Azure/AWS.
Format answers in structured Markdown with technical clarity, bullet points, and code snippets when helpful.`,
    samplePrompts: [
      'Architect a .NET 9 + React 19 system designed for 100k concurrent users',
      'What database schema do you recommend for a multi-tenant SaaS platform?',
      'How does Ttech handle automated CI/CD and zero-downtime blue/green deployments?',
    ],
  },
  {
    id: 'saas-strategist',
    name: 'SaaS Product Strategist',
    role: 'MVP Scoping & Monetization',
    icon: Sparkles,
    badge: 'SaaS Strategy',
    description: 'Helps scope MVPs, prioritize roadmaps, design subscription billing, and maximize time-to-market.',
    systemInstruction: `You are Ttech SOLUTIONS' Lead SaaS Product Strategist.
Help founders and enterprises plan MVP feature matrices, user journeys, Stripe multi-tier subscriptions, and 4-8 week delivery roadmaps.
Keep answers concise, realistic, and commercially driven.`,
    samplePrompts: [
      'What features must be in my v1 MVP vs v2 roadmap to launch in 6 weeks?',
      'How should we structure Stripe billing for monthly/annual tiered SaaS pricing?',
      'What are the key technical risks when building a B2B SaaS workflow app?',
    ],
  },
  {
    id: 'estimator',
    name: 'Project Cost & Sprint Estimator',
    role: 'Budgets, Milestones & Timelines',
    icon: DollarSign,
    badge: 'Estimator',
    description: 'Provides instant ballpark estimates, milestone breakdowns, sprint cadences, and ROI evaluations.',
    systemInstruction: `You are Ttech SOLUTIONS' Technical Estimator.
Provide ballpark estimates based on Ttech's transparent pricing:
- MVP Web Application: $3,500 – $6,500 USD (4–6 weeks)
- Full-Featured SaaS Platform: $7,000 – $18,000+ USD (8–12 weeks)
- Mobile App (React Native/Flutter): $5,000 – $12,000 USD (6–10 weeks)
- Dedicated Developer Retainer: $2,500 – $5,000 / month
Always mention Ttech's 2-week agile sprints, 100% IP ownership, and 30-day post-launch warranty.`,
    samplePrompts: [
      'Estimate the cost and timeline for a real estate marketplace platform',
      'What is the price breakdown for a custom CRM with role-based permissions?',
      'How are payment milestones structured across development sprints?',
    ],
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation Specialist',
    role: 'LLM Agents & Workflow Automation',
    icon: Cpu,
    badge: 'AI Automation',
    description: 'Designs custom LLM pipelines, RAG with vector search, automated document ingestion, and intake bots.',
    systemInstruction: `You are Ttech SOLUTIONS' AI & Automation Engineer.
Specializes in Google Gemini 2.5 Flash / Pro, OpenAI APIs, pgvector/Pinecone RAG, intelligent document parsing, and agentic workflows.
Explain how to safely deploy AI features with strict JSON schemas and sub-second latencies.`,
    samplePrompts: [
      'How can we implement RAG over 10,000 PDF documents with Gemini & pgvector?',
      'Design an automated customer intake AI bot with CRM webhook integration',
      'What is the cost of running LLM inference at scale for 50,000 daily queries?',
    ],
  },
  {
    id: 'devops',
    name: 'Cloud DevOps & Security Engineer',
    role: 'Azure, AWS, Docker & Compliance',
    icon: Cloud,
    badge: 'DevOps & Cloud',
    description: 'Configures containerized infrastructure, HIPAA/OWASP security hardening, SSL edge CDN, and 99.99% uptime.',
    systemInstruction: `You are Ttech SOLUTIONS' Lead DevOps & Security Architect.
Advise on Microsoft Azure Container Apps, AWS ECS/EKS, Docker, GitHub Actions CI/CD, SSL certificates, database replication, and OWASP Top 10 hardening.`,
    samplePrompts: [
      'How to set up automated GitHub Actions CI/CD with Docker & Azure Container Apps?',
      'What security practices are mandatory for HIPAA and fintech compliance?',
      'How do you achieve 99.99% edge uptime and automated database backups?',
    ],
  },
];

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  personaId?: string;
}

export default function AIConsultantPage() {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<ConsultantPersona>(PERSONAS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-init',
      role: 'model',
      content: `### 👋 Welcome to Ttech AI Technical Consultant!

I am your dedicated **Principal Solutions Architect & Engineering Advisor** from Ttech SOLUTIONS (*"Think. Transform. Trust."*).

**How can I assist your project today?**
- 🏗️ **Architecture & Stack Scoping** (.NET 9, React 19, Supabase, Cloud Infrastructure)
- 💰 **Ballpark Cost & Milestone Estimates** for MVPs, SaaS, or Mobile Apps
- 🤖 **Custom AI & Automation Pipelines** with Gemini & Vector RAG
- ⏱️ **Sprint Cadence & Delivery Roadmaps** (2-week sprints, 100% IP ownership)

*Select an engineering persona above or pick a sample prompt below to begin your consultation.*`,
      timestamp: Date.now(),
      personaId: PERSONAS[0].id,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemInstruction: selectedPersona.systemInstruction,
          model: 'gemini-2.5-flash',
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API returned an error');
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text || 'Thank you for your question! How else can I assist your technical roadmap?',
        timestamp: Date.now(),
        personaId: selectedPersona.id,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error('AI Consultant Error:', err);
      // Fallback
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: `### 💡 Technical Solutions Advisor · Ttech SOLUTIONS\n\nThank you for reaching out regarding: **"${query.slice(0, 100)}"**.\n\nOur engineering team delivers enterprise builds with **.NET Core 9, React 19, and scalable Cloud Infrastructure**:\n- **Sprint Delivery**: 2-week agile sprints with bi-weekly live staging demos.\n- **Ownership**: 100% IP and source code ownership transferred directly upon milestone completion.\n- **Warranty**: 30-day comprehensive post-launch warranty.\n\n*Would you like to transfer these requirements directly to our project proposal form or chat on WhatsApp (+92 348 9763998)?*`,
        timestamp: Date.now(),
        personaId: selectedPersona.id,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `### 🔄 Session Reset\n\nSwitched to **${selectedPersona.name}** mode. What technical topic or project scope would you like to explore?`,
        timestamp: Date.now(),
        personaId: selectedPersona.id,
      },
    ]);
  };

  const handleTransferToInquiry = (summaryText: string) => {
    navigate('/contact', {
      state: {
        description: `[AI Consultant Consultation Transcript]:\n\n${summaryText}`,
        service: 'SaaS & Custom Web Application',
      },
    });
  };

  return (
    <>
      <SEO
        title="AI Technical Consultant | Ttech SOLUTIONS"
        description="Interact live with Ttech SOLUTIONS AI Technical Consultant. Get instant software architecture blueprints, MVP cost estimates, tech stack recommendations, and sprint plans."
        canonical="/ai-consultant"
      />

      <main className="flex-1 pt-24 pb-16 bg-[#F8FBFF] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="flex justify-center mb-3">
              <ShimmerBadge icon={<Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />}>
                Live AI Technical Consultation Studio
              </ShimmerBadge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-3">
              Ttech{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                AI Consultant
              </span>
            </h1>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
              Real-time engineering answers, architectural blueprints, MVP budget scoping, and technology roadmaps tailored for enterprise leaders and startup founders.
            </p>
          </div>

          {/* Persona Selection Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase text-[#7B8AA3] tracking-wider">
                Select Consulting Specialist:
              </span>
              <span className="text-[11px] text-[#2563EB] font-medium hidden sm:inline">
                Active: {selectedPersona.name}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PERSONAS.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPersona.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPersona(p);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#2563EB] shadow-md shadow-[#2563EB]/10 ring-2 ring-[#2563EB]/20'
                        : 'bg-white/80 border-[#DCE8F8] hover:border-[#60A5FA] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#2563EB] text-white' : 'bg-[#EAF2FF] text-[#2563EB]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md font-semibold ${
                          isSelected ? 'bg-[#EAF2FF] text-[#2563EB]' : 'bg-[#F1F7FF] text-[#7B8AA3]'
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1220] truncate">{p.name}</div>
                      <div className="text-[10px] text-[#7B8AA3] truncate">{p.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Chat Studio Workspace */}
          <div className="bg-white rounded-3xl border border-[#DCE8F8] shadow-[0_12px_40px_rgba(37,99,235,0.06)] overflow-hidden flex flex-col h-[680px]">
            
            {/* Studio Header Bar */}
            <div className="px-6 py-4 border-b border-[#DCE8F8] bg-gradient-to-r from-[#F8FBFF] to-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white shadow-md shadow-[#2563EB]/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0B1220]">{selectedPersona.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">Online</span>
                  </div>
                  <p className="text-[11px] text-[#7B8AA3] line-clamp-1">{selectedPersona.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-xl border border-[#DCE8F8] bg-white text-[#7B8AA3] hover:text-[#0B1220] hover:border-[#60A5FA] text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <a
                  href="https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20am%20chatting%20with%20your%20AI%20Consultant%20and%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Lead</span>
                </a>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FBFAFF]/50 overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                        isUser
                          ? 'bg-[#2563EB] text-white rounded-tr-xs'
                          : 'bg-white border border-[#DCE8F8] text-[#0B1220] rounded-tl-xs'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none text-xs sm:text-sm leading-relaxed space-y-2">
                        {m.content.split('\n').map((line, lIdx) => {
                          if (line.startsWith('### ')) {
                            return (
                              <h4 key={lIdx} className={`font-bold text-sm sm:text-base mt-2 mb-1 ${isUser ? 'text-white' : 'text-[#0B1220]'}`}>
                                {line.replace('### ', '')}
                              </h4>
                            );
                          }
                          if (line.startsWith('- ') || line.startsWith('* ')) {
                            return (
                              <div key={lIdx} className="flex items-start gap-2 pl-1">
                                <span className={isUser ? 'text-blue-200' : 'text-[#2563EB]'}>•</span>
                                <span>{line.replace(/^[-*]\s+/, '')}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('> ')) {
                            return (
                              <div key={lIdx} className={`p-2 rounded-lg border-l-2 my-2 text-xs italic ${isUser ? 'bg-white/10 border-white' : 'bg-[#F1F7FF] border-[#2563EB] text-[#475569]'}`}>
                                {line.replace('> ', '')}
                              </div>
                            );
                          }
                          if (!line.trim()) {
                            return <div key={lIdx} className="h-1.5" />;
                          }
                          return <p key={lIdx}>{line}</p>;
                        })}
                      </div>

                      {/* Action buttons for model messages */}
                      {!isUser && (
                        <div className="mt-3 pt-3 border-t border-[#DCE8F8] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(m.id, m.content)}
                              className="text-[#7B8AA3] hover:text-[#2563EB] flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              {copiedId === m.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600 font-medium">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Blueprint</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleTransferToInquiry(m.content)}
                              className="text-[#2563EB] hover:text-[#1D4ED8] font-bold flex items-center gap-1 cursor-pointer ml-2 transition-colors"
                            >
                              <span>Convert to Project Proposal</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-[10px] text-[#7B8AA3] font-mono">
                            Ttech Architecture Standard
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-[#DCE8F8] rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-xs text-[#7B8AA3]">
                    <Sparkles className="w-4 h-4 text-[#2563EB] animate-spin" />
                    <span>Architecting solution...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Sample Prompts Tray */}
            <div className="px-4 sm:px-6 py-2 bg-white border-t border-[#DCE8F8] overflow-x-auto flex items-center gap-2 no-scrollbar">
              <span className="text-[10px] font-mono font-bold uppercase text-[#7B8AA3] shrink-0">
                Suggested Prompts:
              </span>
              {selectedPersona.samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1 rounded-full bg-[#F1F7FF] hover:bg-[#EAF2FF] text-[#2563EB] text-[11px] font-medium border border-[#DCE8F8] shrink-0 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Submission Area */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#DCE8F8]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Ask ${selectedPersona.name} anything about architecture, costs, sprint roadmaps, or AI...`}
                  rows={1}
                  className="flex-1 resize-none bg-[#F8FBFF] border border-[#DCE8F8] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all max-h-32"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 disabled:hover:bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25 transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
        <div className="mt-20">
          <Footer onOpenConsultation={() => navigate('/contact')} />
        </div>
      </main>
    </>
  );
}
