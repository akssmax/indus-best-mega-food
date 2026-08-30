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
import { cn } from "@/lib/utils"

export function LandingEnquireForm({ className }: { className?: string }) {
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
          source: "landing",
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

  return (
    <form className={cn("grid gap-4", className)} onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="landing-name">
          <Input
            id="landing-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={enquire.namePlaceholder}
            className="h-12 text-base"
          />
        </Field>
        <Field label="Company" htmlFor="landing-company">
          <Input
            id="landing-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={enquire.companyPlaceholder}
            className="h-12 text-base"
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" htmlFor="landing-phone">
          <PhoneInput
            id="landing-phone"
            name="phone"
            required
            placeholder={enquire.phonePlaceholder}
            className="h-12 text-base"
          />
        </Field>
        <Field label="Email" htmlFor="landing-email">
          <Input
            id="landing-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={enquire.emailPlaceholder}
            className="h-12 text-base"
          />
        </Field>
      </div>
      <Field label="Interest" htmlFor="landing-interest">
        <Select
          value={interest}
          onValueChange={(value) => {
            if (value) setInterest(value as EnquiryInterest)
          }}
        >
          <SelectTrigger id="landing-interest" size="xl" className="w-full">
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
      <Field label="Message" htmlFor="landing-message">
        <Textarea
          id="landing-message"
          name="message"
          placeholder={enquire.messagePlaceholder}
          className="min-h-28 text-base"
        />
      </Field>
      <Button
        type="submit"
        variant="cta"
        className="h-12 touch-manipulation text-base"
        disabled={pending}
      >
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
