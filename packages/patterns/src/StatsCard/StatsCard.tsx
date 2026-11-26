import * as React from 'react';
import { Card, Progress, TrendDownIcon, TrendUpIcon, cn } from '@tamilarasan/aras-ui';

/**
 * StatsCard pattern
 *
 * A KPI tile for dashboards. Layouts:
 * - `simple`: label, value, trend and comparison.
 * - `sparkline`: adds a small trend line (decorative; the numbers carry the meaning).
 * - `ring`: a progress ring with a percentage, e.g. "Controls passing".
 * - `progress`: a score with a bar and sub-stats, e.g. compliance by area.
 *
 * Accessibility: the trend is read as words ("up 20% versus last week"), not only by arrow or
 * colour (1.4.1). Charts are aria-hidden because the same data is in text.
 */
export interface StatsCardProps {
  label: string;
  value: React.ReactNode;
  layout?: 'simple' | 'sparkline' | 'ring' | 'progress';
  /** Percent change, e.g. 20 or -8. */
  change?: number;
  /** Whether "up" is good (revenue) or bad (incidents). Default: up is good. */
  upIsGood?: boolean;
  comparison?: string;
  /** Values for the sparkline. */
  series?: number[];
  /** 0–100, for ring and progress layouts. */
  percent?: number;
  subStats?: { label: string; value: React.ReactNode }[];
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  label,
  value,
  layout = 'simple',
  change,
  upIsGood = true,
  comparison,
  series,
  percent = 0,
  subStats,
  icon,
  className,
}: StatsCardProps) {
  const up = (change ?? 0) >= 0;
  const good = up === upIsGood;

  return (
    <Card className={cn('gap-[var(--aras-space-md)] p-[var(--aras-space-lg)] hover:border-border-strong', className)}>
      <div className="flex items-start justify-between gap-[var(--aras-space-sm)]">
        <div className="flex min-w-0 flex-col gap-[var(--aras-space-2xs)]">
          <p className="flex items-center gap-[var(--aras-space-xs)] text-small font-medium text-fg-secondary">
            {icon && (
              <span className="flex text-fg-secondary [&>svg]:size-4" aria-hidden="true">
                {icon}
              </span>
            )}
            {label}
          </p>
          <p className="text-h2 tabular-nums text-fg">{value}</p>
        </div>
        {layout === 'ring' && <Ring percent={percent} />}
      </div>

      {layout === 'sparkline' && series && series.length > 1 && (
        <Sparkline series={series} className={good ? 'text-success-fg' : 'text-danger-fg'} />
      )}

      {layout === 'progress' && <Progress value={percent} aria-label={`${label}: ${percent}%`} size="lg" showValue={false} />}

      {change != null && (
        <p className="flex flex-wrap items-center gap-[var(--aras-space-xs)] text-small">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-control px-1.5 py-0.5 font-semibold tabular-nums',
              good ? 'bg-success-bg text-success-fg' : 'bg-danger-bg text-danger-fg',
            )}
          >
            {up ? <TrendUpIcon className="size-3.5" /> : <TrendDownIcon className="size-3.5" />}
            <span className="sr-only">{up ? 'Up' : 'Down'} </span>
            {up ? '+' : '−'}
            {Math.abs(change)}%
          </span>
          {comparison && <span className="text-fg-secondary">{comparison}</span>}
        </p>
      )}

      {subStats && subStats.length > 0 && (
        <dl className="flex flex-col">
          {subStats.map((s) => (
            <div key={s.label} className="flex items-center justify-between border-t border-dashed border-border py-2 text-small">
              <dt className="text-fg-secondary">{s.label}</dt>
              <dd className="font-medium tabular-nums text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  );
}

function Sparkline({ series, className }: { series: number[]; className?: string }) {
  const id = React.useId();
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const pts = series.map((v, i) => [(i / (series.length - 1)) * 100, 36 - ((v - min) / range) * 32] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={cn('h-10 w-full', className)} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L100,40 L0,40 Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Ring({ percent }: { percent: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const p = Math.min(100, Math.max(0, percent));
  return (
    <span className="relative flex size-14 shrink-0 items-center justify-center">
      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="28" cy="28" r={r} fill="none" strokeWidth="6" className="stroke-surface-sunken" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (p / 100) * c}
          className="stroke-primary transition-[stroke-dashoffset] duration-[var(--aras-motion-duration-slow)] motion-reduce:transition-none"
        />
      </svg>
      <span className="text-caption font-semibold tabular-nums text-fg">{Math.round(p)}%</span>
    </span>
  );
}
