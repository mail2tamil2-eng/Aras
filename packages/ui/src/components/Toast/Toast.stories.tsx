import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Composites/Toast',
  tags: ['autodocs'],
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
  parameters: {
    docs: {
      description: {
        component:
          'Short-lived notifications. Put `<ToastProvider>` at the app root and call `useToast()`. Errors stay until dismissed; others auto-dismiss after ~5s (paused on hover).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

function Demo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => toast({ title: 'Draft saved' })}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Course published', description: 'Learners can enrol now.', intent: 'success' })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'New version available', intent: 'info', action: { label: 'Reload', onClick: () => undefined } })}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: '3 seats left', description: 'Upgrade to add more learners.', intent: 'warning' })}>
        Warning
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Couldn’t publish', description: 'Check your connection and try again.', intent: 'error' })}>
        Error
      </Button>
      <Button
        onClick={() =>
          void toast
            .promise(new Promise((r) => setTimeout(r, 1500)), { loading: 'Exporting report…', success: 'Report ready', error: 'Export failed' })
            .catch(() => undefined)
        }
      >
        Promise
      </Button>
    </div>
  );
}

export const AllIntents: Story = { render: () => <Demo /> };
