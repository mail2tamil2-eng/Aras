import type { Meta, StoryObj } from '@storybook/react-vite';
import { icons } from '@tamilarasan/aras-ui';

// The ARAS icon set: 24px grid, 2px stroke, round caps. Icons inherit currentColor and default to 1em.
function IconGrid() {
  return (
    <div className="flex flex-col gap-[var(--aras-space-lg)] text-fg">
      <p className="max-w-2xl text-body text-fg-secondary">
        Import icons by name, e.g. <code className="font-mono text-small">{'import { CheckIcon } from \'@tamilarasan/aras-ui\''}</code>.
        They are decorative by default (<code className="font-mono text-small">aria-hidden</code>). Pass <code className="font-mono text-small">title</code>{' '}
        when an icon is the only thing that explains something, and give icon-only buttons an <code className="font-mono text-small">aria-label</code>.
      </p>
      <ul className="grid grid-cols-2 gap-[var(--aras-space-sm)] sm:grid-cols-4 lg:grid-cols-6">
        {Object.entries(icons).map(([name, Icon]) => (
          <li key={name} className="flex flex-col items-center gap-[var(--aras-space-xs)] rounded-card border border-border p-[var(--aras-space-md)]">
            <Icon className="size-6" />
            <code className="text-caption text-fg-secondary">{name}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta = { title: 'Foundations/Icons', component: IconGrid, parameters: { layout: 'padded' } } satisfies Meta<typeof IconGrid>;
export default meta;
export const AllIcons: StoryObj<typeof meta> = { name: 'Icon set' };
