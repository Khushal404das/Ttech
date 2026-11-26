import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronDown, Clock, Wallet } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import { BookCallButton } from '../components/BookCallButton';
import { ProjectVisual } from '../components/ProjectVisual';
import { BreadcrumbStructuredData, JsonLd, ORG_ID } from '../components/StructuredData';
import { LANDING_PAGES, type LandingPage as LandingPageData } from '../data/landingPages';
import { getProject, type Project } from '../data/projects';

const SITE = 'https://ttechsolutionz.dev';

const PROCESS = [
  { title: 'Free 30-min call', text: 'We learn about your business and goals, and suggest the right approach.' },
  { title: 'Fixed written quote', text: 'Features, timeline and price in writing within 24 hours.' },
  { title: 'Design, then build', text: 'You approve the design, then see live progress every two weeks.' },
  { title: 'Launch & support', text: 'We launch, hand over all the code, and fix any bugs free for 30 days.' },
];

export default function LandingPage({ page }: { page: LandingPageData }) {
  const navigate = useNavigate();
  const projects = page.relatedProjects.map(getProject).filter(Boolean) as Project[];
  const others = LANDING_PAGES.filter((p) => p.slug !== page.slug);
  const goToQuote = () => navigate('/contact', { state: { service: page.contactService } });

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        canonical={`/${page.slug}`}
        ogImage={`/og/${page.slug}.jpg`}
        ogImageAlt={page.h1}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.h1,
          description: page.seoDescription,
          serviceType: page.navLabel,
          url: `${SITE}/${page.slug}`,
          areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Place', name: 'Worldwide' }],
          provider: { '@type': 'ProfessionalService', '@id': ORG_ID, name: 'Ttech SOLUTIONS', url: `${SITE}/` },
          offers: { '@type': 'Offer', priceCurrency: 'USD', description: `Typical investment ${page.pricing.range} · ${page.pricing.timeline}` },
        }}
      />
      <BreadcrumbStructuredData items={[{ name: 'Services', path: '/services' }, { name: page.navLabel, path: `/${page.slug}` }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      <main className="flex-1 bg-[#F8FBFF] pt-20">
        {/* Hero */}
        <section className="border-b border-[#DCE8F8] bg-gradient-to-b from-[#EAF2FF] to-[#F8FBFF]">
          <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">{page.eyebrow}</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0B1220] sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#475569] sm:text-lg">{page.intro}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookCallButton className="w-full sm:w-auto" />
              <button
                type="button"
                onClick={goToQuote}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#DCE8F8] bg-white px-7 py-4 text-sm font-semibold text-[#0B1220] hover:border-[#2563EB] sm:w-auto"
              >
                Get a fixed quote <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#475569]">
              <span className="inline-flex items-center gap-1.5"><Wallet className="h-4 w-4 text-[#2563EB]" /> From {page.pricing.range.split('–')[0].trim()}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#2563EB]" /> {page.pricing.timeline}</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#2563EB]" /> 100% code ownership</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
          {/* Ideal for */}
          <section>
            <h2 className="font-display text-2xl font-extrabold text-[#0B1220] sm:text-3xl">Who this is for</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.idealFor.map((item) => (
                <li key={item} className="flex gap-2.5 rounded-2xl border border-[#DCE8F8] bg-white p-4 text-sm leading-relaxed text-[#475569]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Includes */}
          <section>
            <h2 className="font-display text-2xl font-extrabold text-[#0B1220] sm:text-3xl">{page.includesTitle}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.includes.map((f) => (
                <div key={f.title} className="rounded-2xl border border-[#DCE8F8] bg-white p-5">
                  <h3 className="font-display text-base font-bold text-[#0B1220]">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing + why us */}
          <section className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl bg-[#0B1528] p-6 text-white sm:p-8 lg:col-span-2">
              <h2 className="font-display text-xl font-bold text-white">Typical investment</h2>
              <div className="mt-4 font-display text-3xl font-extrabold text-[#60A5FA]">{page.pricing.range}</div>
              <div className="mt-1 text-sm text-[#A7B0C2]">{page.pricing.timeline}</div>
              <p className="mt-4 text-sm leading-relaxed text-[#D8DEE9]">{page.pricing.note}</p>
              <p className="mt-3 text-xs text-[#A7B0C2]">Final price is a fixed written quote — agreed before work starts.</p>
            </div>
            <div className="rounded-3xl border border-[#DCE8F8] bg-white p-6 sm:p-8 lg:col-span-3">
              <h2 className="font-display text-xl font-bold text-[#0B1220]">Why work with Ttech</h2>
              <ul className="mt-4 space-y-3">
                {page.whyUs.map((w) => (
                  <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-[#475569]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="font-display text-2xl font-extrabold text-[#0B1220] sm:text-3xl">How it works</h2>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-[#DCE8F8] bg-white p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-[#0B1220]">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Related work */}
          {projects.length > 0 && (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-extrabold text-[#0B1220] sm:text-3xl">Recent work</h2>
                <Link to="/work" className="shrink-0 text-sm font-semibold text-[#2563EB] no-underline hover:underline">
                  All case studies →
                </Link>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/work/${p.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#DCE8F8] bg-white no-underline hover:shadow-[0_16px_32px_rgba(37,99,235,0.12)]"
                  >
                    <ProjectVisual project={p} className="aspect-[16/10] w-full" />
                    <div className="p-4">
                      <div className="font-display text-base font-bold text-[#0B1220] group-hover:text-[#2563EB]">{p.shortTitle}</div>
                      <p className="mt-1 text-xs leading-relaxed text-[#475569]">{p.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section>
            <h2 className="font-display text-2xl font-extrabold text-[#0B1220] sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-5 space-y-3">
              {page.faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-[#DCE8F8] bg-white p-5 open:shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-[#0B1220] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#2563EB] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl bg-gradient-to-br from-[#1D4ED8] to-[#0B1528] p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Let&apos;s talk about your project</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#D8DEE9] sm:text-base">
              Book a free 30-minute call. You&apos;ll get honest advice, a recommended approach and a ballpark budget — no obligation.
            </p>
            <div className="mt-6 flex justify-center">
              <BookCallButton variant="dark" />
            </div>
          </section>

          {/* Other services (internal links) */}
          <nav aria-label="Other services">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7B8AA3]">Other services</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/${o.slug}`}
                  className="rounded-xl border border-[#DCE8F8] bg-white px-3.5 py-2 text-sm font-medium text-[#2563EB] no-underline hover:border-[#2563EB]"
                >
                  {o.navLabel}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <Footer onOpenConsultation={() => navigate('/contact')} />
    </>
  );
}
