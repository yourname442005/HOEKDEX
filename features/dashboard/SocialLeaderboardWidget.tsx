'use client';

import React from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { Card } from '@/components/ui/card';
import { Flame, ShieldCheck, UserCheck, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SocialLeaderboardWidget() {
  const { dashboardStats, leaderboard, user } = useHoekdex();

  const weekly = leaderboard['weekly'] || [];
  const currentUserEntry = weekly.find((r) => r.userId === user.id);
  const totalRanked = weekly.length;

  return (
    <Card variant="default" padding="default" className="space-y-4 bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#fe1e34]" />
          <h3 className="text-h3 text-[#1C1917] dark:text-[#FCFCFC]">Social Leaderboard</h3>
        </div>

        <Link
          href="/leaderboard"
          className="flex items-center gap-1 text-xs font-bold text-[#fe1e34] hover:underline"
        >
          <span>Standings</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Standing Display Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fe1e34]/10 via-[#FFFDF9] dark:via-[#171617] to-[#FFFDF9] dark:to-[#171617] border border-[#fe1e34]/25 flex items-center justify-between gap-3 shadow-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#fe1e34]">
              Weekly Standing
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1C1917] dark:text-[#FCFCFC]">
              {currentUserEntry ? `#${currentUserEntry.rank}` : 'Opted Out'}
            </span>
            <span className="text-xs font-semibold text-stone-500 dark:text-[#B5B2B2]">
              among {totalRanked} friends
            </span>
          </div>
        </div>

        <Link
          href="/leaderboard"
          className="px-3.5 py-1.5 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] text-white text-xs font-bold shadow-xs transition-all"
        >
          View Rankings
        </Link>
      </div>

      {/* Top 3 Quick Preview */}
      <div className="space-y-2">
        {weekly.slice(0, 3).map((entry) => {
          const isUser = entry.userId === user.id;
          return (
            <div
              key={entry.userId}
              className={cn(
                'flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all',
                isUser
                  ? 'bg-[#fe1e34]/10 border-[#fe1e34]/30 text-[#fe1e34]'
                  : 'bg-[#F5EFE6] dark:bg-[#262525] border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC]'
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-5 text-center font-black text-stone-500 dark:text-[#B5B2B2]">#{entry.rank}</span>
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#E7E0D8] dark:border-[#393939] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.avatarUrl} alt={entry.displayName} className="w-full h-full object-cover" />
                </div>
                <span className="truncate">{entry.displayName} {isUser && '(You)'}</span>
              </div>

              <span className="text-[#fe1e34] font-extrabold flex-shrink-0">
                {entry.totalXp.toLocaleString()} XP
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
