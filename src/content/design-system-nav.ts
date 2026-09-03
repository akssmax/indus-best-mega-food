export type DesignSystemNavItem = {
  id: string
  label: string
  children?: readonly { id: string; label: string }[]
}

export type DesignSystemNavGroup = {
  title: string
  items: readonly DesignSystemNavItem[]
}

export const designSystemNav = [
  {
    title: "Overview",
    items: [{ id: "introduction", label: "Introduction" }],
  },
  {
    title: "Foundations",
    items: [
      { id: "theme", label: "Theme" },
      { id: "color", label: "Colour" },
      { id: "type", label: "Typography" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "forms", label: "Forms" },
      { id: "data", label: "Data display" },
      { id: "logo-strip", label: "Logo strip" },
      {
        id: "bento",
        label: "Bento widgets",
        children: [
          { id: "campus-hotspots", label: "CampusHotspots" },
          { id: "processing-chips", label: "ProcessingChips" },
          { id: "collection-gauge", label: "CollectionGauge" },
          { id: "process-flow", label: "ProcessFlow" },
          { id: "status-seal", label: "StatusSeal" },
          { id: "utility-meters", label: "UtilityMeters" },
        ],
      },
    ],
  },
  {
    title: "Layout",
    items: [
      { id: "headers", label: "Headers" },
      { id: "heroes", label: "Heroes" },
      { id: "hero-bg", label: "Hero BG tuner" },
      { id: "footers", label: "Footers" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { id: "patterns", label: "Brand patterns" },
      { id: "surfaces", label: "Surfaces" },
    ],
  },
] as const satisfies readonly DesignSystemNavGroup[]

export function getDesignSystemSectionIds() {
  return designSystemNav.flatMap((group) =>
    group.items.flatMap((item) => {
      if ("children" in item && item.children) {
        return [item.id, ...item.children.map((child) => child.id)]
      }
      return [item.id]
    })
  )
}
