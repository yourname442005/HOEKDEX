'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHoekdex } from '@/context/hoekdex-context';
import { PageHeader } from '@/components/shared/PageHeader';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { ShieldCheck, Download, Trash2, ArrowLeft, Lock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PrivacyControlsView() {
  const router = useRouter();
  const { user, updatePrivacySettings, exportData, deleteAccount } = useHoekdex();

  const [leaderboardOptIn, setLeaderboardOptIn] = useState(user.leaderboardOptIn);
  const [allowFollowerXpView, setAllowFollowerXpView] = useState(user.allowFollowerXpView);

  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleLeaderboardToggle = async () => {
    const nextVal = !leaderboardOptIn;
    setLeaderboardOptIn(nextVal);
    await updatePrivacySettings({ leaderboardOptIn: nextVal });
  };

  const handleFollowerXpToggle = async () => {
    const nextVal = !allowFollowerXpView;
    setAllowFollowerXpView(nextVal);
    await updatePrivacySettings({ allowFollowerXpView: nextVal });
  };

  const handleExport = async () => {
    await exportData();
  };

  const handleDelete = async () => {
    await deleteAccount();
    router.push('/');
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-3xl mx-auto">
      {/* Back Button */}
      <Link
        href="/settings"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-[#FFFDF9] border border-[#E7E0D8] px-3 py-1.5 rounded-full transition-colors shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Settings</span>
      </Link>

      {/* Header */}
      <PageHeader
        title="Privacy & Data Sovereignty"
        description="Granular controls for your social visibility, data exports, and account deletion."
        showPrivacyLock
      />

      {/* Persistent Privacy Info Card */}
      <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/20 space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-sm font-black text-[#1C1917]">What is ALWAYS Private & Confidential</h3>
        </div>
        <ul className="text-xs text-stone-700 space-y-1.5 pl-6 list-disc font-medium">
          <li>Names, nicknames, and contact handles of people in your records.</li>
          <li>Photos and avatars you upload for people you have met.</li>
          <li>All private notes, memories, reflection logs, and conversation details.</li>
          <li>Specific milestone names, dates of meetings, and tier assignments.</li>
        </ul>
      </div>

      {/* Social Toggles */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-5 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917]">Social & Competition Controls</h3>

        {/* Toggle 1: Leaderboard Participation */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E7E0D8]">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-[#1C1917]">Appear on Friend Leaderboards</p>
            <p className="text-xs text-stone-500">
              When disabled, your score is completely hidden from all friend leaderboards and rankings.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={leaderboardOptIn}
            onClick={handleLeaderboardToggle}
            className={cn(
              'w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5',
              leaderboardOptIn ? 'bg-rose-600' : 'bg-stone-200 border border-[#E7E0D8]'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded-full bg-white transition-transform shadow-xs',
                leaderboardOptIn ? 'translate-x-6' : 'translate-x-0'
              )}
            />
          </button>
        </div>

        {/* Toggle 2: Follower XP Visibility */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-[#1C1917]">Allow Followers to View Total XP</p>
            <p className="text-xs text-stone-500">
              Show your aggregate XP number on your friend-facing profile preview card.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={allowFollowerXpView}
            onClick={handleFollowerXpToggle}
            className={cn(
              'w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5',
              allowFollowerXpView ? 'bg-rose-600' : 'bg-stone-200 border border-[#E7E0D8]'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded-full bg-white transition-transform shadow-xs',
                allowFollowerXpView ? 'translate-x-6' : 'translate-x-0'
              )}
            />
          </button>
        </div>
      </div>

      {/* Data Export & Deletion */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917]">Data Management & Deletion</h3>

        {/* Export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#F5EFE6] border border-[#E7E0D8]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-rose-600" />
              <p className="text-sm font-bold text-[#1C1917]">Export Private Journal Data</p>
            </div>
            <p className="text-xs text-stone-500">
              Download all your recorded people, timeline entries, notes, and milestones in JSON format.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExportDialogOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-full shadow-md shadow-rose-600/20 transition-colors self-start sm:self-auto cursor-pointer"
          >
            Request Export
          </button>
        </div>

        {/* Account Deletion */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-600" />
              <p className="text-sm font-bold text-rose-700">Permanently Delete Account</p>
            </div>
            <p className="text-xs text-rose-600">
              Irreversible action: purges all people, XP history, milestones, and achievements forever.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-full shadow-md shadow-rose-600/20 transition-colors self-start sm:self-auto cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Overlays */}
      <ConfirmDialog
        isOpen={isExportDialogOpen}
        onClose={() => setIsExportDialogOpen(false)}
        onConfirm={handleExport}
        title="Export Your Hoekdex Data?"
        description="We will compile a private encrypted archive of all your people, milestones, notes, and XP ledger. You will receive a secure download link."
        confirmLabel="Request Export"
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Permanently Delete Account?"
        description="This will permanently delete your account, all people in your private collection, your notes, and all XP progression. This action is irreversible."
        confirmLabel="Permanently Delete Account"
        isDestructive
        requiresTypedConfirmation
        requiredWord="DELETE"
      />
    </div>
  );
}
