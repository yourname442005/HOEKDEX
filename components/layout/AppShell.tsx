'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { AchievementUnlockModal } from '@/components/shared/AchievementUnlockModal';
import { ToastContainer } from '@/components/shared/ToastContainer';

const AUTH_PATHS = ['/login', '/signup', '/onboarding'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/' || pathname.startsWith('/landing');
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isLandingPage) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#fcfcfc]">
        {children}
        <ToastContainer />
      </main>
    );
  }

  if (isAuthPage) {
    return (
      <main className="min-h-screen bg-[var(--bg-background)] text-[var(--text-foreground)] transition-colors duration-200">
        {children}
        <ToastContainer />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-foreground)] flex flex-col transition-colors duration-200">
      {/* Desktop Persistent Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-16 flex flex-col min-h-screen transition-all duration-300">
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Notifications */}
      <AchievementUnlockModal />
      <ToastContainer />
    </div>
  );
}
