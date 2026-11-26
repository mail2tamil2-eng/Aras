import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Composites/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: 'The bordered surface ARAS card patterns are built on. Hover tints the border; no shadow lift.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Python Basics</CardTitle>
        <CardDescription>12 lessons · 4 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-small text-fg-secondary">Learn variables, loops and functions with hands-on exercises.</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="secondary" size="sm">
          Preview
        </Button>
        <Button size="sm">Enrol</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card asChild interactive>
      <a href="#course">
        <CardHeader>
          <CardTitle>Data Visualisation</CardTitle>
          <CardDescription>The whole card is one link.</CardDescription>
        </CardHeader>
        <CardContent />
      </a>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <div className="bg-surface-sunken p-6">
      <Card elevated>
        <CardHeader>
          <CardTitle>On a sunken page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-small text-fg-secondary">Use `elevated` when cards sit on a sunken background.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
