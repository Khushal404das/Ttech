import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TtechLogo } from './TtechLogo';
import { Menu, X, ArrowRight, House, Briefcase, Code2, Mail } from 'lucide-react';

// Which nav item is active — driven by the current page
export type ActivePage = 'home' | 'services' | 'portfolio' | 'inquiry' | 'privacy' | 'terms';

interface NavbarProps {
  activePage: ActivePage;
  onOpenConsultation?: () => void;
}

const NAV_LINKS: { id: ActivePage; label: string; icon: React.ComponentType<{ className?: string }>; to: string }[] = [
  { id: 'home',      label: 'Home',     icon: House,     to: '/'        },
  { id: 'services',  label: 'Services', icon: Briefcase, to: '/services' },
  { id: 'portfolio', label: 'Work',     icon: Code2,     to: '/work'     },
  { id: 'inquiry',   label: 'Contact',  icon: Mail,      to: '/contact'  },
];

export const Navbar: React.FC<NavbarProps> = ({ activePage, onOpenConsultation }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };

  const openConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      navigate('/contact');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1528]/95 backdrop-blur-xl border-b border-[#1E293B] shadow-[0_4px_25px_rgba(0,0,0,0.35)] py-2.5 sm:py-3'
          : 'bg-[#0B1528] border-b border-[#1E293B]/70 shadow-[0_4px_20px_rgba(0,0,0,0.25)] py-3 sm:py-3.5'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD]"
        style={{ scaleX: scrollProgress / 100 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo — always navigates to / */}
          <div onClick={handleLogoClick} className="cursor-pointer transition-transform hover:scale-[1.02] shrink-0">
            <TtechLogo size="md" showTagline={true} variant="dark" />
          </div>

          {/* Desktop nav with pixel-perfect Framer Motion gliding pill */}
          <nav
            className="hidden lg:flex items-center p-1 bg-[#131D33] rounded-full border border-[#223354] shadow-inner relative"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.id;
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  className={`relative flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer z-10 transition-colors duration-200 no-underline select-none ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {/* Sliding active pill with spring physics */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[#2563EB] shadow-[0_2px_10px_rgba(37,99,235,0.45)] -z-10"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 transition-opacity ${isActive ? 'opacity-100 text-white' : 'opacity-70 text-slate-300'}`} />
                  <span className="leading-none">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              onClick={openConsultation}
              className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_8px_20px_rgba(37,99,235,.4)] hover:shadow-[0_10px_25px_rgba(37,99,235,.55)] transition-all cursor-pointer overflow-hidden border border-blue-400/20"
            >
              <span className="relative z-10 text-white">Let&apos;s Build Together</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform text-white" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={openConsultation}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#2563EB] text-white cursor-pointer shadow-sm"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#131D33] border border-[#223354] text-white hover:bg-[#1E2D4A] cursor-pointer shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-3 px-4 pt-2 pb-5 bg-[#0B1528]/98 backdrop-blur-2xl border-b border-[#223354] shadow-2xl"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {NAV_LINKS.map((link) => {
                const isActive = activePage === link.id;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.id}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-colors no-underline ${
                      isActive
                        ? 'bg-[#2563EB] text-white border border-blue-400 font-semibold'
                        : 'bg-[#131D33] text-white hover:bg-[#1E2D4A] border border-[#223354]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-white">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#223354]">
              <button
                type="button"
                onClick={openConsultation}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white text-xs font-bold shadow-[0_8px_20px_rgba(37,99,235,.35)] cursor-pointer"
              >
                <span className="text-white">Ready to Build? Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-[#A7B0C2]">
                <Link
                  to="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link
                  to="/terms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
