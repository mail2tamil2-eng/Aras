import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../lib/cn';

/**
 * Avatar
 *
 * A person or organisation image with an initials fallback, optional status pip and
 * notification count. AvatarGroup stacks avatars with a "+N" overflow.
 *
 * Accessibility:
 * - `name` is the accessible name (image alt text, or the label on the initials).
 * - Status is announced in words ("online"), not just as a coloured dot (1.4.1).
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'size-6 text-caption',
  sm: 'size-8 text-caption',
  md: 'size-10 text-small',
  lg: 'size-12 text-body',
  xl: 'size-16 text-h3',
};

const statusClasses: Record<AvatarStatus, string> = {
  online: 'bg-success-fg',
  away: 'bg-warning-fg',
  busy: 'bg-danger-fg',
  offline: 'bg-fg-secondary',
};

export interface AvatarProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, 'children'> {
  /** Person or organisation name. Used for alt text and initials. */
  name: string;
  src?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  status?: AvatarStatus;
  /** Unread count shown as a small badge. 0 hides it. */
  notificationCount?: number;
  /** Adds a ring so stacked avatars stay separate. */
  ring?: boolean;
}

/** "Ada Lovelace" → "AL", "tamil" → "T". */
export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ name, src, size = 'md', shape = 'circle', status, notificationCount, ring, className, ...props }, ref) => {
    const radius = shape === 'circle' ? 'rounded-pill' : 'rounded-control';
    const hasExtras = status || (notificationCount ?? 0) > 0;
    const avatar = (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-fg font-semibold text-fg-inverse',
          sizeClasses[size],
          radius,
          ring && 'ring-2 ring-surface',
          !hasExtras && className,
        )}
        {...props}
      >
        {src && <AvatarPrimitive.Image src={src} alt={name} className="size-full object-cover" />}
        <AvatarPrimitive.Fallback delayMs={src ? 400 : 0} aria-label={name} role="img">
          <span aria-hidden="true">{getInitials(name)}</span>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );

    if (!hasExtras) return avatar;

    return (
      <span className={cn('relative inline-flex shrink-0', className)}>
        {avatar}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 size-2.5 rounded-pill ring-2 ring-surface',
              size === 'lg' || size === 'xl' ? 'size-3.5' : '',
              statusClasses[status],
            )}
          >
            <span className="sr-only">{status}</span>
          </span>
        )}
        {(notificationCount ?? 0) > 0 && (
          <span className="absolute -right-1.5 -top-1.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-pill bg-danger px-1 text-caption font-semibold text-on-danger ring-2 ring-surface">
            {notificationCount! > 99 ? '99+' : notificationCount}
            <span className="sr-only"> notifications</span>
          </span>
        )}
      </span>
    );
  },
);
Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars shown before "+N". */
  max?: number;
  size?: AvatarSize;
  people: { name: string; src?: string }[];
}

export function AvatarGroup({ people, max = 4, size = 'sm', className, ...props }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div className={cn('flex items-center -space-x-2', className)} {...props}>
      {shown.map((p) => (
        <Avatar key={p.name} name={p.name} src={p.src} size={size} ring />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            'relative inline-flex items-center justify-center rounded-pill bg-surface-sunken font-semibold text-fg ring-2 ring-surface',
            sizeClasses[size],
          )}
          aria-label={`${extra} more`}
          role="img"
        >
          <span aria-hidden="true">+{extra}</span>
        </span>
      )}
    </div>
  );
}
