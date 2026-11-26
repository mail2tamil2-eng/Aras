# ARAS Design Rules

ARAS is one design system for every product. This file is the rulebook for designers, developers and AI tools.
If something here conflicts with a screen, a Figma file or a prompt, **this file wins**.

Version: 0.1 · Owner: Tamilarasan

---

## 1. Principles

1. **One core, many brands.** Components never know which product they are in. Products change only their brand theme.
2. **The designer decides, AI does the volume.** AI tools build screens only from ARAS parts. A designer approves the result.
3. **Code is the source of truth.** Figma mirrors the code. A change in only one of them is not done.
4. **Small and solid before big.** Add a component only when two products need it.
5. **Accessible by default.** WCAG 2.2 AA is the minimum, never a "later" task.
6. **Measure before and after.** Every claim about ARAS has a number and a way to check it.

---

## 2. Tokens

### 2.1 Three tiers

| Tier | Example | Who uses it |
|---|---|---|
| Primitive | `palette.blue.600`, `size.space.4` | Only semantic tokens. **Never** components or products |
| Semantic | `color.action.primary.bg`, `space.md`, `radius.control` | Components and product code |
| Brand | `src/brands/lms.light.json` | Overrides semantic tokens for one product |

CSS variables use the `--aras-` prefix, for example `--aras-color-text-primary`.

### 2.2 Naming

`category . role . variant . state`, for example `color.action.primary.bg-hover`.
Name tokens by **what they are for**, never by how they look (`color.status.danger.fg`, not `color.red`).

### 2.3 Tailwind classes

Tailwind's default colours, font sizes, radii and shadows are switched off. Only ARAS names exist:

| Need | Use | Never |
|---|---|---|
| Page / card background | `bg-canvas`, `bg-surface`, `bg-surface-raised`, `bg-surface-sunken` | `bg-white`, `bg-gray-50` |
| Text | `text-fg`, `text-fg-secondary`, `text-link` | `text-gray-900`, `text-[#333]` |
| Borders | `border-border` (dividers), `border-border-strong` (inputs) | `border-gray-200` |
| Actions | `bg-primary text-on-primary`, `bg-danger text-on-danger` | `bg-blue-600` |
| Status | `text-success-fg bg-success-bg`, same for warning, danger, info | `text-green-700` |
| Type | `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`, `text-caption` | `text-[15px]`, `text-lg` |
| Spacing | `p-[var(--aras-space-md)]`, `gap-[var(--aras-space-sm)]` or Tailwind's 4px scale (`p-4`) | `p-[13px]` |
| Shape | `rounded-control`, `rounded-card`, `rounded-overlay`, `rounded-pill` | `rounded-[10px]` |
| Elevation | `shadow-card`, `shadow-dropdown`, `shadow-toast`, `shadow-modal` | `shadow-[0_2px...]` |

### 2.4 Themes on `<html>`

```html
<html data-brand="lms" data-theme="dark" data-density="compact">
```

- `data-brand`: `lms`, `food` (no attribute = base ARAS brand)
- `data-theme`: `light` (default) or `dark`
- `data-density`: `comfortable` (default) or `compact` for admin tables and dashboards

---

## 3. Visual hierarchy

| Rule | How ARAS does it |
|---|---|
| One primary action per view | Button variants: primary, secondary, tertiary, danger. Only one `primary` on screen |
| Clear type levels | 7-step scale only. One `text-h1` per page. Don't skip levels (h1 → h3) |
| Spacing shows grouping | 4px grid. Small space inside a group (`space.xs`, `space.sm`), larger space between groups (`space.lg`, `space.xl`) |
| Colour shows importance | `text-fg` for main content, `text-fg-secondary` for support. Brand colour only for actions and focus |
| Layers show depth | canvas → surface → surface-raised, with matching elevation (card → dropdown → modal) |
| Alignment | 12-column grid on web, 4 on mobile. Left-align text. Centre only empty states and short headings |
| Emphasis is rare | One accent per view (Von Restorff). If everything is bold, nothing is |

---

## 4. Accessibility: WCAG 2.2 Level AA

The token build **fails** if any theme breaks the contrast rules. Storybook checks every story with axe.

| Check | Requirement | ARAS rule |
|---|---|---|
| Text contrast (1.4.3) | 4.5:1 normal text, 3:1 large text | Checked automatically for every brand, light and dark |
| Non-text contrast (1.4.11) | 3:1 for borders, icons, focus rings | `border-strong` for inputs; `border` is decorative only |
| Use of colour (1.4.1) | Colour is never the only signal | Errors and status use icon + text |
| Keyboard (2.1.1) | Everything works with the keyboard | Radix primitives; test Tab, Enter, Space, Esc, arrows |
| Focus visible (2.4.7) | Clear focus ring | `outline-focus`, 2px, offset 2px. Never `outline-none` without a replacement |
| Focus not obscured (2.4.11) | Sticky headers don't hide focus | Add `scroll-padding-top` equal to header height |
| Target size (2.5.8) | At least 24 × 24 px | Smallest control is 28px (compact). Mobile touch targets: 44px (`--aras-control-target-min`) |
| Labels (1.3.1, 3.3.2) | Every input has a visible label | `Input` requires `label`. Placeholder is never the label |
| Error help (3.3.1, 3.3.3) | Say what's wrong and how to fix it | "Enter a full email, for example name@company.com" |
| Redundant entry (3.3.7) | Don't ask for the same data twice | Prefill known values in multi-step forms |
| Reflow (1.4.10) | Works at 320px wide and 200% zoom | Test every pattern at both |
| Motion (2.3.3) | Respect reduce-motion | Motion tokens become 0ms automatically |
| Language (3.1.1, 3.1.2) | Set the page and part language | `<html lang="en">`; wrap Tamil text in `lang="ta"` |

Disabled controls are exempt from contrast rules, but must still be clearly disabled.

---

## 5. UX laws

| Law | Rule in ARAS |
|---|---|
| Jakob's Law | Use familiar SaaS patterns (login, tables, settings, side nav). Don't reinvent them |
| Hick's Law | 5–7 nav items max. Progressive disclosure for advanced options. Smart defaults |
| Fitts's Law | Big targets for frequent actions; primary action near where the user is looking |
| Miller's Law | Chunk long forms into steps of 5–7 fields. Group menu items |
| Gestalt: proximity, similarity, common region | Spacing and cards show what belongs together. Same-looking things behave the same |
| Von Restorff effect | One accent per view: the main action or the most important alert |
| Tesler's Law | ARAS absorbs complexity (validation, formatting, states) so users don't have to |
| Doherty threshold | Give feedback within 400ms: loading state, skeleton or optimistic update |
| Peak-end rule | Design the success moment and the ending (course complete, order placed) |
| Aesthetic-usability effect | Polished defaults in every brand |
| Postel's Law | Accept flexible input (phone, dates) and format it for the user |

---

## 6. Every component has every state

Default · Hover · Focus-visible · Active · Disabled · Loading · Error · Empty · Long text · Tamil text · Dark mode · Compact density

Patterns also need: **Loading** (skeleton) · **Empty** (EmptyState) · **Error** (with retry) · **Success**

---

## 7. Content and voice

- **Clear, short, human.** Sentences under 20 words. Plain words.
- **Buttons say what happens:** "Create course", not "Submit" or "OK".
- **Errors:** what happened + how to fix it. Never blame the user.
- **Empty states:** why it's empty + the single best next step.
- **Confirmations for destructive actions:** name the thing: "Delete 'Python Basics'? Learners lose their progress."
- **Sentence case** everywhere: "Create new course", not "Create New Course".
- Allow **30–40% longer text** for Tamil and other languages. Never fix widths on text.

---

## 8. Components (status)

The full list, with props and status, lives in `registry/components.json`.
Only **Beta** and **Stable** components may be used in products.

| Component | Package | Status |
|---|---|---|
| Button | ui | Beta |
| Input | ui | Beta |
| EmptyState | patterns | Beta |

Planned primitives (Phase 2): Select, Checkbox, Radio, Switch, Textarea, Modal, Drawer, Tabs, Toast, Tooltip, Popover, Menu, Badge, Avatar, Card, Skeleton, Progress, Breadcrumb, Pagination, Table.
Planned patterns (Phase 3): Login, Signup, Onboarding, DataTable, Filters, StatsCard, PageHeader, SideNav, Settings, Billing, Notifications, ErrorState, ConfirmDialog.
