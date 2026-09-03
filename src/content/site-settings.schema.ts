import { z } from "zod"

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

const phoneSchema = z.object({
  label: z.string().min(1),
  number: z.string().min(1),
  href: z.string().min(1),
})

const emailSchema = z.object({
  label: z.string().min(1),
  address: z.string().email(),
  href: z.string().min(1),
})

const addressBlockSchema = z.object({
  label: z.string().min(1),
  lines: z.array(z.string().min(1)).min(1),
})

export const siteSettingsPatchSchema = z
  .object({
    phones: z.array(phoneSchema).optional(),
    emails: z.array(emailSchema).optional(),
    addresses: z
      .object({
        works: addressBlockSchema.optional(),
        corporate: addressBlockSchema.optional(),
        registered: addressBlockSchema.optional(),
      })
      .optional(),
    socials: z.array(linkSchema).optional(),
    nav: z.array(linkSchema).optional(),
    explore: z.array(linkSchema).optional(),
    home: z
      .object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
      })
      .optional(),
  })
  .strict()

export type SiteSettingsPatch = z.infer<typeof siteSettingsPatchSchema>
