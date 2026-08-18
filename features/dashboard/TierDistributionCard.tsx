'use client';

import React from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { TIERS, TIER_CONFIG } from '@/lib/constants';
import { TierBadge } from '@/components/shared/TierBadge';
import { Crown, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export function TierDistributionCard() {
  const { dashboardStats, people } = useHoekdex();
  const total = Math.max(people.length, 1);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] border border-[#E7E0D8] space-y-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-rose-600" />
          <h3 className="text-base font-black text-[#1C1917]">Tier Distribution</h3>
        </div>
        <Link
          href="/people"
          className="text-xs font-bold text-rose-600 hover:text-rose-500"
        >
          View Collection ({people.length})
        </Link>
      </div>

      {/* Progress Bars for Tiers */}
      <div className="space-y-3 pt-1">
        {TIERS.map((t) => {
          const count = dashboardStats.tierDistribution[t] || 0;
          const percentage = Math.round((count / total) * 100);

          return (
            <div key={t} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <TierBadge tier={t} size="sm" />
                <span className="text-stone-700 font-bold">
                  {count} {count === 1 ? 'person' : 'people'} ({percentage}%)
                </span>
              </div>

              <div className="h-2 w-full bg-[#F5EFE6] rounded-full overflow-hidden border border-[#E7E0D8]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${count === 0 ? 0 : Math.max(percentage, 5)}%`,
                    backgroundColor: TIER_CONFIG[t].color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
