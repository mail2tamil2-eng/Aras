import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta: Meta<typeof Modal> = {
  title: 'Composites/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A centred dialog that blocks the page until the user responds. Focus is trapped inside, Esc closes, and focus returns to the trigger.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Invite learner</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Invite a learner</ModalTitle>
          <ModalDescription>They get an email with a link to join this course.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <Input label="Email address" type="email" placeholder="name@company.com" />
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button>Send invite</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="danger">Delete course</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader className="pb-6">
          <ModalTitle>Delete “Python Basics”?</ModalTitle>
          <ModalDescription>Learners lose their progress. This can’t be undone.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Keep course</Button>
          </ModalClose>
          <Button variant="danger">Delete course</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const SplitFooter: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Enable notifications</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader className="pb-6">
          <ModalTitle>Turn on notifications?</ModalTitle>
          <ModalDescription>We’ll tell you when learners finish a course.</ModalDescription>
        </ModalHeader>
        <ModalFooter layout="split">
          <ModalClose asChild>
            <Button variant="secondary">Not now</Button>
          </ModalClose>
          <Button>Turn on</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Terms of service</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Terms of service</ModalTitle>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>
              Section {i + 1}. The body scrolls while the header and footer stay in place, so actions are always reachable.
            </p>
          ))}
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button>I agree</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
