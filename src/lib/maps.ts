export function googleMapsEmbed(query: string, zoom = 13) {
  const params = new URLSearchParams({
    q: query,
    z: String(zoom),
    hl: "en",
    output: "embed",
  })
  return `https://maps.google.com/maps?${params.toString()}`
}

export function googleMapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
