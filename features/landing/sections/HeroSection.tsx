'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll transforms
  const textY1 = useTransform(smoothProgress, [0, 1], ['0%', '-40%']);
  const textY2 = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const textY3 = useTransform(smoothProgress, [0, 1], ['0%', '-60%']);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  // Arterial red dot movement across screen
  const dotX = useTransform(smoothProgress, [0, 1], ['0px', '220px']);
  const dotY = useTransform(smoothProgress, [0, 1], ['0px', '180px']);
  const dotScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.8, 0.6]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] bg-[#080808] text-[#fcfcfc] flex flex-col justify-between pt-32 pb-16 px-6 lg:px-12 overflow-hidden select-none"
    >
      {/* Background Decorative Geometric Shapes */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#171617] rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] bg-[#262525] rounded-full blur-[140px] opacity-30 pointer-events-none" />

      {/* Main Content & Oversized Typography */}
      <motion.div
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10"
      >
        {/* Top Tagline / Category Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fe1e34]" />
          <span className="text-xs font-mono tracking-[0.25em] text-[#d4d2d2] uppercase">
            // SOCIAL RELATIONSHIP INTELLIGENCE
          </span>
        </div>

        {/* Oversized Stacked Display Headline */}
        <div className="space-y-1 sm:space-y-2 relative">
          {/* Animated Red Dot travelling along display typography */}
          <motion.div
            style={{ x: dotX, y: dotY, scale: dotScale }}
            className="absolute top-8 left-64 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#fe1e34] shadow-lg shadow-[#fe1e34]/50 z-20 pointer-events-none hidden md:block"
          />

          {/* Line 1: YOU */}
          <motion.div style={{ y: textY1 }} className="overflow-hidden">
            <h1 className="text-[72px] sm:text-[120px] md:text-[160px] font-black leading-[0.88] tracking-[-0.075em] uppercase text-[#fcfcfc] flex items-baseline gap-4">
              <span>YOU</span>
              <span className="font-serif italic font-light text-2xl sm:text-5xl md:text-6xl text-[#d4d2d2] tracking-normal lowercase font-normal">
                always
              </span>
            </h1>
          </motion.div>

          {/* Line 2: FORGET */}
          <motion.div style={{ y: textY2 }} className="overflow-hidden">
            <h1 className="text-[72px] sm:text-[120px] md:text-[160px] font-black leading-[0.88] tracking-[-0.075em] uppercase text-[#fe1e34]">
              FORGET.
            </h1>
          </motion.div>

          {/* Line 3: PEOPLE */}
          <motion.div style={{ y: textY3 }} className="overflow-hidden">
            <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
              <h1 className="text-[72px] sm:text-[120px] md:text-[160px] font-black leading-[0.88] tracking-[-0.075em] uppercase text-[#fcfcfc]">
                PEOPLE.
              </h1>
              <span className="font-serif italic text-xl sm:text-3xl md:text-4xl text-[#b5b2b2] tracking-tight">
                the ones that matter
              </span>
            </div>
          </motion.div>
        </div>

        {/* Subtitle & Action Trigger Controls */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 border-t border-[#262525]">
          <div className="md:col-span-7 space-y-3">
            <p className="text-base sm:text-lg md:text-xl text-[#d4d2d2] font-normal leading-relaxed max-w-xl">
              Hoekdex is a private relationship memory engine. Track people, log milestones, remember conversations, and compare XP with your crew.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-end">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-[8px] bg-[#fe1e34] hover:bg-[#ff0000] active:scale-[0.98] text-white text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-lg shadow-[#fe1e34]/30"
            >
              <span>ENTER COMMAND CENTER</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <a
              href="#problem"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[8px] bg-[#171617] hover:bg-[#262525] text-[#d4d2d2] hover:text-[#fcfcfc] text-xs font-bold tracking-wider uppercase border border-[#393939] transition-all"
            >
              <span>EXPLORE</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer Bar / Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-12 flex items-center justify-between text-xs text-[#525252] font-mono tracking-widest uppercase relative z-10 border-t border-[#171617]/80 mt-12">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#fe1e34]" />
          <span>SYSTEM ACTIVE · ZERO DATA EXPOSURE</span>
        </div>

        <a
          href="#problem"
          className="flex items-center gap-2 text-[#b5b2b2] hover:text-[#fcfcfc] transition-colors group cursor-pointer"
        >
          <span>SCROLL TO BEGIN STORY</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#fe1e34] animate-bounce" />
        </a>
      </div>
    </section>
  );
}
