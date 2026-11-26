// ARAS primitives and composites. Add every new component here and in /registry/components.json.

// Primitives
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, type AccordionProps, type AccordionTriggerProps } from './components/Accordion/Accordion';
export { Avatar, AvatarGroup, getInitials, type AvatarProps, type AvatarGroupProps, type AvatarSize, type AvatarStatus } from './components/Avatar/Avatar';
export { Badge, type BadgeProps } from './components/Badge/Badge';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbLinkProps,
} from './components/Breadcrumb/Breadcrumb';
export { Button, buttonVariants, type ButtonProps } from './components/Button/Button';
export { Checkbox, CheckboxField, type CheckboxProps, type CheckboxFieldProps } from './components/Checkbox/Checkbox';
export { Chip, type ChipProps } from './components/Chip/Chip';
export { Collapsible, type CollapsibleProps } from './components/Collapsible/Collapsible';
export { FileField, type FileFieldProps } from './components/FileField/FileField';
export { Input, type InputProps } from './components/Input/Input';
export { Kbd, type KbdProps } from './components/Kbd/Kbd';
export { LoadingButton, type LoadingButtonProps, type LoadingButtonState } from './components/LoadingButton/LoadingButton';
export { Pagination, getPageRange, type PaginationProps } from './components/Pagination/Pagination';
export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverBody,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  type PopoverContentProps,
} from './components/Popover/Popover';
export { Progress, type ProgressProps } from './components/Progress/Progress';
export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps } from './components/Radio/Radio';
export { ScrollArea, ScrollBar, type ScrollAreaProps } from './components/ScrollArea/ScrollArea';
export { Select, type SelectProps, type SelectOption } from './components/Select/Select';
export { Separator, type SeparatorProps } from './components/Separator/Separator';
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  type SheetContentProps,
} from './components/Sheet/Sheet';
export { Skeleton, type SkeletonProps } from './components/Skeleton/Skeleton';
export { Slider, type SliderProps } from './components/Slider/Slider';
export { Spinner, type SpinnerProps } from './components/Spinner/Spinner';
export { Stepper, type StepperProps, type StepperStep, type StepStatus } from './components/Stepper/Stepper';
export { Switch, SwitchField, type SwitchProps, type SwitchFieldProps } from './components/Switch/Switch';
export { Textarea, type TextareaProps } from './components/Textarea/Textarea';
export { Tooltip, TooltipProvider, TooltipContent, TooltipRoot, TooltipTrigger, type TooltipProps } from './components/Tooltip/Tooltip';
export { VisuallyHidden } from './components/VisuallyHidden/VisuallyHidden';

// Composites
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from './components/Card/Card';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuTextTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  type DropdownMenuItemProps,
} from './components/DropdownMenu/DropdownMenu';
export { Form, FormHeader, FormBody, FormRow, FormActions, FormField, type FormProps, type FormFieldProps } from './components/Form/Form';
export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  type ModalContentProps,
  type ModalFooterProps,
} from './components/Modal/Modal';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableRowProps,
} from './components/Table/Table';
export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps } from './components/Tabs/Tabs';
export { ToastProvider, useToast, type ToastOptions, type ToastIntent } from './components/Toast/Toast';

// Icons and utilities
export * from './icons/icons';
export type { IconProps } from './icons/icons';
export { cn } from './lib/cn';
export { intentClasses, intentDotClasses, type Intent, type Emphasis } from './lib/intent';
