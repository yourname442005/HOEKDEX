'use client';

import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Share2, Users, Flame, QrCode } from 'lucide-react';

export function SocialSection() {
  const actions = [
    {
      title: 'SEARCH & ADD FRIENDS',
      desc: 'Find players on Hoekdex by username handle (@handle) and send friend requests.',
      icon: UserPlus,
    },
    {
      title: 'INVITE YOUR CREW',
      desc: 'Generate referral invite links with native Web Share API and instant clipboard copy.',
      icon: Share2,
    },
    {
      title: 'QR PASS SHARING',
      desc: 'Show a safe public QR pass code for instant in-person social connection.',
      icon: QrCode,
    },
    {
      title: 'FRIEND LEADERBOARDS',
      desc: 'Compare total relationship XP ranks on weekly & monthly friend-only leaderboards.',
      icon: Flame,
    },
  ];

  return (
    <section
      className="relative min-h-screen bg-[#080808] text-[#fcfcfc] py-32 px-6 lg:px-12 border-t border-[#171617]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262525]">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#fe1e34] uppercase block">
              // 08. SOCIAL NETWORK LAYER
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fcfcfc] uppercase">
              BRING YOUR CREW INTO THE GAME.
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#b5b2b2] max-w-md font-light">
            Hoekdex is not just a personal vault — it&apos;s a social game. Invite friends, follow mutual players, and compare relationship XP in friendly competition.
          </p>
        </div>

        {/* Network Diagram Concept */}
        <div className="p-8 sm:p-12 rounded-[14.4px] bg-[#171617] border border-[#393939] text-center space-y-8 relative overflow-hidden">
          <span className="text-xs font-mono text-[#fe1e34] uppercase tracking-widest block">
            SOCIAL NETWORK TOPOLOGY
          </span>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative py-6">
            {/* Node 1: YOU */}
            <div className="flex flex-col items-center space-y-2 z-10">
              <div className="w-16 h-16 rounded-full bg-[#fe1e34] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#fe1e34]/40">
                YOU
              </div>
              <span className="text-xs font-bold text-[#fcfcfc]">Mukesh (@mukesh_k)</span>
              <span className="text-[10px] font-mono text-[#fe1e34]">675 XP · Rank #3</span>
            </div>

            {/* Connecting Line 1 */}
            <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-[#fe1e34] to-[#393939]" />

            {/* Node 2: MUTUAL FRIENDS */}
            <div className="flex flex-col items-center space-y-2 z-10">
              <div className="w-16 h-16 rounded-full bg-[#262525] border-2 border-[#fe1e34] text-white flex items-center justify-center font-bold text-lg">
                <Users className="w-6 h-6 text-[#fe1e34]" />
              </div>
              <span className="text-xs font-bold text-[#fcfcfc]">MUTUAL FRIENDS</span>
              <span className="text-[10px] font-mono text-[#b5b2b2]">Alex, Jordan, Sam</span>
            </div>

            {/* Connecting Line 2 */}
            <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-[#393939] to-[#fe1e34]" />

            {/* Node 3: YOUR NETWORK */}
            <div className="flex flex-col items-center space-y-2 z-10">
              <div className="w-16 h-16 rounded-full bg-[#262525] border border-[#393939] text-[#b5b2b2] flex items-center justify-center font-bold text-lg">
                <Flame className="w-6 h-6 text-amber-500" />
              </div>
              <span className="text-xs font-bold text-[#fcfcfc]">LEADERBOARD NETWORK</span>
              <span className="text-[10px] font-mono text-[#b5b2b2]">Weekly XP Rankings</span>
            </div>
          </div>
        </div>

        {/* 4 Social Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.title}
                className="p-6 rounded-[8px] bg-[#171617] border border-[#262525] hover:border-[#fe1e34] transition-all space-y-4 group"
              >
                <div className="p-3 rounded-[8px] bg-[#262525] text-[#fe1e34] w-fit group-hover:bg-[#fe1e34] group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#fcfcfc] uppercase">
                  {act.title}
                </h3>
                <p className="text-xs text-[#b5b2b2] font-light leading-relaxed">
                  {act.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
