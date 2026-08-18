'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { PageHeader } from '@/components/shared/PageHeader';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { Sparkles, Trophy, ShieldCheck, ArrowRight, Save, Share2, QrCode, Copy, Check } from 'lucide-react';
import { QrCodeModal } from '@/features/friends/QrCodeModal';
import { InviteFriendsModal } from '@/features/friends/InviteFriendsModal';
import { inviteService } from '@/lib/services/invite-service';

export function ProfileView() {
  const { user, updateUserProfile, showToast } = useHoekdex();

  const [displayName, setDisplayName] = useState(user.displayName);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [selectedBadge, setSelectedBadge] = useState(user.selectedAchievementBadge || 'Legendary Encounter');
  const [isSaving, setIsSaving] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const presetAvatars = [
    'https://picsum.photos/seed/mukesh_avatar/200/200',
    'https://picsum.photos/seed/avatar_neo/200/200',
    'https://picsum.photos/seed/avatar_zen/200/200',
    'https://picsum.photos/seed/avatar_luna/200/200',
    'https://picsum.photos/seed/avatar_kai/200/200',
  ];

  const availableBadges = [
    'First Entry',
    'First Date Logged',
    'Novice Adventurer',
    'Seasoned Raconteur',
    'Legendary Encounter',
    'Master of Hearts',
  ];

  const handleCopyProfileLink = async () => {
    const profileUrl = inviteService.generateProfileShareUrl(user.username || 'mukesh_k');
    const success = await inviteService.copyToClipboard(profileUrl);
    if (success) {
      setCopiedLink(true);
      showToast('Profile share link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({
        displayName: displayName.trim(),
        avatarUrl: avatarUrl.trim() || presetAvatars[0],
        selectedAchievementBadge: selectedBadge,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-widest block font-bold mb-1">
          // YOUR CARD
        </span>
        <PageHeader
          title="Public Profile & Card"
          description="Control how your profile card appears to friends on leaderboards and search results."
        />
      </div>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Live Preview as Friends See It */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#fe1e34]">
              Live Friend-Facing Preview
            </span>
            <PrivacyLock size="sm" showLabel tooltipText="Your private journal is never visible on your public card" />
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border-2 border-[#fe1e34]/40 shadow-lg relative overflow-hidden text-center space-y-4">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#fe1e34]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#fe1e34] shadow-md bg-[#F5EFE6] dark:bg-[#262525]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl || presetAvatars[0]} alt="Avatar Preview" className="w-full h-full object-cover" />
            </div>

            {/* Display Name */}
            <div>
              <h3 className="text-xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                {displayName || 'Your Display Name'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] mt-0.5">@{user.username || 'mukesh_k'} · Rank #{user.currentRank} on Leaderboard</p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fe1e34]/10 border border-[#fe1e34]/25 text-[#fe1e34] text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-[#fe1e34]" />
                <span>{user.totalXp} XP</span>
              </div>

              {selectedBadge && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold">
                  <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{selectedBadge}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E7E0D8] dark:border-[#393939] text-[11px] text-stone-500 dark:text-[#B5B2B2] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Verified Safe: No journal records or contact details shown</span>
            </div>
          </div>

          {/* Share My Hoekdex Card */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#fe1e34]">
                Share My Hoekdex
              </span>
              <span className="text-[11px] text-stone-500 dark:text-[#B5B2B2]">Public profile & invites</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#F5EFE6] dark:bg-[#262525] hover:bg-stone-200 dark:hover:bg-[#393939] text-stone-800 dark:text-[#FCFCFC] text-xs font-bold border border-[#E7E0D8] dark:border-[#393939] transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#fe1e34]" />
                <span>QR & Share Card</span>
              </button>

              <button
                type="button"
                onClick={handleCopyProfileLink}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#F5EFE6] dark:bg-[#262525] hover:bg-stone-200 dark:hover:bg-[#393939] text-stone-800 dark:text-[#FCFCFC] text-xs font-bold border border-[#E7E0D8] dark:border-[#393939] transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-600 dark:text-[#B5B2B2]" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Profile Link'}</span>
              </button>
            </div>
          </div>

          <Link
            href="/settings/privacy"
            className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] hover:border-[#fe1e34] flex items-center justify-between transition-colors group shadow-xs block"
          >
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#1C1917] dark:text-[#FCFCFC] group-hover:text-[#fe1e34] transition-colors">
                Adjust Privacy Settings
              </p>
              <p className="text-[11px] text-stone-500 dark:text-[#B5B2B2]">
                Control leaderboard opt-in and follower XP visibility
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 dark:text-[#525252] group-hover:text-[#fe1e34] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Right Col: Edit Form */}
        <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-5 shadow-xs">
          <h3 className="text-base font-black text-[#1C1917] dark:text-[#FCFCFC]">Edit Profile Details</h3>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Display Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
                Display Name (Visible to Friends)
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={50}
                className="w-full px-3.5 py-2.5 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] rounded-xl text-[#1C1917] dark:text-[#FCFCFC] text-sm focus:border-[#fe1e34] focus:outline-none"
              />
            </div>

            {/* Avatar URL / Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
                Avatar Image
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="w-full px-3.5 py-2 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] rounded-xl text-[#1C1917] dark:text-[#FCFCFC] text-xs focus:border-[#fe1e34]"
              />
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-stone-500 dark:text-[#B5B2B2]">Presets:</span>
                {presetAvatars.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset)}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-300 dark:border-[#393939] hover:border-[#fe1e34] transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Trophy Badge */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
                Showcased Trophy Badge
              </label>
              <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] rounded-xl text-[#1C1917] dark:text-[#FCFCFC] text-sm font-medium focus:border-[#fe1e34] focus:outline-none cursor-pointer"
              >
                {availableBadges.map((badge) => (
                  <option key={badge} value={badge} className="dark:bg-[#171617]">
                    {badge}
                  </option>
                ))}
              </select>
            </div>

            {/* Save CTA */}
            <div className="pt-4 border-t border-[#E7E0D8] dark:border-[#393939]">
              <button
                type="submit"
                disabled={isSaving || !displayName.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 text-white font-black text-sm shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : 'Save Profile Card'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <QrCodeModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
      <InviteFriendsModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
    </div>
  );
}
