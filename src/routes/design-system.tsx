import { createFileRoute, Link } from "@tanstack/react-router"

import { site } from "@/content/site"
import { fontPairings } from "@/lib/fonts"
import { useTheme } from "@/lib/theme"
import { seoHead } from "@/lib/seo"
import { Eyebrow, Section } from "@/components/landing/section"
import { ThemeSelector } from "@/components/theme/theme-selector"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { CampusHotspots } from "@/components/ui/campus-hotspots"
import { ProcessingChips } from "@/components/ui/processing-chips"
import { CollectionGauge } from "@/components/ui/collection-gauge"
import { ProcessFlow } from "@/components/ui/process-flow"
import { StatusSeal } from "@/components/ui/status-seal"
import { UtilityMeters } from "@/components/ui/utility-meters"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { LogoStrip } from "@/components/landing/logo-strip"
import {
  BandHero,
  DropHero,
  CampusHero,
  FrameHero,
  MarkHero,
  heroVariantMeta,
  heroVariants,
} from "@/components/landing/heroes"
import { DropFlourish, PatternBand, WaveEdge } from "@/components/ui/brand-pattern"
import {
  SiteFooter,
  footerVariantMeta,
  footerVariants,
} from "@/components/layout/site-footer"
import { IslandNav } from "@/components/layout/headers/island-nav"
import { SnapCarousel, SnapSlide } from "@/components/ui/snap-carousel"
import { SpecTable } from "@/components/ui/spec-table"
import { PullQuote } from "@/components/ui/pull-quote"
import { CaptionGallery } from "@/components/ui/caption-gallery"
import { DesignSystemLayout } from "@/components/design-system/design-system-layout"
import { HeroBgTuner } from "@/components/design-system/hero-bg-tuner"
import { landingSkins } from "@/lib/skins"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/design-system")({
  head: () =>
    seoHead({
      title: `Design system | ${site.name}`,
      description:
        "Colour, type, and component tokens for Indus Best Mega Food Park.",
      path: "/design-system",
      noindex: true,
    }),
  component: DesignSystemPage,
})

const colors = [
  {
    name: "Primary",
    token: "--primary",
    className: "bg-primary text-primary-foreground",
    note: "Brand colour. Harvest keeps the logo green; Canal, Copper, Sage, and Umber each use their own primary.",
  },
  {
    name: "Secondary",
    token: "--secondary",
    className: "bg-secondary text-secondary-foreground",
    note: "Aqua wash from the water drop. Cold chain, supporting surfaces.",
  },
  {
    name: "CTA",
    token: "--cta",
    className: "bg-cta text-cta-foreground",
    note: "Conversion colour. Harvest amber, logo green, or sky — follows the selected palette.",
  },
  {
    name: "Forest",
    token: "--forest",
    className: "bg-forest text-forest-foreground",
    note: "Deep band for hero, final CTA, and overlays. Harvest keeps logo green; other palettes shift with the scheme.",
  },
  {
    name: "Aqua",
    token: "--aqua",
    className: "bg-aqua text-forest",
    note: "Logo water drop. Accents and data, not body text.",
  },
  {
    name: "Background",
    token: "--background",
    className: "bg-background text-foreground ring-1 ring-border",
    note: "Warm cream. Page canvas — not cold gray.",
  },
  {
    name: "Card",
    token: "--card",
    className: "bg-card text-card-foreground ring-1 ring-border",
    note: "Raised surfaces on cream.",
  },
  {
    name: "Muted",
    token: "--muted",
    className: "bg-muted text-muted-foreground",
    note: "Secondary labels and quiet bands.",
  },
  {
    name: "Destructive",
    token: "--destructive",
    className: "bg-destructive/15 text-destructive",
    note: "Errors and destructive actions.",
  },
] as const

const typeRows = [
  { label: "Display", className: "font-heading text-5xl font-semibold", sample: "A ready campus." },
  { label: "H1", className: "font-heading text-4xl font-semibold", sample: "Food manufacturing" },
  { label: "H2", className: "font-heading text-3xl font-semibold", sample: "Inside the campus" },
  { label: "H3", className: "font-heading text-xl font-semibold", sample: "Plug-and-play sheds" },
  { label: "Body", className: "font-sans text-base", sample: "Headings and UI follow the selected pairing." },
  { label: "Small", className: "font-sans text-sm text-muted-foreground", sample: "Captions, tables, helper text." },
  {
    label: "Eyebrow",
    className: "font-heading text-xs font-medium tracking-[0.22em] text-primary uppercase",
    sample: "Mega Food Park",
  },
] as const

const patternDemos = [
  {
    variant: "rain" as const,
    name: "Rain",
    note: "The logo drop, tiled and slightly turned — like weather over the belt.",
    surface: "bg-forest text-forest-foreground",
    pattern: "text-forest-foreground",
  },
  {
    variant: "bloom" as const,
    name: "Bloom",
    note: "Six drops around a seed. Crop, cluster, collection.",
    surface: "bg-primary text-primary-foreground",
    pattern: "text-primary-foreground",
  },
  {
    variant: "vein" as const,
    name: "Vein",
    note: "Mirrored veined drops in a damask repeat — leaf structure, not a plain tile.",
    surface: "bg-background text-foreground ring-1 ring-border",
    pattern: "text-primary",
  },
  {
    variant: "flow" as const,
    name: "Flow",
    note: "Parallel currents. Process lines, water, and movement.",
    surface: "bg-secondary text-secondary-foreground",
    pattern: "text-aqua",
  },
  {
    variant: "lattice" as const,
    name: "Lattice",
    note: "Hex field with drops at each node. Plot geometry, not a square grid.",
    surface: "bg-cta text-cta-foreground",
    pattern: "text-cta-foreground",
  },
  {
    variant: "ripple" as const,
    name: "Ripple",
    note: "Concentric drop outlines. Process water, intake, and flow.",
    surface: "bg-aqua/15 text-foreground ring-1 ring-aqua/25",
    pattern: "text-aqua opacity-[0.28]",
  },
  {
    variant: "scatter" as const,
    name: "Scatter",
    note: "Drops at different scales and angles. Seed scatter across the belt.",
    surface: "bg-muted text-foreground ring-1 ring-border",
    pattern: "text-primary",
  },
  {
    variant: "hatch" as const,
    name: "Hatch",
    note: "Diagonal construction lines. Industrial campus bands.",
    surface: "bg-muted text-foreground ring-1 ring-border",
    pattern: "text-foreground",
  },
] as const

function DesignSystemPage() {
  const { theme } = useTheme()
  const activePairing =
    fontPairings.find((pairing) => pairing.id === theme.font) ?? fontPairings[0]

  return (
    <main>
      <DesignSystemLayout>
      <Section id="introduction">
        <Eyebrow>IBMFP</Eyebrow>
        <h1 className="mt-3 text-4xl sm:text-5xl">Design system</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Forest and aqua from the mark. Harvest amber is one conversion option
          among five palettes — pick a theme below to restyle the whole site,
          including the homepage. Tokens live in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            src/styles.css
          </code>
          .
        </p>
        <Button variant="outline" className="mt-6" asChild>
          <Link to="/">Back to the park</Link>
        </Button>
      </Section>

      <Section className="bg-muted/50" id="theme">
        <Eyebrow>Theme</Eyebrow>
        <h2 className="mt-3 text-3xl">Show the client a direction.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Five palettes built on color theory — Harvest (split-complementary
          amber), Canal (analogous teal/sky), Copper (warm split-comp), Sage
          (monochromatic green), and Umber (earth gold). Each palette shifts
          the deep band, brand primary, and conversion colour together.
        </p>
        <ThemeSelector className="mt-8" />
      </Section>

      <Section className="bg-muted/50" id="color">
        <Eyebrow>Colour</Eyebrow>
        <h2 className="mt-3 text-3xl">Tokens</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Primary and CTA follow the selected palette. Harvest keeps the logo
          green and amber; Canal, Copper, Sage, and Umber each shift the brand
          colour as well as the conversion colour.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <Card key={color.token} size="sm">
              <div
                className={`mx-(--card-spacing) h-20 rounded-lg ${color.className}`}
              />
              <CardHeader>
                <CardTitle>{color.name}</CardTitle>
                <CardDescription>
                  <code>{color.token}</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{color.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="type">
        <Eyebrow>Typography</Eyebrow>
        <h2 className="mt-3 text-3xl">{activePairing.label}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {activePairing.heading} for headings, {activePairing.body} for UI.
          Change the pairing in{" "}
          <a href="#theme" className="text-primary underline-offset-4 hover:underline">
            Theme
          </a>
          . It is stored in this browser and applies site-wide.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Role</TableHead>
                <TableHead>Sample</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeRows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="text-muted-foreground">
                    {row.label}
                  </TableCell>
                  <TableCell>
                    <span className={row.className}>{row.sample}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section className="bg-secondary/30" id="buttons">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 text-3xl">Buttons</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Use <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">cta</code>{" "}
          for enquire and plot requests — the fill follows the selected palette.
          Use{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">default</code>{" "}
          for brand-green actions that are not the primary conversion.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="cta">Enquire for a plot</Button>
          <Button>Brand default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="cta" disabled>
            Disabled
          </Button>
        </div>
        <Separator className="my-8" />
        <h3 className="text-xl">Sizes</h3>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
        <Separator className="my-8" />
        <h3 className="text-xl">Badges</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>Primary</Badge>
          <Badge variant="secondary">PPC Durg</Badge>
          <Badge variant="outline">60 km · Airport</Badge>
          <Badge variant="destructive">Alert</Badge>
        </div>
      </Section>

      <Section id="forms">
        <Eyebrow>Forms</Eyebrow>
        <h2 className="mt-3 text-3xl">Inputs</h2>
        <Card className="mt-8 max-w-xl">
          <CardHeader>
            <CardTitle>Project enquiry</CardTitle>
            <CardDescription>Same fields as the landing form.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-1.5">
                <Label htmlFor="ds-name">Name</Label>
                <Input id="ds-name" placeholder="Full name" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="ds-interest">Interest</Label>
                <Select defaultValue="plot">
                  <SelectTrigger id="ds-interest" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plot">Developed plot</SelectItem>
                    <SelectItem value="msme">MSME shed</SelectItem>
                    <SelectItem value="facility">Shared facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="ds-message">Message</Label>
                <Textarea id="ds-message" placeholder="Plot size or product" />
              </div>
              <Button variant="cta" type="submit">
                Send enquiry
              </Button>
            </form>
          </CardContent>
        </Card>
      </Section>

      <Section className="bg-muted/50" id="data">
        <Eyebrow>Data</Eyebrow>
        <h2 className="mt-3 text-3xl">Tabs, table, accordion</h2>
        <Tabs defaultValue="processing" className="mt-8">
          <TabsList variant="line">
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="cold">Cold chain</TabsTrigger>
          </TabsList>
          <TabsContent value="processing" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Output</TableHead>
                  <TableHead className="text-right">Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Tomato</TableCell>
                  <TableCell>Paste / concentrate</TableCell>
                  <TableCell className="text-right">12 MTPH</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mango</TableCell>
                  <TableCell>Paste / puree</TableCell>
                  <TableCell className="text-right">6 MTPH</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="cold" className="mt-4">
            <p className="text-sm text-muted-foreground">
              5,000 MT cold storage across −20°C and 0–10°C chambers.
            </p>
          </TabsContent>
        </Tabs>
        <Accordion
          type="single"
          className="mt-8 max-w-xl"
          defaultValue="ppc"
        >
          <AccordionItem value="ppc">
            <AccordionTrigger>Primary processing centres</AccordionTrigger>
            <AccordionContent>
              Durg, Bilaspur, and Abhanpur (New Raipur) feed the Raipur campus.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="plots">
            <AccordionTrigger>Plots and plug-and-play</AccordionTrigger>
            <AccordionContent>
              Around 30–35 developed plots and 16 MSME sheds.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section id="logo-strip" className="pb-0">
        <Eyebrow>Social proof</Eyebrow>
        <h2 className="mt-3 text-3xl">LogoStrip</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Full-width client marquee used between hero and Why. Client logos and
          labels come from <code>landing.clients</code>. The track pauses on
          hover for fine pointers and respects reduced motion.
        </p>
      </Section>
      <LogoStrip />

      <Section id="bento">
        <Eyebrow>Bento visuals</Eyebrow>
        <h2 className="mt-3 text-3xl">Campus components</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Interactive pieces used in the Why grid. Forest, aqua, and harvest
          amber only — no generic icon wells.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card id="campus-hotspots" className="scroll-mt-24 overflow-hidden p-0">
            <div className="p-5">
              <CardTitle>CampusHotspots</CardTitle>
              <CardDescription className="mt-1">
                Photo with live spec pins. Hover a pin to lift it.
              </CardDescription>
            </div>
            <div className="px-5 pb-5">
              <CampusHotspots
                src="/images/warehouse.jpg"
                alt="Warehouse sheds"
                className="h-48"
                pins={[
                  { label: "16 sheds", x: "30%", y: "35%", tone: "cta" },
                  { label: "Utilities", x: "70%", y: "68%", tone: "primary" },
                ]}
              />
            </div>
          </Card>
          <Card id="processing-chips" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>ProcessingChips</CardTitle>
              <CardDescription>
                Select a line to show throughput. Used on shared processing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProcessingChips
                items={[
                  { label: "Tomato", hint: "12 MTPH", tone: "cta", icon: "tomato" },
                  { label: "Mango", hint: "6 MTPH", tone: "primary", icon: "mango" },
                  { label: "IQF", hint: "2 MT/H", tone: "aqua", icon: "iqf" },
                  { label: "Pack house", hint: "10 MT/H", tone: "primary", icon: "pack" },
                ]}
              />
            </CardContent>
          </Card>
          <Card id="collection-gauge" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>CollectionGauge</CardTitle>
              <CardDescription>
                Arc meter with animated fill, count-up value, live badge, and
                staggered site chips. Respects reduced motion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CollectionGauge
                value="3"
                unit="centres"
                sites={["Durg", "Bilaspur", "Abhanpur"]}
              />
            </CardContent>
          </Card>
          <Card id="process-flow" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>ProcessFlow</CardTitle>
              <CardDescription>
                Sequential steps with icon wells and staggered entrance. Icons loop gently; respects reduced motion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProcessFlow
                steps={[
                  { title: "Frozen", detail: "−20°C · 1,500 MT", tone: "aqua", icon: "frozen" },
                  { title: "Chilled", detail: "0–10°C · 3,500 MT", tone: "primary", icon: "chilled" },
                  { title: "IQF", detail: "2 MT/H", tone: "cta", icon: "iqf" },
                ]}
              />
            </CardContent>
          </Card>
          <Card id="status-seal" className="scroll-mt-24">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>LiveIndicator</CardTitle>
                <LiveIndicator />
              </div>
              <CardDescription>
                Pulse for shared capacity. Respects reduced motion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StatusSeal kicker="MOFPI" title="2014 · Operational" />
              <p className="mt-3 text-sm text-muted-foreground">
                StatusSeal is a vertical scheme credential card with shield
                mark and live operational badge.
              </p>
            </CardContent>
          </Card>
          <Card id="utility-meters" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>UtilityMeters</CardTitle>
              <CardDescription>
                Utility capacity with icon wells, animated fill bars, and
                staggered entrance. Respects reduced motion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UtilityMeters
                items={[
                  { label: "Process water", value: "2.7 MLD", fill: 86, tone: "aqua", icon: "water" },
                  { label: "ETP & STP", value: "Centralised", fill: 72, tone: "primary", icon: "effluent" },
                  { label: "Weighbridge", value: "100 MT", fill: 64, tone: "cta", icon: "weighbridge" },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="skins">
        <Eyebrow>Landing skins</Eyebrow>
        <h2 className="mt-3 text-3xl">Locked palettes for the experiments.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          These do not follow the theme picker. Each landing wraps in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            data-skin
          </code>{" "}
          and owns its header.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {landingSkins.map((skin) => (
            <Card key={skin.id} size="sm">
              <CardHeader>
                <CardTitle>{skin.label}</CardTitle>
                <CardDescription>{skin.note}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="h-11 touch-manipulation" asChild>
                  <Link to={skin.href}>Open {skin.label}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="headers">
        <Eyebrow>Headers</Eyebrow>
        <h2 className="mt-3 text-3xl">Island nav, touch-first.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Used on the Night landing experiment. Open{" "}
          <Link to="/landing-3" className="font-medium text-foreground underline-offset-4 hover:underline">
            /landing-3
          </Link>{" "}
          to see it over real content — the frame below is a structural demo on
          the live theme.
        </p>
        <div className="mt-10 overflow-hidden rounded-xl ring-1 ring-border">
          <div className="bg-forest pb-6">
            <p className="px-4 pt-4 text-xs font-medium tracking-[0.18em] text-cta uppercase">
              Island
            </p>
            <IslandNav />
          </div>
        </div>
        <Separator className="my-10" />
        <h3 className="text-xl">Spec table, snap strip, pull quote</h3>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <SpecTable
            rows={[
              { label: "Acres", value: "67" },
              { label: "MSME sheds", value: "16" },
              { label: "Cold", value: "5,000 MT" },
            ]}
          />
          <PullQuote cite="Indus Best Mega Food Park">
            You install the equipment. The campus already has the land.
          </PullQuote>
        </div>
        <SnapCarousel className="mt-8">
          {["Plots", "Sheds", "Cold chain"].map((label) => (
            <SnapSlide key={label}>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>Snap on mobile, grid on desktop.</CardDescription>
                </CardHeader>
              </Card>
            </SnapSlide>
          ))}
        </SnapCarousel>
        <div className="mt-8">
          <CaptionGallery
            items={[
              {
                src: "/images/warehouse.jpg",
                alt: "Warehouse",
                caption: "Warehouse",
              },
              {
                src: "/images/aseptic-line.jpg",
                alt: "Aseptic line",
                caption: "Aseptic line",
              },
              {
                src: "/images/admin-lab.jpg",
                alt: "Labs",
                caption: "Labs",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="hero-bg" className="scroll-mt-24">
        <Eyebrow>Debug · temporary</Eyebrow>
        <h2 className="mt-3 text-3xl">Hero background tuner</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Live WGSL controls for the WebGPU ocean drop effect. For the full
          homepage hero with a left-side panel, open{" "}
          <a href="/hero-1" className="font-medium text-foreground underline underline-offset-2">
            /hero-1
          </a>
          . The preview below uses a simplified mock; copy JSON when you have
          values you want to keep.
        </p>
        <div className="mt-10 overflow-hidden rounded-xl ring-1 ring-border">
          <HeroBgTuner />
        </div>
      </Section>

      <Section id="heroes">
        <Eyebrow>Layout</Eyebrow>
        <h2 className="mt-3 text-3xl">Hero sections</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Four forest-band heroes on the same copy and campus photos.{" "}
          <strong className="font-medium text-foreground">Campus</strong> is live
          on the homepage;{" "}
          <strong className="font-medium text-foreground">Drop</strong> is kept
          as the backup mask variant;{" "}
          <strong className="font-medium text-foreground">Mark</strong> uses the
          IBMFP logo badge as the mask;{" "}
          <strong className="font-medium text-foreground">Frame</strong> and{" "}
          <strong className="font-medium text-foreground">Band</strong> swap the
          visual treatment — rounded frame and wide band instead of a shaped
          mask. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            variant
          </code>{" "}
          to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            {"<Hero />"}
          </code>
          .
        </p>
        <div className="mt-10 space-y-12">
          {(
            [
              { variant: "campus" as const, Component: CampusHero },
              { variant: "drop" as const, Component: DropHero },
              { variant: "mark" as const, Component: MarkHero },
              { variant: "frame" as const, Component: FrameHero },
              { variant: "band" as const, Component: BandHero },
            ] as const
          ).map(({ variant, Component }) => {
            const meta = heroVariantMeta[variant]
            return (
              <div key={variant} className="overflow-hidden rounded-xl ring-1 ring-border">
                <div className="border-b border-border bg-muted/40 px-4 py-4 sm:px-6">
                  <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                    {meta.name}
                    {variant === "campus" ? " · Live" : null}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    {meta.note}
                  </p>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    variant=&quot;{variant}&quot;
                  </p>
                </div>
                <div className="max-h-[42rem] overflow-hidden">
                  <Component markHero={false} />
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Variants:{" "}
          {heroVariants.map((variant) => (
            <code
              key={variant}
              className="mr-2 rounded-md bg-muted px-1.5 py-0.5 text-sm"
            >
              {variant}
            </code>
          ))}
        </p>
      </Section>

      <Section id="footers">
        <Eyebrow>Layout</Eyebrow>
        <h2 className="mt-3 text-3xl">Footers</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Three modern layouts on the same content. The live site uses{" "}
          <strong className="font-medium text-foreground">Directory</strong> in
          the <strong className="font-medium text-foreground">light</strong>{" "}
          tone. Swap{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            variant
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">tone</code>{" "}
          on{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            SiteFooter
          </code>{" "}
          when you pick one.
        </p>
      </Section>

      <div className="space-y-12 pb-16">
        {footerVariants.map((variant) => {
          const meta = footerVariantMeta[variant]
          return (
            <div key={variant}>
              <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
                <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                  {meta.name}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {meta.note}{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs">
                    variant=&quot;{variant}&quot;
                  </code>
                </p>
              </div>
              <div className="overflow-hidden ring-1 ring-foreground/10">
                <SiteFooter variant={variant} tone="dark" />
              </div>
              {variant === "directory" ? (
                <div className="mt-6 overflow-hidden ring-1 ring-foreground/10">
                  <SiteFooter variant={variant} tone="light" />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <Section id="patterns">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Patterns</Eyebrow>
            <h2 className="mt-3 text-3xl">The drop, not a blank field.</h2>
          </div>
          <DropFlourish className="text-aqua" />
        </div>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tile these on section bands instead of a flat fill.{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            BrandPattern
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            PatternBand
          </code>{" "}
          live in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            src/components/ui/brand-pattern.tsx
          </code>
          . Colour follows the active theme.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {patternDemos.map((demo) => (
            <PatternBand
              key={demo.variant}
              variant={demo.variant}
              className={cn("min-h-64 rounded-2xl p-6 sm:p-8", demo.surface)}
              patternClassName={cn("opacity-20", demo.pattern)}
            >
              <p className="text-xs font-medium tracking-[0.18em] uppercase opacity-70">
                {demo.name}
              </p>
              <h3 className="mt-2 font-heading text-2xl">{demo.name}</h3>
              <p className="mt-2 max-w-sm text-sm opacity-80">{demo.note}</p>
              <p className="mt-6 font-mono text-xs opacity-60">
                variant=&quot;{demo.variant}&quot;
              </p>
            </PatternBand>
          ))}
          <div className="overflow-hidden rounded-2xl ring-1 ring-border md:col-span-2">
            <div className="bg-muted/40 px-6 py-5 sm:px-8">
              <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                Wave
              </p>
              <h3 className="mt-2 font-heading text-2xl">Organic join</h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                A hill-line instead of a hard rule. Sit it on the cream, fill it
                with forest — the next band begins without a knife edge.
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {"<WaveEdge />"}
              </p>
            </div>
            <WaveEdge className="text-forest" />
            <PatternBand
              variant="rain"
              className="bg-forest px-6 py-10 text-forest-foreground sm:px-8"
              patternClassName="text-forest-foreground opacity-[0.12]"
            >
              <p className="text-sm text-forest-foreground/80">
                PatternBand + WaveEdge. Use on About, purpose, or the final CTA.
              </p>
            </PatternBand>
          </div>
        </div>
      </Section>

      <section id="surfaces" className="relative scroll-mt-24">
        <WaveEdge className="-mb-px text-forest" />
        <PatternBand
          variant="rain"
          className="bg-forest px-4 py-20 text-forest-foreground sm:px-6 lg:px-8 lg:py-28"
          patternClassName="text-forest-foreground opacity-[0.12]"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center gap-3">
              <DropFlourish className="text-cta" />
              <Eyebrow className="text-cta">Surfaces</Eyebrow>
            </div>
            <h2 className="mt-3 max-w-xl text-3xl sm:text-4xl">
              A forest band with weather on it.
            </h2>
            <p className="mt-4 max-w-xl text-forest-foreground/80">
              Hero, vision, and footer can sit on this instead of a plain green
              slab. The wave is the join. The drop is from the mark — not a
              generic texture.
            </p>
            <Button variant="cta" className="mt-6">
              Talk to the project team
            </Button>
          </div>
        </PatternBand>
      </section>
      </DesignSystemLayout>
    </main>
  )
}
