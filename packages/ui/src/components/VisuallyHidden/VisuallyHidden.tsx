import * as React from 'react';

/**
 * VisuallyHidden
 *
 * Text that screen readers read but is not shown, e.g. extra context for an icon-only
 * button or a bare number. Prefer visible text when there is room.
 * Never use it to hide a required field label: labels must be visible (WCAG 3.3.2).
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  (props, ref) => <span ref={ref} className="sr-only" {...props} />,
);
VisuallyHidden.displayName = 'VisuallyHidden';
