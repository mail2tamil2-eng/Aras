import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';
import { Badge } from '../Badge/Badge';
import { InfoIcon } from '../../icons/icons';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-xl max-w-full"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Stacked sections that expand and collapse. `outlined` gives each item a card border; `flush` uses divider lines only. Triggers are headings, so the page outline stays correct.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const items = (
  <>
    <AccordionItem value="a">
      <AccordionTrigger>What does ARAS include?</AccordionTrigger>
      <AccordionContent>Tokens, accessible React primitives, composites and SaaS patterns that every product shares.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="b">
      <AccordionTrigger meta={<Badge>12</Badge>}>Details</AccordionTrigger>
      <AccordionContent>Each component has stories for every state, a registry entry and a changeset.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="c" disabled>
      <AccordionTrigger>Coming soon</AccordionTrigger>
      <AccordionContent>Hidden.</AccordionContent>
    </AccordionItem>
  </>
);

export const Flush: Story = { render: () => <Accordion type="single" collapsible defaultValue="a">{items}</Accordion> };
export const Outlined: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="outlined" defaultValue="a">
      {items}
    </Accordion>
  ),
};
export const WithIcon: Story = {
  render: () => (
    <Accordion type="multiple" variant="outlined">
      <AccordionItem value="a">
        <AccordionTrigger icon={<InfoIcon className="size-4" />}>Overview</AccordionTrigger>
        <AccordionContent>Icons sit before the title and are decorative.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
export const TamilText: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger lang="ta">பாடநெறி எவ்வளவு காலம் நீடிக்கும்?</AccordionTrigger>
        <AccordionContent lang="ta">ஒவ்வொரு பாடநெறியும் உங்கள் வேகத்தில் முடிக்கக்கூடியது. பெரும்பாலானவை நான்கு வாரங்களில் முடிகின்றன.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
