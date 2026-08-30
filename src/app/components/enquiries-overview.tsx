import { useMemo } from "react"
import type { ComponentType, SVGProps } from "react"
import {
  ArchiveBoxIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  InboxStackIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

import type { EnquiryRecord, EnquiryStatus } from "@/app/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type StatConfig = {
  label: string
  value: number
  accent?: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  iconClassName?: string
}

function countByStatus(enquiries: EnquiryRecord[], status: EnquiryStatus) {
  return enquiries.filter((item) => item.status === status).length
}

function countThisWeek(enquiries: EnquiryRecord[]) {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return enquiries.filter((item) => new Date(item.createdAt) >= weekAgo).length
}

export function EnquiriesOverview({
  enquiries,
  loading,
}: {
  enquiries: EnquiryRecord[]
  loading: boolean
}) {
  const stats = useMemo(
    () => ({
      total: enquiries.length,
      new: countByStatus(enquiries, "new"),
      contacted: countByStatus(enquiries, "contacted"),
      qualified: countByStatus(enquiries, "qualified"),
      closed: countByStatus(enquiries, "closed"),
      thisWeek: countThisWeek(enquiries),
    }),
    [enquiries],
  )

  if (loading) {
    return (
      <div className="rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="grid grid-cols-2 gap-px bg-border/60 md:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-card px-4 py-4 md:px-5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="mt-2 h-7 w-10" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const primaryStats: StatConfig[] = [
    { label: "Total", value: stats.total, icon: InboxStackIcon },
    {
      label: "New",
      value: stats.new,
      accent: "text-primary",
      icon: SparklesIcon,
      iconClassName: "text-primary",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      accent: "text-chart-4",
      icon: ChatBubbleLeftRightIcon,
      iconClassName: "text-chart-4",
    },
    {
      label: "Qualified",
      value: stats.qualified,
      accent: "text-chart-2",
      icon: CheckBadgeIcon,
      iconClassName: "text-chart-2",
    },
    {
      label: "Closed",
      value: stats.closed,
      icon: ArchiveBoxIcon,
    },
    {
      label: "This week",
      value: stats.thisWeek,
      accent: "text-cta",
      icon: CalendarDaysIcon,
      iconClassName: "text-cta",
    },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
      <div className="grid grid-cols-2 gap-px bg-border/60 md:grid-cols-3 xl:grid-cols-6">
        {primaryStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card px-4 py-4 md:px-5">
              <div className="flex items-center gap-1.5">
                <Icon
                  className={cn(
                    "size-3.5 shrink-0 text-muted-foreground",
                    stat.iconClassName,
                  )}
                />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <p
                className={cn(
                  "mt-1 text-2xl font-semibold tracking-tight tabular-nums",
                  stat.accent,
                )}
              >
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
