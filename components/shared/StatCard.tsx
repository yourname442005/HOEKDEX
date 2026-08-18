'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-rose-600',
  onClick,
  className,
}: StatCardProps) {
  const isInteractive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={cn(
        'p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#E7E0D8] relative overflow-hidden transition-all duration-200 shadow-xs',
        isInteractive && 'cursor-pointer hover:border-rose-400 hover:bg-[#FFF7ED] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-stone-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        <div className={cn('p-3 rounded-xl bg-[#F5EFE6] border border-[#E7E0D8]', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
