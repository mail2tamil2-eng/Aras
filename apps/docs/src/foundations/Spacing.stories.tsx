import type { Meta, StoryObj } from '@storybook/react-vite';

// Spacing, radius, elevation and control-height tokens. Small space inside a group, larger space between groups.
const space = [
  { token: '2xs', value: '4px', use: 'Icon to text, label to field' },
  { token: 'xs', value: '8px', use: 'Inside compact groups' },
  { token: 'sm', value: '12px', use: 'Between related controls' },
  { token: 'md', value: '16px', use: 'Default padding and gaps' },
  { token: 'lg', value: '24px', use: 'Card padding, between groups' },
  { token: 'xl', value: '32px', use: 'Between sections' },
  { token: '2xl', value: '48px', use: 'Page sections' },
  { token: '3xl', value: '64px', use: 'Hero and marketing sections' },
];

// Full class names, so Tailwind can find them when it scans this file.
const radii = [
  { name: 'control', cls: 'rounded-control' },
  { name: 'card', cls: 'rounded-card' },
  { name: 'overlay', cls: 'rounded-overlay' },
  { name: 'pill', cls: 'rounded-pill' },
];
const shadows = [
  { name: 'card', cls: 'shadow-card' },
  { name: 'dropdown', cls: 'shadow-dropdown' },
  { name: 'toast', cls: 'shadow-toast' },
  { name: 'modal', cls: 'shadow-modal' },
];
const controls = ['sm', 'md', 'lg'];

function Spacing() {
  return (
    <div className="flex flex-col gap-[var(--aras-space-2xl)] text-fg">
      <section className="flex flex-col gap-[var(--aras-space-md)]">
        <h2 className="text-h3">Space</h2>
        <ul className="flex flex-col gap-[var(--aras-space-sm)]">
          {space.map((s) => (
            <li key={s.token} className="grid grid-cols-4 items-center gap-[var(--aras-space-md)] text-small">
              <code className="font-mono text-fg-secondary">--aras-space-{s.token}</code>
              <span className="flex items-center gap-[var(--aras-space-xs)]">
                <span className="h-4 rounded-control bg-primary" style={{ width: `var(--aras-space-${s.token})` }} />
                <span className="text-fg-secondary">{s.value}</span>
              </span>
              <span className="col-span-2 text-fg-secondary">{s.use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-[var(--aras-space-md)]">
        <h2 className="text-h3">Radius</h2>
        <div className="flex flex-wrap gap-[var(--aras-space-lg)]">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-[var(--aras-space-xs)]">
              <div className={`size-20 border-2 border-primary bg-brand-subtle ${r.cls}`} />
              <code className="text-caption text-fg-secondary">{r.cls}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--aras-space-md)]">
        <h2 className="text-h3">Elevation</h2>
        <div className="flex flex-wrap gap-[var(--aras-space-xl)] bg-surface-sunken p-[var(--aras-space-xl)]">
          {shadows.map((sh) => (
            <div key={sh.name} className={`flex size-28 items-center justify-center rounded-card bg-surface ${sh.cls}`}>
              <code className="text-caption text-fg-secondary">{sh.cls}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--aras-space-md)]">
        <h2 className="text-h3">Control heights</h2>
        <p className="text-small text-fg-secondary">Shared by Button, Input, Select and FileField. Compact density makes them smaller.</p>
        <div className="flex flex-wrap items-end gap-[var(--aras-space-md)]">
          {controls.map((c) => (
            <div key={c} className="flex flex-col items-center gap-[var(--aras-space-xs)]">
              <div className="w-24 rounded-control border border-border-strong bg-surface" style={{ height: `var(--aras-control-height-${c})` }} />
              <code className="text-caption text-fg-secondary">{c}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = { title: 'Foundations/Spacing & shape', component: Spacing, parameters: { layout: 'padded' } } satisfies Meta<typeof Spacing>;
export default meta;
export const Tokens: StoryObj<typeof meta> = { name: 'Space, radius, elevation' };
