import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '../../lib/cn';

/**
 * ScrollArea
 *
 * A fixed-size region with slim, themed scrollbars, for long lists, logs and dense cards.
 * Set the size on the root (e.g. className="h-72"). Add `horizontal` for wide content.
 *
 * Accessibility: native scrolling is kept (wheel, touch, keyboard). Give the region a name with
 * `aria-label` so keyboard users know what they are scrolling; it is focusable for arrow-key scrolling.
 */
export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  horizontal?: boolean;
  bordered?: boolean;
}

export const ScrollArea = React.forwardRef<React.ComponentRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ horizontal, bordered, className, children, 'aria-label': ariaLabel, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', bordered && 'rounded-card border border-border', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        tabIndex={0}
        role={ariaLabel ? 'region' : undefined}
        aria-label={ariaLabel}
        className="size-full rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      {horizontal && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = 'ScrollArea';

export const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ orientation = 'vertical', className, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none p-0.5 transition-colors',
      orientation === 'vertical' ? 'h-full w-2.5' : 'h-2.5 flex-col',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-pill bg-border-strong" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';
