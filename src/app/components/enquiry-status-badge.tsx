import type { EnquiryStatus } from "@/app/lib/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusConfig: Record<
  EnquiryStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  contacted: {
    label: "Contacted",
    className: "bg-chart-4/15 text-chart-4 border-chart-4/25",
  },
  qualified: {
    label: "Qualified",
    className: "bg-chart-2/15 text-chart-2 border-chart-2/25",
  },
  closed: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function EnquiryStatusBadge({
  status,
  className,
}: {
  status: EnquiryStatus
  className?: string
}) {
  const config = statusConfig[status]
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}

export const enquiryStatusOptions = (
  Object.entries(statusConfig) as [EnquiryStatus, (typeof statusConfig)[EnquiryStatus]][]
).map(([value, config]) => ({
  value,
  label: config.label,
}))
