import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { BellIcon, InfoIcon, UserIcon } from '../../icons/icons';

const meta: Meta<typeof Tabs> = {
  title: 'Composites/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-xl max-w-full"><Story /></div>],
  parameters: {
    docs: { description: { component: 'Switch between related views. Arrow keys move between tabs. Kinds: `line` and `pill`.' } },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const panels = (
  <>
    <TabsContent value="overview">Summary and key metrics for this course.</TabsContent>
    <TabsContent value="activity">Recent enrolments and completions.</TabsContent>
    <TabsContent value="settings">Visibility, pricing and certificates.</TabsContent>
  </>
);

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Course sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};
export const Pill: Story = {
  render: () => (
    <Tabs kind="pill" defaultValue="overview">
      <TabsList aria-label="Course sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};
export const WithIcons: Story = {
  render: () => (
    <Tabs kind="pill" defaultValue="overview">
      <TabsList aria-label="Account">
        <TabsTrigger value="overview">
          <InfoIcon /> Overview
        </TabsTrigger>
        <TabsTrigger value="activity">
          <BellIcon /> Activity
        </TabsTrigger>
        <TabsTrigger value="settings">
          <UserIcon /> Profile
        </TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};
export const Vertical: Story = {
  render: () => (
    <Tabs orientation="vertical" defaultValue="overview">
      <TabsList aria-label="Settings">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Course sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Settings
        </TabsTrigger>
      </TabsList>
      {panels}
    </Tabs>
  ),
};
