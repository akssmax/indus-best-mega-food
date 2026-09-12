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
  return (
    <img
      src={`/brand/${concept.id}/${variant}.svg`}
      alt={`${concept.name} — ${variant.replaceAll("-", " ")} logo`}
      className={className}
    />
  )
}
