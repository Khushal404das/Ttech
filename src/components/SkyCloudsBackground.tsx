import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * Hero sky background.
 * On phones / touch devices only the (small, compressed) sky image and the
 * static gradients render. The large blurred, continuously animated cloud
 * layers are desktop-only — on mobile GPUs they caused jank and flicker.
 */
export const SkyCloudsBackground: React.FC = () => {
  const [rich, setRich] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Subtle parallax shifts based on mouse movement
  const layer1X = useTransform(springX, [0, 1], [-25, 25]);
  const layer1Y = useTransform(springY, [0, 1], [-15, 15]);
  const layer2X = useTransform(springX, [0, 1], [-45, 45]);
  const layer2Y = useTransform(springY, [0, 1], [-25, 25]);
  const layer3X = useTransform(springX, [0, 1], [-60, 60]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setRich(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!rich) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rich, mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Base sky image */}
      {rich ? (
        <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute -inset-10 will-change-transform">
          <div className="sky-bg w-full h-full bg-cover bg-no-repeat opacity-80 scale-105 animate-sky-pan" />
        </motion.div>
      ) : (
        <div className="sky-bg absolute inset-0 bg-cover bg-no-repeat opacity-65" />
      )}

      {rich && (
        <>
          {/* Atmospheric sunlight flare glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-10 left-1/3 w-[600px] h-[400px] bg-blue-300/20 rounded-full blur-[140px] pointer-events-none" />

          {/* Drifting translucent clouds (slow background) */}
          <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute inset-0 will-change-transform opacity-60">
            <div className="absolute top-12 -left-[40%] w-[180%] h-64 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-2xl rounded-full" />
            <div className="absolute top-48 -left-[20%] w-[160%] h-80 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl rounded-full" />
          </motion.div>

          {/* Floating cumulus puffs (medium speed drift) */}
          <motion.div style={{ x: layer3X }} className="absolute inset-0 will-change-transform">
            <div className="absolute top-20 left-[-15%] w-[420px] h-[140px] bg-white/45 rounded-full blur-xl animate-drift-right-1" />
            <div className="absolute top-64 left-[-25%] w-[580px] h-[180px] bg-white/40 rounded-full blur-2xl animate-drift-right-2" />
            <div className="absolute top-36 left-[-10%] w-[350px] h-[120px] bg-sky-100/40 rounded-full blur-lg animate-drift-right-3" />
            <div className="absolute top-96 left-[-30%] w-[700px] h-[220px] bg-white/50 rounded-full blur-3xl animate-drift-right-4" />
          </motion.div>
        </>
      )}

      {/* Soft light at the top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.6),transparent_80%)]" />

      {/* Gradient transition into page content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FBFF]/35 to-[#F8FBFF]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8FBFF] to-transparent" />
    </div>
  );
};
