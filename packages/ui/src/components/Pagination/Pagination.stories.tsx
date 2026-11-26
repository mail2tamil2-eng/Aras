import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-2xl max-w-full"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: '"Page n of m" with Previous / Next, and optional page numbers with ellipses for indexed content.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function Demo(props: { pageCount: number; start?: number; showPageNumbers?: boolean }) {
  const [page, setPage] = React.useState(props.start ?? 1);
  return <Pagination page={page} pageCount={props.pageCount} onPageChange={setPage} showPageNumbers={props.showPageNumbers} />;
}

export const Simple: Story = { render: () => <Demo pageCount={12} /> };
export const Numbered: Story = { render: () => <Demo pageCount={5} showPageNumbers /> };
export const NumberedLong: Story = { render: () => <Demo pageCount={11} start={6} showPageNumbers /> };
