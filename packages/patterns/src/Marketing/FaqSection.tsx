import * as React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, cn } from '@tamilarasan/aras-ui';

/**
 * FaqSection pattern
 *
 * A heading, optional description and questions in an Accordion. Layouts: `outlined` (a card per
 * question) and `flush` (divider lines). Questions use h3 under the section's h2.
 */
export interface FaqSectionProps {
  title?: string;
  description?: string;
  items: { question: string; answer: React.ReactNode }[];
  variant?: 'outlined' | 'flush';
  /** Question open on load. */
  defaultOpen?: number;
  className?: string;
}

export function FaqSection({
  title = 'Frequently asked questions',
  description,
  items,
  variant = 'outlined',
  defaultOpen,
  className,
}: FaqSectionProps) {
  const headingId = React.useId();
  return (
    <section aria-labelledby={headingId} className={cn('mx-auto flex w-full max-w-3xl flex-col gap-[var(--aras-space-xl)]', className)}>
      <div className="flex flex-col gap-[var(--aras-space-xs)] text-center">
        <h2 id={headingId} className="text-h2 text-fg">
          {title}
        </h2>
        {description && <p className="text-body text-fg-secondary">{description}</p>}
      </div>
      <Accordion type="single" collapsible variant={variant} defaultValue={defaultOpen != null ? `faq-${defaultOpen}` : undefined}>
        {items.map((item, i) => (
          <AccordionItem key={item.question} value={`faq-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
