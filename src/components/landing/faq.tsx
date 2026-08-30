import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

export function Faq({ embedded = false }: { embedded?: boolean }) {
  const { faq } = landing

  return (
    <Section id={faq.id} className={cn("bg-transparent", embedded && "py-8 lg:py-10")}>
        <Reveal className="max-w-2xl">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{faq.title}</h2>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <Accordion
            type="single"
            collapsible
            className={cn(
              embedded
                ? "px-6 sm:px-8"
                : "rounded-2xl bg-card px-6 ring-1 ring-foreground/8 sm:px-8"
            )}
          >
            {faq.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-4 text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>{item.answer}</p>
                  {"link" in item && item.link ? (
                    <p className="mt-3">
                      <a href={item.link.href} className="text-primary hover:underline">
                        {item.link.label}
                      </a>
                    </p>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8">
            <Button
              variant="secondary"
              className="h-11 w-full px-6 text-base sm:w-auto"
              asChild
            >
              <a href={faq.cta.href}>{faq.cta.label}</a>
            </Button>
          </div>
        </Reveal>
      </Section>
  )
}
