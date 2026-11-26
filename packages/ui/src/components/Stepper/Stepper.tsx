import * as React from 'react';
import { cn } from '../../lib/cn';
import { AlertCircleIcon, CheckIcon } from '../../icons/icons';

/**
 * Stepper
 *
 * Progress through a multi-step flow (wizards, onboarding). Each step is `pending`, `active`,
 * `complete` or `error`. Horizontal is a compact rail; vertical shows descriptions.
 * Miller's Law: keep each step to 5–7 fields.
 *
 * Accessibility: an ordered list; the active step has aria-current="step"; each step's status
 * is read out in words ("Completed", "Error"), not only shown by colour or icon (1.4.1).
 * With `onStepClick`, steps become buttons.
 */
export type StepStatus = 'pending' | 'active' | 'complete' | 'error';

export interface StepperStep {
  title: string;
  description?: string;
  status: StepStatus;
  /** Replaces the number on pending/active steps. */
  icon?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  steps: StepperStep[];
  orientation?: 'horizontal' | 'vertical';
  /** `active-only` shows the description on the current (or error) step only. */
  descriptions?: 'active-only' | 'always';
  /** Thin progress bar with "Step n of m" above the list. */
  showProgressHeader?: boolean;
  onStepClick?: (index: number) => void;
}

const statusText: Record<StepStatus, string> = {
  pending: 'Not started',
  active: 'Current step',
  complete: 'Completed',
  error: 'Needs attention',
};

export function Stepper({
  steps,
  orientation = 'vertical',
  descriptions = 'active-only',
  showProgressHeader,
  onStepClick,
  className,
  'aria-label': ariaLabel = 'Progress',
  ...props
}: StepperProps) {
  const activeIndex = Math.max(
    steps.findIndex((s) => s.status === 'active' || s.status === 'error'),
    0,
  );
  const done = steps.filter((s) => s.status === 'complete').length;
  const vertical = orientation === 'vertical';

  return (
    <nav aria-label={ariaLabel} className={cn('flex w-full flex-col gap-[var(--aras-space-md)]', className)} {...props}>
      {showProgressHeader && (
        <div className="flex flex-col gap-[var(--aras-space-xs)]">
          <p className="text-small font-medium text-fg">
            Step {activeIndex + 1} of {steps.length}
          </p>
          <div className="h-1 overflow-hidden rounded-pill bg-surface-sunken" aria-hidden="true">
            <div className="h-full rounded-pill bg-primary" style={{ width: `${(done / steps.length) * 100}%` }} />
          </div>
        </div>
      )}
      <ol className={cn('flex', vertical ? 'flex-col' : 'flex-row items-start')}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const showDesc =
            step.description && (descriptions === 'always' || step.status === 'active' || step.status === 'error');
          const tile = (
            <span
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-control border text-small font-semibold',
                step.status === 'pending' && 'border-border-strong bg-surface text-fg-secondary',
                step.status === 'active' && 'border-primary bg-primary text-on-primary',
                step.status === 'complete' && 'border-success-border bg-success-bg text-success-fg',
                step.status === 'error' && 'border-danger-border bg-danger-bg text-danger-fg',
              )}
              aria-hidden="true"
            >
              {step.status === 'complete' ? (
                <CheckIcon className="size-4" strokeWidth={3} />
              ) : step.status === 'error' ? (
                <AlertCircleIcon className="size-4" />
              ) : (
                (step.icon ?? i + 1)
              )}
            </span>
          );
          const text = (
            <span className="flex min-w-0 flex-col gap-0.5 text-left">
              <span className={cn('text-small font-semibold', step.status === 'pending' ? 'text-fg-secondary' : 'text-fg')}>
                {step.title}
              </span>
              <span className="sr-only">, {statusText[step.status]}</span>
              {showDesc && (
                <span className={cn('text-small', step.status === 'error' ? 'text-danger-fg' : 'text-fg-secondary')}>
                  {step.description}
                </span>
              )}
            </span>
          );
          const inner = (
            <>
              {tile}
              {text}
            </>
          );
          const interactive = onStepClick && (
            <button
              type="button"
              onClick={() => onStepClick(i)}
              className={cn(
                'flex gap-[var(--aras-space-sm)] rounded-control text-left',
                vertical ? 'items-start' : 'flex-col items-center',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
              )}
            >
              {inner}
            </button>
          );
          return (
            <li
              key={step.title}
              aria-current={step.status === 'active' ? 'step' : undefined}
              className={cn('relative flex', vertical ? 'gap-[var(--aras-space-sm)] pb-[var(--aras-space-lg)] last:pb-0' : 'flex-1 flex-col items-center gap-[var(--aras-space-xs)] text-center')}
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute border-dashed',
                    step.status === 'complete' ? 'border-success-border' : 'border-border-strong',
                    vertical ? 'left-[calc(var(--aras-space-md)+var(--aras-space-2xs))] top-10 bottom-1 border-l-2' : 'left-[calc(50%+var(--aras-space-lg))] right-[calc(-50%+var(--aras-space-lg))] top-[calc(var(--aras-space-md)+var(--aras-space-2xs))] border-t-2',
                  )}
                />
              )}
              {interactive ?? (
                <span className={cn('flex gap-[var(--aras-space-sm)]', vertical ? 'items-start' : 'flex-col items-center')}>{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
