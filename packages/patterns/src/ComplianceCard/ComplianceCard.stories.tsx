import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComplianceCard } from './ComplianceCard';

const meta: Meta<typeof ComplianceCard> = {
  title: 'Patterns/ComplianceCard',
  component: ComplianceCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-96 max-w-full"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: 'One card for governance, risk and compliance records. `kind` picks the layout: risk, control, policy, finding, evidence, framework.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ComplianceCard>;

export const Risk: Story = {
  args: {
    kind: 'risk',
    title: 'Unauthorised access to personal data',
    description: 'Staff can open learner records without access logging.',
    level: { label: 'Critical', intent: 'danger' },
    tag: 'Security',
    score: 8.5,
    owner: { name: 'John Doe' },
    facts: [{ label: 'Due', value: 'Dec 15' }],
    href: '#',
  },
};
export const Control: Story = {
  args: {
    kind: 'control',
    title: 'Quarterly access reviews',
    code: 'AC-2',
    status: { label: 'Passing', intent: 'success' },
    tag: 'SOC 2',
    facts: [{ label: 'Last tested', value: 'Nov 20' }],
  },
};
export const Policy: Story = {
  args: {
    kind: 'policy',
    title: 'Information security policy',
    code: 'v3.2',
    status: { label: 'In review', intent: 'warning' },
    owner: { name: 'Sarah Park' },
    facts: [
      { label: 'Effective', value: 'Jan 1' },
      { label: 'Review', value: 'Jun 30' },
    ],
  },
};
export const Finding: Story = {
  args: {
    kind: 'finding',
    title: 'MFA not enforced for admins',
    code: 'FND-104',
    level: { label: 'High', intent: 'danger' },
    status: { label: 'Open', intent: 'info' },
    assignees: [{ name: 'Tom Reid' }, { name: 'Ana Lee' }, { name: 'Ravi K' }, { name: 'Mei Lin' }],
    facts: [{ label: 'Due', value: 'Jan 10' }],
  },
};
export const Evidence: Story = {
  args: {
    kind: 'evidence',
    title: 'Penetration test report 2026',
    fileType: 'PDF',
    description: 'Uploaded by Tamil Arasan · 2.4 MB',
    onView: () => undefined,
    onDownload: () => undefined,
  },
};
export const Framework: Story = {
  args: {
    kind: 'framework',
    title: 'ISO 27001',
    status: { label: 'Audit ready', intent: 'success' },
    progress: 86,
    facts: [
      { label: 'Next audit', value: 'Mar 2027' },
      { label: 'Last audit', value: 'Mar 2026' },
    ],
  },
};
