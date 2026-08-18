'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#problem' },
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'SHOWCASE', href: '#showcase' },
    { label: 'GAMIFICATION', href: '#gamification' },
    { label: 'PRIVACY', href: '#privacy' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-[#262525] py-3.5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#fe1e34] flex items-center justify-center text-white shadow-sm shadow-[#fe1e34]/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-[#fcfcfc] font-sans">
              HOEKDEX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34] animate-pulse" />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-[#d4d2d2]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#fcfcfc] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#fe1e34] group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-semibold tracking-widest text-[#b5b2b2] hover:text-[#fcfcfc] transition-colors px-3 py-1.5"
            >
              LOG IN
            </Link>

            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-transparent border border-[#d4d2d2]/40 hover:border-[#fe1e34] text-[#fcfcfc] text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-[#fe1e34]/20"
            >
              <span>GET STARTED</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#fe1e34] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#fcfcfc] hover:text-[#fe1e34] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl pt-24 px-8 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6">
              <span className="text-[10px] tracking-widest text-[#fe1e34] font-mono uppercase block border-b border-[#262525] pb-2">
                // NAVIGATION
              </span>

              <nav className="flex flex-col gap-5 text-2xl font-bold tracking-tight text-[#fcfcfc]">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#fe1e34] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#525252]" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#262525]">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[8px] bg-[#fe1e34] text-white text-sm font-extrabold tracking-wider uppercase shadow-lg shadow-[#fe1e34]/30"
              >
                <span>ENTER COMMAND CENTER</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 rounded-[8px] bg-[#171617] border border-[#393939] text-[#fcfcfc] text-xs font-bold tracking-wider uppercase"
              >
                LOG IN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
