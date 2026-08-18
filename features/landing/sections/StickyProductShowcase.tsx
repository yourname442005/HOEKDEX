'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Users, Sparkles, Clock, Trophy, UserCheck, ShieldCheck, Heart, Crown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StickyProductShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'people',
      num: '01',
      title: 'PERSON PROFILE & TIERS',
      subtitle: 'Organize your network with intelligence',
      description: 'Assign tiers (Beginner, Good, Elite, Master, Legendary) based on emotional chemistry. Keep detailed private notes on favorite things, conversation topics, and important dates.',
    },
    {
      id: 'activities',
      num: '02',
      title: 'LOG MOMENTS & CLAIM XP',
      subtitle: 'Earn relationship experience points',
      description: 'Claim standard or custom activities — from coffee meetups to late-night 3 AM talks. Each milestone awards XP, boosting your total score and advancing your global rank.',
    },
    {
      id: 'timeline',
      num: '03',
      title: 'PRIVATE TIMELINE MEMORIES',
      subtitle: 'Chronological history of your social life',
      description: 'Relive every connection added, milestone achieved, tier transition, and trophy unlocked in an encrypted, searchable timeline stream.',
    },
    {
      id: 'friends',
      num: '04',
      title: 'FRIENDS & LEADERBOARDS',
      subtitle: 'Bring your crew into the game',
      description: 'Follow mutual friends, send invite links, search handles, and compare weekly XP totals on private leaderboards — while your personal records remain 100% confidential.',
    },
  ];

  return (
    <section
      id="showcase"
      className="relative bg-[#080808] text-[#fcfcfc] py-32 px-6 lg:px-12 border-t border-[#171617]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 pb-8 border-b border-[#262525]">
          <span className="text-xs font-mono tracking-[0.25em] text-[#fe1e34] uppercase block">
            // 06. INTERACTIVE PRODUCT DEMONSTRATION
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fcfcfc] uppercase">
            EXPERIENCE THE INTERFACE.
          </h2>
        </div>

        {/* Two-Column Sticky Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    'p-6 rounded-[8px] border transition-all cursor-pointer select-none space-y-2',
                    isActive
                      ? 'bg-[#171617] border-[#fe1e34] shadow-lg shadow-[#fe1e34]/10'
                      : 'bg-[#080808] border-[#262525] hover:border-[#393939] opacity-70 hover:opacity-100'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#fe1e34] uppercase tracking-widest">
                      {step.num} · {step.subtitle}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#fe1e34] animate-pulse" />}
                  </div>

                  <h3 className="text-xl font-bold text-[#fcfcfc] uppercase">
                    {step.title}
                  </h3>

                  {isActive && (
                    <p className="text-xs sm:text-sm text-[#b5b2b2] font-light leading-relaxed pt-2 border-t border-[#262525] animate-in fade-in duration-200">
                      {step.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Mockup Display Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-[14.4px] bg-[#171617] border border-[#393939] shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-center">
            {/* Top Device Chrome Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#262525] text-xs font-mono text-[#525252]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#fe1e34]/80" />
                <span className="w-3 h-3 rounded-full bg-[#393939]" />
                <span className="w-3 h-3 rounded-full bg-[#393939]" />
              </div>
              <span className="text-[#fe1e34]">HOEKDEX INTERFACE // PREVIEW</span>
            </div>

            {/* Step 0: Person Profile Mockup */}
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-[8px] bg-[#080808] border border-[#393939] space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#262525] border-2 border-[#fe1e34] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://picsum.photos/seed/maya_portrait/200/200" alt="Maya Lin" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#fcfcfc]">Maya Lin</h4>
                        <p className="text-xs text-[#fe1e34] font-mono">@maya.design · Legendary Tier</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#fe1e34]/15 border border-[#fe1e34]/30 text-[#fe1e34] text-xs font-bold">
                      +375 XP Total
                    </span>
                  </div>

                  <div className="p-4 rounded-[8px] bg-[#171617] border border-[#262525] text-xs space-y-1.5">
                    <span className="text-[10px] font-mono text-[#525252] uppercase block">PRIVATE NOTES</span>
                    <p className="text-[#d4d2d2] italic font-serif">
                      "Met at the contemporary photography exhibition. Amazing dry wit and deep taste in Japanese coffee beans."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-[8px] bg-[#171617] border border-[#262525]">
                      <span className="text-[10px] text-[#525252] block font-mono">FIRST MET</span>
                      <span className="text-[#fcfcfc] font-bold">July 15, 2026</span>
                    </div>
                    <div className="p-3 rounded-[8px] bg-[#171617] border border-[#262525]">
                      <span className="text-[10px] text-[#525252] block font-mono">CATEGORY</span>
                      <span className="text-[#fcfcfc] font-bold">Dating & Connection</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Log Activity Mockup */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-[8px] bg-[#080808] border border-[#fe1e34]/40 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#262525] pb-3">
                    <span className="text-xs font-mono text-[#fe1e34] uppercase">+ LOG MILESTONE MOMENT</span>
                    <span className="text-xs text-[#b5b2b2]">Maya Lin</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-[8px] bg-[#fe1e34]/10 border border-[#fe1e34]/30 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#fcfcfc]">Late-Night Deep Convo (3 AM)</p>
                        <p className="text-[11px] text-[#d4d2d2]">Discussed architecture and mantras until sunrise</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#fe1e34] text-white font-extrabold">
                        +150 XP
                      </span>
                    </div>

                    <div className="p-3.5 rounded-[8px] bg-[#171617] border border-[#262525] flex items-center justify-between text-xs opacity-75">
                      <div>
                        <p className="font-bold text-[#fcfcfc]">Proper First Dinner Date</p>
                        <p className="text-[11px] text-[#b5b2b2]">Tasting menu at Bar Goto</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#262525] text-[#d4d2d2] font-bold">
                        +100 XP
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-[8px] bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>XP credited to your account and updated on friend leaderboards!</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Timeline Stream Mockup */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-[8px] bg-[#080808] border border-[#393939] space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-[8px] bg-[#171617] border border-[#262525] text-xs">
                    <div className="p-2 rounded-full bg-amber-500/15 text-amber-500">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#fcfcfc]">Unlocked "Legendary Encounter"</p>
                      <p className="text-[10px] text-[#b5b2b2]">Earned 300 Bonus XP for first Legendary connection</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-[8px] bg-[#171617] border border-[#262525] text-xs">
                    <div className="p-2 rounded-full bg-[#fe1e34]/15 text-[#fe1e34]">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#fcfcfc]">Tier Upgrade: Maya Lin → Legendary</p>
                      <p className="text-[10px] text-[#b5b2b2]">Exceeded 350 relationship XP threshold</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Friends & Leaderboard Mockup */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-[8px] bg-[#080808] border border-[#393939] space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-[8px] bg-[#171617] border border-[#fe1e34]/40">
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-[#fe1e34]">#1</span>
                      <p className="font-bold text-[#fcfcfc]">Alex Rivers (@alex_rivers)</p>
                    </div>
                    <span className="font-black text-[#fe1e34]">1,450 XP</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-[8px] bg-[#171617] border border-[#262525]">
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-[#b5b2b2]">#2</span>
                      <p className="font-bold text-[#fcfcfc]">Jordan Cruz (@jordan_cruz)</p>
                    </div>
                    <span className="font-black text-[#b5b2b2]">980 XP</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-[8px] bg-[#fe1e34]/10 border border-[#fe1e34]/30">
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-[#fe1e34]">#3 (YOU)</span>
                      <p className="font-bold text-[#fcfcfc]">Mukesh Kumar (@mukesh_k)</p>
                    </div>
                    <span className="font-black text-[#fe1e34]">675 XP</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
