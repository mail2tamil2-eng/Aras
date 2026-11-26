import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Chip, PencilIcon, TrashIcon } from '@tamilarasan/aras-ui';
import { DataTable, type DataTableColumn } from './DataTable';

interface Control {
  id: string;
  name: string;
  owner: string;
  status: 'In progress' | 'Draft' | 'Done';
}

const owners = ['IT', 'Legal', 'HR', 'Finance'];
const statuses: Control['status'][] = ['In progress', 'Draft', 'Done'];
const names = [
  'Access certifications',
  'Access reviews',
  'Asset inventory',
  'Breach playbook',
  'Cloud posture',
  'Data retention',
  'Encryption at rest',
  'Incident response',
  'Onboarding checks',
  'Password policy',
  'Risk register',
  'Vendor reviews',
  'Backup testing',
  'Change management',
];
const rows: Control[] = names.map((name, i) => ({
  id: `c${i}`,
  name,
  owner: owners[i % owners.length]!,
  status: statuses[i % statuses.length]!,
}));

const columns: DataTableColumn<Control>[] = [
  { key: 'name', header: 'Control', cell: (r) => <span className="font-medium">{r.name}</span> },
  { key: 'owner', header: 'Owner' },
  {
    key: 'status',
    header: 'Status',
    cell: (r) => (
      <Chip size="sm" intent={r.status === 'Done' ? 'success' : r.status === 'Draft' ? 'neutral' : 'info'}>
        {r.status}
      </Chip>
    ),
  },
];

const actions = (r: Control) => (
  <>
    <Button variant="tertiary" size="icon-sm" aria-label={`Edit ${r.name}`}>
      <PencilIcon className="size-4" />
    </Button>
    <Button variant="tertiary" size="icon-sm" aria-label={`Delete ${r.name}`}>
      <TrashIcon className="size-4" />
    </Button>
  </>
);

const meta: Meta<typeof DataTable<Control>> = {
  title: 'Patterns/DataTable',
  component: DataTable<Control>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Table with search, a filter menu, row selection and pagination, plus loading, empty and error states.',
      },
    },
  },
  args: {
    caption: 'Compliance controls',
    columns,
    rows,
    getRowId: (r: Control) => r.id,
    getRowLabel: (r: Control) => r.name,
    filter: { label: 'Owner', key: 'owner', options: owners },
    pageSize: 5,
    rowActions: actions,
  },
};
export default meta;
type Story = StoryObj<typeof DataTable<Control>>;

export const Standard: Story = {};
export const Compact: Story = { args: { density: 'compact' } };
export const WithoutToolbar: Story = { args: { searchable: false, filter: undefined } };
export const WithoutSelection: Story = { args: { selectable: false } };
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { rows: [], emptyTitle: 'No controls yet', emptyDescription: 'Add a control to start tracking evidence.' } };
export const ErrorState: Story = { args: { error: { message: 'The server didn’t respond. Check your connection.', onRetry: () => undefined } } };
