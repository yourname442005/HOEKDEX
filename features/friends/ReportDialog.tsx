'use client';

import React, { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface ReportDialogProps {
  isOpen: boolean;
  userName: string;
  onClose: () => void;
  onSubmitReport: (reason: string, note?: string) => void;
}

export function ReportDialog({ isOpen, userName, onClose, onSubmitReport }: ReportDialogProps) {
  const [reason, setReason] = useState('Inappropriate behaviour');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      onSubmitReport(reason, note.trim() || undefined);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in"
    >
      <div className="w-full max-w-md bg-[#FFFDF9] border border-[#E7E0D8] rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 id="report-dialog-title" className="text-base font-black text-[#1C1917]">
                Report {userName}
              </h3>
              <p className="text-xs text-stone-500">Help keep the community safe</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] text-sm font-medium focus:border-rose-500 focus:outline-none cursor-pointer"
            >
              <option value="Inappropriate behaviour">Inappropriate behaviour</option>
              <option value="Spam or solicitation">Spam or solicitation</option>
              <option value="Harassment">Harassment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe the issue..."
              maxLength={300}
              className="w-full p-3 bg-[#F5EFE6] border border-[#E7E0D8] rounded-xl text-[#1C1917] placeholder-stone-400 text-sm focus:border-rose-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-full shadow-md shadow-rose-600/20 cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
