import * as React from 'react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  CalendarIcon,
  Card,
  Chip,
  DownloadIcon,
  FileIcon,
  Progress,
  cn,
  type Intent,
} from '@tamilarasan/aras-ui';

/**
 * ComplianceCard pattern
 *
 * One card shell for governance, risk and compliance records. `kind` picks what is emphasised:
 * - `risk`: severity, score out of 10, owner, due date.
 * - `control`: control ID, pass/fail status, framework, last tested.
 * - `policy`: version, status, owner, effective and review dates.
 * - `finding`: priority + status, finding ID, assignees, due date.
 * - `evidence`: file type, uploader, view and download actions.
 * - `framework`: status, progress bar, next and last audit.
 *
 * Accessibility: every status is a text label (never colour only); the score is read as "8.5 out of 10";
 * clickable cards are a single link with a visible focus ring.
 */
export type ComplianceCardKind = 'risk' | 'control' | 'policy' | 'finding' | 'evidence' | 'framework';

export interface ComplianceCardProps {
  kind: ComplianceCardKind;
  title: string;
  description?: string;
  /** Mono identifier, e.g. "AC-2" or "FND-104". */
  code?: string;
  /** Main status chip, e.g. { label: 'Passing', intent: 'success' }. */
  status?: { label: string; intent: Intent };
  /** Second chip: severity (risk) or priority (finding). */
  level?: { label: string; intent: Intent };
  /** Category or framework tag, e.g. "SOC 2". */
  tag?: string;
  /** 0–10 risk score. */
  score?: number;
  /** 0–100, for frameworks. */
  progress?: number;
  owner?: { name: string; src?: string };
  assignees?: { name: string; src?: string }[];
  /** Labelled dates or facts in the footer, e.g. [{ label: 'Due', value: 'Dec 15' }]. */
  facts?: { label: string; value: string }[];
  /** Evidence file type label, e.g. "PDF". */
  fileType?: string;
  onView?: () => void;
  onDownload?: () => void;
  href?: string;
  className?: string;
}

export function ComplianceCard({
  kind,
  title,
  description,
  code,
  status,
  level,
  tag,
  score,
  progress,
  owner,
  assignees,
  facts,
  fileType,
  onView,
  onDownload,
  href,
  className,
}: ComplianceCardProps) {
  const titleEl = href ? (
    <a
      href={href}
      className="rounded-control after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
    >
      {title}
    </a>
  ) : (
    title
  );

  return (
    <Card className={cn('relative gap-[var(--aras-space-md)] p-[var(--aras-space-lg)] hover:border-border-strong', className)}>
      <div className="flex flex-wrap items-center gap-[var(--aras-space-xs)]">
        {kind === 'evidence' && (
          <span className="flex size-10 items-center justify-center rounded-control bg-info-bg text-info-fg" aria-hidden="true">
            <FileIcon className="size-5" />
          </span>
        )}
        {level && (
          <Chip size="sm" intent={level.intent}>
            {level.label}
          </Chip>
        )}
        {status && (
          <Chip size="sm" intent={status.intent}>
            {status.label}
          </Chip>
        )}
        {tag && (
          <Badge intent="neutral" emphasis="outline">
            {tag}
          </Badge>
        )}
        {code && <span className="ml-auto font-mono text-caption text-fg-secondary">{code}</span>}
        {kind === 'evidence' && fileType && <span className="ml-auto font-mono text-caption text-fg-secondary">{fileType}</span>}
      </div>

      <div className="flex items-start justify-between gap-[var(--aras-space-md)]">
        <div className="flex min-w-0 flex-col gap-[var(--aras-space-2xs)]">
          <h3 className="text-body font-semibold text-fg">{titleEl}</h3>
          {description && <p className="text-small text-fg-secondary">{description}</p>}
        </div>
        {kind === 'risk' && score != null && (
          <p className="shrink-0 text-right">
            <span className="text-h3 tabular-nums text-fg">{score.toFixed(1)}</span>
            <span className="text-small text-fg-secondary">
              <span aria-hidden="true">/10</span>
              <span className="sr-only"> out of 10</span>
            </span>
          </p>
        )}
      </div>

      {kind === 'framework' && progress != null && <Progress label="Readiness" value={progress} size="md" />}

      <div className="mt-auto flex flex-wrap items-center gap-x-[var(--aras-space-md)] gap-y-[var(--aras-space-xs)] border-t border-border pt-[var(--aras-space-md)] text-small text-fg-secondary">
        {owner && (
          <span className="flex items-center gap-[var(--aras-space-xs)]">
            <Avatar name={owner.name} src={owner.src} size="xs" />
            <span className="text-fg">{owner.name}</span>
          </span>
        )}
        {assignees && assignees.length > 0 && <AvatarGroup people={assignees} size="xs" max={3} />}
        {facts?.map((f) => (
          <span key={f.label} className="flex items-center gap-1">
            <CalendarIcon className="size-3.5" />
            <span>
              {f.label}: <span className="text-fg">{f.value}</span>
            </span>
          </span>
        ))}
        {kind === 'evidence' && (onView || onDownload) && (
          <span className="relative z-10 ml-auto flex gap-1">
            {onView && (
              <Button variant="tertiary" size="sm" onClick={onView}>
                View
              </Button>
            )}
            {onDownload && (
              <Button variant="tertiary" size="icon-sm" aria-label={`Download ${title}`} onClick={onDownload}>
                <DownloadIcon className="size-4" />
              </Button>
            )}
          </span>
        )}
      </div>
    </Card>
  );
}
