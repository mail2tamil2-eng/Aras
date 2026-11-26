import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form, FormActions, FormBody, FormField, FormHeader, FormRow } from './Form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';
import { CheckboxField } from '../Checkbox/Checkbox';

const meta: Meta<typeof Form> = {
  title: 'Composites/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-xl max-w-full"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Form scaffolding with consistent spacing: FormHeader, FormBody, FormRow, FormActions. `FormField` labels any custom control and wires hint and error for screen readers.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

export const FullForm: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormHeader title="Organisation details" description="Shown on invoices and certificates." />
      <FormBody>
        <Input label="Organisation name" required hint="Legal name as on tax documents." />
        <FormRow>
          <Input label="City" />
          <Select label="Country" placeholder="Select a country" options={[{ value: 'in', label: 'India' }, { value: 'us', label: 'United States' }]} />
        </FormRow>
        <Textarea label="About" rows={3} />
        <CheckboxField label="Show organisation name on certificates" defaultChecked />
      </FormBody>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save details</Button>
      </FormActions>
    </Form>
  ),
};

export const WithErrors: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormHeader title="Create course" />
      <FormBody>
        <Input label="Course name" required error="Enter a course name, for example “Python Basics”." />
        <FormField label="Start date" required error="Choose a date in the future.">
          <input
            type="date"
            className="h-[var(--aras-control-height-md)] rounded-control border border-border-strong bg-surface px-[var(--aras-control-padding-x-md)] text-body text-fg aria-invalid:border-danger-border focus-visible:outline-2 focus-visible:outline-focus"
          />
        </FormField>
      </FormBody>
      <FormActions>
        <Button type="submit">Create course</Button>
      </FormActions>
    </Form>
  ),
};

export const Plain: Story = {
  render: () => (
    <Form card={false} onSubmit={(e) => e.preventDefault()}>
      <FormBody>
        <Input label="Email address" type="email" hint="We’ll send the invite here." />
      </FormBody>
      <FormActions>
        <Button type="submit">Send invite</Button>
      </FormActions>
    </Form>
  ),
};
