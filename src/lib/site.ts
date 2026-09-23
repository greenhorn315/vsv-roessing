import type { IconName } from '../components/icons';
import { getSportCount, getSportCountWord } from './sportarten';

export const site = {
  name: 'VSV Rössing von 1897 e.V.',
  legalName: 'Volkssportvereinigung von 1897 Rössing e.V.',
  shortName: 'VSV Rössing',
  founded: 1897,
  members: 660,
  sloganTemplate: '{age} Jahre Bewegung. Und richtig gut drauf.',
  email: 'vorstand@vsv-roessing.de',
  // Steht wortgleich auch in Impressum und Datenschutzerklärung – dort mit ändern.
  phone: '+49 (0) 50 69 / 74 15',
  address: {
    street: 'Pfarrstr. 6',
    postalCode: '31171',
    city: 'Nordstemmen',
    country: 'DE',
  },
  social: {
    instagram: { handle: '@vsv.roessing', url: 'https://www.instagram.com/' },
    facebook: { url: 'https://www.facebook.com/' },
    whatsapp: { url: '' },
  },
} as const;

export async function getSiteDescription(): Promise<string> {
  return `Volkssportvereinigung Rössing von 1897 e.V. – ${await getSportCountWord()} Sportarten für Kinder, Jugendliche, Familien und Erwachsene. Schon ab 4 € im Monat dabei.`;
}

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  cta?: boolean;
}

// Beim Livegang auf false stellen.
export const isPrototype = true;

export const originalSiteUrl = 'https://vsv-roessing.de/';

export const clubAge = new Date().getFullYear() - site.founded;

export const slogan = site.sloganTemplate.replace('{age}', String(clubAge));

export const navigation: NavItem[] = [
  { label: 'Start', href: '/', icon: 'home' },
  { label: 'Sportangebote', href: '/sportangebote/', icon: 'sport' },
  { label: 'Mitglied werden', href: '/mitglied-werden/', icon: 'join', cta: true },
  { label: 'Verein', href: '/verein/', icon: 'info' },
  { label: 'Kontakt', href: '/kontakt/', icon: 'mail' },
];

export async function getFacts(): Promise<{ value: string; label: string }[]> {
  return [
    { value: String(site.founded), label: 'gegründet' },
    { value: `~${site.members}`, label: 'Mitglieder' },
    { value: String(await getSportCount()), label: 'Sportarten' },
    { value: 'ab 4 €', label: 'im Monat dabei' },
  ];
}

export const mapsUrl = (ort: { street?: string; postalCode?: string; city?: string }): string =>
  `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    [ort.street, ort.postalCode, ort.city].filter(Boolean).join(' '),
  )}`;
