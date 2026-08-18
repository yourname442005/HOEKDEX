'use client';

import React from 'react';
import { useHoekdex } from '@/context/hoekdex-context';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ToastContainer() {
  const { toasts, removeToast } = useHoekdex();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200',
              isSuccess && 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
              isError && 'bg-rose-50 dark:bg-[#262525] border-rose-300 dark:border-[#fe1e34]/50 text-rose-900 dark:text-[#FCFCFC]',
              !isSuccess && !isError && 'bg-[#FFFDF9] dark:bg-[#171617] border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC]'
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-[#fe1e34]" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-[#fe1e34]" />}
            </div>

            <div className="flex-1 text-sm font-medium leading-snug">
              <p>{toast.message}</p>
              {toast.action && (
                <button
                  type="button"
                  onClick={toast.action.onClick}
                  className="mt-1.5 text-xs font-bold underline cursor-pointer hover:opacity-80"
                >
                  {toast.action.label}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 dark:text-[#B5B2B2] hover:text-stone-700 dark:hover:text-[#FCFCFC] p-1 rounded-lg hover:bg-stone-200/50 dark:hover:bg-[#262525] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
