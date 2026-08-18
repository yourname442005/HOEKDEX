'use client';

import React, { useState, useMemo } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { PersonCard } from './PersonCard';
import { AddPersonSheet } from './AddPersonSheet';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { TierBadge } from '@/components/shared/TierBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TIERS, CATEGORIES } from '@/lib/constants';
import { Search, Plus, SlidersHorizontal, UserPlus, Users, ArrowUpDown, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PersonGrid() {
  const { people } = useHoekdex();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'xp'>('recent');
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPeople = useMemo(() => {
    return people
      .filter((person) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = person.name.toLowerCase().includes(q);
          const matchesHandle = person.socialHandle?.toLowerCase().includes(q);
          const matchesNotes = person.notes?.toLowerCase().includes(q);
          if (!matchesName && !matchesHandle && !matchesNotes) return false;
        }

        // Tier filter
        if (selectedTier !== 'All' && person.tier !== selectedTier) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && person.category !== selectedCategory) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'xp') {
          return b.xpFromPerson - a.xpFromPerson;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // Recent
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [people, searchQuery, selectedTier, selectedCategory, sortBy]);

  return (
    <div className="space-y-6 pb-24 lg:pb-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <span className="text-[10px] font-mono text-[#fe1e34] uppercase tracking-widest block font-bold mb-1">
          // YOUR PEOPLE
        </span>
        <PageHeader
          title="My People Collection"
          description={people.length > 0 ? "You're building quite a history. Every connection is private, encrypted, and yours." : "First one in the collection starts your personal history."}
          showPrivacyLock
          privacyTooltip="Your vault collection is 100% confidential."
          badge={
            <span className="px-3 py-1 text-xs font-black bg-[#fe1e34]/10 border border-[#fe1e34]/25 text-[#fe1e34] rounded-full">
              {people.length} {people.length === 1 ? 'Record' : 'Records'}
            </span>
          }
          actions={
            <Button
              variant="default"
              size="default"
              onClick={() => setIsAddSheetOpen(true)}
              className="bg-[#fe1e34] hover:bg-[#e0182d] text-white"
            >
              <Plus className="w-4 h-4" />
              <span>Add Connection</span>
            </Button>
          }
        />
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 dark:text-[#525252] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, handle, or notes..."
              className="pl-10 pr-16 bg-[#FFFDF9] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500 dark:text-[#B5B2B2] hover:text-stone-800 dark:hover:text-[#FCFCFC]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <div className="flex items-center gap-2 bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-700 dark:text-[#D4D2D2] shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#fe1e34]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'name' | 'xp')}
                  className="bg-transparent text-[#1C1917] dark:text-[#FCFCFC] focus:outline-none cursor-pointer pr-2"
                >
                  <option value="recent" className="dark:bg-[#171617]">Sort: Most Recent</option>
                  <option value="xp" className="dark:bg-[#171617]">Sort: Highest XP</option>
                  <option value="name" className="dark:bg-[#171617]">Sort: Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Filter Toggle button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer shadow-xs',
                showFilters || selectedTier !== 'All' || selectedCategory !== 'All'
                  ? 'bg-[#fe1e34]/10 text-[#fe1e34] border-[#fe1e34]/30'
                  : 'bg-[#FFFDF9] dark:bg-[#171617] text-stone-600 dark:text-[#B5B2B2] border-[#E7E0D8] dark:border-[#393939] hover:text-stone-900 dark:hover:text-[#FCFCFC]'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Pills row */}
        <div className={cn('flex flex-wrap items-center gap-2 pt-1', !showFilters && 'hidden sm:flex')}>
          <span className="text-xs font-bold text-stone-500 mr-1">Tiers:</span>
          <button
            type="button"
            onClick={() => setSelectedTier('All')}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer',
              selectedTier === 'All'
                ? 'bg-rose-600 text-white'
                : 'bg-[#F5EFE6] text-stone-600 hover:text-stone-900 border border-[#E7E0D8]'
            )}
          >
            All Tiers
          </button>
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTier(t)}
              className={cn(
                'rounded-full transition-all cursor-pointer',
                selectedTier === t ? 'ring-2 ring-rose-500 scale-105' : 'opacity-80 hover:opacity-100'
              )}
            >
              <TierBadge tier={t} size="sm" />
            </button>
          ))}

          <div className="h-4 w-px bg-[#E7E0D8] mx-2 hidden sm:block" />

          <span className="text-xs font-bold text-stone-500 mr-1">Category:</span>
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer',
              selectedCategory === 'All'
                ? 'bg-rose-600 text-white'
                : 'bg-[#F5EFE6] text-stone-600 hover:text-stone-900 border border-[#E7E0D8]'
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer',
                selectedCategory === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#F5EFE6] text-stone-600 hover:text-stone-900 border border-[#E7E0D8]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* People Collection Grid */}
      {filteredPeople.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {/* Distinct "+ Add someone" card embedded directly in the collection grid */}
          <button
            type="button"
            onClick={() => setIsAddSheetOpen(true)}
            className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FFF5F5] border-2 border-dashed border-rose-300 hover:border-rose-500 hover:bg-[#FFF7ED] transition-all duration-200 shadow-xs hover:-translate-y-0.5 min-h-[190px] text-center cursor-pointer select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-inner">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-[#1C1917] group-hover:text-rose-600 transition-colors">
              + Add someone
            </h3>
            <p className="text-[11px] text-stone-500 font-medium mt-1 leading-snug">
              Record a new connection in your private vault
            </p>
          </button>

          {/* Person Cards */}
          {filteredPeople.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ) : people.length === 0 ? (
        <EmptyState
          icon={Users}
          title="First one in the collection"
          description="Add your first person to start logging milestone moments and building your relationship vault!"
          actionLabel="Add Someone to Vault"
          onAction={() => setIsAddSheetOpen(true)}
        />
      ) : (
        <EmptyState
          icon={Search}
          title="No records match your filters"
          description="Try clearing your search query or adjusting tier/category filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedTier('All');
            setSelectedCategory('All');
          }}
        />
      )}

      {/* Mobile Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsAddSheetOpen(true)}
        aria-label="Add Person"
        className="sm:hidden fixed right-5 bottom-20 z-30 w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-2xl shadow-rose-600/40 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
      >
        <UserPlus className="w-6 h-6" />
      </button>

      {/* Add Person Overlay Sheet */}
      <AddPersonSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
      />
    </div>
  );
}
