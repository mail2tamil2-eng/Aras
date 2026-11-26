import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from './VisuallyHidden';
import { Button } from '../Button/Button';
import { TrashIcon } from '../../icons/icons';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Primitives/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text for screen readers only. Prefer visible text; never hide a required field label this way.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const ButtonContext: Story = {
  render: () => (
    <Button variant="secondary">
      Save draft
      <VisuallyHidden> — unsaved changes</VisuallyHidden>
    </Button>
  ),
};
export const IconButton: Story = {
  render: () => (
    <Button variant="tertiary" size="icon-md">
      <TrashIcon className="size-4" />
      <VisuallyHidden>Delete course</VisuallyHidden>
    </Button>
  ),
};
export const StatContext: Story = {
  render: () => (
    <p className="text-h2 text-fg">
      42<VisuallyHidden> active learners this week</VisuallyHidden>
    </p>
  ),
};
