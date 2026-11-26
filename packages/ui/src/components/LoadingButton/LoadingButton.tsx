import * as React from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import { CheckIcon, XIcon } from '../../icons/icons';

/**
 * LoadingButton
 *
 * A Button that runs an async action and owns the idle → loading → success | error cycle,
 * so every page shows the same feedback (Doherty threshold: respond within 400ms).
 *
 * - `onAction` returns a promise. While it runs the button shows a spinner and `loadingLabel`.
 * - Resolve → check icon + `successLabel`. Reject → danger style, X icon + `errorLabel`; click to retry.
 * - `countdown` (seconds) gives a cancellable "Delete in 3…" delay first, for destructive actions.
 * - `autoResetMs` returns to idle after success.
 *
 * Accessibility: every state change is announced through a polite live region;
 * aria-busy is set while loading; during the countdown the button cancels the action.
 */
export type LoadingButtonState = 'idle' | 'countdown' | 'loading' | 'success' | 'error';

export interface LoadingButtonProps extends Omit<ButtonProps, 'onClick' | 'loading' | 'asChild'> {
  onAction: () => Promise<unknown>;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  /** Seconds to wait (cancellable) before running the action. */
  countdown?: number;
  autoResetMs?: number;
  onStateChange?: (state: LoadingButtonState) => void;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      onAction,
      children,
      loadingLabel = 'Working…',
      successLabel = 'Done',
      errorLabel = 'Failed. Try again',
      countdown,
      autoResetMs,
      onStateChange,
      variant,
      leftIcon,
      ...props
    },
    ref,
  ) => {
    const [state, setStateRaw] = React.useState<LoadingButtonState>('idle');
    const [remaining, setRemaining] = React.useState(0);
    const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const mounted = React.useRef(true);

    React.useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
        clearTimeout(timer.current);
      };
    }, []);

    const setState = React.useCallback(
      (s: LoadingButtonState) => {
        if (!mounted.current) return;
        setStateRaw(s);
        onStateChange?.(s);
      },
      [onStateChange],
    );

    const run = React.useCallback(async () => {
      setState('loading');
      try {
        await onAction();
        setState('success');
        if (autoResetMs) timer.current = setTimeout(() => setState('idle'), autoResetMs);
      } catch {
        setState('error');
      }
    }, [onAction, autoResetMs, setState]);

    const tick = React.useCallback(
      (left: number) => {
        if (left <= 0) {
          void run();
          return;
        }
        setRemaining(left);
        timer.current = setTimeout(() => tick(left - 1), 1000);
      },
      [run],
    );

    const handleClick = () => {
      if (state === 'loading') return;
      if (state === 'countdown') {
        clearTimeout(timer.current);
        setState('idle');
        return;
      }
      if (countdown && countdown > 0) {
        setState('countdown');
        tick(countdown);
      } else {
        void run();
      }
    };

    const label =
      state === 'loading'
        ? loadingLabel
        : state === 'success'
          ? successLabel
          : state === 'error'
            ? errorLabel
            : state === 'countdown'
              ? `${typeof children === 'string' ? children : 'Continue'} in ${remaining}… (click to cancel)`
              : children;

    const icon =
      state === 'success' ? <CheckIcon /> : state === 'error' ? <XIcon /> : state === 'idle' ? leftIcon : undefined;

    return (
      <>
        <Button
          ref={ref}
          variant={state === 'error' ? 'danger' : variant}
          loading={state === 'loading'}
          leftIcon={icon}
          onClick={handleClick}
          aria-disabled={state === 'success' && !autoResetMs ? true : undefined}
          {...props}
        >
          {label}
        </Button>
        <span className="sr-only" aria-live="polite">
          {state === 'idle' ? '' : typeof label === 'string' ? label : ''}
        </span>
      </>
    );
  },
);
LoadingButton.displayName = 'LoadingButton';
