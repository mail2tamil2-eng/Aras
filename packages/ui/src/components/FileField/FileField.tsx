import * as React from 'react';
import { cn } from '../../lib/cn';
import { FieldError, FieldHint, FieldLabel, fieldSizes, useFieldIds, type FieldSize } from '../../lib/field';
import { UploadIcon } from '../../icons/icons';

/**
 * FileField
 *
 * A file picker that looks like Input. The native <input type="file"> stays in the page
 * (visually hidden), so keyboard, screen readers and mobile pickers work as normal.
 * Pass `accept`, `multiple` and other file attributes.
 *
 * Accessibility: the visible row is the label of the native input; focus shows on the row
 * (focus-within). The chosen file name is announced politely.
 */
export interface FileFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
  hint?: string;
  error?: string;
  size?: FieldSize;
  /** Text shown before a file is chosen. */
  placeholder?: string;
}

export const FileField = React.forwardRef<HTMLInputElement, FileFieldProps>(
  ({ label, hint, error, size = 'md', placeholder = 'Choose a file…', required, disabled, id, className, onChange, ...props }, ref) => {
    const { controlId, hintId, errorId, describedBy } = useFieldIds(id, 'file', hint, error);
    const [names, setNames] = React.useState<string[]>([]);

    return (
      <div className="flex flex-col gap-[var(--aras-space-2xs)]">
        <FieldLabel htmlFor={controlId} required={required}>
          {label}
        </FieldLabel>
        <label
          htmlFor={controlId}
          className={cn(
            'flex w-full cursor-pointer items-center gap-[var(--aras-space-xs)] rounded-control border border-border-strong bg-surface',
            'transition-colors hover:border-fg-secondary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-focus',
            error && 'border-danger-border',
            disabled && 'cursor-not-allowed bg-surface-sunken text-fg-disabled hover:border-border-strong',
            fieldSizes[size],
            className,
          )}
        >
          <UploadIcon className={cn('size-4 shrink-0', disabled ? 'text-fg-disabled' : 'text-fg-secondary')} />
          <span
            className={cn('min-w-0 flex-1 truncate', names.length ? 'text-fg' : 'text-fg-secondary', disabled && 'text-fg-disabled')}
            aria-live="polite"
          >
            {names.length === 0 ? placeholder : names.length === 1 ? names[0] : `${names.length} files selected`}
          </span>
          <span className={cn('shrink-0 font-medium', disabled ? 'text-fg-disabled' : 'text-link')} aria-hidden="true">
            Browse
          </span>
          <input
            ref={ref}
            id={controlId}
            type="file"
            required={required}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="sr-only"
            onChange={(e) => {
              setNames(Array.from(e.target.files ?? []).map((f) => f.name));
              onChange?.(e);
            }}
            {...props}
          />
        </label>
        {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  },
);
FileField.displayName = 'FileField';
