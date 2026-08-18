'use client';

import React from 'react';
import { Achievement } from '@/types/domain';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Crown,
  Sparkles,
  Award,
  Users,
  CalendarHeart,
  Flame,
  Medal,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  onSelect?: () => void;
}

export function AchievementCard({ achievement, onSelect }: AchievementCardProps) {
  const isUnlocked = achievement.isUnlocked;
  const isInProgress = !isUnlocked && achievement.currentProgress > 0;
  const isLegendary = achievement.category === 'special' || achievement.xpReward >= 1000;

  const renderIcon = (iconName: string) => {
    const iconClass = cn(
      'w-8 h-8 transition-colors',
      isUnlocked ? (isLegendary ? 'text-amber-500' : 'text-rose-600') : isInProgress ? 'text-rose-600' : 'text-stone-400'
    );
    switch (iconName) {
      case 'Crown':
        return <Crown className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'CalendarHeart':
        return <CalendarHeart className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'Medal':
        return <Medal className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Trophy':
      default:
        return <Trophy className={iconClass} />;
    }
  };

  const progressPct = Math.min(
    Math.round((achievement.currentProgress / achievement.maxProgress) * 100),
    100
  );

  const getCardStyle = () => {
    if (isLegendary && isUnlocked) {
      return 'bg-gradient-to-br from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-amber-500/10 border-2 border-amber-400/80 dark:border-amber-700/80 shadow-md shadow-amber-500/10 hover:border-amber-500';
    }
    if (isUnlocked) {
      return 'bg-gradient-to-br from-[#FFFDF9] dark:from-[#171617] to-[#FFF1F2] dark:to-[#262525] border-[#fe1e34]/40 shadow-xs hover:border-[#fe1e34]';
    }
    if (isInProgress) {
      return 'bg-[#FFFDF9] dark:bg-[#171617] border-[#fe1e34]/80 shadow-xs hover:border-[#fe1e34]';
    }
    return 'bg-[#F5EFE6]/80 dark:bg-[#262525]/80 border-[#E7E0D8] dark:border-[#393939] opacity-80 hover:opacity-100 hover:border-stone-400 dark:hover:border-stone-500';
  };

  return (
    <div
      onClick={onSelect}
      role="article"
      aria-label={`${achievement.title} - ${isUnlocked ? 'Unlocked' : 'Locked'}`}
      className={cn(
        'relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 select-none cursor-pointer',
        getCardStyle()
      )}
    >
      {/* Top Row: Icon and XP Reward */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner relative',
            isUnlocked
              ? isLegendary ? 'bg-amber-500/15 border-amber-500/40 text-amber-600' : 'bg-[#fe1e34]/15 border-[#fe1e34]/30 text-[#fe1e34]'
              : isInProgress
              ? 'bg-[#fe1e34]/10 border-[#fe1e34]/25 text-[#fe1e34]'
              : 'bg-stone-200/80 dark:bg-[#393939] border-stone-300 dark:border-[#525252] text-stone-400 dark:text-[#B5B2B2]'
          )}
        >
          {renderIcon(achievement.icon)}
          {!isUnlocked && !isInProgress && (
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-stone-300 dark:bg-[#393939] border border-stone-400 dark:border-[#525252] text-stone-600 dark:text-[#FCFCFC]">
              <Lock className="w-3 h-3" />
            </div>
          )}
        </div>

        <div className="text-right">
          <Badge
            variant={isUnlocked ? (isLegendary ? 'achievement' : 'xp') : 'outline'}
            size="default"
            className={isUnlocked ? 'bg-[#fe1e34] text-white border-none' : 'border-[#E7E0D8] dark:border-[#393939] text-stone-600 dark:text-[#B5B2B2]'}
          >
            <Sparkles className="w-3 h-3" />
            <span>+{achievement.xpReward} XP</span>
          </Badge>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-1 my-2">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              'text-base font-extrabold tracking-tight truncate',
              isUnlocked ? 'text-[#1C1917] dark:text-[#FCFCFC]' : 'text-stone-700 dark:text-[#D4D2D2]'
            )}
          >
            {achievement.title}
          </h3>
          {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />}
        </div>
        <p className="text-xs text-stone-600 dark:text-[#B5B2B2] leading-relaxed font-medium">
          {achievement.description}
        </p>
      </div>

      {/* Footer: Progress bar or Unlocked Date */}
      <div className="pt-3 mt-3 border-t border-[#E7E0D8] dark:border-[#393939] text-xs">
        {isUnlocked ? (
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-extrabold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Unlocked
            </span>
            <span className="text-stone-500 dark:text-[#B5B2B2] font-medium text-[11px]">
              {achievement.unlockedAt ? format(new Date(achievement.unlockedAt), 'MMM d, yyyy') : 'Claimed'}
            </span>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-stone-600 dark:text-[#B5B2B2] font-semibold text-[11px]">
              <span className="truncate max-w-[140px]">{achievement.criteria}</span>
              <span className="font-extrabold text-[#fe1e34]">
                {achievement.currentProgress} / {achievement.maxProgress} ({progressPct}%)
              </span>
            </div>
            <Progress value={achievement.currentProgress} max={achievement.maxProgress} className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
}
