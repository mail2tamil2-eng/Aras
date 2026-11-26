import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTextTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';
import { Button } from '../Button/Button';
import { Kbd } from '../Kbd/Kbd';
import { ChevronDownIcon, DownloadIcon, PencilIcon, TrashIcon, UserIcon } from '../../icons/icons';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Composites/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="flex min-h-80 items-start justify-center p-8"><Story /></div>],
  parameters: {
    docs: { description: { component: 'Actions or options anchored to a trigger. Arrow keys move, Enter selects, Esc closes.' } },
  },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Actions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" rightIcon={<ChevronDownIcon />}>
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<PencilIcon />} shortcut={<Kbd size="sm">E</Kbd>}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem icon={<DownloadIcon />}>Export</DropdownMenuItem>
        <DropdownMenuItem disabled>Archive (no permission)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<TrashIcon />} intent="danger">
          Delete course
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function ColumnsDemo() {
  const [cols, setCols] = React.useState({ Owner: true, Status: true, Updated: false });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" rightIcon={<ChevronDownIcon />}>
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Show columns</DropdownMenuLabel>
        {Object.entries(cols).map(([k, v]) => (
          <DropdownMenuCheckboxItem key={k} checked={v} onCheckedChange={(on) => setCols((c) => ({ ...c, [k]: on }))} onSelect={(e) => e.preventDefault()}>
            {k}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const CheckboxItems: Story = { render: () => <ColumnsDemo /> };

function SortDemo() {
  const [sort, setSort] = React.useState('newest');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" rightIcon={<ChevronDownIcon />}>
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="az">Name A–Z</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const RadioItems: Story = { render: () => <SortDemo /> };

export const Submenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" rightIcon={<ChevronDownIcon />}>
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Copy link</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<UserIcon />}>Invite</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>As learner</DropdownMenuItem>
            <DropdownMenuItem>As instructor</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const TextTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTextTrigger>Products</DropdownMenuTextTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Courses</DropdownMenuItem>
        <DropdownMenuItem>Certificates</DropdownMenuItem>
        <DropdownMenuItem>Analytics</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
