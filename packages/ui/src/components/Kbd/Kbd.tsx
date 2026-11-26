import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Kbd
 *
 * A keyboard key, for shortcuts in menus, tooltips and help text. Renders a native <kbd>.
 * For combinations, use one Kbd per key: <Kbd>⌘</Kbd> <Kbd>K</Kbd>.
 * Give symbol keys a readable name with `title` or `aria-label` (e.g. ⌘ → "Command").
 */
export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md';
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ size = 'md', className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-control border border-border bg-surface-sunken font-mono font-medium text-fg-secondary',
      size === 'sm' ? 'h-5 min-w-5 px-1 text-caption' : 'h-6 min-w-6 px-1.5 text-caption',
      className,
    )}
    {...props}
  />
));
Kbd.displayName = 'Kbd';
