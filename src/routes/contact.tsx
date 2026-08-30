import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { Enquire } from "@/components/landing/enquire"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.contact

export const Route = createFileRoute("/contact")({
  head: () =>
    seoHead({
      title: `Contact | ${site.name}`,
      description: page.description,
      path: "/contact",
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
          replyStat: page.replyStat,
        }}
      />
    </main>
  )
}
