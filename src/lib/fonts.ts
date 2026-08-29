export const FONT_STORAGE_KEY = "ibmfp-font"
export const FONT_DEFAULT = "heritage"

export const fontPairings = [
  {
    id: "heritage",
    label: "Heritage",
    heading: "Fraunces",
    body: "Figtree",
    note: "Warm food brand — default.",
  },
  {
    id: "geist",
    label: "Campus",
    heading: "Geist",
    body: "Geist",
    note: "Industrial / campus. The previous default.",
  },
  {
    id: "editorial",
    label: "Editorial",
    heading: "Libre Baskerville",
    body: "Work Sans",
    note: "Magazine editorial — classic serif with a clean sans.",
  },
  {
    id: "premium",
    label: "Premium",
    heading: "Playfair Display",
    body: "Manrope",
    note: "Refined F&B — high-contrast serif with geometric sans.",
  },
  {
    id: "modern",
    label: "Modern",
    heading: "DM Serif Display",
    body: "Plus Jakarta Sans",
    note: "Contemporary UI — crisp serif and friendly sans.",
  },
  {
    id: "inter",
    label: "Inter",
    heading: "Inter Bold",
    body: "Inter",
    note: "Neutral sans — bold headings, regular body.",
  },
] as const

export type FontPairingId = (typeof fontPairings)[number]["id"]

const pairingIds = new Set<string>(fontPairings.map((pairing) => pairing.id))

export function isFontPairingId(value: string): value is FontPairingId {
  return pairingIds.has(value)
}

export function applyFontPairing(id: FontPairingId) {
  document.documentElement.dataset.font = id
  localStorage.setItem(FONT_STORAGE_KEY, id)
}

export function readStoredFontPairing(): FontPairingId {
  if (typeof document === "undefined") return FONT_DEFAULT
  const fromDom = document.documentElement.dataset.font
  if (fromDom && isFontPairingId(fromDom)) return fromDom
  try {
    const stored = localStorage.getItem(FONT_STORAGE_KEY)
    if (stored && isFontPairingId(stored)) return stored
  } catch {
    // private mode
  }
  return FONT_DEFAULT
}

export const fontBootScript = `(function(){try{var a=["heritage","geist","editorial","premium","modern","inter"];var f=localStorage.getItem("${FONT_STORAGE_KEY}");if(f&&a.indexOf(f)!==-1)document.documentElement.setAttribute("data-font",f)}catch(e){}})()`
