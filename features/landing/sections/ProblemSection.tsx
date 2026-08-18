'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ShieldAlert, UserX, Clock, Brain, RefreshCw } from 'lucide-react';

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  // Fade and translate steps for memory decay elements
  const memoryOpacity1 = useTransform(smoothProgress, [0.15, 0.3, 0.45], [0, 1, 0.2]);
  const memoryOpacity2 = useTransform(smoothProgress, [0.3, 0.45, 0.6], [0, 1, 0.2]);
  const memoryOpacity3 = useTransform(smoothProgress, [0.45, 0.6, 0.75], [0, 1, 0.1]);

  const memoryX1 = useTransform(smoothProgress, [0.15, 0.45], ['0px', '-40px']);
  const memoryX2 = useTransform(smoothProgress, [0.3, 0.6], ['0px', '40px']);
  const memoryX3 = useTransform(smoothProgress, [0.45, 0.75], ['0px', '-30px']);

  const fragmentedBlur = useTransform(smoothProgress, [0.5, 0.8], ['blur(0px)', 'blur(12px)']);

  const steps = [
    {
      num: '01',
      title: 'YOU MEET SOMEONE GREAT',
      sub: 'At an exhibition, hackathon, date, or rooftop party. Great conversation, deep chemistry.',
      badge: 'Day 1',
    },
    {
      num: '02',
      title: 'YOU PROMISE TO REMEMBER',
      sub: 'Their favorite coffee beans, their sibling’s name, that book recommendation, the exact date.',
      badge: 'Day 7',
    },
    {
      num: '03',
      title: 'TIME ERASES THE DETAILS',
      sub: 'Work gets busy. Months slip by. When you bump into them again, the details have dissolved.',
      badge: 'Day 90',
    },
  ];

  return (
    <section
      id="problem"
      ref={containerRef}
      className="relative min-h-screen bg-[#080808] text-[#fcfcfc] py-32 px-6 lg:px-12 border-t border-[#171617]"
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#262525]">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#fe1e34] uppercase block">
              // 02. THE PROBLEM
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fcfcfc] uppercase">
              THE HUMAN MEMORY FAILS.
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#b5b2b2] max-w-md leading-relaxed font-light">
            We meet hundreds of people each year. Our minds are designed to remember emotions, but horrible at retaining precise contextual details.
          </p>
        </div>

        {/* Story Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-[8px] bg-[#171617] border border-[#262525] hover:border-[#393939] transition-all relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-black font-mono text-[#525252] group-hover:text-[#fe1e34] transition-colors">
                  {step.num}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#262525] border border-[#393939] text-[10px] font-mono tracking-widest text-[#d4d2d2] uppercase">
                  {step.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-[#fcfcfc] mb-3 uppercase">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#b5b2b2] leading-relaxed font-light">
                {step.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Memory Decay Simulation Box */}
        <div className="p-8 sm:p-12 rounded-[14.4px] bg-[#171617] border border-[#393939] relative overflow-hidden space-y-8">
          <div className="flex items-center justify-between border-b border-[#262525] pb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-[#fe1e34]" />
              <span className="text-xs font-mono tracking-wider text-[#d4d2d2] uppercase">
                MEMORY DECAY SIMULATION
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-widest">
              [ UNSAVED DATA FADING ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative min-h-[160px] items-center">
            {/* Memory Card 1 */}
            <motion.div
              style={{ opacity: memoryOpacity1, x: memoryX1, filter: fragmentedBlur }}
              className="p-5 rounded-[8px] bg-[#262525] border border-[#393939] space-y-1.5"
            >
              <span className="text-[10px] font-mono text-[#fe1e34] uppercase">PERSON 01</span>
              <p className="text-sm font-bold text-[#fcfcfc]">Maya Lin — Photographer</p>
              <p className="text-xs text-[#b5b2b2]">"Loves Japanese pour-over coffee & 80s vinyl"</p>
            </motion.div>

            {/* Memory Card 2 */}
            <motion.div
              style={{ opacity: memoryOpacity2, x: memoryX2, filter: fragmentedBlur }}
              className="p-5 rounded-[8px] bg-[#262525] border border-[#393939] space-y-1.5"
            >
              <span className="text-[10px] font-mono text-[#fe1e34] uppercase">MILESTONE</span>
              <p className="text-sm font-bold text-[#fcfcfc]">First Romantic Kiss</p>
              <p className="text-xs text-[#b5b2b2]">"Under neon rain awning outside station · July 22"</p>
            </motion.div>

            {/* Memory Card 3 */}
            <motion.div
              style={{ opacity: memoryOpacity3, x: memoryX3, filter: fragmentedBlur }}
              className="p-5 rounded-[8px] bg-[#262525] border border-[#393939] space-y-1.5"
            >
              <span className="text-[10px] font-mono text-[#fe1e34] uppercase">CRITICAL DETAIL</span>
              <p className="text-sm font-bold text-[#fcfcfc]">Allergic to peanuts</p>
              <p className="text-xs text-[#b5b2b2]">"Mentioned casually over dessert"</p>
            </motion.div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-xs font-mono text-[#fe1e34] uppercase tracking-widest block">
              Result: Awkward pauses, forgotten promises, lost momentum.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
