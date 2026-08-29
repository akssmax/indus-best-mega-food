import { Location } from "@/components/landing/location"
import { Faq } from "@/components/landing/faq"
import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"

export function PlatformLocationFaq() {
  return (
    <section className={cn("bg-secondary/25", contentGutterClass, "py-16 lg:py-24")}>
      <div className={cn(contentContainerClass, "space-y-8")}>
        <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          <Location bandFrom={null} embedded />
        </div>
        <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          <Faq embedded />
        </div>
      </div>
    </section>
  )
}
