import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Zap,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Lock,
  GitBranch,
  Terminal,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { AnimatedCounter } from './AnimatedCounter';

/**
 * InteractiveBento inspired by Aceternity UI & Magic UI
 * Live interactive widgets demonstrating enterprise SLA, sub-50ms speed, and agile velocity.
 */
export const InteractiveBento: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latency' | 'sprint' | 'security'>('latency');
  const [pingCount, setPingCount] = useState(42);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(220px,auto)]">
      {/* 1. Large Card: Sub-50ms API Telemetry & Uptime */}
      <SpotlightCard className="md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2563EB]">
                Real-Time Performance
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-2">
            Sub-50ms API Response &amp; <AnimatedCounter to={99.99} decimals={2} suffix="%" /> Uptime
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Engineered with ASP.NET Core 9 Minimal APIs, Redis distributed caching, and Azure Container Apps for instantaneous throughput.
          </p>
        </div>

        {/* Interactive Latency Visualizer */}
        <div className="mt-6 pt-4 border-t border-[#DCE8F8]">
          <div className="flex items-center justify-between text-xs font-mono text-[#7B8AA3] mb-2">
            <span>Global Edge CDN</span>
            <span className="text-emerald-600 font-bold">{pingCount}ms Latency</span>
          </div>
          <div className="h-2 w-full bg-[#F1F7FF] rounded-full overflow-hidden flex gap-1">
            <motion.div
              className="h-full bg-[#2563EB] rounded-full"
              animate={{ width: ['35%', '45%', '38%', '42%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="h-full bg-emerald-400 rounded-full"
              animate={{ width: ['55%', '45%', '52%', '48%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </SpotlightCard>

      {/* 2. 2-Week Agile Sprint Velocity Card */}
      <SpotlightCard className="p-6 flex flex-col justify-between">
        <div>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#0B1220] font-display mb-1">
            2-Week Sprints
          </h3>
          <p className="text-xs text-[#475569] leading-relaxed mb-4">
            Live working staging demos every alternate Friday. Zero black-box delays.
          </p>
        </div>

        <div className="space-y-2 text-[11px] font-mono">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FBFF] border border-[#DCE8F8]">
            <span className="text-[#475569]">Sprint 1 (Architecture)</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#EAF2FF] border border-blue-200 text-[#2563EB] font-bold">
            <span>Sprint 2 (Core Build)</span>
            <span className="animate-pulse">In Progress</span>
          </div>
        </div>
      </SpotlightCard>

      {/* 3. 100% IP & Code Ownership Card */}
      <SpotlightCard className="p-6 flex flex-col justify-between">
        <div>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#0B1220] font-display mb-1">
            100% IP Ownership
          </h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Full repository and intellectual property transfer on milestone settlement. No lock-in.
          </p>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-[#F8FBFF] border border-[#DCE8F8] flex items-center gap-2 text-xs font-mono text-[#0B1220]">
          <GitBranch className="w-4 h-4 text-[#2563EB]" />
          <span>github.com/your-org</span>
        </div>
      </SpotlightCard>

      {/* 4. Dual Stack Benchmarks (.NET 9 + React 19) */}
      <SpotlightCard className="md:col-span-3 lg:col-span-4 p-6 bg-gradient-to-r from-white via-[#F8FBFF] to-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0B1220] font-display">
                Engineered for 100,000+ Concurrent Users
              </h4>
              <p className="text-xs text-[#475569]">
                Full-stack synergy: React 19 Client SPA + ASP.NET Core 9 Microservices + PostgreSQL
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EAF2FF] border border-blue-200 text-[#2563EB] text-xs font-mono font-semibold">
              C# Minimal APIs
            </span>
            <span className="px-3 py-1 rounded-full bg-[#EAF2FF] border border-blue-200 text-[#2563EB] text-xs font-mono font-semibold">
              React 19 Hooks
            </span>
            <span className="px-3 py-1 rounded-full bg-[#EAF2FF] border border-blue-200 text-[#2563EB] text-xs font-mono font-semibold">
              Docker / Azure
            </span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
