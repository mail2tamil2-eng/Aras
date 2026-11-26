import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper, type StepperStep } from './Stepper';

const steps: StepperStep[] = [
  { title: 'Basic info', description: 'Course name and category', status: 'complete' },
  { title: 'Curriculum', description: 'Add lessons and quizzes. You can reorder them later.', status: 'active' },
  { title: 'Pricing', description: 'Free or paid', status: 'pending' },
  { title: 'Review & publish', status: 'pending' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Primitives/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { steps },
  decorators: [(Story) => <div className="w-2xl max-w-full"><Story /></div>],
  parameters: {
    docs: {
      description: { component: 'Progress through a multi-step flow. Status is read out in words, not only shown by colour or icon.' },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const VerticalActiveOnly: Story = {};
export const VerticalAlways: Story = { args: { descriptions: 'always' } };
export const WithProgressHeader: Story = { args: { showProgressHeader: true } };
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const ErrorState: Story = {
  args: {
    steps: [
      { title: 'Basic info', status: 'complete' },
      { title: 'Payment details', description: 'The card was declined. Try another card.', status: 'error' },
      { title: 'Confirm', status: 'pending' },
    ],
  },
};
export const Clickable: Story = { args: { onStepClick: () => undefined } };
