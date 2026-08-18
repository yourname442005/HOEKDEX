'use client';

import React from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Flame, CalendarHeart, Users, Medal, Award, Sparkles, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CollectibleAchievementsWidget() {
  const { achievements } = useHoekdex();

  // Show top 3 featured achievements (unlocked + next up in progress)
  const featured = [...achievements]
    .sort((a, b) => {
      if (a.isUnlocked && !b.isUnlocked) return -1;
      if (!a.isUnlocked && b.isUnlocked) return 1;
      const progressRatioA = a.currentProgress / a.maxProgress;
      const progressRatioB = b.currentProgress / b.maxProgress;
      return progressRatioB - progressRatioA;
    })
    .slice(0, 3);

  const renderIcon = (iconName: string, isUnlocked: boolean) => {
    const iconClass = cn('w-5 h-5', isUnlocked ? 'text-rose-600' : 'text-stone-400');
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

  return (
    <Card variant="default" padding="default" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-h3 text-[#1C1917]">Collectible Trophies</h3>
        </div>
        <Link
          href="/achievements"
          className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-500"
        >
          <span>Vault ({achievements.filter((a) => a.isUnlocked).length}/{achievements.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {featured.map((ach) => {
          const isUnlocked = ach.isUnlocked;
          const progressPct = Math.min(
            Math.round((ach.currentProgress / ach.maxProgress) * 100),
            100
          );

          return (
            <Link
              key={ach.id}
              href="/achievements"
              className={cn(
                'p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer group',
                isUnlocked
                  ? 'bg-gradient-to-br from-[#FFFDF9] to-[#FFF1F2] border-rose-300 shadow-xs hover:border-rose-400 hover:-translate-y-0.5'
                  : 'bg-[#FFFDF9] border-[#E7E0D8] opacity-85 hover:opacity-100 hover:border-stone-400 hover:-translate-y-0.5'
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs',
                    isUnlocked
                      ? 'bg-rose-500/15 border-rose-500/30 text-rose-600'
                      : 'bg-[#F5EFE6] border-[#E7E0D8] text-stone-400'
                  )}
                >
                  {isUnlocked ? renderIcon(ach.icon, true) : <Lock className="w-4 h-4 text-stone-400" />}
                </div>

                <Badge
                  variant={isUnlocked ? 'achievement' : 'outline'}
                  size="sm"
                >
                  +{ach.xpReward} XP
                </Badge>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-[#1C1917] truncate group-hover:text-rose-600 transition-colors">
                    {ach.title}
                  </h4>
                  {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2 leading-tight">
                  {ach.description}
                </p>
              </div>

              {/* Progress bar if locked */}
              {!isUnlocked && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-stone-500">
                    <span>Progress</span>
                    <span>{ach.currentProgress}/{ach.maxProgress}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F5EFE6] rounded-full overflow-hidden border border-[#E7E0D8]">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
