'use client';

import React, { useState } from 'react';
import { FriendRequest } from '@/types/domain';
import { Sparkles, Trophy, Check, X, Loader2, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept: (requestId: string) => Promise<void>;
  onDecline: (requestId: string) => Promise<void>;
}

export function FriendRequestCard({ request, onAccept, onDecline }: FriendRequestCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>(request.status);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await onAccept(request.id);
      setStatus('accepted');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    setIsLoading(true);
    try {
      await onDecline(request.id);
      setStatus('declined');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'accepted') {
    return (
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-200">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={request.fromAvatarUrl}
            alt={request.fromDisplayName}
            className="w-9 h-9 rounded-full object-cover border border-emerald-500/30"
          />
          <div>
            <p className="font-bold text-[#1C1917]">
              {request.fromDisplayName} <span className="text-stone-500 font-normal">(@{request.fromUsername})</span>
            </p>
            <p className="text-emerald-700 font-medium">Friend request accepted! Added to your circle.</p>
          </div>
        </div>
        <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-700">
          <UserCheck className="w-4 h-4" />
        </div>
      </div>
    );
  }

  if (status === 'declined') {
    return (
      <div className="p-3.5 rounded-2xl bg-stone-100 border border-[#E7E0D8] flex items-center justify-between text-xs text-stone-500 animate-in fade-in duration-200">
        <span>Request from <strong>{request.fromDisplayName}</strong> declined</span>
        <span className="text-[11px] text-stone-400">Declined</span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E7E0D8] hover:border-rose-300 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Left: User Avatar & Info */}
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={request.fromAvatarUrl}
          alt={request.fromDisplayName}
          className="w-11 h-11 rounded-full object-cover border-2 border-rose-400/40 shadow-xs flex-shrink-0"
        />
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-black text-[#1C1917] truncate">
              {request.fromDisplayName}
            </h4>
            <span className="text-xs text-stone-500 font-medium">
              @{request.fromUsername}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-600 flex-wrap">
            <span className="inline-flex items-center gap-1 font-extrabold text-rose-600">
              <Sparkles className="w-3 h-3 text-rose-500" />
              {request.totalXp.toLocaleString()} XP
            </span>
            {request.rank && (
              <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-bold border border-stone-200">
                Rank #{request.rank}
              </span>
            )}
            {request.badge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 font-semibold border border-amber-500/20">
                <Trophy className="w-3 h-3 text-amber-600" />
                {request.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Accept & Decline Actions */}
      <div className="flex items-center gap-2 sm:self-center">
        <button
          type="button"
          onClick={handleAccept}
          disabled={isLoading}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-extrabold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Accept</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDecline}
          disabled={isLoading}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5EFE6] hover:bg-stone-200 active:scale-95 text-stone-700 hover:text-stone-900 text-xs font-bold border border-[#E7E0D8] transition-all cursor-pointer disabled:opacity-50"
        >
          <X className="w-3.5 h-3.5" />
          <span>Decline</span>
        </button>
      </div>
    </div>
  );
}
