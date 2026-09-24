import React, { useState } from 'react';
import {
  HTML5Logo,
  CSS3Logo,
  JavaScriptLogo,
  ReactLogo,
  NextjsLogo,
  TailwindLogo,
  BootstrapLogo,
  PHPLogo,
  LaravelLogo,
  NodejsLogo,
  ExpressjsLogo,
  MySQLLogo,
  MongoDBLogo,
  PostgreSQLLogo,
  DotNetLogo,
  CSharpLogo,
  PythonLogo,
  AzureLogo,
  DockerLogo,
  FigmaLogo,
} from './TechLogos';
import { Code2, Sparkles, ShieldCheck, Clock, Headphones, Award } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Cloud & Enterprise';
  badge: string;
  Component: React.FC<{ size?: number; className?: string }>;
  description: string;
}

export const TechLogosMarquee: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const techList: TechItem[] = [
    // Frontend
    { name: 'HTML5', category: 'Frontend', badge: 'Semantic 5', Component: HTML5Logo, description: 'Modern semantic markup & accessibility' },
    { name: 'CSS3', category: 'Frontend', badge: 'Styling', Component: CSS3Logo, description: 'Advanced animations & fluid grids' },
    { name: 'JavaScript', category: 'Frontend', badge: 'ESNext', Component: JavaScriptLogo, description: 'Reactive logic & asynchronous runtime' },
    { name: 'React.js', category: 'Frontend', badge: 'v19 Core', Component: ReactLogo, description: 'Component-driven high-velocity client UI' },
    { name: 'Next.js', category: 'Frontend', badge: 'SSR / App Router', Component: NextjsLogo, description: 'Server components & edge routing' },
    { name: 'Tailwind CSS', category: 'Frontend', badge: 'Zero Runtime', Component: TailwindLogo, description: 'Utility-first rapid styling system' },
    { name: 'Bootstrap', category: 'Frontend', badge: 'Rapid UI', Component: BootstrapLogo, description: 'Responsive layout framework' },

    // Backend
    { name: '.NET 9 Core', category: 'Backend', badge: 'Enterprise Gold', Component: DotNetLogo, description: 'Microsecond latency, Clean Architecture' },
    { name: 'C#', category: 'Backend', badge: 'C# 13', Component: CSharpLogo, description: 'Type-safe enterprise business logic' },
    { name: 'Node.js', category: 'Backend', badge: 'Async IO', Component: NodejsLogo, description: 'Event-driven high-concurrency microservices' },
    { name: 'Express.js', category: 'Backend', badge: 'REST API', Component: ExpressjsLogo, description: 'Minimalist web and API middleware' },
    { name: 'PHP 8.3', category: 'Backend', badge: 'Modern PHP', Component: PHPLogo, description: 'Performant web backends & CMS' },
    { name: 'Laravel 11', category: 'Backend', badge: 'Artisan', Component: LaravelLogo, description: 'Elegant MVC architecture & Eloquent ORM' },
    { name: 'Python', category: 'Backend', badge: 'AI & Data', Component: PythonLogo, description: 'FastAPI & AI agent automation pipelines' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases', badge: 'Relational ACID', Component: PostgreSQLLogo, description: 'Rock-solid relational data persistence' },
    { name: 'MongoDB', category: 'Databases', badge: 'NoSQL Document', Component: MongoDBLogo, description: 'Flexible schemas & high throughput' },
    { name: 'MySQL', category: 'Databases', badge: 'Industry Standard', Component: MySQLLogo, description: 'Enterprise transactional database' },

    // Cloud & Design
    { name: 'Microsoft Azure', category: 'Cloud & Enterprise', badge: 'Cloud Native', Component: AzureLogo, description: 'Enterprise cloud hosting, App Services & CI/CD' },
    { name: 'Docker', category: 'Cloud & Enterprise', badge: 'Containers', Component: DockerLogo, description: 'Immutable containerized environments' },
    { name: 'Figma', category: 'Cloud & Enterprise', badge: 'UI/UX Specs', Component: FigmaLogo, description: 'Pixel-perfect vectors & design handoff' },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Databases', 'Cloud & Enterprise'];

  const filteredTech = activeCategory === 'All'
    ? techList
    : techList.filter((t) => t.category === activeCategory);

  return (
    <section className="py-16 relative bg-[#030816] border-y border-slate-900 overflow-hidden">
      {/* Background glow and circuit traces */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Full-Stack Technology Suite</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Enterprise Technologies &amp;{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                Modern Frameworks
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              We master the industry&apos;s leading programming languages, frameworks, and databases for 99.9% uptime.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Animated Marquee (Double Loop for Smooth Scroll) */}
      <div className="relative w-full overflow-hidden mb-12 select-none">
        {/* Left & Right gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#030816] via-[#030816]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#030816] via-[#030816]/80 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-4 animate-marquee py-3">
          {[...techList, ...techList].map((tech, idx) => {
            const IconComponent = tech.Component;
            return (
              <div
                key={`${tech.name}-${idx}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 transition-all hover:scale-105 duration-200 shrink-0 shadow-lg shadow-black/40 group cursor-default"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0 drop-shadow-md group-hover:rotate-6 transition-transform">
                  <IconComponent size={28} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                    {tech.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                    <span>{tech.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtered Grid View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredTech.map((tech) => {
            const IconComponent = tech.Component;
            return (
              <div
                key={tech.name}
                className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group flex items-start gap-3 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 shrink-0 group-hover:border-cyan-500/40 transition-colors">
                  <IconComponent size={26} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </h4>
                  </div>
                  <span className="text-[10px] text-cyan-400/90 font-mono block mt-0.5">
                    {tech.badge}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                    {tech.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Pillars of Ttech Guarantee Banner (from build-full-stack banner) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-xl shadow-cyan-950/30 backdrop-blur-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Clean Code</div>
                <div className="text-[10px] text-slate-400">SOLID &amp; Modular</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Modern Design</div>
                <div className="text-[10px] text-slate-400">Pixel-Perfect UI</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">On-Time Delivery</div>
                <div className="text-[10px] text-slate-400">100% Sprint SLA</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="p-2 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-400">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Post-Launch Care</div>
                <div className="text-[10px] text-slate-400">24/7 Warranty Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
