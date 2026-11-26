import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './Sheet';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { SwitchField } from '../Switch/Switch';

const meta: Meta<typeof Sheet> = {
  title: 'Composites/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'A panel that slides in from an edge, keeping the page’s context visible. Same accessibility as Modal.' },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Sheet>;

function Demo({ side }: { side: 'right' | 'left' | 'top' | 'bottom' }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open {side}</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit workspace</SheetTitle>
          <SheetDescription>Changes apply to everyone in this workspace.</SheetDescription>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-4">
          <Input label="Workspace name" defaultValue="ARAS Academy" />
          <SwitchField label="Allow self-enrolment" defaultChecked />
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const Right: Story = { render: () => <Demo side="right" /> };
export const Left: Story = { render: () => <Demo side="left" /> };
export const Bottom: Story = { render: () => <Demo side="bottom" /> };
export const Top: Story = { render: () => <Demo side="top" /> };
