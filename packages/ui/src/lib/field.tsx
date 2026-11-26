import * as React from 'react';
import { cn } from './cn';
import { AlertCircleIcon } from '../icons/icons';

/**
 * Shared building blocks for form controls (Input, Select, Textarea, FileField, FormField).
 * Keeping them in one place means every field has the same label, hint and error behaviour.
 */

export type FieldSize = 'sm' | 'md' | 'lg';

export const fieldSizes: Record<FieldSize, string> = {
  sm: 'h-[var(--aras-control-height-sm)] px-[var(--aras-control-padding-x-sm)] text-small',
  md: 'h-[var(--aras-control-height-md)] px-[var(--aras-control-padding-x-md)] text-body',
  lg: 'h-[var(--aras-control-height-lg)] px-[var(--aras-control-padding-x-lg)] text-body',
};

/** Border, fill, focus, disabled, read-only and invalid styles shared by every text-like control. */
export const fieldControlClass = cn(
  'w-full rounded-control border border-border-strong bg-surface text-fg placeholder:text-fg-secondary',
  'transition-colors duration-[var(--aras-motion-duration-fast)] motion-reduce:transition-none',
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus',
  'disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-fg-disabled',
  'aria-invalid:border-danger-border',
);

/** Creates linked ids for a control and its hint and error, for aria-describedby. */
export function useFieldIds(id: string | undefined, prefix: string, hint?: React.ReactNode, error?: React.ReactNode) {
  const autoId = React.useId();
  const controlId = id ?? `aras-${prefix}-${autoId}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { controlId, hintId, errorId, describedBy };
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  hidden?: boolean;
}

export function FieldLabel({ required, hidden, className, children, ...props }: FieldLabelProps) {
  return (
    <label className={cn('text-small font-medium text-fg', hidden && 'sr-only', className)} {...props}>
      {children}
      {required && (
        <span className="text-danger-fg" aria-hidden="true">
          {' '}*
        </span>
      )}
    </label>
  );
}

export function FieldHint({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-small text-fg-secondary', className)} {...props} />;
}

/** Error text with an icon, so colour is never the only signal (WCAG 1.4.1). */
export function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('flex items-start gap-[var(--aras-space-2xs)] text-small text-danger-fg', className)} {...props}>
      <AlertCircleIcon className="mt-0.5 size-4" />
      <span>
        <span className="sr-only">Error: </span>
        {children}
      </span>
    </p>
  );
}
