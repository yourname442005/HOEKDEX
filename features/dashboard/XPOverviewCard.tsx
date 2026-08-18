'use client';

import React from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { Tier } from '@/types/domain';
import { TierBadge } from '@/components/shared/TierBadge';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy, Plus, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { TIER_CONFIG } from '@/lib/constants';

interface XPOverviewCardProps {
  onOpenAddPerson: () => void;
}

export function XPOverviewCard({ onOpenAddPerson }: XPOverviewCardProps) {
  const { user, dashboardStats, recentXpGain } = useHoekdex();

  const {
    totalXp,
    prevThresholdXp,
    nextThresholdXp,
  } = dashboardStats;

  const currentTier: Tier = totalXp >= 10000 ? 'Legendary' : totalXp >= 5000 ? 'Master' : totalXp >= 2000 ? 'Elite' : totalXp >= 500 ? 'Good' : 'Beginner';
  const nextTier = currentTier === 'Beginner' ? 'Good' : currentTier === 'Good' ? 'Elite' : currentTier === 'Elite' ? 'Master' : currentTier === 'Master' ? 'Legendary' : null;

  const range = Math.max(nextThresholdXp - prevThresholdXp, 1);
  const currentInTier = Math.max(0, totalXp - prevThresholdXp);
  const percentage = Math.min(Math.max((currentInTier / range) * 100, 0), 100);
  const xpNeeded = Math.max(0, nextThresholdXp - totalXp);

  // Personality copy helper based on tier and progress
  const getMotivationalCopy = () => {
    if (percentage >= 80) return "So close! Just a few more milestones to level up.";
    if (percentage >= 50) return "You're getting somewhere. Solid relationship progression!";
    if (percentage >= 25) return "Building momentum. Keep logging meaningful moments.";
    return "Your journey is under way. Claim milestones to earn XP!";
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border-2 border-[#fe1e34]/30 shadow-lg shadow-[#fe1e34]/5 overflow-hidden transition-all">
      {/* Ambient background radial glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#fe1e34]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#fe1e34]/15 border border-[#fe1e34]/30 flex items-center justify-center text-[#fe1e34] shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-caption text-[#fe1e34] block font-bold">
              // YOUR PROGRESS
            </span>
            <h2 className="text-h3 text-[#1C1917] dark:text-[#FCFCFC] leading-none">
              Game Progression
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PrivacyLock size="sm" showLabel tooltipText="Your XP ledger is encrypted & private" />
        </div>
      </div>

      {/* Hero Stats Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 relative z-10">
        {/* Left: Huge XP Counter */}
        <div className="md:col-span-6 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
              {totalXp.toLocaleString()}
            </span>
            <span className="text-base font-extrabold text-[#fe1e34] uppercase tracking-wide">
              XP
            </span>
          </div>

          <p className="text-sm font-medium text-stone-600 dark:text-[#B5B2B2]">
            {getMotivationalCopy()}
          </p>
        </div>

        {/* Right: Tier Badge & Next Milestone Target */}
        <div className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-3">
          <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939]">
            <span className="text-xs font-semibold text-stone-500 dark:text-[#B5B2B2] uppercase tracking-wider">
              Current Rank:
            </span>
            <TierBadge tier={currentTier} size="md" />
          </div>

          {nextTier && (
            <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-[#fe1e34]/10 border border-[#fe1e34]/25">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-extrabold text-[#fe1e34]">
                Next: {nextTier}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar & Subtext */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-stone-700 dark:text-[#D4D2D2]">
            {TIER_CONFIG[currentTier]?.label || currentTier} Tier Progress
          </span>
          <span className="text-[#fe1e34] font-extrabold">
            {xpNeeded > 0 ? `${xpNeeded.toLocaleString()} XP to ${nextTier || 'Max Tier'}` : 'Max Tier Achieved! 🎉'}
          </span>
        </div>

        {/* Custom Progress Bar with Gloss Gleam */}
        <Progress value={currentInTier} max={range} className="h-4" />
      </div>

      {/* Bottom CTA & Privacy Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-[#E7E0D8] dark:border-[#393939] text-xs relative z-10">
        <div className="flex items-center gap-2 text-stone-600 dark:text-[#B5B2B2] font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>Claiming milestones levels up your XP without exposing journal records.</span>
        </div>

        <Button
          variant="gamified"
          size="default"
          onClick={onOpenAddPerson}
          className="flex-shrink-0 bg-[#fe1e34] hover:bg-[#e0182d] text-white"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Connection</span>
        </Button>
      </div>
    </div>
  );
}
