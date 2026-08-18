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
        return 'border-blue-200/80 dark:border-blue-900/60 hover:border-blue-400 bg-gradient-to-r from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-blue-50/30 dark:to-[#262525]';
      case 'milestone_unlocked':
        return 'border-[#fe1e34]/30 hover:border-[#fe1e34] bg-gradient-to-r from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-rose-50/40 dark:to-[#262525]';
      case 'tier_change':
        return 'border-amber-300/80 dark:border-amber-900/60 hover:border-amber-400 bg-gradient-to-r from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-amber-50/30 dark:to-[#262525]';
      case 'achievement_unlocked':
        return 'border-amber-400/80 dark:border-amber-800/80 hover:border-amber-500 bg-gradient-to-r from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-amber-50/40 dark:to-[#262525]';
      case 'note_memory':
        return 'border-emerald-200/80 dark:border-emerald-900/60 hover:border-emerald-400 bg-gradient-to-r from-[#FFFDF9] dark:from-[#171617] via-[#FFFDF9] dark:via-[#171617] to-emerald-50/30 dark:to-[#262525]';
      default:
        return 'border-[#E7E0D8] dark:border-[#393939] hover:border-stone-400 dark:hover:border-stone-500 bg-[#FFFDF9] dark:bg-[#171617]';
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 group">
      {/* Timeline Node Line Connector */}
      <div className="absolute left-2.5 sm:left-3.5 top-0 bottom-0 w-0.5 bg-[#E7E0D8] dark:bg-[#393939] group-last:bottom-1/2" />
      <div className="absolute left-1 sm:left-2 top-5 w-3.5 h-3.5 rounded-full bg-[#FFFDF9] dark:bg-[#171617] border-2 border-[#fe1e34] z-10 shadow-xs" />

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
                  <p className="text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">
                    Recorded{' '}
                    {event.personId ? (
                      <Link
                        href={`/people/${event.personId}`}
                        className="text-[#fe1e34] hover:underline"
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
                  <p className="text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">
                    Logged &ldquo;{event.activityName}&rdquo; with{' '}
                    {event.personId ? (
                      <Link
                        href={`/people/${event.personId}`}
                        className="text-[#fe1e34] hover:underline"
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
                    <span className="text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">
                      Promoted {event.personName} to tier:
                    </span>
                    {event.tier && <TierBadge tier={event.tier} size="sm" />}
                  </div>
                )}

                {/* Note Memory */}
                {event.eventType === 'note_memory' && (
                  <p className="text-sm font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">
                    Saved private memory note for{' '}
                    {event.personId ? (
                      <Link
                        href={`/people/${event.personId}`}
                        className="text-[#fe1e34] hover:underline"
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
                  <p className="text-sm font-extrabold text-amber-700 dark:text-amber-400">
                    🏆 Trophy Unlocked: &ldquo;{event.achievementTitle}&rdquo;
                  </p>
                )}
              </div>

              {/* XP Badge if earned */}
              {event.xpAwarded ? (
                <Badge variant="xp" size="sm" className="bg-[#fe1e34]/10 border border-[#fe1e34]/25 text-[#fe1e34]">
                  <Sparkles className="w-3 h-3 text-[#fe1e34]" />
                  <span>+{event.xpAwarded} XP</span>
                </Badge>
              ) : null}
            </div>

            {/* Note Snippet */}
            {event.noteText && (
              <div className="p-3 rounded-xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-xs text-stone-700 dark:text-[#D4D2D2] leading-relaxed italic font-medium">
                &ldquo;{event.noteText}&rdquo;
              </div>
            )}

            {/* Date & Privacy Indicator */}
            <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-[#B5B2B2] pt-1 border-t border-[#E7E0D8]/60 dark:border-[#393939]">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3 h-3 text-stone-400 dark:text-[#525252]" />
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
