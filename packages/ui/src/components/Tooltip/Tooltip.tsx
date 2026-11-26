import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../lib/cn';

/**
 * Tooltip
 *
 * A short hint shown on hover and keyboard focus. Never put essential information or
 * interactive content in a tooltip (use Popover). Icon-only buttons still need aria-label.
 *
 * Wrap the app once in <TooltipProvider>. Then: <Tooltip content="Copy link"><Button …/></Tooltip>.
 *
 * Accessibility (Radix): opens on focus as well as hover, Esc closes it, and the content is
 * linked to the trigger with aria-describedby (1.4.13 content on hover or focus).
 */
export function TooltipProvider({
  delayDuration = 250,
  skipDelayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration} {...props} />;
}

export interface TooltipProps extends Omit<React.ComponentProps<typeof TooltipPrimitive.Root>, 'children'> {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function Tooltip({ content, children, side = 'top', align = 'center', ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...props}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    collisionPadding={8}
    className={cn(
      'z-[var(--aras-layer-tooltip)] max-w-xs rounded-control bg-fg px-2.5 py-1.5 text-caption text-fg-inverse',
      'origin-[var(--radix-tooltip-content-transform-origin)] data-[state=closed]:animate-pop-out data-[state=delayed-open]:animate-pop-in data-[state=instant-open]:animate-pop-in',
      className,
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow className="fill-fg" />
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = 'TooltipContent';

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
