import { createServerFn } from "@tanstack/react-start"
import { put } from "@vercel/blob"

import { requireAdmin } from "@/server/session.server"
import { db } from "@/server/db"
import { media } from "@/server/schema"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"])

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((formData: FormData) => formData)
  .handler(async ({ data }) => {
    await requireAdmin()

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error(
        "BLOB_READ_WRITE_TOKEN is not set. Add it to .env to enable uploads.",
      )
    }

    const file = data.get("file")
    if (!(file instanceof File)) {
      throw new Error("No file provided.")
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error("Only JPEG, PNG, WebP, or AVIF images are allowed.")
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image must be smaller than 5 MB.")
    }

    const alt = String(data.get("alt") ?? "").trim()
    const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    const [record] = await db
      .insert(media)
      .values({ url: blob.url, alt: alt || file.name })
      .returning()

    return record
  })

export const listMedia = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin()
  return db.select().from(media).orderBy(media.createdAt)
})
