import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'ttech_cookie_consent_status';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show after a brief delay for optimal page load UX
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {}
    setIsVisible(false);

    // Initialize analytics if configured
    if (typeof window !== 'undefined' && (window as any).initializeAnalytics) {
      (window as any).initializeAnalytics();
    }
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'declined');
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 p-5 rounded-2xl bg-white border border-[#DCE8F8] shadow-2xl text-[#475569] text-xs leading-relaxed"
          aria-label="Cookie consent banner"
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="p-2.5 rounded-xl bg-[#EAF2FF] border border-[#DCE8F8] text-[#2563EB] shrink-0">
              <Cookie className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-[#0B1220] font-display mb-1 flex items-center gap-1.5">
                <span>Privacy &amp; Cookie Preferences</span>
              </h3>
              <p>
                We use privacy-friendly cookies to enhance site navigation, measure aggregate performance, and secure our contact channels. Review our{' '}
                <Link to="/privacy" className="text-[#2563EB] font-semibold hover:underline">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>
            <button
              onClick={handleDecline}
              className="p-1 rounded-lg text-[#7B8AA3] hover:text-[#0B1220] hover:bg-[#F1F7FF] transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Cookies</span>
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="py-2 px-3 rounded-xl bg-[#F8FBFF] hover:bg-[#EAF2FF] text-[#475569] font-medium text-xs border border-[#DCE8F8] transition-colors"
            >
              Essential Only
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
