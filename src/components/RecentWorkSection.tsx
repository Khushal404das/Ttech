import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';
import { PROJECTS } from '../data/projects';

/** Real proof on the home page: a few actual case studies with screenshots. */
const FEATURED = ['movieflix', 'social-autopilot', 'mcvt-system'];

export const RecentWorkSection: React.FC = () => {
  const projects = FEATURED.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean) as typeof PROJECTS;

  return (
    <section className="border-t border-[#DCE8F8] bg-[#F8FBFF] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Recent projects</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0B1220] sm:text-4xl">
              Real work, not promises
            </h2>
            <p className="mt-3 text-sm text-[#475569] sm:text-base">
              See what we&apos;ve built — the problem, how we solved it and the result.
            </p>
          </div>
          <Link
            to="/work"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#2563EB] no-underline hover:text-[#1D4ED8]"
          >
            All case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className="group overflow-hidden rounded-3xl border border-[#DCE8F8] bg-white no-underline shadow-sm transition-shadow hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)]"
            >
              <ProjectVisual project={p} className="aspect-[16/10] w-full" />
              <div className="p-5">
                <span className="rounded-lg bg-[#EAF2FF] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#2563EB]">
                  {p.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[#0B1220] group-hover:text-[#2563EB]">{p.shortTitle}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{p.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB]">
                  Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
