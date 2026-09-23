import { statSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, getEntry } from 'astro:content';
import { nachOrder } from './reihenfolge';

/**
 * Beiträge, Formulare und Familienrechner. Die Angaben selbst stehen in
 * `src/content/mitgliedschaft/`; hier wird nur daraus gerechnet.
 */

/** Beitragssätze in der Reihenfolge der Tabelle. */
export async function getFees() {
  return (await getCollection('beitraege')).sort(nachOrder).map((eintrag) => eintrag.data);
}

/** Regeln rund um den Beitrag, als Texte. */
export async function getBeitragsregeln(): Promise<string[]> {
  return (await getCollection('beitragsregeln')).sort(nachOrder).map((eintrag) => eintrag.data.text);
}

/** Die Schritte zur Mitgliedschaft. */
export async function getJoinSteps() {
  return (await getCollection('beitrittsschritte')).sort(nachOrder).map((eintrag) => eintrag.data);
}

async function monatsbeitrag(id: string): Promise<number> {
  const eintrag = await getEntry('beitraege', id);
  if (!eintrag) {
    throw new Error(
      `Der Familienrechner braucht den Beitrag „${id}“ in src/content/mitgliedschaft/beitraege.yaml.`,
    );
  }
  return eintrag.data.monthly;
}

/**
 * Rechenwerte des Familienrechners – dieselben Sätze wie in der Tabelle,
 * aus derselben Datei gelesen. Der Familienbeitrag greift nur, wenn
 * minderjährige Kinder dabei sind; sonst zahlt jede erwachsene Person ihren
 * Einzelbeitrag.
 */
export async function getCalculator() {
  return {
    erwachsen: await monatsbeitrag('einzel'),
    kind: await monatsbeitrag('kinder'),
    familie: await monatsbeitrag('familie'),
  };
}

/**
 * Formulare zum Herunterladen, mit der Dateigröße aus public/. Gelesen wird
 * beim Bauen, relativ zum Projektstamm, aus dem Astro gestartet wird. Fehlt
 * eine Datei, bricht statSync den Build ab – besser als ein toter Link.
 */
export async function getDownloads() {
  return (await getCollection('formulare')).sort(nachOrder).map(({ data }) => ({
    ...data,
    /** Dateigröße in Bytes, für die Anzeige neben dem Link. */
    bytes: statSync(join(process.cwd(), 'public', data.file)).size,
  }));
}
