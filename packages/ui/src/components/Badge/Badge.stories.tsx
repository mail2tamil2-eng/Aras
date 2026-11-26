import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const intents = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Live', intent: 'success', emphasis: 'soft' },
  parameters: {
    docs: { description: { component: 'Compact pill for counts and status. Use Chip for filter tags, icons or removable labels.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['soft', 'solid', 'outline'] as const).map((e) => (
        <div key={e} className="flex flex-wrap gap-2">
          {intents.map((i) => (
            <Badge key={i} intent={i} emphasis={e}>
              {i}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
export const WithDot: Story = { args: { dot: true } };
export const Count: Story = { args: { children: '3', intent: 'danger', emphasis: 'solid', srLabel: 'unread messages' } };
export const Small: Story = { args: { size: 'sm', children: 'New', intent: 'primary' } };
