import * as React from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../Button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/icons';

/**
 * Pagination
 *
 * "Page n of m" summary with Previous / Next, and optional page numbers with ellipses
 * (1 … 5 [6] 7 … 11). Use the simple form for feeds and logs, numbers for indexed content.
 *
 * Accessibility: <nav aria-label="Pagination">; the current page has aria-current="page";
 * page buttons are named "Page 6"; disabled Previous/Next stay visible but disabled.
 */
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  /** Pages shown on each side of the current one before collapsing. */
  siblingCount?: number;
  hideSummary?: boolean;
}

/** Returns page numbers and 'ellipsis' markers, e.g. [1, 'ellipsis', 5, 6, 7, 'ellipsis', 11]. */
export function getPageRange(page: number, pageCount: number, siblingCount = 1): (number | 'ellipsis')[] {
  const total = siblingCount * 2 + 5;
  if (pageCount <= total) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, pageCount - 1);
  const range: (number | 'ellipsis')[] = [1];
  if (left > 2) range.push('ellipsis');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < pageCount - 1) range.push('ellipsis');
  range.push(pageCount);
  return range;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  showPageNumbers,
  siblingCount = 1,
  hideSummary,
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn('flex flex-wrap items-center justify-between gap-[var(--aras-space-sm)]', className)}
      {...props}
    >
      {!hideSummary && (
        <p className="text-small text-fg-secondary">
          Page <span className="font-medium text-fg">{page}</span> of {pageCount}
        </p>
      )}
      <div className="ml-auto flex flex-wrap items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<ChevronLeftIcon />}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        {showPageNumbers &&
          getPageRange(page, pageCount, siblingCount).map((p, i) =>
            p === 'ellipsis' ? (
              <span key={`e${i}`} className="px-1 text-small text-fg-secondary" aria-hidden="true">
                …
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? 'primary' : 'tertiary'}
                size="icon-sm"
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => onPageChange(p)}
                className={cn('tabular-nums', p !== page && 'text-fg')}
              >
                {p}
              </Button>
            ),
          )}
        <Button
          variant="secondary"
          size="sm"
          rightIcon={<ChevronRightIcon />}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
