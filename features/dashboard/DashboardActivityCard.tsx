'use client';

import React from 'react';
import Link from 'next/link';
import { TimelineEvent } from '@/types/domain';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Sparkles, UserPlus, BookOpen, Crown, Trophy } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface DashboardActivityCardProps {
  event: TimelineEvent;
}

export function DashboardActivityCard({ event }: DashboardActivityCardProps) {
  const formattedDate = React.useMemo(() => {
    try {
      const date = parseISO(event.timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return event.timestamp;
    }
  }, [event.timestamp]);

  const renderEventIcon = () => {
    const iconClass = 'w-4 h-4 text-rose-600';
    switch (event.eventType) {
      case 'person_added':
        return <UserPlus className="w-4 h-4 text-blue-600" />;
      case 'milestone_unlocked':
        return <Heart className="w-4 h-4 text-rose-600" />;
      case 'tier_change':
        return <Crown className="w-4 h-4 text-amber-600" />;
      case 'note_memory':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'achievement_unlocked':
        return <Trophy className="w-4 h-4 text-amber-600" />;
      case 'xp_earned':
      default:
        return <Sparkles className="w-4 h-4 text-rose-600" />;
    }
  };

  const title = React.useMemo(() => {
    if (event.activityName) return event.activityName;
    if (event.achievementTitle) return `Unlocked "${event.achievementTitle}"`;
    if (event.eventType === 'person_added') return 'Added to vault';
    if (event.eventType === 'tier_change') return `Tier updated (${event.tier || 'New Tier'})`;
    if (event.eventType === 'note_memory') return 'Private journal note recorded';
    return 'Milestone moment';
  }, [event]);

  return (
    <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] shadow-xs hover:border-[#fe1e34] hover:bg-[#FFF7ED] dark:hover:bg-[#262525] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-4 group">
      {/* Left: Avatar & Milestone info */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Person avatar */}
        {event.personName ? (
          <Link href={event.personId ? `/people/${event.personId}` : '/people'} className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-[#F5EFE6] dark:bg-[#262525] border-2 border-stone-200 dark:border-[#393939] group-hover:border-[#fe1e34] transition-colors shadow-xs">
              {event.personPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.personPhotoUrl} alt={event.personName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-black text-[#fe1e34]">
                  {event.personName.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] flex items-center justify-center shadow-xs">
              {renderEventIcon()}
            </div>
          </Link>
        ) : (
          <div className="w-11 h-11 rounded-2xl bg-[#fe1e34]/10 border border-[#fe1e34]/25 flex items-center justify-center flex-shrink-0">
            {renderEventIcon()}
          </div>
        )}

        {/* Text Details */}
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC] group-hover:text-[#fe1e34] transition-colors truncate">
              {title}
            </h4>
            {event.personName && (
              <span className="text-xs font-semibold text-stone-500 dark:text-[#B5B2B2]">
                with <Link href={event.personId ? `/people/${event.personId}` : '/people'} className="font-bold text-stone-800 dark:text-[#FCFCFC] hover:text-[#fe1e34] underline decoration-stone-300 dark:decoration-stone-600">{event.personName}</Link>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-[#B5B2B2] font-medium">
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3 text-stone-400 dark:text-[#525252]" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Prominent XP Gain Badge */}
      {event.xpAwarded ? (
        <div className="flex-shrink-0 text-right">
          <Badge variant="xp" size="lg" className="shadow-xs shadow-[#fe1e34]/10 bg-[#fe1e34]/10 border border-[#fe1e34]/25 text-[#fe1e34]">
            <Sparkles className="w-3.5 h-3.5 text-[#fe1e34]" />
            <span>+{event.xpAwarded} XP</span>
          </Badge>
        </div>
      ) : null}
    </div>
  );
}
