import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Input (text field with label, hint and error)
 *
 * Accessibility (WCAG 2.2 AA):
 * - Always has a visible <label> linked to the field (1.3.1, 3.3.2).
 * - Hint and error are linked with aria-describedby, so screen readers read them.
 * - Errors use an icon + text, not colour alone (1.4.1), and say how to fix (3.3.3).
 * - Border is 3:1 against the surface (1.4.11); focus ring is always visible (2.4.7).
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. Required: never rely on placeholder text as the label. */
  label: string;
  /** Short help text under the field. */
  hint?: string;
  /** Error message. Say what is wrong and how to fix it. */
  error?: string;
  /** Hide the label visually but keep it for screen readers. Use rarely (search bars). */
  hideLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-[var(--aras-control-height-sm)] px-[var(--aras-control-padding-x-sm)] text-small',
  md: 'h-[var(--aras-control-height-md)] px-[var(--aras-control-padding-x-md)] text-body',
  lg: 'h-[var(--aras-control-height-lg)] px-[var(--aras-control-padding-x-lg)] text-body',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, hideLabel = false, required, size = 'md', id, className, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? `aras-input-${autoId}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex flex-col gap-[var(--aras-space-2xs)]">
        <label
          htmlFor={inputId}
          className={cn('text-small font-medium text-fg', hideLabel && 'sr-only')}
        >
          {label}
          {required && (
            <span className="text-danger-fg" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full rounded-control border border-border-strong bg-surface text-fg placeholder:text-fg-secondary',
            'transition-colors duration-[var(--aras-motion-duration-fast)] motion-reduce:transition-none',
            'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus',
            'disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-fg-disabled',
            'aria-invalid:border-danger-border',
            sizes[size],
            className,
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-small text-fg-secondary">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="flex items-start gap-[var(--aras-space-2xs)] text-small text-danger-fg">
            <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.5a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4ZM10 14.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <span className="sr-only">Error: </span>
              {error}
            </span>
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
