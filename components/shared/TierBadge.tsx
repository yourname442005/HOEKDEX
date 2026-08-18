'use client';

import React from 'react';
import { Tier } from '@/types/domain';
import { TIER_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Crown, Flame, Zap, Smile, Sparkles } from 'lucide-react';

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  interactive?: boolean;
  className?: string;
}

export function TierBadge({
  tier,
  size = 'md',
  onClick,
  interactive = false,
  className,
}: TierBadgeProps) {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.Beginner;

  const renderIcon = (iconSize: string) => {
    switch (tier) {
      case 'Legendary':
        return <Crown className={cn(iconSize, 'text-amber-400')} aria-hidden="true" />;
      case 'Master':
        return <Flame className={cn(iconSize, 'text-purple-400')} aria-hidden="true" />;
      case 'Elite':
        return <Zap className={cn(iconSize, 'text-blue-400')} aria-hidden="true" />;
      case 'Good':
        return <Smile className={cn(iconSize, 'text-emerald-400')} aria-hidden="true" />;
      case 'Beginner':
      default:
        return <Sparkles className={cn(iconSize, 'text-zinc-400')} aria-hidden="true" />;
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold gap-1',
    md: 'px-2.5 py-1 text-xs font-bold gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm font-extrabold gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const tierGradients: Record<Tier, string> = {
    Beginner: 'bg-stone-100 text-stone-700 border-stone-300 hover:border-stone-400',
    Good: 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-400 shadow-xs',
    Elite: 'bg-blue-50 text-blue-800 border-blue-300 hover:border-blue-400 shadow-xs',
    Master: 'bg-purple-50 text-purple-800 border-purple-300 hover:border-purple-400 shadow-xs',
    Legendary: 'bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-400 shadow-xs font-black',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive || !onClick}
      aria-label={`Tier: ${tier}`}
      className={cn(
        'inline-flex items-center justify-center rounded-full border tracking-wide transition-all select-none',
        tierGradients[tier],
        sizeClasses[size],
        interactive && 'cursor-pointer hover:scale-105 active:scale-95',
        !interactive && 'cursor-default',
        className
      )}
    >
      {renderIcon(iconSizes[size])}
      <span>{config.label}</span>
    </button>
  );
}
