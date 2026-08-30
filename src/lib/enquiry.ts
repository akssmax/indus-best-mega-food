import { createServerFn } from "@tanstack/react-start"

import { enquiryInterests } from "@/content/landing"
import type { EnquiryInterest } from "@/content/landing"
import { isValidPhone, sanitizePhoneInput } from "@/lib/phone"

export type EnquiryInput = {
  name: string
  company: string
  phone: string
  email: string
  interest: EnquiryInterest
  message: string
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
    } satisfies EnquiryInput
  })
  .handler(async ({ data }) => {
    const enquiry = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new" as const,
      source: "contact" as const,
    }
    console.info("[ibmfp-enquiry]", enquiry)
    return { ok: true as const, enquiry }
  })
