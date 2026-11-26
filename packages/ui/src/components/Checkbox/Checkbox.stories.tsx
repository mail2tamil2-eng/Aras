import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxField } from './Checkbox';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof CheckboxField> = {
  title: 'Primitives/Checkbox',
  component: CheckboxField,
  tags: ['autodocs'],
  args: { label: 'I agree to the terms of service' },
  parameters: {
    docs: {
      description: {
        component:
          'Choose zero or more options. Use `CheckboxField` for a visible label and description; use Switch for settings that apply immediately.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = {
  args: { label: 'Email me product updates', description: 'About one email a month. Unsubscribe any time.' },
};
export const WithBadge: Story = { args: { label: 'Weekly digest', meta: <Badge intent="primary" size="sm">New</Badge> } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const Card: Story = {
  args: { card: true, label: 'Certificate of completion', description: 'Learners get a PDF certificate when they finish.' },
};
function GroupDemo() {
  const options = ['Email', 'SMS', 'Push'];
  const [on, setOn] = React.useState<string[]>(['Email']);
  const all = on.length === options.length ? true : on.length === 0 ? false : 'indeterminate';
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-small font-medium text-fg">Notification channels</legend>
      <CheckboxField label="All channels" checked={all} onCheckedChange={(v) => setOn(v === true ? options : [])} />
      <div className="flex flex-col gap-3 pl-8">
        {options.map((o) => (
          <CheckboxField
            key={o}
            label={o}
            checked={on.includes(o)}
            onCheckedChange={(v) => setOn((prev) => (v ? [...prev, o] : prev.filter((x) => x !== o)))}
          />
        ))}
      </div>
    </fieldset>
  );
}
export const GroupWithIndeterminate: Story = { render: () => <GroupDemo /> };
export const BareControl: Story = { render: () => <Checkbox aria-label="Select row" /> };
export const TamilText: Story = { args: { label: 'விதிமுறைகளை ஏற்கிறேன்', lang: 'ta' } };
