import * as React from 'react';
import { cn } from '../lib/cn';

/**
 * ARAS icons
 *
 * A small, consistent line-icon set (24px grid, 2px stroke, round caps) used inside ARAS components.
 * Icons inherit `currentColor` and default to 1em, so they follow the text they sit next to.
 *
 * Accessibility: icons are decorative by default (`aria-hidden`). Pass `title` when an icon
 * is the only thing that explains something; it then gets role="img" and an accessible name.
 */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Accessible name. Leave empty for decorative icons next to visible text. */
  title?: string;
}

function createIcon(name: string, paths: React.ReactNode) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ title, className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      className={cn('shrink-0', className)}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      {paths}
    </svg>
  ));
  Icon.displayName = `${name}Icon`;
  return Icon;
}

export const ChevronDownIcon = createIcon('ChevronDown', <path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = createIcon('ChevronUp', <path d="m18 15-6-6-6 6" />);
export const ChevronLeftIcon = createIcon('ChevronLeft', <path d="m15 18-6-6 6-6" />);
export const ChevronRightIcon = createIcon('ChevronRight', <path d="m9 18 6-6-6-6" />);
export const CheckIcon = createIcon('Check', <path d="M20 6 9 17l-5-5" />);
export const MinusIcon = createIcon('Minus', <path d="M5 12h14" />);
export const PlusIcon = createIcon('Plus', <path d="M12 5v14M5 12h14" />);
export const XIcon = createIcon('X', <path d="M18 6 6 18M6 6l12 12" />);
export const SearchIcon = createIcon(
  'Search',
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
);
export const InfoIcon = createIcon(
  'Info',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </>,
);
export const AlertCircleIcon = createIcon(
  'AlertCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </>,
);
export const CheckCircleIcon = createIcon(
  'CheckCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </>,
);
export const AlertTriangleIcon = createIcon(
  'AlertTriangle',
  <>
    <path d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </>,
);
export const XCircleIcon = createIcon(
  'XCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m15 9-6 6M9 9l6 6" />
  </>,
);
export const UploadIcon = createIcon(
  'Upload',
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m17 8-5-5-5 5M12 3v12" />
  </>,
);
export const DownloadIcon = createIcon(
  'Download',
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5M12 15V3" />
  </>,
);
export const FileIcon = createIcon(
  'File',
  <>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
    <path d="M14 3v6h6" />
  </>,
);
export const MoreHorizontalIcon = createIcon(
  'MoreHorizontal',
  <>
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </>,
);
export const ArrowRightIcon = createIcon('ArrowRight', <path d="M5 12h14M13 6l6 6-6 6" />);
export const ArrowUpRightIcon = createIcon('ArrowUpRight', <path d="M7 17 17 7M8 7h9v9" />);
export const TrendUpIcon = createIcon('TrendUp', <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />);
export const TrendDownIcon = createIcon('TrendDown', <path d="m3 7 6 6 4-4 8 8M15 17h6v-6" />);
export const MenuIcon = createIcon('Menu', <path d="M4 6h16M4 12h16M4 18h16" />);
export const BellIcon = createIcon(
  'Bell',
  <>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" />
  </>,
);
export const PencilIcon = createIcon('Pencil', <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />);
export const TrashIcon = createIcon(
  'Trash',
  <>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </>,
);
export const CalendarIcon = createIcon(
  'Calendar',
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>,
);
export const ClockIcon = createIcon(
  'Clock',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
export const UserIcon = createIcon(
  'User',
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </>,
);
export const PlayIcon = createIcon('Play', <path d="m7 4 13 8-13 8Z" />);
export const SparkleIcon = createIcon(
  'Sparkle',
  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />,
);
export const QuoteIcon = createIcon(
  'Quote',
  <path d="M7 7H4v6h3l-2 4M17 7h-3v6h3l-2 4" />,
);

/** Every ARAS icon, for docs and pickers. */
export const icons = {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
  SearchIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  UploadIcon,
  DownloadIcon,
  FileIcon,
  MoreHorizontalIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  TrendUpIcon,
  TrendDownIcon,
  MenuIcon,
  BellIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PlayIcon,
  SparkleIcon,
  QuoteIcon,
} as const;
