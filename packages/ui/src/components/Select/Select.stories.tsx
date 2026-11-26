import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const regions = [
  { value: 'in', label: 'India' },
  { value: 'eu', label: 'European Union' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Region', placeholder: 'Select a region', options: regions },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
  parameters: {
    docs: { description: { component: 'Native select with ARAS styling: best keyboard, screen reader and mobile support.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Data is stored in this region.' } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { required: true, error: 'Choose a region to continue.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'in' } };
export const Small: Story = { args: { size: 'sm' } };
