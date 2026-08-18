'use client';

import React, { useState, useMemo } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { PageHeader } from '@/components/shared/PageHeader';
import { FriendCard } from './FriendCard';
import { FriendRequestCard } from './FriendRequestCard';
import { AddFriendModal } from './AddFriendModal';
import { InviteFriendsModal } from './InviteFriendsModal';
import { Search, UserPlus, Users, ShieldCheck, UserCheck, Sparkles, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FriendsView() {
  const {
    friends,
    friendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    followUser,
    unfollowUser,
    blockUser,
    reportUser,
  } = useHoekdex();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'following' | 'all'>('following');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const pendingRequests = useMemo(() => {
    return friendRequests.filter((r) => r.status === 'pending');
  }, [friendRequests]);

  const filteredFriends = useMemo(() => {
    return friends.filter((f) => {
      if (f.isBlocked) return false;

      if (activeTab === 'following' && !f.isFollowing) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          f.displayName.toLowerCase().includes(q) ||
          (f.username && f.username.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [friends, activeTab, searchQuery]);

  const followingCount = friends.filter((f) => f.isFollowing && !f.isBlocked).length;

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-5xl mx-auto">
      {/* Header with prominent + Add Friend & separate Invite Friends */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E0D8]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
              Friends
            </h1>
            <span className="px-3 py-1 text-xs font-black bg-rose-500/10 border border-rose-500/25 text-rose-600 rounded-full">
              {followingCount} In Your Circle
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
            Build your crew, discover friends on Hoekdex, and compare XP stats.
          </p>
        </div>

        {/* Header Action Buttons — Distinct Flows */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-black shadow-md shadow-rose-600/20 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Friend</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-700 active:scale-95 text-xs font-black transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-pink-600" />
            <span>Invite Friends</span>
          </button>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-xs shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-[#1C1917]">Zero Personal Data Exposure Guarantee</p>
          <p className="text-stone-600 leading-relaxed">
            Only your display name, avatar, and total XP score are visible to friends. Your private people collection, notes, photos, and specific milestone dates are never shared.
          </p>
        </div>
      </div>

      {/* Friend Requests Section */}
      {pendingRequests.length > 0 && (
        <div className="space-y-3 p-4 rounded-3xl bg-[#FFFDF9] border-2 border-rose-400/40 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-black text-[#1C1917] tracking-tight">
                Friend Requests
              </h3>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-black bg-rose-600 text-white rounded-full">
              {pendingRequests.length} Pending
            </span>
          </div>

          <div className="space-y-2.5">
            {pendingRequests.map((req) => (
              <FriendRequestCard
                key={req.id}
                request={req}
                onAccept={acceptFriendRequest}
                onDecline={declineFriendRequest}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your circle by display name or @handle..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDF9] border border-[#E7E0D8] focus:border-rose-500 rounded-2xl text-sm text-[#1C1917] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-rose-500 shadow-xs"
          />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5EFE6] border border-[#E7E0D8] rounded-2xl shadow-xs flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('following')}
            className={cn(
              'px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer',
              activeTab === 'following'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                : 'text-stone-600 hover:text-stone-900'
            )}
          >
            Following ({followingCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={cn(
              'px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer',
              activeTab === 'all'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                : 'text-stone-600 hover:text-stone-900'
            )}
          >
            Discover ({friends.filter((f) => !f.isBlocked).length})
          </button>
        </div>
      </div>

      {/* Friends List or Hoekdex Redesigned Empty State */}
      {filteredFriends.length > 0 ? (
        <div className="space-y-3">
          {filteredFriends.map((friend) => (
            <FriendCard
              key={friend.userId}
              friend={friend}
              onFollow={followUser}
              onUnfollow={unfollowUser}
              onBlock={blockUser}
              onReport={reportUser}
            />
          ))}
        </div>
      ) : (
        /* Hoekdex Empty State (Section 7) */
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] text-center space-y-6 shadow-xs relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-4xl shadow-sm">
            👥
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-xl font-black text-[#1C1917] tracking-tight uppercase">
              YOUR CREW IS EMPTY
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-medium leading-relaxed">
              Hoekdex gets more fun when your friends are here. Find teammates, compare XP, and level up together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Friend</span>
            </button>

            <button
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-700 font-extrabold text-xs transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-pink-600" />
              <span>Invite Friends</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddFriendModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <InviteFriendsModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </div>
  );
}
