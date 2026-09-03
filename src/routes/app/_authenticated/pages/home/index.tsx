import { createFileRoute } from "@tanstack/react-router"

import { HomeSectionsList } from "@/app/components/content/home-sections-list"
import { listHomeSections } from "@/server/content"

export const Route = createFileRoute("/app/_authenticated/pages/home/")({
  loader: async () => ({
    sections: await listHomeSections(),
  }),
  head: () => ({
    meta: [{ title: "Home page | Team dashboard" }],
  }),
  component: HomeSectionsPage,
})

function HomeSectionsPage() {
  const { sections } = Route.useLoaderData()
  return <HomeSectionsList initialSections={sections} />
}
