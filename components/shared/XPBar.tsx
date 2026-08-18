'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Trophy } from 'lucide-react';

interface XPBarProps {
  currentXp: number;
  prevThresholdXp: number;
  nextThresholdXp: number;
  className?: string;
  showDetails?: boolean;
  recentGain?: { amount: number; key: number } | null;
}

export function XPBar({
  currentXp,
  prevThresholdXp,
  nextThresholdXp,
  className,
  showDetails = true,
  recentGain,
}: XPBarProps) {
  const [displayXp, setDisplayXp] = useState(currentXp);
  const [floatingGain, setFloatingGain] = useState<{ amount: number; key: number } | null>(null);
  const isFirstMount = useRef(true);
  const prevXpRef = useRef(currentXp);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevXpRef.current = currentXp;
      return;
    }

    if (currentXp !== prevXpRef.current) {
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        prevXpRef.current = currentXp;
        const id = setTimeout(() => setDisplayXp(currentXp), 0);
        return () => clearTimeout(id);
      }

      // Count-up animation (400ms)
      const startXp = prevXpRef.current;
      const targetXp = currentXp;
      const duration = 400;
      const startTime = performance.now();
      let animFrameId: number;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const interpolated = Math.round(startXp + (targetXp - startXp) * easeOut);
        setDisplayXp(interpolated);

        if (progress < 1) {
          animFrameId = requestAnimationFrame(animate);
        } else {
          setDisplayXp(targetXp);
          prevXpRef.current = targetXp;
        }
      };

      animFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animFrameId);
    }
  }, [currentXp]);

  useEffect(() => {
    if (recentGain) {
      const showTimer = setTimeout(() => {
        setFloatingGain(recentGain);
      }, 0);
      const hideTimer = setTimeout(() => {
        setFloatingGain(null);
      }, 1200);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [recentGain]);

  const range = Math.max(nextThresholdXp - prevThresholdXp, 1);
  const currentInTier = Math.max(0, currentXp - prevThresholdXp);
  const percentage = Math.min(Math.max((currentInTier / range) * 100, 0), 100);
  const xpNeeded = Math.max(0, nextThresholdXp - currentXp);

  return (
    <div className={cn('w-full relative', className)}>
      {showDetails && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-[#1C1917] tracking-tight">
                  {displayXp.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/25">
                  XP Earned
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-stone-600">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Next Goal: {nextThresholdXp.toLocaleString()} XP</span>
            </div>
            <span className="text-[11px] text-stone-500">
              {xpNeeded > 0 ? `${xpNeeded.toLocaleString()} XP to unlock next milestone` : 'Threshold reached!'}
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={currentXp}
        aria-valuemin={prevThresholdXp}
        aria-valuemax={nextThresholdXp}
        aria-label="Relationship XP Progress"
        className="h-3 w-full bg-[#F5EFE6] rounded-full overflow-hidden p-0.5 border border-[#E7E0D8] relative"
      >
        <div
          className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative shadow-sm shadow-rose-500/30"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle glossy gleam */}
          <div className="absolute inset-0 bg-white/25 rounded-full opacity-70" />
        </div>
      </div>

      {/* Floating +XP Animation */}
      {floatingGain && (
        <div
          key={floatingGain.key}
          className="absolute -top-6 right-8 pointer-events-none z-30 font-black text-sm text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-lg shadow-emerald-900/10 animate-float-up"
        >
          +{floatingGain.amount} XP!
        </div>
      )}
    </div>
  );
}
