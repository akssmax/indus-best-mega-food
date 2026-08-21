import { createServerFn } from "@tanstack/react-start"

import { enquiryInterests } from "@/content/landing"
import type { EnquiryInterest } from "@/content/landing"

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
    const phone = input.phone.trim()
    const email = input.email.trim()
    const company = input.company.trim()
    const message = input.message.trim()

    if (!name || !phone || !email) {
      throw new Error("Name, phone, and email are required.")
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
    console.info("[ibmfp-enquiry]", data)
    return { ok: true as const }
  })
