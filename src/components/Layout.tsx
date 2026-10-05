import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { AnimatedBackground } from './AnimatedBackground';
import { ScrollExperience } from './ScrollExperience';
import { QuickChatFAB } from './QuickChatFAB';
import { CookieConsentBanner } from './CookieConsentBanner';
import { Analytics } from './Analytics';
import type { ActivePage } from './Navbar';

/**
 * Persistent layout wrapper.
 * The Navbar lives here — outside <Routes> — so it NEVER unmounts
 * between navigations. This keeps the smooth indicator animation alive
 * when switching pages.
 */
export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive the active nav pill from the current URL
  const activePage: ActivePage = (() => {
    const p = location.pathname;
    if (p === '/services') return 'services';
    if (p === '/work')     return 'portfolio';
    if (p === '/contact')  return 'inquiry';
    return 'home';
  })();

  const handleOpenConsultation = () => {
    navigate('/contact');
  };

  return (
    <div className="relative min-h-screen bg-[#FBFAFF] text-[#4A4A63] flex flex-col font-sans">
      <ScrollExperience />
      {/* Single canvas background — persists across page transitions */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Single Navbar instance — never unmounts, indicator animates smoothly */}
        <Navbar
          activePage={activePage}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Page content swaps smoothly with clean fade & subtle slide animation */}
        <div data-page className="flex min-h-0 flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              onAnimationComplete={() => {
                if (!location.hash) {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                  const lenis = (window as any).__lenis;
                  if (lenis) {
                    lenis.scrollTo(0, { immediate: true, force: true });
                  }
                }
              }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        <QuickChatFAB
          onTransferToInquiry={(data) => navigate('/contact', { state: data })}
          onOpenEstimator={() => navigate('/services')}
        />

        {/* Global Analytics & Privacy Consent */}
        <Analytics />
        <CookieConsentBanner />
      </div>
    </div>
  );
};
