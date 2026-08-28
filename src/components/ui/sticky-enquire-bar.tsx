import { Button } from "@/components/ui/button"

export function StickyEnquireBar({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button
        variant="cta"
        className="h-12 w-full touch-manipulation text-base"
        asChild
      >
        <a href={href}>{label}</a>
      </Button>
    </div>
  )
}
