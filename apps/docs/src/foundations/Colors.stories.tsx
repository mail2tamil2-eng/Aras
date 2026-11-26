import type { Meta, StoryObj } from '@storybook/react-vite';

// Semantic colour tokens. Switch Theme and Brand in the toolbar to see them change.
const groups: { title: string; tokens: { name: string; use: string }[] }[] = [
  {
    title: 'Surfaces',
    tokens: [
      { name: 'color-bg-canvas', use: 'Page background' },
      { name: 'color-bg-surface', use: 'Cards, inputs, panels' },
      { name: 'color-bg-surface-raised', use: 'Menus, popovers, modals' },
      { name: 'color-bg-surface-sunken', use: 'Table headers, wells' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'color-text-primary', use: 'Headings, body' },
      { name: 'color-text-secondary', use: 'Labels, supporting text' },
      { name: 'color-text-link', use: 'Links' },
    ],
  },
  {
    title: 'Actions',
    tokens: [
      { name: 'color-action-primary-bg', use: 'Primary button' },
      { name: 'color-action-secondary-border', use: 'Secondary button border' },
      { name: 'color-action-danger-bg', use: 'Destructive button' },
      { name: 'color-border-focus', use: 'Focus ring' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: 'color-status-success-fg', use: 'Success text and icons' },
      { name: 'color-status-warning-fg', use: 'Warning text and icons' },
      { name: 'color-status-danger-fg', use: 'Error text and icons' },
      { name: 'color-status-info-fg', use: 'Info text and icons' },
    ],
  },
];

function Palette() {
  return (
    <div className="flex flex-col gap-[var(--aras-space-lg)] text-fg">
      {groups.map((group) => (
        <section key={group.title} className="flex flex-col gap-[var(--aras-space-sm)]">
          <h2 className="text-h3">{group.title}</h2>
          <ul className="grid grid-cols-2 gap-[var(--aras-space-sm)] md:grid-cols-4">
            {group.tokens.map((token) => (
              <li key={token.name} className="overflow-hidden rounded-card border border-border bg-surface">
                <div className="h-16 border-b border-border" style={{ background: `var(--aras-${token.name})` }} />
                <div className="flex flex-col gap-[var(--aras-space-2xs)] p-[var(--aras-space-sm)]">
                  <code className="text-caption font-mono">--aras-{token.name}</code>
                  <span className="text-small text-fg-secondary">{token.use}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const meta = { title: 'Foundations/Colors', component: Palette, parameters: { layout: 'padded' } } satisfies Meta<typeof Palette>;
export default meta;
export const SemanticColors: StoryObj<typeof meta> = {};
