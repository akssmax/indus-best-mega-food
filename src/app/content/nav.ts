import { InboxIcon, LayoutTemplateIcon, NewspaperIcon, SettingsIcon } from "lucide-react"

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
  {
    title: "Home page",
    href: "/app/pages/home",
    icon: LayoutTemplateIcon,
  },
  {
    title: "Settings",
    href: "/app/settings",
    icon: SettingsIcon,
  },
] as const

export type AppNavItem = (typeof appNav)[number]
