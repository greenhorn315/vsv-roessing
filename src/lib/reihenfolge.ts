// Astro liefert Collection-Einträge in keiner verlässlichen Reihenfolge.
export const nachOrder = <T extends { data: { order: number } }>(a: T, b: T): number =>
  a.data.order - b.data.order;
