import React from 'react';

interface ShimmerBadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
}

/**
 * ShimmerBadge inspired by Magic UI & 21st.dev
 * Glowing animated gradient border pill badge for highlights and status indicators.
 */
export const ShimmerBadge: React.FC<ShimmerBadgeProps> = ({
  children,
  className = '',
  icon,
  pulse = true,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden group ${className}`}>
      {/* Animated gradient spinning border */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#60A5FA_50%,#2563EB_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Badge inner content */}
      <span className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#2563EB] shadow-xs">
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
          </span>
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    </div>
  );
};
