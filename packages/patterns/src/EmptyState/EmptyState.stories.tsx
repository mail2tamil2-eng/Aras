import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const BookIcon = (
  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
  </svg>
);

const meta = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoCoursesYet: Story = {
  name: 'LMS: no courses yet',
  args: {
    icon: BookIcon,
    title: 'No courses yet',
    description: 'Create your first course. Learners you invite will see it on their dashboard.',
    primaryAction: { label: 'Create course' },
    secondaryAction: { label: 'Import from file' },
  },
};

export const NoSearchResults: Story = {
  name: 'Search: no results',
  args: {
    title: 'No results for "pyhton"',
    description: 'Check the spelling or try a shorter search.',
    secondaryAction: { label: 'Clear search' },
  },
};

export const NoMealPlan: Story = {
  name: 'Food: no meal plan',
  parameters: { brand: 'food' },
  args: {
    title: 'What should we cook today?',
    description: 'Take a photo of your fridge and get South Indian meal ideas in seconds.',
    primaryAction: { label: 'Take a photo' },
  },
};
