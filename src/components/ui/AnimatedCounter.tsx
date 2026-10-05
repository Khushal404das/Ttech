import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

/**
 * AnimatedCounter inspired by React Bits & Animaster
 * Smooth rolling number counter when scrolled into view.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}) => {
  const [value, setValue] = useState(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTimestamp: number | null = null;

            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              // Ease-out cubic calculation
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = from + (to - from) * easeOut;

              setValue(current);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setValue(to);
              }
            };

            window.requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [from, to, duration]);

  const formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span ref={elementRef} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
