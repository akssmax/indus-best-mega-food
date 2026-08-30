import { createServerFn } from "@tanstack/react-start"
import { and, count, desc, eq, ne } from "drizzle-orm"
import type { JSONContent } from "@tiptap/core"

import { requireAdmin } from "@/server/session.server"
import { db } from "@/server/db"
import { authors, categories, media, posts } from "@/server/schema"
import type { Post } from "@/server/schema"
import { slugify } from "@/lib/slug"

export type PostWithRelations = Post & {
  author: { id: string; name: string; role: string } | null
  category: { id: string; name: string; slug: string } | null
  featuredImage: { id: string; url: string; alt: string } | null
}

export type PostListItem = {
  id: string
  title: string
  slug: string
  excerpt: string
  status: Post["status"]
  publishedAt: string | null
  updatedAt: string
  author: { id: string; name: string } | null
  category: { id: string; name: string; slug: string } | null
  featuredImage: { id: string; url: string; alt: string } | null
}

const postSelection = {
  id: posts.id,
  title: posts.title,
  slug: posts.slug,
  excerpt: posts.excerpt,
  status: posts.status,
  publishedAt: posts.publishedAt,
  updatedAt: posts.updatedAt,
  author: { id: authors.id, name: authors.name },
  category: { id: categories.id, name: categories.name, slug: categories.slug },
  featuredImage: { id: media.id, url: media.url, alt: media.alt },
} as const

function basePostQuery() {
  return db
    .select(postSelection)
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(media, eq(posts.featuredImageId, media.id))
}

export const listPublishedPosts = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<PostListItem[]> => {
    const conditions = [eq(posts.status, "published")]
    if (data.category) {
      conditions.push(eq(categories.slug, data.category))
    }

    const rows = await basePostQuery()
      .where(and(...conditions))
      .orderBy(desc(posts.publishedAt))

    return rows.map((row) => ({
      ...row,
      publishedAt: row.publishedAt?.toISOString() ?? null,
      updatedAt: row.updatedAt.toISOString(),
    }))
  })

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<PostWithRelations | null> => {
    const rows = await db
      .select({
        post: posts,
        author: { id: authors.id, name: authors.name, role: authors.role },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
        featuredImage: { id: media.id, url: media.url, alt: media.alt },
      })
      .from(posts)
      .leftJoin(authors, eq(posts.authorId, authors.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .leftJoin(media, eq(posts.featuredImageId, media.id))
      .where(and(eq(posts.slug, data.slug), eq(posts.status, "published")))
      .limit(1)

    const row = rows.at(0)
    if (!row) return null
    return {
      ...row.post,
      author: row.author?.id ? row.author : null,
      category: row.category?.id ? row.category : null,
      featuredImage: row.featuredImage?.id ? row.featuredImage : null,
    }
  })

export type CategoryWithUsage = {
  id: string
  name: string
  slug: string
  postCount: number
}

export const listCategories = createServerFn({ method: "GET" }).handler(
  async () => db.select().from(categories).orderBy(categories.name),
)

export const listCategoriesWithUsage = createServerFn({ method: "GET" }).handler(
  async (): Promise<CategoryWithUsage[]> => {
    await requireAdmin()
    const rows = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        postCount: count(posts.id),
      })
      .from(categories)
      .leftJoin(posts, eq(posts.categoryId, categories.id))
      .groupBy(categories.id, categories.name, categories.slug)
      .orderBy(categories.name)

    return rows.map((row) => ({
      ...row,
      postCount: Number(row.postCount),
    }))
  },
)

export const listAuthors = createServerFn({ method: "GET" }).handler(
  async () => db.select().from(authors).orderBy(authors.name),
)

export const listAllPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<PostListItem[]> => {
    await requireAdmin()
    const rows = await basePostQuery().orderBy(desc(posts.updatedAt))
    return rows.map((row) => ({
      ...row,
      publishedAt: row.publishedAt?.toISOString() ?? null,
      updatedAt: row.updatedAt.toISOString(),
    }))
  },
)

export const getPostForEdit = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const rows = await db
      .select({
        post: posts,
        featuredImage: { id: media.id, url: media.url, alt: media.alt },
      })
      .from(posts)
      .leftJoin(media, eq(posts.featuredImageId, media.id))
      .where(eq(posts.id, data.id))
      .limit(1)
    const row = rows.at(0)
    if (!row) return null
    return {
      ...row.post,
      featuredImage: row.featuredImage?.id ? row.featuredImage : null,
    }
  })

export type PostInput = {
  title: string
  slug: string
  excerpt: string
  contentJson: JSONContent | null
  contentHtml: string
  featuredImageId: string | null
  authorId: string | null
  categoryId: string | null
  status: "draft" | "published"
  seoTitle: string
  seoDescription: string
}

function normalizePostInput(input: PostInput) {
  const title = input.title.trim()
  if (!title) throw new Error("Title is required.")

  const slug = slugify(input.slug || title)
  if (!slug) throw new Error("A valid slug is required.")

  return {
    title,
    slug,
    excerpt: input.excerpt.trim(),
    contentJson: input.contentJson ?? null,
    contentHtml: input.contentHtml,
    featuredImageId: input.featuredImageId || null,
    authorId: input.authorId || null,
    categoryId: input.categoryId || null,
    status: input.status,
    seoTitle: input.seoTitle.trim(),
    seoDescription: input.seoDescription.trim(),
  }
}

export const createPost = createServerFn({ method: "POST" })
  .inputValidator((input: PostInput) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const values = normalizePostInput(data)

    const existing = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.slug, values.slug))
      .limit(1)
    if (existing.length > 0) {
      throw new Error(`A post with the slug "${values.slug}" already exists.`)
    }

    const [created] = await db
      .insert(posts)
      .values({
        ...values,
        publishedAt:
          values.status === "published" ? new Date() : null,
      })
      .returning({ id: posts.id })

    return created
  })

export const updatePost = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string } & PostInput) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const values = normalizePostInput(data)

    const existing = await db
      .select({ id: posts.id })
      .from(posts)
      .where(and(eq(posts.slug, values.slug), ne(posts.id, data.id)))
      .limit(1)
    if (existing.length > 0) {
      throw new Error(`A post with the slug "${values.slug}" already exists.`)
    }

    const currentRows = await db
      .select({ status: posts.status, publishedAt: posts.publishedAt })
      .from(posts)
      .where(eq(posts.id, data.id))
      .limit(1)
    const current = currentRows.at(0)
    if (!current) throw new Error("Post not found.")

    const publishedAt =
      values.status === "published"
        ? (current.publishedAt ?? new Date())
        : current.publishedAt

    await db
      .update(posts)
      .set({ ...values, publishedAt, updatedAt: new Date() })
      .where(eq(posts.id, data.id))

    return { ok: true as const }
  })

export const setPostStatus = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; status: "draft" | "published" }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    await db
      .update(posts)
      .set({
        status: data.status,
        publishedAt:
          data.status === "published" ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, data.id))
    return { ok: true as const }
  })

export const deletePost = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    await db.delete(posts).where(eq(posts.id, data.id))
    return { ok: true as const }
  })

export const createCategory = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const name = data.name.trim()
    if (!name) throw new Error("Category name is required.")
    const slug = slugify(name)
    if (!slug) throw new Error("Category name is required.")

    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1)
    if (existing[0]) throw new Error("A category with this name already exists.")

    const [created] = await db
      .insert(categories)
      .values({ name, slug })
      .returning()
    return created
  })

export const deleteCategory = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const [usage] = await db
      .select({ postCount: count() })
      .from(posts)
      .where(eq(posts.categoryId, data.id))
    if (Number(usage?.postCount ?? 0) > 0) {
      throw new Error("This category is still used by a post.")
    }
    await db.delete(categories).where(eq(categories.id, data.id))
    return { ok: true as const }
  })

export const createAuthor = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; role?: string }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const name = data.name.trim()
    if (!name) throw new Error("Author name is required.")
    const [created] = await db
      .insert(authors)
      .values({ name, role: data.role?.trim() ?? "" })
      .returning()
    return created
  })
