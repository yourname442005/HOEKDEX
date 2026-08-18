'use client';

import React from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { Sparkles, ShieldCheck, User as UserIcon, Plus } from 'lucide-react';
import { PrivacyLock } from '../shared/PrivacyLock';

interface HeaderProps {
  onOpenAddPerson?: () => void;
}

export function Header({ onOpenAddPerson }: HeaderProps) {
  const { user } = useHoekdex();

  return (
    <header className="sticky top-0 z-20 w-full bg-[#FAF5EF]/90 backdrop-blur-md border-b border-[#E7E0D8] px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Mobile Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#1C1917]">HOEKDEX</span>
          </Link>

          {/* Desktop Privacy Shield */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-stone-600 bg-[#F5EFE6] px-3 py-1 rounded-full border border-[#E7E0D8]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Private Vault Mode</span>
          </div>
        </div>

        {/* Right Section: XP Pill, Add Person, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <PrivacyLock size="sm" showLabel />

          {/* Current XP Pill */}
          <Link
            href="/achievements"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-600 text-xs font-extrabold hover:bg-rose-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>{user.totalXp} XP</span>
          </Link>

          {/* Add Person CTA (Mobile/Desktop) */}
          {onOpenAddPerson && (
            <button
              type="button"
              onClick={onOpenAddPerson}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Person</span>
            </button>
          )}

          {/* Avatar Link */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full overflow-hidden border border-[#E7E0D8] hover:border-rose-500 transition-colors flex-shrink-0"
            title="View Profile"
          >
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#F5EFE6] flex items-center justify-center text-stone-500">
                <UserIcon className="w-4 h-4" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
