import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipProvider } from './Tooltip';
import { Button } from '../Button/Button';
import { InfoIcon, PencilIcon } from '../../icons/icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [(Story) => <TooltipProvider><div className="p-12"><Story /></div></TooltipProvider>],
  parameters: {
    docs: {
      description: {
        component: 'A short hint on hover and keyboard focus. Never put essential information or links in a tooltip.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const ShortHint: Story = {
  render: () => (
    <Tooltip content="Edit course">
      <Button size="icon-md" variant="secondary" aria-label="Edit course">
        <PencilIcon className="size-4" />
      </Button>
    </Tooltip>
  ),
};
export const OpenByDefault: Story = {
  render: () => (
    <Tooltip content="Learners see this name on their certificate." defaultOpen>
      <Button variant="tertiary" leftIcon={<InfoIcon />}>
        Display name
      </Button>
    </Tooltip>
  ),
};
export const Sides: Story = {
  render: () => (
    <div className="flex gap-3">
      {(['top', 'right', 'bottom', 'left'] as const).map((s) => (
        <Tooltip key={s} content={`On the ${s}`} side={s}>
          <Button variant="secondary">{s}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
