import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../lib/cn';
import { XIcon } from '../../icons/icons';

/**
 * Modal (dialog)
 *
 * A centred panel that blocks the page until the user responds. Use for confirmations and short,
 * focused tasks. For side panels use Sheet; for small non-blocking content use Popover.
 *
 * Parts: Modal (root), ModalTrigger, ModalContent, ModalHeader (title + description), ModalBody, ModalFooter.
 * Destructive confirms: name the thing and the consequence, and use a `danger` button.
 *
 * Accessibility (Radix): role="dialog" with aria-modal, named by ModalTitle and described by
 * ModalDescription. Focus is trapped inside, Esc closes, and focus returns to the trigger.
 */
export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[var(--aras-layer-overlay)] bg-overlay backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = 'ModalOverlay';

const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: keyof typeof widths;
  /** Corner close (x) button. On by default. */
  showCloseButton?: boolean;
}

export const ModalContent = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Content>, ModalContentProps>(
  ({ size = 'md', showCloseButton = true, className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <ModalOverlay />
      <div className="pointer-events-none fixed inset-0 z-[var(--aras-layer-modal)] flex items-center justify-center p-[var(--aras-space-md)]">
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'pointer-events-auto relative flex max-h-full w-full flex-col overflow-hidden rounded-overlay border border-border bg-surface-raised text-fg shadow-modal',
            'data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in',
            'focus-visible:outline-2 focus-visible:outline-focus',
            widths[size],
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-control text-fg-secondary hover:bg-surface-sunken hover:text-fg focus-visible:outline-2 focus-visible:outline-focus"
            >
              <XIcon className="size-4" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  ),
);
ModalContent.displayName = 'ModalContent';

export function ModalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-[var(--aras-space-2xs)] px-[var(--aras-space-lg)] pb-[var(--aras-space-md)] pr-12 pt-[var(--aras-space-lg)]', className)} {...props} />;
}

export const ModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn('text-h3 text-fg', className)} {...props} />);
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-body text-fg-secondary', className)} {...props} />
));
ModalDescription.displayName = 'ModalDescription';

export function ModalBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('min-h-0 flex-1 overflow-y-auto px-[var(--aras-space-lg)] pb-[var(--aras-space-lg)] text-body text-fg', className)} {...props} />;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `end` right-aligns actions; `split` makes two equal full-width actions. */
  layout?: 'end' | 'split';
}

export function ModalFooter({ layout = 'end', className, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-[var(--aras-space-xs)] border-t border-border bg-surface-sunken px-[var(--aras-space-lg)] py-[var(--aras-space-md)]',
        layout === 'end' ? 'justify-end' : '*:flex-1',
        className,
      )}
      {...props}
    />
  );
}
