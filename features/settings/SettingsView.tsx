'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  Shield,
  Bell,
  Mail,
  Lock,
  ChevronRight,
  RotateCcw,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsView() {
  const { user, showToast, resetToDefaults, themeMode, setThemeMode } = useHoekdex();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    showToast('Account email settings updated', 'success');
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Settings & Preferences"
        description="Manage your account credentials, theme appearance, notifications, and security policies."
      />

      {/* Prominent Privacy Navigation Card */}
      <Link
        href="/settings/privacy"
        className="block p-5 rounded-3xl bg-gradient-to-r from-[#fe1e34]/10 via-[#FFFDF9] dark:via-[#171617] to-[#FFFDF9] dark:to-[#171617] border border-[#fe1e34]/40 hover:border-[#fe1e34] transition-all shadow-xs group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#fe1e34]/15 border border-[#fe1e34]/30 text-[#fe1e34] flex items-center justify-center shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#1C1917] dark:text-[#FCFCFC] group-hover:text-[#fe1e34] transition-colors">
                  Privacy & Data Controls
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Encrypted
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] mt-0.5">
                Leaderboard visibility, Data Export, and Account deletion
              </p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-stone-500 dark:text-[#B5B2B2] group-hover:text-[#1C1917] dark:group-hover:text-[#FCFCFC] group-hover:translate-x-1 transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Appearance & Theme (Section 7) */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#1C1917] dark:text-[#FCFCFC]">Appearance & Theme</h3>
          <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-wider font-bold">
            {themeMode.toUpperCase()} MODE ACTIVE
          </span>
        </div>

        <p className="text-xs text-stone-500 dark:text-[#B5B2B2]">
          Choose how Hoekdex looks for you. Dark mode matches the editorial landing page canvas.
        </p>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {/* Dark Option (Default) */}
          <button
            type="button"
            onClick={() => {
              setThemeMode('dark');
              showToast('Switched to Dark theme', 'info');
            }}
            className={cn(
              'p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer',
              themeMode === 'dark'
                ? 'bg-[#262525] border-[#fe1e34] ring-2 ring-[#fe1e34]/30 shadow-md'
                : 'bg-[#F5EFE6] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] opacity-75 hover:opacity-100'
            )}
          >
            <div className="w-8 h-8 rounded-full bg-[#080808] border border-[#393939] flex items-center justify-center text-[#fe1e34]">
              ☾
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">Dark</p>
              <p className="text-[10px] text-stone-500 dark:text-[#B5B2B2]">Editorial (Default)</p>
            </div>
          </button>

          {/* Light Option */}
          <button
            type="button"
            onClick={() => {
              setThemeMode('light');
              showToast('Switched to Light theme', 'info');
            }}
            className={cn(
              'p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer',
              themeMode === 'light'
                ? 'bg-[#FFFDF9] border-[#fe1e34] ring-2 ring-[#fe1e34]/30 shadow-md'
                : 'bg-[#F5EFE6] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] opacity-75 hover:opacity-100'
            )}
          >
            <div className="w-8 h-8 rounded-full bg-[#FAF5EF] border border-[#E7E0D8] flex items-center justify-center text-amber-500 font-bold">
              ☀
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">Light</p>
              <p className="text-[10px] text-stone-500 dark:text-[#B5B2B2]">Cream Classic</p>
            </div>
          </button>

          {/* System Option */}
          <button
            type="button"
            onClick={() => {
              setThemeMode('system');
              showToast('Theme set to match System', 'info');
            }}
            className={cn(
              'p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer',
              themeMode === 'system'
                ? 'bg-[#262525] dark:bg-[#262525] border-[#fe1e34] ring-2 ring-[#fe1e34]/30 shadow-md'
                : 'bg-[#F5EFE6] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] opacity-75 hover:opacity-100'
            )}
          >
            <div className="w-8 h-8 rounded-full bg-[#393939] border border-[#525252] flex items-center justify-center text-white font-bold">
              ◐
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#1C1917] dark:text-[#FCFCFC]">System</p>
              <p className="text-[10px] text-stone-500 dark:text-[#B5B2B2]">OS Preference</p>
            </div>
          </button>
        </div>
      </div>

      {/* Account Credentials */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917] dark:text-[#FCFCFC]">Account Information</h3>

        <form onSubmit={handleSaveAccount} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
              Account Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 dark:text-[#525252] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] focus:border-[#fe1e34] rounded-xl text-sm text-[#1C1917] dark:text-[#FCFCFC] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => showToast('Password reset link sent to your email.', 'info')}
              className="text-xs font-bold text-[#fe1e34] hover:underline cursor-pointer"
            >
              Change Password
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 rounded-full shadow-md shadow-[#fe1e34]/20 cursor-pointer"
            >
              {isSaved ? 'Saved!' : 'Save Email'}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917] dark:text-[#FCFCFC]">Notification Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#E7E0D8] dark:border-[#393939]">
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[#1C1917] dark:text-[#FCFCFC]">In-App Milestone Alerts</p>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2]">
                Celebration banners and XP notifications when milestones are claimed.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notificationsEnabled}
              onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
                showToast('Notification preference saved', 'info');
              }}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5',
                notificationsEnabled ? 'bg-[#fe1e34]' : 'bg-stone-200 dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939]'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full bg-white transition-transform shadow-xs',
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[#1C1917] dark:text-[#FCFCFC]">Weekly Friend Digest</p>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2]">
                Summary of weekly XP ranks among friends (no private entries).
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={emailNotifications}
              onClick={() => {
                setEmailNotifications(!emailNotifications);
                showToast('Email preference saved', 'info');
              }}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5',
                emailNotifications ? 'bg-[#fe1e34]' : 'bg-stone-200 dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939]'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full bg-white transition-transform shadow-xs',
                  emailNotifications ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Developer / Demo Controls */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917] dark:text-[#FCFCFC]">Demonstration & State Reset</h3>
        <p className="text-xs text-stone-500 dark:text-[#B5B2B2] leading-relaxed">
          Restore sample people (Maya, Elena, Clara, Sophie), sample timeline events, and starter achievement progress.
        </p>
        <button
          type="button"
          onClick={resetToDefaults}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5EFE6] dark:bg-[#262525] hover:bg-[#E7E0D8] dark:hover:bg-[#393939] border border-[#E7E0D8] dark:border-[#393939] text-xs font-bold text-stone-700 dark:text-[#D4D2D2] transition-all cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-[#fe1e34]" />
          <span>Reset to Demo Data</span>
        </button>
      </div>

      {/* Sign Out Action */}
      <div className="pt-2">
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#fe1e34]/10 dark:bg-[#fe1e34]/15 hover:bg-[#fe1e34]/20 border border-[#fe1e34]/30 text-xs font-bold text-[#fe1e34] transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#fe1e34]" />
          <span>Sign Out of Hoekdex</span>
        </Link>
      </div>
    </div>
  );
}
