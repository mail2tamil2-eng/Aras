import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Notes', hint: 'Markdown formatting is supported.' },
  decorators: [(Story) => <div className="w-96 max-w-full"><Story /></div>],
  parameters: { docs: { description: { component: 'Multi-line text field with the same label, hint and error behaviour as Input.' } } },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const WithCount: Story = { args: { maxLength: 200, showCount: true, defaultValue: 'Great course.' } };
export const WithError: Story = { args: { required: true, error: 'Add a short description so learners know what to expect.' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'This note is locked after review.' } };
export const Disabled: Story = { args: { disabled: true } };
export const TamilText: Story = { args: { label: 'குறிப்புகள்', lang: 'ta', defaultValue: 'இந்த பாடநெறி மிகவும் பயனுள்ளதாக இருந்தது.' } };
