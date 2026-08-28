import { landing } from "@/content/landing"
import { PatternBand } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .split(/[\s&/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function ClientMark({ name, logo }: { name: string; logo?: string }) {
  return (
    <span className="flex h-14 shrink-0 items-center gap-3 px-2">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-10 w-auto max-w-[11rem] object-contain object-left"
        />
      ) : (
        <>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 font-heading text-xs font-semibold tracking-wide text-primary">
            {initials(name)}
          </span>
          <span className="whitespace-nowrap font-heading text-sm font-semibold tracking-tight text-foreground/70">
            {name}
          </span>
        </>
      )}
    </span>
  )
}

export function LogoStrip() {
  const { clients } = landing

  if (clients.items.length === 0) return null

  const loop = [...clients.items, ...clients.items]

  return (
    <section
      aria-label={clients.label}
      className="relative overflow-hidden border-b border-border/50 bg-card"
    >
      <PatternBand
        variant="flow"
        className="pointer-events-none absolute inset-0 text-primary/15"
        patternClassName="opacity-[0.06]"
      />
      <div className="relative z-10 w-full py-5">
        <p className="mb-4 text-center text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
          {clients.label}
        </p>
        <div
          className={cn(
            "relative w-full overflow-hidden",
            "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
          )}
        >
          <div className="flex w-max items-center gap-10 py-1 motion-safe:animate-logo-marquee motion-safe:hover-fine:[animation-play-state:paused] sm:gap-12 lg:gap-16">
            {loop.map((client, index) => (
              <ClientMark
                key={`${client.name}-${index}`}
                name={client.name}
                logo={client.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
