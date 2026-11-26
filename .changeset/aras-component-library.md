---
'@tamilarasan/aras-tokens': minor
'@tamilarasan/aras-ui': minor
'@tamilarasan/aras-patterns': minor
---

Add the full ARAS component library.

- **Tokens:** motion keyframes in `tailwind.css` (`animate-fade-in`, `animate-pop-in`, `animate-slide-in-*`, `animate-expand`, `animate-collapse`, `animate-marquee` …) for overlays, menus, accordions and toasts. Durations come from ARAS motion tokens.
- **UI primitives:** Accordion, Avatar (+ AvatarGroup), Badge, Breadcrumb, Checkbox (+ CheckboxField), Chip, Collapsible, FileField, Kbd, LoadingButton, Pagination, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Skeleton, Slider, Spinner, Stepper, Switch (+ SwitchField), Textarea, Tooltip, VisuallyHidden, and a 32-icon line icon set.
- **UI composites:** Card, DropdownMenu, Form (+ FormField), Modal, Sheet, Table, Tabs, Toast (`ToastProvider`, `useToast`).
- **Button:** new `leftIcon` / `rightIcon` props and `icon-sm` / `icon-md` / `icon-lg` sizes for icon-only buttons.
- **Input:** muted styling for read-only fields.
- **Patterns:** PageHeader, StatsCard, AppCard family (ActionCard, ProfileCard, NotificationCard, PricingCard, SummaryCard), ComplianceCard, DataTable, content cards (FeaturedCard, BlogCard, FeatureCard), AnnouncementBar, CtaBanner, FaqSection, LogoStrip, SiteNavbar, AppBar, SiteFooter, TestimonialCard.
- **EmptyState:** new `size` (`sm`, `md`, `lg`) and `align` (`center`, `start`) props.

No breaking changes: existing props keep working.
