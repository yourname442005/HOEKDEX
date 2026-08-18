'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { LeaderboardPeriod } from '@/types/domain';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { LeaderboardRow } from './LeaderboardRow';
import { Badge } from '@/components/ui/badge';
import { Flame, ShieldCheck, UserPlus, Trophy, Crown, Medal, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LeaderboardView() {
  const { leaderboard, user } = useHoekdex();
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>('weekly');

  const currentRankedList = leaderboard[activePeriod] || [];
  const currentUserEntry = currentRankedList.find((r) => r.userId === user.id);

  const top1 = currentRankedList.find((r) => r.rank === 1);
  const top2 = currentRankedList.find((r) => r.rank === 2);
  const top3 = currentRankedList.find((r) => r.rank === 3);
  const remainingList = currentRankedList.filter((r) => r.rank > 3);

  const periods: Array<{ id: LeaderboardPeriod; label: string; desc: string }> = [
    { id: 'weekly', label: 'Weekly', desc: 'XP earned this week' },
    { id: 'monthly', label: 'Monthly', desc: 'XP earned this month' },
    { id: 'all-time', label: 'All-Time', desc: 'Total career XP' },
    { id: 'friends', label: 'Mutual Friends', desc: 'Mutual connections only' },
  ];

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-widest block font-bold mb-1">
          // YOUR STANDINGS
        </span>
        <PageHeader
          title="Leaderboard & Standings"
          description="Who's ahead? Compare relationship XP on privacy-first social rankings."
          badge={
            currentUserEntry ? (
              <span className="px-3 py-1 text-xs font-black bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-400 rounded-full">
                Your Rank: #{currentUserEntry.rank}
              </span>
            ) : undefined
          }
          actions={
            <Link
              href="/friends"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9] dark:bg-[#171617] hover:bg-[#F5EFE6] dark:hover:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-xs font-bold text-stone-700 dark:text-[#D4D2D2] transition-colors shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-[#fe1e34]" />
              <span>Manage Friends</span>
            </Link>
          }
        />
      </div>

      {/* Current User Status Banner */}
      {currentUserEntry && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fe1e34]/10 via-[#FFFDF9] dark:via-[#171617] to-[#FFFDF9] dark:to-[#171617] border border-[#fe1e34]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fe1e34] text-white flex items-center justify-center font-black text-sm shadow-md shadow-[#fe1e34]/20">
              #{currentUserEntry.rank}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#fe1e34]">
                You&apos;re currently #{currentUserEntry.rank} on {activePeriod} standings
              </p>
              <p className="text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">
                {currentUserEntry.rank === 1
                  ? "You're holding 1st place! Keep logging milestones to stay ahead."
                  : "Time to climb. Claim relationship milestones to gain XP!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#fe1e34] bg-[#fe1e34]/15 px-3 py-1.5 rounded-full border border-[#fe1e34]/25 self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-[#fe1e34]" />
            <span>{currentUserEntry.totalXp.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      {/* Period Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {periods.map((p) => {
          const isActive = activePeriod === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePeriod(p.id)}
              className={cn(
                'p-3 rounded-2xl border text-left transition-all cursor-pointer select-none',
                isActive
                  ? 'bg-[#fe1e34]/10 border-[#fe1e34]/40 shadow-xs ring-1 ring-[#fe1e34]/40'
                  : 'bg-[#FFFDF9] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] hover:border-stone-300 dark:hover:border-stone-500'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-xs font-extrabold', isActive ? 'text-[#fe1e34]' : 'text-[#1C1917] dark:text-[#FCFCFC]')}>
                  {p.label}
                </span>
                {isActive && <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
              </div>
              <p className="text-[10px] text-stone-500 dark:text-[#B5B2B2] mt-0.5">{p.desc}</p>
            </button>
          );
        })}
      </div>

      {/* TOP 3 PODIUM HERO CONTAINER */}
      {currentRankedList.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-6 shadow-xs relative overflow-hidden">
          <div className="text-center space-y-1">
            <span className="text-caption text-[#fe1e34] block font-bold">// STANDINGS LEADERS</span>
            <h3 className="text-h2 text-[#1C1917] dark:text-[#FCFCFC]">Podium Leaders</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-4 max-w-2xl mx-auto">
            {/* 2ND PLACE (Left) */}
            {top2 ? (
              <div className="flex flex-col items-center text-center space-y-2 p-3 sm:p-4 rounded-2xl bg-stone-50 dark:bg-[#262525] border border-stone-300 dark:border-[#393939] relative shadow-xs">
                <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-[#393939] border-2 border-stone-400 dark:border-stone-500 flex items-center justify-center text-stone-700 dark:text-[#D4D2D2] font-black text-xs absolute -top-4 shadow-xs">
                  <Medal className="w-4 h-4 text-stone-600 dark:text-[#FCFCFC]" />
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-stone-300 dark:border-stone-500 mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={top2.avatarUrl} alt={top2.displayName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC] truncate max-w-[100px]">
                    {top2.displayName} {top2.userId === user.id && '(You)'}
                  </p>
                  <p className="text-[11px] font-black text-stone-600 dark:text-[#B5B2B2]">{top2.totalXp.toLocaleString()} XP</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-[#393939] text-[10px] font-black text-stone-700 dark:text-[#D4D2D2]">
                  2ND
                </span>
              </div>
            ) : <div />}

            {/* 1ST PLACE (Center - Elevated) */}
            {top1 ? (
              <div className="flex flex-col items-center text-center space-y-2 p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#FFFDF9] dark:from-[#171617] via-[#FFFBF0] dark:via-[#262525] to-amber-500/10 border-2 border-amber-400 dark:border-amber-500 relative shadow-md shadow-amber-500/10 -translate-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-600 dark:text-amber-400 font-black text-sm absolute -top-5 shadow-md">
                  <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 mt-2 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={top1.avatarUrl} alt={top1.displayName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-black text-[#1C1917] dark:text-[#FCFCFC] truncate max-w-[120px]">
                    {top1.displayName} {top1.userId === user.id && '(You)'}
                  </p>
                  <p className="text-xs font-black text-amber-600 dark:text-amber-400">{top1.totalXp.toLocaleString()} XP</p>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                  1ST CHAMPION
                </span>
              </div>
            ) : <div />}

            {/* 3RD PLACE (Right) */}
            {top3 ? (
              <div className="flex flex-col items-center text-center space-y-2 p-3 sm:p-4 rounded-2xl bg-amber-900/5 dark:bg-[#262525] border border-amber-700/30 dark:border-amber-800/40 relative shadow-xs">
                <div className="w-8 h-8 rounded-full bg-amber-700/20 border-2 border-amber-700 flex items-center justify-center text-amber-800 dark:text-amber-300 font-black text-xs absolute -top-4 shadow-xs">
                  <Medal className="w-4 h-4 text-amber-800 dark:text-amber-300" />
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-700/40 mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={top3.avatarUrl} alt={top3.displayName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC] truncate max-w-[100px]">
                    {top3.displayName} {top3.userId === user.id && '(You)'}
                  </p>
                  <p className="text-[11px] font-black text-amber-800 dark:text-amber-400">{top3.totalXp.toLocaleString()} XP</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-700/20 text-[10px] font-black text-amber-900 dark:text-amber-300">
                  3RD
                </span>
              </div>
            ) : <div />}
          </div>
        </div>
      )}

      {/* COMPACT LIST FOR RANKINGS #4+ (or full list if podium empty) */}
      {currentRankedList.length > 0 ? (
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-[#B5B2B2] px-1">
            All Ranked Players ({currentRankedList.length})
          </h4>

          <div className="space-y-2">
            {currentRankedList.map((entry) => (
              <LeaderboardRow
                key={entry.userId}
                entry={entry}
                isCurrentUser={entry.userId === user.id}
                period={activePeriod}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Trophy}
          title="No leaderboard entries yet"
          description="Follow friends to see how your relationship XP stacks up against your social circle!"
          actionLabel="Find Friends"
          onAction={() => window.location.assign('/friends')}
        />
      )}

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#fe1e34]/10 border border-[#fe1e34]/20 flex items-start gap-3 text-xs shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-[#1C1917] dark:text-[#FCFCFC]">Strict Privacy Boundary</p>
          <p className="text-stone-600 dark:text-[#B5B2B2] leading-relaxed">
            Only your XP score and public profile display name appear here. Your personal journal entries, names of people in your private vault, photos, and notes are never exposed to anyone.
          </p>
        </div>
      </div>
    </div>
  );
}
