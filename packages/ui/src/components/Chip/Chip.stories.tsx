import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import { CheckCircleIcon } from '../../icons/icons';

const intents = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

const meta: Meta<typeof Chip> = {
  title: 'Primitives/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'In review', intent: 'warning' },
  parameters: {
    docs: { description: { component: 'Small label for status, metadata and filter tags, with an optional icon and remove button.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const WithIcon: Story = { args: { intent: 'success', icon: <CheckCircleIcon className="size-3.5" />, children: 'Passing' } };
export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['soft', 'solid', 'outline'] as const).map((e) => (
        <div key={e} className="flex flex-wrap gap-2">
          {intents.map((i) => (
            <Chip key={i} intent={i} emphasis={e}>
              {i}
            </Chip>
          ))}
        </div>
      ))}
    </div>
  ),
};
function RemovableDemo() {
  const [tags, setTags] = React.useState(['Design', 'Accessibility', 'Tokens']);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Chip key={t} intent="primary" onRemove={() => setTags((x) => x.filter((y) => y !== t))}>
          {t}
        </Chip>
      ))}
    </div>
  );
}
export const Removable: Story = { render: () => <RemovableDemo /> };
export const LongText: Story = {
  render: () => (
    <div className="w-48">
      <Chip>A very long label that should truncate instead of breaking the layout</Chip>
    </div>
  ),
};
export const TamilText: Story = { args: { children: 'மதிப்பாய்வில்', lang: 'ta' } };
