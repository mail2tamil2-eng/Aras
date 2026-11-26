import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../lib/cn';
import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon, XIcon } from '../../icons/icons';
import { Spinner } from '../Spinner/Spinner';

/**
 * Toast
 *
 * Short-lived, non-blocking notifications. Put <ToastProvider> once at the app root, then call
 * `const toast = useToast()` and `toast({ title, description, intent })`, or
 * `toast.promise(work, { loading, success, error })` for async work.
 *
 * - Stack is fixed bottom-right (top on small screens); auto-dismiss after ~5s, paused on hover/focus.
 * - Errors stay until dismissed, because people may need time to read and act (2.2.1).
 * - For persistent status on the page, use an inline message instead.
 *
 * Accessibility (Radix): toasts are announced via a live region (errors assertively);
 * F8 moves focus to the toast area; Esc and swipe dismiss; every toast has a Close button.
 */
export type ToastIntent = 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface ToastOptions {
  title: string;
  description?: string;
  intent?: ToastIntent;
  /** ms before auto-dismiss. Errors default to staying open. */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastItem extends ToastOptions {
  id: number;
  open: boolean;
}

type ToastFn = ((opts: ToastOptions) => number) & {
  dismiss: (id: number) => void;
  update: (id: number, opts: Partial<ToastOptions>) => void;
  promise: <T>(work: Promise<T>, msgs: { loading: string; success: string; error: string }) => Promise<T>;
};

const ToastContext = React.createContext<ToastFn | null>(null);

const intentIcon: Record<ToastIntent, React.ReactNode> = {
  default: null,
  success: <CheckCircleIcon className="size-5 text-success-fg" />,
  info: <InfoIcon className="size-5 text-info-fg" />,
  warning: <AlertTriangleIcon className="size-5 text-warning-fg" />,
  error: <AlertCircleIcon className="size-5 text-danger-fg" />,
  loading: <Spinner size="md" className="text-fg-secondary" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const nextId = React.useRef(1);

  const toast = React.useMemo<ToastFn>(() => {
    const fn = ((opts: ToastOptions) => {
      const id = nextId.current++;
      setItems((prev) => [...prev.slice(-4), { ...opts, id, open: true }]);
      return id;
    }) as ToastFn;
    fn.dismiss = (id) => setItems((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)));
    fn.update = (id, opts) => setItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...opts } : t)));
    fn.promise = async (work, msgs) => {
      const id = fn({ title: msgs.loading, intent: 'loading' });
      try {
        const result = await work;
        fn.update(id, { title: msgs.success, intent: 'success' });
        return result;
      } catch (e) {
        fn.update(id, { title: msgs.error, intent: 'error' });
        throw e;
      }
    };
    return fn;
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      <ToastPrimitive.Provider swipeDirection="right" duration={5000}>
        {children}
        {items.map((t) => {
          const intent = t.intent ?? 'default';
          const persistent = intent === 'error' || intent === 'loading';
          return (
            <ToastPrimitive.Root
              key={t.id}
              open={t.open}
              type={intent === 'error' ? 'foreground' : 'background'}
              duration={t.duration ?? (persistent ? Infinity : undefined)}
              onOpenChange={(open) => {
                if (!open) {
                  toast.dismiss(t.id);
                  setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 400);
                }
              }}
              className={cn(
                'pointer-events-auto relative flex w-full items-start gap-[var(--aras-space-sm)] rounded-card border border-border bg-surface-raised p-[var(--aras-space-md)] pr-10 text-fg shadow-toast',
                'data-[state=open]:animate-pop-in data-[state=closed]:animate-fade-out',
                'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-slide-out-right',
              )}
            >
              {intentIcon[intent] && <span className="mt-0.5 flex shrink-0">{intentIcon[intent]}</span>}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastPrimitive.Title className="text-small font-semibold">{t.title}</ToastPrimitive.Title>
                {t.description && (
                  <ToastPrimitive.Description className="text-small text-fg-secondary">{t.description}</ToastPrimitive.Description>
                )}
                {t.action && (
                  <ToastPrimitive.Action
                    altText={t.action.label}
                    onClick={t.action.onClick}
                    className="mt-1 self-start rounded-control text-small font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-focus"
                  >
                    {t.action.label}
                  </ToastPrimitive.Action>
                )}
              </div>
              <ToastPrimitive.Close
                aria-label="Dismiss notification"
                className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-control text-fg-secondary hover:bg-surface-sunken hover:text-fg focus-visible:outline-2 focus-visible:outline-focus"
              >
                <XIcon className="size-4" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}
        <ToastPrimitive.Viewport
          className="fixed bottom-0 right-0 z-[var(--aras-layer-toast)] m-0 flex w-full max-w-sm list-none flex-col gap-[var(--aras-space-xs)] p-[var(--aras-space-md)] outline-none max-sm:bottom-auto max-sm:top-0"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastFn {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>.');
  return ctx;
}
