'use client';

import React, { useState } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { Tier, Category } from '@/types/domain';
import { TIERS, CATEGORIES } from '@/lib/constants';
import { TierBadge } from '@/components/shared/TierBadge';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { X, Sparkles, Image as ImageIcon, Camera, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddPersonSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (personId: string) => void;
}

export function AddPersonSheet({ isOpen, onClose, onSuccess }: AddPersonSheetProps) {
  const { addPerson } = useHoekdex();

  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [dateFirstMet, setDateFirstMet] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>('Dating');
  const [notes, setNotes] = useState('');
  const [tier, setTier] = useState<Tier>('Beginner');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [showDiscardAlert, setShowDiscardAlert] = useState(false);

  if (!isOpen) return null;

  const isDirty = Boolean(name.trim() || notes.trim() || photoUrl || socialHandle);

  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowDiscardAlert(true);
    } else {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: 'Name or nickname is required' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const created = await addPerson({
        name: name.trim(),
        photoUrl: photoUrl.trim() || `https://picsum.photos/seed/${encodeURIComponent(name.trim())}/400/400`,
        socialHandle: socialHandle.trim() || undefined,
        dateFirstMet: dateFirstMet || undefined,
        category,
        notes: notes.trim() || undefined,
        tier,
      });

      // Reset form
      setName('');
      setPhotoUrl('');
      setSocialHandle('');
      setNotes('');
      setTier('Beginner');

      onClose();
      if (onSuccess) {
        onSuccess(created.id);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Avatar presets helper
  const presetPhotos = [
    'https://picsum.photos/seed/portrait_rose/400/400',
    'https://picsum.photos/seed/portrait_sky/400/400',
    'https://picsum.photos/seed/portrait_amber/400/400',
    'https://picsum.photos/seed/portrait_jade/400/400',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-person-sheet-title"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg h-full bg-[#FFFDF9] border-l border-[#E7E0D8] flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E7E0D8] bg-[#F5EFE6]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="add-person-sheet-title" className="text-lg font-black text-[#1C1917] tracking-tight">
                  Add to Hoekdex
                </h2>
                <PrivacyLock size="sm" showLabel />
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Create a 100% private record in your journal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAttempt}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Name Field (Required) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Name or Nickname <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({});
              }}
              placeholder="e.g. Alex M., Coffee Date, Mystery Guy"
              className={cn(
                'w-full px-3.5 py-2.5 bg-[#F5EFE6] border rounded-xl text-[#1C1917] placeholder-stone-400 text-sm font-medium focus:outline-none focus:ring-1 transition-all',
                errors.name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-[#E7E0D8] focus:border-rose-500 focus:ring-rose-500'
              )}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 font-semibold">{errors.name}</p>
            )}
          </div>

          {/* Photo URL or Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Photo Avatar (Optional)
            </label>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#E7E0D8] flex items-center justify-center text-rose-600 font-bold text-sm flex-shrink-0 shadow-inner">
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-5 h-5 text-stone-400" />
                )}
              </div>

              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] placeholder-stone-400 text-sm font-medium focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Handle (Optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Social Handle (Optional)
              </label>
              <span className="text-[11px] text-stone-500">Stored privately only</span>
            </div>
            <input
              type="text"
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              placeholder="@instagram or contact handle"
              maxLength={100}
              className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] placeholder-stone-400 text-sm focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Notes (Optional, max 2000 chars) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Private Journal Notes
              </label>
              <span className="text-[11px] text-stone-500">{notes.length}/2000</span>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="First impressions, conversation topics, special moments..."
              maxLength={2000}
              className="w-full p-3 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] placeholder-stone-400 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none focus:outline-none"
            />
          </div>

          {/* Submit Button & Footer */}
          <div className="pt-4 border-t border-[#E7E0D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseAttempt}
              className="px-4 py-2 text-sm font-semibold text-stone-500 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="px-6 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : 'Add to Collection'}
            </button>
          </div>
        </form>
      </div>

      {/* Discard Confirmation Dialog */}
      {showDiscardAlert && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-sm bg-[#FFFDF9] border border-[#E7E0D8] rounded-2xl p-5 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#1C1917]">Discard unsaved person?</h3>
            <p className="text-xs text-stone-500">
              You have started entering details. If you leave now, your changes will be discarded.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDiscardAlert(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-[#F5EFE6] rounded-full border border-[#E7E0D8]"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDiscardAlert(false);
                  onClose();
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-full shadow-md"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
