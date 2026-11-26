import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverBody, PopoverClose, PopoverContent, PopoverDescription, PopoverFooter, PopoverTitle, PopoverTrigger } from './Popover';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { InfoIcon } from '../../icons/icons';

const meta: Meta<typeof Popover> = {
  title: 'Primitives/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="flex min-h-72 items-start justify-center p-8"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: 'A small floating panel for extra info, quick settings or a short form. Esc and outside click close it.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const TitleAndBody: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open</Button>
      </PopoverTrigger>
      <PopoverContent showClose>
        <PopoverBody>
          <PopoverTitle>Course visibility</PopoverTitle>
          <PopoverDescription>Public courses appear in the catalogue. Private courses need an invite link.</PopoverDescription>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
};
export const Info: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="tertiary" size="icon-sm" aria-label="About completion rate">
          <InfoIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <PopoverDescription>Completion rate counts learners who finished every lesson in the last 30 days.</PopoverDescription>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
};
export const Form: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Rename</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <PopoverBody>
            <PopoverTitle>Rename course</PopoverTitle>
            <Input label="Course name" defaultValue="Python Basics" size="sm" />
          </PopoverBody>
          <PopoverFooter>
            <PopoverClose asChild>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </PopoverClose>
            <Button size="sm" type="submit">
              Save
            </Button>
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  ),
};
