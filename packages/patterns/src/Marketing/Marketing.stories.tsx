import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@tamilarasan/aras-ui';
import { AnnouncementBar } from './AnnouncementBar';
import { CtaBanner } from './CtaBanner';
import { FaqSection } from './FaqSection';
import { LogoStrip } from './LogoStrip';
import { AppBar, SiteNavbar } from './Navbar';
import { SiteFooter } from './SiteFooter';
import { TestimonialCard } from './TestimonialCard';

const meta: Meta = {
  title: 'Marketing/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Patterns for marketing sites. Each one is also shown on its own below.' } },
  },
};
export default meta;
type Story = StoryObj;

const Logo = () => (
  <a href="#home" className="rounded-control text-h3 text-fg focus-visible:outline-2 focus-visible:outline-focus">
    ARAS
  </a>
);

const navItems = [
  {
    label: 'Products',
    items: [
      { label: 'Courses', href: '#courses', description: 'Build and sell courses' },
      { label: 'Certificates', href: '#certificates', description: 'Issue verifiable certificates' },
    ],
  },
  { label: 'Pricing', href: '#pricing' },
  {
    label: 'Resources',
    items: [
      { label: 'Blog', href: '#blog' },
      { label: 'Guides', href: '#guides' },
    ],
  },
  { label: 'Company', items: [{ label: 'About', href: '#about' }, { label: 'Careers', href: '#careers' }] },
];

const logos = ['northwind', 'globex', 'initech', 'umbrella', 'hooli', 'vandelay'].map((n) => ({
  src: `/demo/logo-${n}.svg`,
  alt: n[0]!.toUpperCase() + n.slice(1),
}));

const faq = [
  { question: 'What is ARAS?', answer: 'One design system for every product: tokens, accessible components and patterns.' },
  { question: 'Does it support dark mode?', answer: 'Yes. Every brand has light and dark themes, checked for WCAG contrast in CI.' },
  { question: 'Can I use my own brand colours?', answer: 'Add a brand theme file. Components pick it up without code changes.' },
];

export const AnnouncementBars: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <AnnouncementBar eyebrow="New" cta={{ label: 'See what shipped', href: '#' }}>
        Tamil language support is live across all courses.
      </AnnouncementBar>
      <AnnouncementBar intent="neutral" size="sm" align="start">
        Scheduled maintenance on Sunday, 02:00–03:00 IST.
      </AnnouncementBar>
      <AnnouncementBar intent="success">All systems operational.</AnnouncementBar>
      <AnnouncementBar intent="warning" dismissible={false}>
        Your trial ends in 3 days.
      </AnnouncementBar>
      <AnnouncementBar intent="danger">Payments are delayed. We’re working on it.</AnnouncementBar>
    </div>
  ),
};

export const Navbar: Story = {
  render: () => (
    <SiteNavbar
      logo={<Logo />}
      items={navItems}
      actions={
        <>
          <Button variant="tertiary">Sign in</Button>
          <Button>Start free</Button>
        </>
      }
    />
  ),
};

export const ProductAppBar: Story = {
  render: () => <AppBar title="Python Basics" onMenuClick={() => undefined} notificationCount={3} user={{ name: 'Tamil Arasan' }} />,
};

export const CallToAction: Story = {
  render: () => (
    <div className="p-6">
      <CtaBanner
        title="Start teaching today."
        description="Build your first course in minutes. No credit card needed."
        primaryAction={{ label: 'Start free', shortcut: 'S' }}
        secondaryAction={{ label: 'Book a demo', shortcut: 'D' }}
      />
    </div>
  ),
};

export const Faq: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-6">
      <FaqSection description="Everything you need to know before you start." items={faq} defaultOpen={0} />
      <FaqSection title="Billing questions" variant="flush" items={faq} />
    </div>
  ),
};

export const Logos: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <LogoStrip logos={logos} />
      <LogoStrip logos={logos} static label="Featured in" />
    </div>
  ),
};

export const Testimonials: Story = {
  render: () => (
    <div className="grid gap-4 p-6 md:grid-cols-2">
      <TestimonialCard
        quote="We moved all our training onto ARAS-built products in a month, and learners noticed the difference right away."
        author={{ name: 'Felin Kale', role: 'Co-founder & CEO, Northwind' }}
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <TestimonialCard
        quote="The accessibility defaults saved us weeks of audit fixes."
        author={{ name: 'Priya Nair', role: 'Head of Design, Globex' }}
        bordered={false}
      />
    </div>
  ),
};

export const Footer: Story = {
  render: () => (
    <SiteFooter
      logo={<Logo />}
      description="One design system for every product."
      columns={[
        { title: 'Product', links: [{ label: 'Courses', href: '#' }, { label: 'Certificates', href: '#' }, { label: 'Pricing', href: '#' }] },
        { title: 'Company', links: [{ label: 'About us', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }] },
        { title: 'Resources', links: [{ label: 'Blog', href: '#' }, { label: 'Guides', href: '#' }] },
        { title: 'Social', links: [{ label: 'LinkedIn', href: '#' }, { label: 'YouTube', href: '#' }] },
      ]}
      offices={[
        { city: 'Chennai', lines: ['12 Anna Salai', 'Chennai 600002, India'] },
        { city: 'Bengaluru', lines: ['18 MG Road', 'Bengaluru 560001, India'] },
      ]}
      copyright="© 2026 ARAS"
      badges={['WCAG 2.2 AA']}
      legalLinks={[
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
      ]}
    />
  ),
};

export const FullPage: Story = {
  render: () => (
    <div>
      <AnnouncementBar eyebrow="New" cta={{ label: 'Read more', href: '#' }}>
        Tamil language support is live.
      </AnnouncementBar>
      <SiteNavbar logo={<Logo />} items={navItems} actions={<Button>Start free</Button>} />
      <main className="flex flex-col gap-16 px-6 py-12">
        <LogoStrip logos={logos} />
        <FaqSection items={faq} />
        <CtaBanner title="Start teaching today." primaryAction={{ label: 'Start free' }} secondaryAction={{ label: 'Book a demo' }} />
      </main>
      <SiteFooter
        logo={<Logo />}
        columns={[{ title: 'Product', links: [{ label: 'Courses', href: '#' }] }]}
        copyright="© 2026 ARAS"
      />
    </div>
  ),
};
