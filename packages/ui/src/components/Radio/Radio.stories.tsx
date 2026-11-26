import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioGroupItem } from './Radio';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  args: { label: 'Plan', defaultValue: 'standard' },
  parameters: {
    docs: { description: { component: 'One choice from 2–6 visible options. Arrow keys move between options.' } },
  },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="standard" label="Standard" />
      <RadioGroupItem value="pro" label="Pro" />
    </RadioGroup>
  ),
};
export const WithDescriptions: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="standard" label="Standard" description="Up to 50 learners." />
      <RadioGroupItem value="pro" label="Pro" description="Unlimited learners and reports." meta={<Badge intent="primary" size="sm">Popular</Badge>} />
    </RadioGroup>
  ),
};
export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} orientation="horizontal">
      <RadioGroupItem value="standard" label="Standard" />
      <RadioGroupItem value="pro" label="Pro" />
      <RadioGroupItem value="team" label="Team" />
    </RadioGroup>
  ),
};
export const Cards: Story = {
  render: (args) => (
    <RadioGroup {...args} className="w-80">
      <RadioGroupItem card value="standard" label="Standard" description="₹499 per month" />
      <RadioGroupItem card value="pro" label="Pro" description="₹999 per month" />
    </RadioGroup>
  ),
};
export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="standard" label="Standard" />
      <RadioGroupItem value="pro" label="Pro (not available in your region)" disabled />
    </RadioGroup>
  ),
};
export const Small: Story = {
  render: (args) => (
    <RadioGroup {...args} size="sm">
      <RadioGroupItem value="standard" label="Standard" />
      <RadioGroupItem value="pro" label="Pro" />
    </RadioGroup>
  ),
};
