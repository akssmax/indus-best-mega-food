import { InboxIcon, NewspaperIcon } from "lucide-react"

export const appNav = [
  {
    title: "Enquiries",
    href: "/app/enquiries",
    icon: InboxIcon,
  },
  {
    title: "Posts",
    href: "/app/posts",
    icon: NewspaperIcon,
  },
] as const

export type AppNavItem = (typeof appNav)[number]
