'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, Clock, UserCheck, ShieldCheck, Trophy } from 'lucide-react';

export function HowItWorksSection() {
  const pillars = [
    {
      num: '01',
      title: 'REMEMBER PEOPLE',
      desc: 'Keep private records of the people in your life — photos, contact handles, date first met, custom notes, and tier categories.',
      icon: Users,
      highlight: 'Tier Categories (Beginner → Legendary)',
    },
    {
      num: '02',
      title: 'LOG MOMENTS',
      desc: 'Log quick coffee meetups, deep late-night conversations, dinner dates, or major relationship milestones and gain XP instantly.',
      icon: Sparkles,
      highlight: '+25 XP to +300 XP per milestone',
    },
    {
      num: '03',
      title: 'TIMELINE & HISTORY',
      desc: 'A beautiful chronological timeline of your entire social journey. Review memories, tier upgrades, and unlocked achievement trophies.',
      icon: Clock,
      highlight: 'End-to-end encrypted journal history',
    },
    {
      num: '04',
      title: 'SOCIAL & LEADERBOARD',
      desc: 'Add friends, send invites, and compare total XP ranks on private leaderboards while your personal notes remain 100% confidential.',
      icon: UserCheck,
      highlight: 'Zero private data exposure guarantee',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative min-h-screen bg-[#080808] text-[#fcfcfc] py-32 px-6 lg:px-12 border-t border-[#171617]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262525]">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#fe1e34] uppercase block">
              // 05. CORE ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fcfcfc] uppercase">
              HOW HOEKDEX WORKS.
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#b5b2b2] max-w-md font-light">
            Built as a dual-layer system: a 100% private personal journal on the inside, and a competitive social game on the outside.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-[8px] bg-[#171617] border border-[#262525] hover:border-[#fe1e34] transition-all space-y-6 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-[8px] bg-[#262525] border border-[#393939] text-[#fe1e34] group-hover:bg-[#fe1e34] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black font-mono text-[#525252] group-hover:text-[#fe1e34] transition-colors">
                    {pillar.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-[#fcfcfc] uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#b5b2b2] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262525] flex items-center gap-2 text-xs font-mono text-[#fe1e34]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34]" />
                  <span>{pillar.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
