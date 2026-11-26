import * as React from 'react';
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  PlayIcon,
  QuoteIcon,
  cn,
} from '@tamilarasan/aras-ui';

/**
 * TestimonialCard pattern
 *
 * A customer quote with the author's name, role and photo. Optional video: YouTube links open in a
 * Modal with an embedded player; other links open in a new tab. `bordered` adds the card border.
 *
 * Accessibility: the quote is a <figure> with <blockquote> and <figcaption>; the video button
 * names the person ("Watch Felin Kale's story"); the embed has a title; new-tab links say so.
 */
export interface TestimonialCardProps {
  quote: string;
  author: { name: string; role?: string; src?: string };
  videoUrl?: string;
  bordered?: boolean;
  className?: string;
}

function youTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m?.[1];
}

export function TestimonialCard({ quote, author, videoUrl, bordered = true, className }: TestimonialCardProps) {
  const ytId = videoUrl ? youTubeId(videoUrl) : undefined;
  const watchLabel = `Watch ${author.name}'s story`;

  return (
    <figure
      className={cn(
        'flex flex-col gap-[var(--aras-space-lg)]',
        bordered && 'rounded-card border border-border bg-surface p-[var(--aras-space-lg)] transition-colors hover:border-border-strong',
        className,
      )}
    >
      <QuoteIcon className="size-6 text-brand" />
      <blockquote className="text-body text-fg">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex flex-wrap items-center gap-[var(--aras-space-sm)]">
        <Avatar name={author.name} src={author.src} size="md" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-small font-semibold text-fg">{author.name}</span>
          {author.role && <span className="text-small text-fg-secondary">{author.role}</span>}
        </span>
        {videoUrl &&
          (ytId ? (
            <Modal>
              <ModalTrigger asChild>
                <Button variant="secondary" size="sm" leftIcon={<PlayIcon />}>
                  {watchLabel}
                </Button>
              </ModalTrigger>
              <ModalContent size="xl">
                <ModalHeader>
                  <ModalTitle>{watchLabel}</ModalTitle>
                  <ModalDescription>{author.role}</ModalDescription>
                </ModalHeader>
                <div className="aspect-video w-full bg-fg">
                  <iframe
                    className="size-full"
                    src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1`}
                    title={watchLabel}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </ModalContent>
            </Modal>
          ) : (
            <Button asChild variant="secondary" size="sm" leftIcon={<PlayIcon />}>
              <a href={videoUrl} target="_blank" rel="noreferrer">
                {watchLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          ))}
      </figcaption>
    </figure>
  );
}
