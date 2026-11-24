import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Laptop } from 'lucide-react';
import { ShimmerBadge } from './ui/ShimmerBadge';
import { ProjectVisual } from './ProjectVisual';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';

interface PortfolioSectionProps {
  onSelectProjectForConsultation: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProjectForConsultation }) => {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>('All');
  const projects = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative border-t border-[#DCE8F8] bg-[#F8FBFF] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 flex justify-center">
            <ShimmerBadge icon={<Laptop className="h-3.5 w-3.5" />}>Our Work</ShimmerBadge>
          </div>
          <h1 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-[#0B1220] sm:text-5xl">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">Case Studies</span>
          </h1>
          <p className="text-base text-[#475569] sm:text-lg">
            Real systems we&apos;ve designed and built end to end — the problem, what we built and the result.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                filter === cat
                  ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                  : 'border border-[#DCE8F8] bg-white text-[#475569] hover:text-[#0B1220]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const live = project.links.find((l) => l.kind === 'live');
            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24) }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#DCE8F8] bg-white shadow-sm transition-shadow hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)]"
              >
                <Link to={`/work/${project.slug}`} className="block no-underline" aria-label={`${project.shortTitle} case study`}>
                  <ProjectVisual project={project} className="aspect-[16/10] w-full" />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-[#EAF2FF] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#2563EB]">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-[#7B8AA3]">{project.client}</span>
                  </div>

                  <h3 className="mb-2 font-display text-xl font-bold text-[#0B1220]">
                    <Link to={`/work/${project.slug}`} className="no-underline text-inherit hover:text-[#2563EB]">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-[#475569]">{project.tagline}</p>

                  <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-[#DCE8F8] bg-[#F8FBFF] p-3">
                    {project.highlights.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="text-[10px] text-[#7B8AA3]">{m.label}</div>
                        <div className="font-display text-base font-bold text-[#2563EB]">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE8F8] pt-4">
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] no-underline hover:text-[#1D4ED8]"
                    >
                      Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    {live ? (
                      <a
                        href={live.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B1220] px-3 py-1.5 text-xs font-semibold text-white no-underline hover:bg-[#1E293B]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> {live.kind === 'live' && live.label.startsWith('Visit') ? 'Live site' : live.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectProjectForConsultation(project.shortTitle)}
                        className="cursor-pointer rounded-lg bg-[#F1F7FF] px-3 py-1.5 text-xs font-medium text-[#475569] hover:bg-[#2563EB] hover:text-white"
                      >
                        Build similar
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
