import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { label: 'Storage used', value: 62 },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: { docs: { description: { component: 'Shows how far a task has got. Leave `value` empty for an indeterminate bar.' } } },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Percent: Story = {};
export const Fraction: Story = { args: { label: 'Lessons completed', value: 7, max: 12, showValue: 'fraction' } };
export const Success: Story = { args: { label: 'Profile complete', value: 100, intent: 'success' } };
export const Warning: Story = { args: { label: 'Seats used', value: 92, intent: 'warning' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress aria-label="Small" value={40} size="sm" showValue={false} />
      <Progress aria-label="Medium" value={55} size="md" showValue={false} />
      <Progress aria-label="Large" value={70} size="lg" showValue={false} />
    </div>
  ),
};
export const Indeterminate: Story = { args: { label: 'Preparing export', value: undefined } };
