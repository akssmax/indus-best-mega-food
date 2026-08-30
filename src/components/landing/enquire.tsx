import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { toast } from "sonner"
import { useServerFn } from "@tanstack/react-start"

import { landing, enquiryInterests } from "@/content/landing"
import type { EnquiryInterest } from "@/content/landing"
import { submitEnquiry } from "@/lib/enquiry"
import { isValidPhone, sanitizePhoneInput } from "@/lib/phone"
import { saveEnquiry } from "@/app/lib/enquiry-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eyebrow, Section } from "@/components/landing/section"
import { LogoStrip } from "@/components/landing/logo-strip"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Reveal } from "@/components/landing/motion"
import { PatternBand } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

type EnquireIntro = {
  eyebrow: string
  title: string
  body: string
  replyStat?: {
    value: string
    label: string
  }
}

export function Enquire({
  variant = "section",
  intro,
}: {
  variant?: "section" | "hero"
  intro?: EnquireIntro
}) {
  const { enquire } = landing
  const submit = useServerFn(submitEnquiry)
  const [interest, setInterest] = useState<EnquiryInterest>("plot")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const phone = sanitizePhoneInput(String(formData.get("phone") ?? ""))

    if (!isValidPhone(phone)) {
      toast.error(enquire.phoneInvalid)
      return
    }

    setPending(true)
    try {
      const result = await submit({
        data: {
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          phone,
          email: String(formData.get("email") ?? ""),
          interest,
          message: String(formData.get("message") ?? ""),
        },
      })
      if (result.enquiry) {
        await saveEnquiry({
          ...result.enquiry,
          source: "contact",
        })
      }
      form.reset()
      setInterest("plot")
      toast.success(enquire.success)
    } catch {
      toast.error(enquire.error)
    } finally {
      setPending(false)
    }
  }

  const headline = intro ?? {
    eyebrow: enquire.eyebrow,
    title: enquire.title,
    body: enquire.body,
  }
  const isHero = variant === "hero"

  const copy = (
    <Reveal>
      <Eyebrow className={isHero ? "text-cta" : undefined}>{headline.eyebrow}</Eyebrow>
      {isHero ? (
        <h1 className="mt-4 max-w-xl text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-[3.25rem]">
          {headline.title}
        </h1>
      ) : (
        <h2 className="mt-3 text-3xl sm:text-4xl">{headline.title}</h2>
      )}
      <p
        className={cn(
          "mt-4",
          isHero ? "max-w-lg text-base leading-relaxed text-forest-foreground/85 sm:text-lg" : "text-muted-foreground"
        )}
      >
        {headline.body}
      </p>
      {headline.replyStat ? (
        <ReplyStatBadge stat={headline.replyStat} hero={isHero} />
      ) : null}
    </Reveal>
  )

  const form = (
    <Reveal delay={0.08}>
      <Card className={isHero ? "shadow-[0_24px_56px_rgba(15,43,29,0.22)]" : undefined}>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Project enquiry</CardTitle>
        </CardHeader>
        <CardContent>
          <EnquireForm
            interest={interest}
            setInterest={setInterest}
            pending={pending}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </Reveal>
  )

  const grid = (
    <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      {copy}
      {form}
    </div>
  )

  if (isHero) {
    return (
      <section
        id={enquire.id}
        data-hero
        className="relative z-10 -mt-14 flex min-h-dvh flex-col overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"
      >
        <OceanBackground
          tone="forest"
          placement="fill"
          scale={1.75}
          hoverZoom={1.12}
          interaction="morph"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-6%] size-72 rounded-full bg-cta/15 blur-3xl"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:py-24 xl:px-8">
          {grid}
          <Reveal className="mt-14 lg:mt-20" delay={0.12}>
            <LogoStrip variant="minimal" tone="forest" />
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <Section id={enquire.id} className="relative overflow-hidden">
      <PatternBand
        variant="rain"
        className="pointer-events-none absolute inset-0 text-primary/15"
        patternClassName="opacity-[0.07]"
      />
      {grid}
    </Section>
  )
}

function ReplyStatBadge({
  stat,
  hero,
}: {
  stat: { value: string; label: string }
  hero: boolean
}) {
  return (
    <p className="mt-6">
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-2 ring-1 backdrop-blur-sm",
          hero
            ? "bg-forest-foreground/10 ring-forest-foreground/15"
            : "bg-muted ring-foreground/10"
        )}
      >
        <span
          className={cn(
            "font-heading text-sm font-semibold",
            hero ? "text-cta" : "text-primary"
          )}
        >
          {stat.value}
        </span>
        <span
          className={cn(
            "text-xs",
            hero ? "text-forest-foreground/75" : "text-muted-foreground"
          )}
        >
          {stat.label}
        </span>
      </span>
    </p>
  )
}

function EnquireForm({
  interest,
  setInterest,
  pending,
  onSubmit,
}: {
  interest: EnquiryInterest
  setInterest: (value: EnquiryInterest) => void
  pending: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const { enquire } = landing

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={enquire.namePlaceholder}
            className="h-11"
          />
        </Field>
        <Field label="Company" htmlFor="company">
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={enquire.companyPlaceholder}
            className="h-11"
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone">
          <PhoneInput
            id="phone"
            name="phone"
            required
            placeholder={enquire.phonePlaceholder}
            className="h-11"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={enquire.emailPlaceholder}
            className="h-11"
          />
        </Field>
      </div>
      <Field label="Interest" htmlFor="interest">
        <Select
          value={interest}
          onValueChange={(value) => {
            if (value) setInterest(value as EnquiryInterest)
          }}
        >
          <SelectTrigger id="interest" size="lg" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {enquiryInterests.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Message" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          placeholder={enquire.messagePlaceholder}
        />
      </Field>
      <Button type="submit" variant="cta" className="h-11 touch-target" disabled={pending}>
        {pending ? "Sending…" : enquire.submit}
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}
