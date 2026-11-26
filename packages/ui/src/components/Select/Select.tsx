import * as React from 'react';
import { cn } from '../../lib/cn';
import { FieldError, FieldHint, FieldLabel, fieldControlClass, fieldSizes, useFieldIds, type FieldSize } from '../../lib/field';
import { ChevronDownIcon } from '../../icons/icons';

/**
 * Select (native)
 *
 * A single choice from a list, using the browser's native <select> for the best keyboard,
 * screen reader and mobile support. Same label, hint and error behaviour as Input.
 * For 2–6 options that should all be visible, use RadioGroup instead.
 *
 * Pass options as children (<option>) or with the `options` prop.
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  size?: FieldSize;
  options?: SelectOption[];
  /** First, empty option such as "Select a region". */
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, hideLabel, size = 'md', options, placeholder, required, id, className, children, ...props }, ref) => {
    const { controlId, hintId, errorId, describedBy } = useFieldIds(id, 'select', hint, error);
    return (
      <div className="flex flex-col gap-[var(--aras-space-2xs)]">
        <FieldLabel htmlFor={controlId} required={required} hidden={hideLabel}>
          {label}
        </FieldLabel>
        <div className="relative">
          <select
            ref={ref}
            id={controlId}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(fieldControlClass, fieldSizes[size], 'peer cursor-pointer appearance-none pr-9', className)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled={required}>
                {placeholder}
              </option>
            )}
            {options?.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
            {children}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-secondary transition-transform peer-focus:rotate-180 peer-disabled:text-fg-disabled motion-reduce:transition-none" />
        </div>
        {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  },
);
Select.displayName = 'Select';
