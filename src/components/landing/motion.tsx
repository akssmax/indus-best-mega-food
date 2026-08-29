import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

export const motionEase = [0.22, 1, 0.36, 1] as const

export const motionEaseCss = "cubic-bezier(0.22, 1, 0.36, 1)"

/** Shared hero entrance timing — eyebrow → copy → CTAs → image. */
export const heroEntrance = {
  stagger: 0.1,
  delayChildren: 0.06,
  copyDuration: 0.62,
  imageDelay: 0.3,
  imageDuration: 0.82,
} as const

const ease = motionEase

export type MotionWhen = "view" | "mount"

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

function staggerVariants(delay = 0, stagger = 0.09) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay + 0.04 },
    },
  }
}

export const stagger = staggerVariants()

export function Reveal({
  children,
  className,
  delay = 0,
  when = "view",
}: {
  children: ReactNode
  className?: string
  delay?: number
  when?: MotionWhen
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const transition = { duration: 0.6, delay, ease }
  const hidden = { opacity: 0, y: 24 }

  if (when === "mount") {
    return (
      <motion.div
        className={className}
        initial={hidden}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "-40px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
  delay = 0,
  when = "view",
  stagger = 0.09,
}: {
  children: ReactNode
  className?: string
  delay?: number
  when?: MotionWhen
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const variants = staggerVariants(delay, stagger)

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  if (when === "mount") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="show"
        variants={variants}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: "-40px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Staggered per-character reveal — remount or change `text` to replay. */
export function AnimatedCharacters({
  text,
  className,
  startDelay = 0,
  charDelay = 0.024,
}: {
  text: string
  className?: string
  startDelay?: number
  charDelay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  const words = text.split(" ")
  let index = 0

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={`${wordIndex}-${word}`}
          className="inline-block whitespace-nowrap"
          aria-hidden
        >
          {word.split("").map((char) => {
            const i = index++
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "0.32em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.42,
                  delay: startDelay + i * charDelay,
                  ease,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  )
}
