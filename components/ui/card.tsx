import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-2xl transition-all duration-200 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-[#FFFDF9] border border-[#E7E0D8] shadow-xs',
        primary: 'bg-[#FFFDF9] border border-[#E7E0D8] shadow-xs',
        secondary: 'bg-[#F3ECE2] border border-[#E7E0D8]',
        interactive:
          'bg-[#FFFDF9] border border-[#E7E0D8] shadow-xs hover:border-rose-400 hover:bg-[#FFF7ED] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md cursor-pointer',
        gamification:
          'bg-gradient-to-br from-[#FFFDF9] to-[#FFF1F2] border border-rose-200 shadow-xs shadow-rose-500/5',
        memory: 'bg-[#FFFDF9] border border-[#E7E0D8] shadow-xs',
        hero: 'bg-[#FFFDF9] border-2 border-rose-400/40 shadow-lg rounded-3xl',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3 sm:p-4',
        default: 'p-4 sm:p-5',
        lg: 'p-6 sm:p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-3', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-h3 text-[#1C1917]', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-small text-stone-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 border-t border-[#E7E0D8]', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
