# ARAS decision log

One row per important decision. Newest first. This becomes the "Approach" section of the case study.

| Date | Decision | Why | Alternatives considered |
|---|---|---|---|
| 2026-11-26 | Build the Ofofo component set (except its AI-product components) with ARAS tokens, not Ofofo's look | Same behaviour and coverage, but every brand, theme and density keeps working; stays inside the 35 + 25 budget (35 ui components, 21 pattern exports) | Copy Ofofo's colours and fonts as a new brand (possible later as an `ofofo` brand file) |
| 2026-11-26 | Own 32-icon line set inside `aras-ui` | No extra dependency for products; consistent stroke and sizing; decorative by default | Phosphor or Lucide as a dependency (bigger install, two icon styles) |
| 2026-11-26 | Motion keyframes live in `tailwind.css` and use motion tokens | One place for enter/exit animations; reduced motion turns them off through the tokens | A JS spring library per component (more code, harder to keep consistent) |
| 2026-11-26 | Select uses the native `<select>` | Best keyboard, screen reader and mobile support for free | Custom Radix listbox (add later as Combobox if search is needed) |
| 2026-11-26 | Separate brand files that override only semantic tokens | One component set serves every product; a new brand is one file | Separate component library per product (too much upkeep) |
| 2026-11-26 | Contrast check runs before every token build and fails it | WCAG 2.2 AA can't be skipped by accident when adding a brand | Manual contrast checks (easy to forget) |
| 2026-11-26 | Tailwind default palette disabled | Forces tokens; stops AI tools using `bg-blue-600` | Lint warnings only (people ignore warnings) |
| 2026-11-26 | Storybook on Vercel as the docs site | Live components, a preview link per pull request for the BA team | Custom docs site (more work for one person) |
| 2026-11-26 | Name: ARAS (from Tamil**arasan**) | Short, personal, easy to say | Kolam, Thoon, Nool, Loom |
| 2026-11-26 | Start with 35 primitives + 25 patterns max for v1.0 | One designer can keep this healthy | Match Ofofo's 266 components |
