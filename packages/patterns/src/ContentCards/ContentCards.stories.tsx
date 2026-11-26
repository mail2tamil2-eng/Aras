import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogCard, FeatureCard, FeaturedCard } from './ContentCards';

const meta: Meta = {
  title: 'Patterns/ContentCards',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'FeaturedCard (cover on top), BlogCard (list tile) and FeatureCard (product feature). With `href` the whole card is one link.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const article = {
  title: 'Making every course accessible by default',
  excerpt: 'How ARAS bakes WCAG 2.2 AA into tokens and components, so product teams ship accessible screens without extra work.',
  author: { name: 'Tamil Arasan' },
  date: 'November 26, 2026',
  category: 'Design systems',
  href: '#article',
};

export const Featured: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeaturedCard {...article} imageSrc="/demo/cover-1.svg" imageAlt="" />
    </div>
  ),
};

export const Blog: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <BlogCard {...article} imageSrc="/demo/cover-2.svg" imageAlt="" />
      <BlogCard {...article} title="Designing for Tamil and English together" imageSrc="/demo/cover-3.svg" imageAlt="" />
    </div>
  ),
};

export const Feature: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <FeatureCard title="One core, many brands" excerpt="Switch a product’s brand theme without touching a component." imageSrc="/demo/cover-1.svg" imageAlt="" />
      <FeatureCard title="Accessible by default" excerpt="Contrast is checked in CI for every brand, light and dark." imageSrc="/demo/cover-2.svg" imageAlt="" />
    </div>
  ),
};
