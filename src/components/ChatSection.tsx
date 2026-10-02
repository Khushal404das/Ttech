import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User as UserIcon,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Zap,
  BrainCircuit,
  SlidersHorizontal,
  BookmarkPlus,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { ChatMessage, ChatPersona, GeminiModelType, WorkspaceNote } from '../types';
import type { User } from 'firebase/auth';

interface ChatSectionProps {
  user: User | null;
  onSaveToNotes: (note: Omit<WorkspaceNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onTurnIncrement: () => void;
}

const PERSONAS: ChatPersona[] = [
  {
    id: 'general',
    name: 'General Assistant',
    model: 'gemini-3.8-flash',
    description: 'Versatile, balanced reasoning, writing & everyday problem solving',
    badge: 'Standard',
    icon: 'Bot',
    systemInstruction:
      'You are Ttech SOLUTIONS Technical Assistant, a versatile and thoughtful AI collaborator. Give well-structured, clear, and insightful answers with markdown formatting.',
  },
  {
    id: 'fast',
    name: 'Speedy Task Runner',
    model: 'gemini-flash-latest',
    description: 'Ultra low latency, quick summaries, proofreading and short answers',
    badge: 'Fast',
    icon: 'Zap',
    systemInstruction:
      'You are a high-speed executive assistant. Deliver concise, direct, bullet-pointed, and actionable responses without fluff.',
  },
  {
    id: 'pro',
    name: 'Deep Architect & Strategist',
    model: 'gemini-3.8-flash',
    description: 'Complex logic, algorithmic depth, architectural decisions & system design',
    badge: 'Pro Reasoning',
    icon: 'BrainCircuit',
    systemInstruction:
      'You are an elite Principal Software Architect and Systems Strategist. Provide deep technical rigor, step-by-step analysis, edge case exploration, and production-grade code architectures.',
  },
];

export const ChatSection: React.FC<ChatSectionProps> = ({
  user,
  onSaveToNotes,
  onTurnIncrement,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<ChatPersona>(PERSONAS[0]);
  const [customSystemInstruction, setCustomSystemInstruction] = useState<string>(
    PERSONAS[0].systemInstruction
  );
  const [showConfig, setShowConfig] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        "Hello! I am your multi-turn Gemini assistant. Choose a role or model profile above, configure custom instructions if desired, and let me know how I can help you today.",
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSelectPersona = (persona: ChatPersona) => {
    setSelectedPersona(persona);
    setCustomSystemInstruction(persona.systemInstruction);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    setErrorMsg(null);
    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: Date.now(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    onTurnIncrement();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemInstruction: customSystemInstruction,
          model: selectedPersona.model,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text || 'No response content returned.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, modelMessage]);
      onTurnIncrement();
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err.message || 'Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToNotes = (msg: ChatMessage) => {
    onSaveToNotes({
      title: `Gemini Note (${selectedPersona.name})`,
      content: msg.content,
      category: 'AI Insights',
    });
    setSavedId(msg.id);
    setTimeout(() => setSavedId(null), 2500);
  };

  const handleClearHistory = () => {
    if (window.confirm('Reset this conversation thread?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'model',
          content: `Conversation reset. Ready with ${selectedPersona.name} (${selectedPersona.model}).`,
          timestamp: Date.now(),
        },
      ]);
      setErrorMsg(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in duration-200">
      {/* Top Bar: Persona Selection & System Instruction Toggle */}
      <div className="border-b border-slate-800 bg-slate-950/70 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {PERSONAS.map((p) => {
            const isSelected = selectedPersona.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                {p.id === 'fast' && <Zap className="w-3.5 h-3.5 text-amber-300" />}
                {p.id === 'general' && <Sparkles className="w-3.5 h-3.5 text-sky-300" />}
                {p.id === 'pro' && <BrainCircuit className="w-3.5 h-3.5 text-indigo-300" />}
                <span>{p.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({p.model})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showConfig
                ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Custom System Instruction"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Role Prompt</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Collapsible System Instruction Panel */}
      {showConfig && (
        <div className="border-b border-slate-800 bg-slate-950/90 p-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span>Role System Instruction ({selectedPersona.name})</span>
            </label>
            <button
              onClick={() => setCustomSystemInstruction(selectedPersona.systemInstruction)}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Reset to default
            </button>
          </div>
          <textarea
            value={customSystemInstruction}
            onChange={(e) => setCustomSystemInstruction(e.target.value)}
            rows={2}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-sans"
            placeholder="Define custom behavior or instructions for Gemini..."
          />
        </div>
      )}

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-indigo-400'
                }`}
              >
                {isUser ? (
                  user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-xl object-cover"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`group relative rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-sm shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-sm">{msg.content}</div>

                {/* Footer / Actions for model messages */}
                {!isUser && (
                  <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 hover:text-slate-200 rounded cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleSaveToNotes(msg)}
                        className="p-1 hover:text-amber-300 rounded cursor-pointer"
                        title="Save to Workspace Notes"
                      >
                        {savedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <BookmarkPlus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800/90 border border-slate-700/60 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-slate-300 text-xs">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>{selectedPersona.name} is thinking...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-3 text-red-300 text-xs flex items-center gap-2 max-w-2xl mx-auto">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts if empty or early in conversation */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {[
            'Explain how Firebase Auth and Firestore work together',
            'Suggest 3 fast microservice architectures',
            'Draft a clean REST API specification',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs bg-slate-800/60 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/60 transition-colors cursor-pointer truncate max-w-xs"
            >
              💡 {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <div className="border-t border-slate-800 bg-slate-950/80 p-3 sm:p-4">
        <div className="flex items-end gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder={`Message ${selectedPersona.name} (${selectedPersona.model})... (Shift+Enter for newline)`}
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none resize-none px-2 py-1 font-sans"
            disabled={isLoading}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
            title="Send Message"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
