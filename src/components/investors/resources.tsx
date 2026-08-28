import { ArrowUpRightIcon, FileTextIcon } from "lucide-react"

import { investorsPage } from "@/content/investors"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { Badge } from "@/components/ui/badge"

export function InvestorResources() {
  const { brochure, statePolicies } = investorsPage

  return (
    <>
      <Section id={brochure.id} className="bg-secondary/20">
        <Reveal className="max-w-2xl">
          <Eyebrow>Brochure</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{brochure.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {brochure.body}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
          {brochure.pages.map((page, index) => (
            <MotionItem key={page.src}>
              <a
                href={page.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8"
              >
                <img
                  src={page.src}
                  alt={page.alt}
                  className="aspect-[5/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <p className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground">
                  Page {index + 1} — view full size
                  <ArrowUpRightIcon className="size-4 shrink-0 text-primary" />
                </p>
              </a>
            </MotionItem>
          ))}
        </Stagger>
      </Section>

      <Section id={statePolicies.id}>
        <Reveal className="max-w-2xl">
          <Eyebrow>{statePolicies.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{statePolicies.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {statePolicies.body}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statePolicies.items.map((item) => (
            <MotionItem key={`${item.title}-${item.language}`}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-card p-5 ring-1 ring-foreground/8 transition-shadow hover-fine:shadow-[0_12px_32px_rgba(15,43,29,0.08)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileTextIcon className="size-5" aria-hidden />
                  </div>
                  <Badge variant="secondary">{item.language}</Badge>
                </div>
                <p className="mt-4 font-heading text-lg font-semibold leading-snug">
                  {item.title}
                </p>
                <p className="mt-auto pt-4 text-sm font-medium text-primary">
                  Open PDF
                  <ArrowUpRightIcon className="ml-1 inline size-3.5 align-[-2px]" />
                </p>
              </a>
            </MotionItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
