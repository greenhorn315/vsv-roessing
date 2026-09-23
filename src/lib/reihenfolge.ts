/**
 * Sortierung nach dem Feld `order` einer Collection.
 *
 * Astro liefert die Einträge einer Collection in keiner verlässlichen
 * Reihenfolge – auch nicht in der Reihenfolge der YAML-Datei. Wo es auf die
 * Reihenfolge ankommt, steht deshalb ein `order` am Eintrag, und die Seite
 * sortiert danach.
 */
export const nachOrder = <T extends { data: { order: number } }>(a: T, b: T): number =>
  a.data.order - b.data.order;
