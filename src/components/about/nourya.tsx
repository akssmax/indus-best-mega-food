import { aboutPage } from "@/content/about"
import { Button } from "@/components/ui/button"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

export function AboutNourya() {
  const { nourya } = aboutPage

  return (
    <Section id={nourya.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{nourya.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{nourya.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{nourya.body}</p>
      </Reveal>

      <Reveal className="mt-8" delay={0.06}>
        <ul className="flex flex-wrap gap-2">
          {nourya.lines.map((line) => (
            <li
              key={line}
              className="rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground"
            >
              {line}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-8 flex flex-col items-start gap-3 sm:flex-row" delay={0.1}>
        <Button variant="cta" className="h-11 px-5 text-base" asChild>
          <a href={nourya.primaryCta.href}>{nourya.primaryCta.label}</a>
        </Button>
        <Button variant="outline" className="h-11 px-5 text-base" asChild>
          <a
            href={nourya.shopCta.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {nourya.shopCta.label}
          </a>
        </Button>
      </Reveal>
    </Section>
  )
}
