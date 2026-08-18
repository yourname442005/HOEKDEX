'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Before Hoekdex, I constantly felt guilty forgetting subtle details friends told me. Now I log milestones in 10 seconds. My relationships have never been stronger.",
      name: "Marcus Thorne",
      role: "Architect & Design Lead",
      badge: "Rank #1 · Seasoned Raconteur",
    },
    {
      quote: "The privacy separation is genius. My journal notes and dating history stay 100% encrypted, while I still get to compete on XP rankings on the friend leaderboard.",
      name: "Elena Rostova",
      role: "Product Designer",
      badge: "Master Tier · 480 XP",
    },
    {
      quote: "It turns social care into a daily game. You actually look forward to logging deep conversations and dates because you watch your XP climb.",
      name: "Sam Chen",
      role: "Software Engineer",
      badge: "Novice Adventurer",
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
              // 10. SOCIAL PROOF & EDITORIAL TESTIMONIALS
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fcfcfc] uppercase">
              WHAT PEOPLE SAY.
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#b5b2b2] max-w-md font-light">
            Hear how Hoekdex players level up their relationship mastery and turn casual encounters into meaningful connections.
          </p>
        </div>

        {/* 3 Large Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-[8px] bg-[#171617] border border-[#262525] hover:border-[#fe1e34] transition-all space-y-6 flex flex-col justify-between group relative"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#fe1e34] opacity-60 group-hover:opacity-100 transition-opacity" />
                <p className="font-serif italic text-base sm:text-lg text-[#d4d2d2] font-light leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[#262525] space-y-1">
                <h4 className="text-base font-bold text-[#fcfcfc] uppercase">{t.name}</h4>
                <p className="text-xs text-[#b5b2b2]">{t.role}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-[#262525] text-[10px] font-mono text-[#fe1e34] uppercase">
                  {t.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
