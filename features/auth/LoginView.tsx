'use client';

import React from 'react';
import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { Sparkles, ShieldCheck } from 'lucide-react';

export function LoginView() {
  return (
    <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-md flex flex-col items-center space-y-6 relative">
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

        {/* Clerk Sign In Component */}
        <div className="w-full flex justify-center">
          <SignIn
            routing="path"
            path="/login"
            signUpUrl="/signup"
            fallbackRedirectUrl="/dashboard"
          />
        </div>

        {/* Security badge */}
        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-[#B5B2B2] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>End-to-End Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
