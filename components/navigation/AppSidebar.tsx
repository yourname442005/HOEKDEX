'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHoekdex } from '@/context/hoekdex-context';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Clock,
  Trophy,
  UserCheck,
  Flame,
  Settings,
  Sparkles,
  Shield,
  User as UserIcon,
} from 'lucide-react';
import { PrivacyLock } from '../shared/PrivacyLock';

export function AppSidebar() {
  const pathname = usePathname();
  const { user, pendingRequestsCount } = useHoekdex();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      section: 'Core',
    },
    {
      label: 'My People',
      href: '/people',
      icon: Users,
      section: 'Private Journal',
      private: true,
    },
    {
      label: 'Timeline',
      href: '/timeline',
      icon: Clock,
      section: 'Private Journal',
      private: true,
    },
    {
      label: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      section: 'Core',
    },
    {
      label: 'Friends',
      href: '/friends',
      icon: UserCheck,
      section: 'Social Game',
      badgeCount: pendingRequestsCount,
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
      icon: Flame,
      section: 'Social Game',
    },
    {
      label: 'Public Profile',
      href: '/profile',
      icon: UserIcon,
      section: 'Account',
    },
    {
      label: 'Settings & Privacy',
      href: '/settings',
      icon: Settings,
      section: 'Account',
    },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 w-16 hover:w-64 bg-[#FFFDF9] dark:bg-[#171617] border-r border-[#E7E0D8] dark:border-[#393939] p-3 select-none transition-[width,background-color,border-color] duration-300 ease-in-out shadow-lg shadow-black/10 group/sidebar overflow-hidden"
      aria-label="Sidebar navigation"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-12 px-1 mb-4 border-b border-[#E7E0D8] dark:border-[#393939] overflow-hidden flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group min-w-max focus-visible:ring-2 focus-visible:ring-[#fe1e34] focus-visible:outline-none rounded-xl p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#fe1e34] via-[#fe1e34]/90 to-pink-500 border border-[#fe1e34]/40 flex items-center justify-center text-white shadow-sm shadow-[#fe1e34]/30 group-hover:scale-105 transition-transform flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <span className="text-base font-black tracking-tight text-[#1C1917] dark:text-[#FCFCFC] block leading-none">
              HOEKDEX
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#fe1e34] block mt-0.5">
              Private · Gamified
            </span>
          </div>
        </Link>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 flex-shrink-0">
          <PrivacyLock size="sm" tooltipText="Your records are 100% private & client-secured" />
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden pr-0.5 no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              className={cn(
                'flex items-center gap-3.5 px-2.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-150 group min-w-max focus-visible:ring-2 focus-visible:ring-[#fe1e34] focus-visible:outline-none relative',
                isActive
                  ? 'bg-[#fe1e34]/15 text-[#fe1e34] border-r-2 border-[#fe1e34] shadow-xs'
                  : 'text-[#78716C] dark:text-[#D4D2D2] hover:text-[#1C1917] dark:hover:text-[#FCFCFC] hover:bg-[#F5EFE6] dark:hover:bg-[#262525]'
              )}
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center relative">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-[#fe1e34]' : 'text-[#78716C] dark:text-[#B5B2B2] group-hover:text-[#1C1917] dark:group-hover:text-[#FCFCFC]'
                  )}
                />
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#fe1e34] ring-2 ring-white dark:ring-[#171617] animate-pulse group-hover/sidebar:hidden" />
                ) : null}
              </div>

              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap flex-1 flex items-center justify-between gap-2">
                <span>{item.label}</span>
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-[#fe1e34] text-white rounded-full leading-none">
                    {item.badgeCount}
                  </span>
                ) : null}
              </span>

              {item.private && (
                <Shield className="w-3.5 h-3.5 text-stone-400 dark:text-[#525252] group-hover:text-stone-600 dark:group-hover:text-[#B5B2B2] opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Card */}
      <div className="pt-3 mt-auto border-t border-[#E7E0D8] dark:border-[#393939] overflow-hidden flex-shrink-0">
        <Link
          href="/profile"
          title={user.displayName}
          aria-label={`${user.displayName}'s profile`}
          className="flex items-center gap-3 p-1.5 rounded-xl bg-[#F5EFE6]/60 dark:bg-[#262525]/60 hover:bg-[#F5EFE6] dark:hover:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] transition-all group min-w-max focus-visible:ring-2 focus-visible:ring-[#fe1e34] focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="w-9 h-9 rounded-full object-cover border border-[#fe1e34]/40 flex-shrink-0"
          />
          <div className="flex-1 min-w-0 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <p className="text-xs font-bold text-[#1C1917] dark:text-[#FCFCFC] truncate group-hover:text-[#fe1e34] transition-colors">
              {user.displayName}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#fe1e34] font-extrabold">
              <Sparkles className="w-3 h-3" />
              <span>{user.totalXp.toLocaleString()} XP</span>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
