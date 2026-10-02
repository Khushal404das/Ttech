import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Globe,
  Layers,
  Sparkles,
  Palette,
  ShoppingCart,
  Server,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  X,
  Bot,
} from 'lucide-react';
import type { AgencyService } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
  onOpenConsultation,
}) => {
  const [selectedService, setSelectedService] = useState<AgencyService | null>(null);

  const services: AgencyService[] = [
    {
      id: 'software-dev',
      title: 'Software Development',
      tagline: 'Enterprise-grade, high-concurrency custom systems & desktop solutions.',
      description:
        'We engineer robust desktop, cloud, and distributed software solutions with a primary specialization in enterprise .NET Core, C#, and modern microservices built to withstand high transactional loads.',
      iconName: 'Code2',
      highlightBadge: 'Enterprise Choice (.NET)',
      technologies: ['.NET 9 Core', 'C#', 'WPF / MAUI', 'Microservices', 'SQL Server', 'Azure'],
      deliverables: [
        'Clean Architecture C# Codebase',
        'High-Throughput Web API Layer',
        'Database Entity Relational Models',
        'Automated Unit & Integration Test Suites',
        'Enterprise Security & RBAC Protocols',
      ],
      timeline: '6 - 12 Weeks',
      featuredInBanner: true,
    },
    {
      id: 'web-apps-saas',
      title: 'Web Applications & SAAS',
      tagline: 'Multi-tenant, cloud-native platforms designed to scale to millions.',
      description:
        'From day-one multi-tenancy to automated subscription billing and granular permission models, we build turnkey Software-as-a-Service platforms ready for market dominance.',
      iconName: 'Layers',
      highlightBadge: 'High Growth',
      technologies: ['React 19', 'Next.js', 'ASP.NET Core', 'Stripe / LemonSqueezy', 'PostgreSQL', 'Redis'],
      deliverables: [
        'Multi-Tenant Tenant Isolation Engine',
        'Automated Recurring Billing & Webhooks',
        'Executive Analytics & Reporting Dashboard',
        'Role-Based Access Control (RBAC)',
        'Cloud Infrastructure as Code (Docker/Terraform)',
      ],
      timeline: '8 - 14 Weeks',
      featuredInBanner: true,
    },
    {
      id: 'website-development',
      title: 'Website Development',
      tagline: 'Fast, responsive, high-converting digital portals for ambitious businesses.',
      description:
        'Turn your digital presence into a 24/7 client generation engine. We build blazing-fast corporate websites with 99+ Lighthouse performance scores, search engine dominance, and fluid animations.',
      iconName: 'Globe',
      highlightBadge: '99+ Lighthouse Score',
      technologies: ['React / Vite', 'Next.js SSR', 'Tailwind CSS', 'Schema.org SEO', 'Headless CMS'],
      deliverables: [
        'Responsive Mobile-First Interface',
        'Advanced Search Engine Optimization (SEO)',
        'Content Management System (CMS) Integration',
        'Analytics & Lead Capture Integration',
        'Sub-1-Second Page Load Optimization',
      ],
      timeline: '2 - 4 Weeks',
      featuredInBanner: true,
    },
    {
      id: 'full-stack-dev',
      title: 'Full Stack Development',
      tagline: 'End-to-end frontend & backend architecture with seamless data flows.',
      description:
        'Seamless integration between intuitive user interfaces and resilient backend servers. We ensure clean contracts, reliable state synchronization, and zero technical debt.',
      iconName: 'Server',
      highlightBadge: 'End-to-End',
      technologies: ['React', 'TypeScript', 'Node.js / Express', '.NET Core WebAPI', 'PostgreSQL', 'Docker'],
      deliverables: [
        'Full RESTful & GraphQL API Specifications',
        'State Management & Reactive Client Store',
        'Database Migrations & Seed Pipelines',
        'CI/CD Deployment Pipelines',
        'Comprehensive OpenAPI / Swagger Docs',
      ],
      timeline: '6 - 10 Weeks',
      featuredInBanner: true,
    },
    {
      id: 'ai-automation',
      title: 'AI Automation & Intelligent Solutions',
      tagline: 'Intelligent LLM agents, automated workflows, and predictive systems.',
      description:
        'Supercharge your operational efficiency. We embed modern Gemini AI models, custom agentic workflows, document intelligence, and automated pipelines directly into your software.',
      iconName: 'Bot',
      highlightBadge: 'Gemini AI Powered',
      technologies: ['Google Gemini API', 'Python / FastAPI', 'LangChain', 'Vector DBs', 'Node.js', 'Automated Agents'],
      deliverables: [
        'Custom Intelligent Chat & Scoping Bots',
        'Automated Document Processing Pipelines',
        'API Prompt Engineering & Fallback Redundancy',
        'Semantic Search & Vector Grounding',
        'Workflow Automation Scripts',
      ],
      timeline: '3 - 6 Weeks',
      featuredInBanner: true,
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design & Figma to Web',
      tagline: 'Pixel-perfect, conversion-centered design systems and intuitive user journeys.',
      description:
        'We transform rough sketches into breathtaking, user-tested visual identities. Every button, interaction, and layout is strategically calculated to maximize client conversions.',
      iconName: 'Palette',
      highlightBadge: 'Pixel-Perfect',
      technologies: ['Figma', 'Interactive Prototyping', 'Design Systems', 'Tailwind CSS', 'Framer Motion'],
      deliverables: [
        'Complete Figma High-Fidelity Prototype',
        'Component Library & Design Tokens',
        'User Journey & Wireframe Maps',
        'Responsive Mobile, Tablet & Desktop Layouts',
        'Production-Ready CSS / Tailwind Export',
      ],
      timeline: '2 - 4 Weeks',
      featuredInBanner: true,
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Solutions',
      tagline: 'High-conversion online storefronts with frictionless checkout flows.',
      description:
        'Modern, lightning-fast digital commerce experiences. Optimized for sales conversions, multi-currency transactions, inventory synchronization, and iron-clad payment security.',
      iconName: 'ShoppingCart',
      highlightBadge: 'Max Conversion',
      technologies: ['Custom React Commerce', 'Shopify Storefront API', 'Stripe Payments', 'PayPal SDK', 'PostgreSQL'],
      deliverables: [
        'Frictionless Multi-Step Checkout Funnel',
        'Secure Payment Gateway Integration',
        'Real-time Inventory & Order Management',
        'Customer Account Portal & Order History',
        'Abandoned Cart Recovery Email Hooks',
      ],
      timeline: '4 - 8 Weeks',
      featuredInBanner: false,
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-teal-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-purple-400" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-pink-400" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6 text-emerald-400" />;
      default:
        return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#040B1A] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Our Core Agency Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Transforming Complex Ideas Into{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Intelligent Software
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Directly from our agency blueprint: We cover the entire digital lifecycle from initial UI/UX wireframes to full-stack enterprise .NET architecture and cloud deployment.
          </p>
        </motion.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="group relative rounded-3xl p-6 sm:p-7 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: Math.min(services.indexOf(service) * 0.06, 0.3), ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 group-hover:bg-cyan-950/30 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/90 text-cyan-300 border border-slate-700/80">
                    {service.highlightBadge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {service.tagline}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950/80 text-cyan-400 font-mono">
                      +{service.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 text-xs font-medium transition-all cursor-pointer"
                >
                  Get Estimate
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner Slogan Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-cyan-950/70 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
              &quot;Your Idea. Our Technology.&quot;
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Powerful, resilient websites and software systems engineered to grow your enterprise with modern, fast, secure, and scalable architectures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenConsultation()}
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/30 cursor-pointer"
              >
                Discuss Your Requirements
              </button>
              <button
                onClick={() => onSelectServiceForQuote('Full Stack Development')}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                Estimate Full Stack Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverables & Detail Modal */}
      <AnimatePresence>
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <motion.div
            className="max-w-xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/40">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedService.highlightBadge}
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Timeline & SLA */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[11px] text-slate-400">Typical Sprint Timeline</div>
                  <div className="text-xs font-bold text-white">{selectedService.timeline}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[11px] text-slate-400">Quality Standard</div>
                  <div className="text-xs font-bold text-emerald-400">Clean Code Guarantee</div>
                </div>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
                Key Production Deliverables:
              </h4>
              <ul className="space-y-2.5">
                {selectedService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack List */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2.5">
                Core Stack Applied:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedService.technologies.map((t, idx) => (
                  <span
                    key={idx}
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
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sTitle = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(sTitle);
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30 cursor-pointer flex items-center gap-1.5"
              >
                <span>Calculate Cost For This</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </section>
  );
};
