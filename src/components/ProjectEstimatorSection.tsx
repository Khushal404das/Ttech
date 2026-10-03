import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  ShieldCheck,
  Cpu,
  Layers,
  Send,
  Copy,
  Check,
  Code2,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectEstimatorSectionProps {
  initialService?: string;
  initialStack?: string;
  onLockEstimate: (estimateSummary: {
    serviceType: string;
    stack: string;
    features: string[];
    urgency: string;
    budgetRange: string;
    timeline: string;
  }) => void;
}

export const ProjectEstimatorSection: React.FC<ProjectEstimatorSectionProps> = ({
  initialService = 'SaaS Platform & Multi-Tenant App',
  initialStack = '.NET Core 9 + React 19 (Enterprise)',
  onLockEstimate,
}) => {
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedStack, setSelectedStack] = useState<string>(initialStack);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'User Authentication & Roles (JWT/RBAC)',
    'Admin Analytics Dashboard',
    'Cloud Azure / Docker Deployment',
  ]);
  const [urgency, setUrgency] = useState<'standard' | 'accelerated' | 'enterprise'>('standard');
  const [copied, setCopied] = useState(false);

  // Available Services
  const services = [
    { title: 'SaaS Platform & Multi-Tenant App', basePrice: 4200, baseWeeks: 6 },
    { title: 'Custom Enterprise Software (.NET)', basePrice: 4800, baseWeeks: 7 },
    { title: 'Full Stack Web Application', basePrice: 3400, baseWeeks: 5 },
    { title: 'Corporate Website & Landing Page', basePrice: 1800, baseWeeks: 2 },
    { title: 'E-Commerce Store & Checkout', basePrice: 3200, baseWeeks: 4 },
    { title: 'UI/UX Design & Figma Prototype', basePrice: 1500, baseWeeks: 2 },
    { title: 'AI Automation & Intelligent Pipeline', basePrice: 2800, baseWeeks: 3 },
  ];

  // Tech Stacks
  const stacks = [
    { name: '.NET Core 9 + React 19 (Enterprise)', badge: 'Recommended', modifier: 1.0 },
    { name: 'React + Next.js Full Stack', badge: 'High Velocity', modifier: 0.95 },
    { name: 'Node.js Express + React 19', badge: 'Popular', modifier: 0.95 },
    { name: 'Python FastAPI + AI + React', badge: 'AI Native', modifier: 1.05 },
    { name: 'PHP / Laravel + Vue or React', badge: 'Rapid CMS', modifier: 0.9 },
  ];

  // Feature Options
  const featureOptions = [
    { name: 'User Authentication & Roles (JWT/RBAC)', cost: 600, hours: 24 },
    { name: 'Stripe Subscriptions & Payment Gateway', cost: 850, hours: 32 },
    { name: 'Gemini AI Automation & Smart Agent', cost: 1100, hours: 40 },
    { name: 'Real-time SignalR / WebSockets Sync', cost: 750, hours: 28 },
    { name: 'Admin Analytics Dashboard', cost: 900, hours: 35 },
    { name: 'Cloud Azure / Docker Deployment', cost: 650, hours: 20 },
    { name: 'Mobile PWA Responsive Optimization', cost: 500, hours: 18 },
    { name: 'Advanced SEO & Schema.org Rich Data', cost: 450, hours: 16 },
  ];

  const toggleFeature = (featName: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featName) ? prev.filter((f) => f !== featName) : [...prev, featName]
    );
  };

  // Calculation
  const calculation = useMemo(() => {
    const currentService = services.find((s) => s.title === selectedService) || services[0];
    const currentStack = stacks.find((s) => s.name === selectedStack) || stacks[0];

    let featuresTotal = 0;
    let featuresHours = 0;
    selectedFeatures.forEach((fName) => {
      const feat = featureOptions.find((fo) => fo.name === fName);
      if (feat) {
        featuresTotal += feat.cost;
        featuresHours += feat.hours;
      }
    });

    let urgencyMultiplier = 1.0;
    let weeksMultiplier = 1.0;

    if (urgency === 'accelerated') {
      urgencyMultiplier = 1.25;
      weeksMultiplier = 0.65;
    } else if (urgency === 'enterprise') {
      urgencyMultiplier = 1.4;
      weeksMultiplier = 1.5;
    }

    const rawTotal = (currentService.basePrice + featuresTotal) * currentStack.modifier * urgencyMultiplier;
    const minBudget = Math.round(rawTotal * 0.92 / 50) * 50;
    const maxBudget = Math.round(rawTotal * 1.15 / 50) * 50;

    const baseWeeks = Math.max(2, Math.round(currentService.baseWeeks * weeksMultiplier));
    const maxWeeks = baseWeeks + (urgency === 'enterprise' ? 4 : 2);
    const totalHours = Math.round((currentService.baseWeeks * 25 + featuresHours) * (urgency === 'enterprise' ? 1.3 : 1.0));

    return {
      minBudget,
      maxBudget,
      timeline: `${baseWeeks} - ${maxWeeks} Weeks`,
      estimatedHours: `${totalHours - 20} - ${totalHours + 30} hrs`,
      budgetRangeStr: `$${minBudget.toLocaleString()} - $${maxBudget.toLocaleString()} USD`,
    };
  }, [selectedService, selectedStack, selectedFeatures, urgency]);

  const handleLockEstimate = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    onLockEstimate({
      serviceType: selectedService,
      stack: selectedStack,
      features: selectedFeatures,
      urgency,
      budgetRange: calculation.budgetRangeStr,
      timeline: calculation.timeline,
    });
  };

  const copyEstimateSummary = () => {
    const text = `Ttech SOLUTIONS Project Estimate:
Service: ${selectedService}
Preferred Stack: ${selectedStack}
Add-on Features: ${selectedFeatures.join(', ')}
Urgency: ${urgency}
Estimated Budget: ${calculation.budgetRangeStr}
Estimated Timeline: ${calculation.timeline}
Guaranteed: Clean Code, 100% On-Time Delivery, 24/7 Support`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Visual Stepper Steps Configuration
  const steps = [
    {
      id: 1,
      targetId: 'estimator-step-1',
      title: 'Project Category',
      subtitle: selectedService.replace(' & Multi-Tenant App', '').replace(' (.NET)', ''),
      icon: Layers,
      isCompleted: Boolean(selectedService),
      statusLabel: 'Selected',
    },
    {
      id: 2,
      targetId: 'estimator-step-2',
      title: 'Tech Stack',
      subtitle: selectedStack.includes('.NET') ? '.NET 9 + React 19' : selectedStack.split(' ')[0],
      icon: Code2,
      isCompleted: Boolean(selectedStack),
      statusLabel: 'Configured',
    },
    {
      id: 3,
      targetId: 'estimator-step-3',
      title: 'Add-on Features',
      subtitle: `${selectedFeatures.length} module${selectedFeatures.length === 1 ? '' : 's'}`,
      icon: Cpu,
      isCompleted: selectedFeatures.length > 0,
      statusLabel: selectedFeatures.length > 0 ? `${selectedFeatures.length} Added` : 'None',
    },
    {
      id: 4,
      targetId: 'estimator-step-4',
      title: 'Sprint Cadence',
      subtitle: urgency.charAt(0).toUpperCase() + urgency.slice(1),
      icon: Zap,
      isCompleted: Boolean(urgency),
      statusLabel: 'Selected',
    },
    {
      id: 5,
      targetId: 'estimator-step-5',
      title: 'Instant Proposal',
      subtitle: calculation.timeline,
      icon: Calculator,
      isCompleted: true,
      statusLabel: 'Live Ready',
    },
  ];

  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const scrollToStep = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <motion.section
      id="estimator"
      className="py-24 relative bg-[#F8FBFF] border-t border-[#DCE8F8]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Transparent Pricing &amp; Timeline Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-4">
            Interactive Project Cost &amp;{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
              Timeline Estimator
            </span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg">
            No guessing games. Select your project parameters, preferred stack, and custom features to get an immediate ballpark estimate based on our production sprint metrics.
          </p>
        </div>

        {/* Visual Progress Stepper Component */}
        <div className="glass-panel rounded-3xl p-4 sm:p-6 mb-10 border border-[#2563EB]/25 shadow-2xl shadow-cyan-950/20 ">
          {/* Top Status & Metrics Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#DCE8F8]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3B82F6]" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                Estimation Workflow
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB]">
                Step {completedCount} of {steps.length} Complete · {progressPercent}%
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#7B8AA3] hidden sm:inline">Active Ballpark:</span>
              <span className="font-bold text-[#0B1220] bg-white px-3 py-1 rounded-xl border border-[#2563EB]/30 text-[#2563EB] font-mono shadow-sm">
                {calculation.budgetRangeStr}
              </span>
            </div>
          </div>

          {/* Stepper Bar with Connecting Track */}
          <div className="relative">
            {/* Horizontal Connecting Track for Desktop */}
            <div className="absolute top-5 left-10 right-10 h-1 bg-[#F1F7FF] rounded-full hidden lg:block -z-0">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stepper Step Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => scrollToStep(step.targetId)}
                    title={`Jump to ${step.title}`}
                    className={`group relative flex flex-col items-center p-3 sm:p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                      step.isCompleted
                        ? 'bg-white border-[#2563EB]/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-0.5'
                        : 'bg-white0 border-[#DCE8F8] text-[#7B8AA3] hover:border-[#60A5FA]'
                    }`}
                  >
                    {/* Step Icon / Number Indicator */}
                    <div
                      className={`relative w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                        step.isCompleted
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-[#0B1220] shadow-md shadow-cyan-500/25 group-hover:scale-105'
                          : 'bg-[#F1F7FF] text-[#7B8AA3] border border-[#60A5FA]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {step.isCompleted && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[#0B1220] flex items-center justify-center text-[9px] font-bold shadow-sm">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Step Name */}
                    <div className="text-xs font-bold text-[#0B1220] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {step.title}
                    </div>

                    {/* Active Value Preview */}
                    <div className="text-[11px] text-[#7B8AA3] truncate max-w-[120px] mt-0.5 group-hover:text-[#475569]">
                      {step.subtitle}
                    </div>

                    {/* Status Pill */}
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-[#2563EB] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span>{step.statusLabel}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#DCE8F8] ">
            {/* Step 1: Select Service */}
            <div id="estimator-step-1" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#2563EB] text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Select Primary Project Category</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((srv) => (
                  <button
                    key={srv.title}
                    onClick={() => setSelectedService(srv.title)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedService === srv.title
                        ? 'bg-[#EAF2FF] border-cyan-400 text-[#0B1220] shadow-md shadow-cyan-950/40'
                        : 'bg-white/60 border-[#DCE8F8] text-[#475569] hover:border-[#60A5FA]'
                    }`}
                  >
                    <div className="text-xs font-bold">{srv.title}</div>
                    <div className="text-[11px] text-[#7B8AA3] mt-1">From {srv.baseWeeks} weeks base</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Tech Stack */}
            <div id="estimator-step-2" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#2563EB] text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Select Preferred Technology Stack</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stacks.map((stk) => (
                  <button
                    key={stk.name}
                    onClick={() => setSelectedStack(stk.name)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      selectedStack === stk.name
                        ? 'bg-purple-950/40 border-purple-400 text-[#0B1220] shadow-md'
                        : 'bg-white/60 border-[#DCE8F8] text-[#475569] hover:border-[#60A5FA]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{stk.name}</div>
                      <div className="text-[10px] text-[#7B8AA3] mt-0.5">Architect-Approved</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F1F7FF] text-[#2563EB] font-mono">
                      {stk.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Required Modules / Features */}
            <div id="estimator-step-3" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#2563EB] text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span>Select Add-on Features &amp; Integrations</span>
                </label>
                <span className="text-xs text-[#2563EB]">
                  {selectedFeatures.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureOptions.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.name);
                  return (
                    <button
                      key={feat.name}
                      onClick={() => toggleFeature(feat.name)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-white border-[#2563EB]/80 text-[#0B1220] shadow-sm'
                          : 'bg-white/40 border-[#DCE8F8] text-[#7B8AA3] hover:text-[#475569]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#3B82F6] text-[#0B1220]' : 'border border-[#60A5FA] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="text-xs font-medium leading-snug">{feat.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgency / Timeline */}
            <div id="estimator-step-4" className="scroll-mt-28">
              <label className="text-sm font-bold text-[#0B1220] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#2563EB] text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <span>Select Sprint Delivery Pace</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', label: 'Standard', desc: 'Standard Agile Sprints' },
                  { id: 'accelerated', label: 'Accelerated', desc: 'Dedicated Fast-Track' },
                  { id: 'enterprise', label: 'Enterprise', desc: 'Deep Multi-Phase' },
                ].map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setUrgency(u.id as any)}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      urgency === u.id
                        ? 'bg-[#EAF2FF] border-cyan-400 text-[#0B1220]'
                        : 'bg-white/60 border-[#DCE8F8] text-[#7B8AA3] hover:border-[#60A5FA]'
                    }`}
                  >
                    <div className="text-xs font-bold">{u.label}</div>
                    <div className="text-[10px] text-[#7B8AA3] mt-0.5">{u.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Card (Right 5 Cols) */}
          <div id="estimator-step-5" className="lg:col-span-5 sticky top-24 space-y-6 scroll-mt-28">
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#DCE8F8] shadow-[0_10px_30px_rgba(37,99,235,0.08)]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DCE8F8]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                    Live Calculation
                  </span>
                </div>
                <button
                  onClick={copyEstimateSummary}
                  className="flex items-center gap-1.5 text-xs text-[#7B8AA3] hover:text-[#0B1220] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Budget Display */}
              <div className="mb-6">
                <div className="text-xs text-[#7B8AA3] font-medium mb-1">
                  Estimated Investment Range
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] font-display tracking-tight">
                  {calculation.budgetRangeStr}
                </div>
                <div className="text-[11px] text-[#7B8AA3] mt-1">
                  *Includes architecture design, clean code development &amp; 30-day post-launch warranty.
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#F8FBFF] border border-[#DCE8F8]">
                <div>
                  <div className="text-[11px] text-[#7B8AA3] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#2563EB]" />
                    <span>Estimated Timeline</span>
                  </div>
                  <div className="text-base font-bold text-[#0B1220] mt-0.5">
                    {calculation.timeline}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#7B8AA3] flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-[#2563EB]" />
                    <span>Sprint Dev Hours</span>
                  </div>
                  <div className="text-base font-bold text-[#0B1220] mt-0.5">
                    {calculation.estimatedHours}
                  </div>
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 mb-8 text-xs text-[#475569]">
                <div className="flex justify-between py-1 border-b border-[#DCE8F8]/60">
                  <span className="text-[#7B8AA3]">Target Category:</span>
                  <span className="font-semibold text-[#0B1220] truncate max-w-[200px]">{selectedService}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DCE8F8]/60">
                  <span className="text-[#7B8AA3]">Chosen Stack:</span>
                  <span className="font-mono text-[#2563EB]">{selectedStack}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DCE8F8]/60">
                  <span className="text-[#7B8AA3]">Active Add-ons:</span>
                  <span className="font-semibold text-[#0B1220]">{selectedFeatures.length} Modules</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#7B8AA3]">Code Quality Standard:</span>
                  <span className="text-emerald-600 font-semibold">Ttech Clean Code SLA</span>
                </div>
              </div>

              {/* Lock & Consult CTA */}
              <button
                onClick={handleLockEstimate}
                className="w-full py-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Lock In Estimate &amp; Book Discovery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

