import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { eq } from "drizzle-orm"

import * as schema from "./schema"
import { authors, categories, media, posts } from "./schema"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Run with: npm run db:seed")
  process.exit(1)
}

const db = drizzle({ client: neon(databaseUrl), schema })

const contentJson = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Construction at Indus Best Mega Food Park in Raipur is moving into its most visible phase yet. The core processing blocks are up, internal roads are being paved, and the first utility connections are live.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "What is ready today" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Units can already begin fit-outs in the first block while shared infrastructure continues to come online around them.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ready-to-build plots with power, water, and drainage at the plot boundary",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A common effluent treatment plant designed for food processing loads",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Cold storage and warehousing capacity available on flexible terms",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Built for food businesses" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Every shared facility on campus is specified for food-grade operations — from the quality testing lab to the steam and refrigeration backbone. The goal is simple: you focus on your product, and the park takes care of the infrastructure.",
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A mega food park only works if the shared services genuinely lower your cost of production. That is the benchmark we build against.",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "If you are planning a new processing unit or expanding an existing one, get in touch — site visits run every week.",
        },
      ],
    },
  ],
}

const contentHtml = `<p>Construction at Indus Best Mega Food Park in Raipur is moving into its most visible phase yet. The core processing blocks are up, internal roads are being paved, and the first utility connections are live.</p><h2>What is ready today</h2><p>Units can already begin fit-outs in the first block while shared infrastructure continues to come online around them.</p><ul><li><p>Ready-to-build plots with power, water, and drainage at the plot boundary</p></li><li><p>A common effluent treatment plant designed for food processing loads</p></li><li><p>Cold storage and warehousing capacity available on flexible terms</p></li></ul><h2>Built for food businesses</h2><p>Every shared facility on campus is specified for food-grade operations — from the quality testing lab to the steam and refrigeration backbone. The goal is simple: you focus on your product, and the park takes care of the infrastructure.</p><blockquote><p>A mega food park only works if the shared services genuinely lower your cost of production. That is the benchmark we build against.</p></blockquote><p>If you are planning a new processing unit or expanding an existing one, get in touch — site visits run every week.</p>`

async function main() {
  const authorRows = await db
    .insert(authors)
    .values({
      name: "Indus Best Team",
      role: "Campus updates",
      bio: "The team building Chhattisgarh's mega food park in Raipur.",
    })
    .onConflictDoNothing()
    .returning()
  const author = authorRows.at(0)

  const categoryValues = [
    { name: "Campus updates", slug: "campus-updates" },
    { name: "Food processing", slug: "food-processing" },
  ]
  const insertedCategories = await db
    .insert(categories)
    .values(categoryValues)
    .onConflictDoNothing()
    .returning()

  const allCategories = await db.select().from(categories)
  const campusCategory =
    insertedCategories.find((c) => c.slug === "campus-updates") ??
    allCategories.find((c) => c.slug === "campus-updates")

  const imageRows = await db
    .insert(media)
    .values({
      url: "/images/warehouse.jpg",
      alt: "Warehousing inside the Indus Best Mega Food Park campus",
    })
    .returning()
  const image = imageRows.at(0)
  if (!image) throw new Error("Failed to seed media row.")

  const existing = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.slug, "campus-progress-what-is-ready"))
    .limit(1)

  if (existing.length > 0) {
    console.log("Sample post already exists, skipping.")
    return
  }

  await db.insert(posts).values({
    title: "Campus progress: what is ready at the food park right now",
    slug: "campus-progress-what-is-ready",
    excerpt:
      "The core processing blocks are up, utilities are live, and units can begin fit-outs. A quick look at what is ready on campus today.",
    contentJson,
    contentHtml,
    featuredImageId: image.id,
    authorId: author?.id ?? null,
    categoryId: campusCategory?.id ?? null,
    status: "published",
    publishedAt: new Date(),
    seoTitle: "Campus progress at Indus Best Mega Food Park",
    seoDescription:
      "Core processing blocks are up and utilities are live at Indus Best Mega Food Park, Raipur. See what is ready for food processing units today.",
  })

  console.log("Seeded: 1 author, 2 categories, 1 published post.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
