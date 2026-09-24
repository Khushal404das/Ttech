import React from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Code2,
  Headphones,
  Award,
  Sparkles,
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Alexander Wright',
      role: 'Chief Technology Officer',
      company: 'LogiVanguard Systems',
      rating: 5,
      content:
        'Finding an agency that truly understands enterprise .NET Core alongside cutting-edge React is rare. Ttech SOLUTIONS delivered our multi-tenant platform on time and under budget. The Clean Architecture they laid out made onboarding our in-house team seamless.',
      highlight: 'Flawless .NET 9 Migration',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Product',
      company: 'SaaSFlow Health',
      rating: 5,
      content:
        'From the first UI wireframe to the final production deployment on Azure, their attention to detail was exceptional. Sub-50ms API response times and a conversion-focused UI that our clinical clients love.',
      highlight: 'Sub-50ms API Latency',
    },
    {
      name: 'Marcus Sterling',
      role: 'Founder & CEO',
      company: 'Aura Commerce Inc',
      rating: 5,
      content:
        'Our online store went from sluggish to lightning-fast. The checkout flow redesigned by Ttech led to an immediate 34% bump in sales the very first week. Post-delivery support has been top tier.',
      highlight: '+34% Instant Conversion Lift',
    },
  ];

  const commitments = [
    {
      icon: Code2,
      title: 'Clean Code Architecture',
      desc: 'Strictly modular, maintainable, and type-safe codebases adhering to domain-driven design and enterprise SOLID principles.',
      badge: 'Zero Technical Debt',
      color: 'text-cyan-400',
    },
    {
      icon: Clock,
      title: '100% On-Time Delivery',
      desc: 'Transparent two-week sprint milestones with bi-weekly live staging demos. We never miss agreed launch dates.',
      badge: 'Sprint Guarantee',
      color: 'text-purple-400',
    },
    {
      icon: ShieldCheck,
      title: 'Security & SLA Compliance',
      desc: 'End-to-end data encryption, JWT/OAuth2 role-based authorization, OWASP Top 10 hardening, and automated unit testing.',
      badge: 'Enterprise Security',
      color: 'text-emerald-400',
    },
    {
      icon: Headphones,
      title: 'Dedicated Post-Launch Support',
      desc: '30-day comprehensive post-launch warranty included with every build, plus ongoing cloud monitoring and maintenance options.',
      badge: '24/7 SLA Available',
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Built on Trust &amp; Engineering Rigor</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Think. Transform.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Trust.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Our company philosophy is reflected in every line of code we write, every deadline we hit, and every lasting client partnership we build.
          </p>
        </div>

        {/* 4 Core Agency Commitments (from banner) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {commitments.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all hover:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <Icon className={`w-5 h-5 ${c.color}`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/40 border border-slate-800/90 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {r.highlight}
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &quot;{r.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-sm font-bold text-white">{r.name}</div>
                <div className="text-xs text-slate-400">{r.role} · {r.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
