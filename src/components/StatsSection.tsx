import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Projects Shipped', sublabel: 'Across 18 countries' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', sublabel: 'Enterprise reliability' },
  { value: 4.9, suffix: '★', label: 'Client Rating', sublabel: 'Average satisfaction' },
  { value: 48, suffix: 'h', label: 'Avg. Response', sublabel: 'First prototype delivered' },
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
    <section className="relative py-20 overflow-hidden border-t border-[#DCE8F8] bg-[#F1F7FF]">
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
              className="relative group text-center p-6 rounded-3xl bg-white border border-[#DCE8F8] shadow-[0_10px_30px_rgba(37,99,235,.10)] hover:border-[#2563EB]/50 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1.8 + i * 0.2} />
              </div>
              <div className="text-sm font-bold text-[#0B1220] mb-1">{stat.label}</div>
              <div className="text-xs text-[#7B8AA3]">{stat.sublabel}</div>

              {/* Bottom shine line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
