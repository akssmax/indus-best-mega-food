import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const contactLinkClass =
  "-ml-2 flex min-h-11 w-full max-w-md touch-manipulation items-center rounded-lg px-3 font-medium text-primary transition-colors outline-none hover:bg-primary/8 active:bg-primary/12 focus-visible:ring-3 focus-visible:ring-ring/50"

export function ContactPhoneLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a href={href} className={cn(contactLinkClass, className)}>
      {children}
    </a>
  )
}

export function ContactEmailLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        contactLinkClass,
        "break-all [overflow-wrap:anywhere] sm:break-words",
        className
      )}
    >
      {children}
    </a>
  )
}
