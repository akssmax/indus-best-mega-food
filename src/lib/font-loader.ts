import {
  FONT_DEFAULT,
  type FontPairingId,
  isFontPairingId,
  readStoredFontPairing,
} from "@/lib/fonts"

const loaded = new Set<FontPairingId>([FONT_DEFAULT])

async function importFontPairing(id: FontPairingId) {
  switch (id) {
    case "heritage":
      return
    case "geist":
      await import("@fontsource-variable/geist")
      return
    case "editorial":
      await Promise.all([
        import("@fontsource/libre-baskerville"),
        import("@fontsource-variable/work-sans"),
      ])
      return
    case "premium":
      await Promise.all([
        import("@fontsource/playfair-display"),
        import("@fontsource-variable/manrope"),
      ])
      return
    case "modern":
      await Promise.all([
        import("@fontsource/dm-serif-display"),
        import("@fontsource-variable/plus-jakarta-sans"),
      ])
      return
    case "inter":
      await import("@fontsource-variable/inter")
      return
  }
}

export async function ensureFontPairingLoaded(id: FontPairingId) {
  if (loaded.has(id)) return
  loaded.add(id)
  await importFontPairing(id)
}

/** Load fonts for the active theme pairing. */
export async function ensureFontsForDocument() {
  if (typeof document === "undefined") return
  await ensureFontPairingLoaded(readStoredFontPairing())
}

export function readDocumentFontPairing(): FontPairingId {
  if (typeof document === "undefined") return FONT_DEFAULT
  const fromDom = document.documentElement.dataset.font
  if (fromDom && isFontPairingId(fromDom)) return fromDom
  return readStoredFontPairing()
}
