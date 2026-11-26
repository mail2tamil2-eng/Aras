import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../lib/cn';
import { XIcon } from '../../icons/icons';
import { ModalOverlay } from '../Modal/Modal';

/**
 * Sheet (drawer)
 *
 * A panel that slides in from an edge, for settings editors, inspectors and mobile navigation,
 * while keeping the page's context visible. Same parts as Modal: Sheet, SheetTrigger,
 * SheetContent (`side`), SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter.
 *
 * Accessibility: same as Modal (role="dialog", focus trap, Esc, focus returns to trigger).
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

const sides = {
  right: 'inset-y-0 right-0 h-full w-full max-w-md border-l data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
  left: 'inset-y-0 left-0 h-full w-full max-w-md border-r data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left',
  top: 'inset-x-0 top-0 max-h-[85vh] border-b data-[state=open]:animate-slide-in-top data-[state=closed]:animate-slide-out-top',
  bottom: 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-overlay border-t data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom',
};

export interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: keyof typeof sides;
}

export const SheetContent = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Content>, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-[var(--aras-layer-modal)] flex flex-col border-border bg-surface-raised text-fg shadow-modal',
          'focus-visible:outline-2 focus-visible:outline-focus',
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-control text-fg-secondary hover:bg-surface-sunken hover:text-fg focus-visible:outline-2 focus-visible:outline-focus"
        >
          <XIcon className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);
SheetContent.displayName = 'SheetContent';

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-[var(--aras-space-2xs)] border-b border-border px-[var(--aras-space-lg)] py-[var(--aras-space-md)] pr-12', className)}
      {...props}
    />
  );
}

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn('text-h3 text-fg', className)} {...props} />);
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-small text-fg-secondary', className)} {...props} />
));
SheetDescription.displayName = 'SheetDescription';

export function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('min-h-0 flex-1 overflow-y-auto p-[var(--aras-space-lg)]', className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex justify-end gap-[var(--aras-space-xs)] border-t border-border bg-surface-sunken px-[var(--aras-space-lg)] py-[var(--aras-space-md)]',
        className,
      )}
      {...props}
    />
  );
}
