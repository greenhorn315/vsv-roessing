import { statSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, getEntry } from 'astro:content';
import { nachOrder } from './reihenfolge';

export async function getFees() {
  return (await getCollection('beitraege')).sort(nachOrder).map((eintrag) => eintrag.data);
}

export async function getBeitragsregeln(): Promise<string[]> {
  return (await getCollection('beitragsregeln')).sort(nachOrder).map((eintrag) => eintrag.data.text);
}

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

export async function getCalculator() {
  return {
    erwachsen: await monatsbeitrag('einzel'),
    kind: await monatsbeitrag('kinder'),
    familie: await monatsbeitrag('familie'),
  };
}

export async function getDownloads() {
  return (await getCollection('formulare')).sort(nachOrder).map(({ data }) => ({
    ...data,
    bytes: statSync(join(process.cwd(), 'public', data.file)).size,
  }));
}
