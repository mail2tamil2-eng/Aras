import * as React from 'react';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Input,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ChevronDownIcon,
  cn,
} from '@tamilarasan/aras-ui';
import { EmptyState } from '../EmptyState/EmptyState';

/**
 * DataTable pattern
 *
 * A Table with the common extras: search, one filter menu, row selection and client-side
 * pagination, plus loading (skeleton rows), empty and error states.
 * Columns describe how to read and render each field.
 *
 * Accessibility: the table has a caption (visually hidden by default); selection checkboxes are
 * named per row ("Select Access reviews"); the header checkbox selects the visible page and shows
 * an indeterminate state; the result count is announced politely when filters change.
 */
export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Read the cell value (used for search). Defaults to row[key]. */
  accessor?: (row: T) => string | number;
  cell?: (row: T) => React.ReactNode;
  align?: 'left' | 'right';
}

export interface DataTableProps<T> {
  caption: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  /** Used for row checkbox names. */
  getRowLabel?: (row: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  /** One filter menu, e.g. by owner. */
  filter?: { label: string; key: string; options: string[] };
  selectable?: boolean;
  onSelectionChange?: (ids: string[]) => void;
  pageSize?: number;
  /** Actions at the end of each row. */
  rowActions?: (row: T) => React.ReactNode;
  density?: 'comfortable' | 'compact';
  loading?: boolean;
  error?: { message: string; onRetry?: () => void };
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function DataTable<T>({
  caption,
  columns,
  rows,
  getRowId,
  getRowLabel,
  searchable = true,
  searchPlaceholder = 'Search',
  filter,
  selectable = true,
  onSelectionChange,
  pageSize = 10,
  rowActions,
  density = 'comfortable',
  loading,
  error,
  emptyTitle = 'No results',
  emptyDescription = 'Try a different search or clear the filters.',
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState('');
  const [filterValues, setFilterValues] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);

  const read = React.useCallback(
    (row: T, col: DataTableColumn<T>) => String(col.accessor ? col.accessor(row) : ((row as Record<string, unknown>)[col.key] ?? '')),
    [],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (q && !columns.some((c) => read(row, c).toLowerCase().includes(q))) return false;
      if (filter && filterValues.length > 0) {
        const v = String((row as Record<string, unknown>)[filter.key] ?? '');
        if (!filterValues.includes(v)) return false;
      }
      return true;
    });
  }, [rows, columns, query, filter, filterValues, read]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);
  const pageIds = pageRows.map(getRowId);
  const selectedOnPage = pageIds.filter((id) => selected.has(id)).length;
  const headerState = selectedOnPage === 0 ? false : selectedOnPage === pageIds.length ? true : 'indeterminate';

  const updateSelection = (next: Set<string>) => {
    setSelected(next);
    onSelectionChange?.([...next]);
  };

  const toggleAll = () => {
    const next = new Set(selected);
    if (headerState === true) pageIds.forEach((id) => next.delete(id));
    else pageIds.forEach((id) => next.add(id));
    updateSelection(next);
  };

  const colCount = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);
  const first = filtered.length === 0 ? 0 : (current - 1) * pageSize + 1;
  const last = Math.min(current * pageSize, filtered.length);

  return (
    <div className={cn('flex w-full flex-col gap-[var(--aras-space-sm)]', className)}>
      {(searchable || filter) && (
        <div className="flex flex-wrap items-end gap-[var(--aras-space-xs)]">
          {searchable && (
            <div className="w-full max-w-xs">
              <Input
                label={searchPlaceholder}
                hideLabel
                type="search"
                size="sm"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          )}
          {filter && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" rightIcon={<ChevronDownIcon />}>
                  {filter.label}
                  {filterValues.length > 0 && ` (${filterValues.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{filter.label}</DropdownMenuLabel>
                {filter.options.map((o) => (
                  <DropdownMenuCheckboxItem
                    key={o}
                    checked={filterValues.includes(o)}
                    onCheckedChange={(on) => {
                      setFilterValues((prev) => (on ? [...prev, o] : prev.filter((x) => x !== o)));
                      setPage(1);
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {o}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      <Table
        density={density}
        aria-busy={loading || undefined}
        footer={
          !loading &&
          !error &&
          filtered.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-[var(--aras-space-sm)]">
              <p className="text-small text-fg-secondary" aria-live="polite">
                {selectable
                  ? `${selected.size} of ${filtered.length} row(s) selected.`
                  : `Showing ${first}–${last} of ${filtered.length} rows`}
              </p>
              {pageCount > 1 && <Pagination page={current} pageCount={pageCount} onPageChange={setPage} hideSummary />}
            </div>
          )
        }
      >
        <TableCaption className="sr-only">{caption}</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className="w-10">
                <Checkbox
                  size="sm"
                  aria-label="Select all rows on this page"
                  checked={headerState}
                  onCheckedChange={toggleAll}
                  disabled={loading || pageRows.length === 0}
                />
              </TableHead>
            )}
            {columns.map((c) => (
              <TableHead key={c.key} className={c.align === 'right' ? 'text-right' : undefined}>
                {c.header}
              </TableHead>
            ))}
            {rowActions && (
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            Array.from({ length: Math.min(pageSize, 5) }, (_, i) => (
              <TableRow key={`s${i}`} className="hover:bg-transparent">
                <TableCell colSpan={colCount}>
                  <Skeleton shape="text" />
                </TableCell>
              </TableRow>
            ))}
          {!loading && error && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={colCount}>
                <EmptyState
                  size="sm"
                  title="Couldn't load this table"
                  description={error.message}
                  primaryAction={error.onRetry ? { label: 'Try again', onClick: error.onRetry } : undefined}
                  headingLevel="h3"
                />
              </TableCell>
            </TableRow>
          )}
          {!loading && !error && filtered.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={colCount}>
                <EmptyState size="sm" title={emptyTitle} description={emptyDescription} headingLevel="h3" />
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            !error &&
            pageRows.map((row) => {
              const id = getRowId(row);
              const isSel = selected.has(id);
              return (
                <TableRow key={id} selected={selectable ? isSel : undefined}>
                  {selectable && (
                    <TableCell>
                      <Checkbox
                        size="sm"
                        aria-label={`Select ${getRowLabel ? getRowLabel(row) : id}`}
                        checked={isSel}
                        onCheckedChange={(on) => {
                          const next = new Set(selected);
                          if (on) next.add(id);
                          else next.delete(id);
                          updateSelection(next);
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((c) => (
                    <TableCell key={c.key} className={c.align === 'right' ? 'text-right tabular-nums' : undefined}>
                      {c.cell ? c.cell(row) : read(row, c)}
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">{rowActions(row)}</div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
