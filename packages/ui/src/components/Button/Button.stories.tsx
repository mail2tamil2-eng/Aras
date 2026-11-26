import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Use **one primary button per view**. Secondary for other actions, tertiary for low-emphasis actions, danger only for destructive actions. Icon-only buttons need an `aria-label`.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancel' } };
export const Tertiary: Story = { args: { variant: 'tertiary', children: 'Learn more' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Delete course' } };
export const Loading: Story = { args: { loading: true, children: 'Saving' } };
export const Disabled: Story = { args: { disabled: true } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-[var(--aras-space-md)]">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const Hierarchy: Story = {
  name: 'Hierarchy (one primary per view)',
  render: () => (
    <div className="flex items-center gap-[var(--aras-space-sm)]">
      <Button variant="tertiary">Preview</Button>
      <Button variant="secondary">Save draft</Button>
      <Button variant="primary">Publish course</Button>
    </div>
  ),
};

export const AsLink: Story = {
  name: 'As a link (asChild)',
  render: (args) => (
    <Button {...args} asChild>
      <a href="#start">Start learning</a>
    </Button>
  ),
};
