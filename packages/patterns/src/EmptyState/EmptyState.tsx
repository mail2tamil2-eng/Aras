import * as React from 'react';
import { Button, cn } from '@tamilarasan/aras-ui';

/**
 * EmptyState pattern
 *
 * Use when a list, table or page has no data yet, or a search finds nothing.
 * UX rules applied:
 * - One primary action (Von Restorff, Hick's Law): tell the user the single best next step.
 * - Explain why it is empty and what happens next, in plain words.
 * - Heading level is configurable so the page outline stays correct (WCAG 1.3.1).
 */
export interface EmptyStateProps {
  title: string;
  description?: string;
  /** Decorative icon or illustration. It is hidden from screen readers. */
  icon?: React.ReactNode;
  primaryAction?: { label: string; onClick?: () => void; href?: string };
  secondaryAction?: { label: string; onClick?: () => void; href?: string };
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  headingLevel: Heading = 'h2',
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        'mx-auto flex max-w-md flex-col items-center gap-[var(--aras-space-md)] rounded-card bg-surface p-[var(--aras-space-xl)] text-center',
        className,
      )}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-pill bg-brand-subtle text-brand" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-[var(--aras-space-xs)]">
        <Heading className="text-h3 text-fg">{title}</Heading>
        {description && <p className="text-body text-fg-secondary">{description}</p>}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-[var(--aras-space-sm)]">
          {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
          {primaryAction && <ActionButton action={primaryAction} variant="primary" />}
        </div>
      )}
    </section>
  );
}

function ActionButton({
  action,
  variant,
}: {
  action: NonNullable<EmptyStateProps['primaryAction']>;
  variant: 'primary' | 'secondary';
}) {
  if (action.href) {
    return (
      <Button variant={variant} asChild>
        <a href={action.href}>{action.label}</a>
      </Button>
    );
  }
  return (
    <Button variant={variant} onClick={action.onClick}>
      {action.label}
    </Button>
  );
}
