import {
  BeakerIcon,
  BoltIcon,
  BugIcon,
  ClipboardCheckIcon,
  DropletsIcon,
  FlameIcon,
  FlaskConicalIcon,
  IndianRupeeIcon,
  LandPlotIcon,
  MapIcon,
  MicroscopeIcon,
  PercentIcon,
  PlugZapIcon,
  RecycleIcon,
  ScaleIcon,
  Share2Icon,
  ShieldCheckIcon,
  WarehouseIcon,
  WaypointsIcon,
  type LucideIcon,
} from "lucide-react"

import { campusDetail } from "@/content/campus"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { PatternBand, PatternCorner } from "@/components/ui/brand-pattern"
import { CampusImg } from "@/components/ui/campus-img"
import { SectionBand } from "@/lib/section-band"
import { facilityCategoryStyles } from "@/lib/facility-categories"
import { landingImageSizes } from "@/lib/media"
import { cn } from "@/lib/utils"

const utilityGroupMeta: Record<
  (typeof campusDetail.utilities.groups)[number]["title"],
  { icon: LucideIcon; palette: (typeof facilityCategoryStyles)[keyof typeof facilityCategoryStyles] }
> = {
  Water: { icon: DropletsIcon, palette: facilityCategoryStyles.cold },
  Power: { icon: BoltIcon, palette: facilityCategoryStyles.packaging },
  "Effluent & sewage": {
    icon: RecycleIcon,
    palette: facilityCategoryStyles.processing,
  },
  "Site infrastructure": {
    icon: MapIcon,
    palette: facilityCategoryStyles.utilities,
  },
}

const assuranceCards = {
  lab: {
    title: "Quality assurance lab",
    icon: BeakerIcon,
    palette: facilityCategoryStyles.quality,
    itemIcons: {
      "On-line Quality Control Lab": ClipboardCheckIcon,
      "Microbiological Lab": MicroscopeIcon,
      "Product & PM Development Lab": FlaskConicalIcon,
      "SE Lab": ShieldCheckIcon,
      "Pesticide Residue Lab (project stage)": BeakerIcon,
    } satisfies Record<(typeof campusDetail.assurance.labs)[number], LucideIcon>,
  },
  controls: {
    title: "Operational controls",
    icon: ShieldCheckIcon,
    palette: facilityCategoryStyles.packaging,
    itemIcons: {
      "Park-wide firefighting network": FlameIcon,
      "Pest control across the processing zone": BugIcon,
      "100 MT electronic modular weighbridge at entry": ScaleIcon,
      "Batch-level traceability through storage and processing": WaypointsIcon,
    } satisfies Record<
      (typeof campusDetail.assurance.controls)[number],
      LucideIcon
    >,
  },
} as const

const scaleBlockMeta = {
  plots: {
    icon: LandPlotIcon,
    palette: facilityCategoryStyles.processing,
    itemIcons: {
      "₹66 lakh per acre — ₹3 lakh upfront, balance at registration": IndianRupeeIcon,
      "Stamp duty exemption under Chhattisgarh Industrial Policy": PercentIcon,
      "Water, power, ETP, STP, and roads at plot boundary": PlugZapIcon,
    } satisfies Record<(typeof campusDetail.scale.plots.items)[number], LucideIcon>,
  },
  sheds: {
    icon: WarehouseIcon,
    palette: facilityCategoryStyles.packaging,
    itemIcons: {
      "₹1,500 per sqm per annum on lease": IndianRupeeIcon,
      "Power and water connected — plug-and-play occupation": PlugZapIcon,
      "Shared lab, weighbridge, storage, and ETP on site": Share2Icon,
    } satisfies Record<(typeof campusDetail.scale.sheds.items)[number], LucideIcon>,
  },
} as const

function CampusScale() {
  const { scale } = campusDetail

  return (
    <SectionBand tone="secondary-25" from="background" to="background">
      <Section id={scale.id} className="bg-transparent">
        <Reveal className="max-w-2xl">
          <Eyebrow>{scale.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{scale.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{scale.body}</p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {scale.stats.map((stat) => (
            <MotionItem key={stat.label}>
              <div className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8">
                <p className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </MotionItem>
          ))}
        </Stagger>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {(
            [
              { block: scale.plots, meta: scaleBlockMeta.plots },
              { block: scale.sheds, meta: scaleBlockMeta.sheds },
            ] as const
          ).map(({ block, meta }) => {
            const BlockIcon = meta.icon

            return (
              <Reveal key={block.title}>
                <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8 lg:p-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl",
                        meta.palette.well
                      )}
                    >
                      <BlockIcon className="size-5" aria-hidden strokeWidth={2.25} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold">{block.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {block.items.map((item) => {
                      const ItemIcon = meta.itemIcons[item]

                      return (
                        <li key={item} className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex size-7 shrink-0 items-center justify-center rounded-lg",
                              meta.palette.item
                            )}
                          >
                            <ItemIcon className="size-3.5" aria-hidden strokeWidth={2.25} />
                          </span>
                          <span className="min-w-0 text-sm leading-relaxed text-foreground/90">
                            {item}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </SectionBand>
  )
}

function GroundProof() {
  const { groundProof } = campusDetail

  return (
    <Section id={groundProof.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{groundProof.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{groundProof.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {groundProof.body}
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {groundProof.items.map((item) => (
          <MotionItem key={item.title}>
            <article className="h-full overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8">
              <div className="relative aspect-[16/10] overflow-hidden">
                <CampusImg
                  src={item.image.src}
                  alt={item.image.alt}
                  sizes={landingImageSizes.card}
                  className="size-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </article>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}

function CollectionNetwork() {
  const { collection } = campusDetail

  return (
    <Section id={collection.id} className="relative overflow-hidden">
      <PatternBand
        variant="hatch"
        className="pointer-events-none absolute inset-0 text-primary/25"
        patternClassName="opacity-[0.08]"
      />

      <div className="relative z-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>{collection.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{collection.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{collection.body}</p>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {collection.centres.map((centre) => (
            <MotionItem key={centre.name}>
              <article className="relative h-full overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-foreground/8">
                <PatternCorner
                  variant="bloom"
                  position="top-right"
                  size="md"
                  className="text-primary opacity-[0.09]"
                />
                <div className="relative z-10">
                  <h3 className="font-heading text-lg font-semibold">{centre.name}</h3>
                  {"subtitle" in centre && centre.subtitle ? (
                    <p className="mt-1 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      {centre.subtitle}
                    </p>
                  ) : null}
                  <ul className="mt-5 space-y-2">
                    {centre.specs.map((spec) => (
                      <li
                        key={spec}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

function CampusUtilities() {
  const { utilities } = campusDetail

  return (
    <SectionBand tone="secondary-30" from="background" to="background">
      <Section id={utilities.id} className="bg-transparent">
        <Reveal className="max-w-2xl">
          <Eyebrow>{utilities.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{utilities.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{utilities.body}</p>
        </Reveal>

        <Reveal className="mt-10 overflow-hidden rounded-2xl">
          <CampusImg
            src={utilities.image.src}
            alt={utilities.image.alt}
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
          {utilities.groups.map((group) => {
            const meta = utilityGroupMeta[group.title]
            const Icon = meta.icon

            return (
            <MotionItem key={group.title}>
              <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl",
                      meta.palette.well
                    )}
                  >
                    <Icon className="size-5" aria-hidden strokeWidth={2.25} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </MotionItem>
            )
          })}
        </Stagger>
      </Section>
    </SectionBand>
  )
}

function CampusAssurance() {
  const { assurance } = campusDetail
  const labCard = assuranceCards.lab
  const controlsCard = assuranceCards.controls

  return (
    <Section id={assurance.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{assurance.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{assurance.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{assurance.body}</p>
      </Reveal>

      <Reveal className="mt-10 overflow-hidden rounded-2xl">
        <CampusImg
          src={assurance.image.src}
          alt={assurance.image.alt}
          sizes="(min-width: 1024px) 72rem, 100vw"
          className="aspect-[16/10] w-full object-cover lg:max-h-[22rem]"
        />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8 lg:p-8">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  labCard.palette.well
                )}
              >
                <labCard.icon className="size-5" aria-hidden strokeWidth={2.25} />
              </div>
              <h3 className="font-heading text-lg font-semibold">{labCard.title}</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              {assurance.labs.map((lab) => {
                const ItemIcon = labCard.itemIcons[lab]

                return (
                  <li key={lab} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-lg",
                        labCard.palette.item
                      )}
                    >
                      <ItemIcon className="size-3.5" aria-hidden strokeWidth={2.25} />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 text-sm leading-relaxed",
                        lab.includes("project stage")
                          ? "text-muted-foreground"
                          : "text-foreground/90"
                      )}
                    >
                      {lab}
                    </span>
                  </li>
                )
              })}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.06}>
          <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8 lg:p-8">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  controlsCard.palette.well
                )}
              >
                <controlsCard.icon className="size-5" aria-hidden strokeWidth={2.25} />
              </div>
              <h3 className="font-heading text-lg font-semibold">
                {controlsCard.title}
              </h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              {assurance.controls.map((control) => {
                const ItemIcon = controlsCard.itemIcons[control]

                return (
                  <li key={control} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-lg",
                        controlsCard.palette.item
                      )}
                    >
                      <ItemIcon className="size-3.5" aria-hidden strokeWidth={2.25} />
                    </span>
                    <span className="min-w-0 text-sm leading-relaxed text-foreground/90">
                      {control}
                    </span>
                  </li>
                )
              })}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}

export function CampusDetail() {
  return (
    <>
      <CampusScale />
      <GroundProof />
      <CollectionNetwork />
      <CampusUtilities />
      <CampusAssurance />
    </>
  )
}
