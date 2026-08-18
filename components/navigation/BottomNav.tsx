'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Clock,
  Trophy,
  Flame,
  UserCheck,
  X,
} from 'lucide-react';

import { useHoekdex } from '@/context/hoekdex-context';

export function BottomNav() {
  const pathname = usePathname();
  const { pendingRequestsCount } = useHoekdex();
  const [showSocialMenu, setShowSocialMenu] = useState(false);

  const isSocialActive = pathname.startsWith('/friends') || pathname.startsWith('/leaderboard');

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/dashboard',
    },
    {
      label: 'People',
      href: '/people',
      icon: Users,
      isActive: pathname.startsWith('/people'),
    },
    {
      label: 'Timeline',
      href: '/timeline',
      icon: Clock,
      isActive: pathname.startsWith('/timeline'),
    },
    {
      label: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      isActive: pathname.startsWith('/achievements'),
    },
  ];

  return (
    <>
      {/* Social Choice Drawer (Mobile) */}
      {showSocialMenu && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-4 animate-in fade-in duration-150"
        >
          <div className="bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] rounded-2xl p-4 space-y-3 mb-16 shadow-2xl animate-in slide-in-from-bottom-6 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D8] dark:border-[#393939]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#fe1e34]">
                Social Game Zone
              </span>
              <button
                type="button"
                onClick={() => setShowSocialMenu(false)}
                className="text-stone-400 dark:text-[#B5B2B2] p-1 hover:text-stone-700 dark:hover:text-[#FCFCFC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/friends"
                onClick={() => setShowSocialMenu(false)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] hover:border-[#fe1e34] text-center gap-2 relative"
              >
                <div className="p-2.5 rounded-full bg-[#fe1e34]/15 text-[#fe1e34] relative">
                  <UserCheck className="w-5 h-5" />
                  {pendingRequestsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#fe1e34] ring-2 ring-white dark:ring-[#171617] animate-pulse" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-[#FCFCFC]">Friends</span>
                  {pendingRequestsCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[9px] font-black bg-[#fe1e34] text-white rounded-full">
                      {pendingRequestsCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-stone-500 dark:text-[#B5B2B2]">Follow & Search</span>
              </Link>

              <Link
                href="/leaderboard"
                onClick={() => setShowSocialMenu(false)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] hover:border-[#fe1e34] text-center gap-2"
              >
                <div className="p-2.5 rounded-full bg-pink-500/15 text-pink-600 dark:text-pink-400">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#1C1917] dark:text-[#FCFCFC]">Leaderboard</span>
                <span className="text-[10px] text-stone-500 dark:text-[#B5B2B2]">XP Rankings</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFDF9]/95 dark:bg-[#171617]/95 backdrop-blur-md border-t border-[#E7E0D8] dark:border-[#393939] px-2 py-1.5 flex items-center justify-around select-none shadow-lg"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-2.5 rounded-xl min-w-[56px] min-h-[48px] transition-colors',
                item.isActive
                  ? 'text-[#fe1e34] font-bold'
                  : 'text-stone-500 dark:text-[#B5B2B2] hover:text-stone-800 dark:hover:text-[#FCFCFC]'
              )}
            >
              <Icon className={cn('w-5 h-5 mb-0.5', item.isActive && 'stroke-[2.5px]')} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}

        {/* 5th item: Social / Leaderboard */}
        <button
          type="button"
          onClick={() => setShowSocialMenu(!showSocialMenu)}
          aria-expanded={showSocialMenu}
          className={cn(
            'flex flex-col items-center justify-center py-1 px-2.5 rounded-xl min-w-[56px] min-h-[48px] transition-colors cursor-pointer relative',
            isSocialActive ? 'text-[#fe1e34] font-bold' : 'text-stone-500 dark:text-[#B5B2B2] hover:text-stone-800 dark:hover:text-[#FCFCFC]'
          )}
        >
          <div className="relative">
            <Flame className={cn('w-5 h-5 mb-0.5', isSocialActive && 'text-pink-600 dark:text-pink-400 stroke-[2.5px]')} />
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#fe1e34] ring-2 ring-white dark:ring-[#171617] animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-medium leading-none">Social</span>
        </button>
      </nav>
    </>
  );
}
