'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-[#171617] text-[#fcfcfc] border-t border-[#262525] pt-20 pb-12 px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#262525]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#fe1e34] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter text-[#fcfcfc]">
                HOEKDEX
              </span>
            </Link>
            <p className="text-xs text-[#b5b2b2] font-light max-w-sm leading-relaxed">
              Private, gamified relationship intelligence platform. Track people, log milestones, and compare XP on private friend leaderboards.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Secured Confidentiality</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* Column 1: PRODUCT */}
            <div className="space-y-3">
              <span className="text-[10px] text-[#fe1e34] uppercase tracking-widest block">PRODUCT</span>
              <ul className="space-y-2 text-[#b5b2b2]">
                <li><Link href="/dashboard" className="hover:text-[#fcfcfc] transition-colors">Command Center</Link></li>
                <li><Link href="/people" className="hover:text-[#fcfcfc] transition-colors">My People Journal</Link></li>
                <li><Link href="/timeline" className="hover:text-[#fcfcfc] transition-colors">Timeline History</Link></li>
                <li><Link href="/achievements" className="hover:text-[#fcfcfc] transition-colors">Trophies & Badges</Link></li>
              </ul>
            </div>

            {/* Column 2: SOCIAL */}
            <div className="space-y-3">
              <span className="text-[10px] text-[#fe1e34] uppercase tracking-widest block">SOCIAL LAYER</span>
              <ul className="space-y-2 text-[#b5b2b2]">
                <li><Link href="/friends" className="hover:text-[#fcfcfc] transition-colors">Friends & Requests</Link></li>
                <li><Link href="/leaderboard" className="hover:text-[#fcfcfc] transition-colors">XP Leaderboards</Link></li>
                <li><Link href="/profile" className="hover:text-[#fcfcfc] transition-colors">Public Profile Card</Link></li>
                <li><Link href="/onboarding" className="hover:text-[#fcfcfc] transition-colors">Social Onboarding</Link></li>
              </ul>
            </div>

            {/* Column 3: ACCOUNT & LEGAL */}
            <div className="space-y-3">
              <span className="text-[10px] text-[#fe1e34] uppercase tracking-widest block">ACCOUNT & PRIVACY</span>
              <ul className="space-y-2 text-[#b5b2b2]">
                <li><Link href="/login" className="hover:text-[#fcfcfc] transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-[#fcfcfc] transition-colors">Create Vault</Link></li>
                <li><Link href="/settings/privacy" className="hover:text-[#fcfcfc] transition-colors">Privacy Controls</Link></li>
                <li><Link href="/settings" className="hover:text-[#fcfcfc] transition-colors">Account Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#525252] font-mono">
          <p>© {new Date().getFullYear()} HOEKDEX. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[#d4d2d2]">
            <span>Built by</span>
            <span className="font-bold text-[#fcfcfc]">Shubham Karar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
