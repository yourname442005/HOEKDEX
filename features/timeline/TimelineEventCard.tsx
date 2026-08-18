'use client';

import React from 'react';
import Link from 'next/link';
import { TimelineEvent } from '@/types/domain';
import { TierBadge } from '@/components/shared/TierBadge';
import { Badge } from '@/components/ui/badge';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { cn } from '@/lib/utils';
import {
  UserPlus,
  Heart,
  Sparkles,
  BookOpen,
  Crown,
  Trophy,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';

interface TimelineEventCardProps {
  event: TimelineEvent;
}

export function TimelineEventCard({ event }: TimelineEventCardProps) {
  const formattedDate = React.useMemo(() => {
    try {
      return format(new Date(event.timestamp), 'MMM d, yyyy · h:mm a');
    } catch {
      return event.timestamp;
    }
  }, [event.timestamp]);

  const renderEventIcon = () => {
    switch (event.eventType) {
      case 'person_added':
        return (
          <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-600 flex items-center justify-center shadow-inner">
            <UserPlus className="w-5 h-5" />
          </div>
        );
      case 'milestone_unlocked':
        return (
          <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 flex items-center justify-center shadow-inner">
            <Heart className="w-5 h-5" />
          </div>
        );
      case 'tier_change':
        return (
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shadow-inner">
            <Crown className="w-5 h-5" />
          </div>
        );
      case 'note_memory':
        return (
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 flex items-center justify-center shadow-inner">
            <BookOpen className="w-5 h-5" />
          </div>
        );
      case 'achievement_unlocked':
        return (
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-600 flex items-center justify-center shadow-inner">
            <Trophy className="w-5 h-5" />
          </div>
        );
      case 'xp_earned':
      default:
        return (
          <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 flex items-center justify-center shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
        );
    }
  };

  const getEventBorderClass = () => {
    switch (event.eventType) {
      case 'person_added':
        return 'border-blue-200/80 hover:border-blue-400 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9] to-blue-50/30';
      case 'milestone_unlocked':
        return 'border-rose-300/80 hover:border-rose-400 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9] to-rose-50/40';
      case 'tier_change':
        return 'border-amber-300/80 hover:border-amber-400 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9] to-amber-50/30';
      case 'achievement_unlocked':
        return 'border-amber-400/80 hover:border-amber-500 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9] to-amber-50/40';
      case 'note_memory':
        return 'border-emerald-200/80 hover:border-emerald-400 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9] to-emerald-50/30';
      default:
        return 'border-[#E7E0D8] hover:border-stone-400 bg-[#FFFDF9]';
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 group">
      {/* Timeline Node Line Connector */}
      <div className="absolute left-2.5 sm:left-3.5 top-0 bottom-0 w-0.5 bg-[#E7E0D8] group-last:bottom-1/2" />
      <div className="absolute left-1 sm:left-2 top-5 w-3.5 h-3.5 rounded-full bg-[#FFFDF9] border-2 border-rose-500 z-10 shadow-xs" />

      {/* Memory Card */}
      <div className={cn('p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-xs hover:-translate-y-0.5', getEventBorderClass())}>
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Event Icon */}
          <div className="flex-shrink-0">{renderEventIcon()}</div>

          {/* Event Content */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                {/* Person Added */}
                {event.eventType === 'person_added' && (
                  <p className="text-sm font-extrabold text-[#1C1917]">
                    Recorded{' '}
                    {event.personId ? (
                      <Link
                        href={`/people/${event.personId}`}
                        className="text-rose-600 hover:underline"
                      >
                        {event.personName}
                      </Link>
                    ) : (
                      event.personName
                    )}{' '}
                    in your private vault
                  </p>
                )}

                {/* Milestone Unlocked */}
                {event.eventType === 'milestone_unlocked' && (
                  <p className="text-sm font-extrabold text-[#1C1917]">
                    Logged &ldquo;{event.activityName}&rdquo; with{' '}
                    {event.personId ? (
                      <Link
                        href={`/people/${event.personId}`}
                        className="text-rose-600 hover:underline"
                      >
                        {event.personName}
                      </Link>
                    ) : (
                      event.personName
                    )}
                  </p>
                )}

                {/* Tier Change */}
                {event.eventType === 'tier_change' && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-extrabold text-[#1C1917]">
                      Promoted {event.personName} to tier:
                    </span>
                    {event.tier && <TierBadge tier={event.tier} size="sm" />}
                  </div>
                )}

                {/* Note Memory */}
                {event.eventType === 'note_memory' && (
                  <p className="text-sm font-extrabold text-[#1C1917]">
                    Saved private memory note for{' '}
                    {event.personId ? (
                      <Link
                        href={`/people/${event.personId}`}
                        className="text-rose-600 hover:underline"
                      >
                        {event.personName}
                      </Link>
                    ) : (
                      event.personName
                    )}
                  </p>
                )}

                {/* Achievement Unlocked */}
                {event.eventType === 'achievement_unlocked' && (
                  <p className="text-sm font-extrabold text-amber-700">
                    🏆 Trophy Unlocked: &ldquo;{event.achievementTitle}&rdquo;
                  </p>
                )}
              </div>

              {/* XP Badge if earned */}
              {event.xpAwarded ? (
                <Badge variant="xp" size="sm">
                  <Sparkles className="w-3 h-3 text-rose-600" />
                  <span>+{event.xpAwarded} XP</span>
                </Badge>
              ) : null}
            </div>

            {/* Note Snippet */}
            {event.noteText && (
              <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E7E0D8] text-xs text-stone-700 leading-relaxed italic font-medium">
                &ldquo;{event.noteText}&rdquo;
              </div>
            )}

            {/* Date & Privacy Indicator */}
            <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 pt-1 border-t border-[#E7E0D8]/60">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{formattedDate}</span>
              </div>
              <PrivacyLock size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
