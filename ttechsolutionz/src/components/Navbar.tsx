import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TtechLogo } from './TtechLogo';
import { Menu, X, ArrowRight, House, Layers } from 'lucide-react';

// Which nav item is active — driven by the current page
export type ActivePage = 'home' | 'services' | 'portfolio' | 'inquiry';

interface NavbarProps {
  activePage: ActivePage;
  onOpenConsultation?: () => void;
}

const NAV_LINKS: { id: ActivePage; label: string; icon: React.ComponentType<{ className?: string }>; to: string }[] = [
  { id: 'home',      label: 'Home',    icon: House,  to: '/'        },
  { id: 'services',  label: 'Services',icon: Layers, to: '/services' },
  { id: 'portfolio', label: 'Work',    icon: Layers, to: '/work'     },
  { id: 'inquiry',   label: 'Contact', icon: Layers, to: '/contact'  },
];

export const Navbar: React.FC<NavbarProps> = ({ activePage, onOpenConsultation }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Indicator refs
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Move indicator when active page changes or on first render
  useLayoutEffect(() => {
    const activeEl = buttonRefs.current[activePage];
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!activeEl || !nav || !indicator) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeEl.getBoundingClientRect();
    const translateX = btnRect.left - navRect.left;
    const width = btnRect.width;

    if (isFirstRender.current) {
      indicator.style.transition = 'none';
      indicator.style.transform = `translateX(${translateX}px)`;
      indicator.style.width = `${width}px`;
      void indicator.offsetHeight; // force reflow
      indicator.style.transition = 'transform 0.22s cubic-bezier(0.35, 0, 0.25, 1), width 0.22s cubic-bezier(0.35, 0, 0.25, 1)';
      isFirstRender.current = false;
    } else {
      indicator.style.transform = `translateX(${translateX}px)`;
      indicator.style.width = `${width}px`;
    }
  }, [activePage]);

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
          ? 'bg-[#0B1528]/95 backdrop-blur-xl border-b border-[#1E293B] shadow-[0_4px_25px_rgba(0,0,0,0.35)] py-3'
          : 'bg-[#0B1528] border-b border-[#1E293B]/70 shadow-[0_4px_20px_rgba(0,0,0,0.25)] py-3.5 sm:py-4'
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
          <div onClick={handleLogoClick} className="cursor-pointer transition-transform hover:scale-[1.02]">
            <TtechLogo size="md" showTagline={true} variant="dark" />
          </div>

          {/* Desktop nav with single persistent indicator */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-1 bg-[#131D33] px-3 py-1.5 rounded-full border border-[#223354] shadow-inner relative"
          >
            {/* Single persistent indicator — slides via CSS transform, never unmounts */}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute top-1.5 left-3 h-[calc(100%-12px)] rounded-full bg-[#2563EB] shadow-md shadow-blue-500/25 pointer-events-none"
              style={{ transform: 'translateX(0px)', width: '0px', zIndex: 0 }}
            />

            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.id;
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  ref={(el) => { buttonRefs.current[link.id] = el; }}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer z-10 transition-colors duration-150 no-underline ${
                    isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-white opacity-90" />
                  <span className="text-white">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-2.5">
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
          <div className="flex sm:hidden items-center gap-1.5">
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
                onClick={openConsultation}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white text-xs font-bold shadow-[0_8px_20px_rgba(37,99,235,.35)]"
              >
                <span className="text-white">Ready to Build? Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
