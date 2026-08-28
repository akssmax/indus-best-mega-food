import { landing } from "@/content/landing"
import { processingLines } from "@/content/facilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { WaveEdge } from "@/components/ui/brand-pattern"

export function Campus() {
  const { facilities: data, infrastructure } = landing

  return (
    <>
      <WaveEdge className="-mb-px text-secondary/30" />
      <Section id={data.id} className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((facility) => (
          <MotionItem key={facility.title}>
            <Card className="h-full gap-0 overflow-hidden p-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={facility.image.src}
                  alt={facility.image.alt}
                  className="absolute inset-0 size-full rounded-none object-cover transition-transform duration-500 hover-fine:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-md bg-cta px-2.5 py-1 text-xs font-semibold text-white">
                    {facility.spec}
                  </span>
                </div>
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="font-heading text-lg">
                  {facility.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {facility.body}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>

      <Reveal className="mt-12" delay={0.06}>
        <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8">
          <div className="border-b border-border/60 px-6 py-5">
            <h3 className="font-heading text-lg font-semibold">
              Processing line capacities
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Shared aseptic and concentrate throughput by crop.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Output</TableHead>
                <TableHead>Spec</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processingLines.map((line) => (
                <TableRow key={line.crop}>
                  <TableCell className="font-medium">{line.crop}</TableCell>
                  <TableCell>{line.capacity}</TableCell>
                  <TableCell>{line.output}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {line.spec}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{infrastructure.mofpi}</p>
      </Reveal>
    </Section>
      <WaveEdge position="bottom" className="-mt-px text-secondary/30" />
    </>
  )
}
