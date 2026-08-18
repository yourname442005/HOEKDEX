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
    <Card variant="default" padding="default" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-600" />
          <h3 className="text-h3 text-[#1C1917]">Social Leaderboard</h3>
        </div>

        <Link
          href="/leaderboard"
          className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-500"
        >
          <span>Standings</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Standing Display Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-[#FFFDF9] to-[#FFFDF9] border border-rose-500/25 flex items-center justify-between gap-3 shadow-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
              Weekly Standing
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1C1917]">
              {currentUserEntry ? `#${currentUserEntry.rank}` : 'Opted Out'}
            </span>
            <span className="text-xs font-semibold text-stone-500">
              among {totalRanked} friends
            </span>
          </div>
        </div>

        <Link
          href="/leaderboard"
          className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-all"
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
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-[#F5EFE6] border-[#E7E0D8] text-[#1C1917]'
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-5 text-center font-black text-stone-500">#{entry.rank}</span>
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#E7E0D8] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.avatarUrl} alt={entry.displayName} className="w-full h-full object-cover" />
                </div>
                <span className="truncate">{entry.displayName} {isUser && '(You)'}</span>
              </div>

              <span className="text-rose-600 font-extrabold flex-shrink-0">
                {entry.totalXp.toLocaleString()} XP
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
