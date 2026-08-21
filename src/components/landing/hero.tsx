import { motion, useReducedMotion } from "framer-motion"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { fadeUp, stagger } from "@/components/landing/motion"
import { WaterBackground } from "@/components/landing/water-background"

export function Hero() {
  const { hero } = landing
  const reduce = useReducedMotion()

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-forest">
      <motion.img
        src={hero.image.src}
        alt={hero.image.alt}
        className="absolute inset-0 size-full object-cover"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
      />
      <WaterBackground
        colorBack="#0f2b1d"
        colorHighlight="#c8a84e"
        opacity={0.25}
        className="pointer-events-auto absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-r from-forest/95 via-forest/78 to-forest/35" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pt-28 pb-20 sm:px-6 lg:justify-center lg:px-8 lg:pb-24">
        <motion.div
          className="max-w-2xl text-forest-foreground"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow className="text-cta">{hero.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg"
            variants={fadeUp}
          >
            {hero.body}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <Button variant="cta" className="h-11 px-5 text-base" asChild>
              <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
            </Button>
            <Button
              variant="outline"
              className="h-11 border-forest-foreground/30 bg-transparent px-5 text-base text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground"
              asChild
            >
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </motion.div>
          <motion.div
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            variants={fadeUp}
          >
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-forest-foreground/15 bg-forest-foreground/5 px-4 py-3"
              >
                <p className="font-heading text-lg font-semibold text-cta sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-xs text-forest-foreground/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
