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
        return 'bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-rose-50/60 border-rose-400/80 shadow-md shadow-rose-500/10 hover:border-rose-500 hover:shadow-lg';
      case 'Master':
        return 'bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-purple-50/50 border-purple-300/70 shadow-xs hover:border-purple-400';
      case 'Elite':
        return 'bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-blue-50/50 border-blue-300/70 shadow-xs hover:border-blue-400';
      case 'Good':
        return 'bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-emerald-50/50 border-emerald-300/70 shadow-xs hover:border-emerald-400';
      case 'Beginner':
      default:
        return 'bg-[#FFFDF9] border-[#E7E0D8] shadow-xs hover:border-rose-400 hover:bg-[#FFF7ED]';
    }
  };

  const getCategoryIcon = () => {
    switch (person.category) {
      case 'Dating':
        return <Heart className="w-3.5 h-3.5 text-rose-600" />;
      case 'Social':
        return <Star className="w-3.5 h-3.5 text-amber-500" />;
      case 'Work':
        return <Coffee className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-stone-500" />;
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
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#F5EFE6] border-2 border-stone-200/80 group-hover:border-rose-400 transition-colors flex-shrink-0 shadow-xs">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-black text-rose-600">
              {person.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-extrabold text-[#1C1917] truncate group-hover:text-rose-600 transition-colors">
              {person.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            {person.category && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 bg-[#F5EFE6] px-2 py-0.5 rounded-full border border-[#E7E0D8]">
                {getCategoryIcon()}
                <span>{person.category}</span>
              </span>
            )}
            {person.socialHandle && (
              <span className="text-[11px] font-mono text-stone-500 truncate max-w-[100px]">
                {person.socialHandle}
              </span>
            )}
          </div>

          {formattedDate && (
            <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium mt-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              <span>Met {formattedDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress & Milestone Footer */}
      <div className="pt-3 mt-3 border-t border-[#E7E0D8] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 font-extrabold text-rose-600 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/25">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>{person.xpFromPerson} XP</span>
        </div>

        <div className="flex items-center gap-1 font-bold text-stone-600">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{person.activitiesClaimed.length} claimed</span>
        </div>
      </div>
    </Link>
  );
}
