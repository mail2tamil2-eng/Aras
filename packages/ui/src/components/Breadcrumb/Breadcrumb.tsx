import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/cn';
import { ChevronRightIcon, MoreHorizontalIcon } from '../../icons/icons';

/**
 * Breadcrumb
 *
 * Trail of ancestor pages: Breadcrumb > BreadcrumbList > BreadcrumbItem, with BreadcrumbLink
 * for past pages and BreadcrumbPage for the current page.
 *
 * Accessibility:
 * - Wrapped in <nav aria-label="Breadcrumb"> with an ordered list (1.3.1).
 * - The current page has aria-current="page" and is not a link.
 * - Separators and the ellipsis are hidden from screen readers.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) => <nav ref={ref} aria-label={ariaLabel} {...props} />,
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1.5 break-words text-small text-fg-secondary', className)}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />,
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render your router's link component instead of <a>. */
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-control underline-offset-4 transition-colors hover:text-fg hover:underline',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-current="page" className={cn('font-medium text-fg', className)} {...props} />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export function BreadcrumbSeparator({ children, className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li role="presentation" aria-hidden="true" className={cn('flex text-fg-secondary', className)} {...props}>
      {children ?? <ChevronRightIcon className="size-3.5" />}
    </li>
  );
}

/** Stands in for collapsed middle crumbs on long trails. */
export function BreadcrumbEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span role="presentation" aria-hidden="true" className={cn('flex size-6 items-center justify-center', className)} {...props}>
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
}
