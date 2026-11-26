import * as React from 'react';
import { Separator, cn } from '@tamilarasan/aras-ui';

/**
 * SiteFooter pattern (marketing)
 *
 * Logo and short description, link columns (Product, Company, Resources…), optional office
 * addresses, and a legal strip (copyright, certifications, policy links).
 *
 * Accessibility: a <footer> landmark; each column is a labelled <nav>; addresses use <address>.
 */
export interface SiteFooterProps {
  logo: React.ReactNode;
  description?: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  offices?: { city: string; lines: string[] }[];
  /** e.g. "© 2026 Your Company Ltd." */
  copyright: string;
  badges?: string[];
  legalLinks?: { label: string; href: string }[];
  className?: string;
}

const linkClass =
  'rounded-control text-small text-fg-secondary hover:text-fg hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

export function SiteFooter({ logo, description, columns, offices, copyright, badges, legalLinks, className }: SiteFooterProps) {
  return (
    <footer className={cn('w-full border-t border-border bg-surface px-[var(--aras-space-lg)] py-[var(--aras-space-2xl)]', className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-[var(--aras-space-2xl)]">
        <div className="flex flex-wrap gap-[var(--aras-space-xl)]">
          <div className="flex basis-full flex-col gap-[var(--aras-space-sm)] md:max-w-xs md:basis-auto md:flex-[2]">
            {logo}
            {description && <p className="text-small text-fg-secondary">{description}</p>}
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex min-w-36 flex-1 flex-col gap-[var(--aras-space-sm)]">
              <h2 className="text-small font-semibold text-fg">{col.title}</h2>
              <ul className="flex flex-col gap-[var(--aras-space-xs)]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {offices && offices.length > 0 && (
          <div className="grid gap-[var(--aras-space-lg)] sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <address key={o.city} className="flex flex-col gap-0.5 not-italic">
                <span className="text-small font-semibold text-fg">{o.city}</span>
                {o.lines.map((line) => (
                  <span key={line} className="text-small text-fg-secondary">
                    {line}
                  </span>
                ))}
              </address>
            ))}
          </div>
        )}

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-[var(--aras-space-md)] text-small text-fg-secondary">
          <div className="flex flex-wrap items-center gap-x-[var(--aras-space-md)] gap-y-1">
            <span>{copyright}</span>
            {badges?.map((b) => <span key={b}>{b}</span>)}
          </div>
          {legalLinks && legalLinks.length > 0 && (
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-[var(--aras-space-md)]">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
