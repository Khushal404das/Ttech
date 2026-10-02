import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Clock, MessageSquare } from 'lucide-react';

interface CTASectionProps {
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenConsultation, onOpenEstimator }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Animated orbs */}
      <motion.div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Floating dots grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-20" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-8">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Limited slots available — Q4 2026
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-6 leading-[1.08]">
            Ready to Turn Your Idea{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift">
              Into a Reality?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 120+ businesses that chose Ttech Solutions to build their digital products. 
            Get a free technical consultation — no obligations, no fluff.
          </p>

          {/* Social proof strips */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {[
              { icon: Clock, text: 'Free 30-min consultation' },
              { icon: MessageSquare, text: 'Response within 2 hours' },
              { icon: Sparkles, text: 'No-commitment proposal' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
                <Icon className="w-4 h-4 text-cyan-400" />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-cyan-500/30 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">Book Free Consultation</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={onOpenEstimator}
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-all w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Calculate Project Cost
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
