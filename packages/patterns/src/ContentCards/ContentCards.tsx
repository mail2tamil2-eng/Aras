import * as React from 'react';
import { Avatar, Card, cn } from '@tamilarasan/aras-ui';

/**
 * Content cards for blogs and marketing pages.
 *
 * - FeaturedCard: cover image on top, title, excerpt and author row (a featured article).
 * - BlogCard: list tile; thumbnail beside the text from `sm` up, stacked on phones.
 * - FeatureCard: a product feature: title and body first, image below.
 *
 * With `href`, the whole card is one link (the title is the link; the card area extends it),
 * so screen readers hear one clear link name. Cover images zoom gently on hover (off with reduced motion).
 * Images need meaningful `imageAlt`, or "" when decorative.
 */
interface BaseCardProps {
  title: string;
  excerpt?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
}

export interface FeaturedCardProps extends BaseCardProps {
  author?: { name: string; src?: string };
  date?: string;
  category?: string;
}

function CardLink({ href, title }: { href?: string; title: string }) {
  if (!href) return <>{title}</>;
  return (
    <a
      href={href}
      className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
    >
      {title}
    </a>
  );
}

function Cover({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  if (!src) return null;
  return (
    <div className={cn('overflow-hidden bg-surface-sunken', className)}>
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  );
}

function Byline({ author, date }: { author?: { name: string; src?: string }; date?: string }) {
  if (!author && !date) return null;
  return (
    <div className="flex items-center gap-[var(--aras-space-xs)] text-small text-fg-secondary">
      {author && <Avatar name={author.name} src={author.src} size="xs" />}
      {author && <span className="font-medium text-fg">{author.name}</span>}
      {author && date && <span aria-hidden="true">·</span>}
      {date && <time>{date}</time>}
    </div>
  );
}

export function FeaturedCard({ title, excerpt, imageSrc, imageAlt, href, author, date, category, className }: FeaturedCardProps) {
  return (
    <Card className={cn('group relative overflow-hidden hover:border-border-strong', className)}>
      <Cover src={imageSrc} alt={imageAlt} className="aspect-video" />
      <div className="flex flex-1 flex-col gap-[var(--aras-space-sm)] p-[var(--aras-space-lg)]">
        {category && <p className="text-caption font-semibold uppercase tracking-wide text-brand">{category}</p>}
        <h3 className="text-h3 text-fg">
          <CardLink href={href} title={title} />
        </h3>
        {excerpt && <p className="line-clamp-3 text-body text-fg-secondary">{excerpt}</p>}
        <div className="mt-auto pt-[var(--aras-space-xs)]">
          <Byline author={author} date={date} />
        </div>
      </div>
    </Card>
  );
}

export type BlogCardProps = FeaturedCardProps;

export function BlogCard({ title, excerpt, imageSrc, imageAlt, href, author, date, category, className }: BlogCardProps) {
  return (
    <Card className={cn('group relative overflow-hidden hover:border-border-strong sm:flex-row', className)}>
      <Cover src={imageSrc} alt={imageAlt} className="aspect-video sm:aspect-auto sm:w-56 sm:shrink-0" />
      <div className="flex flex-1 flex-col gap-[var(--aras-space-xs)] p-[var(--aras-space-md)]">
        {category && <p className="text-caption font-semibold uppercase tracking-wide text-brand">{category}</p>}
        <h3 className="text-body font-semibold text-fg">
          <CardLink href={href} title={title} />
        </h3>
        {excerpt && <p className="line-clamp-2 text-small text-fg-secondary">{excerpt}</p>}
        <div className="mt-auto pt-[var(--aras-space-xs)]">
          <Byline author={author} date={date} />
        </div>
      </div>
    </Card>
  );
}

export type FeatureCardProps = BaseCardProps;

export function FeatureCard({ title, excerpt, imageSrc, imageAlt, href, className }: FeatureCardProps) {
  return (
    <Card className={cn('group relative overflow-hidden hover:border-border-strong', className)}>
      <div className="flex flex-col gap-[var(--aras-space-xs)] p-[var(--aras-space-lg)]">
        <h3 className="text-h3 text-fg">
          <CardLink href={href} title={title} />
        </h3>
        {excerpt && <p className="text-body text-fg-secondary">{excerpt}</p>}
      </div>
      {imageSrc && (
        <div className="mt-auto bg-surface-sunken px-[var(--aras-space-lg)] pt-[var(--aras-space-lg)]">
          <Cover src={imageSrc} alt={imageAlt} className="aspect-video rounded-t-control border border-b-0 border-border" />
        </div>
      )}
    </Card>
  );
}
