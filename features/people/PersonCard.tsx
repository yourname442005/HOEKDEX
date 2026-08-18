'use client';

import React from 'react';
import Link from 'next/link';
import { Person } from '@/types/domain';
import { TierBadge } from '@/components/shared/TierBadge';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { Sparkles, CheckCircle2, Calendar, Heart, Star, Coffee } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const formattedDate = person.dateFirstMet
    ? format(new Date(person.dateFirstMet), 'MMM d, yyyy')
    : null;

  const getTierCardStyle = () => {
    switch (person.tier) {
      case 'Legendary':
        return 'bg-gradient-to-br from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-rose-50/60 dark:to-[#262525] border-[#fe1e34]/80 shadow-md shadow-[#fe1e34]/10 hover:border-[#fe1e34] hover:shadow-lg';
      case 'Master':
        return 'bg-gradient-to-br from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-purple-50/50 dark:to-[#262525] border-purple-300/70 dark:border-purple-800/70 shadow-xs hover:border-purple-400';
      case 'Elite':
        return 'bg-gradient-to-br from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-blue-50/50 dark:to-[#262525] border-blue-300/70 dark:border-blue-800/70 shadow-xs hover:border-blue-400';
      case 'Good':
        return 'bg-gradient-to-br from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-emerald-50/50 dark:to-[#262525] border-emerald-300/70 dark:border-emerald-800/70 shadow-xs hover:border-emerald-400';
      case 'Beginner':
      default:
        return 'bg-[#FFFDF9] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] shadow-xs hover:border-[#fe1e34] hover:bg-[#FFF7ED] dark:hover:bg-[#262525]';
    }
  };

  const getCategoryIcon = () => {
    switch (person.category) {
      case 'Dating':
        return <Heart className="w-3.5 h-3.5 text-[#fe1e34]" />;
      case 'Social':
        return <Star className="w-3.5 h-3.5 text-amber-500" />;
      case 'Work':
        return <Coffee className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-stone-500 dark:text-[#B5B2B2]" />;
    }
  };

  return (
    <Link
      href={`/people/${person.id}`}
      className={cn(
        'group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden',
        getTierCardStyle()
      )}
    >
      {/* Top Header: Privacy Lock & Tier Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <PrivacyLock size="sm" showLabel />
        <TierBadge tier={person.tier} size="sm" />
      </div>

      {/* Identity Row: Avatar & Name/Nickname */}
      <div className="flex items-center gap-3.5 my-2">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#F5EFE6] dark:bg-[#262525] border-2 border-stone-200/80 dark:border-[#393939] group-hover:border-[#fe1e34] transition-colors flex-shrink-0 shadow-xs">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#fe1e34]">
              {person.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-extrabold text-[#1C1917] dark:text-[#FCFCFC] truncate group-hover:text-[#fe1e34] transition-colors">
              {person.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            {person.category && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 dark:text-[#D4D2D2] bg-[#F5EFE6] dark:bg-[#262525] px-2 py-0.5 rounded-full border border-[#E7E0D8] dark:border-[#393939]">
                {getCategoryIcon()}
                <span>{person.category}</span>
              </span>
            )}
            {person.socialHandle && (
              <span className="text-[11px] font-mono text-stone-500 dark:text-[#B5B2B2] truncate max-w-[100px]">
                {person.socialHandle}
              </span>
            )}
          </div>

          {formattedDate && (
            <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-[#B5B2B2] font-medium mt-1">
              <Calendar className="w-3 h-3 text-stone-400 dark:text-[#525252]" />
              <span>Met {formattedDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress & Milestone Footer */}
      <div className="pt-3 mt-3 border-t border-[#E7E0D8] dark:border-[#393939] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 font-extrabold text-[#fe1e34] bg-[#fe1e34]/10 px-2.5 py-0.5 rounded-full border border-[#fe1e34]/25">
          <Sparkles className="w-3.5 h-3.5 text-[#fe1e34]" />
          <span>{person.xpFromPerson} XP</span>
        </div>

        <div className="flex items-center gap-1 font-bold text-stone-600 dark:text-[#B5B2B2]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{person.activitiesClaimed.length} claimed</span>
        </div>
      </div>
    </Link>
  );
}
