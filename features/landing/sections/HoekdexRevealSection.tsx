'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, Shield, Trophy, Users, Flame, Heart, Crown } from 'lucide-react';

export function HoekdexRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });

  // UI Fragments assembly offsets
  const cardLeftX = useTransform(smoothProgress, [0.2, 0.6], ['-120px', '0px']);
  const cardRightX = useTransform(smoothProgress, [0.2, 0.6], ['120px', '0px']);
  const badgeTopY = useTransform(smoothProgress, [0.25, 0.65], ['-80px', '0px']);
  const badgeBottomY = useTransform(smoothProgress, [0.25, 0.65], ['80px', '0px']);
  const centerScale = useTransform(smoothProgress, [0.15, 0.5], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] bg-[#080808] text-[#fcfcfc] flex flex-col justify-center items-center py-32 px-6 overflow-hidden border-t border-[#171617]"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#fe1e34]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10 text-center">
        {/* Header Tag */}
        <motion.div style={{ opacity }} className="space-y-2">
          <span className="text-xs font-mono tracking-[0.3em] text-[#fe1e34] uppercase block">
            // 04. THE REVEAL
          </span>
          <h3 className="text-sm sm:text-base text-[#b5b2b2] font-mono uppercase tracking-widest">
            INTRODUCING THE GAMIFIED RELATIONSHIP VAULT
          </h3>
        </motion.div>

        {/* Central Assembling Stage */}
        <div className="relative py-12 flex flex-col items-center justify-center">
          {/* Floating UI Fragment 1 (Top Left Badge) */}
          <motion.div
            style={{ x: cardLeftX, y: badgeTopY, opacity }}
            className="absolute top-0 left-4 sm:left-12 p-3.5 rounded-[8px] bg-[#171617] border border-[#fe1e34] shadow-xl text-left hidden sm:flex items-center gap-3 z-20"
          >
            <div className="p-2 rounded-full bg-[#fe1e34]/20 text-[#fe1e34]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#fcfcfc]">Legendary Tier</p>
              <p className="text-[10px] text-[#fe1e34] font-mono">+375 XP Unlocked</p>
            </div>
          </motion.div>

          {/* Floating UI Fragment 2 (Top Right Badge) */}
          <motion.div
            style={{ x: cardRightX, y: badgeTopY, opacity }}
            className="absolute top-4 right-4 sm:right-12 p-3.5 rounded-[8px] bg-[#171617] border border-[#393939] shadow-xl text-left hidden sm:flex items-center gap-3 z-20"
          >
            <div className="p-2 rounded-full bg-amber-500/20 text-amber-500">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#fcfcfc]">Seasoned Raconteur</p>
              <p className="text-[10px] text-[#b5b2b2] font-mono">Trophy Showcase</p>
            </div>
          </motion.div>

          {/* Core Word: HOEKDEX */}
          <motion.div style={{ scale: centerScale, opacity }} className="relative z-10">
            <h2 className="text-[72px] sm:text-[130px] md:text-[180px] font-black tracking-[-0.080em] uppercase leading-[0.85] text-[#fcfcfc]">
              HOEKDEX<span className="text-[#fe1e34]">.</span>
            </h2>
          </motion.div>

          {/* Floating UI Fragment 3 (Bottom Left Card) */}
          <motion.div
            style={{ x: cardLeftX, y: badgeBottomY, opacity }}
            className="absolute bottom-0 left-8 sm:left-24 p-4 rounded-[8px] bg-[#171617] border border-[#393939] shadow-xl text-left hidden md:flex items-center gap-3 z-20"
          >
            <div className="w-8 h-8 rounded-full bg-[#262525] border border-[#393939] flex items-center justify-center font-bold text-xs text-[#fe1e34]">
              #1
            </div>
            <div>
              <p className="text-xs font-bold text-[#fcfcfc]">Private Leaderboard</p>
              <p className="text-[10px] text-[#b5b2b2]">Zero Personal Data Leaked</p>
            </div>
          </motion.div>

          {/* Floating UI Fragment 4 (Bottom Right Card) */}
          <motion.div
            style={{ x: cardRightX, y: badgeBottomY, opacity }}
            className="absolute bottom-2 right-8 sm:right-24 p-4 rounded-[8px] bg-[#171617] border border-[#262525] shadow-xl text-left hidden md:flex items-center gap-3 z-20"
          >
            <Shield className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs font-bold text-[#fcfcfc]">End-to-End Privacy</p>
              <p className="text-[10px] text-emerald-400 font-mono">100% Client Secured</p>
            </div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-base sm:text-lg text-[#d4d2d2] font-light leading-relaxed">
            A single platform that blends personal journal privacy with gamified relationship progression, milestones, XP leaderboards, and trophies.
          </p>
        </div>
      </div>
    </section>
  );
}
