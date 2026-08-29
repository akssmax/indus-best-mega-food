import { InboxIcon } from "lucide-react"

export const appNav = [
  {
    title: "Enquiries",
    href: "/app/enquiries",
    icon: InboxIcon,
  },
] as const

export type AppNavItem = (typeof appNav)[number]
