import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../lib/cn';
import { ChevronDownIcon } from '../../icons/icons';

/**
 * Accordion
 *
 * Stacked sections that expand one at a time (`type="single"`) or independently (`type="multiple"`).
 * Variants: `outlined` (each item is a bordered card) and `flush` (divider lines only).
 *
 * Accessibility (Radix): triggers are buttons inside headings, with aria-expanded and
 * aria-controls; Up/Down/Home/End move between triggers. Height animation respects reduced motion.
 */
type AccordionVariant = 'outlined' | 'flush';
const VariantContext = React.createContext<AccordionVariant>('flush');

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
};

export const Accordion = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ variant = 'flush', className, ...props }, ref) => (
    <VariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn('w-full', variant === 'outlined' && 'flex flex-col gap-[var(--aras-space-sm)]', className)}
        {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
      />
    </VariantContext.Provider>
  ),
);
Accordion.displayName = 'Accordion';

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(VariantContext);
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        variant === 'outlined'
          ? 'rounded-card border border-border bg-surface transition-colors hover:border-border-strong'
          : 'border-b border-border',
        className,
      )}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Decorative icon before the title. */
  icon?: React.ReactNode;
  /** Short meta on the right, e.g. a count badge. */
  meta?: React.ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

export const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Trigger>, AccordionTriggerProps>(
  ({ icon, meta, headingLevel = 'h3', className, children, ...props }, ref) => {
    const variant = React.useContext(VariantContext);
    const Heading = headingLevel;
    return (
      <AccordionPrimitive.Header asChild>
        <Heading className="flex">
          <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
              'group flex flex-1 items-center gap-[var(--aras-space-sm)] rounded-control py-[var(--aras-space-md)] text-left text-body font-semibold text-fg',
              variant === 'outlined' && 'px-[var(--aras-space-md)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
              'disabled:cursor-not-allowed disabled:text-fg-disabled',
              className,
            )}
            {...props}
          >
            {icon && (
              <span className="flex text-fg-secondary" aria-hidden="true">
                {icon}
              </span>
            )}
            <span className="flex-1">{children}</span>
            {meta}
            <ChevronDownIcon className="size-4 text-fg-secondary transition-transform duration-[var(--aras-motion-duration-base)] group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
          </AccordionPrimitive.Trigger>
        </Heading>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(VariantContext);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-body text-fg-secondary data-[state=closed]:animate-collapse data-[state=open]:animate-expand"
      {...props}
    >
      <div className={cn('pb-[var(--aras-space-md)]', variant === 'outlined' && 'px-[var(--aras-space-md)]', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = 'AccordionContent';
