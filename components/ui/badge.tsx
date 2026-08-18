import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors select-none',
  {
    variants: {
      variant: {
        default:
          'bg-stone-100 text-stone-700 border-stone-300',
        primary:
          'bg-rose-500/10 text-rose-600 border-rose-500/25',
        secondary:
          'bg-pink-500/10 text-pink-600 border-pink-500/25',
        outline:
          'bg-[#FFFDF9] text-stone-700 border-[#E7E0D8]',
        xp:
          'bg-rose-500/10 text-rose-600 border-rose-500/25 font-black',
        achievement:
          'bg-amber-500/15 text-amber-700 border-amber-500/30 font-bold',
        success:
          'bg-emerald-50 text-emerald-800 border-emerald-300',
        warning:
          'bg-amber-50 text-amber-800 border-amber-300',
        destructive:
          'bg-rose-50 text-rose-800 border-rose-300',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm font-extrabold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
