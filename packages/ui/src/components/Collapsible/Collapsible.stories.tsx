import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  args: {
    title: 'Advanced options',
    children: 'Set a custom slug, change visibility and choose who can enrol.',
    variant: 'plain',
  },
  decorators: [(Story) => <div className="w-md max-w-full"><Story /></div>],
  parameters: { docs: { description: { component: 'One section that shows and hides extra content. Use Accordion for several sections.' } } },
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Plain: Story = {};
export const Outlined: Story = { args: { variant: 'outlined', defaultOpen: true } };
export const Card: Story = { args: { variant: 'card' } };
export const Small: Story = { args: { size: 'sm', variant: 'outlined' } };
