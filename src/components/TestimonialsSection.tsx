import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// TODO: Replace sample client testimonials with verified quotes and authorized client logos upon project launch
const testimonials = [
  {
    quote: "Ttech SOLUTIONS took our whiteboard drawings and turned them into a rock-solid .NET Core SaaS platform that handled our enterprise pilot with zero hiccups. The architecture is future-proof and clean.",
    name: "Enterprise SaaS Partner",
    role: "VP of Product",
    company: "B2B Cloud Analytics",
    rating: 5,
    avatar: "SA",
    color: "from-sky-500 to-blue-600",
  },
  {
    quote: "Our checkout conversion rate significantly increased after switching to the high-velocity React and .NET Core inventory API built by Ttech. Outstanding engineering discipline and on-time delivery.",
    name: "E-Commerce Director",
    role: "Head of Digital Commerce",
    company: "Retail Technology Brands",
    rating: 5,
    avatar: "EC",
    color: "from-[#2563EB] to-[#1E40AF]",
  },
  {
    quote: "Medical data compliance is rigorous. Ttech SOLUTIONS proved their enterprise security credentials from Day 1 with encrypted SignalR WebSocket streams and complete audit log pass rates.",
    name: "HealthTech Architect",
    role: "Chief Medical Information Officer",
    company: "MediSync Telemetry Alliance",
    rating: 5,
    avatar: "HT",
    color: "from-emerald-500 to-teal-700",
  },
  {
    quote: "The automated AI workflows transformed how our team prepares executive reporting. High forecast accuracy and significant time saved monthly, with direct ROI visible within the first sprint.",
    name: "FinTech Managing Director",
    role: "Managing Director",
    company: "Financial Intelligence Labs",
    rating: 5,
    avatar: "FT",
    color: "from-blue-600 to-indigo-700",
  },
  {
    quote: "The UI design system is clean, intuitive, and modern. The modular component architecture accelerated our internal engineering velocity while providing a responsive user experience.",
    name: "Logistics Product Lead",
    role: "Head of Product Experience",
    company: "Supply Chain Solutions",
    rating: 5,
    avatar: "LG",
    color: "from-cyan-600 to-blue-700",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [isAuto]);

  const prev = () => {
    setIsAuto(false);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setIsAuto(false);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden border-t border-[#DCE8F8]/60 bg-[#F8FBFF]">
      <div className="absolute inset-0 bg-[#F1F7FF] opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold mb-4">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Client Feedback &amp; Project Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-4">
            Proven Results for{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              Ambitious Businesses
            </span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg max-w-2xl mx-auto">
            Review delivery outcomes and architectural feedback from engineering leaders and founders we have partnered with.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="relative rounded-3xl p-8 sm:p-12 bg-white border border-[#DCE8F8]  overflow-hidden"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Background gradient accent */}
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${t.color} opacity-5 blur-3xl pointer-events-none`} />

              {/* Quote icon */}
              <Quote className="w-10 h-10 text-[#2563EB]/30 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-[#475569] text-base sm:text-lg leading-relaxed italic mb-8 max-w-3xl">
                "{t.quote}"
              </p>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[#0B1220] font-bold text-sm">{t.name}</div>
                  <div className="text-[#7B8AA3] text-xs">{t.role}, {t.company}</div>
                </div>

                {/* Feedback badge */}
                <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1E40AF] text-xs font-semibold">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Project Delivery Review
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setIsAuto(false); setCurrent(i); }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === current
                      ? 'w-8 h-2 bg-[#2563EB]'
                      : 'w-2 h-2 bg-[#DCE8F8] hover:bg-[#60A5FA]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next */}
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={prev}
                className="p-2.5 rounded-xl bg-white border border-[#DCE8F8] text-[#7B8AA3] hover:text-[#0B1220] hover:border-[#60A5FA] transition-all cursor-pointer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={next}
                className="p-2.5 rounded-xl bg-white border border-[#DCE8F8] text-[#7B8AA3] hover:text-[#0B1220] hover:border-[#60A5FA] transition-all cursor-pointer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

