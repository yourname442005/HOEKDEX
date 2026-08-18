import React, { useState } from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { Sparkles, ShieldCheck, User as UserIcon, Plus, Sun, Moon, Monitor } from 'lucide-react';
import { PrivacyLock } from '../shared/PrivacyLock';

interface HeaderProps {
  onOpenAddPerson?: () => void;
}

export function Header({ onOpenAddPerson }: HeaderProps) {
  const { user, themeMode, setThemeMode } = useHoekdex();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full bg-[#FAF5EF]/90 dark:bg-[#080808]/90 backdrop-blur-md border-b border-[#E7E0D8] dark:border-[#393939] px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Mobile Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fe1e34] via-[#fe1e34]/90 to-pink-500 flex items-center justify-center text-white shadow-md shadow-[#fe1e34]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#1C1917] dark:text-[#FCFCFC]">HOEKDEX</span>
          </Link>

          {/* Desktop Privacy Shield */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-[#D4D2D2] bg-[#F5EFE6] dark:bg-[#171617] px-3 py-1 rounded-full border border-[#E7E0D8] dark:border-[#393939]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Encrypted Private Vault Mode</span>
          </div>
        </div>

        {/* Right Section: Theme Switcher, XP Pill, Add Person, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PrivacyLock size="sm" showLabel />

          {/* Theme Quick Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              title="Appearance Settings"
              className="p-2 rounded-full bg-[#F5EFE6] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC] hover:text-[#fe1e34] dark:hover:text-[#fe1e34] transition-all cursor-pointer"
            >
              {themeMode === 'dark' ? (
                <Moon className="w-4 h-4 text-[#fe1e34]" />
              ) : themeMode === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Monitor className="w-4 h-4 text-stone-500 dark:text-[#B5B2B2]" />
              )}
            </button>

            {/* Quick Theme Dropdown Menu */}
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] rounded-2xl shadow-xl p-1.5 z-50 space-y-1 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('dark');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#fe1e34]/15 text-[#fe1e34]'
                      : 'text-stone-600 dark:text-[#D4D2D2] hover:bg-[#F5EFE6] dark:hover:bg-[#262525]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-[#fe1e34]" />
                  <span>☾ Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('light');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    themeMode === 'light'
                      ? 'bg-[#fe1e34]/15 text-[#fe1e34]'
                      : 'text-stone-600 dark:text-[#D4D2D2] hover:bg-[#F5EFE6] dark:hover:bg-[#262525]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>☀ Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('system');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    themeMode === 'system'
                      ? 'bg-[#fe1e34]/15 text-[#fe1e34]'
                      : 'text-stone-600 dark:text-[#D4D2D2] hover:bg-[#F5EFE6] dark:hover:bg-[#262525]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-stone-500 dark:text-[#B5B2B2]" />
                  <span>◐ System</span>
                </button>
              </div>
            )}
          </div>

          {/* Current XP Pill */}
          <Link
            href="/achievements"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fe1e34]/10 border border-[#fe1e34]/25 text-[#fe1e34] text-xs font-extrabold hover:bg-[#fe1e34]/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fe1e34]" />
            <span>{user.totalXp} XP</span>
          </Link>

          {/* Add Person CTA (Mobile/Desktop) */}
          {onOpenAddPerson && (
            <button
              type="button"
              onClick={onOpenAddPerson}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fe1e34] hover:bg-[#e0182d] active:scale-95 text-white text-xs font-bold shadow-md shadow-[#fe1e34]/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Person</span>
            </button>
          )}

          {/* Avatar Link */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full overflow-hidden border border-[#E7E0D8] dark:border-[#393939] hover:border-[#fe1e34] transition-colors flex-shrink-0"
            title="View Profile"
          >
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#F5EFE6] dark:bg-[#262525] flex items-center justify-center text-stone-500 dark:text-[#B5B2B2]">
                <UserIcon className="w-4 h-4" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
