import { getCollection, type CollectionEntry } from 'astro:content';
import { weekdays, type AudienceKey, type Weekday } from './labels';

/**
 * Trainingszeiten aus `src/content/trainings.yaml`, sortiert und gruppiert,
 * dazu die Kennzahlen, die sich daraus ergeben.
 */

/** Eine Trainingsgruppe; `sport` ist der Slug der Sportart. */
export type Training = Omit<CollectionEntry<'trainings'>['data'], 'sport'> & {
  sport: string;
};

/** Hinweis, der überall dort steht, wo Trainingszeiten angezeigt werden. */
export const trainingsStand =
  'Hallenzeiten nach dem Hallenplan Winter 2025/26, übrige Angaben nach der ' +
  'Übungsleiterliste von 2022 und noch nicht bestätigt.';

/**
 * Beginn in Minuten nach Mitternacht, für die Sortierung. Termine ohne feste
 * Uhrzeit („nach Absprache“) stehen am Ende ihres Tages.
 */
const beginn = (time: string): number => {
  const treffer = time.match(/(\d{1,2}):(\d{2})/);
  if (!treffer) return 24 * 60;
  return Number(treffer[1]) * 60 + Number(treffer[2]);
};

/**
 * Alle Trainings, sortiert nach Wochentag und Uhrzeit, bei gleichem Beginn
 * nach Name. Auf die Reihenfolge der YAML-Datei verlässt sich das nicht –
 * Astro liefert die Einträge nicht zuverlässig in dieser Reihenfolge.
 */
export async function getTrainings(): Promise<Training[]> {
  return (await getCollection('trainings'))
    .map(({ data }) => ({ ...data, sport: data.sport.id }))
    .sort(
      (a, b) =>
        weekdays.indexOf(a.day) - weekdays.indexOf(b.day) ||
        beginn(a.time) - beginn(b.time) ||
        a.title.localeCompare(b.title, 'de'),
    );
}

/** Die Trainings einer Sportart, in derselben Reihenfolge. */
export async function trainingsOfSport(slug: string): Promise<Training[]> {
  return (await getTrainings()).filter((training) => training.sport === slug);
}

/** Nach Wochentagen gruppiert; Tage ohne Training fallen weg. */
export async function trainingsByDay(): Promise<{ day: Weekday; entries: Training[] }[]> {
  const trainings = await getTrainings();
  return weekdays
    .map((day) => ({
      day,
      entries: trainings.filter((training) => training.day === day),
    }))
    .filter((gruppe) => gruppe.entries.length > 0);
}

/** Alle Gruppen eines Zielgruppen-Einstiegs, in der Reihenfolge der Woche. */
export async function trainingsFuer(key: AudienceKey): Promise<Training[]> {
  return (await getTrainings()).filter((t) => t.audienceGroups?.includes(key));
}

/**
 * Kennzahlen des Vereins, aus den Trainingsdaten abgeleitet – so bleiben sie
 * richtig, wenn Gruppen dazukommen oder wegfallen.
 */
export async function getVereinsZahlen() {
  const trainings = await getTrainings();
  const uebungsleitungen = new Set<string>();
  let ohneLeitung = 0;
  for (const t of trainings) {
    if (!t.trainers || t.trainers.length === 0) ohneLeitung++;
    t.trainers?.forEach((name) => uebungsleitungen.add(name));
  }
  return {
    gruppen: trainings.length,
    uebungsleitungen: uebungsleitungen.size,
    kinderangebote: (await trainingsFuer('kinder')).length,
    trainingstage: new Set(trainings.map((t) => t.day)).size,
    ohneLeitung,
  };
}
