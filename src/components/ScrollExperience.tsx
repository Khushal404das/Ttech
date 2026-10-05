import { useLayoutEffect, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export function ScrollExperience() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize smooth scroll engine
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    let frameId = 0;
    const render = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Multi-tier scroll reset whenever the route/pathname changes
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (!location.hash) {
      const resetScroll = () => {
        if (lenisRef.current) {
          lenisRef.current.stop();
          lenisRef.current.scrollTo(0, { immediate: true, force: true });
          lenisRef.current.start();
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // 1. Immediate synchronous reset
      resetScroll();

      // 2. Next animation frame (DOM render pass)
      const rafId = requestAnimationFrame(resetScroll);

      // 3. Timed fallbacks for slow component mounts or async transitions
      const t1 = setTimeout(resetScroll, 50);
      const t2 = setTimeout(resetScroll, 150);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [location.pathname]);

  // Handle smooth scroll to anchor when hash exists
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timeout = setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
        return () => clearTimeout(timeout);
      }
    }
  }, [location.pathname, location.hash]);

  return null;
}


