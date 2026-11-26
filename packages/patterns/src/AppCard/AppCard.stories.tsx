import type { Meta, StoryObj } from '@storybook/react-vite';
import { BellIcon, Button, SparkleIcon, UploadIcon, CheckCircleIcon } from '@tamilarasan/aras-ui';
import { ActionCard, NotificationCard, PricingCard, ProfileCard, SummaryCard } from './AppCard';
import { EmptyState } from '../EmptyState/EmptyState';

const meta: Meta = {
  title: 'Patterns/AppCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'General-purpose card layouts: ActionCard, ProfileCard, NotificationCard, PricingCard and SummaryCard. Use EmptyState for empty cards.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Action: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <ActionCard icon={<SparkleIcon />} title="Generate a quiz" description="Create questions from any lesson automatically." badge="New" href="#" />
      <ActionCard icon={<UploadIcon />} title="Import learners" description="Upload a CSV to enrol many learners at once." />
      <ActionCard icon={<CheckCircleIcon />} title="Review submissions" description="12 assignments are waiting for a grade." />
    </div>
  ),
};

export const Profile: Story = {
  render: () => (
    <div className="w-64">
      <ProfileCard
        name="Tamil Arasan"
        role="Course instructor"
        status="online"
        primaryAction={{ label: 'Message' }}
        secondaryAction={{ label: 'View profile' }}
      />
    </div>
  ),
};

export const Notification: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <NotificationCard unread actor={{ name: 'Grace Hopper' }} title="Grace finished Python Basics" body="Certificate issued automatically." time="2 min ago" action={{ label: 'View certificate' }} onDismiss={() => undefined} />
      <NotificationCard icon={<BellIcon />} title="Weekly summary is ready" time="Yesterday" onDismiss={() => undefined} />
    </div>
  ),
};

export const Pricing: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-4 md:grid-cols-3">
      <PricingCard
        plan="Starter"
        price="₹0"
        description="For trying things out."
        features={[{ label: '3 courses', included: true }, { label: '50 learners', included: true }, { label: 'Certificates', included: false }]}
        cta={{ label: 'Start free' }}
      />
      <PricingCard
        highlighted
        plan="Pro"
        price="₹999"
        description="For growing academies."
        features={[{ label: 'Unlimited courses', included: true }, { label: '1,000 learners', included: true }, { label: 'Certificates', included: true }]}
        cta={{ label: 'Upgrade to Pro' }}
      />
      <PricingCard
        plan="Team"
        price="₹2,499"
        description="For companies."
        features={[{ label: 'Everything in Pro', included: true }, { label: 'SSO', included: true }, { label: 'Priority support', included: true }]}
        cta={{ label: 'Contact sales' }}
      />
    </div>
  ),
};

export const Summary: Story = {
  render: () => (
    <div className="w-80">
      <SummaryCard
        title="Order summary"
        rows={[
          { label: 'Plan', value: 'Pro (monthly)' },
          { label: 'Seats', value: '25' },
          { label: 'Tax', value: '₹179.82' },
          { label: 'Total', value: '₹1,178.82' },
        ]}
        actions={
          <>
            <Button variant="secondary" size="sm">
              Change plan
            </Button>
            <Button size="sm">Pay now</Button>
          </>
        }
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-96 rounded-card border border-border">
      <EmptyState size="sm" title="No courses yet" description="Create your first course to start enrolling learners." primaryAction={{ label: 'Create course' }} />
    </div>
  ),
};
