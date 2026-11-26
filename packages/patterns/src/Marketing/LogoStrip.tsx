import * as React from 'react';
import { cn } from '@tamilarasan/aras-ui';

/**
 * LogoStrip pattern
 *
 * A row of partner or customer logos that scrolls slowly in a loop, with soft faded edges.
 * With reduced motion (or `static`), it is a wrapping, still row.
 *
 * Accessibility: a labelled list of images with alt text; the duplicate copy used for the
 * seamless loop is hidden from screen readers. Pauses on hover and focus (WCAG 2.2.2).
 */
export interface LogoStripProps {
  logos: { src: string; alt: string; href?: string }[];
  label?: string;
  static?: boolean;
  className?: string;
}

export function LogoStrip({ logos, label = 'Trusted by', static: isStatic, className }: LogoStripProps) {
  const list = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-[var(--aras-space-2xl)] pr-[var(--aras-space-2xl)]"
      aria-hidden={hidden || undefined}
    >
      {logos.map((l) => {
        const img = <img src={l.src} alt={hidden ? '' : l.alt} className="h-9 w-auto max-w-40 object-contain opacity-80 grayscale" loading="lazy" />;
        return (
          <li key={l.src} className="shrink-0">
            {l.href && !hidden ? (
              <a href={l.href} className="block rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                {img}
              </a>
            ) : (
              img
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <section aria-label={label} className={cn('w-full py-[var(--aras-space-md)]', className)}>
      {isStatic ? (
        <ul className="flex flex-wrap items-center justify-center gap-[var(--aras-space-xl)]">
          {logos.map((l) => (
            <li key={l.src}>
              <img src={l.src} alt={l.alt} className="h-9 w-auto max-w-40 object-contain opacity-80 grayscale" loading="lazy" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,currentColor_12%,currentColor_88%,transparent)]">
          <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:flex-wrap">
            {list(false)}
            {list(true)}
          </div>
        </div>
      )}
    </section>
  );
}
