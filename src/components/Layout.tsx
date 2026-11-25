import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PageErrorBoundary } from './PageErrorBoundary';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { AnimatedBackground } from './AnimatedBackground';
import { ScrollExperience } from './ScrollExperience';
import { CookieConsentBanner } from './CookieConsentBanner';
import { Analytics } from './Analytics';
import type { ActivePage } from './Navbar';

// The chat widget pulls in Firebase + confetti (a large chunk). Load it after
// the page has painted so it doesn't slow down the first view on mobile.
const QuickChatFAB = lazyWithRetry(() =>
  import('./QuickChatFAB').then((m) => ({ default: m.QuickChatFAB })),
);

/** The chat widget is optional: if it fails to load, just don't show it. */
class ChatBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

        {/*
          Page content. The new page fades in with plain CSS. We deliberately
          do NOT wait for an exit animation of the old page: when that
          animation stalled (e.g. in a throttled background tab) the new page
          never mounted and visitors saw a blank screen until they refreshed.
        */}
        <div data-page className="flex min-h-0 flex-1 flex-col">
          <div key={location.pathname} className="page-enter flex min-h-0 flex-1 flex-col">
            <PageErrorBoundary resetKey={location.pathname}>
              <Suspense fallback={<PageFallback />}>
                <Outlet />
              </Suspense>
            </PageErrorBoundary>
          </div>
        </div>

        {showChat && (
          <ChatBoundary>
            <Suspense fallback={null}>
              <QuickChatFAB
                onTransferToInquiry={(data) => navigate('/contact', { state: data })}
                onOpenEstimator={() => navigate('/services')}
              />
            </Suspense>
          </ChatBoundary>
        )}

        {/* Global Analytics & Privacy Consent */}
        <Analytics />
        <CookieConsentBanner />
      </div>
    </div>
  );
};
