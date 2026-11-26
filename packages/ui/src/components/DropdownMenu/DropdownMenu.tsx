import * as React from 'react';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '../../lib/cn';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '../../icons/icons';

/**
 * DropdownMenu
 *
 * A list of actions or options anchored to a trigger: items, separators, labels, checkbox items,
 * radio items and nested submenus. Keep menus short (Hick's Law: 7 items or fewer per group).
 *
 * Accessibility (Radix): role="menu"; arrow keys move, Enter/Space select, typeahead jumps,
 * Esc closes and returns focus to the trigger. Destructive items use `intent="danger"` with clear text.
 */
export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuSub = MenuPrimitive.Sub;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

const panel = cn(
  'z-[var(--aras-layer-dropdown)] min-w-48 overflow-hidden rounded-overlay border border-border bg-surface-raised p-1 text-fg shadow-dropdown',
  'data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in',
);

const itemBase = cn(
  'relative flex cursor-default select-none items-center gap-[var(--aras-space-xs)] rounded-control px-2 py-1.5 text-small outline-none',
  'min-h-8 data-[highlighted]:bg-surface-sunken data-[disabled]:pointer-events-none data-[disabled]:text-fg-disabled',
);

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ className, sideOffset = 6, align = 'start', ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      collisionPadding={12}
      className={cn(panel, 'origin-[var(--radix-dropdown-menu-content-transform-origin)]', className)}
      {...props}
    />
  </MenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  icon?: React.ReactNode;
  shortcut?: React.ReactNode;
  intent?: 'default' | 'danger';
}

export const DropdownMenuItem = React.forwardRef<React.ComponentRef<typeof MenuPrimitive.Item>, DropdownMenuItemProps>(
  ({ icon, shortcut, intent = 'default', className, children, ...props }, ref) => (
    <MenuPrimitive.Item
      ref={ref}
      className={cn(itemBase, intent === 'danger' && 'text-danger-fg data-[highlighted]:bg-danger-bg', className)}
      {...props}
    >
      {icon && (
        <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {shortcut && <span className="ml-auto text-caption text-fg-secondary">{shortcut}</span>}
    </MenuPrimitive.Item>
  ),
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem ref={ref} className={cn(itemBase, 'pl-8', className)} {...props}>
    <span className="absolute left-2 flex size-4 items-center justify-center rounded-control border border-border-strong">
      <MenuPrimitive.ItemIndicator>
        <CheckIcon className="size-3" strokeWidth={3} />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem ref={ref} className={cn(itemBase, 'pl-8', className)} {...props}>
    <span className="absolute left-2 flex size-4 items-center justify-center rounded-pill border border-border-strong">
      <MenuPrimitive.ItemIndicator>
        <span className="block size-2 rounded-pill bg-primary" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-caption text-fg-secondary', className)} {...props} />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => <MenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger> & { icon?: React.ReactNode }
>(({ icon, className, children, ...props }, ref) => (
  <MenuPrimitive.SubTrigger ref={ref} className={cn(itemBase, 'data-[state=open]:bg-surface-sunken', className)} {...props}>
    {icon && (
      <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
    )}
    <span className="flex-1">{children}</span>
    <ChevronRightIcon className="ml-auto size-4 text-fg-secondary" />
  </MenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.SubContent
      ref={ref}
      collisionPadding={12}
      className={cn(panel, 'origin-[var(--radix-dropdown-menu-content-transform-origin)]', className)}
      {...props}
    />
  </MenuPrimitive.Portal>
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/** Link-style text trigger with a caret, e.g. for site nav menus ("Products ▾"). */
export const DropdownMenuTextTrigger = React.forwardRef<
  React.ComponentRef<typeof MenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'group inline-flex items-center gap-1 rounded-control px-1 py-1 text-small font-medium text-fg hover:text-fg-secondary',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon className="size-3.5 transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
  </MenuPrimitive.Trigger>
));
DropdownMenuTextTrigger.displayName = 'DropdownMenuTextTrigger';
