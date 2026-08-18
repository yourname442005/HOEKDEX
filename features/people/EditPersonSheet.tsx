'use client';

import React, { useState, useEffect } from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { Person, Category } from '@/types/domain';
import { CATEGORIES } from '@/lib/constants';
import { PrivacyLock } from '@/components/shared/PrivacyLock';
import { X, Sparkles, Image as ImageIcon, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditPersonSheetProps {
  isOpen: boolean;
  person: Person;
  onClose: () => void;
}

export function EditPersonSheet({ isOpen, person, onClose }: EditPersonSheetProps) {
  const { updatePerson } = useHoekdex();

  const [name, setName] = useState(person.name);
  const [photoUrl, setPhotoUrl] = useState(person.photoUrl || '');
  const [socialHandle, setSocialHandle] = useState(person.socialHandle || '');
  const [dateFirstMet, setDateFirstMet] = useState(person.dateFirstMet || '');
  const [category, setCategory] = useState<Category>(person.category || 'Dating');
  const [notes, setNotes] = useState(person.notes || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setName(person.name);
      setPhotoUrl(person.photoUrl || '');
      setSocialHandle(person.socialHandle || '');
      setDateFirstMet(person.dateFirstMet || '');
      setCategory(person.category || 'Dating');
      setNotes(person.notes || '');
    }, 0);

    return () => clearTimeout(timer);
  }, [person]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: 'Name is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePerson(person.id, {
        name: name.trim(),
        photoUrl: photoUrl.trim() || undefined,
        socialHandle: socialHandle.trim() || undefined,
        dateFirstMet: dateFirstMet || undefined,
        category,
        notes: notes.trim() || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-person-sheet-title"
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
                <h2 id="edit-person-sheet-title" className="text-lg font-black text-[#1C1917] tracking-tight">
                  Edit {person.name}
                </h2>
                <PrivacyLock size="sm" showLabel />
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Update private relationship details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Name */}
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
              className={cn(
                'w-full px-3.5 py-2.5 bg-[#F5EFE6] border rounded-xl text-[#1C1917] text-sm font-medium focus:outline-none focus:ring-1 focus:ring-rose-500',
                errors.name ? 'border-rose-500' : 'border-[#E7E0D8] focus:border-rose-500'
              )}
            />
            {errors.name && <p className="text-xs text-rose-600 font-semibold">{errors.name}</p>}
          </div>

          {/* Photo */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Photo URL
            </label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#E7E0D8] flex items-center justify-center text-rose-600 font-bold text-sm flex-shrink-0">
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
                className="flex-1 px-3 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] text-sm focus:border-rose-500"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] text-sm font-medium focus:border-rose-500 focus:outline-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Social Handle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Social Handle / Contact
            </label>
            <input
              type="text"
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              placeholder="e.g. @alex_insta"
              className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] text-sm font-medium focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Date First Met */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Date First Met
            </label>
            <input
              type="date"
              value={dateFirstMet}
              onChange={(e) => setDateFirstMet(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] text-sm focus:border-rose-500 cursor-pointer"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Private Notes & Memories
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Private memories, preferences, dates..."
              className="w-full p-3 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] text-sm focus:border-rose-500 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E7E0D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 bg-[#FFFDF9] border border-[#E7E0D8] rounded-full transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
