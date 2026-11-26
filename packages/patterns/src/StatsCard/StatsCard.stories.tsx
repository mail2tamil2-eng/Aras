import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserIcon } from '@tamilarasan/aras-ui';
import { StatsCard } from './StatsCard';

const meta: Meta<typeof StatsCard> = {
  title: 'Patterns/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  args: { label: 'Active learners', value: '1,240', change: 20, comparison: '1,033 last week', icon: <UserIcon /> },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
  parameters: {
    docs: { description: { component: 'KPI tile. Trends are read as words, not only as arrows or colour.' } },
  },
};
export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Simple: Story = {};
export const NegativeTrend: Story = { args: { label: 'Focus time', value: '38.2 hr', change: -8, comparison: '42.0 hr last week', icon: undefined } };
export const UpIsBad: Story = { args: { label: 'Open incidents', value: '7', change: 40, upIsGood: false, comparison: '5 last week', icon: undefined } };
export const Sparkline: Story = { args: { layout: 'sparkline', series: [12, 18, 14, 22, 19, 27, 31] } };
export const Ring: Story = { args: { layout: 'ring', label: 'Controls passing', value: '84 / 100', percent: 84, change: undefined, icon: undefined } };
export const ProgressWithSubStats: Story = {
  args: {
    layout: 'progress',
    label: 'Compliance score',
    value: '72%',
    percent: 72,
    change: undefined,
    icon: undefined,
    subStats: [
      { label: 'Passing', value: 72 },
      { label: 'Needs review', value: 18 },
      { label: 'Failing', value: 10 },
    ],
  },
};
