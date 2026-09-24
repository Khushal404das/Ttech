import React, { useState } from 'react';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface TechStackSectionProps {
  onOpenEstimatorWithStack: (stackName: string) => void;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  onOpenEstimatorWithStack,
}) => {
  const [activeTab, setActiveTab] = useState<'dotnet' | 'frontend' | 'backends' | 'cloud-db'>('dotnet');
  const [selectedLayer, setSelectedLayer] = useState<number>(2); // Default to .NET Core Layer

  const architectureLayers = [
    {
      level: 1,
      name: 'Client & Presentation Layer',
      subtitle: 'React 19, Next.js SSR, Tailwind CSS, Responsive PWA',
      description:
        'Pixel-perfect, 60fps responsive interfaces engineered for lightning-quick interaction times, SEO score of 98+, and dynamic user experiences.',
      techs: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion', 'Vite'],
      badge: 'Client Interface',
      iconColor: 'text-cyan-400',
    },
    {
      level: 2,
      name: 'API Gateway & Security Armor',
      subtitle: 'JWT, ASP.NET Identity, CORS Hardening, Rate Limiting',
      description:
        'Hardened entry point with token authentication, claim-based authorization, request throttling, and SSL termination.',
      techs: ['JWT Bearer', 'OAuth 2.0', 'ASP.NET Identity', 'Rate Limiter', 'CORS Security'],
      badge: 'Security Perimeter',
      iconColor: 'text-emerald-400',
    },
    {
      level: 3,
      name: '.NET Core Enterprise Business Engine',
      subtitle: 'ASP.NET Core 9, C#, Clean Architecture, MediatR CQRS',
      description:
        'The powerhouse core preferred by our lead architects: ultra-high concurrency, memory-efficient garbage collection, strong type safety, and maintainable domain-driven design.',
      techs: ['C# 13', '.NET 9', 'Minimal APIs', 'MediatR CQRS', 'FluentValidation', 'SignalR'],
      badge: 'Core Engine (Recommended)',
      iconColor: 'text-purple-400',
    },
    {
      level: 4,
      name: 'Data Persistence & High-Speed Cache',
      subtitle: 'SQL Server, PostgreSQL, Entity Framework Core, Redis',
      description:
        'ACID-compliant relational schemas with Entity Framework Core migrations, combined with in-memory Redis caching for sub-5ms response speeds.',
      techs: ['Entity Framework Core 9', 'Microsoft SQL Server', 'PostgreSQL', 'Redis Cache', 'Firebase'],
      badge: 'Persistence Tier',
      iconColor: 'text-amber-400',
    },
    {
      level: 5,
      name: 'Cloud Hosting & CI/CD Pipelines',
      subtitle: 'Microsoft Azure, Docker Containers, GitHub Actions',
      description:
        'Automated testing, containerized microservices, zero-downtime rolling deployments, and geo-replicated automated cloud backups.',
      techs: ['Microsoft Azure', 'Docker', 'Linux', 'GitHub Actions', 'Cloudflare', 'AWS'],
      badge: 'DevOps & Cloud',
      iconColor: 'text-sky-400',
    },
  ];

  return (
    <section id="dotnet-stack" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Enterprise-Grade Technology Stacks</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Mastering Modern Stacks with{' '}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              .NET Core &amp; React
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Whether your enterprise requires rock-solid <strong>.NET / C#</strong> backends, ultra-fast <strong>React</strong> frontends, or full-stack PHP/Python integrations, Ttech SOLUTIONS delivers clean, scalable code.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'dotnet', label: '.NET Core & C# Mastery', icon: Server, color: 'border-purple-500/40 text-purple-300' },
            { id: 'frontend', label: 'React, Next.js & UI', icon: Code2, color: 'border-cyan-500/40 text-cyan-300' },
            { id: 'backends', label: 'Node.js, Python & PHP', icon: Layers, color: 'border-blue-500/40 text-blue-300' },
            { id: 'cloud-db', label: 'Databases & Azure Cloud', icon: Cloud, color: 'border-emerald-500/40 text-emerald-300' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Highlight Box */}
        {activeTab === 'dotnet' && (
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-purple-950/40 via-slate-900/80 to-slate-950 border border-purple-500/30 mb-16 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
                  Primary Enterprise Focus
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-3 mb-4">
                  Why .NET Core is the Gold Standard for Scalable Systems
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  At Ttech SOLUTIONS, we build backends with Microsoft .NET 9 and C# for maximum throughput, bulletproof memory management, and enterprise-grade security. Perfect for financial engines, healthcare portals, SaaS backbones, and high-load APIs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { title: 'Sub-Millisecond Execution', desc: 'JIT compilation with AVX-512 hardware acceleration' },
                    { title: 'Clean Architecture & CQRS', desc: 'Decoupled domain logic with MediatR' },
                    { title: 'Entity Framework Core 9', desc: 'Type-safe SQL queries with optimized LINQ' },
                    { title: 'Real-time SignalR Hubs', desc: 'Sub-50ms live WebSockets for instant data sync' },
                  ].map((feat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-purple-900/40">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>{feat.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{feat.desc}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenEstimatorWithStack('.NET Core + React Enterprise')}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>Build With .NET Core Stack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Live Architecture Snippet */}
              <div className="rounded-2xl bg-[#020617] border border-purple-900/60 p-5 font-mono text-xs text-slate-300 overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-950 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="text-purple-300 font-semibold">Ttech.SolutionArchitecture.cs</span>
                  </div>
                  <span className="text-[10px]">C# 13 // Clean Architecture</span>
                </div>
                <pre className="text-[11px] leading-relaxed">
{`// Program.cs - .NET 9 Minimal API + Health Checks
var builder = WebApplication.CreateBuilder(args);

// Register Core Enterprise Infrastructure
builder.Services.AddDbContext<TtechDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(CreateOrderCommand).Assembly));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => options.TokenValidationParameters = EnterpriseSecurity.GetTokenParams());

builder.Services.AddSignalR();
builder.Services.AddCors(EnterprisePolicies.AllowReactClient);

var app = builder.Build();

app.MapCarter();
app.MapHealthChecks("/healthz");
app.Run();`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frontend' && (
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-slate-950 border border-cyan-500/30 mb-16 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                  Modern High-Velocity UI
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-3 mb-4">
                  React 19, Next.js &amp; Fluid Tailwind Interfaces
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We create user interfaces that feel alive. Fluid micro-interactions, strict zero-layout-shift (CLS), server-side rendering for instant SEO indexation, and seamless integration with your backend APIs.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['React 19', 'Next.js App Router', 'TypeScript', 'Tailwind CSS v4', 'TanStack Query', 'Motion / Framer', 'Figma to Code'].map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenEstimatorWithStack('React + Next.js Full Stack')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>Build React Frontend</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-300">Lighthouse Performance</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">99 / 100</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-300">First Contentful Paint (FCP)</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">0.4s</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-300">Mobile Responsive Score</span>
                  <span className="text-xs font-mono font-bold text-blue-400">100% Fluid</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'backends' && (
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-blue-950/40 via-slate-900/80 to-slate-950 border border-blue-500/30 mb-16 shadow-2xl">
            <h3 className="text-2xl font-bold text-white font-display mb-4">
              Flexible Polyglot Backend Options: Node.js, Python &amp; PHP
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-2xl">
              While .NET is our flagship choice for enterprise scalability, our software engineering team also delivers specialized microservices in Node.js, Python (AI pipelines), and PHP/Laravel (e-commerce).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-base font-bold text-white mb-1">Node.js &amp; Express</div>
                <div className="text-xs text-slate-400 mb-3">Event-driven, asynchronous APIs, WebSockets &amp; real-time messaging services.</div>
                <div className="text-[11px] font-mono text-cyan-400">TypeScript · Express · Fastify</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-base font-bold text-white mb-1">Python &amp; FastAPI</div>
                <div className="text-xs text-slate-400 mb-3">AI automation, machine learning models, Gemini API pipelines &amp; data scraping.</div>
                <div className="text-[11px] font-mono text-amber-400">FastAPI · LangChain · Pandas</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-base font-bold text-white mb-1">PHP &amp; Laravel</div>
                <div className="text-xs text-slate-400 mb-3">Rapid business portals, custom CMS platforms &amp; legacy system modernizations.</div>
                <div className="text-[11px] font-mono text-purple-400">Laravel 11 · Eloquent · Blade</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cloud-db' && (
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-950 border border-emerald-500/30 mb-16 shadow-2xl">
            <h3 className="text-2xl font-bold text-white font-display mb-4">
              Enterprise Databases &amp; Cloud Infrastructure
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-2xl">
              Zero data loss, sub-second query performance, and continuous integration. We host primarily on Microsoft Azure &amp; AWS with automated Docker containers.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Microsoft Azure', 'Microsoft SQL Server', 'PostgreSQL', 'Docker Containers', 'Redis In-Memory', 'MongoDB', 'Firebase Firestore', 'GitHub Actions CI/CD'].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xs font-bold text-white">{item}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Enterprise Ready</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive 5-Layer Architecture Visualizer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                Interactive Systems Blueprint
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                Layer-by-Layer Architectural Excellence
              </h3>
            </div>
            <div className="text-xs text-slate-400">
              Click any layer to inspect our engineering standards:
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Layer Stack (Left) */}
            <div className="lg:col-span-6 space-y-2.5">
              {architectureLayers.map((layer, idx) => {
                const isSelected = selectedLayer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLayer(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-500 shadow-md shadow-cyan-950/40 translate-x-1'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-cyan-400">
                        {layer.level}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-white">{layer.name}</div>
                        <div className="text-xs text-slate-400">{layer.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {layer.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Layer Detail Inspector (Right) */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-cyan-400">
                    Layer {architectureLayers[selectedLayer].level} Analysis
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                    {architectureLayers[selectedLayer].badge}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white font-display mb-3">
                  {architectureLayers[selectedLayer].name}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {architectureLayers[selectedLayer].description}
                </p>

                <div className="mb-6">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Technologies Applied in this Tier:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {architectureLayers[selectedLayer].techs.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-300 text-xs font-mono border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Tested &amp; Production Verified</span>
                <button
                  onClick={() => onOpenEstimatorWithStack('.NET Core + React Enterprise')}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Build This Stack</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
