import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Skeleton
 *
 * Loading placeholder that matches the shape of the real content (Doherty threshold:
 * show something within 400ms). Size it with width/height classes.
 *
 * Accessibility: skeletons are hidden from screen readers. Put aria-busy="true" on the
 * region that is loading, and announce completion if it matters.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'rect' | 'text' | 'circle';
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ shape = 'rect', className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn(
      'bg-surface-sunken motion-safe:animate-pulse',
      shape === 'rect' && 'rounded-control',
      shape === 'text' && 'h-4 w-full rounded-control',
      shape === 'circle' && 'rounded-pill',
      className,
    )}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';
