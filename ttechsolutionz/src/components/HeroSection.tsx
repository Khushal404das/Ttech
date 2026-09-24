import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Zap,
  Terminal,
  Laptop,
  Smartphone,
  Eye,
  TrendingUp,
  Server,
  Star,
  Globe,
  Shield,
  ShoppingCart,
  Palette,
  Gauge,
  Box,
} from 'lucide-react';
import { TtechLogo } from './TtechLogo';

interface HeroSectionProps {
  onOpenEstimator: () => void;
  onOpenConsultation: () => void;
  onExploreStack: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEstimator,
  onOpenConsultation,
  onExploreStack,
}) => {
  const [deviceTab, setDeviceTab] = useState<'preview' | 'dotnet' | 'react' | 'mobile'>('preview');

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-circuit-grid">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-blue-700/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-600/10 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Floating 3D Cubes (from "build your digital future" & "your idea our technology" posters) */}
      <div className="absolute top-24 left-12 hidden lg:block animate-float-slow pointer-events-none z-0">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/30 backdrop-blur-md rotate-12 shadow-xl shadow-cyan-500/10 flex items-center justify-center text-cyan-300">
          <Box className="w-7 h-7" />
        </div>
      </div>

      <div className="absolute top-36 right-16 hidden lg:block animate-float-reverse pointer-events-none z-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-600/10 border border-purple-400/30 backdrop-blur-md -rotate-12 shadow-xl shadow-purple-500/10 flex items-center justify-center text-purple-300">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      <div className="absolute bottom-32 left-10 hidden xl:block animate-float-reverse pointer-events-none z-0">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-400/30 backdrop-blur-md rotate-45 shadow-xl shadow-blue-500/10 flex items-center justify-center text-blue-300">
          <Cpu className="w-8 h-8 -rotate-45" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges / Slogan */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Think • Transform • Trust</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 text-slate-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-emerald-400 font-semibold">Available</span>
            <span className="text-slate-400">for Q2/Q3 Projects</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <div className="inline-block text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold mb-3">
            YOUR IDEA. OUR TECHNOLOGY.
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Build Your Digital Future with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              Ttech SOLUTIONS
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Technology That Moves Your Business Forward. We build modern, responsive, and high-performance{' '}
            <span className="text-cyan-300 font-semibold">.NET &amp; C# systems</span>, ultra-responsive{' '}
            <span className="text-white font-semibold">React &amp; Next.js applications</span>, scalable SaaS platforms, and conversion-obsessed UI/UX designs.
          </p>

          {/* Quick Target Capabilities Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">Business Websites</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">E-Commerce</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">Landing Pages</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">Portfolio Websites</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">Custom Web Solutions</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-cyan-600/30 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Ready to Build? Let&apos;s Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenEstimator}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 font-semibold text-sm sm:text-base border border-cyan-800/50 hover:border-cyan-500/60 shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Instant Cost &amp; Timeline Estimator</span>
          </button>

          <button
            onClick={onExploreStack}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-medium text-sm border border-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-slate-400" />
            <span>Explore .NET &amp; Tech Stack</span>
          </button>
        </div>

        {/* 4 Pillars Bar: Fast • Responsive • Secure • Scalable */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
          {[
            { text: 'Fast Performance', icon: Gauge, color: 'text-amber-400' },
            { text: '100% Responsive', icon: Smartphone, color: 'text-cyan-400' },
            { text: 'Enterprise Secure', icon: Shield, color: 'text-emerald-400' },
            { text: 'Cloud Scalable', icon: Server, color: 'text-purple-400' },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <Icon className={`w-3.5 h-3.5 ${feat.color}`} />
                <span>{feat.text}</span>
              </div>
            );
          })}
        </div>

        {/* Key Trust Signals from Banners */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-16">
          {[
            { label: 'Clean Code Architecture', value: '100% Tested', desc: 'Maintainable & Modular' },
            { label: 'Enterprise Performance', value: 'Sub-50ms API', desc: '.NET 9 & React 19' },
            { label: 'Delivery Commitment', value: 'On-Time', desc: 'Milestone-based Sprints' },
            { label: 'Post-Delivery Care', value: '24/7 Support', desc: 'SLA & Cloud Monitoring' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-center transition-transform hover:-translate-y-0.5"
            >
              <div className="text-cyan-400 font-display font-bold text-lg sm:text-xl">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{item.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Interactive Device Showcase: Sleek Laptop & Code Simulator with Floating Orbit Glass Badges */}
        <div className="max-w-5xl mx-auto relative">
          {/* Floating Glass Pills (as seen in poster: WEB, MOBILE, UI/UX, SECURITY, E-COMMERCE, PERFORMANCE) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold absolute -top-5 left-10 z-20 shadow-xl shadow-cyan-950/60 animate-float-slow backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>WEB</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-300 text-xs font-bold absolute -top-5 right-12 z-20 shadow-xl shadow-blue-950/60 animate-float-reverse backdrop-blur-md">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span>MOBILE</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-bold absolute top-1/2 -left-8 -translate-y-1/2 z-20 shadow-xl shadow-purple-950/60 animate-float-reverse backdrop-blur-md">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span>UI/UX</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold absolute top-1/2 -right-8 -translate-y-1/2 z-20 shadow-xl shadow-emerald-950/60 animate-float-slow backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>SECURITY</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold absolute -bottom-5 left-16 z-20 shadow-xl shadow-amber-950/60 animate-float-reverse backdrop-blur-md">
            <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
            <span>E-COMMERCE</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold absolute -bottom-5 right-20 z-20 shadow-xl shadow-cyan-950/60 animate-float-slow backdrop-blur-md">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>PERFORMANCE</span>
          </div>

          <div className="rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-cyan-500/30 via-slate-800/60 to-slate-900/80 shadow-2xl shadow-cyan-950/40">
            {/* Top Bar with Simulator Controls */}
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800/90 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/70 border-b border-slate-800 gap-3">
                {/* Window Traffic Dots */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="hidden sm:inline text-xs font-mono text-slate-400 ml-2">
                    ttech-enterprise-suite.v2 // high-velocity architecture
                  </span>
                </div>

                {/* Interactive Simulator Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setDeviceTab('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      deviceTab === 'preview'
                        ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live SaaS App</span>
                  </button>
                  <button
                    onClick={() => setDeviceTab('dotnet')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      deviceTab === 'dotnet'
                        ? 'bg-purple-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Server className="w-3.5 h-3.5 text-purple-300" />
                    <span>.NET 9 C# Backend</span>
                  </button>
                  <button
                    onClick={() => setDeviceTab('react')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      deviceTab === 'react'
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-blue-300" />
                    <span>React Frontend</span>
                  </button>
                  <button
                    onClick={() => setDeviceTab('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      deviceTab === 'mobile'
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Mobile UI</span>
                  </button>
                </div>
              </div>

              {/* Screen Body */}
              <div className="p-4 sm:p-8 min-h-[380px] bg-slate-950 flex flex-col justify-center">
                {deviceTab === 'preview' && (
                  <div className="animate-in fade-in duration-300">
                    {/* Simulated SaaS Dashboard Header */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
                          T
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Ttech Cloud Analytics Portal</div>
                          <div className="text-[11px] text-slate-400">Enterprise Tenant #4829 · Real-Time Telemetry</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          API Latency: 24ms
                        </span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Monthly Recurring Revenue</div>
                        <div className="text-2xl font-bold text-white font-display">$84,320.00</div>
                        <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>+28.4% vs last sprint</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Active Cloud Users</div>
                        <div className="text-2xl font-bold text-cyan-400 font-display">14,920</div>
                        <div className="text-xs text-cyan-300 mt-1">Multi-tenant SQL Isolation</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-xs text-slate-400 mb-1">Infrastructure Health</div>
                        <div className="text-2xl font-bold text-emerald-400 font-display">99.98%</div>
                        <div className="text-xs text-slate-400 mt-1">Azure App Services + Docker</div>
                      </div>
                    </div>

                    {/* Simulated Graph / Workflow */}
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Full-Stack Custom Workflow Engine</div>
                          <div className="text-[11px] text-slate-400">
                            C# ASP.NET Core 9 backend linked to React client with sub-second SignalR socket sync.
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={onOpenEstimator}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
                      >
                        Calculate My Custom Project Cost
                      </button>
                    </div>
                  </div>
                )}

                {deviceTab === 'dotnet' && (
                  <div className="animate-in fade-in duration-300 font-mono text-xs text-slate-300 leading-relaxed bg-[#020617] p-5 rounded-xl border border-purple-950/60 overflow-x-auto">
                    <div className="text-purple-400 mb-2">// Enterprise C# ASP.NET Core 9 Clean Architecture Controller</div>
                    <div><span className="text-blue-400">namespace</span> <span className="text-yellow-300">TtechSolutions.Enterprise.Controllers</span>;</div>
                    <br />
                    <div>[<span className="text-emerald-400">ApiController</span>]</div>
                    <div>[<span className="text-emerald-400">Route</span>(<span className="text-amber-300">&quot;api/v1/[controller]&quot;</span>)]</div>
                    <div><span className="text-blue-400">public class</span> <span className="text-yellow-300">SaaSOrdersController</span> : <span className="text-emerald-400">BaseApiController</span></div>
                    <div>{'{'}</div>
                    <div className="pl-4">
                      <span className="text-blue-400">private readonly</span> <span className="text-emerald-400">ISender</span> _mediator;
                    </div>
                    <div className="pl-4">
                      <span className="text-blue-400">public</span> <span className="text-yellow-300">SaaSOrdersController</span>(<span className="text-emerald-400">ISender</span> mediator) =&gt; _mediator = mediator;
                    </div>
                    <br />
                    <div className="pl-4">
                      [<span className="text-emerald-400">HttpPost</span>(<span className="text-amber-300">&quot;checkout&quot;</span>)]
                    </div>
                    <div className="pl-4">
                      [<span className="text-emerald-400">Authorize</span>(Roles = <span className="text-amber-300">&quot;EnterpriseClient,Admin&quot;</span>)]
                    </div>
                    <div className="pl-4">
                      <span className="text-blue-400">public async</span> <span className="text-emerald-400">Task&lt;IActionResult&gt;</span> <span className="text-yellow-300">ProcessSubscription</span>([<span className="text-emerald-400">FromBody</span>] <span className="text-emerald-400">CreateOrderCommand</span> cmd)
                    </div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8">
                      <span className="text-blue-400">var</span> result = <span className="text-blue-400">await</span> _mediator.Send(cmd);
                    </div>
                    <div className="pl-8">
                      <span className="text-blue-400">return</span> result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
                    </div>
                    <div className="pl-4">{'}'}</div>
                    <div>{'}'}</div>
                  </div>
                )}

                {deviceTab === 'react' && (
                  <div className="animate-in fade-in duration-300 font-mono text-xs text-slate-300 leading-relaxed bg-[#020617] p-5 rounded-xl border border-blue-950/60 overflow-x-auto">
                    <div className="text-cyan-400 mb-2">// Modern React 19 + TypeScript High-Performance Component</div>
                    <div><span className="text-blue-400">import</span> React, {'{'} useState, useTransition {'}'} <span className="text-blue-400">from</span> <span className="text-amber-300">&apos;react&apos;</span>;</div>
                    <div><span className="text-blue-400">import</span> {'{'} useQuery, useMutation {'}'} <span className="text-blue-400">from</span> <span className="text-amber-300">&apos;@tanstack/react-query&apos;</span>;</div>
                    <br />
                    <div><span className="text-blue-400">export const</span> <span className="text-yellow-300">EnterpriseAnalyticsView</span>: React.FC = () =&gt; {'{'}</div>
                    <div className="pl-4">
                      <span className="text-blue-400">const</span> {'{'} data, isLoading {'}'} = useQuery({'{'} queryKey: [<span className="text-amber-300">&apos;metrics&apos;</span>], queryFn: fetchSaaSMetrics {'}'});
                    </div>
                    <div className="pl-4">
                      <span className="text-blue-400">const</span> [isPending, startTransition] = useTransition();
                    </div>
                    <br />
                    <div className="pl-4">
                      <span className="text-blue-400">return</span> (
                    </div>
                    <div className="pl-8 text-cyan-200">
                      &lt;<span className="text-emerald-400">div</span> <span className="text-purple-300">className</span>=<span className="text-amber-300">&quot;grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn&quot;</span>&gt;
                    </div>
                    <div className="pl-12 text-slate-300">
                      &lt;<span className="text-emerald-400">MetricCard</span> <span className="text-purple-300">title</span>=<span className="text-amber-300">&quot;Conversion Rate&quot;</span> <span className="text-purple-300">val</span>={'{'}&quot;4.82%&quot;{'}'} /&gt;
                    </div>
                    <div className="pl-8 text-cyan-200">
                      &lt;/<span className="text-emerald-400">div</span>&gt;
                    </div>
                    <div className="pl-4">);</div>
                    <div>{'}'};</div>
                  </div>
                )}

                {deviceTab === 'mobile' && (
                  <div className="animate-in fade-in duration-300 max-w-sm mx-auto p-4 rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                      <div className="text-xs font-bold text-white">Ttech Mobile Native PWA</div>
                      <span className="text-[10px] text-cyan-400">100% Responsive</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-slate-800 text-xs">
                        <div className="text-slate-400 text-[10px]">Real-Time Notifications</div>
                        <div className="font-semibold text-white">Order #8920 Processed Successfully</div>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-xs">
                        <div className="text-cyan-300 text-[10px]">Touch-Optimized UX</div>
                        <div className="font-semibold text-white">Fluid 60FPS Micro-Animations</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
