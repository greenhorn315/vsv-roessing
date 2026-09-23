import type { IconName } from '../components/icons';
import { sportCount, sportCountWord } from './sports';

/**
 * Zentrale Vereins- und Seitendaten.
 * Fast alle Texte/Zahlen der Website hängen hier dran – zum Pflegen genügt
 * in der Regel diese Datei plus die anderen Dateien in `src/data/`.
 */

export const site = {
  name: 'VSV Rössing von 1897 e.V.',
  /** Amtlicher Name laut Vereinsregister (VR140049, AG Hildesheim). */
  legalName: 'Volkssportvereinigung von 1897 Rössing e.V.',
  shortName: 'VSV Rössing',
  founded: 1897,
  /** {age} wird durch das aktuelle Vereinsalter ersetzt. */
  sloganTemplate: '{age} Jahre Bewegung. Und richtig gut drauf.',
  description: `Volkssportvereinigung Rössing von 1897 e.V. – ${sportCountWord} Sportarten für Kinder, Jugendliche, Familien und Erwachsene in jedem Alter. Schon ab 4 € im Monat dabei.`,
  email: 'vorstand@vsv-roessing.de',
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

export interface Venue {
  name: string;
  /** Zweiter gebräuchlicher Name, z. B. auf Karten. Wird als „auch …“ gezeigt. */
  alias?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  /** Was dort stattfindet. */
  note: string;
  /** Was vor Ort zur Verfügung steht, z. B. Umkleiden. */
  facilities?: string;
  /**
   * Fotos unter public/images/sportstaetten/. Das erste ist das Hauptbild,
   * weitere erscheinen als kleine Ansichten darunter. Fehlt eine Datei, zeigt
   * die Seite automatisch einen Platzhalter statt eines kaputten Bildes.
   */
  photos?: VenuePhoto[];
}

export interface VenuePhoto {
  src: string;
  alt: string;
  /** Kurze Bildunterschrift für die kleinen Ansichten. */
  caption?: string;
}

/**
 * Sportstätten des Vereins an zwei Anschriften: Sporthalle und Dorfbrunnen
 * teilen sich im Loderwinkel sogar ein Gebäude, Sportplatz und Vereinsheim
 * liegen Zum Klay.
 */
export const venues: Venue[] = [
  {
    name: 'Alfred-Stubenrauch-Sporthalle',
    street: 'Loderwinkel 2A',
    postalCode: '31171',
    city: 'Nordstemmen-Rössing',
    note: 'Turnen, Tanzen, Yoga, Basketball – und im Winterhalbjahr Fußball und Leichtathletik',
    facilities: 'Umkleiden und Duschen im Haus, Parkplätze und ein öffentlicher Spielplatz direkt nebenan',
    photos: [
      {
        src: '/images/sportstaetten/sporthalle.jpg',
        alt: 'Alfred-Stubenrauch-Halle bei Abendsonne: roter Klinkerbau mit dem Namensschriftzug unter dem Dachrand, rechts das Schild „Zum Dorfbrunnen“',
      },
      {
        src: '/images/sportstaetten/sporthalle-eingang.jpg',
        alt: 'Verglaster Eingang zur Sporthalle mit Doppeltür unter dem hölzernen Vordach',
        caption: 'Turnhalleneingang',
      },
    ],
  },
  {
    name: 'Zum Dorfbrunnen',
    street: 'Loderwinkel 2A',
    postalCode: '31171',
    city: 'Nordstemmen-Rössing',
    note: 'Im selben Gebäude wie die Sporthalle. Treffpunkt des Vereins sowie Trainings- und Wettkampfstätte der Dart-Gruppe',
    photos: [
      {
        src: '/images/sportstaetten/dorfbrunnen.jpg',
        alt: 'Eingang des Dorfbrunnens unter dem Vordach, darüber der Schriftzug „Zum Dorfbrunnen“',
      },
      {
        src: '/images/sportstaetten/dorfbrunnen-hinten.jpg',
        alt: 'Rückseite des Dorfbrunnens: verglaste Front unter dem Vordach, davor eine Bank',
        caption: 'Rückseite',
      },
    ],
  },
  {
    name: 'VSV-Sportplatz',
    alias: 'Sportplatz Rössing',
    street: 'Zum Klay 6',
    postalCode: '31171',
    city: 'Nordstemmen',
    note: 'Fußball und Leichtathletik im Sommerhalbjahr',
    facilities: 'Rasenplatz mit drei Toren, dazu eine Weitsprunganlage mit Tartan-Anlaufbahn',
    photos: [
      {
        src: '/images/sportstaetten/sportplatz.jpg',
        alt: 'Rasenplatz des VSV Rössing mit drei Toren, Flutlichtmast und überdachtem Unterstand unter blauem Himmel',
      },
      {
        src: '/images/sportstaetten/sportplatz-weitsprunganlage.jpg',
        alt: 'Rote Tartanbahn mit weißer Markierungslinie, die auf eine Sandgrube zuläuft; am Ende harken zwei Personen den Sand',
        caption: 'Weitsprunganlage',
      },
    ],
  },
  {
    name: 'Feuerplatz am Sportplatz',
    street: 'Zum Klay 6',
    postalCode: '31171',
    city: 'Nordstemmen',
    note: 'Treffpunkt der Freitagsradler: Im Sommerhalbjahr wird hier nach der Tour gegrillt',
    photos: [
      // Vorläufig: zeigt erkennbare Personen. Vor dem Livegang entweder deren
      // Einwilligung einholen oder durch ein Bild ohne Personen ersetzen.
      {
        src: '/images/sportstaetten/feuerplatz.jpg',
        alt: 'Runde Feuerstelle am Waldrand, ringsum Bänke, an denen eine Gruppe im Abendlicht sitzt',
      },
    ],
  },
  {
    name: 'Vereinsheim VSV Rössing',
    street: 'Zum Klay 6',
    postalCode: '31171',
    city: 'Nordstemmen',
    note: 'am Sportplatz',
    facilities: 'Gaststube mit Tresen und Küche',
    photos: [
      {
        src: '/images/sportstaetten/vereinsheim.jpg',
        alt: 'Eingang des Vereinsheims: Klinkerfassade mit Glastür, darüber ein Banner mit Vereinswappen und der Aufschrift „Herzlich Willkommen auf unserer Sportanlage“, links der Aushangkasten',
      },
      {
        src: '/images/sportstaetten/vereinsheim-gaststaette.jpg',
        alt: 'Gaststube im Vereinsheim mit Tresen, Barhockern, Holztischen und einer Vitrine voller Pokale',
        caption: 'Gaststube',
      },
    ],
  },
];

/**
 * Karten-Link auf die Anschrift, damit die Navigation direkt startet.
 * Genutzt von der Sportstätten-Galerie und von der Adressliste auf der
 * Kontaktseite – beide sollen dieselbe Adresse ansteuern.
 */
export const mapsUrl = (ort: Venue): string =>
  `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    [ort.street, ort.postalCode, ort.city].filter(Boolean).join(' '),
  )}`;

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
  { label: 'Sportangebote', href: '/sportangebote', icon: 'sport' },
  { label: 'Mitglied werden', href: '/mitglied-werden', icon: 'join', cta: true },
  { label: 'Verein', href: '/verein', icon: 'info' },
  { label: 'Kontakt', href: '/kontakt', icon: 'mail' },
];

/** Kennzahlen für die Faktenleiste unter dem Hero. */
export const facts = [
  { value: '1897', label: 'gegründet' },
  { value: '~660', label: 'Mitglieder' },
  { value: String(sportCount), label: 'Sportarten' },
  { value: 'ab 4 €', label: 'im Monat dabei' },
] as const;
