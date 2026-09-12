import { useSyncExternalStore, type ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

const familiarMark = {
  color: "/brand/branding/familiar/forest/symbol.svg",
  inverse: "/brand/branding/familiar/forest/symbol-inverse.svg",
} as const

const hoverMotion = {
  rest: { scale: 1, y: 0, rotate: 0 },
  hover: { scale: 1.06, y: -1, rotate: -3 },
  tap: { scale: 0.97, y: 0, rotate: 0 },
}

const MotionLink = motion.create(Link)

function subscribeDarkClass(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function useDarkClass() {
  return useSyncExternalStore(
    subscribeDarkClass,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )
}

export function SiteBrandMark({
  tone = "color",
  className,
  imgClassName,
  children,
}: {
  tone?: "color" | "inverse"
  className?: string
  imgClassName?: string
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  const dark = useDarkClass()
  const src = familiarMark[tone === "inverse" || dark ? "inverse" : "color"]

  return (
    <MotionLink
      to="/"
      className={cn(
        "flex min-w-0 items-center rounded-lg outline-none",
        className
      )}
      initial="rest"
      whileHover={reduce ? undefined : "hover"}
      whileTap={reduce ? undefined : "tap"}
    >
      <motion.img
        src={src}
        alt=""
        width={40}
        height={40}
        variants={hoverMotion}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className={cn("h-9 w-auto shrink-0 sm:h-10", imgClassName)}
      />
      {children}
    </MotionLink>
  )
}
