'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth, RedirectToSignIn } from '@clerk/nextjs';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { AchievementUnlockModal } from '@/components/shared/AchievementUnlockModal';
import { ToastContainer } from '@/components/shared/ToastContainer';
import { Loader2 } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

  const isLandingPage = pathname === '/' || pathname.startsWith('/landing');
  const isPublicAuthPage = pathname === '/login' || pathname === '/signup';

  // Public Landing Page
  if (isLandingPage) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#fcfcfc]">
        {children}
        <ToastContainer />
      </main>
    );
  }

  // Public Login and Signup pages
  if (isPublicAuthPage) {
    return (
      <main className="min-h-screen bg-[var(--bg-background)] text-[var(--text-foreground)] transition-colors duration-200">
        {children}
        <ToastContainer />
      </main>
    );
  }

  // Authenticated App Routes (Dashboard, People, Timeline, Onboarding, Settings, etc.)
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4 transition-colors duration-200">
        <div className="flex flex-col items-center gap-3 text-stone-500 dark:text-[#B5B2B2]">
          <Loader2 className="w-8 h-8 text-[#fe1e34] animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Securing Vault...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Onboarding page (authenticated)
  if (pathname.startsWith('/onboarding')) {
    return (
      <main className="min-h-screen bg-[var(--bg-background)] text-[var(--text-foreground)] transition-colors duration-200">
        {children}
        <ToastContainer />
      </main>
    );
  }

  // Standard Protected App Shell
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
