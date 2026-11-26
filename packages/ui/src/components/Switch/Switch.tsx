import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/cn';

/**
 * Switch (toggle)
 *
 * An on/off setting that applies immediately, like "Email notifications".
 * Use Checkbox in forms that are submitted with a button.
 *
 * - `Switch` is the bare control; give it `aria-label` or use `SwitchField`.
 * - `SwitchField` adds a visible label and description, with the switch on the right.
 *
 * Accessibility (Radix): role="switch" with aria-checked; Space and Enter toggle.
 * State is shown by position as well as colour (1.4.1).
 */
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: 'sm' | 'md';
}

export const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-pill border-2 border-transparent bg-border-strong',
        'transition-colors duration-[var(--aras-motion-duration-fast)] motion-reduce:transition-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        'data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-pill bg-surface shadow-card',
          'transition-transform duration-[var(--aras-motion-duration-base)] ease-standard motion-reduce:transition-none',
          'data-[state=unchecked]:translate-x-0',
          size === 'sm' ? 'size-4 data-[state=checked]:translate-x-4' : 'size-5 data-[state=checked]:translate-x-5',
        )}
      />
    </SwitchPrimitive.Root>
  ),
);
Switch.displayName = 'Switch';

export interface SwitchFieldProps extends SwitchProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  card?: boolean;
}

export const SwitchField = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, SwitchFieldProps>(
  ({ label, description, meta, card, size = 'md', id, className, ...props }, ref) => {
    const autoId = React.useId();
    const controlId = id ?? `aras-switch-${autoId}`;
    const descId = description ? `${controlId}-desc` : undefined;
    return (
      <div
        className={cn(
          'flex items-start justify-between gap-[var(--aras-space-md)]',
          card && 'rounded-card border border-border p-[var(--aras-space-md)]',
          className,
        )}
      >
        <div className="flex min-w-0 flex-col gap-0.5">
          <label
            htmlFor={controlId}
            className={cn(
              'flex flex-wrap items-center gap-[var(--aras-space-xs)] font-medium text-fg',
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
        <Switch ref={ref} id={controlId} size={size} aria-describedby={descId} className="mt-0.5" {...props} />
      </div>
    );
  },
);
SwitchField.displayName = 'SwitchField';
