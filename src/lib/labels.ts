
export const AGE_GROUPS = ['kinder', 'jugend', 'erwachsene'] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const ageGroupLabels: Record<AgeGroup, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  erwachsene: 'Erwachsene',
};

export const AUDIENCE_KEYS = ['kinder', 'jugend', 'frauen', 'maenner', 'alle'] as const;
export type AudienceKey = (typeof AUDIENCE_KEYS)[number];

export const audienceLabels: Record<AudienceKey, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  frauen: 'Frauen',
  maenner: 'Männer',
  alle: 'Offen für alle',
};

export const SEASONS = ['winter', 'sommer'] as const;
export type Season = (typeof SEASONS)[number];

export const seasonLabels: Record<Season, string> = {
  winter: 'Winterhalbjahr',
  sommer: 'Sommerhalbjahr',
};

export const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;
export type Weekday = (typeof weekdays)[number];

export const SPORT_COLORS = ['primary', 'primary-light', 'accent', 'sun-dark'] as const;
export type SportColor = (typeof SPORT_COLORS)[number];

const SPORT_COLOR_THEME: Record<SportColor, string> = {
  primary: 'primary',
  'primary-light': 'secondary',
  accent: 'accent',
  'sun-dark': 'warning',
};

export const sportColorVar = (color: SportColor): string =>
  `var(--color-${SPORT_COLOR_THEME[color]})`;

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

export const grossAnfang = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);
