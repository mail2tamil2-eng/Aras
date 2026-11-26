import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { size: 'md', label: 'Loading results' },
  parameters: {
    docs: { description: { component: 'Inline loading indicator. Pass `label` when there is no visible loading text.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Labelled: Story = {};
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-fg">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
export const WithText: Story = {
  render: () => (
    <p className="flex items-center gap-2 text-small text-fg-secondary" role="status">
      <Spinner size="sm" />
      Saving changes…
    </p>
  ),
};
