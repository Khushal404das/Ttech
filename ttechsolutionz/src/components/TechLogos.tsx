import React from 'react';

interface TechLogoProps {
  className?: string;
  size?: number;
}

export const HTML5Logo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M71 460L35 60h442l-36 400-185 52-185-52z" fill="#E34F26" />
    <path d="M256 472l151-42 30-335H256v377z" fill="#EF652A" />
    <path d="M256 176v60h75l-7 78-68 18v62l122-34 16-184H256zm0-84v60h160l6-60H256z" fill="#fff" />
    <path d="M256 176H146l-6-60h232v60H256zm0 138l-68-18-5-52H123l8 104 125 35v-69z" fill="#EBEBEB" />
  </svg>
);

export const CSS3Logo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M71 460L35 60h442l-36 400-185 52-185-52z" fill="#1572B6" />
    <path d="M256 472l151-42 30-335H256v377z" fill="#33A9DC" />
    <path d="M256 208h72l-7 74-65 18v62l120-33 16-181H256v60zm0-116h154l5-60H256v60z" fill="#fff" />
    <path d="M256 92H102l5 60h149V92zm0 116H185l5 60h66v-60zm0 138l-65-18-4-46h-60l8 98 121 34v-68z" fill="#EBEBEB" />
  </svg>
);

export const JavaScriptLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="64" fill="#F7DF1E" />
    <path d="M290 398c7 12 17 21 34 21 17 0 28-8 28-40V246h48v133c0 54-32 79-76 79-37 0-60-20-72-44l38-16zm-136-2c9 15 22 25 43 25 18 0 30-9 30-23 0-16-12-22-33-31l-11-5c-33-14-55-32-55-70 0-35 27-62 69-62 30 0 52 11 67 37l-37 24c-8-14-17-19-30-19-14 0-23 9-23 20 0 14 9 20 29 28l11 5c40 17 60 34 60 74 0 42-33 66-78 66-43 0-70-22-83-51l39-18z" fill="#000" />
  </svg>
);

export const ReactLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 115 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="57.5" cy="50" r="10" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="4.5" fill="none">
      <ellipse cx="57.5" cy="50" rx="52" ry="20" />
      <ellipse cx="57.5" cy="50" rx="52" ry="20" transform="rotate(60 57.5 50)" />
      <ellipse cx="57.5" cy="50" rx="52" ry="20" transform="rotate(120 57.5 50)" />
    </g>
  </svg>
);

export const NextjsLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="#000" />
    </mask>
    <g mask="url(#next-mask)">
      <circle cx="90" cy="90" r="90" fill="#000" stroke="#334155" strokeWidth="4" />
      <path d="M149.5 159.5L78.6 68H64v64h12V83.6l64.2 82.2c3.2-2 6.3-4.1 9.3-6.3z" fill="url(#next-grad)" />
      <rect x="115" y="68" width="12" height="44" fill="#fff" />
    </g>
    <defs>
      <linearGradient id="next-grad" x1="109" y1="116" x2="144" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const TailwindLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 54 33" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4" />
  </svg>
);

export const BootstrapLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 3.5c1.47 0 2.5.81 2.5 2.06 0 .91-.53 1.58-1.34 1.84.97.23 1.63.98 1.63 2.11 0 1.43-1.15 2.39-2.8 2.39H4.5V3.5h4zm-2.4 4.1h2.24c.78 0 1.25-.43 1.25-1.07 0-.66-.48-1.05-1.25-1.05H6.1v2.12zm0 1.95v2.33h2.38c.87 0 1.39-.46 1.39-1.18 0-.72-.51-1.15-1.39-1.15H6.1z" fill="#fff" />
    <rect width="16" height="16" rx="3.5" fill="#7952B3" />
    <path d="M8.5 3.5c1.47 0 2.5.81 2.5 2.06 0 .91-.53 1.58-1.34 1.84.97.23 1.63.98 1.63 2.11 0 1.43-1.15 2.39-2.8 2.39H4.5V3.5h4zm-2.4 4.1h2.24c.78 0 1.25-.43 1.25-1.07 0-.66-.48-1.05-1.25-1.05H6.1v2.12zm0 1.95v2.33h2.38c.87 0 1.39-.46 1.39-1.18 0-.72-.51-1.15-1.39-1.15H6.1z" fill="#fff" />
  </svg>
);

export const PHPLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="64" cy="64" rx="60" ry="34" fill="#777BB4" />
    <ellipse cx="64" cy="64" rx="55" ry="30" stroke="#fff" strokeWidth="2.5" />
    <text x="64" y="73" fill="#fff" fontSize="30" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic">
      php
    </text>
  </svg>
);

export const LaravelLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M120.3 35.8L73.1 8.8a12.8 12.8 0 00-12.8 0L7.7 35.8c-4.7 2.7-7.7 7.8-7.7 13.2v54.1c0 5.4 3 10.5 7.7 13.2l47.2 27a12.8 12.8 0 0012.8 0l47.2-27a15.2 15.2 0 007.7-13.2V49c.1-5.4-2.9-10.5-7.7-13.2z" fill="#FF2D20" />
    <path d="M64 25l45 25.8-45 25.8L19 50.8 64 25z" fill="#fff" fillOpacity="0.8" />
    <path d="M19 61.2l45 25.8v43.2L19 104.4V61.2z" fill="#fff" fillOpacity="0.4" />
    <path d="M109 61.2v43.2L64 130.2V87l45-25.8z" fill="#fff" fillOpacity="0.6" />
  </svg>
);

export const NodejsLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8l52 30v60L64 128 12 98V38L64 8z" fill="#339933" />
    <text x="64" y="74" fill="#fff" fontSize="32" fontWeight="800" fontFamily="monospace" textAnchor="middle">
      JS
    </text>
  </svg>
);

export const ExpressjsLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#1e293b" stroke="#334155" strokeWidth="4" />
    <text x="64" y="78" fill="#38BDF8" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
      ex
    </text>
  </svg>
);

export const MySQLLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#00758F" />
    <path d="M30 75c8-20 25-35 48-35 12 0 22 5 28 12-8-3-18-2-24 3-8 6-12 16-10 25-10-3-22-2-42-5z" fill="#F29111" />
    <text x="64" y="105" fill="#fff" fontSize="22" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
      MySQL
    </text>
  </svg>
);

export const MongoDBLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M64 4c-3 10-24 35-24 64 0 28 20 50 24 56 4-6 24-28 24-56 0-29-21-54-24-64z" fill="#47A248" />
    <path d="M64 4v120c4-6 24-28 24-56 0-29-21-54-24-64z" fill="#499D4A" />
    <path d="M64 96c-1 0-1 24 0 28 1-4 1-28 0-28z" fill="#fff" />
  </svg>
);

export const PostgreSQLLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#336791" />
    <path d="M64 26c-18 0-30 14-30 32 0 16 9 27 20 30v14c4 0 8-3 10-6v-8c6 1 12 0 16-3 8-5 14-16 14-27 0-18-12-32-30-32z" fill="#fff" />
    <circle cx="54" cy="50" r="4" fill="#336791" />
  </svg>
);

export const DotNetLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#512BD4" />
    <text x="64" y="78" fill="#fff" fontSize="34" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
      .NET
    </text>
  </svg>
);

export const CSharpLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8l50 29v58L64 124 14 95V37L64 8z" fill="#239120" />
    <text x="56" y="80" fill="#fff" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
      C#
    </text>
  </svg>
);

export const PythonLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M63 10c-25 0-23 11-23 11l.03 11.5h23.5v3.4H30.8C16 35.9 7 44.5 7 59.2c0 14.8 11.8 15.3 11.8 15.3h7.1v-10c0-11.4 9.8-11.4 9.8-11.4h23.3c9.3 0 9.3-9.1 9.3-9.1V24.5c0-14.5-5.2-14.5-5.2-14.5H63zm-6.6 6.8a3.4 3.4 0 110 6.8 3.4 3.4 0 010-6.8z" fill="#3776AB" />
    <path d="M65 118c25 0 23-11 23-11l-.03-11.5H64.5v-3.4h32.7c14.8 0 23.8-8.6 23.8-23.3 0-14.8-11.8-15.3-11.8-15.3h-7.1v10c0 11.4-9.8 11.4-9.8 11.4H49c-9.3 0-9.3 9.1-9.3 9.1v19.5c0 14.5 5.2 14.5 5.2 14.5H65zm6.6-6.8a3.4 3.4 0 110-6.8 3.4 3.4 0 010 6.8z" fill="#FFD438" />
  </svg>
);

export const AzureLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 96l38-72h22L44 96H22zm36-22l14-26 34 48H72l-14-22z" fill="#0089D6" />
    <path d="M82 24h24l-38 72H44l38-72z" fill="#0072C6" fillOpacity="0.4" />
  </svg>
);

export const DockerLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M120 62c-3-2-8-3-12-1 1-6-2-12-6-15l-4 3c-1 3-1 6 0 9-3 2-6 5-8 9-20-4-39 5-46 17-5-2-11-2-16 0-3 1-6 3-8 5-7-2-15 1-19 6-1 2-2 4-2 7 0 23 20 42 45 42 34 0 59-20 66-48 4 1 9 0 12-2l2-3c-1-1-1-3-2-4z" fill="#2496ED" />
    <rect x="24" y="60" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="36" y="60" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="48" y="60" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="36" y="49" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="48" y="49" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="60" y="49" width="10" height="9" rx="1.5" fill="#2496ED" />
  </svg>
);

export const FigmaLogo: React.FC<TechLogoProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 38 57" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 11-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 100-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#A259FF" />
  </svg>
);
