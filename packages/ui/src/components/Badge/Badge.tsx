import * as React from 'react';
import { cn } from '../../lib/cn';
import { intentClasses, intentDotClasses, type Emphasis, type Intent } from '../../lib/intent';

/**
 * Badge
 *
 * A compact pill for counts and status next to nav items, table cells and KPI rows.
 * Use Chip instead for filter tags, icons or removable labels.
 *
 * Accessibility:
 * - Colour is never the only signal: the badge always has text (1.4.1).
 * - For a bare number, add context with `srLabel`, e.g. "3 unread messages".
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: Intent;
  emphasis?: Emphasis;
  size?: 'sm' | 'md';
  /** Show a small status dot before the text. */
  dot?: boolean;
  /** Extra words for screen readers, read after the visible text. */
  srLabel?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ intent = 'neutral', emphasis = 'soft', size = 'md', dot = false, srLabel, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-pill font-semibold tabular-nums',
        size === 'sm' ? 'min-h-4 px-1.5 text-caption' : 'min-h-5 px-2 text-caption',
        intentClasses[intent][emphasis],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('size-1.5 rounded-pill', emphasis === 'solid' ? 'bg-current' : intentDotClasses[intent])}
          aria-hidden="true"
        />
      )}
      {children}
      {srLabel && <span className="sr-only"> {srLabel}</span>}
    </span>
  ),
);
Badge.displayName = 'Badge';
