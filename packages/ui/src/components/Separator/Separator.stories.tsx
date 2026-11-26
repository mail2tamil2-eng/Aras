import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'A horizontal or vertical rule. Decorative unless `decorative={false}`.' } } },
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3 text-small text-fg">
      <p>Section A</p>
      <Separator />
      <p>Section B</p>
      <Separator size="md" />
      <p>Section C</p>
    </div>
  ),
};
export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3 text-small text-fg">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Changelog</span>
      <Separator orientation="vertical" size="md" />
      <span>Support</span>
    </div>
  ),
};
