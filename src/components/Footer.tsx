import React from 'react';
import { Link } from 'react-router-dom';
import { TtechLogo } from './TtechLogo';
import {
  ArrowUp,
  Heart,
  Mail,
  MessageSquare,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  X,
} from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1528] text-[#A7B0C2] border-t border-[#1E293B] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-900/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <TtechLogo size="lg" showTagline={true} variant="dark" />
            </Link>
            <p className="text-xs text-[#A7B0C2] leading-relaxed max-w-sm mt-3">
              <strong>Ttech SOLUTIONS</strong> is an engineering-first software and digital design agency. We specialize in enterprise .NET Core architectures, high-velocity React web applications, conversion-driven SaaS platforms, and bespoke UI/UX design.
            </p>
            <div className="text-xs text-[#60A5FA] font-mono">
              &quot;Ideas to Intelligent Solutions&quot;
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="tel:+923489763998"
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-[#60A5FA] hover:border-[#60A5FA]/40 transition-colors flex items-center gap-2 text-xs font-mono font-medium"
                aria-label="Direct Phone Call: +92 348 9763998"
              >
                <Phone className="w-4 h-4 text-[#60A5FA]" />
                <span>+92 348 9763998</span>
              </a>
              <a
                href="https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-emerald-400 hover:border-emerald-500/40 transition-colors flex items-center gap-2 text-xs font-mono font-medium"
                aria-label="WhatsApp: +92 348 9763998"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:teatech.solutionz@gmail.com"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-[#60A5FA] hover:border-[#60A5FA]/50 transition-colors"
                aria-label="Email: teatech.solutionz@gmail.com"
              >
                <Mail className="w-4 h-4 text-[#60A5FA]" />
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <h5 className="text-[10px] font-bold text-[#D8DEE9] uppercase tracking-wider mb-2.5">
                Follow Us
              </h5>
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com/company/ttech-solutionz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61594013625946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ttechsolutionz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-[#E4405F] hover:border-[#E4405F]/30 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/TtechSolutionz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#D8DEE9] hover:text-white hover:border-white/30 transition-colors"
                  aria-label="Follow us on X (Twitter)"
                >
                  <X className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Agency Services Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                'Software Development (.NET)',
                'Web Applications & SAAS',
                'Website Development',
                'Full Stack Development',
                'AI Automation & Agents',
                'UI/UX Design & Figma to Web',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="hover:text-[#60A5FA] transition-colors no-underline text-[#A7B0C2]"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stacks */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">
              Technology Stack
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                '.NET 9 Core / C#',
                'React 19 & Next.js',
                'Entity Framework Core',
                'Node.js / Express / Python',
                'PHP 8 / Laravel 11',
                'Microsoft Azure & Docker',
              ].map((tech) => (
                <li key={tech}>
                  <Link
                    to="/services"
                    className="hover:text-[#60A5FA] transition-colors cursor-pointer font-mono no-underline text-[#A7B0C2]"
                  >
                    {tech}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">
              Client Tools &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs mb-4">
              <li>
                <Link to="/services" className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors font-medium no-underline">
                  Project Cost Estimator →
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-[#60A5FA] transition-colors no-underline text-[#A7B0C2]">
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#60A5FA] transition-colors no-underline text-[#A7B0C2]">
                  Process &amp; Pricing FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#60A5FA] transition-colors no-underline text-[#A7B0C2]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#60A5FA] transition-colors no-underline text-[#A7B0C2]">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-[#2563EB]/20 cursor-pointer"
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Ttech SOLUTIONS. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#60A5FA] font-medium">Think. Transform. Trust.</span>
            <span>·</span>
            <Link to="/privacy" className="hover:text-white transition-colors underline-offset-2 hover:underline">
              Privacy
            </Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors underline-offset-2 hover:underline">
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#A7B0C2]">
              Clean Code Architecture · On-Time Delivery · 24/7 Support
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#A7B0C2] hover:text-white hover:border-[#60A5FA] transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
