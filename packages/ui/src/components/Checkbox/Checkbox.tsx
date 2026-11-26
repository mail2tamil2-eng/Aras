import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../lib/cn';
import { CheckIcon, MinusIcon } from '../../icons/icons';

/**
 * Checkbox
 *
 * For choosing zero or more options, or agreeing to something before submitting.
 * Use Switch for settings that apply immediately.
 *
 * - `Checkbox` is the bare control; give it `aria-label` or pair it with a <label>.
 * - `CheckboxField` adds a visible label and optional description (use this in most forms).
 * - `checked="indeterminate"` shows a parent that has some children selected.
 *
 * Accessibility (Radix): role="checkbox", Space toggles, aria-checked="mixed" for indeterminate.
 * The box is 20px inside a full-row label, so the click target is well above 24px (2.5.8).
 */
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: 'sm' | 'md';
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ size = 'md', invalid, className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'peer inline-flex shrink-0 items-center justify-center rounded-control border border-border-strong bg-surface text-on-primary',
        'transition-colors duration-[var(--aras-motion-duration-fast)] motion-reduce:transition-none hover:border-fg-secondary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
        'aria-invalid:border-danger-border',
        'disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'size-4' : 'size-5',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex data-[state=checked]:animate-pop-in">
        {props.checked === 'indeterminate' ? (
          <MinusIcon className={size === 'sm' ? 'size-3' : 'size-3.5'} strokeWidth={3} />
        ) : (
          <CheckIcon className={size === 'sm' ? 'size-3' : 'size-3.5'} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);
Checkbox.displayName = 'Checkbox';

export interface CheckboxFieldProps extends CheckboxProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Extra content after the label, e.g. a Badge. */
  meta?: React.ReactNode;
  /** Bordered, padded row. Good for plan or permission choices. */
  card?: boolean;
}

export const CheckboxField = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxFieldProps>(
  ({ label, description, meta, card, size = 'md', id, className, ...props }, ref) => {
    const autoId = React.useId();
    const controlId = id ?? `aras-checkbox-${autoId}`;
    const descId = description ? `${controlId}-desc` : undefined;
    return (
      <div
        className={cn(
          'flex items-start gap-[var(--aras-space-sm)]',
          card && 'rounded-card border border-border p-[var(--aras-space-md)] transition-colors has-[[data-state=checked]]:border-primary',
          className,
        )}
      >
        <Checkbox ref={ref} id={controlId} size={size} aria-describedby={descId} className="mt-0.5" {...props} />
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
CheckboxField.displayName = 'CheckboxField';
