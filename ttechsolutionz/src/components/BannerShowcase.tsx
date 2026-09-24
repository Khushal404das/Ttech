import React, { useState } from 'react';
import {
  Code,
  Cpu,
  Globe,
  Layers,
  Monitor,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
  Database,
  Terminal,
} from 'lucide-react';
import { TtechLogo } from './TtechLogo';
import {
  HTML5Logo,
  CSS3Logo,
  JavaScriptLogo,
  ReactLogo,
  NodejsLogo,
  MongoDBLogo,
  PythonLogo,
} from './TechLogos';

interface BannerShowcaseProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const BannerShowcase: React.FC<BannerShowcaseProps> = ({
  onStartProject,
  onExploreServices,
}) => {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);

  const services = [
    {
      id: 'software',
      title: 'Software Development',
      badge: 'C# / .NET 9 & Desktop',
      icon: Code,
      screenTitle: 'Enterprise Software & Microservices',
      screenSubtitle: 'High-throughput .NET 9 architecture, modular business services, and sub-second execution.',
      stats: '99.99% Reliability',
      metric: '0.04ms Core Execution',
      codeSnippet: `// C# .NET Enterprise Kernel
public async Task<Result> ExecuteAsync(Command cmd) {
  var validated = await _pipeline.Validate(cmd);
  return await _engine.ProcessBatch(validated);
}`,
    },
    {
      id: 'ai',
      title: 'AI Automation',
      badge: 'LLM & Autonomous Agents',
      icon: Cpu,
      screenTitle: 'AI Automation & Intelligent Agents',
      screenSubtitle: 'Automate repetitive workflows, intelligent data pipelines, and custom AI copilots.',
      stats: '10x Productivity',
      metric: 'Real-Time Neural Inference',
      codeSnippet: `// Autonomous Agent Pipeline
const agent = new TtechAgent({ model: 'enterprise' });
const decision = await agent.runWorkflow(taskContext);
await syncEnterpriseDatabase(decision);`,
    },
    {
      id: 'web',
      title: 'Website Development',
      badge: 'Next.js & Jamstack',
      icon: Globe,
      screenTitle: 'Ultra-Fast Responsive Websites',
      screenSubtitle: 'SEO-dominant, high-converting digital storefronts and marketing platforms.',
      stats: '100% Lighthouse Score',
      metric: '<0.8s First Contentful Paint',
      codeSnippet: `// High-Speed Next.js 15 Edge SSR
export async function generateMetadata() {
  return { title: 'Ttech Solutions - Global Edge' };
}
export default function Page() { return <Hero />; }`,
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      badge: 'End-to-End Scalability',
      icon: Layers,
      screenTitle: 'Full-Stack Scalable Ecosystems',
      screenSubtitle: 'Seamless integration between reactive frontends, resilient APIs, and transactional databases.',
      stats: 'Zero-Downtime CI/CD',
      metric: 'Multi-Tenant Cloud Ready',
      codeSnippet: `// End-to-End Orchestration
const app = express();
app.use('/api/v1', enterpriseGateway);
app.use(signalRHubWatcher);`,
    },
    {
      id: 'frontend_backend',
      title: 'Frontend & Backend',
      badge: 'React 19 & Cloud APIs',
      icon: Monitor,
      screenTitle: 'Harmonious Frontend & Backend',
      screenSubtitle: 'Pixel-perfect UI design paired with rock-solid server-side cloud logic.',
      stats: '60 FPS Transitions',
      metric: 'RESTful + GraphQL + SignalR',
      codeSnippet: `// Unified Data Layer
const { state } = useReactiveStore((s) => s.core);
return <CyberCanvas renderState={state} />;`,
    },
  ];

  const currentService = services[activeServiceIdx];

  const techBadges = [
    { name: 'HTML', Component: HTML5Logo },
    { name: 'CSS', Component: CSS3Logo },
    { name: 'JavaScript', Component: JavaScriptLogo },
    { name: 'React', Component: ReactLogo },
    { name: 'Node.js', Component: NodejsLogo },
    { name: 'MongoDB', Component: MongoDBLogo },
    { name: 'Python', Component: PythonLogo },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#020617] border-y border-cyan-900/40">
      {/* Circuit board traces & background ambient glows */}
      <div className="absolute inset-0 bg-circuit-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Floating 3D Cubes (inspired by the posters) */}
      <div className="absolute top-12 left-8 hidden lg:block animate-float-slow pointer-events-none opacity-60">
        <div className="w-10 h-10 border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-sm rotate-45 rounded-lg shadow-lg shadow-cyan-500/20" />
      </div>
      <div className="absolute bottom-16 right-12 hidden lg:block animate-float-reverse pointer-events-none opacity-50">
        <div className="w-12 h-12 border border-blue-400/40 bg-blue-500/10 backdrop-blur-sm rotate-12 rounded-lg shadow-lg shadow-blue-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Agency Master Banner Showcase
            </span>
          </div>

          {/* "Let's Build Together" handwritten-style neon badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border border-cyan-400/40 text-cyan-200 text-xs font-semibold shadow-md shadow-cyan-950/50">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span className="italic font-display tracking-wide">Let&apos;s Build Together</span>
          </div>
        </div>

        {/* Master Panoramic Cyber Banner Box */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#06152b] via-[#040e1f] to-[#020713] border-2 border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden">
          {/* Subtle Circuit Overlay SVGs */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 L200,80 L260,140 L500,140"
              stroke="#38bdf8"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M1000,400 L800,400 L740,340 L500,340"
              stroke="#38bdf8"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />
            <circle cx="200" cy="80" r="3" fill="#38bdf8" />
            <circle cx="260" cy="140" r="3" fill="#38bdf8" />
            <circle cx="800" cy="400" r="3" fill="#38bdf8" />
            <circle cx="740" cy="340" r="3" fill="#38bdf8" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Brand Logo + 5 Cyber Service Nodes */}
            <div className="lg:col-span-5 space-y-6">
              {/* Ttech Solutions Logo with Circuit Steam */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20 backdrop-blur-md">
                <TtechLogo size="lg" showTagline={true} />
              </div>

              {/* Interactive Service Nodes List */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                  <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Interactive Core Competencies (Click to switch preview)</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {services.map((svc, idx) => {
                    const IconComponent = svc.icon;
                    const isActive = activeServiceIdx === idx;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => setActiveServiceIdx(idx)}
                        className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 translate-x-1'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-cyan-500/40'
                        }`}
                      >
                        {/* Glowing neon rounded square icon */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                            isActive
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-400/40 scale-105'
                              : 'bg-slate-900 border-slate-700/80 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold truncate group-hover:text-white transition-colors">
                            {svc.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
                            <span className="truncate">{svc.badge}</span>
                          </div>
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isActive
                              ? 'text-cyan-400 translate-x-1'
                              : 'text-slate-600 group-hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Laptop Perspective with Live Screen & Stack Badges */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 items-stretch">
              {/* Laptop Screen Frame */}
              <div className="flex-1 rounded-2xl p-1 bg-gradient-to-b from-cyan-400/40 via-slate-700 to-slate-900 shadow-2xl shadow-cyan-900/50 flex flex-col">
                <div className="bg-[#030919] rounded-xl border border-cyan-500/30 flex-1 flex flex-col overflow-hidden">
                  {/* Laptop Top Browser Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-900 px-3 py-0.5 rounded-md border border-slate-800">
                      https://ttechsolutions.com/{currentService.id}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ONLINE
                    </span>
                  </div>

                  {/* Laptop Screen Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-semibold mb-2">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Ideas to Intelligent Solutions</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-display font-extrabold text-white leading-tight">
                        {currentService.screenTitle}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {currentService.screenSubtitle}
                      </p>
                    </div>

                    {/* Live Simulated Code snippet */}
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      <div className="flex items-center justify-between text-slate-500 text-[9px] mb-1 border-b border-slate-800/80 pb-1">
                        <span>LIVE RUNTIME EXECUTION</span>
                        <span className="text-emerald-400">{currentService.metric}</span>
                      </div>
                      <pre className="text-slate-300 leading-tight">
                        <code>{currentService.codeSnippet}</code>
                      </pre>
                    </div>

                    {/* Performance & Trust metrics */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                      <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400">Benchmark</div>
                        <div className="text-xs font-bold text-cyan-400 font-display">
                          {currentService.stats}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400">Production SLA</div>
                        <div className="text-xs font-bold text-emerald-400 font-display">
                          100% Guaranteed
                        </div>
                      </div>
                    </div>

                    {/* Button inside Laptop */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={onStartProject}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Start Your Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={onExploreServices}
                        className="text-xs font-semibold text-cyan-300 hover:text-white transition-colors cursor-pointer"
                      >
                        All Capabilities &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Stack Tech Badges Bar (matching the banner layout) */}
              <div className="w-full md:w-36 flex md:flex-col justify-between gap-1.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
                <div className="hidden md:block text-[10px] font-mono uppercase tracking-wider text-slate-400 text-center pb-2 border-b border-slate-800">
                  Tech Core
                </div>

                <div className="flex md:flex-col items-center justify-around gap-1.5 w-full">
                  {techBadges.map((tb) => {
                    const IconComponent = tb.Component;
                    return (
                      <div
                        key={tb.name}
                        className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 w-full transition-all group cursor-default"
                        title={tb.name}
                      >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <IconComponent size={20} />
                        </div>
                        <span className="hidden md:inline text-[11px] font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
                          {tb.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
