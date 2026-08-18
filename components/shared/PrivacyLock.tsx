'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrivacyLockProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tooltipText?: string;
}

export function PrivacyLock({
  className,
  showLabel = false,
  size = 'md',
  tooltipText = 'Private — only you can see this record',
}: PrivacyLockProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn('relative inline-flex items-center gap-1.5 text-stone-500 group cursor-default', className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="note"
      aria-label={tooltipText}
    >
      <div className="flex items-center justify-center p-1 rounded-md bg-[#F5EFE6] border border-[#E7E0D8] text-stone-600 group-hover:text-rose-600 group-hover:border-rose-300 transition-colors">
        <Lock className={iconSizes[size]} aria-hidden="true" />
      </div>

      {showLabel && (
        <span className="text-xs font-medium tracking-wide uppercase text-stone-500 group-hover:text-stone-800 transition-colors">
          Private
        </span>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 px-2.5 py-1.5 text-xs font-medium text-[#1C1917] bg-[#FFFDF9] border border-[#E7E0D8] rounded-lg shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          {tooltipText}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#E7E0D8]" />
        </div>
      )}
    </div>
  );
}
