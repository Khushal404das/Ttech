import React from 'react';

interface TtechLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'glow';
}

export const TtechLogo: React.FC<TtechLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'glow',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const subTextSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]',
  };

  const sloganSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Coffee/Tea Cup with Circuit CPU & Steam Circuit Traces */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-transform duration-300 hover:scale-105"
        >
          {/* Steaming Circuit Traces Rising from the Cup with animated electric flow */}
          <g className="stroke-cyan-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Left trace */}
            <path d="M35 40 V 22 L 30 17 V 10" className="animate-steam" />
            <circle cx="30" cy="10" r="3.2" className="fill-cyan-300 stroke-none animate-pulse" />
            
            {/* Center-left trace */}
            <path d="M42 40 V 26 L 47 21 V 13" className="animate-steam" style={{ animationDelay: '0.6s' }} />
            <circle cx="47" cy="13" r="3.2" className="fill-cyan-400 stroke-none" />

            {/* Center-right trace */}
            <path d="M56 40 V 24 L 52 19 V 7" className="animate-steam" style={{ animationDelay: '1.2s' }} />
            <circle cx="52" cy="7" r="3.5" className="fill-cyan-300 stroke-none animate-pulse" />

            {/* Right trace */}
            <path d="M63 40 V 26 L 68 20 V 12" className="animate-steam" style={{ animationDelay: '1.8s' }} />
            <circle cx="68" cy="12" r="3.2" className="fill-cyan-400 stroke-none animate-pulse" />
          </g>

          {/* Cup Body Silhouette */}
          <path
            d="M22 43 C22 41 24 39 27 39 H73 C76 39 78 41 78 43 C78 64 68 83 50 83 C32 83 22 64 22 43 Z"
            className="fill-slate-950 stroke-cyan-400"
            strokeWidth="3.5"
          />

          {/* Cup Base */}
          <path
            d="M32 85 H68 C71 85 73 87 72 89 C70 91 66 92 50 92 C34 92 30 91 28 89 C27 87 29 85 32 85 Z"
            className="fill-cyan-400/90"
          />

          {/* Cup Handle on the right */}
          <path
            d="M77 47 C85 47 92 52 92 61 C92 70 85 75 74 74"
            className="stroke-cyan-400"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Circuit Tracks on Cup Exterior (Left side) */}
          <path
            d="M25 55 H 32 L 36 62 H 42"
            className="stroke-sky-400"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="25" cy="55" r="2.2" className="fill-sky-300" />
          <path
            d="M27 68 H 34 L 38 72"
            className="stroke-sky-400"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="27" cy="68" r="2" className="fill-sky-300" />

          {/* Microchip / CPU Core in center of Cup */}
          <g>
            {/* CPU Chip Pins */}
            {/* Top pins */}
            <line x1="46" y1="52" x2="46" y2="49" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="52" x2="50" y2="49" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="54" y1="52" x2="54" y2="49" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            
            {/* Bottom pins */}
            <line x1="46" y1="70" x2="46" y2="73" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="70" x2="50" y2="73" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="54" y1="70" x2="54" y2="73" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />

            {/* Left pins */}
            <line x1="41" y1="57" x2="38" y2="57" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="41" y1="61" x2="38" y2="61" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="41" y1="65" x2="38" y2="65" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />

            {/* Right pins */}
            <line x1="59" y1="57" x2="62" y2="57" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="59" y1="61" x2="62" y2="61" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />
            <line x1="59" y1="65" x2="62" y2="65" className="stroke-cyan-300" strokeWidth="2" strokeLinecap="round" />

            {/* Chip Square Body */}
            <rect
              x="41"
              y="52"
              width="18"
              height="18"
              rx="2.5"
              className="fill-cyan-400 stroke-cyan-300"
              strokeWidth="1.5"
            />

            {/* Inner Silicon Die Core */}
            <rect
              x="45"
              y="56"
              width="10"
              height="10"
              rx="1.5"
              className="fill-slate-950"
            />
            <rect
              x="47.5"
              y="58.5"
              width="5"
              height="5"
              className="fill-cyan-300"
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-display font-extrabold text-white tracking-tight ${textSizes[size]}`}>
            Ttech
          </span>
          <span className={`font-display font-bold uppercase text-cyan-400 ${subTextSizes[size]}`}>
            SOLUTIONS
          </span>
        </div>

        {showTagline && (
          <div className="mt-1 flex items-center gap-1.5 leading-none">
            <span className={`font-medium tracking-wide text-slate-400 ${sloganSizes[size]}`}>
              Think. Transform. Trust.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
