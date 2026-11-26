import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace', size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'Image with initials fallback, optional status and notification count. Status is announced in words, not only as a coloured dot.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {};
export const Image: Story = { args: { src: '/demo/cover-1.svg' } };
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Avatar key={s} {...args} size={s} />
      ))}
    </div>
  ),
};
export const Square: Story = { args: { shape: 'square' } };
export const Status: Story = {
  render: (args) => (
    <div className="flex gap-4">
      {(['online', 'away', 'busy', 'offline'] as const).map((s) => (
        <Avatar key={s} {...args} status={s} size="lg" />
      ))}
    </div>
  ),
};
export const Notifications: Story = { args: { notificationCount: 4, size: 'lg' } };
export const Group: Story = {
  render: () => (
    <AvatarGroup
      people={[{ name: 'Ada Lovelace' }, { name: 'Grace Hopper' }, { name: 'Alan Turing' }, { name: 'Katherine Johnson' }, { name: 'Tamil Arasan' }, { name: 'Linus T' }]}
      max={4}
    />
  ),
};
