import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  onExploreStack: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onOpenEstimator,
}) => (
  <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#030712] pt-36 pb-24 sm:pt-44 sm:pb-32">
    <div className="absolute inset-0 bg-radial-glow opacity-60" />
    <motion.div
      className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
      animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />

    <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 }}
      >
        <motion.p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400"
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
        >
          Ttech Solutions
        </motion.p>
        <motion.h1
          className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          Digital products that make your business{' '}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            easier to run.
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
        >
          We design and build reliable websites, software, and SaaS products for teams that want to move with confidence.
        </motion.p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.button
            onClick={onOpenConsultation}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300 sm:w-auto"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
          <motion.button
            onClick={onOpenEstimator}
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a project estimate
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 grid max-w-3xl gap-3 border-t border-slate-800/80 pt-6 text-left sm:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.2 }}
      >
        {['Clear scope and milestones', 'Thoughtful, accessible interfaces', 'Reliable production code'].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
