'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHoekdex } from '@/context/hoekdex-context';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export function SignupView() {
  const router = useRouter();
  const { showToast } = useHoekdex();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast('Please accept the privacy terms to continue', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      showToast('Account created! Setting up your vault...', 'success');
      router.push('/onboarding');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFDF9] border border-[#E7E0D8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            Create your HOEKDEX
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Start tracking milestones & leveling up your relationship journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] focus:border-rose-500 rounded-xl text-[#1C1917] text-sm focus:outline-none placeholder-stone-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] focus:border-rose-500 rounded-xl text-[#1C1917] text-sm focus:outline-none placeholder-stone-400"
              />
            </div>
          </div>

          {/* Privacy Guarantee Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-stone-300 bg-[#F5EFE6] text-rose-600 focus:ring-rose-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-stone-700 leading-tight cursor-pointer">
              I understand that my private journal entries are encrypted and never shared on public leaderboards.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating Account...' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Security badge */}
        <div className="pt-2 border-t border-[#E7E0D8] text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Data Selling · Complete User Sovereignty</span>
          </div>
        </div>

        {/* Switch to Sign In */}
        <p className="text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link href="/login" className="text-rose-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
