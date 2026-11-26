/**
 * Intent colours shared by Badge, Chip, Alert-style surfaces and status dots.
 * Every pair is a semantic token pair that the token build checks for WCAG contrast.
 */
export type Intent = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type Emphasis = 'soft' | 'solid' | 'outline';

export const intentClasses: Record<Intent, Record<Emphasis, string>> = {
  neutral: {
    soft: 'bg-surface-sunken text-fg-secondary',
    solid: 'bg-fg text-fg-inverse',
    outline: 'border border-border-strong text-fg-secondary',
  },
  primary: {
    soft: 'bg-brand-subtle text-brand',
    solid: 'bg-primary text-on-primary',
    outline: 'border border-primary text-brand',
  },
  success: {
    soft: 'bg-success-bg text-success-fg',
    solid: 'bg-success-fg text-surface',
    outline: 'border border-success-border text-success-fg',
  },
  warning: {
    soft: 'bg-warning-bg text-warning-fg',
    solid: 'bg-warning-fg text-surface',
    outline: 'border border-warning-border text-warning-fg',
  },
  danger: {
    soft: 'bg-danger-bg text-danger-fg',
    solid: 'bg-danger-fg text-surface',
    outline: 'border border-danger-border text-danger-fg',
  },
  info: {
    soft: 'bg-info-bg text-info-fg',
    solid: 'bg-info-fg text-surface',
    outline: 'border border-info-border text-info-fg',
  },
};

/** Solid dot colour for each intent (status pips, badge dots). */
export const intentDotClasses: Record<Intent, string> = {
  neutral: 'bg-fg-secondary',
  primary: 'bg-primary',
  success: 'bg-success-fg',
  warning: 'bg-warning-fg',
  danger: 'bg-danger-fg',
  info: 'bg-info-fg',
};
