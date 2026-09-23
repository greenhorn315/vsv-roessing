import { getCollection, type CollectionEntry } from 'astro:content';
import { grossAnfang, zahlwort } from './labels';
import { nachOrder } from './reihenfolge';

/**
 * Zugriff auf die Sportarten aus `src/content/sportarten/` und die Zahlen,
 * die sich daraus ableiten. Die Anzahl steht nirgends von Hand: Kommt eine
 * Sportart dazu, stimmen „neun Sportarten“ in Überschriften, Beschreibung
 * und Faktenleiste von selbst.
 */

export type Sport = CollectionEntry<'sportarten'>;

/** Alle Sportarten in der Reihenfolge ihres `order`. */
export async function getSports(): Promise<Sport[]> {
  return (await getCollection('sportarten')).sort(nachOrder);
}

/** Anzahl der Sportarten – überall verwenden, statt die Zahl auszuschreiben. */
export async function getSportCount(): Promise<number> {
  return (await getCollection('sportarten')).length;
}

/** Anzahl als Wort, z. B. „neun“. Fällt bei großen Zahlen auf die Ziffer zurück. */
export async function getSportCountWord(): Promise<string> {
  return zahlwort(await getSportCount());
}

/** Dasselbe großgeschrieben, für den Satzanfang. */
export async function getSportCountWordCapitalized(): Promise<string> {
  return grossAnfang(await getSportCountWord());
}

/** Namen aller Sportarten, z. B. für strukturierte Daten. */
export async function getSportNames(): Promise<string[]> {
  return (await getSports()).map((sport) => sport.data.name);
}
