import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { ShimmerBadge } from './ui/ShimmerBadge';

interface CTASectionProps {
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenConsultation, onOpenEstimator }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dark banner background — single intentional dark section */}
      <div className="absolute inset-0 bg-[#0A0D1A]" />
      {/* Blue glow on right per spec */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <ShimmerBadge icon={<Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />}>
              Sprint Availability: Booking Q4 2026
            </ShimmerBadge>
          </div>

          {/* Headline — white on dark */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-6 leading-[1.08]">
            Ready to Turn Your Idea{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent animate-gradient-shift">
              Into a Reality?
            </span>
          </h2>

          <p className="text-[#9AA3B8] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Partner with Ttech SOLUTIONS to architect, engineer, and deploy your next digital product.
            Schedule a free technical architecture consultation with zero obligations.
          </p>

          {/* Social proof strips */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {[
              { icon: Clock, text: 'Free 30-min consultation' },
              { icon: MessageSquare, text: 'Response within 2 hours' },
              { icon: Sparkles, text: 'No-commitment proposal' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-[#9AA3B8]">
                <Icon className="w-4 h-4 text-[#60A5FA]" />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs with Magnetic Physics */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] px-8 py-4 text-base font-bold text-white shadow-2xl shadow-[#2563EB]/30 w-full sm:w-auto justify-center cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton
              onClick={onOpenEstimator}
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/15 hover:border-white/30 transition-all w-full sm:w-auto justify-center cursor-pointer"
            >
              Calculate Project Cost
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
