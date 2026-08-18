'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHoekdex } from '@/context/hoekdex-context';
import { Sparkles, Shield, User, Trophy, ArrowRight, ArrowLeft, Check, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InviteFriendsModal } from '@/features/friends/InviteFriendsModal';

export function OnboardingView() {
  const router = useRouter();
  const { user, updateUserProfile, updatePrivacySettings } = useHoekdex();

  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState(user.displayName || 'Mukesh Kumar');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || 'https://picsum.photos/seed/mukesh_avatar/200/200');
  const [leaderboardOptIn, setLeaderboardOptIn] = useState(true);
  const [allowFollowerXpView, setAllowFollowerXpView] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const presetAvatars = [
    'https://picsum.photos/seed/mukesh_avatar/200/200',
    'https://picsum.photos/seed/avatar_neo/200/200',
    'https://picsum.photos/seed/avatar_zen/200/200',
    'https://picsum.photos/seed/avatar_luna/200/200',
    'https://picsum.photos/seed/avatar_kai/200/200',
  ];

  const handleComplete = async () => {
    await updateUserProfile({
      displayName: displayName.trim() || 'Mukesh Kumar',
      avatarUrl,
    });
    await updatePrivacySettings({
      leaderboardOptIn,
      allowFollowerXpView,
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-lg bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#fe1e34]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Step Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-[#B5B2B2]">
            <span className="text-[#fe1e34] uppercase tracking-widest">Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Completed</span>
          </div>

          <div className="h-2 w-full bg-[#F5EFE6] dark:bg-[#262525] rounded-full overflow-hidden border border-[#E7E0D8] dark:border-[#393939]">
            <div
              className="h-full bg-gradient-to-r from-[#fe1e34] to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Display Name */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                What should we call you?
              </h2>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] font-medium leading-relaxed">
                This is your public display name shown to friends on the leaderboard.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
                Display Name <span className="text-[#fe1e34]">*</span>
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Mukesh, Alex R., Starboy"
                className="w-full px-4 py-3 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] focus:border-[#fe1e34] rounded-2xl text-[#1C1917] dark:text-[#FCFCFC] font-semibold text-sm focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="button"
                disabled={!displayName.trim()}
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Avatar Selection */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                Pick your Avatar
              </h2>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] font-medium leading-relaxed">
                Choose how your avatar appears on friend cards.
              </p>
            </div>

            {/* Current Selected Avatar Preview */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#fe1e34] shadow-md bg-[#F5EFE6] dark:bg-[#262525]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarUrl} alt="Selected avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Preset selector */}
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2] text-center">
                Choose a Preset
              </span>
              <div className="flex items-center justify-center gap-3">
                {presetAvatars.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset)}
                    className={cn(
                      'w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer',
                      avatarUrl === preset
                        ? 'border-[#fe1e34] ring-2 ring-[#fe1e34] scale-110 shadow-md'
                        : 'border-stone-300 dark:border-[#393939] opacity-70 hover:opacity-100'
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-stone-700 dark:text-[#D4D2D2] hover:text-stone-900 dark:hover:text-[#FCFCFC] text-sm font-bold transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Privacy Preferences */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-2xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                  Privacy Preferences
                </h2>
              </div>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] font-medium leading-relaxed">
                Hoekdex defaults to complete confidentiality. Configure your social boundaries.
              </p>
            </div>

            {/* Toggle 1 */}
            <div className="p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#1C1917] dark:text-[#FCFCFC]">Join Friend Leaderboards</p>
                <p className="text-xs text-stone-500 dark:text-[#B5B2B2]">
                  Allow mutual friends to compare XP ranks.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={leaderboardOptIn}
                onClick={() => setLeaderboardOptIn(!leaderboardOptIn)}
                className={cn(
                  'w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5',
                  leaderboardOptIn ? 'bg-[#fe1e34]' : 'bg-stone-200 dark:bg-[#393939] border border-[#E7E0D8] dark:border-[#525252]'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full bg-white transition-transform shadow-xs',
                    leaderboardOptIn ? 'translate-x-6' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#1C1917] dark:text-[#FCFCFC]">Share XP on Public Profile</p>
                <p className="text-xs text-stone-500 dark:text-[#B5B2B2]">
                  Let followers see your total score on search.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={allowFollowerXpView}
                onClick={() => setAllowFollowerXpView(!allowFollowerXpView)}
                className={cn(
                  'w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5',
                  allowFollowerXpView ? 'bg-[#fe1e34]' : 'bg-stone-200 dark:bg-[#393939] border border-[#E7E0D8] dark:border-[#525252]'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full bg-white transition-transform shadow-xs',
                    allowFollowerXpView ? 'translate-x-6' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-full bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-stone-700 dark:text-[#D4D2D2] hover:text-stone-900 dark:hover:text-[#FCFCFC] text-sm font-bold transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Optional Social Step */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-500/15 border border-pink-500/30 text-pink-600 dark:text-pink-400 flex items-center justify-center shadow-lg shadow-pink-500/10">
                <Users className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                Want to bring your people in?
              </h2>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] font-medium leading-relaxed max-w-sm mx-auto">
                Hoekdex is more fun when your friends are here. Compare XP stats and level up together.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] space-y-2 text-xs text-stone-700 dark:text-[#D4D2D2]">
              <p className="font-bold text-[#1C1917] dark:text-[#FCFCFC]">Optional Social Boost</p>
              <p className="text-[11px] text-stone-600 dark:text-[#B5B2B2] leading-relaxed">
                Invite friends now, or skip and add them anytime later from your Friends page.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Invite Friends</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(5)}
                className="w-full py-2.5 text-xs font-bold text-stone-500 dark:text-[#B5B2B2] hover:text-stone-800 dark:hover:text-[#FCFCFC] transition-colors cursor-pointer text-center"
              >
                Skip for now
              </button>
            </div>

            <div className="pt-2 border-t border-[#E7E0D8] dark:border-[#393939] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-full text-stone-500 dark:text-[#B5B2B2] hover:text-stone-900 dark:hover:text-[#FCFCFC] text-xs font-bold transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="text-xs font-extrabold text-[#fe1e34] hover:underline"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Ready & Product Tour Welcome */}
        {step === 5 && (
          <div className="space-y-5 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#fe1e34]/15 border border-[#fe1e34]/30 text-[#fe1e34] flex items-center justify-center shadow-lg shadow-[#fe1e34]/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                You&apos;re All Set, {displayName}!
              </h2>
              <p className="text-xs text-stone-500 dark:text-[#B5B2B2] leading-relaxed max-w-sm mx-auto font-medium">
                Your private vault is ready. Add your first connection, log meaningful milestones, and earn XP.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="text-left space-y-2 p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-xs text-stone-700 dark:text-[#D4D2D2]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>100% Private, encrypted personal dating journal</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Earn XP for conversations, dates & milestones</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Zero private data leaked to friends or leaderboards</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleComplete}
                className="w-full py-3.5 px-6 text-sm font-black text-white bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 rounded-full shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
              >
                Enter Command Center
              </button>
            </div>
          </div>
        )}
      </div>

      <InviteFriendsModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </div>
  );
}
