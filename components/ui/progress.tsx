import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'relative h-3 w-full overflow-hidden rounded-full bg-[#F5EFE6] p-0.5 border border-[#E7E0D8]',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-xs shadow-rose-500/20 relative',
            indicatorClassName
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-60" />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
