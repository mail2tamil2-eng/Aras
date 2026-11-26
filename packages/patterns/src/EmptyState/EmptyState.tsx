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
  /** sm: inside cards and tables · md: default · lg: full-page state. */
  size?: 'sm' | 'md' | 'lg';
  /** `start` left-aligns for inline use inside lists. */
  align?: 'center' | 'start';
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  headingLevel: Heading = 'h2',
  size = 'md',
  align = 'center',
  className,
}: EmptyStateProps) {
  const centered = align === 'center';
  return (
    <section
      className={cn(
        'flex flex-col gap-[var(--aras-space-md)] rounded-card',
        centered ? 'mx-auto items-center text-center' : 'items-start text-left',
        size === 'sm' && 'max-w-sm p-[var(--aras-space-md)]',
        size === 'md' && 'max-w-md bg-surface p-[var(--aras-space-xl)]',
        size === 'lg' && 'max-w-lg py-[var(--aras-space-3xl)]',
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-pill bg-brand-subtle text-brand',
            size === 'sm' ? 'size-10' : size === 'lg' ? 'size-16' : 'size-12',
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-[var(--aras-space-xs)]">
        <Heading className={cn('text-fg', size === 'sm' ? 'text-body font-semibold' : size === 'lg' ? 'text-h2' : 'text-h3')}>
          {title}
        </Heading>
        {description && <p className={cn('text-fg-secondary', size === 'sm' ? 'text-small' : 'text-body')}>{description}</p>}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className={cn('flex flex-wrap items-center gap-[var(--aras-space-sm)]', centered && 'justify-center')}>
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
