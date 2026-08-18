'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-dashed border-[#E7E0D8] dark:border-[#393939] space-y-4 max-w-lg mx-auto shadow-xs',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] flex items-center justify-center text-[#fe1e34] shadow-inner">
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-stone-600 dark:text-[#B5B2B2] font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {secondaryActionLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="px-4 py-2 text-sm font-semibold text-stone-700 dark:text-[#D4D2D2] hover:text-stone-900 dark:hover:text-[#FCFCFC] bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] hover:border-stone-400 dark:hover:border-stone-500 rounded-full transition-all cursor-pointer"
            >
              {secondaryActionLabel}
            </button>
          )}

          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="px-5 py-2 text-sm font-bold text-white bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 rounded-full shadow-md shadow-[#fe1e34]/20 transition-all cursor-pointer"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
