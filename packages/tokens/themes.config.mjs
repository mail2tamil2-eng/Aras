// Single source of truth for how ARAS token files combine into themes.
// Used by build.mjs (CSS output) and scripts/check-contrast.mjs (WCAG checks).
//
// Order matters: later files override earlier ones, exactly like the CSS cascade.

export const PRIMITIVES = [
  'src/primitive/color.json',
  'src/primitive/size.json',
  'src/primitive/typography.json',
  'src/primitive/effects.json',
];

const BASE = 'src/semantic/base.json';
const LIGHT = 'src/semantic/color.light.json';
const DARK = 'src/semantic/color.dark.json';
const COMPACT = 'src/density/compact.json';

// Each product brand: a light file, a dark file, and optional shape (radius, font) overrides.
// To add a product: add its files in src/brands/ and one entry here. Nothing else changes.
export const BRANDS = {
  lms: { light: 'src/brands/lms.light.json', dark: 'src/brands/lms.dark.json', shape: [] },
  food: { light: 'src/brands/food.light.json', dark: 'src/brands/food.dark.json', shape: ['src/brands/food.shape.json'] },
};

const has = (...parts) => (filePath) => parts.some((p) => filePath.includes(p.replace(/^src\//, '')));

// CSS files written to dist/. `include` picks which tokens appear in that file;
// the other sources are only there so references resolve.
export const OUTPUTS = [
  { file: 'primitives.css', selector: ':root', sources: [...PRIMITIVES], include: has('primitive/') },
  { file: 'semantic.css', selector: ':root', sources: [...PRIMITIVES, BASE, LIGHT], include: has('semantic/') },
  { file: 'dark.css', selector: '[data-theme="dark"]', sources: [...PRIMITIVES, BASE, LIGHT, DARK], include: has(DARK) },
  { file: 'density-compact.css', selector: '[data-density="compact"]', sources: [...PRIMITIVES, BASE, COMPACT], include: has(COMPACT) },
  ...Object.entries(BRANDS).flatMap(([name, b]) => [
    {
      file: `brand-${name}.css`,
      selector: `[data-brand="${name}"]`,
      sources: [...PRIMITIVES, BASE, LIGHT, b.light, ...b.shape],
      include: has(b.light, ...b.shape),
    },
    {
      file: `brand-${name}-dark.css`,
      selector: `[data-brand="${name}"][data-theme="dark"]`,
      sources: [...PRIMITIVES, BASE, LIGHT, DARK, b.light, ...b.shape, b.dark],
      include: has(b.dark),
    },
  ]),
];

// Fully merged themes, used for contrast checks. Mirrors what the browser computes.
export const THEMES = {
  'base-light': [...PRIMITIVES, BASE, LIGHT],
  'base-dark': [...PRIMITIVES, BASE, LIGHT, DARK],
  ...Object.fromEntries(
    Object.entries(BRANDS).flatMap(([name, b]) => [
      [`${name}-light`, [...PRIMITIVES, BASE, LIGHT, b.light, ...b.shape]],
      [`${name}-dark`, [...PRIMITIVES, BASE, LIGHT, DARK, b.light, ...b.shape, b.dark]],
    ]),
  ),
};
