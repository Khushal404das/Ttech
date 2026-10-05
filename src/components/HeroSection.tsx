import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Code2, Sparkles, Cpu } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { ShimmerBadge } from './ui/ShimmerBadge';
import { SpotlightCard } from './ui/SpotlightCard';
import { SkyCloudsBackground } from './SkyCloudsBackground';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  onExploreStack?: () => void;
}

const TYPEWRITER_WORDS = [
  'Enterprise .NET Systems',
  'SaaS Platforms',
  'AI Automation & Agents',
  'Full-Stack Web Apps',
  'E-Commerce Engines',
  'UI/UX Masterpieces',
];

const FLOATING_BADGES = [
  { icon: Code2, label: '.NET 9 Core Clean Architecture', x: '-left-4 sm:-left-16', y: 'top-20', delay: 0 },
  { icon: Shield, label: 'HIPAA & OWASP Compliant', x: '-right-4 sm:-right-16', y: 'top-28', delay: 0.3 },
  { icon: Sparkles, label: 'Gemini 2.5 Flash AI', x: '-left-4 sm:-left-20', y: 'bottom-32', delay: 0.6 },
  { icon: Globe, label: '99.99% Edge Uptime', x: '-right-4 sm:-right-20', y: 'bottom-24', delay: 0.9 },
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
  const pointerX = useSpring(useMotionValue(50), { stiffness: 120, damping: 24 });
  const pointerY = useSpring(useMotionValue(30), { stiffness: 120, damping: 24 });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${pointerX}% ${pointerY}%, rgba(96, 165, 250, 0.18), transparent 70%)`;
  const word = useTypewriter(TYPEWRITER_WORDS);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-[#DCE8F8] bg-[#F8FBFF] min-h-screen flex items-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(50);
        pointerY.set(30);
      }}
    >
      {/* Animated Sky and Floating Clouds Background with Drifting Cloud Layers & Parallax */}
      <SkyCloudsBackground />

      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} aria-hidden="true" />
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8 pt-32 pb-24"
        style={{ y, opacity }}
      >
        {/* Shimmer badge pill (Magic UI / 21st.dev style) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <ShimmerBadge icon={<Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />}>
            Think. Transform. Trust. · Ttech Solutions
          </ShimmerBadge>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="mx-auto max-w-5xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.04em] text-[#0B1220] sm:text-6xl lg:text-7xl xl:text-8xl mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          We Build{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              {word}
              <motion.span
                className="inline-block w-0.5 h-[0.85em] bg-[#2563EB] ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </span>
          <br />
          <span className="text-[#0B1220]">That Scale.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#475569] sm:text-lg sm:leading-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          From concept to cloud deployment, we engineer reliable enterprise software, custom SaaS platforms, and modern web applications with guaranteed sprint velocity.
        </motion.p>

        {/* Magnetic Interactive CTA Buttons (React Bits / 21st.dev style) */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <MagneticButton
            onClick={onOpenConsultation}
            className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,.35)] hover:shadow-[0_12px_28px_rgba(37,99,235,.45)] sm:w-auto cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">Start Your Project</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <MagneticButton
            onClick={onOpenEstimator}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#DCE8F8] bg-white px-8 py-4 text-sm font-semibold text-[#0B1220] shadow-sm transition-all hover:border-[#2563EB] hover:bg-[#F1F7FF] sm:w-auto cursor-pointer"
          >
            <span>Estimate Project Cost</span>
          </MagneticButton>
        </motion.div>

        {/* Live Delivery Signal Bar */}
        <motion.div
          className="mx-auto mt-12 hidden max-w-3xl items-center justify-between gap-6 rounded-2xl border border-[#DCE8F8] bg-white/90 px-5 py-4 text-left shadow-[0_16px_40px_rgba(37,99,235,.08)] backdrop-blur-md sm:flex"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2563EB]">
              <span className="absolute inset-1 animate-ping rounded-lg bg-[#93C5FD]/40" />
              <Zap className="relative h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B8AA3]">Delivery Signal</p>
              <p className="mt-0.5 text-sm font-bold text-[#0B1220]">2-Week Agile Sprints with Bi-Weekly Live Demos</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#2563EB] font-mono">
            <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
            Discovery → Design → Deploy
          </div>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            'Strict zero hidden fees',
            'Pixel-perfect Figma designs',
            '100% Client IP transfer',
            '30-Day post-launch warranty',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-1.5 text-xs font-medium text-[#475569] bg-white border border-[#DCE8F8] rounded-full px-3.5 py-1.5 shadow-xs hover:border-blue-300 transition-colors"
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2563EB]" />
              {item}
            </div>
          ))}
        </motion.div>

        {/* Floating Interactive 3D Badges */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ height: '220px' }}>
            {FLOATING_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  className={`absolute ${badge.x} ${badge.y} pointer-events-auto`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.7 + badge.delay },
                    scale: { duration: 0.5, delay: 0.7 + badge.delay },
                    y: { duration: 4.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 border border-[#DCE8F8] shadow-[0_10px_30px_rgba(37,99,235,.12)] backdrop-blur-sm transition-all hover:border-blue-400">
                    <Icon className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-[11px] font-semibold text-[#0B1220] whitespace-nowrap">{badge.label}</span>
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
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#7B8AA3]">Scroll to explore</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-[#DCE8F8] bg-white flex items-start justify-center pt-1.5 shadow-xs"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-[#2563EB]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
