'use client';

import React from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { Trophy, ChevronRight, Sparkles } from 'lucide-react';

export function NextAchievementTeaser() {
  const { achievements } = useHoekdex();

  // Find closest locked or in-progress achievement
  const closest = achievements
    .filter((a) => !a.isUnlocked)
    .sort((a, b) => {
      const remainingA = a.maxProgress - a.currentProgress;
      const remainingB = b.maxProgress - b.currentProgress;
      return remainingA - remainingB;
    })[0];

  if (!closest) {
    return (
      <div className="p-5 rounded-3xl bg-[#FFFDF9] border border-amber-500/40 text-center space-y-2 shadow-xs">
        <Trophy className="w-8 h-8 text-amber-500 mx-auto" />
        <h4 className="text-sm font-bold text-[#1C1917]">All Trophies Mastered!</h4>
        <p className="text-xs text-stone-500">You have completed all available achievements.</p>
      </div>
    );
  }

  const progressPct = Math.min(
    Math.round((closest.currentProgress / closest.maxProgress) * 100),
    100
  );

  return (
    <Link
      href="/achievements"
      className="block p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] hover:border-rose-400 hover:bg-[#FFF7ED] transition-all group shadow-xs"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600">
            <Trophy className="w-4 h-4" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-rose-600">
            Next Milestone Goal
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-rose-600 group-hover:text-rose-500">
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-[#1C1917] group-hover:text-rose-600 transition-colors">
            {closest.title}
          </h4>
          <span className="text-xs font-black text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/25">
            +{closest.xpReward} XP
          </span>
        </div>

        <p className="text-xs text-stone-600 font-medium leading-relaxed">
          {closest.description}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-1.5 pt-3">
        <div className="flex items-center justify-between text-[11px] font-bold text-stone-500">
          <span>{closest.criteria}</span>
          <span>
            {closest.currentProgress} / {closest.maxProgress} ({progressPct}%)
          </span>
        </div>

        <div className="h-2 w-full bg-[#F5EFE6] rounded-full overflow-hidden border border-[#E7E0D8]">
          <div
            className="h-full bg-gradient-to-r from-rose-600 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
