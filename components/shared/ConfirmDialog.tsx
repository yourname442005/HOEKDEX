'use client';

import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  requiresTypedConfirmation?: boolean;
  requiredWord?: string;
  icon?: React.ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  requiresTypedConfirmation = false,
  requiredWord = 'DELETE',
  icon,
}: ConfirmDialogProps) {
  const [typedValue, setTypedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const isConfirmedAllowed = requiresTypedConfirmation ? typedValue === requiredWord : true;

  const handleConfirm = async () => {
    if (!isConfirmedAllowed) return;
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#E7E0D8] dark:border-[#393939]">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                isDestructive ? 'bg-[#fe1e34]/15 text-[#fe1e34] border border-[#fe1e34]/30' : 'bg-[#fe1e34]/10 text-[#fe1e34] border border-[#fe1e34]/20'
              )}
            >
              {icon || (isDestructive ? <Trash2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />)}
            </div>
            <div>
              <h3 id="confirm-dialog-title" className="text-lg font-bold text-[#1C1917] dark:text-[#FCFCFC] tracking-tight">
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 dark:text-[#525252] hover:text-stone-700 dark:hover:text-[#FCFCFC] p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-[#262525] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-stone-600 dark:text-[#B5B2B2] font-normal leading-relaxed">
            {description}
          </p>

          {requiresTypedConfirmation && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-stone-600 dark:text-[#D4D2D2]">
                To confirm, type <span className="text-[#fe1e34] font-mono font-bold">{requiredWord}</span> below:
              </label>
              <input
                type="text"
                value={typedValue}
                onChange={(e) => setTypedValue(e.target.value)}
                placeholder={requiredWord}
                className="w-full px-3.5 py-2 text-sm bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] rounded-lg text-[#1C1917] dark:text-[#FCFCFC] placeholder-stone-400 dark:placeholder-[#525252] focus:border-[#fe1e34] focus:ring-1 focus:ring-[#fe1e34]"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 bg-[#F5EFE6] dark:bg-[#262525] border-t border-[#E7E0D8] dark:border-[#393939]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-stone-700 dark:text-[#D4D2D2] hover:text-stone-900 dark:hover:text-[#FCFCFC] bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] hover:border-stone-400 dark:hover:border-stone-500 rounded-full transition-all cursor-pointer"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isConfirmedAllowed || isLoading}
            className={cn(
              'px-5 py-2 text-sm font-bold text-white rounded-full transition-all cursor-pointer shadow-md',
              isDestructive
                ? 'bg-[#fe1e34] hover:bg-[#e0182d] shadow-[#fe1e34]/20 disabled:opacity-40 disabled:cursor-not-allowed'
                : 'bg-[#fe1e34] hover:bg-[#e0182d] shadow-[#fe1e34]/20 disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
