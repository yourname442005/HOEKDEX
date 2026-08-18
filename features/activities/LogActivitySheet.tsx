'use client';

import React, { useState } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { Person, ActivityCategory } from '@/types/domain';
import { STANDARD_ACTIVITIES } from '@/lib/constants';
import { ActivityRow } from './ActivityRow';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { X, Sparkles, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogActivitySheetProps {
  isOpen: boolean;
  person: Person;
  onClose: () => void;
}

export function LogActivitySheet({ isOpen, person, onClose }: LogActivitySheetProps) {
  const { logActivity } = useHoekdex();

  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [dateOfActivity, setDateOfActivity] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const claimedIds = new Set(person.activitiesClaimed.map((a) => a.activityId));
  const selectedActivity = STANDARD_ACTIVITIES.find((a) => a.id === selectedActivityId);

  const categories: Array<'All' | ActivityCategory> = [
    'All',
    'First Impressions',
    'Dates & Hangouts',
    'Milestones & Intimacy',
    'Commitment & Special',
  ];

  const filteredActivities = STANDARD_ACTIVITIES.filter((act) => {
    if (activeCategory === 'All') return true;
    return act.category === activeCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivityId) return;

    setIsSubmitting(true);
    try {
      await logActivity(person.id, {
        activityId: selectedActivityId,
        dateOfActivity,
        note: note.trim() || undefined,
      });

      // Reset
      setSelectedActivityId(null);
      setNote('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="log-activity-sheet-title"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg h-full bg-[#FFFDF9] border-l border-[#E7E0D8] flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-[#E7E0D8] bg-[#F5EFE6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="log-activity-sheet-title" className="text-lg font-black text-[#1C1917] tracking-tight">
                    Log Milestone with {person.name}
                  </h2>
                  <PrivacyLock size="sm" />
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Claim an activity milestone and earn XP
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer',
                  activeCategory === cat
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                    : 'bg-[#FFFDF9] text-stone-600 hover:text-stone-900 border border-[#E7E0D8]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Activity List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {filteredActivities.map((activity) => {
            const isClaimed = claimedIds.has(activity.id);
            const isSelected = selectedActivityId === activity.id;

            return (
              <ActivityRow
                key={activity.id}
                activity={activity}
                isClaimed={isClaimed}
                isSelected={isSelected}
                onSelect={() => setSelectedActivityId(activity.id)}
              />
            );
          })}
        </div>

        {/* Bottom Submission Details Panel */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 border-t border-[#E7E0D8] bg-[#F5EFE6] space-y-3">
          {selectedActivity ? (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-rose-600 tracking-wider">
                  Selected Milestone
                </span>
                <p className="text-xs font-bold text-[#1C1917]">{selectedActivity.name}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  +{selectedActivity.xp} XP Preview
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-center text-stone-500 font-medium py-1">
              Select an available milestone from the list above
            </p>
          )}

          {selectedActivity && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#E7E0D8] rounded-xl px-3 py-1.5">
                  <Calendar className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <input
                    type="date"
                    value={dateOfActivity}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDateOfActivity(e.target.value)}
                    className="bg-transparent text-xs text-[#1C1917] focus:outline-none w-full cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#E7E0D8] rounded-xl px-3 py-1.5">
                  <FileText className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Short memory note (optional)"
                    maxLength={500}
                    className="bg-transparent text-xs text-[#1C1917] placeholder-stone-400 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedActivityId || isSubmitting}
              className="px-6 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed rounded-full shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Logging...' : 'Confirm & Claim XP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
