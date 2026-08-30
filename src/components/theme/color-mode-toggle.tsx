"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import {
  applyTheme,
  colorModes,
  isColorMode,
  useTheme,
  type ColorMode,
} from "@/lib/theme"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const modeIcons = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
} as const

function ModeToggleGroup({
  value,
  compact,
  className,
  labelled,
  surface = "default",
}: {
  value: ColorMode
  compact?: boolean
  className?: string
  labelled?: boolean
  surface?: "default" | "forest"
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={0}
      value={value}
      onValueChange={(next) => {
        if (!next || !isColorMode(next)) return
        applyTheme({ mode: next })
      }}
      className={cn(
        compact ? "h-9" : "w-full",
        surface === "forest" &&
          "[&_[data-slot=toggle-group-item]]:border-forest-foreground/25 [&_[data-slot=toggle-group-item]]:text-forest-foreground/85 [&_[data-slot=toggle-group-item][data-state=on]]:border-forest-foreground/35 [&_[data-slot=toggle-group-item][data-state=on]]:bg-forest-foreground/12 [&_[data-slot=toggle-group-item][data-state=on]]:text-forest-foreground",
        className
      )}
      aria-label="Color mode"
    >
      {colorModes.map((mode) => {
        const Icon = modeIcons[mode.id]
        return (
          <ToggleGroupItem
            key={mode.id}
            value={mode.id}
            className={cn(
              compact ? "size-9 px-0" : "flex-1 gap-2",
              labelled && "min-w-0"
            )}
            aria-label={mode.label}
            title={mode.label}
          >
            <Icon className="size-4" aria-hidden />
            {labelled ? (
              <span className="truncate text-sm">{mode.label}</span>
            ) : compact ? (
              <span className="sr-only">{mode.label}</span>
            ) : (
              mode.label
            )}
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}

export function ColorModeToggle({
  compact = false,
  showLabel = true,
  className,
  surface = "default",
}: {
  compact?: boolean
  showLabel?: boolean
  className?: string
  surface?: "default" | "forest"
}) {
  const { theme } = useTheme()
  const activeMode =
    colorModes.find((item) => item.id === theme.mode) ?? colorModes[2]

  if (compact) {
    return (
      <ModeToggleGroup
        value={theme.mode}
        compact
        surface={surface}
        className={className}
      />
    )
  }

  return (
    <div className={cn("grid gap-3", className)}>
      {showLabel ? (
        <div className="grid gap-1">
          <Label>Appearance</Label>
          <p className="text-sm text-muted-foreground">{activeMode.note}</p>
        </div>
      ) : null}
      <ModeToggleGroup
        value={theme.mode}
        labelled={showLabel}
        surface={surface}
      />
    </div>
  )
}
