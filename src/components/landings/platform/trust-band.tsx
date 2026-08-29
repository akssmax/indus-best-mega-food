import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { ClientMarquee } from "@/components/landing/logo-strip"
import { Reveal } from "@/components/landing/motion"
import { PlatformSection } from "@/components/landings/platform/section-shell"

export function PlatformTrustBand() {
  const { trust } = landings.platform
  const { clients } = landing

  return (
    <PlatformSection
      aria-label={clients.label}
      className="border-y border-border bg-card py-10 lg:py-12"
    >
      <Reveal className="text-center">
        <p className="font-heading text-xs font-medium tracking-[0.22em] text-primary uppercase">
          {trust.eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-xl font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {trust.title}
        </h2>
      </Reveal>
      <ClientMarquee label={clients.label} className="mt-6" />
    </PlatformSection>
  )
}
