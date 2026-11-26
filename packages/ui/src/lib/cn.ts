import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge the ARAS token names, so `text-h1` (size) and `text-fg` (colour)
// are not treated as the same kind of class.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'h1', 'h2', 'h3', 'body', 'small', 'caption'],
      radius: ['control', 'card', 'overlay', 'pill'],
      shadow: ['card', 'dropdown', 'toast', 'modal'],
    },
  },
});

/** Merge class names, with later ARAS classes winning over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
