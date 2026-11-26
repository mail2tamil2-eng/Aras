import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../lib/cn';

/**
 * RadioGroup
 *
 * One choice from a short list (2–6 options). For longer lists use Select.
 * Wrap `RadioGroupItem`s (each with a visible label) in a `RadioGroup` with a `label`.
 *
 * Accessibility (Radix): role="radiogroup" named by its label; arrow keys move between options;
 * Tab enters and leaves the group. The group label is rendered as visible text (1.3.1, 3.3.2).
 */
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Visible group label. */
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: 'sm' | 'md';
}

const SizeContext = React.createContext<'sm' | 'md'>('md');

export const RadioGroup = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ label, description, size = 'md', orientation = 'vertical', className, children, ...props }, ref) => {
    const id = React.useId();
    return (
      <SizeContext.Provider value={size}>
        <div className="flex flex-col gap-[var(--aras-space-xs)]">
          {label && (
            <span id={`${id}-label`} className="text-small font-medium text-fg">
              {label}
            </span>
          )}
          {description && (
            <span id={`${id}-desc`} className="text-small text-fg-secondary">
              {description}
            </span>
          )}
          <RadioGroupPrimitive.Root
            ref={ref}
            orientation={orientation}
            aria-labelledby={label ? `${id}-label` : undefined}
            aria-describedby={description ? `${id}-desc` : undefined}
            className={cn(
              'flex gap-[var(--aras-space-sm)]',
              orientation === 'horizontal' ? 'flex-row flex-wrap gap-x-[var(--aras-space-lg)]' : 'flex-col',
              className,
            )}
            {...props}
          >
            {children}
          </RadioGroupPrimitive.Root>
        </div>
      </SizeContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  card?: boolean;
}

export const RadioGroupItem = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
  ({ label, description, meta, card, id, className, ...props }, ref) => {
    const size = React.useContext(SizeContext);
    const autoId = React.useId();
    const controlId = id ?? `aras-radio-${autoId}`;
    const descId = description ? `${controlId}-desc` : undefined;
    return (
      <div
        className={cn(
          'flex items-start gap-[var(--aras-space-sm)]',
          card && 'rounded-card border border-border p-[var(--aras-space-md)] transition-colors has-[[data-state=checked]]:border-primary',
          className,
        )}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={controlId}
          aria-describedby={descId}
          className={cn(
            'peer mt-0.5 inline-flex shrink-0 items-center justify-center rounded-pill border border-border-strong bg-surface',
            'transition-colors hover:border-fg-secondary data-[state=checked]:border-primary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            'disabled:cursor-not-allowed disabled:opacity-50',
            size === 'sm' ? 'size-4' : 'size-5',
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator
            className={cn('rounded-pill bg-primary data-[state=checked]:animate-pop-in', size === 'sm' ? 'size-2' : 'size-2.5')}
          />
        </RadioGroupPrimitive.Item>
        <div className="flex min-w-0 flex-col gap-0.5">
          <label
            htmlFor={controlId}
            className={cn(
              'flex flex-wrap items-center gap-[var(--aras-space-xs)] font-medium text-fg peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled',
              size === 'sm' ? 'text-small' : 'text-body',
            )}
          >
            {label}
            {meta}
          </label>
          {description && (
            <p id={descId} className={cn('text-fg-secondary', size === 'sm' ? 'text-caption' : 'text-small')}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';
