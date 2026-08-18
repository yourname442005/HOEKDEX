'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { XPOverviewCard } from './XPOverviewCard';
import { CollectibleAchievementsWidget } from './CollectibleAchievementsWidget';
import { DashboardActivityCard } from './DashboardActivityCard';
import { CollectionVaultSummary } from './CollectionVaultSummary';
import { SocialLeaderboardWidget } from './SocialLeaderboardWidget';
import { AddPersonSheet } from '../people/AddPersonSheet';
import { LogActivitySheet } from '../activities/LogActivitySheet';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Plus,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Gamepad2,
  CalendarHeart,
} from 'lucide-react';

export function DashboardView() {
  const { user, timeline, people } = useHoekdex();
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);

  const recentTimeline = timeline.slice(0, 5);

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-7xl mx-auto">
      {/* 1. Header / Game Greeting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-600 text-xs font-black uppercase tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5" />
              Game Vault Command Center
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-xs font-semibold text-stone-600">
              Personal Relationship Journal
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            Welcome back, {user.displayName}! 👋
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Your private relationship vault is encrypted and active. Log milestone moments to earn XP and level up.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <Button
            variant="outline"
            size="default"
            onClick={() => {
              if (people.length === 0) {
                setIsAddPersonOpen(true);
              } else {
                setIsLogActivityOpen(true);
              }
            }}
            className="shadow-xs"
          >
            <CalendarHeart className="w-4 h-4 text-rose-600" />
            <span>Log Milestone</span>
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={() => setIsAddPersonOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Connection</span>
          </Button>
        </div>
      </div>

      {/* 2. Visually Dominant Hero XP Progression Area */}
      <XPOverviewCard onOpenAddPerson={() => setIsAddPersonOpen(true)} />

      {/* 3. Collectible Trophy Vault Showcase */}
      <CollectibleAchievementsWidget />

      {/* 4. Two-column Main Feed: Recent Activity + Personal Collection & Social Standing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Recent Activity Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="text-h3 text-[#1C1917]">Recent Memory Activity</h2>
            </div>

            <Link
              href="/timeline"
              className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-500"
            >
              <span>Full Journal History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentTimeline.length > 0 ? (
            <div className="space-y-3">
              {recentTimeline.map((evt) => (
                <DashboardActivityCard key={evt.id} event={evt} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-dashed border-[#E7E0D8] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1C1917]">Your journal is waiting for its first memory</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Add a person to your private vault, then log a conversation or date to earn your first XP boost!
              </p>
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsAddPersonOpen(true)}
              >
                Add First Connection
              </Button>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Personal Vault Summary & Social Leaderboard */}
        <div className="lg:col-span-5 space-y-6">
          <CollectionVaultSummary onOpenAddPerson={() => setIsAddPersonOpen(true)} />
          <SocialLeaderboardWidget />
        </div>
      </div>

      {/* Modals & Drawers */}
      <AddPersonSheet
        isOpen={isAddPersonOpen}
        onClose={() => setIsAddPersonOpen(false)}
      />

      {people.length > 0 && (
        <LogActivitySheet
          isOpen={isLogActivityOpen}
          person={people[0]}
          onClose={() => setIsLogActivityOpen(false)}
        />
      )}
    </div>
  );
}
