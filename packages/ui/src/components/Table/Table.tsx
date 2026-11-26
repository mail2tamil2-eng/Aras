import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Table
 *
 * Semantic table parts with ARAS styling: Table, TableHeader, TableBody, TableFooter, TableRow,
 * TableHead, TableCell, TableCaption. The table scrolls horizontally on small screens instead of
 * squashing columns (WCAG 1.4.10 reflow allows two-dimensional tables to scroll).
 *
 * Accessibility: real <table> markup, so screen readers announce rows, columns and headers.
 * Use <TableHead scope="col"> for column headers. Selected rows set `data-state="selected"` and
 * aria-selected. Add a TableCaption (visible or sr-only) to name the table.
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: 'comfortable' | 'compact';
  /** Content under the table, outside its border, e.g. pagination. */
  footer?: React.ReactNode;
}

const DensityContext = React.createContext<'comfortable' | 'compact'>('comfortable');

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ density = 'comfortable', footer, className, ...props }, ref) => (
    <DensityContext.Provider value={density}>
      <div className="flex w-full flex-col gap-[var(--aras-space-sm)]">
        <div className="w-full touch-pan-x overflow-x-auto rounded-card border border-border bg-surface transition-colors hover:border-border-strong">
          <table ref={ref} className={cn('w-full min-w-xl caption-bottom border-collapse text-small md:min-w-0', className)} {...props} />
        </div>
        {footer}
      </div>
    </DensityContext.Provider>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('bg-surface-sunken', className)} {...props} />,
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />,
);
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t border-border bg-surface-sunken font-medium', className)} {...props} />
  ),
);
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ selected, className, ...props }, ref) => (
  <tr
    ref={ref}
    data-state={selected ? 'selected' : undefined}
    aria-selected={selected}
    className={cn(
      'border-b border-border transition-colors hover:bg-surface-sunken data-[state=selected]:bg-brand-subtle',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, scope = 'col', ...props }, ref) => {
    const density = React.useContext(DensityContext);
    return (
      <th
        ref={ref}
        scope={scope}
        className={cn(
          'whitespace-nowrap border-b border-border px-2 text-left align-middle text-caption font-semibold text-fg-secondary sm:px-3',
          density === 'compact' ? 'h-8' : 'h-10',
          className,
        )}
        {...props}
      />
    );
  },
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    const density = React.useContext(DensityContext);
    return (
      <td
        ref={ref}
        className={cn('px-2 align-middle text-fg sm:px-3', density === 'compact' ? 'py-1.5' : 'py-3', className)}
        {...props}
      />
    );
  },
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('py-[var(--aras-space-sm)] text-small text-fg-secondary', className)} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';
