import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Enquire } from "@/components/landing/enquire"

const page = site.innerPages.contact

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${site.name}` },
      { name: "description", content: page.description },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} body={page.body} />
      <Enquire />
    </main>
  )
}
