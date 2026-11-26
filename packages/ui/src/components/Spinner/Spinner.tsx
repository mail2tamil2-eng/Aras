import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Spinner
 *
 * Inline loading indicator. Same glyph as Button's loading state.
 *
 * Accessibility:
 * - With `label`, it becomes role="status" and announces the label.
 * - Without `label`, it is decorative: set aria-busy on the region that is loading instead.
 * - Spins only when the user allows motion; otherwise it shows a static arc.
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Announced to screen readers, e.g. "Loading results". */
  label?: string;
}

const sizes = { xs: 'size-3', sm: 'size-4', md: 'size-5', lg: 'size-8' };

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(({ size = 'sm', label, className, ...props }, ref) => (
  <span
    ref={ref}
    role={label ? 'status' : undefined}
    aria-hidden={label ? undefined : true}
    className={cn('inline-flex shrink-0', className)}
    {...props}
  >
    <svg className={cn(sizes[size], 'motion-safe:animate-spin')} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
    {label && <span className="sr-only">{label}</span>}
  </span>
));
Spinner.displayName = 'Spinner';
