import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { AnimatedBackground } from './AnimatedBackground';
import { ScrollExperience } from './ScrollExperience';
import { CookieConsentBanner } from './CookieConsentBanner';
import { Analytics } from './Analytics';
import type { ActivePage } from './Navbar';

// The chat widget pulls in Firebase + confetti (a large chunk). Load it after
// the page has painted so it doesn't slow down the first view on mobile.
const QuickChatFAB = lazy(() =>
  import('./QuickChatFAB').then((m) => ({ default: m.QuickChatFAB })),
);

function useIdleMount(delay = 1500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as any;
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: delay + 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

const PageFallback = () => <div className="min-h-[100svh]" aria-hidden="true" />;

/**
 * Persistent layout wrapper.
 * The Navbar lives here — outside <Routes> — so it NEVER unmounts
 * between navigations. This keeps the smooth indicator animation alive
 * when switching pages.
 */
export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showChat = useIdleMount();

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
    <div className="relative min-h-[100svh] bg-[#FBFAFF] text-[#4A4A63] flex flex-col font-sans">
      <ScrollExperience />
      {/* Decorative canvas background (desktop only) */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-[100svh]">
        {/* Single Navbar instance — never unmounts, indicator animates smoothly */}
        <Navbar
          activePage={activePage}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Page content swaps with a short fade */}
        <div data-page className="flex min-h-0 flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <Suspense fallback={<PageFallback />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>

        {showChat && (
          <Suspense fallback={null}>
            <QuickChatFAB
              onTransferToInquiry={(data) => navigate('/contact', { state: data })}
              onOpenEstimator={() => navigate('/services')}
            />
          </Suspense>
        )}

        {/* Global Analytics & Privacy Consent */}
        <Analytics />
        <CookieConsentBanner />
      </div>
    </div>
  );
};
