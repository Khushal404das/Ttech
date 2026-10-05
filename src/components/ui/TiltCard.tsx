import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * 3D TiltCard inspired by Aceternity UI, Smooth UI & ThreeUI
 * Adds 3D perspective tilt and dynamic lighting highlights on hover.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 150, damping: 25 });
  const glareX = useSpring(useMotionValue(50), { stiffness: 200, damping: 20 });
  const glareY = useSpring(useMotionValue(50), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY / height) - 0.5) * -maxTilt;
    const rY = ((mouseX / width) - 0.5) * maxTilt;

    rotateX.set(rX);
    rotateY.set(rY);

    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
    glareOpacity.set(0.18);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
    setIsHovered(false);
  };

  return (
    <div style={{ perspective: '1000px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative h-full transition-shadow duration-300 rounded-2xl ${
          isHovered ? 'shadow-[0_20px_45px_rgba(37,99,235,0.16)]' : 'shadow-[0_10px_30px_rgba(37,99,235,0.06)]'
        } ${className}`}
        {...(props as any)}
      >
        {/* Dynamic Specular Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
          }}
        />
        <div className="relative z-20 h-full">{children}</div>
      </motion.div>
    </div>
  );
};
