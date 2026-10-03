import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Gauge, ShieldCheck, Sparkles } from 'lucide-react';

interface TrustBarProps {
  onOpenConsultation: () => void;
}

const proofPoints = [
  { value: '50ms', label: 'API response target', icon: Gauge },
  { value: '99.9%', label: 'reliability mindset', icon: ShieldCheck },
  { value: '2–4 wks', label: 'to launch-ready MVP', icon: Sparkles },
];

export const TrustBar: React.FC<TrustBarProps> = ({ onOpenConsultation }) => (
  <section className="relative z-20 -mt-5 px-4 sm:px-6 lg:px-8 pb-8">
    <motion.div
      className="max-w-6xl mx-auto rounded-[2rem] border border-[#DCE8F8] bg-white/80 p-3 shadow-2xl shadow-[#2563EB]/10 "
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] items-center">
        <div className="rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-blue-600/10 px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#2563EB]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Built for momentum
          </div>
          <p className="mt-2 text-sm font-semibold text-[#0B1220]">From first sketch to production without the handoff drama.</p>
        </div>
        {proofPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={point.label}
              className="px-4 py-3"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + index * 0.08, duration: 0.4 }}
            >
              <Icon className="h-4 w-4 text-[#2563EB]" />
              <div className="mt-2 font-display text-xl font-bold text-[#0B1220]">{point.value}</div>
              <div className="text-[11px] text-[#7B8AA3]">{point.label}</div>
            </motion.div>
          );
        })}
        <button
          onClick={onOpenConsultation}
          className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-4 py-3 text-xs font-bold text-[#0B1220] transition-colors hover:bg-[#60A5FA]"
        >
          Start a project
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  </section>
);

