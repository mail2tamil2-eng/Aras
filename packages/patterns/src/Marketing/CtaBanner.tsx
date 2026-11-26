import * as React from 'react';
import { Button, Kbd, cn } from '@tamilarasan/aras-ui';

/**
 * CtaBanner pattern
 *
 * A conversion block near the end of a marketing page: headline, one supporting line, and
 * a primary plus optional secondary action. Optional keyboard shortcut hints (Kbd) on actions.
 * Peak-end rule: make the last thing people see clear and confident.
 */
interface CtaAction {
  label: string;
  href?: string;
  onClick?: () => void;
  /** Keyboard shortcut hint, e.g. "D". Shown only; wire the shortcut yourself. */
  shortcut?: string;
}

export interface CtaBannerProps {
  title: string;
  description?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  /** `brand` uses the soft brand surface; `neutral` a sunken surface. */
  tone?: 'brand' | 'neutral';
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

function ActionButton({ action, variant }: { action: CtaAction; variant: 'primary' | 'secondary' }) {
  const content = (
    <>
      {action.label}
      {action.shortcut && (
        <Kbd size="sm" className={variant === 'primary' ? 'border-transparent bg-surface/20 text-on-primary' : undefined}>
          {action.shortcut}
        </Kbd>
      )}
    </>
  );
  if (action.href) {
    return (
      <Button asChild variant={variant} size="lg">
        <a href={action.href}>{content}</a>
      </Button>
    );
  }
  return (
    <Button variant={variant} size="lg" onClick={action.onClick}>
      {content}
    </Button>
  );
}

export function CtaBanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = 'brand',
  headingLevel: Heading = 'h2',
  className,
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-center gap-[var(--aras-space-lg)] rounded-overlay px-[var(--aras-space-lg)] py-[var(--aras-space-2xl)] text-center',
        tone === 'brand' ? 'bg-brand-subtle' : 'bg-surface-sunken',
        className,
      )}
    >
      <div className="flex max-w-2xl flex-col gap-[var(--aras-space-sm)]">
        <Heading className="text-h1 text-fg">{title}</Heading>
        {description && <p className="text-body text-fg-secondary">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-[var(--aras-space-sm)]">
        <ActionButton action={primaryAction} variant="primary" />
        {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
      </div>
    </section>
  );
}
