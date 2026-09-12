import { createContext, useContext } from "react"
import paletteData from "./logo-palettes.json"

export const logoPalettes = paletteData
export const LogoPaletteContext = createContext(logoPalettes[0])
export function logoAssetUrl(
  conceptId: string,
  variant: string,
  paletteId: string
) {
  const colored = ["primary", "horizontal", "compact", "symbol"].includes(
    variant
  )
  return `/brand/${conceptId}/${colored && paletteId !== "forest" ? `${paletteId}/` : ""}${variant}.svg`
}

export const logoConcepts = [
  {
    id: "organic-food-hub",
    number: "01",
    name: "Organic Food Hub",
    idea: "A seed of possibility.",
    rationale:
      "A rounded, interlocking leaf block holds a seed-shaped opening. The outer form suggests a productive campus; the harvested kernel is revealed in negative space. Two shapes, one compact silhouette.",
    strength:
      "The strongest balance of organic character and industrial structure.",
    tradeoff:
      "The seed opening needs generous clear space at very small sizes.",
    scores: [5, 5, 5, 5, 4, 5],
  },
  {
    id: "indus-growth",
    number: "02",
    name: "Indus Growth",
    idea: "Growth, with a backbone.",
    rationale:
      "A solid I pillar sits beside two growing lobes that suggest a B. The upper lobe opens into a leaf, connecting the Indus Best initials with agriculture through three sturdy components.",
    strength:
      "A direct connection to the brand initials with strong signage presence.",
    tradeoff:
      "The monogram is more corporate and less immediately food-related.",
    scores: [4, 5, 3, 5, 4, 4],
  },
  {
    id: "food-ecosystem",
    number: "03",
    name: "Seed Exchange",
    idea: "Growth moves both ways.",
    rationale:
      "Two hooked seed forms turn into one another, creating a bold S-shaped exchange through open space. Broad organic shoulders and squared inner turns connect agricultural growth with processing and distribution.",
    strength:
      "A distinctive interlocking silhouette: two partners, one productive system.",
    tradeoff:
      "More abstract than a literal leaf; the exchange story adds meaning to the symbol.",
    scores: [5, 5, 4, 5, 4, 5],
  },
  {
    id: "canopy",
    number: "04",
    name: "Living Canopy",
    idea: "Nature becomes infrastructure.",
    rationale:
      "An oversized leaf sweeps into a structural column, paired with a smaller rising arch. The asymmetric roof and open passage suggest a living food campus. Two substantial shapes give the mark a distinctive profile without a dome or badge.",
    strength:
      "A leaf that becomes a building: agricultural character with architectural confidence.",
    tradeoff:
      "The asymmetric profile is expressive, but needs consistent orientation in applications.",
    scores: [4, 5, 4, 5, 5, 4],
  },
  {
    id: "abstract-food-mark",
    number: "05",
    name: "Abstract Food Mark",
    idea: "Built to cultivate.",
    rationale:
      "A square production module, a curved growth module and a shared base make an asymmetric whole. The open channels suggest a planned campus, while one leaf-like corner softens the industrial geometry.",
    strength:
      "Distinctive modular geometry with excellent one-color reproduction.",
    tradeoff:
      "Its food connection depends more on the name and wider brand story.",
    scores: [4, 5, 3, 5, 5, 4],
  },
  {
    id: "seed-gateway",
    number: "06",
    name: "Seed Gateway",
    idea: "An entrance to opportunity.",
    rationale:
      "Two sturdy growing halves frame an open gateway. The split crown introduces a seed-like curve while the upright foundations give the symbol the presence of a working food campus.",
    strength:
      "A confident architectural mark with a generous, recognizable opening.",
    tradeoff:
      "The food connection is subtle; the wordmark helps establish the sector.",
    scores: [4, 5, 4, 5, 4, 5],
  },
  {
    id: "shared-harvest",
    number: "07",
    name: "Shared Harvest",
    idea: "Independent growers. Shared potential.",
    rationale:
      "Two full leaves gather above a single curved foundation. Three separated forms suggest agricultural partners supported by common infrastructure, with a broad central channel that stays open at small sizes.",
    strength: "The warmest organic option, balanced by a solid shared base.",
    tradeoff:
      "Paired leaves are familiar in agriculture; the three-part silhouette carries the distinction.",
    scores: [4, 5, 5, 5, 3, 4],
  },
  {
    id: "best-in-bloom",
    number: "08",
    name: "Best in Bloom",
    idea: "Best, by nature.",
    rationale:
      "A substantial B contains a leaf-shaped upper counter and a broad lower opening. A fresh green growing corner extends its crown, making the initial feel cultivated rather than purely typographic.",
    strength:
      "A memorable brand initial with food and growth built into its negative space.",
    tradeoff: "The B emphasizes Best rather than the full IBMFP initials.",
    scores: [5, 4, 4, 4, 5, 5],
  },
  {
    id: "field-forward",
    number: "09",
    name: "Field Forward",
    idea: "Production with momentum.",
    rationale:
      "A grounded vertical field sits beside two broad, curved growing terraces. Together they suggest an F for food, with the repeatable geometry of a planned production campus.",
    strength:
      "A strong modular silhouette that connects food, fields and forward growth.",
    tradeoff: "The F is a sector cue rather than a brand initial.",
    scores: [4, 5, 4, 5, 4, 4],
  },
  {
    id: "heritage-canopy",
    number: "10",
    name: "Heritage Canopy",
    idea: "The familiar mark, distilled.",
    rationale:
      "The original arched badge and sweeping canopy remain, reduced to two clean filled shapes. A large transparent water drop replaces the highlighted illustration. Forest green anchors the badge; the lighter canopy adds freshness. IBMFP moves outside the symbol for clarity.",
    strength:
      "The closest connection to the supplied logo, with fewer details and a stronger small-size silhouette.",
    tradeoff:
      "Retains more of the institutional badge character than the abstract concepts.",
    scores: [4, 5, 4, 5, 3, 4],
  },
  {
    id: "heritage-source",
    number: "11",
    name: "Heritage Source",
    idea: "Open the canopy. Keep the source.",
    rationale:
      "The reference arch becomes an open shelter around a single solid drop. A broad leaf sweeps across its crown, replacing every vein with one organic curve. Three substantial shapes retain the original water-and-agriculture story with more breathing room.",
    strength:
      "A lighter evolution with a recognizable canopy and water cue, without an enclosing badge.",
    tradeoff:
      "The open arch and drop need more separation than the closed badge at very small sizes.",
    scores: [4, 4, 4, 4, 4, 4],
  },
  {
    id: "heritage-campus",
    number: "12",
    name: "Heritage Campus",
    idea: "A familiar foundation, made precise.",
    rationale:
      "The clipped base from the third reference becomes a clean rounded foundation beneath a symmetrical canopy. A broad horizontal gap opens the badge; a seed-like water opening keeps the original source cue. Two filled shapes replace masks, clipping and embedded initials.",
    strength:
      "The most architectural heritage option, with a sturdy base and clear negative space.",
    tradeoff:
      "The simplified arch emphasizes infrastructure more than the organic canopy.",
    scores: [4, 5, 4, 5, 3, 4],
  },
] as const

export type LogoConcept = (typeof logoConcepts)[number]
export function LogoArtwork({
  concept,
  variant = "horizontal",
  className = "",
}: {
  concept: LogoConcept
  variant?: string
  className?: string
}) {
  const palette = useContext(LogoPaletteContext)
  return (
    <img
      src={logoAssetUrl(concept.id, variant, palette.id)}
      alt={`${concept.name} — ${variant.replaceAll("-", " ")} logo`}
      className={className}
    />
  )
}
