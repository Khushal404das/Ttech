import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    initializeAnalytics?: () => void;
  }
}

export const Analytics: React.FC = () => {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-TODO_ANALYTICS_ID';

  const initGA = () => {
    // Check cookie consent
    const consent = localStorage.getItem('ttech_cookie_consent_status');
    if (consent !== 'accepted') return;

    if (!measurementId || measurementId === 'G-TODO_ANALYTICS_ID') {
      // In development or when ID is placeholder, log notice
      return;
    }

    if (document.getElementById('google-analytics-script')) return;

    // Load gtag.js
    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  };

  useEffect(() => {
    window.initializeAnalytics = initGA;
    initGA();
  }, [measurementId]);

  // Track page views on route change
  useEffect(() => {
    if (typeof window.gtag === 'function' && measurementId && measurementId !== 'G-TODO_ANALYTICS_ID') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};
