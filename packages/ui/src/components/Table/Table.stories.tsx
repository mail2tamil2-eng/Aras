import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { Chip } from '../Chip/Chip';

const rows = [
  { course: 'Python Basics', learners: 1240, status: 'Published' },
  { course: 'Data Visualisation', learners: 860, status: 'Draft' },
  { course: 'Tamil for Beginners', learners: 2310, status: 'Published' },
  { course: 'Accessible Design', learners: 415, status: 'In review' },
];

const meta: Meta<typeof Table> = {
  title: 'Composites/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-2xl max-w-full"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic table parts. Scrolls horizontally on small screens. For search, selection and pagination use the DataTable pattern.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

function Demo({ density }: { density?: 'comfortable' | 'compact' }) {
  return (
    <Table density={density}>
      <TableCaption>Courses in this workspace</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Course</TableHead>
          <TableHead className="text-right">Learners</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={r.course} selected={i === 1}>
            <TableCell className="font-medium">{r.course}</TableCell>
            <TableCell className="text-right tabular-nums">{r.learners.toLocaleString('en-IN')}</TableCell>
            <TableCell>
              <Chip size="sm" intent={r.status === 'Published' ? 'success' : r.status === 'Draft' ? 'neutral' : 'warning'}>
                {r.status}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Comfortable: Story = { render: () => <Demo /> };
export const Compact: Story = { render: () => <Demo density="compact" /> };
