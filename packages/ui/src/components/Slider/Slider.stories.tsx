import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { label: 'Volume', defaultValue: [40] },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: {
    docs: { description: { component: 'Pick a value or range on a scale. Label top-left, current value top-right.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Single: Story = {};
export const Range: Story = {
  args: { label: 'Price range', defaultValue: [200, 800], min: 0, max: 1000, step: 50, formatValue: (v: number) => `₹${v}` },
};
export const Stepped: Story = { args: { label: 'Daily goal (minutes)', defaultValue: [30], min: 10, max: 120, step: 10 } };
export const Disabled: Story = { args: { disabled: true } };
