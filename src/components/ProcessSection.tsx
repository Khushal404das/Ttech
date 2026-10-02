import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, PenTool, Code2, Rocket, HeadphonesIcon } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Discovery & Scoping',
    desc: 'Deep-dive consultation to map your goals, define architecture, and lock in milestones.',
    color: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Design & Prototype',
    desc: 'Pixel-perfect Figma wireframes, interactive prototypes, and design system creation.',
    color: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/20',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Engineering & Build',
    desc: 'Clean architecture, test-driven development, and sprint-based delivery with weekly updates.',
    color: 'from-indigo-500 to-purple-500',
    glow: 'shadow-indigo-500/20',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch & Deploy',
    desc: 'CI/CD pipeline, cloud infrastructure setup, performance auditing, and go-live support.',
    color: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/20',
  },
  {
    num: '05',
    icon: HeadphonesIcon,
    title: 'Ongoing Support',
    desc: 'Post-launch monitoring, feature iterations, scaling guidance, and 24/7 emergency coverage.',
    color: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/20',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden border-t border-slate-900/60 bg-[#030712]">
      {/* Top / bottom lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Rocket className="w-3.5 h-3.5 text-indigo-400" />
            <span>How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Our Proven{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Delivery Process
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Every project follows our battle-tested five-phase framework — built for zero surprises and maximum client confidence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-indigo-500/30 to-pink-500/40 hidden lg:block -translate-x-1/2" />

          <div className="space-y-10 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${isRight ? '' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  {/* Content card */}
                  <div className={`w-full lg:w-5/12 ${isRight ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div
                      className="group relative p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -4 }}
                    >
                      {/* Step number */}
                      <span className={`absolute -top-3.5 ${isRight ? 'left-6' : 'right-6'} text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                        {step.num}
                      </span>

                      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 shadow-lg ${step.glow} mb-4`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex w-2/12 items-center justify-center">
                    <motion.div
                      className={`relative w-5 h-5 rounded-full bg-gradient-to-br ${step.color} shadow-lg ${step.glow} z-10`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 + 0.3, type: 'spring' }}
                    >
                      <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/30" />
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="w-full lg:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
