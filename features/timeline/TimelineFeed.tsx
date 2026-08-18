'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useHoekdex } from '@/context/hoekdex-context';
import { TimelineEventType } from '@/types/domain';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { TimelineEventCard } from './TimelineEventCard';
import { Clock, Filter, Sparkles, UserPlus, Heart, Crown, BookOpen, Trophy, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TimelineFeed() {
  const searchParams = useSearchParams();
  const personQuery = searchParams.get('person');

  const { timeline, people } = useHoekdex();

  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedPersonId, setSelectedPersonId] = useState<string>(personQuery || 'all');
  const [visibleLimit, setVisibleLimit] = useState(20);

  const eventTypes: Array<{ id: string; label: string; icon?: React.ReactNode }> = [
    { id: 'all', label: 'All Journal Events' },
    { id: 'milestone_unlocked', label: 'Milestones', icon: <Heart className="w-3.5 h-3.5 text-rose-600" /> },
    { id: 'person_added', label: 'People Added', icon: <UserPlus className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'tier_change', label: 'Tier Changes', icon: <Crown className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 'note_memory', label: 'Private Notes', icon: <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'achievement_unlocked', label: 'Trophies', icon: <Trophy className="w-3.5 h-3.5 text-amber-600" /> },
  ];

  const filteredEvents = useMemo(() => {
    return timeline.filter((evt) => {
      // Event Type filter
      if (selectedEventType !== 'all' && evt.eventType !== selectedEventType) {
        return false;
      }
      // Person filter
      if (selectedPersonId !== 'all' && evt.personId !== selectedPersonId) {
        return false;
      }
      return true;
    });
  }, [timeline, selectedEventType, selectedPersonId]);

  const pagedEvents = filteredEvents.slice(0, visibleLimit);
  const hasMore = visibleLimit < filteredEvents.length;

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-widest block font-bold mb-1">
          // YOUR MOMENTS
        </span>
        <PageHeader
          title="Personal Memory Journal"
          description="A private chronological history of your dating memories, milestone moments, and achievements."
          showPrivacyLock
          privacyTooltip="Your timeline entries are completely private and confidential."
          badge={
            <span className="px-3 py-1 text-xs font-black bg-[#fe1e34]/10 border border-[#fe1e34]/25 text-[#fe1e34] rounded-full">
              {timeline.length} Journal Entries
            </span>
          }
        />
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-3.5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Person Selector Filter */}
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[#fe1e34]" />
            <span className="text-xs font-bold text-stone-600 dark:text-[#B5B2B2]">Filter Person:</span>
            <select
              value={selectedPersonId}
              onChange={(e) => setSelectedPersonId(e.target.value)}
              className="px-3.5 py-1.5 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] rounded-xl text-xs font-bold text-[#1C1917] dark:text-[#FCFCFC] focus:outline-none focus:border-[#fe1e34] cursor-pointer"
            >
              <option value="all" className="dark:bg-[#171617]">All Vault Records ({people.length})</option>
              {people.map((p) => (
                <option key={p.id} value={p.id} className="dark:bg-[#171617]">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {(selectedEventType !== 'all' || selectedPersonId !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSelectedEventType('all');
                setSelectedPersonId('all');
              }}
              className="text-xs font-bold text-[#fe1e34] hover:underline cursor-pointer"
            >
              Clear Journal Filters
            </button>
          )}
        </div>

        {/* Event Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {eventTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedEventType(type.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none',
                selectedEventType === type.id
                  ? 'bg-[#fe1e34] text-white shadow-sm shadow-[#fe1e34]/20'
                  : 'bg-[#F5EFE6] dark:bg-[#262525] text-stone-600 dark:text-[#B5B2B2] hover:text-stone-900 dark:hover:text-[#FCFCFC] border border-[#E7E0D8] dark:border-[#393939]'
              )}
            >
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Feed Container */}
      {pagedEvents.length > 0 ? (
        <div className="space-y-4 pt-2">
          {pagedEvents.map((evt) => (
            <TimelineEventCard key={evt.id} event={evt} />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={() => setVisibleLimit((prev) => prev + 20)}
                className="px-6 py-2.5 rounded-full bg-[#FFFDF9] dark:bg-[#171617] hover:bg-[#F5EFE6] dark:hover:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-xs font-extrabold text-stone-700 dark:text-[#D4D2D2] transition-colors cursor-pointer shadow-xs"
              >
                Load Older Memories ({filteredEvents.length - visibleLimit} remaining)
              </button>
            </div>
          )}
        </div>
      ) : timeline.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="First one in the timeline"
          description="Add a person to your vault and log your first milestone to see your relationship journal appear here."
          actionLabel="Go to My People"
          onAction={() => window.location.assign('/people')}
        />
      ) : (
        <EmptyState
          icon={Filter}
          title="No journal events match your filters"
          description="Try switching the selected person or event type filter above."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedEventType('all');
            setSelectedPersonId('all');
          }}
        />
      )}
    </div>
  );
}
