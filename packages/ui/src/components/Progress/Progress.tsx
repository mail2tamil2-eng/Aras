import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/cn';

/**
 * Progress
 *
 * Shows how far a task has got (upload, onboarding, storage used).
 * Pass `label` for a visible name; the value shows as a percent, or as `value / max` with `showValue="fraction"`.
 * Leave `value` undefined for an indeterminate bar.
 *
 * Accessibility (Radix): role="progressbar" with aria-valuenow/min/max, named by the visible label.
 */
export interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'children'> {
  label?: React.ReactNode;
  showValue?: 'percent' | 'fraction' | false;
  intent?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const fills = {
  primary: 'bg-primary',
  success: 'bg-success-fg',
  warning: 'bg-warning-fg',
  danger: 'bg-danger-fg',
};
const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

export const Progress = React.forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ label, showValue = 'percent', intent = 'primary', size = 'md', value, max = 100, className, ...props }, ref) => {
    const id = React.useId();
    const pct = value == null ? null : Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div className={cn('flex w-full flex-col gap-[var(--aras-space-xs)]', className)}>
        {(label || (showValue && pct != null)) && (
          <div className="flex items-baseline justify-between gap-[var(--aras-space-sm)] text-small">
            {label && (
              <span id={`${id}-label`} className="font-medium text-fg">
                {label}
              </span>
            )}
            {showValue && pct != null && (
              <span className="tabular-nums text-fg-secondary" aria-hidden="true">
                {showValue === 'fraction' ? `${value} / ${max}` : `${Math.round(pct)}%`}
              </span>
            )}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          value={value}
          max={max}
          aria-labelledby={label ? `${id}-label` : undefined}
          className={cn('relative w-full overflow-hidden rounded-pill bg-surface-sunken', heights[size])}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              'h-full rounded-pill transition-transform duration-[var(--aras-motion-duration-slow)] ease-standard motion-reduce:transition-none',
              fills[intent],
              pct == null && 'w-1/3 motion-safe:animate-pulse',
            )}
            style={pct == null ? undefined : { transform: `translateX(-${100 - pct}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    );
  },
);
Progress.displayName = 'Progress';
