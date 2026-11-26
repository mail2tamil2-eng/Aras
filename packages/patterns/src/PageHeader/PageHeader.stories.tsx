import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, DownloadIcon, Chip } from '@tamilarasan/aras-ui';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: 'Breadcrumb, the page’s single h1, description, actions and optional facts.' } } },
  args: {
    title: 'Python Basics',
    description: 'Track lessons, learners and certificates for this course.',
    breadcrumbs: [{ label: 'Workspace', href: '#' }, { label: 'Courses', href: '#' }, { label: 'Python Basics' }],
    actions: (
      <>
        <Button variant="secondary" leftIcon={<DownloadIcon />}>
          Export
        </Button>
        <Button>Add lesson</Button>
      </>
    ),
  },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};
export const WithMeta: Story = {
  args: {
    meta: [
      { label: 'Owner', value: 'Tamil Arasan' },
      { label: 'Status', value: <Chip size="sm" intent="success">Published</Chip> },
      { label: 'Last updated', value: '26 Nov 2026' },
    ],
  },
};
export const Large: Story = { args: { size: 'lg', eyebrow: 'Course', breadcrumbs: undefined } };
export const SmallBorderless: Story = { args: { size: 'sm', bordered: false, breadcrumbs: undefined } };
export const TitleAndActionsOnly: Story = { args: { description: undefined, breadcrumbs: undefined } };
export const TamilText: Story = {
  args: { title: 'பைதான் அடிப்படைகள்', description: 'இந்த பாடநெறியின் பாடங்கள், மாணவர்கள் மற்றும் சான்றிதழ்களைக் கண்காணிக்கவும்.', breadcrumbs: undefined },
  decorators: [(Story) => <div lang="ta"><Story /></div>],
};
