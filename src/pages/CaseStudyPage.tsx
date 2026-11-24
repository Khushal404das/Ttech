import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Lightbulb, Target, Wrench } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import { BookCallButton } from '../components/BookCallButton';
import { ProjectVisual } from '../components/ProjectVisual';
import { PROJECTS, getProject } from '../data/projects';
import { getLandingPage } from '../data/landingPages';

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function CaseStudyPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);
  if (!project) return <Navigate to="/404" replace />;

  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const service = project.relatedService ? getLandingPage(project.relatedService) : undefined;

  return (
    <>
      <SEO
        title={`${project.shortTitle} Case Study | Ttech SOLUTIONS`}
        description={project.seoDescription}
        canonical={`/work/${project.slug}`}
        ogImage={project.image?.src}
        ogType="article"
      />
      <main className="flex-1 bg-[#F8FBFF] pt-24 pb-16">
        <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] no-underline hover:text-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          {/* Header */}
          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-lg bg-[#EAF2FF] px-2.5 py-1 font-mono uppercase tracking-wider text-[#2563EB]">
                {project.category}
              </span>
              <span className="text-[#7B8AA3]">{project.client}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0B1220] sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569] sm:text-lg">{project.tagline}</p>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold no-underline transition-colors ${
                      link.kind === 'live'
                        ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                        : 'bg-[#0B1220] text-white hover:bg-[#1E293B]'
                    }`}
                  >
                    {link.kind === 'live' ? <ExternalLink className="h-4 w-4" /> : <GitHubIcon className="h-4 w-4" />}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </header>

          {/* Screenshot / cover */}
          <ProjectVisual
            project={project}
            eager
            className="mt-8 aspect-[16/10] w-full rounded-3xl border border-[#DCE8F8] shadow-[0_20px_50px_rgba(37,99,235,0.12)]"
          />

          {/* Highlights */}
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-[#DCE8F8] bg-white p-3 text-center sm:gap-4 sm:p-5">
            {project.highlights.map((h) => (
              <div key={h.label}>
                <div className="font-display text-base font-extrabold text-[#2563EB] sm:text-2xl">{h.value}</div>
                <div className="mt-0.5 text-[11px] text-[#7B8AA3] sm:text-xs">{h.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge & solution */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-[#DCE8F8] bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[#0B1220]">
                <Target className="h-5 w-5 text-[#2563EB]" /> The challenge
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">{project.problem}</p>
            </section>
            <section className="rounded-3xl border border-[#DCE8F8] bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[#0B1220]">
                <Lightbulb className="h-5 w-5 text-[#2563EB]" /> What we built
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">{project.solution}</p>
            </section>
          </div>

          {/* Features */}
          <section className="mt-6 rounded-3xl border border-[#DCE8F8] bg-white p-6 sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[#0B1220]">
              <Wrench className="h-5 w-5 text-[#2563EB]" /> Key features
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-[#475569]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Screenshots */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-6">
              <h2 className="font-display text-xl font-bold text-[#0B1220]">Screens</h2>
              {/* Phone screenshots (all portrait) sit side by side on wider screens */}
              <div
                className={`mt-4 grid gap-5 ${
                  project.gallery.length > 1 && project.gallery.every((g) => g.height > g.width) ? 'sm:grid-cols-2' : ''
                }`}
              >
                {project.gallery.map((shot) => (
                  <figure key={shot.src} className="overflow-hidden rounded-3xl border border-[#DCE8F8] bg-white">
                    <div className="bg-[#F1F5F9]">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full"
                      />
                    </div>
                    <figcaption className="border-t border-[#DCE8F8] px-5 py-3 text-sm text-[#475569]">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Results */}
          <section className="mt-6 rounded-3xl bg-[#0B1528] p-6 text-white sm:p-8">
            <h2 className="font-display text-xl font-bold text-white">The result</h2>
            <ul className="mt-4 space-y-3">
              {project.results.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-[#D8DEE9] sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#60A5FA]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech */}
          <section className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7B8AA3]">Technology used</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-lg border border-[#DCE8F8] bg-white px-2.5 py-1 font-mono text-xs text-[#2563EB]">
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-3xl border border-[#DCE8F8] bg-gradient-to-br from-[#EAF2FF] to-white p-6 text-center sm:p-10">
            <h2 className="font-display text-2xl font-extrabold text-[#0B1220] sm:text-3xl">Want something similar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#475569] sm:text-base">
              Tell us about your idea on a free 30-minute call. You&apos;ll get honest advice, a recommended approach and a
              ballpark budget — no obligation.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookCallButton />
              <button
                type="button"
                onClick={() => navigate('/contact', { state: { service: project.shortTitle, description: `I'd like something similar to ${project.shortTitle}.` } })}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#DCE8F8] bg-white px-7 py-4 text-sm font-semibold text-[#0B1220] hover:border-[#2563EB] cursor-pointer"
              >
                Get a written quote <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {service && (
              <p className="mt-5 text-sm text-[#475569]">
                Related service:{' '}
                <Link to={`/${service.slug}`} className="font-semibold text-[#2563EB] hover:underline">
                  {service.navLabel}
                </Link>
              </p>
            )}
          </section>

          {/* Next project */}
          <Link
            to={`/work/${next.slug}`}
            className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-[#DCE8F8] bg-white p-5 no-underline hover:border-[#2563EB]"
          >
            <div>
              <div className="text-xs text-[#7B8AA3]">Next case study</div>
              <div className="font-display text-lg font-bold text-[#0B1220] group-hover:text-[#2563EB]">{next.shortTitle}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-[#2563EB] transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      </main>
      <Footer onOpenConsultation={() => navigate('/contact')} />
    </>
  );
}
