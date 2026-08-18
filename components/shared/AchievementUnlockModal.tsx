'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Achievement } from '@/types/domain';
import { useHoekdex } from '@/context/hoekdex-context';
import { Trophy, Crown, Sparkles, Award, Users, CalendarHeart, Flame, Medal, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AchievementUnlockModalProps {
  achievement?: Achievement | null;
  onClose?: () => void;
}

export function AchievementUnlockModal({
  achievement: propAchievement,
  onClose: propOnClose,
}: AchievementUnlockModalProps) {
  const { achievementModalPayload, closeAchievementModal } = useHoekdex();

  const achievement = propAchievement !== undefined ? propAchievement : achievementModalPayload;
  const onClose = propOnClose || closeAchievementModal;
  useEffect(() => {
    if (!achievement) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      try {
        // Fire celebration confetti cannon
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E11D48', '#F43F5E', '#F59E0B', '#10B981', '#3B82F6'],
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#E11D48', '#F43F5E', '#F59E0B'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#E11D48', '#F43F5E', '#3B82F6'],
          });
        }, 300);

        return () => clearTimeout(timer);
      } catch (e) {
        console.error('Confetti trigger failed:', e);
      }
    }
  }, [achievement]);

  if (!achievement) return null;

  const renderIcon = (iconName: string) => {
    const iconClass = 'w-16 h-16 text-rose-600';
    switch (iconName) {
      case 'Crown':
        return <Crown className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'CalendarHeart':
        return <CalendarHeart className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'Medal':
        return <Medal className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Trophy':
      default:
        return <Trophy className={iconClass} />;
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EF] to-[#F3ECE2] border-2 border-rose-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Radial ambient glow background */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close achievement celebration"
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Achievement Unlocked!
          </div>

          {/* Icon with scale entrance */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-rose-500/15 to-pink-500/20 border-2 border-rose-400/50 flex items-center justify-center shadow-xl shadow-rose-500/10"
          >
            {renderIcon(achievement.icon)}
          </motion.div>

          {/* Title & Description */}
          <h2 id="achievement-modal-title" className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight mb-2">
            {achievement.title}
          </h2>

          <p className="text-sm text-stone-600 font-medium leading-relaxed mb-6">
            {achievement.description}
          </p>

          {/* XP Reward Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-sm font-extrabold mb-8">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>+{achievement.xpReward} XP Reward Claimed!</span>
          </div>

          {/* Action */}
          <div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-6 text-sm font-black text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-[0.98] rounded-full shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
            >
              Awesome, Keep Going!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
