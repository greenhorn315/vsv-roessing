/**
 * Gemeinsame Grundlage der Spielpläne. Dart und Fußball unterscheiden sich in
 * Liga, Mannschaften und Spielstätte, nicht aber darin, wie eine Partie
 * aussieht und wie die gespielten aus der Liste fallen.
 */

export interface Spiel {
  /** Datum als ISO-Wert, für Sortierung und Vergleich mit dem heutigen Tag. */
  date: string;
  time: string;
  /** Gegner in der Schreibweise des Spielplans. */
  opponent: string;
  /** true = Heimspiel an der eigenen Spielstätte. */
  home: boolean;
  /** Mannschaft, wenn eine Sparte mit mehreren antritt. */
  team?: string;
  /** Zusatz aus dem Aushang, etwa „Pokal“. */
  note?: string;
}

const alsIsoDatum = (tag: Date): string =>
  [
    tag.getFullYear(),
    String(tag.getMonth() + 1).padStart(2, '0'),
    String(tag.getDate()).padStart(2, '0'),
  ].join('-');

/**
 * Die Partien ab dem Stichtag; ein Spiel am heutigen Tag zählt noch dazu.
 * Der Stichtag ist der Tag, an dem die Seite gebaut wird – nach jedem
 * Deployment fallen die gespielten Partien also von selbst heraus.
 */
export const kommendeSpiele = <T extends Spiel>(
  spiele: readonly T[],
  stichtag: Date = new Date(),
): T[] => {
  const heute = alsIsoDatum(stichtag);
  return spiele.filter((spiel) => spiel.date >= heute);
};

/** Nach Datum, Uhrzeit und Mannschaft sortieren. */
export const nachTermin = <T extends Spiel>(spiele: readonly T[]): T[] =>
  [...spiele].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      a.time.localeCompare(b.time) ||
      (a.team ?? '').localeCompare(b.team ?? ''),
  );

const WOCHENTAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** Datum als „Fr, 18.09.2026“. Mittags gelesen, damit keine Zeitzone stört. */
export const spielDatum = (iso: string): string => {
  const tag = new Date(`${iso}T12:00:00`);
  const wochentag = WOCHENTAGE[tag.getDay()] ?? '';
  const datum = [
    String(tag.getDate()).padStart(2, '0'),
    String(tag.getMonth() + 1).padStart(2, '0'),
    tag.getFullYear(),
  ].join('.');
  return `${wochentag}, ${datum}`;
};
