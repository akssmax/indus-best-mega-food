import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { toast } from "sonner"
import { useServerFn } from "@tanstack/react-start"

import { landing, enquiryInterests } from "@/content/landing"
import type { EnquiryInterest } from "@/content/landing"
import { site } from "@/content/site"
import { submitEnquiry } from "@/lib/enquiry"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Reveal } from "@/components/landing/motion"

export function Enquire() {
  const { enquire } = landing
  const submit = useServerFn(submitEnquiry)
  const [interest, setInterest] = useState<EnquiryInterest>("plot")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setPending(true)
    try {
      await submit({
        data: {
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          email: String(formData.get("email") ?? ""),
          interest,
          message: String(formData.get("message") ?? ""),
        },
      })
      form.reset()
      setInterest("plot")
      toast.success(enquire.success)
    } catch {
      toast.error(enquire.error)
    } finally {
      setPending(false)
    }
  }

  return (
    <Section id={enquire.id} className="bg-secondary/30">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <Eyebrow>{enquire.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{enquire.title}</h2>
          <p className="mt-4 text-muted-foreground">{enquire.body}</p>
          <dl className="mt-8 space-y-4 text-sm">
            {site.phones.map((phone) => (
              <div key={phone.href}>
                <dt className="text-muted-foreground">{phone.label}</dt>
                <dd>
                  <a
                    className="font-medium text-primary hover:underline"
                    href={phone.href}
                  >
                    {phone.number}
                  </a>
                </dd>
              </div>
            ))}
            {site.emails.map((email) => (
              <div key={email.href}>
                <dt className="text-muted-foreground">{email.label}</dt>
                <dd>
                  <a
                    className="font-medium text-primary hover:underline"
                    href={email.href}
                  >
                    {email.address}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.08}>
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                Project enquiry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name">
                    <Input id="name" name="name" required autoComplete="name" />
                  </Field>
                  <Field label="Company" htmlFor="company">
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                    />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" htmlFor="phone">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
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
                    <SelectTrigger id="interest" className="w-full">
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
                    placeholder="Plot size, product, or shared facility you need"
                  />
                </Field>
                <Button
                  type="submit"
                  variant="cta"
                  className="h-10"
                  disabled={pending}
                >
                  {pending ? "Sending…" : enquire.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
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
