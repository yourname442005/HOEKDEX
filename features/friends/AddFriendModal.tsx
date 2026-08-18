'use client';

import React, { useState } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { SocialPersonRef } from '@/types/domain';
import { Search, UserPlus, X, Check, Sparkles, Trophy, QrCode, ShieldCheck, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QrCodeModal } from './QrCodeModal';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFriendModal({ isOpen, onClose }: AddFriendModalProps) {
  const { searchUsers, sendFriendRequest } = useHoekdex();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SocialPersonRef[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [requestedUsers, setRequestedUsers] = useState<Record<string, boolean>>({});
  const [showQrModal, setShowQrModal] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const results = searchUsers(query);
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleAddFriend = async (user: SocialPersonRef) => {
    const res = await sendFriendRequest(user.username || user.userId);
    if (res.success) {
      setRequestedUsers((prev) => ({ ...prev, [user.userId]: true }));
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-friend-title"
        className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      >
        <div className="w-full max-w-md bg-[#FFFDF9] border border-[#E7E0D8] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D8] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 id="add-friend-title" className="text-lg font-black text-[#1C1917] leading-none">
                  Add Friend
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  Find someone already on Hoekdex.
                </p>
              </div>
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

          {/* Quick options: Scan QR / Share Profile */}
          <div className="flex items-center gap-2 p-1.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-2xl flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FFFDF9] hover:bg-white text-stone-800 border border-[#E7E0D8] text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-rose-600" />
              <span>Scan / Show QR</span>
            </button>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-stone-500" />
              <span>Share Profile</span>
            </button>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleSearch} className="space-y-3 flex-shrink-0">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Find someone on Hoekdex
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value.trim()) {
                        setHasSearched(false);
                        setSearchResults([]);
                      }
                    }}
                    placeholder="username or display name"
                    className="w-full pl-8 pr-4 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] focus:border-rose-500 rounded-2xl text-sm font-semibold text-[#1C1917] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition-all cursor-pointer flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Search Results List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 min-h-[160px]">
            {hasSearched ? (
              searchResults.length > 0 ? (
                searchResults.map((user) => {
                  const isRequested =
                    requestedUsers[user.userId] || user.requestStatus === 'pending_sent';

                  return (
                    <div
                      key={user.userId}
                      className="p-3.5 rounded-2xl bg-[#F5EFE6]/60 border border-[#E7E0D8] flex items-center justify-between gap-3 shadow-2xs hover:bg-[#F5EFE6] transition-all"
                    >
                      {/* Left: Avatar & Allowlisted Public Data */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={user.avatarUrl}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full object-cover border border-rose-400/40 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-black text-[#1C1917] truncate">
                            {user.displayName}
                          </p>
                          <p className="text-[11px] text-stone-500 font-medium truncate">
                            @{user.username || user.displayName.toLowerCase().replace(/\s+/g, '_')}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-rose-600 font-extrabold mt-0.5">
                            <Sparkles className="w-3 h-3 text-rose-500" />
                            <span>{user.totalXp.toLocaleString()} XP</span>
                            {user.achievementBadge && (
                              <span className="text-stone-500 font-normal truncate max-w-[120px]">
                                · {user.achievementBadge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Add Friend CTA */}
                      <button
                        type="button"
                        onClick={() => handleAddFriend(user)}
                        disabled={isRequested}
                        className={cn(
                          'px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex-shrink-0 flex items-center gap-1.5',
                          isRequested
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 opacity-90 cursor-default'
                            : 'bg-rose-600 hover:bg-rose-500 active:scale-95 text-white shadow-xs shadow-rose-600/20'
                        )}
                      >
                        {isRequested ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Requested</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Add Friend</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm font-bold text-[#1C1917]">No users matched &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Try searching for handles like @alex_rivers, @jordan_cruz, or invite them directly!
                  </p>
                </div>
              )
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto">
                  <p className="text-xs font-bold text-[#1C1917]">Search by Username</p>
                  <p className="text-[11px] text-stone-500">
                    Type a handle above to find fellow Hoekdex players and send friend requests.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Safe Privacy Footer Notice */}
          <div className="pt-3 border-t border-[#E7E0D8] text-[11px] text-stone-500 flex items-center justify-center gap-1.5 flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Private journal notes, photos & milestones are never exposed</span>
          </div>
        </div>
      </div>

      <QrCodeModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </>
  );
}
