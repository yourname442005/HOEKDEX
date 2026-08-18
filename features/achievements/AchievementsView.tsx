'use client';

import React, { useState } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { PageHeader } from '@/components/shared/PageHeader';
import { AchievementCard } from './AchievementCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Trophy, Sparkles, Award, Crown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AchievementsView() {
  const { achievements } = useHoekdex();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'in_progress' | 'locked' | 'legendary'>('all');

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const inProgressCount = achievements.filter((a) => !a.isUnlocked && a.currentProgress > 0).length;
  const lockedCount = achievements.filter((a) => !a.isUnlocked && a.currentProgress === 0).length;
  const legendaryCount = achievements.filter((a) => a.category === 'special' || a.xpReward >= 1000).length;

  const totalBonusXp = achievements
    .filter((a) => a.isUnlocked)
    .reduce((acc, a) => acc + a.xpReward, 0);

  const filteredAchievements = achievements.filter((a) => {
    if (activeFilter === 'unlocked') return a.isUnlocked;
    if (activeFilter === 'in_progress') return !a.isUnlocked && a.currentProgress > 0;
    if (activeFilter === 'locked') return !a.isUnlocked && a.currentProgress === 0;
    if (activeFilter === 'legendary') return a.category === 'special' || a.xpReward >= 1000;
    return true;
  });

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-widest block font-bold mb-1">
          // YOUR PROGRESS
        </span>
        <PageHeader
          title="Trophy Vault & Achievements"
          description="Collectible rewards earned by logging milestone moments, discovering connections, and staying dedicated."
          badge={
            <span className="px-3 py-1 text-xs font-black bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-400 rounded-full">
              {unlockedCount} / {achievements.length} Collected
            </span>
          }
        />
      </div>

      {/* Summary Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shadow-inner">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-caption text-stone-500 dark:text-[#B5B2B2]">Trophies Unlocked</p>
            <p className="text-xl font-black text-[#1C1917] dark:text-[#FCFCFC]">
              {unlockedCount} <span className="text-xs font-bold text-stone-500 dark:text-[#B5B2B2]">/ {achievements.length}</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-[#fe1e34]/15 border border-[#fe1e34]/30 flex items-center justify-center text-[#fe1e34] shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-caption text-stone-500 dark:text-[#B5B2B2]">Bonus Trophy XP</p>
            <p className="text-xl font-black text-[#fe1e34]">+{totalBonusXp} XP</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-caption text-stone-500 dark:text-[#B5B2B2]">Vault Mastery</p>
            <p className="text-xl font-black text-[#1C1917] dark:text-[#FCFCFC]">
              {Math.round((unlockedCount / Math.max(achievements.length, 1)) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none',
            activeFilter === 'all'
              ? 'bg-[#fe1e34] text-white shadow-md shadow-[#fe1e34]/20'
              : 'bg-[#F5EFE6] dark:bg-[#262525] text-stone-600 dark:text-[#B5B2B2] hover:text-stone-900 dark:hover:text-[#FCFCFC] border border-[#E7E0D8] dark:border-[#393939]'
          )}
        >
          All ({achievements.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('unlocked')}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none',
            activeFilter === 'unlocked'
              ? 'bg-[#fe1e34] text-white shadow-md shadow-[#fe1e34]/20'
              : 'bg-[#F5EFE6] dark:bg-[#262525] text-stone-600 dark:text-[#B5B2B2] hover:text-stone-900 dark:hover:text-[#FCFCFC] border border-[#E7E0D8] dark:border-[#393939]'
          )}
        >
          Unlocked ({unlockedCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('in_progress')}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none',
            activeFilter === 'in_progress'
              ? 'bg-[#fe1e34] text-white shadow-md shadow-[#fe1e34]/20'
              : 'bg-[#F5EFE6] dark:bg-[#262525] text-stone-600 dark:text-[#B5B2B2] hover:text-stone-900 dark:hover:text-[#FCFCFC] border border-[#E7E0D8] dark:border-[#393939]'
          )}
        >
          In Progress ({inProgressCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('legendary')}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none inline-flex items-center gap-1',
            activeFilter === 'legendary'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
          )}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>Legendary ({legendaryCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('locked')}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none',
            activeFilter === 'locked'
              ? 'bg-[#fe1e34] text-white shadow-md shadow-[#fe1e34]/20'
              : 'bg-[#F5EFE6] dark:bg-[#262525] text-stone-600 dark:text-[#B5B2B2] hover:text-stone-900 dark:hover:text-[#FCFCFC] border border-[#E7E0D8] dark:border-[#393939]'
          )}
        >
          Locked ({lockedCount})
        </button>
      </div>

      {/* Collectibles Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Trophy}
          title="No trophies in this filter"
          description="Switch filters to explore other locked or unlocked achievements."
          actionLabel="Show All Trophies"
          onAction={() => setActiveFilter('all')}
        />
      )}
    </div>
  );
}
