import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, SwitchField } from './Switch';

const meta: Meta<typeof SwitchField> = {
  title: 'Primitives/Switch',
  component: SwitchField,
  tags: ['autodocs'],
  args: { label: 'Email notifications', description: 'Get an email when a learner finishes a course.' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: {
    docs: { description: { component: 'On/off settings that apply immediately. Use Checkbox in forms submitted with a button.' } },
  },
};
export default meta;
type Story = StoryObj<typeof SwitchField>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const Card: Story = { args: { card: true } };
export const Group: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-2 text-small font-medium text-fg">Notifications</legend>
      <SwitchField label="Course completed" defaultChecked />
      <SwitchField label="New enrolment" />
      <SwitchField label="Weekly summary" defaultChecked />
    </fieldset>
  ),
};
export const BareControl: Story = { render: () => <Switch aria-label="Dark mode" /> };
