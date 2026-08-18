'use client';

import React, { useState } from 'react';
import { Tier } from '@/types/domain';
import { TIERS, TIER_CONFIG } from '@/lib/constants';
import { TierBadge } from '@/components/shared/TierBadge';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TierSelectorDialogProps {
  isOpen: boolean;
  currentTier: Tier;
  personName: string;
  onClose: () => void;
  onSelectTier: (tier: Tier) => void;
}

export function TierSelectorDialog({
  isOpen,
  currentTier,
  personName,
  onClose,
  onSelectTier,
}: TierSelectorDialogProps) {
  const [selected, setSelected] = useState<Tier>(currentTier);

  if (!isOpen) return null;

  const handleSave = () => {
    onSelectTier(selected);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier-selector-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-[#FFFDF9] border border-[#E7E0D8] rounded-3xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D8]">
          <div>
            <h3 id="tier-selector-title" className="text-lg font-black text-[#1C1917] tracking-tight">
              Select Tier for {personName}
            </h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Personal subjective rating for your private records
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier list */}
        <div className="py-4 space-y-2.5">
          {TIERS.map((t) => {
            const config = TIER_CONFIG[t];
            const isSelected = selected === t;

            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelected(t)}
                className={cn(
                  'w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer',
                  isSelected
                    ? 'bg-rose-50 border-rose-400 shadow-xs'
                    : 'bg-[#F5EFE6] border-[#E7E0D8] hover:border-stone-300'
                )}
              >
                <div className="flex items-center gap-3">
                  <TierBadge tier={t} size="sm" />
                  <div>
                    <p className="text-xs font-semibold text-stone-700">
                      {config.description}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    'w-6 h-6 rounded-full border flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'border-stone-300 text-transparent'
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E0D8]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 rounded-full shadow-md shadow-rose-600/20 transition-all cursor-pointer"
          >
            Save Tier
          </button>
        </div>
      </div>
    </div>
  );
}
