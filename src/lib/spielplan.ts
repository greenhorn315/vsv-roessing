import { getEntry, type CollectionEntry } from 'astro:content';

export type Spielplan = CollectionEntry<'spielplaene'>['data'];

export type Spiel = Spielplan['spiele'][number];

export async function getSpielplan(sport: string): Promise<Spielplan> {
  const eintrag = await getEntry('spielplaene', sport);
  if (!eintrag) throw new Error(`Kein Spielplan unter src/content/spielplaene/${sport}.yaml`);
  return { ...eintrag.data, spiele: nachTermin(eintrag.data.spiele) };
}

// Der Worker läuft in UTC; „heute“ ist aber der Tag in Rössing.
const alsIsoDatum = (tag: Date): string =>
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(tag);

export const kommendeSpiele = <T extends Spiel>(
  spiele: readonly T[],
  stichtag: Date = new Date(),
): T[] => {
  const heute = alsIsoDatum(stichtag);
  return spiele.filter((spiel) => spiel.date >= heute);
};

export const nachTermin = <T extends Spiel>(spiele: readonly T[]): T[] =>
  [...spiele].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      a.time.localeCompare(b.time) ||
      (a.team ?? '').localeCompare(b.team ?? ''),
  );

const WOCHENTAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

// Mittags gelesen, damit keine Zeitzone das Datum verschiebt.
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
