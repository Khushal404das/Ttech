import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

/**
 * SpotlightCard inspired by Aceternity UI & React Bits
 * Illuminates card surface and borders dynamically based on cursor position.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.12)',
  borderColor = 'rgba(37, 99, 235, 0.3)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  const borderHighlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${borderColor}, transparent 70%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl bg-white border border-[#DCE8F8] transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] overflow-hidden ${className}`}
      {...props}
    >
      {/* Animated Dynamic Border Highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: borderHighlight,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {/* Surface Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBg }}
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};
