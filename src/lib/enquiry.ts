import { createServerFn } from "@tanstack/react-start"

import { enquiryInterests } from "@/content/landing"
import type { EnquiryInterest } from "@/content/landing"
import { isValidPhone, sanitizePhoneInput } from "@/lib/phone"
import { db } from "@/server/db"
import { enquiries } from "@/server/schema"

export type EnquiryInput = {
  name: string
  company: string
  phone: string
  email: string
  interest: EnquiryInterest
  message: string
  source?: "contact" | "landing"
}

const interestValues = enquiryInterests.map((item) => item.value)

function isInterest(value: string): value is EnquiryInterest {
  return (interestValues as readonly string[]).includes(value)
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: EnquiryInput) => {
    const name = input.name.trim()
    const phone = sanitizePhoneInput(input.phone.trim())
    const email = input.email.trim()
    const company = input.company.trim()
    const message = input.message.trim()

    if (!name || !phone || !email) {
      throw new Error("Name, phone, and email are required.")
    }

    if (!isValidPhone(phone)) {
      throw new Error("Enter a valid phone number.")
    }

    if (!isInterest(input.interest)) {
      throw new Error("Select what you want to set up.")
    }

    return {
      name,
      company,
      phone,
      email,
      interest: input.interest,
      message,
      source: input.source,
    } satisfies EnquiryInput
  })
  .handler(async ({ data }) => {
    const [enquiry] = await db
      .insert(enquiries)
      .values({
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        interest: data.interest,
        message: data.message,
        source: data.source === "landing" ? "landing" : "contact",
      })
      .returning()

    return {
      ok: true as const,
      enquiry: { ...enquiry, createdAt: enquiry.createdAt.toISOString() },
    }
  })
