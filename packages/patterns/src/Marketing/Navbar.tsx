import * as React from 'react';
import {
  Avatar,
  BellIcon,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTextTrigger,
  MenuIcon,
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  cn,
} from '@tamilarasan/aras-ui';

/**
 * SiteNavbar pattern (marketing)
 *
 * Logo, up to 5–7 top-level items (Hick's Law) — links or dropdown menus — and actions on the right.
 * Below `md` the items move into a Sheet opened by a menu button.
 *
 * AppBar pattern (product)
 *
 * A compact top bar for apps: menu button, title, notifications and account menu.
 *
 * Accessibility: <nav aria-label="Main">; dropdowns are Radix menus (arrow keys, Esc);
 * the mobile menu button is named "Open menu"; the notification count is read as words.
 */
export type NavItem =
  | { label: string; href: string }
  | { label: string; items: { label: string; href: string; description?: string }[] };

export interface SiteNavbarProps {
  logo: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

const linkClass =
  'rounded-control px-1 py-1 text-small font-medium text-fg hover:text-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

export function SiteNavbar({ logo, items, actions, className }: SiteNavbarProps) {
  return (
    <header className={cn('flex h-16 w-full items-center gap-[var(--aras-space-lg)] px-[var(--aras-space-md)]', className)}>
      <div className="flex shrink-0 items-center">{logo}</div>
      <nav aria-label="Main" className="hidden flex-1 md:block">
        <ul className="flex items-center gap-[var(--aras-space-md)]">
          {items.map((item) => (
            <li key={item.label}>
              {'href' in item ? (
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTextTrigger>{item.label}</DropdownMenuTextTrigger>
                  <DropdownMenuContent className="min-w-60">
                    {item.items.map((sub) => (
                      <DropdownMenuItem key={sub.href} asChild>
                        <a href={sub.href} className="flex flex-col items-start gap-0.5">
                          <span className="font-medium text-fg">{sub.label}</span>
                          {sub.description && <span className="text-caption text-fg-secondary">{sub.description}</span>}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="ml-auto hidden items-center gap-[var(--aras-space-xs)] md:flex">{actions}</div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="tertiary" size="icon-md" aria-label="Open menu" className="ml-auto text-fg md:hidden">
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <nav aria-label="Main">
              <ul className="flex flex-col gap-[var(--aras-space-md)]">
                {items.map((item) => (
                  <li key={item.label}>
                    {'href' in item ? (
                      <a href={item.href} className={cn(linkClass, 'text-body')}>
                        {item.label}
                      </a>
                    ) : (
                      <div className="flex flex-col gap-[var(--aras-space-xs)]">
                        <p className="text-caption font-semibold uppercase tracking-wide text-fg-secondary">{item.label}</p>
                        <ul className="flex flex-col gap-[var(--aras-space-xs)]">
                          {item.items.map((sub) => (
                            <li key={sub.href}>
                              <a href={sub.href} className={cn(linkClass, 'text-body')}>
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {actions && <div className="mt-[var(--aras-space-xl)] flex flex-col gap-[var(--aras-space-xs)]">{actions}</div>}
          </SheetBody>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export interface AppBarProps {
  title: string;
  onMenuClick?: () => void;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  user: { name: string; src?: string };
  /** Items for the account menu, e.g. Profile, Settings, Sign out. */
  accountItems?: { label: string; onSelect?: () => void; intent?: 'default' | 'danger' }[];
  className?: string;
}

export function AppBar({ title, onMenuClick, notificationCount = 0, onNotificationsClick, user, accountItems, className }: AppBarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--aras-layer-sticky)] flex h-14 w-full items-center gap-[var(--aras-space-sm)] border-b border-border bg-surface px-[var(--aras-space-md)]',
        className,
      )}
    >
      {onMenuClick && (
        <Button variant="tertiary" size="icon-sm" aria-label="Open navigation" onClick={onMenuClick} className="text-fg">
          <MenuIcon className="size-5" />
        </Button>
      )}
      <p className="min-w-0 flex-1 truncate text-body font-semibold text-fg">{title}</p>
      <Button
        variant="tertiary"
        size="icon-sm"
        onClick={onNotificationsClick}
        aria-label={notificationCount > 0 ? `Notifications, ${notificationCount} unread` : 'Notifications'}
        className="relative text-fg"
      >
        <BellIcon className="size-5" />
        {notificationCount > 0 && (
          <span className="absolute right-1 top-1 size-2 rounded-pill bg-danger ring-2 ring-surface" aria-hidden="true" />
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTextTrigger className="gap-1.5">
          <span aria-hidden="true" className="flex">
            <Avatar name={user.name} src={user.src} size="xs" />
          </span>
          <span className="sr-only">Account menu for {user.name}</span>
        </DropdownMenuTextTrigger>
        <DropdownMenuContent align="end">
          {(accountItems ?? [{ label: 'Profile' }, { label: 'Settings' }, { label: 'Sign out' }]).map((item) => (
            <DropdownMenuItem key={item.label} onSelect={item.onSelect} intent={item.intent}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
