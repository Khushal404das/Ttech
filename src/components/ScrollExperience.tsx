import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Lenis from 'lenis';

export function ScrollExperience() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

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
    };
  }, []);

  // Scroll to top immediately whenever the pathname changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
        return;
      }
    }

    // Reset window and body scroll positions to 0 instantly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const page = document.querySelector<HTMLElement>('[data-page]');
    if (!page || prefersReducedMotion) return;

    const animatedChildren = Array.from(page.children);
    const context = gsap.context(() => {
      gsap.fromTo(
        animatedChildren,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform',
        },
      );
    }, page);

    return () => context.revert();
  }, [location.pathname]);

  return null;
}
