'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHoekdex } from '@/context/hoekdex-context';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export function LoginView() {
  const router = useRouter();
  const { showToast } = useHoekdex();
  const [email, setEmail] = useState('user@hoekdex.app');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      showToast('Welcome back to Hoekdex!', 'success');
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-md bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#fe1e34]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#fe1e34]/15 border border-[#fe1e34]/30 text-[#fe1e34] flex items-center justify-center shadow-lg shadow-[#fe1e34]/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
            Sign In to HOEKDEX
          </h1>
          <p className="text-xs text-stone-500 dark:text-[#B5B2B2] font-medium">
            Your private, gamified dating and relationship journal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 dark:text-[#525252] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] focus:border-[#fe1e34] rounded-xl text-[#1C1917] dark:text-[#FCFCFC] text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[#D4D2D2]">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to email', 'info')}
                className="text-[11px] font-semibold text-[#fe1e34] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 dark:text-[#525252] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] focus:border-[#fe1e34] rounded-xl text-[#1C1917] dark:text-[#FCFCFC] text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-[#fe1e34]/20 transition-all cursor-pointer"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Security badge */}
        <div className="pt-2 border-t border-[#E7E0D8] dark:border-[#393939] text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-[#B5B2B2] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>End-to-End Privacy Guaranteed</span>
          </div>
        </div>

        {/* Switch to Sign Up */}
        <p className="text-center text-xs text-stone-500 dark:text-[#B5B2B2]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#fe1e34] font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
