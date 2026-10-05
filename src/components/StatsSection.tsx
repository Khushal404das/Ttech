import React from 'react';
import { motion } from 'motion/react';
import { SpotlightCard } from './ui/SpotlightCard';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { InteractiveBento } from './ui/InteractiveBento';
import { ShimmerBadge } from './ui/ShimmerBadge';
import { Activity, ShieldCheck, Zap, Award } from 'lucide-react';

interface Stat {
  value: number;
  decimals?: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: any;
}

const stats: Stat[] = [
  { value: 50, suffix: 'ms', prefix: '<', label: 'API Target Latency', sublabel: 'High-throughput architecture', icon: Activity },
  { value: 99.99, decimals: 2, suffix: '%', label: 'Target Uptime SLA', sublabel: 'Resilient cloud infrastructure', icon: Zap },
  { value: 100, suffix: '%', label: 'Client IP Ownership', sublabel: 'Full repository & code transfer', icon: ShieldCheck },
  { value: 30, suffix: ' Days', label: 'Post-Launch Warranty', sublabel: 'Complimentary bug resolution', icon: Award },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden border-t border-[#DCE8F8] bg-[#F8FBFF]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3 inline-block">
            <ShimmerBadge>Engineering Excellence</ShimmerBadge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#0B1220] tracking-tight mb-4">
            Built for Extreme Speed &amp; Complete Transparency
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Every software product we deliver is backed by production SLAs, high-concurrency benchmarks, and full intellectual property ownership.
          </p>
        </div>

        {/* Top 4 Metrics Spotlight Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <SpotlightCard
                key={stat.label}
                className="p-6 text-center group flex flex-col justify-between"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent mb-2">
                  <AnimatedCounter
                    to={stat.value}
                    decimals={stat.decimals || 0}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    duration={1600 + i * 200}
                  />
                </div>
                <div className="text-sm font-bold text-[#0B1220] mb-1">{stat.label}</div>
                <div className="text-xs text-[#7B8AA3]">{stat.sublabel}</div>
              </SpotlightCard>
            );
          })}
        </motion.div>

        {/* Interactive Bento Grid (Aceternity UI / Magic UI style) */}
        <div className="mt-8">
          <InteractiveBento />
        </div>
      </div>
    </section>
  );
};
