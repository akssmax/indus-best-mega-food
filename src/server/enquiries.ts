import { createServerFn } from "@tanstack/react-start"
import { desc, eq } from "drizzle-orm"

import { requireAdmin } from "@/server/session.server"
import { db } from "@/server/db"
import { enquiries } from "@/server/schema"
import type { Enquiry } from "@/server/schema"

export type { Enquiry }

function serialize(row: Enquiry) {
  return { ...row, createdAt: row.createdAt.toISOString() }
}

export const listEnquiries = createServerFn({ method: "GET" }).handler(
  async () => {
    await requireAdmin()
    const rows = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt))
    return rows.map(serialize)
  },
)

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { id: string; status: "new" | "contacted" | "qualified" | "closed" }) =>
      input,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const rows = await db
      .update(enquiries)
      .set({ status: data.status })
      .where(eq(enquiries.id, data.id))
      .returning()
    const updated = rows.at(0)
    return updated ? serialize(updated) : null
  })

export const updateEnquiryNotes = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; notes: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const rows = await db
      .update(enquiries)
      .set({ notes: data.notes })
      .where(eq(enquiries.id, data.id))
      .returning()
    const updated = rows.at(0)
    return updated ? serialize(updated) : null
  })
