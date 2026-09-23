/**
 * Feste Wertelisten und ihre Beschriftungen.
 *
 * Die Schlüssel links sind das, was in den Inhaltsdateien unter
 * `src/content/` steht; das Schema in `src/content.config.ts` lässt genau
 * diese Werte zu. Rechts steht, was auf der Seite erscheint. Wer hier einen
 * Wert ergänzt, bekommt ihn damit auch im Schema.
 */

/** Altersgruppen einer Sportart – zugleich die Filter der Sportarten-Übersicht. */
export const AGE_GROUPS = ['kinder', 'jugend', 'erwachsene'] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const ageGroupLabels: Record<AgeGroup, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  erwachsene: 'Erwachsene',
};

/** Zielgruppen-Einstieg: „Für wen ist was?“ */
export const AUDIENCE_KEYS = ['kinder', 'jugend', 'frauen', 'maenner', 'alle'] as const;
export type AudienceKey = (typeof AUDIENCE_KEYS)[number];

export const audienceLabels: Record<AudienceKey, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  frauen: 'Frauen',
  maenner: 'Männer',
  alle: 'Offen für alle',
};

/** Halbjahr, in dem eine Gruppe stattfindet. Ohne Angabe: ganzjährig. */
export const SEASONS = ['winter', 'sommer'] as const;
export type Season = (typeof SEASONS)[number];

export const seasonLabels: Record<Season, string> = {
  winter: 'Winterhalbjahr',
  sommer: 'Sommerhalbjahr',
};

/** Wochentage in der Kurzform, in der sie auch angezeigt werden. */
export const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;
export type Weekday = (typeof weekdays)[number];

/**
 * Akzentfarbe einer Sportart. In den Inhaltsdateien steht nur der Name des
 * Farbtokens, kein CSS – welche Farbe dahintersteckt, entscheidet das
 * Design-System. `sportColorVar` macht daraus den Wert für `--sport-color`.
 */
export const SPORT_COLORS = ['primary', 'primary-light', 'accent', 'sun-dark'] as const;
export type SportColor = (typeof SPORT_COLORS)[number];

/** Farbtoken der Inhaltsdateien → Farbe aus dem Tailwind-/daisyUI-Thema. */
const SPORT_COLOR_THEME: Record<SportColor, string> = {
  primary: 'primary',
  'primary-light': 'secondary',
  // Das helle, dekorative Korall – nicht die Themenfarbe accent.
  accent: 'coral',
  'sun-dark': 'sun-dark',
};

export const sportColorVar = (color: SportColor): string =>
  `var(--color-${SPORT_COLOR_THEME[color]})`;

/**
 * Kleine Zahlen als Wort – im Fließtext lesen sie sich besser als Ziffern.
 * Ab dreizehn bleibt es bei der Ziffer.
 *
 * Gebeugt werden im Deutschen nur „ein“ und „kein“, alle übrigen Zahlwörter
 * bleiben gleich. Deshalb lassen sich die Formen für Eins und Null angeben,
 * passend zu dem Wort, das folgt:
 *   zahlwort(9)                              „neun Sportarten“
 *   zahlwort(1)                              „eine Sportart“ (Grundform)
 *   zahlwort(1, { eins: 'einen' })           „einen Ort“ (Akkusativ)
 *   zahlwort(0, { null: 'kein', eins: 'ein' }) „kein Spiel“, „ein Spiel“
 */
const ZAHLWOERTER = [
  'null', 'eine', 'zwei', 'drei', 'vier', 'fünf', 'sechs',
  'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf',
];

export function zahlwort(
  n: number,
  formen: { eins?: string; null?: string } = {},
): string {
  if (n === 0 && formen.null) return formen.null;
  if (n === 1 && formen.eins) return formen.eins;
  return ZAHLWOERTER[n] ?? String(n);
}

/** Erster Buchstabe groß, für den Satzanfang. */
export const grossAnfang = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);
