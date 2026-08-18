import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-xl border border-[#E7E0D8] bg-[#F5EFE6] px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-xs',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
