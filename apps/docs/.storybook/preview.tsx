import type { Preview } from '@storybook/react-vite';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-tamil/400.css';
import '@fontsource/noto-sans-tamil/600.css';
import '../src/styles.css';

// Toolbar switches: theme (light/dark), product brand, and density.
// They set data-* attributes on <html>, exactly like a real product does.
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour mode',
      toolbar: { title: 'Theme', icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true },
    },
    brand: {
      description: 'Product brand',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'base', title: 'Base (ARAS)' },
          { value: 'lms', title: 'LMS' },
          { value: 'food', title: 'What to Cook Today?' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Density',
      toolbar: { title: 'Density', icon: 'component', items: ['comfortable', 'compact'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light', brand: 'base', density: 'comfortable' },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      const brand = (context.parameters.brand as string | undefined) ?? context.globals.brand;
      root.dataset.theme = context.globals.theme;
      root.dataset.density = context.globals.density;
      if (brand && brand !== 'base') root.dataset.brand = brand;
      else delete root.dataset.brand;
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    // WCAG checks run on every story. 'error' makes violations fail in CI test runs.
    a11y: { test: 'error' },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Primitives', 'Patterns'] },
    },
  },
};

export default preview;
