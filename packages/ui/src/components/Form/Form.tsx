import * as React from 'react';
import { cn } from '../../lib/cn';
import { FieldError, FieldHint, FieldLabel } from '../../lib/field';

/**
 * Form layout
 *
 * Consistent scaffolding for forms: Form (bordered card shell or plain), FormHeader (title +
 * description), FormBody (field rows), FormActions (buttons, right-aligned) and FormField
 * (label + any control + hint + error, wired up for screen readers).
 *
 * FormField works with any control: it passes `id`, `aria-describedby` and `aria-invalid` to its
 * single child. Use it for controls that don't have a built-in label (Slider-like custom inputs,
 * third-party pickers). ARAS Input, Select and Textarea already include their own label.
 *
 * Miller's Law: 5–7 fields per step. One primary button in FormActions.
 */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Bordered card shell with padding. Off for forms inside a Modal or Sheet. */
  card?: boolean;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ card = true, className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn('flex w-full flex-col', card && 'rounded-card border border-border bg-surface p-[var(--aras-space-lg)]', className)}
    {...props}
  />
));
Form.displayName = 'Form';

export function FormHeader({
  title,
  description,
  headingLevel: Heading = 'h2',
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  headingLevel?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-[var(--aras-space-2xs)] pb-[var(--aras-space-lg)]', className)}>
      <Heading className="text-h3 text-fg">{title}</Heading>
      {description && <p className="text-small text-fg-secondary">{description}</p>}
    </div>
  );
}

export function FormBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-[var(--aras-space-md)]', className)} {...props} />;
}

/** Two fields side by side on wide screens, stacked on small ones. */
export function FormRow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid gap-[var(--aras-space-md)] sm:grid-cols-2', className)} {...props} />;
}

export function FormActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-end gap-[var(--aras-space-xs)] pt-[var(--aras-space-lg)]', className)}
      {...props}
    />
  );
}

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
  /** Exactly one control element. */
  children: React.ReactElement<Record<string, unknown>>;
}

export function FormField({ label, hint, error, required, id, className, children }: FormFieldProps) {
  const autoId = React.useId();
  const controlId = id ?? `aras-field-${autoId}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const control = React.cloneElement(children, {
    id: controlId,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
  });

  return (
    <div className={cn('flex flex-col gap-[var(--aras-space-2xs)]', className)}>
      <FieldLabel htmlFor={controlId} required={required} className={error ? 'text-danger-fg' : undefined}>
        {label}
      </FieldLabel>
      {control}
      {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}
