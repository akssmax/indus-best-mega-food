import { landing } from "@/content/landing"
import { ClientMarquee } from "@/components/landing/logo-strip"
import { PlatformSection } from "@/components/landings/platform/section-shell"

export function PlatformTrustBand() {
  const { clients } = landing

  return (
    <PlatformSection
      aria-label={clients.label}
      className="border-y border-border bg-card py-10 lg:py-12"
    >
      <ClientMarquee label={clients.label} />
    </PlatformSection>
  )
}
