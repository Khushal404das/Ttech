import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  onExploreStack: () => void;
}

const TYPEWRITER_WORDS = [
  'Enterprise .NET Systems',
  'SaaS Platforms',
  'AI Automation',
  'Full-Stack Apps',
  'E-Commerce Stores',
  'UI/UX Masterpieces',
];

const FLOATING_BADGES = [
  { icon: Code2, label: '.NET 9 Core', color: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30', x: '-left-4 sm:-left-16', y: 'top-20', delay: 0 },
  { icon: Shield, label: 'HIPAA / SOC2', color: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/30', x: '-right-4 sm:-right-16', y: 'top-28', delay: 0.3 },
  { icon: Zap, label: 'Gemini AI', color: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/30', x: '-left-4 sm:-left-20', y: 'bottom-32', delay: 0.6 },
  { icon: Globe, label: '99.9% Uptime', color: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-500/30', x: '-right-4 sm:-right-20', y: 'bottom-24', delay: 0.9 },
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else if (deleting) {
      timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), speed / 2);
    } else {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words, speed, pause]);

  return displayed;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onOpenEstimator,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const word = useTypewriter(TYPEWRITER_WORDS);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-slate-800/60 bg-[#030712] min-h-screen flex items-center"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-circuit-grid opacity-40" />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Animated orbs */}
      <motion.div
        className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute right-0 top-1/3 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8 pt-32 pb-24"
        style={{ y, opacity }}
      >
        {/* Top badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          Think. Transform. Trust. — Ttech Solutions
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="mx-auto max-w-5xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-8xl mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          We Build{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {word}
              <motion.span
                className="inline-block w-0.5 h-[0.85em] bg-cyan-400 ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </span>
          <br />
          <span className="text-slate-200">That Scale.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg sm:leading-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          From concept to cloud deployment — we engineer reliable, high-performance software, SaaS platforms, and digital experiences for ambitious businesses worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <motion.button
            onClick={onOpenConsultation}
            className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-cyan-500/30 sm:w-auto"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">Start Your Project</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            onClick={onOpenEstimator}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-700/80 bg-slate-900/60 px-8 py-4 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-slate-800/80 hover:text-white sm:w-auto"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Estimate Project Cost
          </motion.button>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-3 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            'Clear scope & milestones',
            'Pixel-perfect interfaces',
            'Production-grade code',
            'On-time delivery guarantee',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/50 border border-slate-800/70 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              {item}
            </div>
          ))}
        </motion.div>

        {/* Floating tech badges */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ height: '220px' }}>
            {FLOATING_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  className={`absolute ${badge.x} ${badge.y}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.7 + badge.delay },
                    scale: { duration: 0.5, delay: 0.7 + badge.delay },
                    y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
                  }}
                >
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br ${badge.color} border ${badge.border} backdrop-blur-md`}>
                    <Icon className="w-3.5 h-3.5 text-slate-200" />
                    <span className="text-[11px] font-semibold text-slate-200 whitespace-nowrap">{badge.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll to explore</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
            animate={{}}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-cyan-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
