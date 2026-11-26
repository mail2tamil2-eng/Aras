import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileField } from './FileField';

const meta: Meta<typeof FileField> = {
  title: 'Primitives/FileField',
  component: FileField,
  tags: ['autodocs'],
  args: { label: 'Attachment', hint: 'PDF or spreadsheet, up to 10 MB.' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: {
    docs: { description: { component: 'A file picker styled like Input. The native file input stays in the page for full accessibility.' } },
  },
};
export default meta;
type Story = StoryObj<typeof FileField>;

export const Default: Story = {};
export const ImagesOnly: Story = { args: { label: 'Course cover', accept: 'image/*', hint: 'PNG or JPG, at least 1280 × 720.' } };
export const Multiple: Story = { args: { multiple: true, label: 'Evidence files' } };
export const WithError: Story = { args: { required: true, error: 'Attach the signed policy to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
