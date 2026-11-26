import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  cn,
} from '@tamilarasan/aras-ui';

/**
 * PageHeader pattern
 *
 * Top of every product page: breadcrumb, optional eyebrow, the page's single h1, description,
 * actions on the trailing edge (one primary at most) and an optional metadata strip.
 * Pure layout, no state. Pair with EmptyState when the page has no content yet.
 */
export interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  /** Buttons on the right. Put the primary action last. */
  actions?: React.ReactNode;
  /** Small facts under the header, e.g. owner, status, last updated. */
  meta?: { label: string; value: React.ReactNode }[];
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
  meta,
  size = 'md',
  bordered = true,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex w-full flex-col gap-[var(--aras-space-md)]',
        bordered && 'border-b border-border pb-[var(--aras-space-lg)]',
        className,
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((b, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <React.Fragment key={`${b.label}-${i}`}>
                  <BreadcrumbItem>
                    {last || !b.href ? <BreadcrumbPage>{b.label}</BreadcrumbPage> : <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>}
                  </BreadcrumbItem>
                  {!last && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex flex-wrap items-start justify-between gap-[var(--aras-space-md)]">
        <div className="flex min-w-0 max-w-3xl flex-col gap-[var(--aras-space-xs)]">
          {eyebrow && <p className="text-caption font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>}
          <h1 className={cn('text-fg', size === 'lg' ? 'text-display' : size === 'sm' ? 'text-h3' : 'text-h2')}>{title}</h1>
          {description && <p className={cn('text-fg-secondary', size === 'sm' ? 'text-small' : 'text-body')}>{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-[var(--aras-space-xs)]">{actions}</div>}
      </div>
      {meta && meta.length > 0 && (
        <dl className="flex flex-wrap gap-x-[var(--aras-space-xl)] gap-y-[var(--aras-space-sm)]">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <dt className="text-caption text-fg-secondary">{m.label}</dt>
              <dd className="text-small font-medium text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
