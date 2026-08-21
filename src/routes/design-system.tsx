import { createFileRoute, Link } from "@tanstack/react-router"

import { site } from "@/content/site"
import { Eyebrow, Section } from "@/components/landing/section"
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

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: `Design system | ${site.name}` },
      {
        name: "description",
        content:
          "Colour, type, and component tokens for Indus Best Mega Food Park.",
      },
    ],
  }),
  component: DesignSystemPage,
})

const colors = [
  {
    name: "Primary",
    token: "--primary",
    className: "bg-primary text-primary-foreground",
    note: "Forest green from the logo. Brand, links, default buttons.",
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
    note: "Harvest amber. Primary conversion actions — not brand green.",
  },
  {
    name: "Forest",
    token: "--forest",
    className: "bg-forest text-forest-foreground",
    note: "Deep green for photography overlays, hero, and footer.",
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
  { label: "Body", className: "font-sans text-base", sample: "Geist for UI, body, and headings." },
  { label: "Small", className: "font-sans text-sm text-muted-foreground", sample: "Captions, tables, helper text." },
  {
    label: "Eyebrow",
    className: "text-xs font-medium tracking-[0.22em] text-primary uppercase",
    sample: "Mega Food Park",
  },
] as const

function DesignSystemPage() {
  return (
    <main>
      <Section>
        <Eyebrow>IBMFP</Eyebrow>
        <h1 className="mt-3 text-4xl sm:text-5xl">Design system</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Forest and aqua from the mark, harvest amber for conversion, Geist
          sans for headings and UI. Tokens live in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">
            src/styles.css
          </code>
          .
        </p>
        <Button variant="outline" className="mt-6" asChild>
          <Link to="/">Back to the park</Link>
        </Button>
      </Section>

      <Section className="bg-muted/50" id="color">
        <Eyebrow>Colour</Eyebrow>
        <h2 className="mt-3 text-3xl">Tokens</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          CTAs use complementary harvest amber so they contrast against forest
          green instead of competing with it.
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
        <h2 className="mt-3 text-3xl">Geist sans</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          One family for wordmark, headlines, and interface. Headings are
          semibold with tight tracking.
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
          for enquire and plot requests. Use{" "}
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

      <Section className="bg-forest text-forest-foreground">
        <Eyebrow className="text-cta">Surfaces</Eyebrow>
        <h2 className="mt-3 text-3xl">Forest band</h2>
        <p className="mt-4 max-w-xl text-forest-foreground/80">
          Hero, vision, and footer sit on deep forest with cream type and amber
          eyebrows. Use this for photography overlays, not long body copy.
        </p>
        <Button variant="cta" className="mt-6">
          Harvest CTA on forest
        </Button>
      </Section>
    </main>
  )
}
