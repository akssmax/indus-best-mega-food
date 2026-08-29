import { CheckIcon, PaletteIcon, RotateCcwIcon } from "lucide-react"

import { fontPairings, isFontPairingId } from "@/lib/fonts"
import {
  applyTheme,
  bases,
  palettes,
  radii,
  resetTheme,
  useTheme,
} from "@/lib/theme"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

function ThemeControls({ compact = false }: { compact?: boolean }) {
  const { theme } = useTheme()
  const activePalette =
    palettes.find((item) => item.id === theme.palette) ?? palettes[0]
  const activeBase = bases.find((item) => item.id === theme.base) ?? bases[0]
  const activeFont =
    fontPairings.find((item) => item.id === theme.font) ?? fontPairings[0]

  return (
    <div className={cn("grid", compact ? "gap-5" : "gap-8")}>
      <div className="grid gap-3">
        <p className="text-sm font-medium">Palette</p>
        <div
          className={cn(
            "grid gap-2",
            compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {palettes.map((palette) => {
            const selected = palette.id === theme.palette
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => applyTheme({ palette: palette.id })}
                className={cn(
                  "cursor-pointer rounded-xl border border-border bg-background p-3 text-left transition-all outline-none touch-target hover:bg-muted/60 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_*]:pointer-events-none",
                  compact && "flex min-h-11 items-center gap-3 rounded-lg p-2",
                  selected && "border-ring ring-[3px] ring-ring/30"
                )}
              >
                <span
                  className={cn(
                    "grid grid-cols-2 overflow-hidden rounded-md",
                    compact ? "size-9 shrink-0" : "mb-2"
                  )}
                >
                  <span
                    className={compact ? "size-full" : "h-8"}
                    style={{ background: palette.swatches.primary }}
                  />
                  <span
                    className={compact ? "size-full" : "h-8"}
                    style={{ background: palette.swatches.cta }}
                  />
                  <span
                    className={compact ? "size-full" : "h-8"}
                    style={{ background: palette.swatches.aqua }}
                  />
                  <span
                    className={compact ? "size-full" : "h-8"}
                    style={{ background: palette.swatches.forest }}
                  />
                </span>
                <span className={cn(!compact && "block")}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{palette.label}</span>
                    {selected ? (
                      <CheckIcon className="size-4 text-primary" />
                    ) : null}
                  </span>
                  {compact ? null : (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {palette.note}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <p className="text-sm text-muted-foreground">{activePalette.note}</p>
      </div>

      <div className={cn("grid gap-6", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        <div className="grid gap-1.5">
          <Label htmlFor={compact ? "theme-font-popover" : "theme-font"}>
            Font pairing
          </Label>
          <Select
            value={theme.font}
            onValueChange={(value) => {
              if (!isFontPairingId(value)) return
              applyTheme({ font: value })
            }}
          >
            <SelectTrigger
              id={compact ? "theme-font-popover" : "theme-font"}
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontPairings.map((pairing) => (
                <SelectItem key={pairing.id} value={pairing.id}>
                  {pairing.label} — {pairing.heading} / {pairing.body}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {compact ? null : (
            <p className="text-sm text-muted-foreground">{activeFont.note}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label>Radius</Label>
          <ToggleGroup
            type="single"
            variant="outline"
            spacing={0}
            value={theme.radius}
            onValueChange={(value) => {
              if (!value) return
              const next = radii.find((item) => item.id === value)
              if (next) applyTheme({ radius: next.id })
            }}
            className="w-full"
          >
            {radii.map((item) => (
              <ToggleGroupItem key={item.id} value={item.id} className="flex-1">
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {compact ? null : (
            <p className="text-sm text-muted-foreground">
              Corners on cards, buttons, and inputs.
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-medium">Base</p>
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={theme.base}
          onValueChange={(value) => {
            if (!value) return
            const next = bases.find((item) => item.id === value)
            if (next) applyTheme({ base: next.id })
          }}
          className="flex w-full flex-wrap"
        >
          {bases.map((item) => (
            <ToggleGroupItem
              key={item.id}
              value={item.id}
              className="min-w-0 flex-1 gap-2"
            >
              <span
                className="size-3.5 rounded-full ring-1 ring-foreground/15"
                style={{ background: item.swatch }}
              />
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {compact ? null : (
          <p className="text-sm text-muted-foreground">{activeBase.note}</p>
        )}
      </div>

      {!compact ? (
        <div className="grid gap-3">
          <p className="text-sm font-medium">Preview</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="cta">Enquire for a plot</Button>
            <Button>Brand default</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="rounded-xl bg-forest p-5 text-forest-foreground">
            <p className="text-xs font-medium tracking-[0.18em] text-cta uppercase">
              Forest band
            </p>
            <p className="mt-2 font-heading text-lg font-semibold">
              {activePalette.label} on {activeBase.label.toLowerCase()}.
            </p>
            <Button variant="cta" size="sm" className="mt-4">
              Talk to the project team
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function ThemeSelector({ className }: { className?: string }) {
  return (
    <Card className={cn("max-w-3xl", className)}>
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Theme</CardTitle>
            <CardDescription className="mt-1">
              Palettes from the IBMFP mark. Stored in this browser and applied
              site-wide — open the homepage to compare.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => resetTheme()}
          >
            <RotateCcwIcon data-icon="inline-start" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8 pt-(--card-spacing)">
        <ThemeControls />
      </CardContent>
    </Card>
  )
}

export function ThemePopover({
  triggerClassName,
}: {
  triggerClassName?: string
}) {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label="Theme"
          className={cn("size-9", triggerClassName)}
        >
          <PaletteIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        collisionPadding={12}
        className="w-80 max-h-[min(36rem,calc(100vh-5rem))] gap-3 overflow-y-auto p-4 sm:w-96"
      >
        <PopoverHeader className="flex-row items-start justify-between gap-3">
          <div>
            <PopoverTitle>Theme</PopoverTitle>
            <PopoverDescription>
              Applies site-wide in this browser.
            </PopoverDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => resetTheme()}
          >
            <RotateCcwIcon data-icon="inline-start" />
            Reset
          </Button>
        </PopoverHeader>
        <ThemeControls compact />
      </PopoverContent>
    </Popover>
  )
}
