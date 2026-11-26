import * as React from 'react';
import { cn } from '../../lib/cn';
import { intentClasses, type Emphasis, type Intent } from '../../lib/intent';
import { XIcon } from '../../icons/icons';

/**
 * Chip
 *
 * A small label for status, metadata and filter tags. Can carry a leading icon and a remove button.
 *
 * Accessibility:
 * - The remove button has its own accessible name: "Remove <label>".
 * - Remove target is 20px inside a 24px+ row; keep chips in rows with enough spacing (2.5.8).
 */
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: Intent;
  emphasis?: Emphasis;
  size?: 'sm' | 'md';
  /** Decorative icon before the label. */
  icon?: React.ReactNode;
  /** Shows a remove (x) button. */
  onRemove?: () => void;
  /** Used in the remove button's name. Defaults to the text content when it is a string. */
  removeLabel?: string;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    { intent = 'neutral', emphasis = 'soft', size = 'md', icon, onRemove, removeLabel, className, children, ...props },
    ref,
  ) => {
    const name = removeLabel ?? (typeof children === 'string' ? children : 'item');
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex max-w-full items-center gap-1 rounded-control font-medium',
          size === 'sm' ? 'h-6 px-2 text-caption' : 'h-7 px-2.5 text-small',
          intentClasses[intent][emphasis],
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="flex shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${name}`}
            className={cn(
              '-mr-1 inline-flex size-5 shrink-0 items-center justify-center rounded-control opacity-80 hover:opacity-100',
              'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus',
            )}
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </span>
    );
  },
);
Chip.displayName = 'Chip';
