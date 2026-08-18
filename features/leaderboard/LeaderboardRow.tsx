'use client';

import React from 'react';
import { SocialPersonRef } from '@/types/domain';
import { Sparkles, Trophy, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardRowProps {
  entry: SocialPersonRef;
  isCurrentUser?: boolean;
  period?: 'weekly' | 'monthly' | 'all-time' | 'friends';
}

export function LeaderboardRow({
  entry,
  isCurrentUser = false,
  period = 'weekly',
}: LeaderboardRowProps) {
  const rank = entry.rank;

  const renderRankBadge = () => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-600 font-black text-xs shadow-xs">
          <Crown className="w-4 h-4 text-amber-600" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-stone-200 border-2 border-stone-400 flex items-center justify-center text-stone-700 font-black text-xs shadow-xs">
          <Medal className="w-4 h-4 text-stone-600" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-700/15 border-2 border-amber-700 flex items-center justify-center text-amber-700 font-black text-xs shadow-xs">
          <Medal className="w-4 h-4 text-amber-700" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-[#F5EFE6] border border-[#E7E0D8] flex items-center justify-center text-stone-600 font-bold text-xs">
        #{rank}
      </div>
    );
  };

  const displayXp =
    period === 'weekly'
      ? entry.weeklyXp ?? entry.totalXp
      : period === 'monthly'
      ? entry.monthlyXp ?? entry.totalXp
      : entry.totalXp;

  return (
    <div
      role="row"
      className={cn(
        'flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200',
        isCurrentUser
          ? 'bg-[#fe1e34]/10 border-[#fe1e34]/40 shadow-xs ring-1 ring-[#fe1e34]/40'
          : rank <= 3
          ? 'bg-[#FFFDF9] dark:bg-[#171617] border-amber-500/40 hover:border-amber-500'
          : 'bg-[#FFFDF9] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] hover:border-stone-300 dark:hover:border-stone-500'
      )}
    >
      {/* Rank & User Details */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0">{renderRankBadge()}</div>

        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.avatarUrl} alt={entry.displayName} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={cn('text-sm sm:text-base font-extrabold truncate', isCurrentUser ? 'text-[#fe1e34]' : 'text-[#1C1917] dark:text-[#FCFCFC]')}>
              {entry.displayName}
            </h4>
            {isCurrentUser && (
              <span className="text-[10px] font-black uppercase text-[#fe1e34] bg-[#fe1e34]/15 px-2 py-0.5 rounded-full border border-[#fe1e34]/30">
                You
              </span>
            )}
          </div>

          {entry.achievementBadge && (
            <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-[#B5B2B2] mt-0.5">
              <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span className="truncate max-w-[150px]">{entry.achievementBadge}</span>
            </div>
          )}
        </div>
      </div>

      {/* Period XP Score */}
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1 text-sm sm:text-base font-black text-[#fe1e34] bg-[#fe1e34]/10 border border-[#fe1e34]/25 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#fe1e34]" />
          <span>{displayXp.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  );
}
