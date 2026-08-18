'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Person, Tier } from '@/types/domain';
import { useHoekdex } from '@/context/hoekdex-context';
import { STANDARD_ACTIVITIES } from '@/lib/constants';
import { TierBadge } from '@/components/shared/TierBadge';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { TierSelectorDialog } from './TierSelectorDialog';
import { EditPersonSheet } from './EditPersonSheet';
import { LogActivitySheet } from '../activities/LogActivitySheet';
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  MoreVertical,
  Edit2,
  Trash2,
  Plus,
  Clock,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';

interface PersonDetailViewProps {
  person?: Person;
  personId?: string;
}

export function PersonDetailView({ person: initialPerson, personId }: PersonDetailViewProps) {
  const router = useRouter();
  const { people, deletePerson, updatePersonTier, timeline } = useHoekdex();

  const person = initialPerson || people.find((p) => p.id === personId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTierSelectorOpen, setIsTierSelectorOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (!person) {
    return (
      <div className="p-12 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-[#1C1917]">Person Not Found</h2>
        <p className="text-xs text-stone-500">
          This record may have been removed or does not exist in your private vault.
        </p>
        <Link
          href="/people"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-full text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to My People</span>
        </Link>
      </div>
    );
  }

  const formattedFirstMet = person.dateFirstMet
    ? format(new Date(person.dateFirstMet), 'MMMM d, yyyy')
    : 'Not recorded';

  // Filter timeline events for this person
  const personTimeline = timeline.filter((e) => e.personId === person.id);

  const claimedActivityIds = new Set(person.activitiesClaimed.map((a) => a.activityId));
  const unclaimedCount = STANDARD_ACTIVITIES.length - claimedActivityIds.size;

  const handleDelete = async () => {
    await deletePerson(person.id);
    router.push('/people');
  };

  const handleSelectTier = async (newTier: Tier) => {
    await updatePersonTier(person.id, newTier);
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-12">
      {/* Top Back Navigation & Overflow Menu */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/people"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 bg-[#FFFDF9] border border-[#E7E0D8] px-3.5 py-1.5 rounded-full transition-colors group shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to People</span>
        </Link>

        {/* Overflow Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl bg-[#FFFDF9] border border-[#E7E0D8] text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-colors shadow-xs"
            aria-label="Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#FFFDF9] border border-[#E7E0D8] rounded-2xl shadow-2xl py-1.5 z-30 animate-in fade-in zoom-in-95">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setIsEditOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-[#F5EFE6] transition-colors text-left"
              >
                <Edit2 className="w-4 h-4 text-rose-600" />
                <span>Edit Details</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setIsTierSelectorOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-[#F5EFE6] transition-colors text-left"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Change Tier</span>
              </button>

              <div className="my-1 border-t border-[#E7E0D8]" />

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setIsDeleteDialogOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Delete Record</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] relative overflow-hidden shadow-lg">
        {/* Radial ambient background */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar / Photo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-[#F5EFE6] border-2 border-rose-400/40 shadow-xl flex-shrink-0">
            {person.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-black text-rose-600">
                {person.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
                {person.name}
              </h1>
              <TierBadge
                tier={person.tier}
                size="md"
                interactive
                onClick={() => setIsTierSelectorOpen(true)}
              />
              <PrivacyLock size="sm" showLabel />
            </div>

            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-1">
              {person.category && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5EFE6] border border-[#E7E0D8] font-bold text-stone-700">
                  {person.category}
                </span>
              )}
              {person.socialHandle && (
                <span className="font-mono text-stone-500">
                  {person.socialHandle}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>First met: {formattedFirstMet}</span>
              </div>
            </div>

            {/* XP and Claimed stats */}
            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-1.5 text-sm font-black text-rose-600 bg-rose-500/10 border border-rose-500/25 px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>{person.xpFromPerson} XP Earned</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{person.activitiesClaimed.length} Milestones Claimed</span>
              </div>
            </div>
          </div>

          {/* Desktop Log Activity Button */}
          <div className="hidden sm:block flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsLogActivityOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-rose-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Log Milestone (+XP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Two Column on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity Milestones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claimed Activities */}
          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-black text-[#1C1917]">
                  Claimed Milestones ({person.activitiesClaimed.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsLogActivityOpen(true)}
                className="text-xs font-bold text-rose-600 hover:text-rose-500 cursor-pointer"
              >
                + Log Another ({unclaimedCount} available)
              </button>
            </div>

            {person.activitiesClaimed.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#F5EFE6] border border-dashed border-[#E7E0D8] space-y-2">
                <p className="text-sm text-[#1C1917] font-bold">No milestones claimed yet</p>
                <p className="text-xs text-stone-500">
                  Log your first date, conversation, or special moment to earn XP!
                </p>
                <button
                  type="button"
                  onClick={() => setIsLogActivityOpen(true)}
                  className="mt-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-full cursor-pointer shadow-md shadow-rose-600/20"
                >
                  Log First Milestone
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {person.activitiesClaimed.map((item, idx) => (
                  <div
                    key={`${item.activityId}_${idx}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#E7E0D8]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1C1917]">{item.activityName}</h4>
                        {item.note && (
                          <p className="text-xs text-stone-500 italic mt-0.5">&ldquo;{item.note}&rdquo;</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-rose-600 bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 rounded-full">
                        +{item.xpAwarded} XP
                      </span>
                      <p className="text-[10px] text-stone-500 mt-1">
                        {format(new Date(item.claimedAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline Mini-Feed */}
          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-black text-[#1C1917]">Relationship Timeline</h2>
              </div>
              <Link
                href={`/timeline?person=${person.id}`}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-500"
              >
                <span>Full Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {personTimeline.length === 0 ? (
              <p className="text-xs text-stone-500">No timeline entries recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {personTimeline.slice(0, 4).map((evt) => (
                  <div key={evt.id} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[#1C1917] font-semibold">
                        {evt.eventType === 'person_added' && `Added ${person.name} to records`}
                        {evt.eventType === 'milestone_unlocked' && `Claimed "${evt.activityName}" (+${evt.xpAwarded} XP)`}
                        {evt.eventType === 'tier_change' && `Changed tier to ${evt.tier}`}
                        {evt.eventType === 'note_memory' && `Added private memory note`}
                      </p>
                      <span className="text-[11px] text-stone-500">
                        {format(new Date(evt.timestamp), 'MMM d, yyyy · h:mm a')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Notes & Memories */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-3 relative shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-black text-[#1C1917]">Private Notes</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="text-xs font-bold text-stone-500 hover:text-stone-800"
              >
                Edit
              </button>
            </div>

            {person.notes ? (
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#E7E0D8] text-xs text-stone-800 leading-relaxed whitespace-pre-wrap font-medium">
                {person.notes}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-dashed border-[#E7E0D8] text-center space-y-1">
                <p className="text-xs text-stone-500">No notes written yet.</p>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(true)}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Write memories & preferences
                </button>
              </div>
            )}

            <div className="pt-2">
              <PrivacyLock showLabel tooltipText="Your private notes are encrypted and never shown to anyone else" />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile for Log Milestone */}
      <div className="sm:hidden fixed bottom-16 left-0 right-0 p-4 bg-[#FAF5EF]/95 backdrop-blur-md border-t border-[#E7E0D8] z-20">
        <button
          type="button"
          onClick={() => setIsLogActivityOpen(true)}
          className="w-full py-3.5 px-6 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Log Milestone (+XP)</span>
        </button>
      </div>

      {/* Overlays */}
      <LogActivitySheet
        isOpen={isLogActivityOpen}
        person={person}
        onClose={() => setIsLogActivityOpen(false)}
      />

      <EditPersonSheet
        isOpen={isEditOpen}
        person={person}
        onClose={() => setIsEditOpen(false)}
      />

      <TierSelectorDialog
        isOpen={isTierSelectorOpen}
        currentTier={person.tier}
        personName={person.name}
        onClose={() => setIsTierSelectorOpen(false)}
        onSelectTier={handleSelectTier}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={`Delete ${person.name}?`}
        description="All activity history, milestones, and private notes for this person will be removed from your collection. This action cannot be undone."
        confirmLabel="Delete Person"
        isDestructive
      />
    </div>
  );
}
