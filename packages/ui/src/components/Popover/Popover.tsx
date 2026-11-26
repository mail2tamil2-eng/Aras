import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../lib/cn';
import { XIcon } from '../../icons/icons';

/**
 * Popover
 *
 * A small floating panel anchored to a trigger, for extra info, quick settings or a short form.
 * Use Modal for anything long or blocking, and Tooltip for one-line hints.
 *
 * Parts: Popover (root), PopoverTrigger, PopoverContent, and optional PopoverHeader / PopoverFooter.
 *
 * Accessibility (Radix): the trigger has aria-expanded and aria-controls; focus moves into the
 * panel on open and back to the trigger on close; Esc and outside click close it.
 */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** 480px instead of 320px. */
  wide?: boolean;
  /** Shows a close (x) button in the corner. */
  showClose?: boolean;
  arrow?: boolean;
}

export const PopoverContent = React.forwardRef<React.ComponentRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  ({ wide, showClose, arrow = true, className, sideOffset = 8, children, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={12}
        className={cn(
          'relative z-[var(--aras-layer-dropdown)] w-[calc(100vw-var(--aras-space-xl))] overflow-hidden rounded-overlay border border-border bg-surface-raised text-fg shadow-dropdown',
          wide ? 'max-w-md' : 'max-w-xs',
          'origin-[var(--radix-popover-content-transform-origin)] data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in',
          'focus-visible:outline-2 focus-visible:outline-focus',
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <PopoverPrimitive.Close
            aria-label="Close"
            className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-control text-fg-secondary hover:bg-surface-sunken hover:text-fg focus-visible:outline-2 focus-visible:outline-focus"
          >
            <XIcon className="size-4" />
          </PopoverPrimitive.Close>
        )}
        {arrow && <PopoverPrimitive.Arrow className="fill-surface-raised" />}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = 'PopoverContent';

export function PopoverBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-[var(--aras-space-xs)] p-[var(--aras-space-md)]', className)} {...props} />;
}

export function PopoverTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('pr-6 text-small font-semibold text-fg', className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-small text-fg-secondary', className)} {...props} />;
}

/** Action band at the bottom, matching ModalFooter. */
export function PopoverFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-[var(--aras-space-xs)] border-t border-border bg-surface-sunken px-[var(--aras-space-md)] py-[var(--aras-space-sm)]',
        className,
      )}
      {...props}
    />
  );
}
