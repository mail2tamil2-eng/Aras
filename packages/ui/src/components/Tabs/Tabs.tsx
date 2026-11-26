import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../lib/cn';

/**
 * Tabs
 *
 * Switch between related views on the same page. Kinds: `line` (underline), `pill` (filled segment).
 * Set `orientation="vertical"` for a side rail. Keep labels short; icons go before the label.
 *
 * Accessibility (Radix): role="tablist"/"tab"/"tabpanel" with aria-selected and aria-controls;
 * arrow keys move between tabs, Home/End jump; the panel is focusable.
 */
type TabsKind = 'line' | 'pill';
const KindContext = React.createContext<{ kind: TabsKind; vertical: boolean }>({ kind: 'line', vertical: false });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  kind?: TabsKind;
}

export const Tabs = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ kind = 'line', orientation = 'horizontal', className, ...props }, ref) => (
    <KindContext.Provider value={{ kind, vertical: orientation === 'vertical' }}>
      <TabsPrimitive.Root
        ref={ref}
        orientation={orientation}
        className={cn('flex gap-[var(--aras-space-md)]', orientation === 'vertical' ? 'flex-row' : 'flex-col', className)}
        {...props}
      />
    </KindContext.Provider>
  ),
);
Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { kind, vertical } = React.useContext(KindContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'flex shrink-0',
        vertical ? 'flex-col' : 'overflow-x-auto',
        kind === 'line' && (vertical ? 'border-l border-border' : 'gap-[var(--aras-space-md)] border-b border-border'),
        kind === 'pill' && 'gap-1 self-start rounded-control bg-surface-sunken p-1',
        className,
      )}
      {...props}
    />
  );
});
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { kind, vertical } = React.useContext(KindContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center gap-[var(--aras-space-xs)] whitespace-nowrap text-small font-medium text-fg-secondary',
        'transition-colors duration-[var(--aras-motion-duration-fast)] motion-reduce:transition-none hover:text-fg',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:text-fg-disabled',
        '[&>svg]:size-4',
        kind === 'line' &&
          (vertical
            ? '-ml-px border-l-2 border-transparent px-[var(--aras-space-md)] py-2 data-[state=active]:border-primary data-[state=active]:text-fg'
            : '-mb-px border-b-2 border-transparent pb-2.5 pt-1 data-[state=active]:border-primary data-[state=active]:text-fg'),
        kind === 'pill' &&
          'rounded-control px-3 py-1.5 data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-card',
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'min-w-0 flex-1 text-body text-fg data-[state=active]:animate-fade-in',
      'rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
