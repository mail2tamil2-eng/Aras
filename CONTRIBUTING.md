# Contributing to ARAS

ARAS has one owner (Tamilarasan). Anyone can propose a change. Only the owner merges.

## Branches

- `main` is always releasable. Never commit to it directly.
- One branch per change: `feat/select`, `fix/input-focus`, `tokens/food-dark`, `docs/wcag`.
- Merge through a pull request. Every pull request gets a Vercel preview link for review.

## Adding or changing a component

1. **Request**: open a GitHub issue: which product, which screen, what is needed.
2. **Check**: can an existing component or variant do it? If yes, reuse it.
   If only one product needs it, build it inside that product, not in ARAS.
3. **Build**: code and Figma change together. Add a Storybook story for every state.
4. **Test**: complete the checklist below.
5. **Release**: run `pnpm changeset`, describe the change for product teams, open the pull request.

## Definition of done (copy into the pull request)

```
- [ ] Uses semantic tokens only (pnpm lint passes)
- [ ] Stories: default, hover, focus, disabled, loading, error, long text, Tamil text
- [ ] Checked in light + dark, every brand, comfortable + compact
- [ ] No axe violations in the Storybook Accessibility panel
- [ ] Keyboard: Tab, Shift+Tab, Enter, Space, Esc, arrow keys where relevant
- [ ] Screen reader: name, role and state are announced correctly
- [ ] Works at 320px wide and 200% zoom
- [ ] Props documented with JSDoc; entry added to registry/components.json
- [ ] Figma component updated with matching variant names
- [ ] Changeset added (pnpm changeset)
```

## Versioning

- **Patch** (0.1.1): bug fix, no API change.
- **Minor** (0.2.0): new component, variant or token.
- **Major** (1.0.0): anything that breaks product code (renamed prop, removed token).

## Deprecation

1. Mark it `deprecated` in `registry/components.json` and in JSDoc (`@deprecated Use X instead`).
2. Keep it working for at least one minor version, with a console warning in development.
3. Remove it in the next major version. Say what to use instead in the changelog.

## Component status

| Status | Meaning | Use in products? |
|---|---|---|
| Draft | Being designed or built | No |
| Beta | Works and is tested; API may still change | Yes |
| Stable | API locked; used in two or more products | Yes |
| Deprecated | Will be removed in the next major version | Only while migrating |

## Decision log

Record every big decision in `guides/decision-log.md`: date, decision, reason, alternatives.
