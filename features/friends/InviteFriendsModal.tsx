'use client';

import React, { useState } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { inviteService } from '@/lib/services/invite-service';
import { X, Users, Copy, Share2, Check, Sparkles } from 'lucide-react';

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteFriendsModal({ isOpen, onClose }: InviteFriendsModalProps) {
  const { showToast } = useHoekdex();
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (!isOpen) return null;

  const inviteUrl = inviteService.generateInviteUrl();

  const handleCopy = async () => {
    const success = await inviteService.copyToClipboard(inviteUrl);
    if (success) {
      setCopied(true);
      showToast('Invite link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const res = await inviteService.shareInvite({
        title: 'Join me on Hoekdex!',
        text: 'Hoekdex is more fun when your friends are here. Track milestones and compare XP!',
        url: inviteUrl,
      });

      if (res.copied) {
        setCopied(true);
        showToast('Invite link copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 3000);
      } else if (res.shared) {
        showToast('Invite shared!', 'success');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
      className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-[#FFFDF9] border border-[#E7E0D8] rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200">
        {/* Soft Pink Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#F5EFE6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-pink-500/20 to-rose-500/20 border border-pink-500/30 text-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/10">
            <Users className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 id="invite-modal-title" className="text-2xl font-black text-[#1C1917] tracking-tight">
              Invite your people
            </h3>
            <p className="text-xs text-stone-600 font-medium leading-relaxed max-w-xs mx-auto">
              Send Hoekdex to someone who isn&apos;t here yet. Hoekdex is more fun when your friends are here.
            </p>
          </div>
        </div>

        {/* Distinction Banner */}
        <div className="p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#E7E0D8] text-xs text-stone-700 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-600">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Why Invite Friends?</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-normal">
            Compare XP stats on private friend leaderboards, celebrate relationship milestones, and unlock friendly competition while keeping private notes 100% confidential.
          </p>
        </div>

        {/* Actions Stack */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invite</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F5EFE6] hover:bg-stone-200 active:scale-95 text-stone-800 font-bold text-sm border border-[#E7E0D8] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Invite Link'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer text-center"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
