import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/cn';

/**
 * Card
 *
 * The bordered surface that ARAS card patterns are built on: Card, CardHeader, CardTitle,
 * CardDescription, CardContent, CardFooter. Flat with borders; hover tints the border
 * (no shadow lift), so cards stay calm in dense dashboards.
 *
 * `interactive` adds hover and focus styles for cards that are links or buttons
 * (use `asChild` with an <a> so the whole card is one target).
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  interactive?: boolean;
  /** Raised cards sit on sunken backgrounds; flat is the default. */
  elevated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ asChild, interactive, elevated, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn(
        'flex flex-col rounded-card border border-border bg-surface text-fg',
        'transition-colors duration-[var(--aras-motion-duration-fast)] motion-reduce:transition-none',
        elevated && 'shadow-card',
        interactive &&
          'cursor-pointer hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.99] motion-reduce:active:scale-100',
        className,
      )}
      {...props}
    />
  );
});
Card.displayName = 'Card';

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-[var(--aras-space-2xs)] p-[var(--aras-space-lg)] pb-0', className)} {...props} />;
}

export function CardTitle({
  as: Heading = 'h3',
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h2' | 'h3' | 'h4' }) {
  return <Heading className={cn('text-body font-semibold text-fg', className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-small text-fg-secondary', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 p-[var(--aras-space-lg)]', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center gap-[var(--aras-space-xs)] border-t border-border px-[var(--aras-space-lg)] py-[var(--aras-space-md)]', className)}
      {...props}
    />
  );
}
