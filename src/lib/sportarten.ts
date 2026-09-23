import { getCollection, type CollectionEntry } from 'astro:content';
import { grossAnfang, zahlwort } from './labels';
import { nachOrder } from './reihenfolge';

export type Sport = CollectionEntry<'sportarten'>;

export async function getSports(): Promise<Sport[]> {
  return (await getCollection('sportarten')).sort(nachOrder);
}

export async function getSportCount(): Promise<number> {
  return (await getCollection('sportarten')).length;
}

export async function getSportCountWord(): Promise<string> {
  return zahlwort(await getSportCount());
}

export async function getSportCountWordCapitalized(): Promise<string> {
  return grossAnfang(await getSportCountWord());
}

export async function getSportNames(): Promise<string[]> {
  return (await getSports()).map((sport) => sport.data.name);
}
