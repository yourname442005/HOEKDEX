'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { PrivacyLock } from './PrivacyLock';

interface PageHeaderProps {
  title: string;
  description?: string;
  showPrivacyLock?: boolean;
  privacyTooltip?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  showPrivacyLock = false,
  privacyTooltip,
  actions,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D8] dark:border-[#393939]', className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
            {title}
          </h1>
          {badge}
          {showPrivacyLock && (
            <PrivacyLock showLabel tooltipText={privacyTooltip} size="sm" />
          )}
        </div>
        {description && (
          <p className="text-sm text-stone-600 dark:text-[#B5B2B2] font-medium max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
