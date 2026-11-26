import * as React from 'react';
import {
  ArrowRightIcon,
  Avatar,
  Badge,
  Button,
  Card,
  CheckIcon,
  XIcon,
  cn,
  type AvatarStatus,
} from '@tamilarasan/aras-ui';

/**
 * App cards: general-purpose card layouts for product UIs.
 *
 * - ActionCard: a feature shortcut (icon, title, description, optional badge, arrow). Whole card is one link/button.
 * - ProfileCard: avatar, name, role, status and up to two actions.
 * - NotificationCard: unread dot, icon or avatar, title, body, time, optional action and dismiss.
 * - PricingCard: plan, price, feature list (included / not included) and a call to action.
 * - SummaryCard: key–value rows with dividers and actions.
 *
 * All cards are flat and bordered; hover tints the border. Use EmptyState for empty cards.
 */

/* ---------- ActionCard ---------- */
export interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({ title, description, icon, badge, href, onClick, className }: ActionCardProps) {
  const inner = (
    <>
      {icon && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-brand-subtle text-brand [&>svg]:size-5" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-[var(--aras-space-2xs)]">
        <span className="flex flex-wrap items-center gap-[var(--aras-space-xs)] text-body font-semibold text-fg">
          {title}
          {badge && (
            <Badge intent="primary" size="sm">
              {badge}
            </Badge>
          )}
        </span>
        {description && <span className="text-small text-fg-secondary">{description}</span>}
      </span>
      <ArrowRightIcon className="mt-1 size-4 shrink-0 text-fg-secondary transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </>
  );
  const classes = cn('group flex-row items-start gap-[var(--aras-space-md)] p-[var(--aras-space-lg)] text-left', className);
  if (href) {
    return (
      <Card asChild interactive className={classes}>
        <a href={href}>{inner}</a>
      </Card>
    );
  }
  return (
    <Card asChild interactive className={classes}>
      <button type="button" onClick={onClick}>
        {inner}
      </button>
    </Card>
  );
}

/* ---------- ProfileCard ---------- */
export interface ProfileCardProps {
  name: string;
  role?: string;
  avatarSrc?: string;
  status?: AvatarStatus;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  className?: string;
}

export function ProfileCard({ name, role, avatarSrc, status, primaryAction, secondaryAction, className }: ProfileCardProps) {
  return (
    <Card className={cn('items-center gap-[var(--aras-space-md)] p-[var(--aras-space-lg)] text-center hover:border-border-strong', className)}>
      <Avatar name={name} src={avatarSrc} size="xl" status={status} />
      <div className="flex flex-col gap-0.5">
        <h3 className="text-body font-semibold text-fg">{name}</h3>
        {role && <p className="text-small text-fg-secondary">{role}</p>}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex w-full gap-[var(--aras-space-xs)] *:flex-1">
          {secondaryAction && (
            <Button variant="secondary" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button size="sm" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

/* ---------- NotificationCard ---------- */
export interface NotificationCardProps {
  title: string;
  body?: string;
  time: string;
  unread?: boolean;
  icon?: React.ReactNode;
  /** Shows the person's avatar instead of an icon. */
  actor?: { name: string; src?: string };
  action?: { label: string; onClick?: () => void };
  onDismiss?: () => void;
  className?: string;
}

export function NotificationCard({ title, body, time, unread, icon, actor, action, onDismiss, className }: NotificationCardProps) {
  return (
    <Card className={cn('relative flex-row gap-[var(--aras-space-sm)] p-[var(--aras-space-md)] hover:border-border-strong', unread && 'bg-brand-subtle/40', className)}>
      {unread && (
        <span className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-pill bg-primary">
          <span className="sr-only">Unread</span>
        </span>
      )}
      {actor ? (
        <Avatar name={actor.name} src={actor.src} size="sm" />
      ) : (
        icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-surface-sunken text-fg-secondary [&>svg]:size-4" aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pr-6">
        <p className="text-small font-semibold text-fg">{title}</p>
        {body && <p className="text-small text-fg-secondary">{body}</p>}
        <div className="mt-1 flex items-center gap-[var(--aras-space-sm)]">
          <time className="text-caption text-fg-secondary">{time}</time>
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="rounded-control text-caption font-semibold text-link hover:underline focus-visible:outline-2 focus-visible:outline-focus"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`Dismiss: ${title}`}
          className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-control text-fg-secondary hover:bg-surface-sunken hover:text-fg focus-visible:outline-2 focus-visible:outline-focus"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </Card>
  );
}

/* ---------- PricingCard ---------- */
export interface PricingCardProps {
  plan: string;
  price: string;
  period?: string;
  description?: string;
  features: { label: string; included: boolean }[];
  cta: { label: string; onClick?: () => void; href?: string };
  /** Recommended plan: highlighted border and badge. Use on one card only. */
  highlighted?: boolean;
  highlightLabel?: string;
  className?: string;
}

export function PricingCard({
  plan,
  price,
  period = '/month',
  description,
  features,
  cta,
  highlighted,
  highlightLabel = 'Most popular',
  className,
}: PricingCardProps) {
  return (
    <Card className={cn('gap-[var(--aras-space-lg)] p-[var(--aras-space-lg)]', highlighted && 'border-2 border-primary', className)}>
      <div className="flex flex-col gap-[var(--aras-space-xs)]">
        <div className="flex items-center justify-between gap-[var(--aras-space-sm)]">
          <h3 className="text-body font-semibold text-fg">{plan}</h3>
          {highlighted && (
            <Badge intent="primary" emphasis="solid">
              {highlightLabel}
            </Badge>
          )}
        </div>
        <p className="flex items-baseline gap-1">
          <span className="text-h1 tabular-nums text-fg">{price}</span>
          {period && <span className="text-small text-fg-secondary">{period}</span>}
        </p>
        {description && <p className="text-small text-fg-secondary">{description}</p>}
      </div>
      <ul className="flex flex-1 flex-col gap-[var(--aras-space-xs)]">
        {features.map((f) => (
          <li key={f.label} className={cn('flex items-start gap-[var(--aras-space-xs)] text-small', f.included ? 'text-fg' : 'text-fg-secondary')}>
            {f.included ? <CheckIcon className="mt-0.5 size-4 text-success-fg" /> : <XIcon className="mt-0.5 size-4 text-fg-secondary" />}
            <span>
              <span className="sr-only">{f.included ? 'Included: ' : 'Not included: '}</span>
              {f.label}
            </span>
          </li>
        ))}
      </ul>
      {cta.href ? (
        <Button asChild variant={highlighted ? 'primary' : 'secondary'} fullWidth>
          <a href={cta.href}>{cta.label}</a>
        </Button>
      ) : (
        <Button variant={highlighted ? 'primary' : 'secondary'} fullWidth onClick={cta.onClick}>
          {cta.label}
        </Button>
      )}
    </Card>
  );
}

/* ---------- SummaryCard ---------- */
export interface SummaryCardProps {
  title: string;
  rows: { label: string; value: React.ReactNode }[];
  actions?: React.ReactNode;
  className?: string;
}

export function SummaryCard({ title, rows, actions, className }: SummaryCardProps) {
  return (
    <Card className={cn('hover:border-border-strong', className)}>
      <h3 className="px-[var(--aras-space-lg)] pt-[var(--aras-space-lg)] text-body font-semibold text-fg">{title}</h3>
      <dl className="flex flex-col px-[var(--aras-space-lg)] py-[var(--aras-space-sm)]">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-[var(--aras-space-md)] border-b border-border py-2.5 text-small last:border-0">
            <dt className="text-fg-secondary">{r.label}</dt>
            <dd className="text-right font-medium text-fg">{r.value}</dd>
          </div>
        ))}
      </dl>
      {actions && (
        <div className="flex justify-end gap-[var(--aras-space-xs)] border-t border-border px-[var(--aras-space-lg)] py-[var(--aras-space-md)]">{actions}</div>
      )}
    </Card>
  );
}
