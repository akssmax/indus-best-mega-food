import { createFileRoute, notFound } from "@tanstack/react-router"

import { HomeSectionEditor } from "@/app/components/content/home-section-editor"
import {
  HOME_SECTION_DEFINITION_MAP,
  HOME_SECTION_KEYS,
  type HomeSectionKey,
} from "@/content/home-sections.registry"
import { getHomeSectionForEdit } from "@/server/content"

export const Route = createFileRoute("/app/_authenticated/pages/home/$sectionKey")({
  loader: async ({ params }) => {
    if (!HOME_SECTION_KEYS.includes(params.sectionKey as HomeSectionKey)) {
      throw notFound()
    }
    const section = await getHomeSectionForEdit({
      data: { key: params.sectionKey as HomeSectionKey },
    })
    if (!section) throw notFound()
    return section
  },
  head: ({ params }) => ({
    meta: [
      {
        title: `${HOME_SECTION_DEFINITION_MAP[params.sectionKey as HomeSectionKey]?.label ?? "Section"} | Home page`,
      },
    ],
  }),
  component: EditHomeSectionPage,
})

function EditHomeSectionPage() {
  const section = Route.useLoaderData()
  return (
    <HomeSectionEditor
      key={section.key}
      sectionKey={section.key}
      label={section.label}
      defaults={section.defaults}
      patch={section.patch}
    />
  )
}
