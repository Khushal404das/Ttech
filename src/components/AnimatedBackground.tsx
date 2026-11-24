import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  pulsePhase: number;
}

// Blue particle palette
const COLORS = [
  'rgba(37,99,235,',   // primary #2563EB
  'rgba(30,64,175,',   // primary-dark #1E40AF
  'rgba(96,165,250,',  // primary-light #60A5FA
  'rgba(59,130,246,',  // blue-500
];

const MAX_PARTICLES = 90;
const LINK_DIST = 130;

/**
 * Decorative particle canvas.
 *
 * Mobile-safe by design:
 *  - Not rendered at all on touch / small screens / reduced motion
 *    (the canvas was the main cause of jank and flicker on phones).
 *  - Canvas is sized to the viewport (it is position: fixed), not the
 *    whole document height, and DPR is capped.
 *  - Only re-initialises when the viewport WIDTH changes, so the mobile
 *    address bar showing/hiding no longer clears the canvas (the "blink").
 *  - Pauses while the tab is hidden.
 */
export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let width = 0;
    let height = 0;
    let lastWidth = -1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnParticles = () => {
      particles = [];
      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 22000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.4 + 0.3,
          alpha: Math.random() * 0.4 + 0.08,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    spawnParticles();
    lastWidth = width;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.008;

      // Subtle blue aurora blobs
      const blobs = [
        { x: width * 0.15, y: height * 0.15, r: width * 0.38, color: 'rgba(37,99,235,0.025)' },
        { x: width * 0.85, y: height * 0.25, r: width * 0.32, color: 'rgba(96,165,250,0.02)' },
        { x: width * 0.5, y: height * 0.7, r: width * 0.28, color: 'rgba(220,232,248,0.04)' },
      ];
      blobs.forEach((blob, i) => {
        const ox = Math.sin(t + i * 1.7) * width * 0.04;
        const oy = Math.cos(t + i * 2.1) * height * 0.03;
        const grad = ctx.createRadialGradient(blob.x + ox, blob.y + oy, 0, blob.x + ox, blob.y + oy, blob.r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x + ox, blob.y + oy, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const dist = Math.sqrt(d2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37,99,235,${(1 - dist / LINK_DIST) * 0.06})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120 && mdist > 0) {
          const force = (120 - mdist) / 120;
          p.vx += (mdx / mdist) * force * 0.3;
          p.vy += (mdy / mdist) * force * 0.3;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        const pulse = Math.sin(t * 2.5 + p.pulsePhase) * 0.15 + 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * pulse})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!animId) animId = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(animId);
      animId = 0;
    };
    start();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        // Only respawn when the width really changed — height-only changes
        // (browser chrome showing/hiding) keep the existing particles.
        if (width !== lastWidth) {
          lastWidth = width;
          spawnParticles();
        }
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
