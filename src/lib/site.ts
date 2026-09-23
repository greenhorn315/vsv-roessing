import type { IconName } from '../components/icons';
import { getSportCount, getSportCountWord } from './sportarten';

/**
 * Zentrale Vereins- und Seitendaten.
 *
 * Das ist Konfiguration, kein gepflegter Inhalt: Name, Anschrift und
 * Navigation ändern sich selten, und vieles hier hängt an anderer Stelle im
 * Code. Was der Verein laufend pflegt – Sportarten, Trainingszeiten,
 * Sportstätten, Meldungen –, liegt als Content Collection unter
 * `src/content/`.
 */

export const site = {
  name: 'VSV Rössing von 1897 e.V.',
  /** Amtlicher Name laut Vereinsregister (VR140049, AG Hildesheim). */
  legalName: 'Volkssportvereinigung von 1897 Rössing e.V.',
  shortName: 'VSV Rössing',
  founded: 1897,
  /**
   * Ungefähre Mitgliederzahl. Die einzige Stelle dafür: Faktenleiste und
   * Vereinsseite lesen sie von hier.
   */
  members: 660,
  /** {age} wird durch das aktuelle Vereinsalter ersetzt. */
  sloganTemplate: '{age} Jahre Bewegung. Und richtig gut drauf.',
  email: 'vorstand@vsv-roessing.de',
  /**
   * Auch im Impressum und in der Datenschutzerklärung – dort als Teil des
   * übernommenen Rechtstexts wortgleich, deshalb nicht von hier erzeugt.
   * Bei einer Änderung alle drei Stellen anpassen.
   */
  phone: '+49 (0) 50 69 / 74 15',
  address: {
    /** Anschrift des Vereins laut Impressum. */
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

/**
 * Standardbeschreibung für Suchmaschinen und Vorschaubilder. Eine Funktion,
 * weil die Zahl der Sportarten aus der Collection kommt.
 */
export async function getSiteDescription(): Promise<string> {
  return `Volkssportvereinigung Rössing von 1897 e.V. – ${await getSportCountWord()} Sportarten für Kinder, Jugendliche, Familien und Erwachsene in jedem Alter. Schon ab 4 € im Monat dabei.`;
}

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  /** Hervorgehobener Handlungsaufruf in der Navigation. */
  cta?: boolean;
}

/**
 * Solange true, weist die Startseite sichtbar als Prototyp aus und alle
 * Seiten werden für Suchmaschinen auf noindex gesetzt. Beim Livegang auf
 * false stellen – das entfernt Banner und Sperre in einem Schritt.
 */
export const isPrototype = true;

/** Adresse der bestehenden Website, die dieser Entwurf ablösen soll. */
export const originalSiteUrl = 'https://vsv-roessing.de/';

/** Vereinsalter in vollen Jahren. */
export const clubAge = new Date().getFullYear() - site.founded;

/** Slogan mit eingesetztem Vereinsalter. */
export const slogan = site.sloganTemplate.replace('{age}', String(clubAge));

/** Hauptnavigation – bewusst auf fünf Punkte begrenzt. */
export const navigation: NavItem[] = [
  { label: 'Start', href: '/', icon: 'home' },
  { label: 'Sportangebote', href: '/sportangebote/', icon: 'sport' },
  { label: 'Mitglied werden', href: '/mitglied-werden/', icon: 'join', cta: true },
  { label: 'Verein', href: '/verein/', icon: 'info' },
  { label: 'Kontakt', href: '/kontakt/', icon: 'mail' },
];

/** Kennzahlen für die Faktenleiste unter dem Hero. */
export async function getFacts(): Promise<{ value: string; label: string }[]> {
  return [
    { value: String(site.founded), label: 'gegründet' },
    { value: `~${site.members}`, label: 'Mitglieder' },
    { value: String(await getSportCount()), label: 'Sportarten' },
    { value: 'ab 4 €', label: 'im Monat dabei' },
  ];
}
