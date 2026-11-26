// WCAG 2.2 AA contrast check for every ARAS theme. No dependencies.
// Fails (exit 1) if any pair is below its minimum, so a bad brand colour can never ship.
// Run: pnpm --filter @tamilarasan/aras-tokens check
import { readFileSync } from 'node:fs';
import { THEMES, BRANDS } from '../themes.config.mjs';

// Text pairs need 4.5:1 (WCAG 1.4.3). UI parts need 3:1 against what is next to them (WCAG 1.4.11).
const TEXT = 4.5;
const UI = 3;

const PAIRS = [
  ['color.text.primary', 'color.bg.canvas', TEXT],
  ['color.text.primary', 'color.bg.surface', TEXT],
  ['color.text.primary', 'color.bg.surface-raised', TEXT],
  ['color.text.primary', 'color.bg.surface-sunken', TEXT],
  ['color.text.secondary', 'color.bg.canvas', TEXT],
  ['color.text.secondary', 'color.bg.surface', TEXT],
  ['color.text.secondary', 'color.bg.surface-sunken', TEXT],
  ['color.text.link', 'color.bg.surface', TEXT],
  ['color.text.link', 'color.bg.canvas', TEXT],
  ['color.brand.fg', 'color.bg.surface', TEXT],
  ['color.brand.fg', 'color.brand.subtle', TEXT],
  ['color.text.primary', 'color.brand.subtle', TEXT],
  ['color.action.primary.fg', 'color.action.primary.bg', TEXT],
  ['color.action.primary.fg', 'color.action.primary.bg-hover', TEXT],
  ['color.action.secondary.fg', 'color.action.secondary.bg', TEXT],
  ['color.action.secondary.fg', 'color.action.secondary.bg-hover', TEXT],
  ['color.action.danger.fg', 'color.action.danger.bg', TEXT],
  ['color.action.danger.fg', 'color.action.danger.bg-hover', TEXT],
  ['color.status.success.fg', 'color.status.success.bg', TEXT],
  ['color.status.warning.fg', 'color.status.warning.bg', TEXT],
  ['color.status.danger.fg', 'color.status.danger.bg', TEXT],
  ['color.status.info.fg', 'color.status.info.bg', TEXT],
  ['color.status.danger.fg', 'color.bg.surface', TEXT],
  ['color.status.success.fg', 'color.bg.surface', TEXT],
  ['color.border.strong', 'color.bg.surface', UI],
  ['color.border.strong', 'color.bg.canvas', UI],
  ['color.border.focus', 'color.bg.surface', UI],
  ['color.border.focus', 'color.bg.canvas', UI],
  ['color.action.primary.bg', 'color.bg.surface', UI],
  ['color.action.primary.bg', 'color.bg.canvas', UI],
  ['color.action.secondary.border', 'color.bg.surface', UI],
  ['color.action.danger.bg', 'color.bg.surface', UI],
];

function flatten(node, path = [], out = {}) {
  if (node && typeof node === 'object' && '$value' in node) {
    out[path.join('.')] = node.$value;
    return out;
  }
  for (const [key, child] of Object.entries(node ?? {})) {
    if (!key.startsWith('$')) flatten(child, [...path, key], out);
  }
  return out;
}

const load = (file) => flatten(JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')));

function resolve(tokens, name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Circular reference at ${name}`);
  seen.add(name);
  const value = tokens[name];
  if (value === undefined) throw new Error(`Missing token: ${name}`);
  const ref = typeof value === 'string' && value.match(/^\{(.+)\}$/);
  return ref ? resolve(tokens, ref[1], seen) : value;
}

function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

let failures = 0;
let checks = 0;

for (const [theme, files] of Object.entries(THEMES)) {
  const tokens = Object.assign({}, ...files.map(load));
  for (const [fg, bg, min] of PAIRS) {
    const a = resolve(tokens, fg);
    const b = resolve(tokens, bg);
    if (!/^#[0-9a-f]{6}$/i.test(a) || !/^#[0-9a-f]{6}$/i.test(b)) continue; // skip colours with transparency
    checks++;
    const r = ratio(a, b);
    if (r < min) {
      failures++;
      console.error(`FAIL  ${theme.padEnd(11)} ${fg} on ${bg}: ${r.toFixed(2)}:1 (needs ${min}:1)  ${a} / ${b}`);
    }
  }
}

// Each brand's dark file must override the same tokens as its light file,
// otherwise a light brand colour can leak into dark mode.
for (const [name, b] of Object.entries(BRANDS)) {
  const light = Object.keys(load(b.light)).sort().join();
  const dark = Object.keys(load(b.dark)).sort().join();
  if (light !== dark) {
    failures++;
    console.error(`FAIL  brand "${name}": light and dark files must override the same tokens`);
  }
}

if (failures) {
  console.error(`\n${failures} problem(s) found in ${checks} contrast checks. Fix the tokens before building.`);
  process.exit(1);
}
console.log(`ARAS contrast check passed: ${checks} pairs across ${Object.keys(THEMES).length} themes meet WCAG 2.2 AA.`);
