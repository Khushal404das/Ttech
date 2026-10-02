import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  color: string;
}

const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Projects Shipped', sublabel: 'Across 18 countries', color: 'from-cyan-400 to-blue-500' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', sublabel: 'Enterprise reliability', color: 'from-emerald-400 to-teal-500' },
  { value: 4.9, suffix: '★', label: 'Client Rating', sublabel: 'Average satisfaction', color: 'from-amber-400 to-orange-500' },
  { value: 48, suffix: 'h', label: 'Avg. Response', sublabel: 'First prototype delivered', color: 'from-purple-400 to-pink-500' },
];

function AnimatedCounter({ value, suffix, prefix, duration = 2 }: { value: number; suffix: string; prefix?: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const start = 0;
    const end = value;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((start + (end - start) * eased).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{current}{suffix}
    </span>
  );
}

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden border-t border-slate-900/60">
      {/* Background beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#040B1A] to-slate-950" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, staggerChildren: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative group text-center p-6 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Glow blob on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.color} blur-3xl`} style={{ opacity: 0 }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent rounded-3xl" />

              <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1.8 + i * 0.2} />
              </div>
              <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.sublabel}</div>

              {/* Bottom shine line */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-500 bg-gradient-to-r ${stat.color}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
