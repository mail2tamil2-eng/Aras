import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '../../lib/cn';

/**
 * Separator
 *
 * A horizontal or vertical rule. Decorative by default (hidden from screen readers).
 * Set `decorative={false}` when the split carries meaning, so it is announced as a separator.
 */
export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /** sm = 1px, md = 2px. */
  size?: 'sm' | 'md';
}

export const Separator = React.forwardRef<React.ComponentRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, size = 'sm', className, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? (size === 'sm' ? 'h-px w-full' : 'h-0.5 w-full') : size === 'sm' ? 'w-px self-stretch' : 'w-0.5 self-stretch',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = 'Separator';
