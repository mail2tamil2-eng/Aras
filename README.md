# ARAS Design System

**One design system for every product.** A new product changes one theme file; the components stay the same.

- 3-tier tokens (primitive → semantic → brand) with light, dark and compact density
- Product brands included: **Base**, **LMS**, **What to Cook Today?** (food)
- WCAG 2.2 AA built in: the token build fails if any brand breaks contrast rules
- React + TypeScript + Tailwind CSS v4 + Radix, documented in Storybook
- AI-ready: `AGENTS.md`, `DESIGN.md` and a component registry tell Claude Code and Codex how to build with ARAS

---

## Repository structure

```
aras/
├─ packages/
│  ├─ tokens/        @tamilarasan/aras-tokens    Tokens, brands, contrast check, Tailwind bridge
│  │  ├─ src/primitive/   raw values (palette, sizes, type, effects)
│  │  ├─ src/semantic/    meaning (base.json, color.light.json, color.dark.json)
│  │  ├─ src/density/     compact overrides
│  │  ├─ src/brands/      one light + dark file per product
│  │  ├─ themes.config.mjs  how files combine into themes
│  │  └─ tailwind.css     maps tokens to Tailwind classes
│  ├─ ui/            @tamilarasan/aras-ui        Primitives, composites and icons (Button, Modal, Table …)
│  └─ patterns/      @tamilarasan/aras-patterns  Product and marketing patterns (DataTable, PageHeader …)
├─ apps/
│  └─ docs/          Storybook docs site (deployed to Vercel)
├─ registry/components.json   every component, its props and status
├─ guides/           audit checklist, baseline sheet, decision log
├─ DESIGN.md         the rulebook: tokens, hierarchy, WCAG, UX laws, voice
├─ AGENTS.md         hard rules for AI coding tools
├─ CLAUDE.md         loads AGENTS.md + DESIGN.md for Claude Code
└─ CONTRIBUTING.md   how to add components, versioning, definition of done
```

---

## Getting started

You need **Node 20+** and **pnpm 10** (`npm install -g pnpm`).

```bash
pnpm install
pnpm tokens:check   # WCAG contrast check for all 6 themes
pnpm build          # builds tokens, ui, patterns
pnpm dev            # Storybook at http://localhost:6006
```

Use the Storybook toolbar to switch **Theme**, **Brand** and **Density**.

| Command | What it does |
|---|---|
| `pnpm dev` | Run Storybook locally |
| `pnpm build` | Build all packages |
| `pnpm docs:build` | Build the static docs site |
| `pnpm tokens:check` | Check every brand and theme against WCAG 2.2 AA |
| `pnpm lint` | Block raw colours, raw sizes and direct Radix imports |
| `pnpm typecheck` | TypeScript checks |
| `pnpm changeset` | Describe a change for the changelog and version bump |

---

## Push to GitHub

```bash
cd aras
git init
git add .
git commit -m "chore: initial ARAS design system"
git branch -M main
gh repo create aras --private --source=. --push
```

Then in GitHub → **Settings → Branches**, protect `main` (require a pull request before merging).
The CI workflow in `.github/workflows/ci.yml` runs the contrast check, lint, build and docs build on every pull request.

## Deploy docs to Vercel

1. Vercel → **Add New → Project** → import the `aras` repo.
2. Set **Root Directory** to `apps/docs`. The other settings come from `apps/docs/vercel.json`.
3. Deploy. Every push to `main` updates the live docs; every pull request gets its own preview link.

---

## Use ARAS in a product (for example the LMS)

Until v1.0 is on npm, install straight from GitHub or use the packages inside the same monorepo.
After publishing:

```bash
pnpm add @tamilarasan/aras-tokens @tamilarasan/aras-ui @tamilarasan/aras-patterns
```

```css
/* app.css */
@import "tailwindcss";
@import "@tamilarasan/aras-tokens/tailwind.css";
@source "../node_modules/@tamilarasan/aras-ui/dist";
@source "../node_modules/@tamilarasan/aras-patterns/dist";
```

```html
<html lang="en" data-brand="lms" data-theme="light" data-density="comfortable">
```

```tsx
import { Button, Input } from '@tamilarasan/aras-ui';
import { EmptyState } from '@tamilarasan/aras-patterns';
```

Copy `AGENTS.md` and `DESIGN.md` into the product repo (or link them), so Claude Code and Codex follow ARAS there too.

## Add a new product brand

1. Copy `packages/tokens/src/brands/lms.light.json` and `lms.dark.json` to `<name>.light.json` and `<name>.dark.json`.
2. Change the colours (keep the same keys in both files).
3. Register it in `packages/tokens/themes.config.mjs` → `BRANDS`.
4. Run `pnpm tokens:check`. If a colour fails contrast, the check tells you which pair and by how much.
5. Add it to the Brand toolbar in `apps/docs/.storybook/preview.tsx`.

No component changes are needed.

---

## Publish to npm (Phase 4)

1. Create the `@tamilarasan` scope on npmjs.com (it is your npm username).
2. `npm login`
3. `pnpm changeset` → `pnpm changeset version` → `pnpm release`

## Not included yet

- Figma variables sync, and iOS / Android token output: planned for Phase 4. The DTCG token files are ready for them.
- The remaining primitives and patterns: see `registry/components.json` → `planned`.

## License

MIT. Change this if you want to keep ARAS private.
