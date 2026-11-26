import type { Meta, StoryObj } from '@storybook/react-vite';

// The 7-step ARAS type scale. Never use a font size outside this list.
const scale = [
  { cls: 'text-display', label: 'Display', spec: '48 / 56 · Bold', use: 'Marketing hero, big numbers' },
  { cls: 'text-h1', label: 'Heading 1', spec: '36 / 44 · Bold', use: 'Page title (one per page)' },
  { cls: 'text-h2', label: 'Heading 2', spec: '30 / 38 · Semibold', use: 'Section title' },
  { cls: 'text-h3', label: 'Heading 3', spec: '24 / 32 · Semibold', use: 'Card and panel title' },
  { cls: 'text-body', label: 'Body', spec: '16 / 24 · Regular', use: 'Default text' },
  { cls: 'text-small', label: 'Small', spec: '14 / 20 · Regular', use: 'Labels, table cells, hints' },
  { cls: 'text-caption', label: 'Caption', spec: '12 / 16 · Medium', use: 'Meta info, badges' },
];

function TypeScale() {
  return (
    <div className="flex flex-col divide-y divide-border text-fg">
      {scale.map((step) => (
        <div key={step.cls} className="grid grid-cols-4 items-baseline gap-[var(--aras-space-lg)] py-[var(--aras-space-md)]">
          <div className="col-span-1 flex flex-col">
            <code className="text-caption font-mono text-fg-secondary">{step.cls}</code>
            <span className="text-caption text-fg-secondary">{step.spec}</span>
          </div>
          <div className="col-span-3 flex flex-col gap-[var(--aras-space-2xs)]">
            <span className={step.cls}>{step.label}: Learn faster · வேகமாகக் கற்போம்</span>
            <span className="text-small text-fg-secondary">{step.use}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = { title: 'Foundations/Typography', component: TypeScale, parameters: { layout: 'padded' } } satisfies Meta<typeof TypeScale>;
export default meta;
export const TypeScaleStory: StoryObj<typeof meta> = { name: 'Type scale' };
