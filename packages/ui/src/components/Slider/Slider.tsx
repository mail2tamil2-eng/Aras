import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/cn';

/**
 * Slider
 *
 * Pick a value (or a range, with two values) on a continuous scale, e.g. volume or a price range.
 * The label sits top-left and the current value top-right. Range sliders show min and max below.
 *
 * Accessibility (Radix): each thumb is role="slider" with aria-valuenow and an accessible name
 * from the label ("Price range, minimum" / "maximum"); arrow keys, Page Up/Down, Home/End work.
 * Thumbs are 20px, inside a 24px+ hit area (2.5.8).
 */
export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'children'> {
  label: string;
  /** Format the displayed value, e.g. v => `$${v}`. */
  formatValue?: (value: number) => string;
  hideValue?: boolean;
}

export const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    { label, formatValue = String, hideValue, value, defaultValue, onValueChange, min = 0, max = 100, className, ...props },
    ref,
  ) => {
    const id = React.useId();
    const [internal, setInternal] = React.useState<number[]>(value ?? defaultValue ?? [min]);
    const current = value ?? internal;
    const isRange = current.length > 1;
    const display = isRange ? `${formatValue(current[0]!)} – ${formatValue(current[1]!)}` : formatValue(current[0]!);

    return (
      <div className={cn('flex w-full flex-col gap-[var(--aras-space-xs)]', className)}>
        <div className="flex items-baseline justify-between gap-[var(--aras-space-sm)] text-small">
          <span id={`${id}-label`} className="font-medium text-fg">
            {label}
          </span>
          {!hideValue && (
            <output aria-live="polite" className="tabular-nums text-fg-secondary">
              {display}
            </output>
          )}
        </div>
        <SliderPrimitive.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          onValueChange={(v) => {
            setInternal(v);
            onValueChange?.(v);
          }}
          className="relative flex h-6 w-full touch-none select-none items-center data-[disabled]:opacity-50"
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-pill bg-surface-sunken">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {current.map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              aria-label={isRange ? `${label}, ${i === 0 ? 'minimum' : 'maximum'}` : label}
              className={cn(
                'block size-5 rounded-pill border-2 border-primary bg-surface shadow-card transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                'data-[disabled]:cursor-not-allowed',
              )}
            />
          ))}
        </SliderPrimitive.Root>
        {isRange && (
          <div className="flex justify-between text-caption text-fg-secondary" aria-hidden="true">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
      </div>
    );
  },
);
Slider.displayName = 'Slider';
