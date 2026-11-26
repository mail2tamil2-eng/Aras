// ARAS lint rules. These are what stop people (and AI tools) from going around the system.
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

const HEX = '#[0-9a-fA-F]{3,8}\\b';
const RAW_SIZE = '\\[-?\\d+(\\.\\d+)?(px|rem|em)\\]';
const DEFAULT_PALETTE =
  '\\b(bg|text|border|ring|outline|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\\d{2,3}\\b';

const tokenRules = [
  { selector: `Literal[value=/${HEX}/]`, message: 'ARAS: no raw hex colours. Use a token class such as bg-surface or text-fg.' },
  { selector: `TemplateElement[value.raw=/${HEX}/]`, message: 'ARAS: no raw hex colours. Use a token class such as bg-surface or text-fg.' },
  { selector: `Literal[value=/${RAW_SIZE}/]`, message: 'ARAS: no raw px/rem values. Use a token, for example p-[var(--aras-space-md)].' },
  { selector: `Literal[value=/${DEFAULT_PALETTE}/]`, message: 'ARAS: Tailwind default colours are disabled. Use semantic classes (bg-primary, text-danger-fg).' },
];

export default tseslint.config(
  { ignores: ['**/dist/**', '**/storybook-static/**', '**/node_modules/**', '**/.turbo/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-restricted-syntax': ['error', ...tokenRules],
    },
  },
  {
    // Products and patterns must use ARAS components, not Radix directly.
    files: ['packages/patterns/**/*.{ts,tsx}', 'apps/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@radix-ui/*'], message: 'Import from @tamilarasan/aras-ui instead of Radix directly.' },
            { group: ['**/packages/ui/src/**'], message: 'Import from @tamilarasan/aras-ui, not from its source folders.' },
          ],
        },
      ],
    },
  },
);
