import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingButton } from './LoadingButton';
import { ArrowRightIcon } from '../../icons/icons';

const wait = (ms: number, fail = false) => new Promise<void>((res, rej) => setTimeout(() => (fail ? rej(new Error('fail')) : res()), ms));

let attempts = 0;

const meta: Meta<typeof LoadingButton> = {
  title: 'Primitives/LoadingButton',
  component: LoadingButton,
  tags: ['autodocs'],
  args: { children: 'Submit', loadingLabel: 'Submitting…', successLabel: 'Submitted', onAction: () => wait(1200) },
  parameters: {
    docs: {
      description: {
        component:
          'A Button that runs an async action and shows loading, success and error states. Click the examples to run them.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {};
export const AutoReset: Story = { args: { autoResetMs: 2000, children: 'Save', loadingLabel: 'Saving…', successLabel: 'Saved' } };
export const ErrorThenRetry: Story = {
  args: {
    children: 'Publish course',
    loadingLabel: 'Publishing…',
    successLabel: 'Published',
    errorLabel: 'Couldn’t publish. Try again',
    onAction: () => wait(1000, attempts++ % 2 === 0),
  },
};
export const DestructiveCountdown: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
    countdown: 3,
    loadingLabel: 'Deleting…',
    successLabel: 'Deleted',
  },
};
export const WithIcon: Story = { args: { variant: 'secondary', leftIcon: <ArrowRightIcon />, children: 'Continue' } };
