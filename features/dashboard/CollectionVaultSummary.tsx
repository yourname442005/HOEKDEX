'use client';

import React from 'react';
import Link from 'next/link';
import { useHoekdex } from '@/context/hoekdex-context';
import { Card } from '@/components/ui/card';
import { TierBadge } from '@/components/shared/TierBadge';
import { Users, Plus, ChevronRight, Sparkles } from 'lucide-react';
import { TIERS } from '@/lib/constants';

interface CollectionVaultSummaryProps {
  onOpenAddPerson: () => void;
}

export function CollectionVaultSummary({ onOpenAddPerson }: CollectionVaultSummaryProps) {
  const { people, dashboardStats } = useHoekdex();

  const recentPeople = people.slice(0, 5);

  return (
    <Card variant="default" padding="default" className="space-y-4 bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-h3 text-[#1C1917] dark:text-[#FCFCFC]">Personal Vault</h3>
            <p className="text-small text-stone-500 dark:text-[#B5B2B2]">{people.length} {people.length === 1 ? 'connection' : 'connections'} recorded</p>
          </div>
        </div>

        <Link
          href="/people"
          className="flex items-center gap-1 text-xs font-bold text-[#fe1e34] hover:underline"
        >
          <span>Manage Vault</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Connection Avatars Row */}
      {people.length > 0 ? (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939]">
          <div className="flex items-center -space-x-2 overflow-hidden">
            {recentPeople.map((person) => (
              <Link
                key={person.id}
                href={`/people/${person.id}`}
                className="relative w-9 h-9 rounded-full border-2 border-[#FFFDF9] dark:border-[#171617] overflow-hidden hover:z-10 hover:scale-110 transition-all shadow-xs"
                title={`${person.name} (${person.tier})`}
              >
                {person.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#fe1e34]/15 flex items-center justify-center text-[10px] font-black text-[#fe1e34]">
                    {person.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </Link>
            ))}

            {people.length > 5 && (
              <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-[#393939] border-2 border-[#FFFDF9] dark:border-[#171617] flex items-center justify-center text-xs font-bold text-stone-700 dark:text-[#D4D2D2] shadow-xs">
                +{people.length - 5}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenAddPerson}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFFDF9] dark:bg-[#171617] hover:bg-[#E7E0D8] dark:hover:bg-[#393939] border border-[#E7E0D8] dark:border-[#393939] text-xs font-bold text-stone-700 dark:text-[#D4D2D2] transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#fe1e34]" />
            <span>Add</span>
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#262525] border border-dashed border-[#E7E0D8] dark:border-[#393939] text-center space-y-2">
          <p className="text-xs font-bold text-[#1C1917] dark:text-[#FCFCFC]">Your vault is empty</p>
          <button
            type="button"
            onClick={onOpenAddPerson}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#fe1e34] hover:bg-[#e0182d] rounded-full shadow-xs"
          >
            Add Connection
          </button>
        </div>
      )}

      {/* Tier Breakdown Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {TIERS.map((t) => {
          const count = dashboardStats.tierDistribution[t] || 0;
          if (count === 0) return null;
          return (
            <div key={t} className="flex items-center gap-1">
              <TierBadge tier={t} size="sm" />
              <span className="text-xs font-extrabold text-stone-700 dark:text-[#D4D2D2]">×{count}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
