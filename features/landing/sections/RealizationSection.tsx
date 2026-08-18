'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export function RealizationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
  });

  // Typography scroll transforms
  const letterSpacing = useTransform(smoothProgress, [0.2, 0.6], ['-0.08em', '0.04em']);
  const yPeople = useTransform(smoothProgress, [0.1, 0.5], ['60px', '0px']);
  const opacityYou = useTransform(smoothProgress, [0.2, 0.45], [0, 1]);
  const yDont = useTransform(smoothProgress, [0.3, 0.65], ['80px', '0px']);
  const scaleForget = useTransform(smoothProgress, [0.4, 0.75], [0.85, 1]);
  const opacityForget = useTransform(smoothProgress, [0.4, 0.75], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] bg-[#080808] text-[#fcfcfc] flex flex-col justify-center items-center py-32 px-6 overflow-hidden border-t border-[#171617] select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-[#fe1e34]/10 via-transparent to-transparent pointer-events-none blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto w-full text-center space-y-6 relative z-10">
        <span className="text-xs font-mono tracking-[0.3em] text-[#fe1e34] uppercase block">
          // 03. THE REALIZATION
        </span>

        {/* Scroll-Driven Typographic Assembly */}
        <div className="space-y-0 sm:space-y-2">
          {/* Row 1: PEOPLE */}
          <motion.div style={{ y: yPeople }}>
            <h2 className="text-[64px] sm:text-[110px] md:text-[140px] font-black uppercase tracking-[-0.075em] leading-[0.88] text-[#fcfcfc]">
              PEOPLE
            </h2>
          </motion.div>

          {/* Row 2: YOU DON'T */}
          <motion.div
            style={{ opacity: opacityYou, y: yDont }}
            className="flex items-baseline justify-center gap-4 flex-wrap"
          >
            <span className="font-serif italic text-3xl sm:text-6xl md:text-7xl text-[#d4d2d2] font-light">
              you
            </span>
            <h2 className="text-[64px] sm:text-[110px] md:text-[140px] font-black uppercase tracking-[-0.075em] leading-[0.88] text-[#fe1e34]">
              DON&apos;T
            </h2>
          </motion.div>

          {/* Row 3: WANT TO FORGET */}
          <motion.div style={{ scale: scaleForget, opacity: opacityForget }}>
            <div className="flex items-baseline justify-center gap-4 sm:gap-6 flex-wrap">
              <span className="font-serif italic text-2xl sm:text-5xl md:text-6xl text-[#b5b2b2]">
                never want to
              </span>
              <h2 className="text-[64px] sm:text-[110px] md:text-[140px] font-black uppercase tracking-[-0.075em] leading-[0.88] text-[#fcfcfc]">
                FORGET.
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Narrative Statement */}
        <div className="pt-12 max-w-2xl mx-auto space-y-4">
          <p className="text-sm sm:text-base md:text-lg text-[#d4d2d2] font-normal leading-relaxed">
            Your relationships are your richest asset. Remembering the details isn&apos;t just polite — it&apos;s a superpower that turns casual acquaintances into lifelong connections.
          </p>
          <div className="w-16 h-[2px] bg-[#fe1e34] mx-auto" />
        </div>
      </div>
    </section>
  );
}
