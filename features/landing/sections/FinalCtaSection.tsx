'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section
      className="relative min-h-[90vh] bg-[#080808] text-[#fcfcfc] flex flex-col justify-center items-center py-32 px-6 lg:px-12 border-t border-[#171617] text-center overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fe1e34]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <span className="text-xs font-mono tracking-[0.3em] text-[#fe1e34] uppercase block">
          // 11. START YOUR VAULT
        </span>

        {/* Oversized Concluding Headline */}
        <div className="space-y-1">
          <h2 className="text-[56px] sm:text-[90px] md:text-[130px] font-black uppercase tracking-[-0.080em] leading-[0.88] text-[#fcfcfc]">
            REMEMBER THE
          </h2>
          <div className="flex items-baseline justify-center gap-4 flex-wrap">
            <span className="font-serif italic text-3xl sm:text-6xl md:text-7xl text-[#d4d2d2] font-light">
              people who
            </span>
            <h2 className="text-[56px] sm:text-[90px] md:text-[130px] font-black uppercase tracking-[-0.080em] leading-[0.88] text-[#fe1e34]">
              MATTER.
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6 pt-6 max-w-md mx-auto">
          <p className="text-base sm:text-lg text-[#d4d2d2] font-light leading-relaxed">
            Start tracking connections, logging milestones, and leveling up your relationship intelligence today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-[8px] bg-[#fe1e34] hover:bg-[#ff0000] active:scale-[0.98] text-white text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-xl shadow-[#fe1e34]/30"
            >
              <span>ENTER COMMAND CENTER</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center py-4 px-6 rounded-[8px] bg-[#171617] hover:bg-[#262525] border border-[#393939] text-[#fcfcfc] text-xs font-bold tracking-wider uppercase transition-colors"
            >
              LOG IN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
