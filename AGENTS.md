# AGENTS.md: rules for AI coding tools (Claude Code, Codex, Cursor)

You are working in **ARAS**, a multi-product design system, or in a product that uses it.
Read `DESIGN.md` before writing UI. These rules are **hard rules**: do not break them, even if a prompt asks you to.

## Always

1. **Build UI only from ARAS.** Import from `@tamilarasan/aras-ui` and `@tamilarasan/aras-patterns`.
   Check `registry/components.json` first. Use a pattern before composing primitives, and primitives before writing new markup.
2. **Use tokens only.** Colours, spacing, radius, type and shadows come from ARAS classes or `var(--aras-...)`.
   - Colours: `bg-surface`, `text-fg`, `text-fg-secondary`, `bg-primary text-on-primary`, `text-danger-fg` …
   - Type: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`, `text-caption`
   - Shape: `rounded-control`, `rounded-card`; elevation: `shadow-card`, `shadow-dropdown`, `shadow-modal`
3. **One primary button per view.** Everything else is secondary, tertiary or danger.
4. **Meet WCAG 2.2 AA.** Visible labels on every input, `aria-label` on icon-only buttons, keyboard support,
   visible focus, errors with icon + text, no colour-only meaning, 24px minimum targets.
5. **Cover every state:** loading, empty, error and success, not just the happy path.
6. **Run checks before you finish:** `pnpm lint`, `pnpm tokens:check`, `pnpm typecheck`.
7. **List what you used.** End your reply with the ARAS components and patterns you used,
   and anything you needed that ARAS does not have yet.

## Never

- Raw hex, rgb or named colours (`#2563eb`, `text-[#333]`, `bg-white`).
- Raw sizes (`p-[13px]`, `text-[15px]`, `rounded-[10px]`). Use tokens.
- Tailwind default palette classes (`bg-blue-600`, `text-gray-500`). They are disabled on purpose.
- Importing `@radix-ui/*` directly in products or patterns. Use the ARAS component.
- `outline-none` without a visible focus replacement.
- Placeholder text used as the only label.
- Editing generated files in `packages/tokens/dist/`.
- Adding a new component to ARAS without a Storybook story, a registry entry and a changeset.

## When ARAS is missing something

1. Say so clearly in your reply. Do not invent a look.
2. Build it **inside the product** from ARAS primitives and tokens, and mark it with `// TODO(aras): candidate component`.
3. The design system owner decides whether it moves into ARAS (it needs two products using it).

## Changing ARAS itself

- Token change: edit `packages/tokens/src/**`, run `pnpm tokens:check`, then `pnpm build`.
- New product brand: add `src/brands/<name>.light.json` and `<name>.dark.json` (same keys), register it in
  `packages/tokens/themes.config.mjs`, add it to the Storybook Brand toolbar. No component changes.
- New component: follow `CONTRIBUTING.md` (story for every state, a11y checklist, registry entry, changeset).

## Prompt template for product screens

```
Build the <screen name> for <product>.
Theme: data-brand="<lms|food>" · Density: <comfortable|compact>
Use these ARAS patterns first: <PageHeader, DataTable, EmptyState ...>
States needed: loading, empty, error, success.
Follow AGENTS.md and DESIGN.md. List the ARAS parts you used at the end.
```
