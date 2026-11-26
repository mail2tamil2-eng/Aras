import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Primitives/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: 'K' },
  parameters: { docs: { description: { component: 'A keyboard key. Use one Kbd per key, and give symbols a readable `title`.' } } },
};
export default meta;
type Story = StoryObj<typeof Kbd>;

export const Single: Story = {};
export const Combination: Story = {
  render: () => (
    <p className="flex items-center gap-1 text-small text-fg-secondary">
      Search
      <Kbd title="Command">⌘</Kbd>
      <Kbd>K</Kbd>
    </p>
  ),
};
export const Sequence: Story = {
  render: () => (
    <p className="flex items-center gap-1 text-small text-fg-secondary">
      Go to dashboard <Kbd>G</Kbd> then <Kbd>D</Kbd>
    </p>
  ),
};
export const Small: Story = { args: { size: 'sm', children: 'Esc' } };
