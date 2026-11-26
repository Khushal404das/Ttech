import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import { BookCallButton } from '../components/BookCallButton';
import { BreadcrumbStructuredData, JsonLd, ORG_ID } from '../components/StructuredData';
import { ALL_FAQS, FAQ_GROUPS, FAQ_UPDATED } from '../data/faq';

const SITE = 'https://ttechsolutionz.dev';
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const updatedLabel = new Date(`${FAQ_UPDATED}T00:00:00Z`).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export default function FaqPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="FAQ: Prices, Timelines & Process | Ttech SOLUTIONS"
        description="Answers about Ttech SOLUTIONS: website, app, e-commerce, SaaS and AI prices, timelines, payments, code ownership and support."
        canonical="/faq"
      />
      <BreadcrumbStructuredData items={[{ name: 'FAQ', path: '/faq' }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${SITE}/faq#faq`,
          url: `${SITE}/faq`,
          dateModified: FAQ_UPDATED,
          publisher: { '@id': ORG_ID },
          mainEntity: ALL_FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      <main className="flex-1 bg-[#F8FBFF] pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Frequently asked questions</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0B1220] sm:text-5xl">
              Ttech SOLUTIONS FAQ
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#475569] sm:text-lg">
              Straight answers about prices, timelines, payments, code ownership and how we work.
            </p>
            <p className="mt-3 text-xs text-[#7B8AA3]">
              Last updated <time dateTime={FAQ_UPDATED}>{updatedLabel}</time>
            </p>
          </header>

          {/* Topic links */}
          <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap justify-center gap-2">
            {FAQ_GROUPS.map((g) => (
              <a
                key={g.title}
                href={`#${slugify(g.title)}`}
                className="rounded-xl border border-[#DCE8F8] bg-white px-3.5 py-2 text-sm font-medium text-[#2563EB] no-underline hover:border-[#2563EB]"
              >
                {g.title}
              </a>
            ))}
          </nav>

          {FAQ_GROUPS.map((group) => (
            <section key={group.title} id={slugify(group.title)} className="mt-12 scroll-mt-28">
              <h2 className="font-display text-2xl font-extrabold text-[#0B1220]">{group.title}</h2>
              <div className="mt-4 space-y-3">
                {group.items.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-[#DCE8F8] bg-white p-5 open:shadow-sm" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-base font-bold text-[#0B1220] sm:text-lg">{f.q}</h3>
                      <ChevronDown className="h-5 w-5 shrink-0 text-[#2563EB] transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">{f.a}</p>
                    {f.link && (
                      <Link
                        to={f.link.href}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] no-underline hover:underline"
                      >
                        {f.link.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-14 rounded-3xl bg-gradient-to-br from-[#1D4ED8] to-[#0B1528] p-8 text-center text-white sm:p-10">
            <h2 className="font-display text-2xl font-extrabold text-white">Still have a question?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#D8DEE9] sm:text-base">
              Ask us directly on a free 30-minute call — honest advice and a ballpark budget, no obligation.
            </p>
            <div className="mt-6 flex justify-center">
              <BookCallButton variant="dark" />
            </div>
          </section>
        </div>
      </main>
      <Footer onOpenConsultation={() => navigate('/contact')} />
    </>
  );
}
