import { sql } from "drizzle-orm"
import type { JSONContent } from "@tiptap/core"
import type { EnquiryInterest } from "@/content/landing"
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const postStatus = pgEnum("post_status", ["draft", "published"])

export const enquiryStatus = pgEnum("enquiry_status", [
  "new",
  "contacted",
  "qualified",
  "closed",
])

export const enquirySource = pgEnum("enquiry_source", ["contact", "landing"])

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const authors = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  bio: text("bio").notNull().default(""),
  avatarMediaId: uuid("avatar_media_id").references(() => media.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull().default(""),
    contentJson: jsonb("content_json").$type<JSONContent | null>(),
    contentHtml: text("content_html").notNull().default(""),
    featuredImageId: uuid("featured_image_id").references(() => media.id, {
      onDelete: "set null",
    }),
    authorId: uuid("author_id").references(() => authors.id, {
      onDelete: "set null",
    }),
    categoryId: uuid("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    status: postStatus("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    seoTitle: text("seo_title").notNull().default(""),
    seoDescription: text("seo_description").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
  },
  (table) => [
    index("posts_status_idx").on(table.status),
    index("posts_published_at_idx").on(table.publishedAt),
  ],
)

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    company: text("company").notNull().default(""),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    interest: text("interest").$type<EnquiryInterest>().notNull(),
    message: text("message").notNull().default(""),
    status: enquiryStatus("status").notNull().default("new"),
    source: enquirySource("source").notNull().default("contact"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("enquiries_status_idx").on(table.status),
    index("enquiries_created_at_idx").on(table.createdAt),
  ],
)

export type Media = typeof media.$inferSelect
export type Author = typeof authors.$inferSelect
export type Category = typeof categories.$inferSelect
export type Post = typeof posts.$inferSelect
export type Enquiry = typeof enquiries.$inferSelect
