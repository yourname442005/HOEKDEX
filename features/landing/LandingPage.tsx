'use client';

import React from 'react';
import { LandingNav } from './LandingNav';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { RealizationSection } from './sections/RealizationSection';
import { HoekdexRevealSection } from './sections/HoekdexRevealSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { StickyProductShowcase } from './sections/StickyProductShowcase';
import { GamificationSection } from './sections/GamificationSection';
import { SocialSection } from './sections/SocialSection';
import { PrivacySection } from './sections/PrivacySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FinalCtaSection } from './sections/FinalCtaSection';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#fcfcfc] font-sans antialiased overflow-x-hidden selection:bg-[#fe1e34] selection:text-white">
      {/* Top Header Navigation */}
      <LandingNav />

      {/* Narrative Scroll Flow */}
      <main>
        {/* 01. Hero */}
        <HeroSection />

        {/* 02. The Problem */}
        <ProblemSection />

        {/* 03. The Realization */}
        <RealizationSection />

        {/* 04. Meet Hoekdex Reveal */}
        <HoekdexRevealSection />

        {/* 05. How It Works Pillars */}
        <HowItWorksSection />

        {/* 06. Interactive Sticky Product Showcase */}
        <StickyProductShowcase />

        {/* 07. Gamification & Trophies */}
        <GamificationSection />

        {/* 08. Social Network Topology */}
        <SocialSection />

        {/* 09. Privacy Architecture */}
        <PrivacySection />

        {/* 10. Social Proof Testimonials */}
        <TestimonialsSection />

        {/* 11. Concluding CTA */}
        <FinalCtaSection />
      </main>

      {/* Editorial Footer */}
      <LandingFooter />
    </div>
  );
}
