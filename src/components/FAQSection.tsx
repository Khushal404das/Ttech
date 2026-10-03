import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Layers,
  DollarSign,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  FolderOpen,
  Folder,
  Calculator,
  Bot,
  ExternalLink,
} from 'lucide-react';
import type { AppSection, FAQItem } from '../types';

interface FAQSectionProps {
  onSelectSection: (section: AppSection) => void;
  onOpenConsultation: (topic?: string) => void;
  onOpenEstimator?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onSelectSection,
  onOpenConsultation,
  onOpenEstimator,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'process' | 'pricing' | 'support'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['process-1', 'pricing-1']));
  const [singleOpenMode, setSingleOpenMode] = useState(false);

  const faqData: FAQItem[] = [
    // Development Process
    {
      id: 'process-1',
      category: 'process',
      categoryLabel: 'Development Process',
      question: 'How does your agile development process work from kickoff to deployment?',
      summary: 'Structured two-week sprints, live staging environments, bi-weekly video demos, and complete git transparency.',
      answer:
        'Our delivery follows a battle-tested Agile methodology designed for zero surprises. We start with a 3-5 day Technical Discovery phase to crystallize architecture, database schemas, and Figma wireframes. From there, we work in strict two-week sprints. Every alternate Friday, you receive a live staging demo URL and release notes. Code is continuously tested via automated CI/CD pipelines before production sign-off.',
      keyPoints: [
        'Discovery & Architecture Sprint (Wireframes + DB Schemas)',
        'Bi-weekly live staging demos & changelogs',
        'Automated CI/CD test suites & pull request reviews',
        'Direct access to our senior engineering squad',
      ],
      recommendedAction: {
        label: 'Run AI Architecture Scoper',
        section: 'ai-scoper',
      },
    },
    {
      id: 'process-2',
      category: 'process',
      categoryLabel: 'Development Process',
      question: 'Who owns the source code, intellectual property (IP), and project assets?',
      summary: '100% complete client ownership upon project milestone completion. Zero vendor lock-in.',
      answer:
        'You own 100% of the intellectual property, source code, database schemas, Figma design components, and documentation. Upon milestone completion and settlement, full administrator rights to the GitHub/GitLab repositories and cloud hosting accounts are transferred directly to your organization. We never enforce proprietary runtimes, hidden royalties, or vendor lock-in.',
      keyPoints: [
        'Full IP assignment in contractual agreement',
        'Clean repository transfer with commit history',
        'Figma vector source files & design system tokens',
        'Zero ongoing proprietary framework licensing fees',
      ],
    },
    {
      id: 'process-3',
      category: 'process',
      categoryLabel: 'Development Process',
      question: 'How do you handle scope changes, feature additions, or shifting priorities?',
      summary: 'Transparent change management with upfront impact assessments on budget and timeline.',
      answer:
        'Product requirements naturally evolve as you gather market feedback. Minor refinements and UI tweaks are accommodated organically within active sprint backlogs at no extra cost. For substantial feature pivots or additions, we provide a formal Scope Impact Brief specifying the exact engineering hours, cost variance, and timeline adjustment. Nothing is built or billed without your prior written sign-off.',
      keyPoints: [
        'Agile backlog re-prioritization at each sprint start',
        'Clear written impact reports before commencing new scope',
        'No unexpected invoices or phantom developer hours',
      ],
    },
    {
      id: 'process-4',
      category: 'process',
      categoryLabel: 'Development Process',
      question: 'Can your team integrate with or augment our in-house developers?',
      summary: 'Seamless squad augmentation with shared Slack/Teams channels, Jira boards, and PR workflows.',
      answer:
        'Yes! Approximately 40% of our enterprise engagements are hybrid staff augmentation. Our senior engineers integrate directly into your workflows—joining your daily standups, authoring branch pull requests, adhering strictly to your ESLint / C# analyzers, and participating in peer code reviews.',
      keyPoints: [
        'Direct Slack / Discord / Microsoft Teams integration',
        'Adherence to your CI/CD, branching strategy, and styleguides',
        'Flexible monthly developer squad capacity',
      ],
      recommendedAction: {
        label: 'Explore Our Tech Stack',
        section: 'dotnet-stack',
      },
    },
    {
      id: 'process-5',
      category: 'process',
      categoryLabel: 'Development Process',
      question: 'How do you ensure sub-second performance and enterprise security?',
      summary: 'Clean Architecture, automated caching layers, OWASP Top 10 hardening, and sub-50ms API response targets.',
      answer:
        'Every solution is architected according to SOLID design principles and domain-driven design (DDD). On the backend (.NET Core 9 / Node.js), we implement connection pooling, Redis distributed caching, and compiled queries. On the frontend (React 19 / Next.js), we leverage server components, code-splitting, and asset edge CDN distribution. We also audit every endpoint against OWASP Top 10 standards.',
      keyPoints: [
        'Benchmarked sub-50ms database & API response times',
        'JWT + OAuth2 role-based access control (RBAC)',
        'Automated security scanning & dependency audits',
      ],
    },

    // Pricing & Estimates
    {
      id: 'pricing-1',
      category: 'pricing',
      categoryLabel: 'Pricing & Estimates',
      question: 'How are project costs calculated, and are there any hidden fees?',
      summary: 'Transparent, itemized pricing based on feature complexity and architectural tier. Zero hidden fees.',
      answer:
        'We believe in absolute financial transparency. Estimates are calculated based on component complexity, security tier, third-party API integrations, and estimated sprint velocity. All third-party services (such as cloud hosting, transactional email, and payment gateway fees) are clearly segregated so you retain direct billing ownership without agency markups.',
      keyPoints: [
        'Detailed line-item quote breakdown for each module',
        'No markup on cloud infrastructure (Azure, AWS, GCP)',
        'Fixed-price milestone guarantees for defined scopes',
      ],
      recommendedAction: {
        label: 'Launch Cost Estimator',
        section: 'estimator',
      },
    },
    {
      id: 'pricing-2',
      category: 'pricing',
      categoryLabel: 'Pricing & Estimates',
      question: 'What payment schedule and milestone milestones do you require?',
      summary: 'Standard 30% kickoff deposit, 40% mid-point milestone demo, and 30% final deployment release.',
      answer:
        'For fixed-scope builds, our standard billing schedule is split into clear milestones tied to tangible deliverables: 30% upon contract signing and discovery kickoff; 40% upon successful demonstration of core interactive features on our staging server; and the final 30% upon user acceptance testing (UAT) and production release. We accept bank wire, ACH, and major credit cards.',
      keyPoints: [
        'Milestone 1 (30%): Project Kickoff & UI/UX Architectural Approval',
        'Milestone 2 (40%): Staging Environment Functional Demo',
        'Milestone 3 (30%): Final Production Acceptance & IP Transfer',
        'Official business invoices with tax receipts',
      ],
    },
    {
      id: 'pricing-3',
      category: 'pricing',
      categoryLabel: 'Pricing & Estimates',
      question: 'How accurate is your interactive Project Cost Estimator tool?',
      summary: 'Calibrated to ±10-15% precision based on historical agency delivery metrics.',
      answer:
        'Our online cost estimator is directly calibrated against the actual hours, architectural modules, and staffing costs of our past 40+ completed builds. It provides a highly reliable ±10-15% budgetary forecast. When you submit your locked estimate or complete an AI scoping session, our lead architect reviews your requirements and issues a firm, binding quote within 24 business hours.',
      keyPoints: [
        'Reflects real production engineering hours and market rates',
        'Allows customized module and tech stack selection',
        'Firm binding proposal issued within 24 hours of discovery',
      ],
      recommendedAction: {
        label: 'Open Interactive Estimator',
        section: 'estimator',
      },
    },
    {
      id: 'pricing-4',
      category: 'pricing',
      categoryLabel: 'Pricing & Estimates',
      question: 'Do you offer fixed-price contracts or dedicated monthly developer retainers?',
      summary: 'Both! Fixed-price contracts for defined projects, and dedicated sprint retainers for evolving products.',
      answer:
        'We tailor engagement models to fit your business stage. If you have clear, documented requirements, a Fixed-Price Agreement gives you predictable cost certainty. If you are an early-stage startup or fast-growing SaaS needing rapid experimentation and weekly pivots, our Dedicated Engineering Squad Retainer provides a dedicated pod of developers and designers with flexible bi-weekly allocation.',
      keyPoints: [
        'Fixed-Price: Best for MVPs, redesigns, and discrete systems',
        'Dedicated Retainer: Best for active SaaS scaling & multi-month roadmaps',
        'Easy transition between models as your product matures',
      ],
    },

    // Support & Maintenance
    {
      id: 'support-1',
      category: 'support',
      categoryLabel: 'Support & Maintenance',
      question: 'What post-launch warranty and bug-fixing support is included?',
      summary: '30-day comprehensive post-launch warranty included at zero extra cost with every build.',
      answer:
        'Every project delivered by Ttech SOLUTIONS includes an automatic 30-Day Comprehensive Post-Launch Warranty. If any bug, edge case, or performance bottleneck arises from our delivered codebase during this window, our engineering team resolves it with highest priority at no charge. We ensure your system operates smoothly during real-world user onboarding.',
      keyPoints: [
        '30-day zero-cost warranty on all delivered code',
        'Same-day priority triage for production critical issues',
        'Includes performance stabilization and real-world traffic monitoring',
      ],
      recommendedAction: {
        label: 'Schedule a Consultation',
        section: 'inquiry',
      },
    },
    {
      id: 'support-2',
      category: 'support',
      categoryLabel: 'Support & Maintenance',
      question: 'What ongoing maintenance and SLA packages do you offer?',
      summary: 'Tiered maintenance retainers ranging from basic security patching to 24/7 mission-critical SLA monitoring.',
      answer:
        'We provide three ongoing operational tiers: Tier 1 Essential (security patches, package updates, automated weekly database backups, and health monitoring); Tier 2 Growth (includes a dedicated allotment of 15-30 developer hours per month for feature iterations); and Tier 3 Enterprise SLA (24/7 uptime monitoring with guaranteed sub-1-hour critical response).',
      keyPoints: [
        'Continuous security updates & zero-day vulnerability patching',
        'Proactive uptime & error telemetry (Azure Monitor, Sentry, Datadog)',
        'Guaranteed response times with dedicated account engineering manager',
      ],
    },
    {
      id: 'support-3',
      category: 'support',
      categoryLabel: 'Support & Maintenance',
      question: 'Do you configure production cloud hosting, domains, and DevOps pipelines?',
      summary: 'Turnkey cloud deployment on Azure, AWS, GCP, or Vercel with automated CI/CD and SSL certificates.',
      answer:
        'Yes! We manage the entire DevOps and deployment pipeline. We configure containerized environments using Docker, orchestrate deployments with GitHub Actions or Azure DevOps, provision SSL certificates, configure CDN edge rules, set up automated database replication, and route your custom domain. Full credentials and master ownership are transferred directly to your organization.',
      keyPoints: [
        'Multi-cloud expertise (Microsoft Azure, AWS, GCP, Vercel, Supabase)',
        'Automated CI/CD pipelines with rollback capabilities',
        'Zero downtime blue/green or rolling deployment strategies',
      ],
    },
    {
      id: 'support-4',
      category: 'support',
      categoryLabel: 'Support & Maintenance',
      question: 'What documentation, API schemas, and staff handover do you deliver?',
      summary: 'Comprehensive handover package including OpenAPI/Swagger documentation, architecture diagrams, and video walkthroughs.',
      answer:
        'We never leave you with undocumented black-box software. Every delivery concludes with a structured handover phase: interactive OpenAPI/Swagger API specifications, Entity Relationship Diagrams (ERDs), system architecture schematics, local environment setup instructions, and recorded Loom video walkthroughs guiding your internal team through the code structure.',
      keyPoints: [
        'Interactive Swagger / OpenAPI UI for backend routes',
        'Detailed README.md with step-by-step local bootstrap commands',
        'Architectural diagrams & database relationship mapping',
        'Live 60-minute recorded team Q&A handover session',
      ],
    },
  ];

  // Filter items based on active category and search query
  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inQuestion = item.question.toLowerCase().includes(q);
      const inSummary = item.summary.toLowerCase().includes(q);
      const inAnswer = item.answer.toLowerCase().includes(q);
      const inCategory = item.categoryLabel.toLowerCase().includes(q);
      const inKeyPoints = item.keyPoints?.some((kp) => kp.toLowerCase().includes(q));

      return inQuestion || inSummary || inAnswer || inCategory || inKeyPoints;
    });
  }, [faqData, activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (singleOpenMode) {
        if (next.has(id)) {
          next.clear();
        } else {
          next.clear();
          next.add(id);
        }
      } else {
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const allIds = new Set(filteredFaqs.map((f) => f.id));
    setOpenIds(allIds);
  };

  const handleCollapseAll = () => {
    setOpenIds(new Set());
  };

  const categories = [
    { id: 'all', label: 'All Questions', count: faqData.length, icon: HelpCircle },
    { id: 'process', label: 'Development Process', count: faqData.filter((f) => f.category === 'process').length, icon: Layers },
    { id: 'pricing', label: 'Pricing & Estimates', count: faqData.filter((f) => f.category === 'pricing').length, icon: DollarSign },
    { id: 'support', label: 'Support & SLA', count: faqData.filter((f) => f.category === 'support').length, icon: ShieldCheck },
  ] as const;

  return (
    <section id="faq" className="py-24 relative bg-[#F8FBFF] border-t border-[#DCE8F8] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-cyan-900/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Transparency &amp; Engineering Answers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
            Everything you need to know about our engineering methodology, transparent pricing models, source code ownership, and post-launch support guarantees.
          </p>
        </div>

        {/* Filter Tabs & Search Bar Container */}
        <div className="space-y-4 mb-8">
          {/* Interactive Category Segmented Control */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-[#DCE8F8] rounded-2xl max-w-3xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-[#0B1220] shadow-lg shadow-[#2563EB]/20'
                      : 'text-[#7B8AA3] hover:text-[#475569] hover:bg-[#F1F7FF]'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0B1220]' : 'text-[#7B8AA3]'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-cyan-700/60 text-cyan-100' : 'bg-white text-[#7B8AA3] border border-[#DCE8F8]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Accordion Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#7B8AA3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., code ownership, warranty, sprints)..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#DCE8F8] rounded-xl text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#2563EB]/70 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                aria-label="Search frequently asked questions"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B8AA3] hover:text-[#475569] p-0.5"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Actions (Expand/Collapse All & Single-mode toggle) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-[#7B8AA3]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleExpandAll}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DCE8F8] hover:border-[#60A5FA] hover:text-[#475569] transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
                  title="Expand all questions"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Expand All</span>
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DCE8F8] hover:border-[#60A5FA] hover:text-[#475569] transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
                  title="Collapse all questions"
                >
                  <Folder className="w-3.5 h-3.5 text-[#7B8AA3]" />
                  <span>Collapse All</span>
                </button>
              </div>

              {/* Toggle single-accordion mode */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-[#7B8AA3] hover:text-[#475569] ml-2">
                <input
                  type="checkbox"
                  checked={singleOpenMode}
                  onChange={(e) => {
                    setSingleOpenMode(e.target.checked);
                    if (e.target.checked && openIds.size > 1) {
                      // Keep only the first opened item
                      const first = Array.from(openIds)[0];
                      setOpenIds(first ? new Set([first]) : new Set());
                    }
                  }}
                  className="rounded border-[#60A5FA] bg-white text-[#2563EB] focus:ring-cyan-500 focus:ring-offset-0 w-3.5 h-3.5"
                />
                <span>One-at-a-time</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results summary if searching */}
        {searchQuery.trim() && (
          <div className="mb-4 text-xs text-[#7B8AA3] flex items-center justify-between px-1">
            <span>
              Showing {filteredFaqs.length} of {faqData.length} questions matching{' '}
              <span className="text-[#2563EB] font-medium">&quot;{searchQuery}&quot;</span>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#2563EB] hover:underline cursor-pointer"
            >
              Reset search
            </button>
          </div>
        )}

        {/* Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#F1F7FF] rounded-3xl border border-[#DCE8F8]">
            <HelpCircle className="w-10 h-10 text-[#7B8AA3] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B1220] mb-1">No matching questions found</h3>
            <p className="text-xs text-[#7B8AA3] max-w-sm mx-auto mb-4">
              We couldn&apos;t find an answer matching &quot;{searchQuery}&quot;. Feel free to reach out directly to our engineering team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-[#F1F7FF] text-[#0B1220] text-xs hover:bg-[#EAF2FF] transition-colors"
              >
                Clear Search
              </button>
              <button
                onClick={() => onOpenConsultation(`Question about: ${searchQuery}`)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-[#0B1220] text-xs hover:bg-[#3B82F6] transition-colors font-medium shadow-md shadow-[#2563EB]/15"
              >
                Ask Our Technical Architects
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((item) => {
              const isOpen = openIds.has(item.id);
              const categoryColor =
                item.category === 'process'
                  ? 'text-[#2563EB] border-[#2563EB]/20 bg-[#EAF2FF]'
                  : item.category === 'pricing'
                  ? 'text-emerald-400 border-emerald-800/40 bg-emerald-950/40'
                  : 'text-[#2563EB] border-purple-800/40 bg-purple-950/40';

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? 'bg-white border-[#2563EB]/30 shadow-xl shadow-cyan-950/10'
                      : 'bg-[#F1F7FF] border-[#DCE8F8] hover:border-[#DCE8F8] hover:bg-white'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-header-${item.id}`}
                    className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer select-none group"
                  >
                    <div className="flex-1 space-y-1.5">
                      {/* Quiet Unboxed Metadata Line conforming to anti-slop rules */}
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className={`px-2 py-0.5 rounded border text-[10px] uppercase tracking-wider font-semibold ${categoryColor}`}>
                          {item.categoryLabel}
                        </span>
                        <span className="text-[#7B8AA3]" aria-hidden="true">·</span>
                        <span className="text-[#7B8AA3] font-sans hidden sm:inline text-xs">
                          {item.summary}
                        </span>
                      </div>

                      {/* Question Heading */}
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-[#2563EB]' : 'text-[#0B1220] group-hover:text-[#2563EB]'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* Chevron Indicator */}
                    <div
                      className={`p-2 rounded-xl border transition-all shrink-0 mt-1 sm:mt-0 ${
                        isOpen
                          ? 'bg-[#3B82F6]/20 border-[#2563EB]/50 text-[#2563EB] rotate-180'
                          : 'bg-white border-[#DCE8F8] text-[#7B8AA3] group-hover:border-[#60A5FA] group-hover:text-[#475569]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-header-${item.id}`}
                      className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-[#DCE8F8] animate-in fade-in-50 duration-200"
                    >
                      <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-4">
                        {item.answer}
                      </p>

                      {/* Key Points Checklist */}
                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="mb-4 p-3.5 rounded-xl bg-white/70 border border-[#DCE8F8]/90 space-y-2">
                          <div className="text-[11px] font-bold text-[#475569] uppercase tracking-wider font-mono">
                            Key Takeaways &amp; Commitments:
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569]">
                            {item.keyPoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Interactive Section Link if applicable */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                        {item.recommendedAction ? (
                          <button
                            onClick={() => onSelectSection(item.recommendedAction!.section)}
                            className="inline-flex items-center gap-1.5 text-[#2563EB] hover:text-[#2563EB] font-semibold transition-colors cursor-pointer group/link"
                          >
                            <span>{item.recommendedAction.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#7B8AA3]">
                            Engineering Standard · Ttech SOLUTIONS
                          </span>
                        )}

                        <button
                          onClick={() => onOpenConsultation(item.question)}
                          className="text-[#7B8AA3] hover:text-[#475569] text-[11px] underline underline-offset-4 cursor-pointer"
                        >
                          Have a specific question about this?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still have questions? Interactive Help Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F1F7FF] to-white border border-[#DCE8F8] shadow-[0_10px_30px_rgba(37,99,235,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2563EB]">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Architect Access</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display">
              Have a custom project or unlisted technical requirement?
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm max-w-xl leading-relaxed">
              Our lead engineers are happy to discuss custom distributed architectures, migrations, API integrations, and non-disclosure agreements (NDAs).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                if (onOpenEstimator) {
                  onOpenEstimator();
                } else {
                  onSelectSection('estimator');
                }
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#DCE8F8] text-[#475569] hover:text-[#0B1220] hover:border-[#60A5FA] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Project Estimator</span>
            </button>
            <button
              onClick={() => onOpenConsultation('Custom Technical Consultation')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-[0_8px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

