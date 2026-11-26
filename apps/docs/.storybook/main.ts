import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

const fromRoot = (path: string) => fileURLToPath(new URL(`../../../${path}`, import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)', '../../../packages/*/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  // Demo images (covers, logos) used by card and marketing stories.
  staticDirs: ['../public'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { defaultName: 'Docs' },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        // Use component source directly, so edits show instantly without rebuilding packages.
        alias: {
          '@tamilarasan/aras-ui': fromRoot('packages/ui/src/index.ts'),
          '@tamilarasan/aras-patterns': fromRoot('packages/patterns/src/index.ts'),
        },
      },
    });
  },
};

export default config;
