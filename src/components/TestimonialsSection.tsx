import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Ttech SOLUTIONS took our whiteboard drawings and turned them into a rock-solid .NET Core SaaS platform that handled our enterprise pilot with zero hiccups. The architecture is absolutely future-proof.",
    name: "James Whitmore",
    role: "VP of Product",
    company: "SaaSFlow Global Corp",
    rating: 5,
    avatar: "JW",
    color: "from-cyan-500 to-blue-600",
  },
  {
    quote: "Our conversion rate more than tripled after switching to the architecture built by Ttech. Outstanding engineering discipline, crystal-clear communication, and on-time delivery. Best agency we've worked with.",
    name: "Sarah Chen",
    role: "Chief E-Commerce Officer",
    company: "Apex Retail Brands",
    rating: 5,
    avatar: "SC",
    color: "from-[#3B82F6] to-pink-600",
  },
  {
    quote: "Medical compliance is rigorous — Ttech SOLUTIONS proved their enterprise security credentials from Day 1. Sub-45ms WebSocket latency and 100% audit pass rate. Exceptional team.",
    name: "Dr. Marcus Reid",
    role: "Chief Medical Information Officer",
    company: "MediSync Health Alliance",
    rating: 5,
    avatar: "MR",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote: "The automated AI workflows transformed how our CFO prepares monthly board decks. 96.8% forecast accuracy and 180 hours saved monthly — the ROI was visible in the first 30 days.",
    name: "Priya Nair",
    role: "Managing Director",
    company: "FinPulse Analytics",
    rating: 5,
    avatar: "PN",
    color: "from-amber-500 to-orange-600",
  },
  {
    quote: "The UI is clean, intuitive, and modern. Our enterprise clients constantly compliment how snappy the application feels. The 140-component design system single-handedly 3x'd our dev team velocity.",
    name: "Tom Eriksson",
    role: "Head of Product Experience",
    company: "Nexus Global Logistics",
    rating: 5,
    avatar: "TE",
    color: "from-[#3B82F6] to-violet-600",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold mb-4">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>5-Star Client Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Global Leaders
            </span>
          </h2>
          <p className="text-[#7B8AA3] text-base sm:text-lg max-w-2xl mx-auto">
            Don't just take our word for it — hear from the enterprises and founders we've helped build their digital future.
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

                {/* Verified badge */}
                <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Client
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
                onClick={prev}
                className="p-2.5 rounded-xl bg-white border border-[#DCE8F8] text-[#7B8AA3] hover:text-[#0B1220] hover:border-[#60A5FA] transition-all cursor-pointer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
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

