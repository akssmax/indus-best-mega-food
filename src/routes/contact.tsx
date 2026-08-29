import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
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
      <Enquire
        variant="hero"
        intro={{
          eyebrow: page.eyebrow,
          title: page.title,
          body: page.body,
        }}
      />
    </main>
  )
}
