'use client';

import React, { useState } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { inviteService } from '@/lib/services/invite-service';
import { X, QrCode, Copy, Share2, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const { user, showToast } = useHoekdex();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const profileUrl = inviteService.generateProfileShareUrl(user.username || 'mukesh_k');

  const handleCopy = async () => {
    const success = await inviteService.copyToClipboard(profileUrl);
    if (success) {
      setCopied(true);
      showToast('Profile link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShare = async () => {
    const res = await inviteService.shareInvite({
      title: `${user.displayName} on Hoekdex`,
      text: `Connect with ${user.displayName} on Hoekdex!`,
      url: profileUrl,
    });
    if (res.copied) {
      showToast('Profile link copied to clipboard!', 'success');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-[#FFFDF9] border border-[#E7E0D8] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D8]">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-rose-600" />
            <h3 id="qr-modal-title" className="text-lg font-black text-[#1C1917]">
              Share Hoekdex Profile
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#F5EFE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Public Card Preview */}
        <div className="text-center space-y-4 py-2">
          {/* Avatar & User Details */}
          <div className="space-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-rose-400 shadow-md"
            />
            <h4 className="text-base font-black text-[#1C1917]">{user.displayName}</h4>
            <p className="text-xs text-stone-500 font-medium">@{user.username || 'mukesh_k'}</p>
          </div>

          {/* Simulated Clean QR Code Graphic */}
          <div className="mx-auto w-48 h-48 p-4 rounded-2xl bg-white border-2 border-stone-800 shadow-inner flex flex-col items-center justify-center space-y-2">
            <svg
              className="w-full h-full text-stone-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Corner Position Detection Patterns */}
              <rect x="5" y="5" width="25" height="25" fill="#1C1917" />
              <rect x="9" y="9" width="17" height="17" fill="#FFFFFF" />
              <rect x="13" y="13" width="9" height="9" fill="#E11D48" />

              <rect x="70" y="5" width="25" height="25" fill="#1C1917" />
              <rect x="74" y="9" width="17" height="17" fill="#FFFFFF" />
              <rect x="78" y="13" width="9" height="9" fill="#E11D48" />

              <rect x="5" y="70" width="25" height="25" fill="#1C1917" />
              <rect x="9" y="74" width="17" height="17" fill="#FFFFFF" />
              <rect x="13" y="78" width="9" height="9" fill="#E11D48" />

              {/* Data Blocks */}
              <rect x="35" y="10" width="8" height="8" fill="#1C1917" />
              <rect x="48" y="10" width="8" height="8" fill="#1C1917" />
              <rect x="10" y="35" width="8" height="8" fill="#1C1917" />
              <rect x="35" y="35" width="12" height="12" fill="#E11D48" />
              <rect x="55" y="35" width="8" height="8" fill="#1C1917" />
              <rect x="75" y="35" width="8" height="8" fill="#1C1917" />
              <rect x="35" y="55" width="8" height="8" fill="#1C1917" />
              <rect x="48" y="55" width="12" height="12" fill="#1C1917" />
              <rect x="70" y="55" width="8" height="8" fill="#E11D48" />
              <rect x="35" y="75" width="12" height="12" fill="#1C1917" />
              <rect x="55" y="75" width="8" height="8" fill="#1C1917" />
              <rect x="75" y="75" width="15" height="15" fill="#1C1917" />
            </svg>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-600">
              HOEKDEX PASS
            </span>
          </div>

          {/* Privacy Notice */}
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-left flex items-start gap-2 text-[11px] text-stone-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              Encodes <strong>only public profile info</strong> (display name & avatar). Never shares private journal entries, notes, or milestones.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#F5EFE6] hover:bg-stone-200 text-stone-800 text-xs font-bold border border-[#E7E0D8] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-md shadow-rose-600/20 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
