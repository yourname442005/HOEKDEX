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
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 w-16 hover:w-64 bg-[#FFFDF9] border-r border-[#E7E0D8] p-3 select-none transition-[width] duration-300 ease-in-out shadow-lg shadow-stone-900/5 group/sidebar overflow-hidden"
      aria-label="Sidebar navigation"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-12 px-1 mb-4 border-b border-[#E7E0D8] overflow-hidden flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group min-w-max focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none rounded-xl p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 border border-rose-400/40 flex items-center justify-center text-white shadow-sm shadow-rose-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <span className="text-base font-black tracking-tight text-[#1C1917] block leading-none">
              HOEKDEX
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-rose-600 block mt-0.5">
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
                'flex items-center gap-3.5 px-2.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-150 group min-w-max focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none relative',
                isActive
                  ? 'bg-rose-500/10 text-rose-600 border-r-2 border-rose-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5EFE6]'
              )}
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center relative">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-rose-600' : 'text-stone-500 group-hover:text-stone-800'
                  )}
                />
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-white animate-pulse group-hover/sidebar:hidden" />
                ) : null}
              </div>

              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap flex-1 flex items-center justify-between gap-2">
                <span>{item.label}</span>
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-rose-600 text-white rounded-full leading-none">
                    {item.badgeCount}
                  </span>
                ) : null}
              </span>

              {item.private && (
                <Shield className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Card */}
      <div className="pt-3 mt-auto border-t border-[#E7E0D8] overflow-hidden flex-shrink-0">
        <Link
          href="/profile"
          title={user.displayName}
          aria-label={`${user.displayName}'s profile`}
          className="flex items-center gap-3 p-1.5 rounded-xl bg-[#F5EFE6]/60 hover:bg-[#F5EFE6] border border-[#E7E0D8] transition-all group min-w-max focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="w-9 h-9 rounded-full object-cover border border-rose-400/40 flex-shrink-0"
          />
          <div className="flex-1 min-w-0 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <p className="text-xs font-bold text-[#1C1917] truncate group-hover:text-rose-600 transition-colors">
              {user.displayName}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-rose-600 font-extrabold">
              <Sparkles className="w-3 h-3" />
              <span>{user.totalXp.toLocaleString()} XP</span>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
