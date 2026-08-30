import { useEffect, useState } from "react"

import {
  FONT_DEFAULT,
  FONT_STORAGE_KEY,
  fontPairings,
  isFontPairingId,
  type FontPairingId,
} from "@/lib/fonts"
import { ensureFontPairingLoaded } from "@/lib/font-loader"

export const THEME_STORAGE_KEY = "ibmfp-theme"

export const colorModes = [
  {
    id: "light",
    label: "Light",
    note: "Green and cream — the live homepage palette.",
  },
  {
    id: "dark",
    label: "Dark",
    note: "Night theme — near-black canvas, cream type, brass CTAs.",
  },
  {
    id: "system",
    label: "System",
    note: "Follows your device light/dark preference.",
  },
] as const

export type ColorMode = (typeof colorModes)[number]["id"]

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
  mode: ColorMode
}

export const THEME_DEFAULT: ThemeState = {
  palette: "harvest",
  base: "cream",
  radius: "md",
  font: FONT_DEFAULT,
  mode: "system",
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
const colorModeIds = new Set<string>(colorModes.map((item) => item.id))

export function isPaletteId(value: string): value is PaletteId {
  return paletteIds.has(value)
}

export function isBaseId(value: string): value is BaseId {
  return baseIds.has(value)
}

export function isRadiusId(value: string): value is RadiusId {
  return radiusIds.has(value)
}

export function isColorMode(value: string): value is ColorMode {
  return colorModeIds.has(value)
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
      mode: parsed.mode && isColorMode(parsed.mode) ? parsed.mode : undefined,
    }
  } catch {
    return {}
  }
}

export function getSystemColorMode(): Exclude<ColorMode, "system"> {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function resolveColorMode(mode: ColorMode): Exclude<ColorMode, "system"> {
  return mode === "system" ? getSystemColorMode() : mode
}

export function isDarkColorMode(mode: ColorMode) {
  return resolveColorMode(mode) === "dark"
}

function applyColorModeClass(mode: ColorMode) {
  if (typeof document === "undefined") return
  document.documentElement.classList.toggle("dark", isDarkColorMode(mode))
  document.documentElement.dataset.mode = mode
}

export function syncColorModeFromSystem() {
  if (typeof window === "undefined") return
  const theme = readStoredTheme()
  if (theme.mode !== "system") return
  applyColorModeClass("system")
}

type ColorModeListener = () => void
const colorModeListeners = new Set<ColorModeListener>()

export function subscribeColorMode(listener: ColorModeListener) {
  colorModeListeners.add(listener)

  if (typeof window === "undefined") {
    return () => {
      colorModeListeners.delete(listener)
    }
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const onChange = () => {
    syncColorModeFromSystem()
    colorModeListeners.forEach((item) => item())
  }

  media.addEventListener("change", onChange)
  return () => {
    colorModeListeners.delete(listener)
    media.removeEventListener("change", onChange)
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
    mode: isColorMode(document.documentElement.dataset.mode ?? "")
      ? (document.documentElement.dataset.mode as ColorMode)
      : undefined,
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
      mode: fromDom.mode ?? stored.mode ?? THEME_DEFAULT.mode,
    }
  } catch {
    return {
      palette: fromDom.palette ?? THEME_DEFAULT.palette,
      base: fromDom.base ?? THEME_DEFAULT.base,
      radius: fromDom.radius ?? THEME_DEFAULT.radius,
      font: fromDom.font ?? THEME_DEFAULT.font,
      mode: fromDom.mode ?? THEME_DEFAULT.mode,
    }
  }
}

function writeTheme(theme: ThemeState) {
  document.documentElement.dataset.palette = theme.palette
  document.documentElement.dataset.base = theme.base
  document.documentElement.dataset.radius = theme.radius
  document.documentElement.dataset.font = theme.font
  applyColorModeClass(theme.mode)
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
  const [theme, setTheme] = useState<ThemeState>(THEME_DEFAULT)

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
const fontList = fontPairings.map((item) => item.id).join(",")
const modeList = colorModes.map((item) => item.id).join(",")

export const themeBootScript = `(function(){try{var d=document.documentElement;var t={};try{t=JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}")||"{}")||{}}catch(e){}var P="${paletteList}".split(",");var B="${baseList}".split(",");var R="${radiusList}".split(",");var F="${fontList}".split(",");var Modes="${modeList}".split(",");var M={leaf:"sage",aqua:"canal",mark:"copper",ink:"umber"};var raw=t.palette||"harvest";var p=P.indexOf(raw)!==-1?raw:M[raw]||"harvest";var b=t.base&&B.indexOf(t.base)!==-1?t.base:"cream";var r=t.radius&&R.indexOf(t.radius)!==-1?t.radius:"md";var f=t.font&&F.indexOf(t.font)!==-1?t.font:localStorage.getItem("${FONT_STORAGE_KEY}");if(!f||F.indexOf(f)===-1)f="${FONT_DEFAULT}";var mode=t.mode&&Modes.indexOf(t.mode)!==-1?t.mode:"system";var dark=mode==="dark"||(mode==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);d.setAttribute("data-palette",p);d.setAttribute("data-base",b);d.setAttribute("data-radius",r);d.setAttribute("data-font",f);d.setAttribute("data-mode",mode);if(dark)d.classList.add("dark");else d.classList.remove("dark")}catch(e){}})()`
