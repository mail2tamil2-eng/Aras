import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * Button
 *
 * Hierarchy rule: one `primary` button per view. Use `secondary` for other actions,
 * `tertiary` for low-emphasis actions, `danger` only for destructive actions.
 *
 * Accessibility (WCAG 2.2 AA):
 * - Visible focus ring (2.4.7), 3:1 against the page (1.4.11).
 * - Smallest size is 32px tall, above the 24px target minimum (2.5.8).
 * - `loading` sets aria-busy and keeps an accessible name.
 * - Icon-only buttons must have `aria-label`.
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold select-none',
    'transition-colors duration-[var(--aras-motion-duration-fast)] ease-standard motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary hover:bg-primary-hover',
        secondary: 'border border-secondary-border bg-secondary text-on-secondary hover:bg-secondary-hover',
        tertiary: 'bg-transparent text-link hover:bg-surface-sunken',
        danger: 'bg-danger text-on-danger hover:bg-danger-hover',
      },
      size: {
        sm: 'h-[var(--aras-control-height-sm)] px-[var(--aras-control-padding-x-sm)] text-small',
        md: 'h-[var(--aras-control-height-md)] px-[var(--aras-control-padding-x-md)] text-body',
        lg: 'h-[var(--aras-control-height-lg)] px-[var(--aras-control-padding-x-lg)] text-body',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (for example a link) with button styles. */
  asChild?: boolean;
  /** Shows a spinner, disables the button and announces "busy" to screen readers. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading = false, disabled, children, type, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      className="size-4 motion-safe:animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
