import { createFileRoute } from "@tanstack/react-router"

import { PostsTable } from "@/app/components/posts-table"
import { listAllPosts } from "@/server/posts"

export const Route = createFileRoute("/app/_authenticated/posts/")({
  loader: () => listAllPosts(),
  head: () => ({
    meta: [{ title: "Posts | Team dashboard" }],
  }),
  component: PostsPage,
})

function PostsPage() {
  const posts = Route.useLoaderData()
  return <PostsTable posts={posts} />
}
