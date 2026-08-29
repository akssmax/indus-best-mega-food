import { useEffect, useState } from "react"

import {
  FONT_DEFAULT,
  FONT_STORAGE_KEY,
  isFontPairingId,
  type FontPairingId,
} from "@/lib/fonts"
import { ensureFontPairingLoaded } from "@/lib/font-loader"

export const THEME_STORAGE_KEY = "ibmfp-theme"

export const palettes = [
  {
    id: "harvest",
    label: "Harvest",
    note: "Current. Forest brand, harvest-amber CTAs.",
    swatches: {
      primary: "oklch(0.42 0.11 145)",
      cta: "oklch(0.72 0.14 78)",
      aqua: "oklch(0.68 0.09 210)",
      forest: "oklch(0.27 0.055 150)",
    },
  },
  {
    id: "canal",
    label: "Canal",
    note: "Deep teal brand, sky CTAs. Water and utilities.",
    swatches: {
      primary: "oklch(0.40 0.10 215)",
      cta: "oklch(0.58 0.14 225)",
      aqua: "oklch(0.65 0.13 215)",
      forest: "oklch(0.28 0.09 215)",
    },
  },
  {
    id: "copper",
    label: "Copper",
    note: "Copper brand, warm split-comp CTAs.",
    swatches: {
      primary: "oklch(0.44 0.13 40)",
      cta: "oklch(0.62 0.16 35)",
      aqua: "oklch(0.68 0.09 210)",
      forest: "oklch(0.30 0.11 38)",
    },
  },
  {
    id: "sage",
    label: "Sage",
    note: "Olive-sage brand. Calm, monochromatic greens.",
    swatches: {
      primary: "oklch(0.42 0.07 132)",
      cta: "oklch(0.62 0.09 140)",
      aqua: "oklch(0.62 0.08 165)",
      forest: "oklch(0.26 0.07 132)",
    },
  },
  {
    id: "umber",
    label: "Umber",
    note: "Umber brand, golden-earth CTAs.",
    swatches: {
      primary: "oklch(0.40 0.09 58)",
      cta: "oklch(0.58 0.12 55)",
      aqua: "oklch(0.65 0.08 200)",
      forest: "oklch(0.28 0.07 58)",
    },
  },
] as const

export const bases = [
  {
    id: "cream",
    label: "Cream",
    note: "Current warm page canvas.",
    swatch: "oklch(0.975 0.012 95)",
  },
  {
    id: "paper",
    label: "Paper",
    note: "Near-white, closer to the logo field.",
    swatch: "oklch(0.992 0.004 95)",
  },
  {
    id: "mist",
    label: "Mist",
    note: "Cool off-white with a sky tint.",
    swatch: "oklch(0.975 0.012 230)",
  },
  {
    id: "grove",
    label: "Grove",
    note: "Light leaf wash behind the type.",
    swatch: "oklch(0.975 0.016 145)",
  },
] as const

export const radii = [
  { id: "none", label: "None", value: "0px" },
  { id: "sm", label: "Small", value: "0.375rem" },
  { id: "md", label: "Default", value: "0.75rem" },
  { id: "lg", label: "Soft", value: "1.25rem" },
] as const

export type PaletteId = (typeof palettes)[number]["id"]
export type BaseId = (typeof bases)[number]["id"]
export type RadiusId = (typeof radii)[number]["id"]

export type ThemeState = {
  palette: PaletteId
  base: BaseId
  radius: RadiusId
  font: FontPairingId
}

export const THEME_DEFAULT: ThemeState = {
  palette: "harvest",
  base: "cream",
  radius: "md",
  font: FONT_DEFAULT,
}

const LEGACY_PALETTE_MAP: Record<string, PaletteId> = {
  leaf: "sage",
  aqua: "canal",
  mark: "copper",
  ink: "umber",
}

const paletteIds = new Set<string>(palettes.map((item) => item.id))

function migratePalette(value: string | undefined): PaletteId | undefined {
  if (!value) return undefined
  if (isPaletteId(value)) return value
  const migrated = LEGACY_PALETTE_MAP[value]
  return migrated && isPaletteId(migrated) ? migrated : undefined
}
const baseIds = new Set<string>(bases.map((item) => item.id))
const radiusIds = new Set<string>(radii.map((item) => item.id))

export function isPaletteId(value: string): value is PaletteId {
  return paletteIds.has(value)
}

export function isBaseId(value: string): value is BaseId {
  return baseIds.has(value)
}

export function isRadiusId(value: string): value is RadiusId {
  return radiusIds.has(value)
}

type ThemeListener = (theme: ThemeState) => void
const listeners = new Set<ThemeListener>()

export function subscribeTheme(listener: ThemeListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function notify(theme: ThemeState) {
  listeners.forEach((listener) => listener(theme))
}

function parseStoredTheme(raw: string | null): Partial<ThemeState> {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as Partial<ThemeState>
    return {
      palette: migratePalette(parsed.palette),
      base: parsed.base && isBaseId(parsed.base) ? parsed.base : undefined,
      radius:
        parsed.radius && isRadiusId(parsed.radius) ? parsed.radius : undefined,
      font:
        parsed.font && isFontPairingId(parsed.font) ? parsed.font : undefined,
    }
  } catch {
    return {}
  }
}

export function readStoredTheme(): ThemeState {
  if (typeof document === "undefined") return THEME_DEFAULT

  const paletteAttr = document.documentElement.dataset.palette ?? ""
  const baseAttr = document.documentElement.dataset.base ?? ""
  const radiusAttr = document.documentElement.dataset.radius ?? ""
  const fontAttr = document.documentElement.dataset.font ?? ""

  const fromDom: Partial<ThemeState> = {
    palette: migratePalette(paletteAttr),
    base: isBaseId(baseAttr) ? baseAttr : undefined,
    radius: isRadiusId(radiusAttr) ? radiusAttr : undefined,
    font: isFontPairingId(fontAttr) ? fontAttr : undefined,
  }

  try {
    const stored = parseStoredTheme(localStorage.getItem(THEME_STORAGE_KEY))
    const legacyFont = localStorage.getItem(FONT_STORAGE_KEY)
    return {
      palette: fromDom.palette ?? stored.palette ?? THEME_DEFAULT.palette,
      base: fromDom.base ?? stored.base ?? THEME_DEFAULT.base,
      radius: fromDom.radius ?? stored.radius ?? THEME_DEFAULT.radius,
      font:
        fromDom.font ??
        stored.font ??
        (legacyFont && isFontPairingId(legacyFont)
          ? legacyFont
          : THEME_DEFAULT.font),
    }
  } catch {
    return {
      palette: fromDom.palette ?? THEME_DEFAULT.palette,
      base: fromDom.base ?? THEME_DEFAULT.base,
      radius: fromDom.radius ?? THEME_DEFAULT.radius,
      font: fromDom.font ?? THEME_DEFAULT.font,
    }
  }
}

function writeTheme(theme: ThemeState) {
  document.documentElement.dataset.palette = theme.palette
  document.documentElement.dataset.base = theme.base
  document.documentElement.dataset.radius = theme.radius
  document.documentElement.dataset.font = theme.font
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
    localStorage.setItem(FONT_STORAGE_KEY, theme.font)
  } catch {
    // private mode
  }
  notify(theme)
}

export function applyTheme(partial: Partial<ThemeState>): ThemeState {
  const next = { ...readStoredTheme(), ...partial }
  if (partial.font) {
    void ensureFontPairingLoaded(partial.font)
  }
  writeTheme(next)
  return next
}

export function resetTheme(): ThemeState {
  writeTheme(THEME_DEFAULT)
  return THEME_DEFAULT
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeState>(() =>
    typeof document === "undefined" ? THEME_DEFAULT : readStoredTheme(),
  )

  useEffect(() => {
    setTheme(readStoredTheme())
    return subscribeTheme(setTheme)
  }, [])

  return {
    theme,
    apply: applyTheme,
    reset: resetTheme,
  }
}

const paletteList = palettes.map((item) => item.id).join(",")
const baseList = bases.map((item) => item.id).join(",")
const radiusList = radii.map((item) => item.id).join(",")
const fontList = "heritage,geist,editorial,premium,modern"

export const themeBootScript = `(function(){try{var d=document.documentElement;var t={};try{t=JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}")||"{}")||{}}catch(e){}var P="${paletteList}".split(",");var B="${baseList}".split(",");var R="${radiusList}".split(",");var F="${fontList}".split(",");var M={leaf:"sage",aqua:"canal",mark:"copper",ink:"umber"};var raw=t.palette||"harvest";var p=P.indexOf(raw)!==-1?raw:M[raw]||"harvest";var b=t.base&&B.indexOf(t.base)!==-1?t.base:"cream";var r=t.radius&&R.indexOf(t.radius)!==-1?t.radius:"md";var f=t.font&&F.indexOf(t.font)!==-1?t.font:localStorage.getItem("${FONT_STORAGE_KEY}");if(!f||F.indexOf(f)===-1)f="${FONT_DEFAULT}";d.setAttribute("data-palette",p);d.setAttribute("data-base",b);d.setAttribute("data-radius",r);d.setAttribute("data-font",f)}catch(e){}})()`
