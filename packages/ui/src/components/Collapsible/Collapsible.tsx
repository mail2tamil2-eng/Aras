import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '../../lib/cn';
import { ChevronDownIcon } from '../../icons/icons';

/**
 * Collapsible
 *
 * One section that shows and hides extra content, such as "Advanced options".
 * Use Accordion for a list of sections. Variants: `plain`, `outlined`, `card`.
 *
 * Accessibility (Radix): the trigger is a button with aria-expanded and aria-controls.
 */
type CollapsibleVariant = 'plain' | 'outlined' | 'card';

export interface CollapsibleProps extends Omit<React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>, 'title'> {
  /** Text on the trigger button. */
  title: React.ReactNode;
  variant?: CollapsibleVariant;
  size?: 'sm' | 'md';
}

export const Collapsible = React.forwardRef<React.ComponentRef<typeof CollapsiblePrimitive.Root>, CollapsibleProps>(
  ({ title, variant = 'plain', size = 'md', className, children, ...props }, ref) => {
    const framed = variant !== 'plain';
    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        className={cn(
          'w-full',
          variant === 'outlined' && 'rounded-card border border-border',
          variant === 'card' && 'rounded-card border border-border bg-surface transition-colors hover:border-border-strong',
          className,
        )}
        {...props}
      >
        <CollapsiblePrimitive.Trigger
          className={cn(
            'group flex w-full items-center justify-between gap-[var(--aras-space-sm)] rounded-control text-left font-semibold text-fg',
            size === 'sm' ? 'text-small' : 'text-body',
            framed ? 'p-[var(--aras-space-md)]' : 'py-[var(--aras-space-xs)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          )}
        >
          {title}
          <ChevronDownIcon className="size-4 text-fg-secondary transition-transform duration-[var(--aras-motion-duration-base)] group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
          <div
            className={cn(
              'text-fg-secondary',
              size === 'sm' ? 'text-small' : 'text-body',
              framed ? 'px-[var(--aras-space-md)] pb-[var(--aras-space-md)]' : 'pb-[var(--aras-space-xs)]',
            )}
          >
            {children}
          </div>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    );
  },
);
Collapsible.displayName = 'Collapsible';
