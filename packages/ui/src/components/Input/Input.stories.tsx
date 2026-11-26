import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email address', placeholder: 'name@company.com', type: 'email' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Every input has a visible label. Errors say what is wrong **and** how to fix it, with an icon so colour is not the only signal.',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'We will send the course invite here.' } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = {
  args: { defaultValue: 'tamil@', error: 'Enter a full email address, for example name@company.com.' },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: 'admin@aras.dev' } };
export const Compact: Story = { args: { size: 'sm', label: 'Search courses', hideLabel: true, placeholder: 'Search courses', type: 'search' } };
