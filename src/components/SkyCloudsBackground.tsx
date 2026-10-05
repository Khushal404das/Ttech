import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const SkyCloudsBackground: React.FC = () => {
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
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Base Sky Image with slow cinematic floating pan */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute -inset-10 will-change-transform"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-65 sm:opacity-80 scale-105 animate-sky-pan"
          style={{
            backgroundImage: `url('/sky-clouds-bg.jpg')`,
            backgroundPosition: '50% 30%',
          }}
        />
      </motion.div>

      {/* Atmospheric Sunlight Flare Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-10 left-1/3 w-[600px] h-[400px] bg-blue-300/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Layer 1: Drifting Translucent Clouds (Slow Background) */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 will-change-transform opacity-60"
      >
        <div className="cloud-layer cloud-layer-slow absolute top-12 -left-[40%] w-[180%] h-64 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-2xl rounded-full" />
        <div className="cloud-layer cloud-layer-slow absolute top-48 -left-[20%] w-[160%] h-80 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl rounded-full" />
      </motion.div>

      {/* Layer 2: Floating Cumulus Cloud Puffs (Medium Speed Drift) */}
      <motion.div
        style={{ x: layer3X }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Animated Cloud Puff 1 */}
        <div className="absolute top-20 left-[-15%] w-[420px] h-[140px] bg-white/45 rounded-full blur-xl animate-drift-right-1" />
        {/* Animated Cloud Puff 2 */}
        <div className="absolute top-64 left-[-25%] w-[580px] h-[180px] bg-white/40 rounded-full blur-2xl animate-drift-right-2" />
        {/* Animated Cloud Puff 3 */}
        <div className="absolute top-36 left-[-10%] w-[350px] h-[120px] bg-sky-100/40 rounded-full blur-lg animate-drift-right-3" />
        {/* Animated Cloud Puff 4 (Lower soft mist) */}
        <div className="absolute top-96 left-[-30%] w-[700px] h-[220px] bg-white/50 rounded-full blur-3xl animate-drift-right-4" />
      </motion.div>

      {/* Subtle Floating Cloud Particle Dust */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.6),transparent_80%)]" />

      {/* Modern Soft Gradient Transition into Page Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FBFF]/35 to-[#F8FBFF]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8FBFF] to-transparent" />
    </div>
  );
};
