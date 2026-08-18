'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Flame, Zap, Award, Crown, Target } from 'lucide-react';

export function GamificationSection() {
  const tiers = [
    { name: 'Beginner', xp: '0-99 XP', color: 'border-stone-600 text-stone-400' },
    { name: 'Good', xp: '100-199 XP', color: 'border-emerald-500 text-emerald-400' },
    { name: 'Elite', xp: '200-349 XP', color: 'border-blue-500 text-blue-400' },
    { name: 'Master', xp: '350-499 XP', color: 'border-purple-500 text-purple-400' },
    { name: 'Legendary', xp: '500+ XP', color: 'border-[#fe1e34] text-[#fe1e34]' },
  ];

  const trophies = [
    { title: 'First Entry', desc: 'Added first connection to private journal', icon: Target },
    { title: 'First Date Logged', desc: 'Logged a proper dinner date activity', icon: Flame },
    { title: 'Novice Adventurer', desc: 'Earned over 250 relationship XP', icon: Zap },
    { title: 'Seasoned Raconteur', desc: 'Logged 10 late-night deep conversations', icon: Award },
    { title: 'Legendary Encounter', desc: 'Reached Legendary tier with a connection', icon: Crown },
    { title: 'Master of Hearts', desc: 'Top 3 on weekly friend leaderboard', icon: Trophy },
  ];

  return (
    <section
      id="gamification"
      className="relative min-h-screen bg-[#080808] text-[#fcfcfc] py-32 px-6 lg:px-12 border-t border-[#171617]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262525]">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#fe1e34] uppercase block">
              // 07. GAMIFICATION & REWARDS
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fcfcfc] uppercase">
              REMEMBERING PEOPLE SHOULD FEEL GOOD.
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#b5b2b2] max-w-md font-light">
            Turn social care into an engaging personal game. Earn XP for meaningful interactions, advance through relationship tiers, and unlock collectible trophy badges.
          </p>
        </div>

        {/* Relationship Tiers Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-[#fcfcfc] uppercase">
              FIVE RELATIONSHIP TIERS
            </h3>
            <span className="text-xs font-mono text-[#fe1e34]">AUTOMATIC PROGRESSION ON XP THRESHOLDS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-5 rounded-[8px] bg-[#171617] border ${tier.color} text-center space-y-2 transition-all hover:scale-105`}
              >
                <h4 className="text-base font-bold uppercase">{tier.name}</h4>
                <span className="text-xs font-mono block text-[#b5b2b2]">{tier.xp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Collectible Trophies Showcase Grid */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-[#fcfcfc] uppercase">
              COLLECTIBLE TROPHY BADGES
            </h3>
            <span className="text-xs font-mono text-[#b5b2b2]">SHOWCASE ON PUBLIC PROFILE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trophies.map((trophy, i) => {
              const Icon = trophy.icon;
              return (
                <motion.div
                  key={trophy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-[8px] bg-[#171617] border border-[#262525] hover:border-[#fe1e34] transition-all flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-[8px] bg-[#262525] text-amber-500 group-hover:bg-[#fe1e34] group-hover:text-white transition-all flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#fcfcfc] group-hover:text-[#fe1e34] transition-colors">
                      {trophy.title}
                    </h4>
                    <p className="text-xs text-[#b5b2b2] font-light leading-relaxed">
                      {trophy.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
