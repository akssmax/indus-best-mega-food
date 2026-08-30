import { createFileRoute } from "@tanstack/react-router"

import { PostEditor } from "@/app/components/post-editor"
import { listAuthors, listCategoriesWithUsage } from "@/server/posts"

export const Route = createFileRoute("/app/_authenticated/posts/new")({
  loader: async () => {
    const [authors, categories] = await Promise.all([
      listAuthors(),
      listCategoriesWithUsage(),
    ])
    return { authors, categories }
  },
  head: () => ({
    meta: [{ title: "New post | Team dashboard" }],
  }),
  component: NewPostPage,
})

function NewPostPage() {
  const { authors, categories } = Route.useLoaderData()
  return <PostEditor post={null} authors={authors} categories={categories} />
}
