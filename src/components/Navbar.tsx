import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { TtechLogo } from './TtechLogo';
import { BookCallButton } from './BookCallButton';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close the drawer whenever the page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // While the drawer is open: lock page scroll, close on Escape, manage focus
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (window as any).__lenis?.stop?.();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 50);
    // Close if the screen becomes wide enough for the desktop nav
    const mq = window.matchMedia('(min-width: 1024px)');
    const onWide = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', onWide);
    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      (window as any).__lenis?.start?.();
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
      clearTimeout(focusTimer);
      menuButton?.focus();
    };
  }, [mobileMenuOpen]);
  // Progress bar is driven by a motion value, so scrolling no longer
  // re-renders the whole header on every scroll event.
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0B1528] border-b transition-[box-shadow,border-color] duration-300 py-3 sm:py-3.5 ${
        isScrolled
          ? 'border-[#1E293B] shadow-[0_4px_25px_rgba(0,0,0,0.35)]'
          : 'border-[#1E293B]/70 shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD]"
        style={{ scaleX: scrollYProgress }}
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
            <BookCallButton variant="compact" label="Book a free call" />
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
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-[#131D33] border border-[#223354] text-white hover:bg-[#1E2D4A] cursor-pointer shadow-sm"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile side drawer (rendered on <body> so nothing can sit on top of it) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Site menu">
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-[#020617]/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Panel */}
                <motion.nav
                  className="absolute right-0 top-0 flex h-full w-[82%] max-w-[320px] flex-col bg-[#0B1528] border-l border-[#223354] shadow-2xl"
                  style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Drawer header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#223354]">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A7B0C2]">Menu</span>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-xl bg-[#131D33] border border-[#223354] text-white hover:bg-[#1E2D4A] cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Links — one column */}
                  <ul className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {NAV_LINKS.map((link) => {
                      const isActive = activePage === link.id;
                      const Icon = link.icon;
                      return (
                        <li key={link.id}>
                          <Link
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold no-underline transition-colors ${
                              isActive
                                ? 'bg-[#2563EB] text-white'
                                : 'text-[#D8DEE9] hover:bg-[#131D33] hover:text-white'
                            }`}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Bottom: CTA + legal */}
                  <div className="px-4 pt-4 pb-5 border-t border-[#223354] space-y-3">
                    <BookCallButton
                      variant="dark"
                      className="w-full !py-3"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    <button
                      type="button"
                      onClick={openConsultation}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white text-sm font-bold shadow-[0_8px_20px_rgba(37,99,235,.35)] cursor-pointer"
                    >
                      <span>Ready to Build? Let&apos;s Talk</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="flex items-center justify-center gap-3 text-xs text-[#A7B0C2]">
                      <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                      <span aria-hidden="true">·</span>
                      <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">
                        Terms &amp; Conditions
                      </Link>
                    </div>
                  </div>
                </motion.nav>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
};
