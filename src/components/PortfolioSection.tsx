import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Laptop,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Code2,
} from 'lucide-react';
import type { CaseStudy } from '../types';

interface PortfolioSectionProps {
  onSelectProjectForConsultation: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProjectForConsultation,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null);

  const projects: CaseStudy[] = [
    {
      id: 'saasflow',
      title: 'SaaSFlow Enterprise Suite',
      client: 'SaaSFlow Global Corp',
      category: 'SaaS & WebApps',
      tagline: 'Multi-tenant cloud analytics and subscription engine handling 120k+ daily events.',
      description:
        'Engineered an enterprise-grade multi-tenant B2B SaaS platform using Microsoft .NET 9 Core Clean Architecture on the backend and React 19 on the frontend. Features automated billing with Stripe Webhooks and SignalR real-time event distribution.',
      metrics: [
        { label: 'API Response Time', value: '38ms' },
        { label: 'Monthly Processed Volume', value: '$2.4M+' },
        { label: 'Uptime SLA', value: '99.99%' },
      ],
      technologies: ['.NET 9 Core', 'C#', 'React 19', 'PostgreSQL', 'Redis', 'Azure', 'Stripe'],
      architecturePreview: 'ASP.NET Core Web API + MediatR CQRS + React TanStack Query',
      demoType: 'dashboard',
      testimonialQuote:
        'Ttech SOLUTIONS took our initial whiteboard drawings and turned them into a rock-solid .NET Core SaaS platform that easily handled our enterprise pilot with zero hiccups.',
      clientRole: 'VP of Product, SaaSFlow',
    },
    {
      id: 'apexcommerce',
      title: 'ApexCommerce Headless Storefront',
      client: 'Apex Retail Brands',
      category: 'E-Commerce',
      tagline: 'Sub-second digital storefront with 340% increase in mobile checkout conversions.',
      description:
        'Rebuilt a sluggish legacy store into a blazing-fast React storefront powered by a scalable ASP.NET Core inventory API. Implemented instant cart updates, algorithmic search, and one-click checkout flows.',
      metrics: [
        { label: 'Checkout Conversion', value: '+340%' },
        { label: 'Page Load Speed', value: '0.45s' },
        { label: 'Mobile Bounce Rate', value: '-62%' },
      ],
      technologies: ['React 19', 'Next.js', 'ASP.NET Core', 'Stripe', 'Tailwind CSS', 'Docker'],
      architecturePreview: 'Headless Next.js SSR + .NET Core Order Orchestration Microservice',
      demoType: 'ecommerce',
      testimonialQuote:
        'Our conversion rate more than tripled after switching to the architecture built by Ttech. Outstanding engineering discipline and on-time delivery.',
      clientRole: 'Chief E-Commerce Officer',
    },
    {
      id: 'medisync',
      title: 'MediSync Telehealth & Telemetry',
      client: 'MediSync Health Alliance',
      category: 'Enterprise .NET',
      tagline: 'HIPAA-compliant patient monitoring and real-time medical IoT data ingestion.',
      description:
        'Developed a mission-critical medical records and device telemetry system with end-to-end data encryption, audit trails, and sub-100ms vital sign stream processing utilizing C# and WebSockets.',
      metrics: [
        { label: 'Active Monitored Beds', value: '4,500+' },
        { label: 'Security Audit', value: '100% Pass' },
        { label: 'Socket Latency', value: '<45ms' },
      ],
      technologies: ['C# .NET', 'WPF / MAUI', 'React', 'SQL Server', 'SignalR', 'Azure Health Cloud'],
      architecturePreview: 'Clean Architecture .NET Core + SignalR Hubs + SQL Server Enterprise',
      demoType: 'api',
      testimonialQuote:
        'Medical compliance is rigorous. Ttech SOLUTIONS proved their enterprise security bona fides from Day 1.',
      clientRole: 'Chief Medical Information Officer',
    },
    {
      id: 'finpulse-ai',
      title: 'FinPulse AI Financial Forecaster',
      client: 'FinPulse Analytics',
      category: 'AI Automation',
      tagline: 'Intelligent cash-flow forecasting agent powered by Gemini AI and Python pipelines.',
      description:
        'Integrated Google Gemini models to automatically analyze thousands of invoices, classify recurring revenue trends, and generate executive financial health forecasts in seconds.',
      metrics: [
        { label: 'Hours Saved Monthly', value: '180 hrs' },
        { label: 'Forecast Accuracy', value: '96.8%' },
        { label: 'Classification Speed', value: '1.2s' },
      ],
      technologies: ['Gemini AI API', 'Python FastAPI', 'React', 'PostgreSQL', 'Docker'],
      architecturePreview: 'FastAPI AI Agent + Gemini GenAI + React Analytics Frontend',
      demoType: 'dashboard',
      testimonialQuote:
        'The automated AI workflows designed by Ttech transformed how our CFO prepares monthly board decks.',
      clientRole: 'Managing Director, FinPulse',
    },
    {
      id: 'nexus-design',
      title: 'Nexus Enterprise UI/UX System',
      client: 'Nexus Global Logistics',
      category: 'UI/UX Design',
      tagline: 'Pixel-perfect 140+ component design system bridging Figma directly into React code.',
      description:
        'Crafted a cohesive, dark-mode ready design system for an international logistics network. Features zero-pill typography discipline, WCAG AAA contrast, and animated interaction micro-states.',
      metrics: [
        { label: 'Figma Components', value: '140+' },
        { label: 'Dev Handoff Speed', value: '3x Faster' },
        { label: 'Design Consistency', value: '100%' },
      ],
      technologies: ['Figma', 'React 19', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      architecturePreview: 'Tokens-to-CSS Pipeline + Reusable React Component Registry',
      demoType: 'ui',
      testimonialQuote:
        'The UI is clean, intuitive, and modern. Our clients constantly compliment how snappy the app feels.',
      clientRole: 'Head of Product Experience',
    },
  ];

  const categories = ['All', 'SaaS & WebApps', 'Enterprise .NET', 'E-Commerce', 'AI Automation', 'UI/UX Design'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <motion.section
      id="portfolio"
      className="py-24 relative bg-[#040B1A] border-t border-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Agency Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Featured Systems &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Client Success Stories
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Explore how we build production software that drives business growth, secures enterprise contracts, and delights end users.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              layout
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative rounded-3xl p-6 sm:p-7 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.28) }}
              whileHover={{ y: -5 }}
            >
              <div>
                {/* Category & Client */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {project.client}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {project.tagline}
                </p>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  {project.metrics.slice(0, 2).map((m, mi) => (
                    <div key={mi}>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                      <div className="text-base font-bold text-cyan-400 font-display">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectProjectForConsultation(project.title)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 text-xs font-medium transition-all cursor-pointer"
                >
                  Build Similar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
      {activeProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            className="max-w-2xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {activeProject.category} // {activeProject.client}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 mb-4">
              {activeProject.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeProject.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              {activeProject.metrics.map((m, mi) => (
                <div key={mi}>
                  <div className="text-lg sm:text-2xl font-bold text-cyan-400 font-display">{m.value}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Architecture Preview */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">Engineered Architecture:</span>
              <span className="text-cyan-300 font-semibold">{activeProject.architecturePreview}</span>
            </div>

            {/* Client Testimonial Quote */}
            {activeProject.testimonialQuote && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40">
                <p className="text-xs italic text-slate-200 mb-2">
                  &quot;{activeProject.testimonialQuote}&quot;
                </p>
                <div className="text-[11px] font-semibold text-cyan-400">
                  — {activeProject.clientRole}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Tech Stack Applied:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((t, ti) => (
                  <span
                    key={ti}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const pTitle = activeProject.title;
                  setActiveProject(null);
                  onSelectProjectForConsultation(pTitle);
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30 cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.section>
  );
};
