import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, PenTool, Code2, Rocket, HeadphonesIcon } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Discovery & Scoping',
    desc: 'Deep-dive consultation to map your goals, define architecture, and lock in milestones.',
    color: 'from-[#3B82F6] to-[#1D4ED8]',
    glow: 'shadow-[#2563EB]/20',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Design & Prototype',
    desc: 'Pixel-perfect Figma wireframes, interactive prototypes, and design system creation.',
    color: 'from-blue-500 to-[#1D4ED8]',
    glow: 'shadow-[#2563EB]/20',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Engineering & Build',
    desc: 'Clean architecture, test-driven development, and sprint-based delivery with weekly updates.',
    color: 'from-[#3B82F6] to-[#1D4ED8]',
    glow: 'shadow-[#2563EB]/20',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch & Deploy',
    desc: 'CI/CD pipeline, cloud infrastructure setup, performance auditing, and go-live support.',
    color: 'from-[#3B82F6] to-pink-500',
    glow: 'shadow-[#2563EB]/20',
  },
  {
    num: '05',
    icon: HeadphonesIcon,
    title: 'Ongoing Support',
    desc: 'Post-launch monitoring, feature iterations, scaling guidance, and 24/7 emergency coverage.',
    color: 'from-[#3B82F6] to-[#1D4ED8]',
    glow: 'shadow-[#2563EB]/20',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden border-t border-[#DCE8F8]/60 bg-[#F8FBFF]">
      {/* Top / bottom lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DCE8F8] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#DCE8F8] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold mb-4">
            <Rocket className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-4">
            Our Proven{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
              Delivery Process
            </span>
          </h2>
          <p className="text-[#7B8AA3] text-base sm:text-lg leading-relaxed">
            Every project follows our battle-tested five-phase framework — built for zero surprises and maximum client confidence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6]/40 via-[#2563EB]/30 to-[#1D4ED8]/40 hidden lg:block -translate-x-1/2" />

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
                      className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE8F8] hover:border-[#60A5FA]  transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -4 }}
                    >
                      {/* Step number */}
                      <span className={`absolute -top-3.5 ${isRight ? 'left-6' : 'right-6'} text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                        {step.num}
                      </span>

                      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 shadow-lg ${step.glow} mb-4`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0B1220] font-display mb-2 group-hover:text-[#2563EB] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[#7B8AA3] text-sm leading-relaxed">{step.desc}</p>
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
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#2563EB]/30" />
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


