'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, EyeOff, Key, Database, FileCheck } from 'lucide-react';

export function PrivacySection() {
  const privacyGuarantees = [
    {
      title: 'PRIVATE JOURNAL ENCRYPTION',
      desc: 'Your private people collection, notes, photos, and specific milestone dates remain client-secured and encrypted.',
      icon: Lock,
    },
    {
      title: 'STRICT ALLOWLIST ENFORCEMENT',
      desc: 'Only display name, avatar, and total XP score can ever be rendered on social leaderboards or friend cards.',
      icon: EyeOff,
    },
    {
      title: 'ZERO DATA SELLING',
      desc: 'Your personal dating and relationship memory records are 100% owned by you. We never monetize or sell personal data.',
      icon: ShieldCheck,
    },
    {
      title: 'COMPLETE SOVEREIGNTY',
      desc: 'Export your complete journal backup anytime in JSON format or trigger instant permanent account deletion.',
      icon: Key,
    },
  ];

  return (
    <section
      id="privacy"
      className="relative min-h-screen bg-[#080808] text-[#fcfcfc] py-32 px-6 lg:px-12 border-t border-[#171617]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Huge Typographic Banner */}
        <div className="space-y-2 border-b border-[#262525] pb-12">
          <span className="text-xs font-mono tracking-[0.3em] text-[#fe1e34] uppercase block">
            // 09. PRIVACY ARCHITECTURE
          </span>
          <h2 className="text-[56px] sm:text-[90px] md:text-[120px] font-black uppercase tracking-[-0.075em] leading-[0.88] text-[#fcfcfc]">
            YOUR PEOPLE. <span className="text-[#fe1e34]">YOUR DATA.</span>
          </h2>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {privacyGuarantees.map((g, idx) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-[8px] bg-[#171617] border border-[#262525] hover:border-emerald-500/50 transition-all space-y-4 group"
              >
                <div className="p-3 rounded-[8px] bg-[#262525] text-emerald-400 w-fit group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#fcfcfc] uppercase">
                  {g.title}
                </h3>
                <p className="text-sm text-[#b5b2b2] font-light leading-relaxed">
                  {g.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Privacy Security Stamp Box */}
        <div className="p-6 rounded-[8px] bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-emerald-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 flex-shrink-0" />
            <span>VERIFIED CONFIDENTIALITY: Strictly zero personal journal data exposed to friends or public APIs.</span>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 uppercase tracking-widest font-bold flex-shrink-0">
            AUDITED SAFE
          </span>
        </div>
      </div>
    </section>
  );
}
