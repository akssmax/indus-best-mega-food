import type { EnquiryInterest } from "@/content/landing"
import { enquiryInterests } from "@/content/landing"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const interestStyles: Record<EnquiryInterest, string> = {
  plot: "bg-primary/10 text-primary border-primary/25",
  msme: "bg-cta/15 text-cta-foreground border-cta/30",
  facility: "bg-secondary/60 text-secondary-foreground border-secondary/40",
  jv: "bg-accent text-accent-foreground border-accent-foreground/20",
  other: "bg-muted text-muted-foreground border-border",
}

export function InterestBadge({
  interest,
  className,
}: {
  interest: EnquiryInterest
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-normal", interestStyles[interest], className)}
    >
      {interestLabel(interest)}
    </Badge>
  )
}

export function interestLabel(interest: EnquiryInterest) {
  return enquiryInterests.find((item) => item.value === interest)?.label ?? interest
}
