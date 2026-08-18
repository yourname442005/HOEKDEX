import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 border border-transparent',
        primary:
          'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 border border-transparent',
        secondary:
          'bg-[#F5EFE6] hover:bg-[#E7E0D8] text-stone-800 border border-[#E7E0D8]',
        outline:
          'bg-[#FFFDF9] hover:bg-[#F5EFE6] border border-[#E7E0D8] text-stone-700 hover:text-stone-900 shadow-xs',
        ghost:
          'bg-transparent hover:bg-[#F5EFE6] text-stone-600 hover:text-stone-900',
        destructive:
          'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20',
        gamified:
          'bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white shadow-lg shadow-rose-600/25 border border-rose-400/30',
        xp:
          'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-500/30',
      },
      size: {
        default: 'h-10 px-4 py-2 rounded-full',
        sm: 'h-8 px-3 py-1 text-xs rounded-full',
        lg: 'h-12 px-6 py-3 text-base rounded-full',
        icon: 'h-9 w-9 p-0 rounded-xl',
        compact: 'h-8 px-2.5 py-1 text-xs rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
