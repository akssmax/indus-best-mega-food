import { createFileRoute, notFound } from "@tanstack/react-router"

import { PostEditor } from "@/app/components/post-editor"
import { getPostForEdit, listAuthors, listCategoriesWithUsage } from "@/server/posts"

export const Route = createFileRoute("/app/_authenticated/posts/$postId")({
  loader: async ({ params }) => {
    const [post, authors, categories] = await Promise.all([
      getPostForEdit({ data: { id: params.postId } }),
      listAuthors(),
      listCategoriesWithUsage(),
    ])
    if (!post) throw notFound()
    return { post, authors, categories }
  },
  head: () => ({
    meta: [{ title: "Edit post | Team dashboard" }],
  }),
  component: EditPostPage,
})

function EditPostPage() {
  const { post, authors, categories } = Route.useLoaderData()
  return (
    <PostEditor
      key={post.id}
      post={post}
      authors={authors}
      categories={categories}
    />
  )
}
