import * as React from 'react';
import { ArrowRightIcon, Badge, XIcon, cn, intentClasses, type Intent } from '@tamilarasan/aras-ui';

/**
 * AnnouncementBar pattern
 *
 * A slim strip at the top of the page for launches, status messages or system notices.
 * One short sentence, an optional eyebrow label and one link. Dismissible.
 *
 * Accessibility: a <section> named "Announcement"; the dismiss button says what it closes;
 * once dismissed it stays hidden for the session (store that yourself via `onDismiss`).
 */
export interface AnnouncementBarProps {
  children: React.ReactNode;
  eyebrow?: string;
  cta?: { label: string; href: string };
  intent?: Extract<Intent, 'primary' | 'neutral' | 'success' | 'warning' | 'danger'>;
  size?: 'sm' | 'md';
  align?: 'center' | 'start';
  dismissible?: boolean;
  /** Controlled visibility. */
  visible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function AnnouncementBar({
  children,
  eyebrow,
  cta,
  intent = 'primary',
  size = 'md',
  align = 'center',
  dismissible = true,
  visible,
  onDismiss,
  className,
}: AnnouncementBarProps) {
  const [open, setOpen] = React.useState(true);
  const shown = visible ?? open;
  if (!shown) return null;

  return (
    <section
      aria-label="Announcement"
      className={cn(
        'relative flex w-full items-center gap-[var(--aras-space-sm)] px-[var(--aras-space-md)] text-small',
        size === 'sm' ? 'min-h-8 py-1' : 'min-h-11 py-2',
        align === 'center' ? 'justify-center text-center' : 'justify-start',
        dismissible && 'pr-12',
        intentClasses[intent].soft,
        className,
      )}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-[var(--aras-space-sm)] gap-y-1">
        {eyebrow && (
          <Badge intent={intent} emphasis="solid" size="sm">
            {eyebrow}
          </Badge>
        )}
        <span className="font-medium">{children}</span>
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-1 rounded-control font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {cta.label}
            <ArrowRightIcon className="size-3.5" />
          </a>
        )}
      </p>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            setOpen(false);
            onDismiss?.();
          }}
          className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-control opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-focus"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </section>
  );
}
