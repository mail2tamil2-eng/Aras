import * as React from 'react';
import { cn } from '../../lib/cn';
import { FieldError, FieldHint, FieldLabel, fieldControlClass, useFieldIds } from '../../lib/field';

/**
 * Textarea
 *
 * Multi-line text field, aligned with Input: visible label, hint, error with icon, required marker.
 * With `maxLength` and `showCount`, a live character counter is shown and announced politely.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, hideLabel, size = 'md', showCount, required, id, rows = 4, className, onChange, ...props }, ref) => {
    const { controlId, hintId, errorId, describedBy } = useFieldIds(id, 'textarea', hint, error);
    const initial = String(props.value ?? props.defaultValue ?? '').length;
    const [count, setCount] = React.useState(initial);
    const length = props.value != null ? String(props.value).length : count;

    return (
      <div className="flex flex-col gap-[var(--aras-space-2xs)]">
        <FieldLabel htmlFor={controlId} required={required} hidden={hideLabel}>
          {label}
        </FieldLabel>
        <textarea
          ref={ref}
          id={controlId}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            setCount(e.target.value.length);
            onChange?.(e);
          }}
          className={cn(
            fieldControlClass,
            'min-h-20 resize-y py-2 enabled:read-only:bg-surface-sunken enabled:read-only:text-fg-secondary',
            size === 'sm' ? 'px-[var(--aras-control-padding-x-sm)] text-small' : 'px-[var(--aras-control-padding-x-md)] text-body',
            className,
          )}
          {...props}
        />
        <div className="flex items-start justify-between gap-[var(--aras-space-sm)]">
          <div className="min-w-0">
            {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
            {error && <FieldError id={errorId}>{error}</FieldError>}
          </div>
          {showCount && props.maxLength != null && (
            <p className="shrink-0 text-caption tabular-nums text-fg-secondary" aria-live="polite">
              {length} / {props.maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
