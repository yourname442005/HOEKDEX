'use client';

import React, { useState } from 'react';
import { SocialPersonRef } from '@/types/domain';
import { Sparkles, Trophy, MoreVertical, UserMinus, ShieldBan, ShieldAlert } from 'lucide-react';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { ReportDialog } from './ReportDialog';
import { cn } from '@/lib/utils';

interface FriendCardProps {
  friend: SocialPersonRef;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  onBlock: (userId: string) => void;
  onReport: (userId: string, reason: string, note?: string) => void;
}

export function FriendCard({
  friend,
  onFollow,
  onUnfollow,
  onBlock,
  onReport,
}: FriendCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isUnfollowDialogOpen, setIsUnfollowDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] hover:border-[#fe1e34]/40 transition-colors shadow-xs">
      {/* User Info (Allowed Social Data ONLY) */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={friend.avatarUrl} alt={friend.displayName} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-extrabold text-[#1C1917] dark:text-[#FCFCFC] truncate">
              {friend.displayName}
            </h4>
            {friend.username && (
              <span className="text-xs text-stone-500 dark:text-[#B5B2B2] font-medium truncate">
                @{friend.username}
              </span>
            )}
            {friend.rank && (
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                Rank #{friend.rank}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-[#B5B2B2] mt-0.5">
            <div className="flex items-center gap-1 font-bold text-[#fe1e34]">
              <Sparkles className="w-3 h-3 text-[#fe1e34]" />
              <span>{friend.totalXp} XP</span>
            </div>

            {friend.achievementBadge && (
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-[#D4D2D2] bg-[#F5EFE6] dark:bg-[#262525] px-2 py-0.5 rounded-md border border-[#E7E0D8] dark:border-[#393939]">
                <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span className="truncate max-w-[120px]">{friend.achievementBadge}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions: Follow State Button & Overflow */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {friend.isBlocked ? (
          <span className="px-3.5 py-1.5 text-xs font-bold text-stone-400 dark:text-[#525252] bg-[#F5EFE6] dark:bg-[#262525] rounded-full border border-[#E7E0D8] dark:border-[#393939]">
            Blocked
          </span>
        ) : friend.isMutual ? (
          <button
            type="button"
            onClick={() => setIsUnfollowDialogOpen(true)}
            className="px-4 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 hover:border-[#fe1e34] hover:text-[#fe1e34] rounded-full transition-colors cursor-pointer"
          >
            Friends
          </button>
        ) : friend.isFollowing ? (
          <button
            type="button"
            onClick={() => setIsUnfollowDialogOpen(true)}
            className="px-4 py-1.5 text-xs font-bold text-[#fe1e34] bg-[#F5EFE6] dark:bg-[#262525] border border-[#fe1e34]/30 hover:border-[#fe1e34] rounded-full transition-colors cursor-pointer"
          >
            Following
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onFollow(friend.userId)}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 rounded-full shadow-md shadow-[#fe1e34]/20 transition-all cursor-pointer"
          >
            Follow
          </button>
        )}

        {/* Overflow Menu Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-44 bg-[#FFFDF9] border border-[#E7E0D8] rounded-2xl shadow-2xl py-1 z-30 animate-in fade-in zoom-in-95">
              {friend.isFollowing && (
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    setIsUnfollowDialogOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-[#F5EFE6] text-left"
                >
                  <UserMinus className="w-4 h-4 text-stone-500" />
                  <span>Unfollow</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setIsBlockDialogOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 text-left"
              >
                <ShieldBan className="w-4 h-4 text-rose-600" />
                <span>Block User</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setIsReportDialogOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 text-left"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Report User</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Overlays */}
      <ConfirmDialog
        isOpen={isUnfollowDialogOpen}
        onClose={() => setIsUnfollowDialogOpen(false)}
        onConfirm={() => onUnfollow(friend.userId)}
        title={`Unfollow ${friend.displayName}?`}
        description="They will no longer appear in your mutual friends leaderboard."
        confirmLabel="Unfollow"
      />

      <ConfirmDialog
        isOpen={isBlockDialogOpen}
        onClose={() => setIsBlockDialogOpen(false)}
        onConfirm={() => onBlock(friend.userId)}
        title={`Block ${friend.displayName}?`}
        description="They cannot follow you or see your leaderboard score. You will not see them in search."
        confirmLabel="Block User"
        isDestructive
      />

      <ReportDialog
        isOpen={isReportDialogOpen}
        userName={friend.displayName}
        onClose={() => setIsReportDialogOpen(false)}
        onSubmitReport={(reason, note) => onReport(friend.userId, reason, note)}
      />
    </div>
  );
}
