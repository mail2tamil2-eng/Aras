import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Loading placeholders shaped like the real content. Set aria-busy on the loading region.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2" aria-busy="true">
      <Skeleton shape="text" className="w-1/2" />
      <Skeleton shape="text" />
      <Skeleton shape="text" className="w-4/5" />
    </div>
  ),
};
export const Card: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4 rounded-card border border-border p-6" aria-busy="true">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="size-10" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton shape="text" className="w-1/2" />
          <Skeleton shape="text" className="w-1/3" />
        </div>
      </div>
      <Skeleton className="h-24" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  ),
};
export const Form: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4" aria-busy="true">
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <Skeleton shape="text" className="h-3 w-24" />
          <Skeleton className="h-10" />
        </div>
      ))}
    </div>
  ),
};
