import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Send,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { AIScopeResult } from '../types';

interface AIScoperSectionProps {
  onApplyScopeToInquiry: (scope: AIScopeResult) => void;
}

export const AIScoperSection: React.FC<AIScoperSectionProps> = ({
  onApplyScopeToInquiry,
}) => {
  const [projectIdea, setProjectIdea] = useState('');
  const [serviceType, setServiceType] = useState('SaaS Platform & Web App');
  const [preferredTech, setPreferredTech] = useState('.NET Core 9 + React (Enterprise)');
  const [loading, setLoading] = useState(false);
  const [scopeResult, setScopeResult] = useState<AIScopeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sampleIdeas = [
    'Multi-tenant B2B SaaS platform for medical equipment leasing with automated recurring invoicing and role-based staff permissions.',
    'High-velocity e-commerce portal with 50ms page load times, custom checkout funnel, and live inventory sync.',
    'Enterprise workflow management system with C# ASP.NET Core backend, real-time WebSockets, and React executive dashboard.',
  ];

  const handleGenerateScope = async () => {
    if (!projectIdea.trim()) {
      setErrorMsg('Please describe your project idea or select one of the examples below.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai-scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription: projectIdea,
          serviceType,
          preferredTech,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate architecture blueprint.');
      }

      const data = await res.json();
      setScopeResult(data);
    } catch (err: any) {
      console.error('Error generating scope:', err);
      setErrorMsg('Unable to contact AI scoping engine. Showing offline architecture blueprint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-scoper" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Intelligent Solutions Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            AI-Powered Technical{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Architecture Advisor
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Describe your software vision in plain language. Our AI Systems Architect will instantly analyze your requirements and construct a full technical stack, database model, and sprint roadmap.
          </p>
        </div>

        {/* Input Card */}
        <div className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Service Type
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="SaaS Platform & Web App">SaaS Platform &amp; Web App</option>
                <option value="Custom Enterprise Software (.NET)">Custom Enterprise Software (.NET)</option>
                <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                <option value="Corporate Website">Corporate Website &amp; Portal</option>
                <option value="E-Commerce Solution">E-Commerce Solution</option>
                <option value="AI Automation Workflow">AI Automation Workflow</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Preferred Technology Architecture
              </label>
              <select
                value={preferredTech}
                onChange={(e) => setPreferredTech(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value=".NET Core 9 + React (Enterprise)">.NET Core 9 + React (Enterprise Choice)</option>
                <option value="React + Next.js Full Stack">React + Next.js Full Stack</option>
                <option value="Node.js Express + React 19">Node.js Express + React 19</option>
                <option value="Python FastAPI + AI + React">Python FastAPI + AI + React</option>
                <option value="PHP / Laravel 11 + Vue/React">PHP / Laravel 11 + Vue/React</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Describe Your Application or Business Requirement:
            </label>
            <textarea
              rows={3}
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="e.g. I need an enterprise dashboard for managing multi-warehouse shipments, with real-time driver tracking, automated barcode generation, and role-based access for logistics managers..."
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Sample Prompts */}
          <div className="mb-6">
            <span className="text-[11px] text-slate-400 mr-2">Or try an example:</span>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {sampleIdeas.map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => setProjectIdea(idea)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-800 transition-all text-left cursor-pointer truncate max-w-xs"
                >
                  &quot;{idea.slice(0, 45)}...&quot;
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center justify-end">
            <button
              onClick={handleGenerateScope}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Architecture...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Generate Architecture &amp; Sprint Blueprint</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scope Results Display */}
        {scopeResult && (
          <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-cyan-500/50 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Architectural Synthesis Completed
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-2">
                  {scopeResult.projectName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  Timeline: <strong className="text-white">{scopeResult.estimatedDuration}</strong>
                </span>
                <span className="text-xs px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
                  Ballpark: {scopeResult.ballparkCostRange}
                </span>
              </div>
            </div>

            {/* Strategic Advice Callout */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 mb-8 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-0.5">
                  Ttech Solutions Strategic Architectural Guidance:
                </div>
                <div className="text-xs text-slate-200 leading-relaxed">
                  {scopeResult.strategicAdvice}
                </div>
              </div>
            </div>

            {/* Recommended Architecture Tiers */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Recommended System Tiers:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono">CLIENT UI LAYER</span>
                  <span className="font-semibold text-cyan-300">{scopeResult.recommendedArchitecture.frontend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono">ENTERPRISE BACKEND</span>
                  <span className="font-semibold text-purple-300">{scopeResult.recommendedArchitecture.backend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono">DATABASE &amp; PERSISTENCE</span>
                  <span className="font-semibold text-amber-300">{scopeResult.recommendedArchitecture.database}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono">SECURITY &amp; RBAC</span>
                  <span className="font-semibold text-emerald-300">{scopeResult.recommendedArchitecture.security}</span>
                </div>
              </div>
            </div>

            {/* Key Modules */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Core Functional Modules:
              </h4>
              <div className="space-y-2.5">
                {scopeResult.keyModules.map((mod, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-white">{mod.title}</div>
                      <div className="text-[11px] text-slate-400">{mod.description}</div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-slate-900 text-cyan-400 font-mono shrink-0">
                      {mod.techComponent}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sprint Roadmap */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Phased Sprint Roadmap:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {scopeResult.sprintPhases.map((phase, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] font-mono text-cyan-400">Phase {idx + 1} ({phase.durationWeeks} wks)</div>
                    <div className="text-xs font-bold text-white mt-1 mb-2">{phase.phase}</div>
                    <ul className="text-[10px] text-slate-400 space-y-1">
                      {phase.deliverables.slice(0, 2).map((d, di) => (
                        <li key={di}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-800 gap-3">
              <div className="text-xs text-slate-400">
                Ready to review this scope with our Principal Architect?
              </div>
              <button
                onClick={() => onApplyScopeToInquiry(scopeResult)}
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Book Strategy Call With This Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
