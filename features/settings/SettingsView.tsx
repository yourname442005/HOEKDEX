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
  const { user, showToast, resetToDefaults } = useHoekdex();

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
        description="Manage your account credentials, notifications, and security policies."
      />

      {/* Prominent Privacy Navigation Card */}
      <Link
        href="/settings/privacy"
        className="block p-5 rounded-3xl bg-gradient-to-r from-rose-500/10 via-[#FFFDF9] to-[#FFFDF9] border border-rose-400/50 hover:border-rose-500 transition-all shadow-xs group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 flex items-center justify-center shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#1C1917] group-hover:text-rose-600 transition-colors">
                  Privacy & Data Controls
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                  Encrypted
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Leaderboard visibility, Data Export, and Account deletion
              </p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#F5EFE6] border border-[#E7E0D8] text-stone-500 group-hover:text-[#1C1917] group-hover:translate-x-1 transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Account Credentials */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917]">Account Information</h3>

        <form onSubmit={handleSaveAccount} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Account Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] focus:border-rose-500 rounded-xl text-sm text-[#1C1917] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => showToast('Password reset link sent to your email.', 'info')}
              className="text-xs font-bold text-rose-600 hover:text-rose-500 cursor-pointer"
            >
              Change Password
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 rounded-full shadow-md shadow-rose-600/20 cursor-pointer"
            >
              {isSaved ? 'Saved!' : 'Save Email'}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917]">Notification Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#E7E0D8]">
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[#1C1917]">In-App Milestone Alerts</p>
              <p className="text-xs text-stone-500">
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
                notificationsEnabled ? 'bg-rose-600' : 'bg-stone-200 border border-[#E7E0D8]'
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
              <p className="text-sm font-bold text-[#1C1917]">Weekly Friend Digest</p>
              <p className="text-xs text-stone-500">
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
                emailNotifications ? 'bg-rose-600' : 'bg-stone-200 border border-[#E7E0D8]'
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
      <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
        <h3 className="text-base font-black text-[#1C1917]">Demonstration & State Reset</h3>
        <p className="text-xs text-stone-500 leading-relaxed">
          Restore sample people (Maya, Elena, Clara, Sophie), sample timeline events, and starter achievement progress.
        </p>
        <button
          type="button"
          onClick={resetToDefaults}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5EFE6] hover:bg-[#E7E0D8] border border-[#E7E0D8] text-xs font-bold text-stone-700 hover:text-stone-900 transition-all cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>Reset to Demo Data</span>
        </button>
      </div>

      {/* Sign Out Action */}
      <div className="pt-2">
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-xs font-bold text-rose-600 transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span>Sign Out of Hoekdex</span>
        </Link>
      </div>
    </div>
  );
}
