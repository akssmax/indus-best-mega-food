import { cn } from "@/lib/utils"

export function MintHeroGradient({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("mint-hero-bg absolute inset-0", className)}>
      <div className="absolute -top-24 -left-24 size-72 rounded-full bg-white/10 blur-3xl sm:size-96" />
      <div className="absolute top-1/3 -right-16 size-64 rounded-full bg-aqua/20 blur-3xl sm:size-80" />
      <div className="absolute -bottom-32 left-1/3 size-80 rounded-full bg-accent/15 blur-3xl sm:size-96" />
    </div>
  )
}
