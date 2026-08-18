'use client';

import React from 'react';
import { ActivityDefinition } from '@/types/domain';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  CheckCircle2,
  Coffee,
  MessageCircle,
  Utensils,
  Heart,
  ChefHat,
  Moon,
  Compass,
  Users,
  Sun,
  Award,
} from 'lucide-react';
import { format } from 'date-fns';

interface ActivityRowProps {
  activity: ActivityDefinition;
  isClaimed: boolean;
  claimedAt?: string;
  claimedNote?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ActivityRow({
  activity,
  isClaimed,
  claimedAt,
  claimedNote,
  isSelected,
  onSelect,
}: ActivityRowProps) {
  const renderIcon = (iconName: string) => {
    const iconClass = 'w-4 h-4';
    switch (iconName) {
      case 'Coffee':
        return <Coffee className={iconClass} />;
      case 'MessageCircle':
        return <MessageCircle className={iconClass} />;
      case 'Utensils':
        return <Utensils className={iconClass} />;
      case 'Heart':
        return <Heart className={iconClass} />;
      case 'ChefHat':
        return <ChefHat className={iconClass} />;
      case 'Moon':
        return <Moon className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'Sun':
        return <Sun className={iconClass} />;
      case 'Award':
      default:
        return <Award className={iconClass} />;
    }
  };

  const formattedClaimedDate = claimedAt ? format(new Date(claimedAt), 'MMM d, yyyy') : null;

  return (
    <div
      onClick={isClaimed ? undefined : onSelect}
      role={isClaimed ? undefined : 'button'}
      tabIndex={isClaimed ? -1 : 0}
      aria-disabled={isClaimed}
      className={cn(
        'group flex flex-col p-3.5 rounded-2xl border transition-all select-none',
        isClaimed
          ? 'bg-stone-100 border-[#E7E0D8] opacity-65 cursor-not-allowed'
          : isSelected
          ? 'bg-rose-50 border-rose-400 shadow-xs ring-1 ring-rose-400 cursor-pointer'
          : 'bg-[#F5EFE6] border-[#E7E0D8] hover:border-stone-300 hover:bg-[#FFFDF9] cursor-pointer'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
              isClaimed
                ? 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                : isSelected
                ? 'bg-rose-600 text-white'
                : 'bg-[#FFFDF9] border border-[#E7E0D8] text-stone-700 group-hover:text-rose-600'
            )}
          >
            {isClaimed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : renderIcon(activity.icon)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4
                className={cn(
                  'text-sm font-bold truncate',
                  isClaimed ? 'text-stone-400 line-through' : 'text-[#1C1917]'
                )}
              >
                {activity.name}
              </h4>
            </div>
            <p className="text-xs text-stone-500 truncate mt-0.5">
              {activity.description}
            </p>
          </div>
        </div>

        {/* XP Badge or Claimed Chip */}
        <div className="flex-shrink-0">
          {isClaimed ? (
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                Claimed
              </span>
              {formattedClaimedDate && (
                <span className="text-[10px] text-stone-500 mt-0.5">
                  {formattedClaimedDate}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-500/10 border border-rose-500/25 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>+{activity.xp} XP</span>
            </div>
          )}
        </div>
      </div>

      {claimedNote && (
        <div className="mt-2 pt-2 border-t border-[#E7E0D8] text-xs text-stone-500 italic">
          &ldquo;{claimedNote}&rdquo;
        </div>
      )}
    </div>
  );
}
