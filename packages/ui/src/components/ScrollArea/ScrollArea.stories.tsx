import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';
import { Separator } from '../Separator/Separator';

const meta: Meta<typeof ScrollArea> = {
  title: 'Primitives/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'A fixed-size region with slim, themed scrollbars. Name it with `aria-label`.' } },
  },
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const VerticalList: Story = {
  render: () => (
    <ScrollArea bordered className="h-72 w-64" aria-label="Audit evidence">
      <div className="p-4">
        <h4 className="mb-3 text-small font-semibold text-fg">Audit evidence</h4>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i}>
            <p className="py-2 text-small text-fg">Evidence item {i + 1}</p>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea bordered horizontal className="h-56 w-80" aria-label="Activity log">
      <div className="w-[200%] p-4 font-mono text-caption text-fg-secondary">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="whitespace-nowrap py-1">
            2026-11-26 10:{String(i).padStart(2, '0')} course.updated id=crs_{1000 + i} actor=tamil field=title value="Python Basics, updated"
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
