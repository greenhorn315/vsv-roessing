import type { IconName } from '../components/icons';

export type AgeGroup = 'kinder' | 'jugend' | 'erwachsene';

export interface Sport {
  slug: string;
  name: string;
  teaser: string;
  /** Längerer Text für die Sparten-Übersicht. */
  description: string;
  icon: IconName;
  /** Akzentfarbe der Karte (Design-System-Token oder Hex). */
  color: string;
  ageGroups: AgeGroup[];
  contact?: string;
}

export const ageGroupLabels: Record<AgeGroup, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  erwachsene: 'Erwachsene',
};

export const sports: Sport[] = [
  {
    slug: 'fussball',
    name: 'Fußball',
    teaser: 'Von Bambini bis Herren/Damen',
    description:
      'Unsere größte Sparte: Training auf dem VSV-Sportplatz, von den Bambini ab vier Jahren bis zu den Erwachsenenmannschaften.',
    icon: 'football',
    color: 'var(--c-primary-light)',
    ageGroups: ['kinder', 'jugend', 'erwachsene'],
  },
  {
    slug: 'volleyball',
    name: 'Volleyball',
    teaser: 'Freizeit & Wettkampf',
    description:
      'Gemischte Freizeitgruppe und ambitioniertes Training in der Alfred-Stubenrauch-Sporthalle – Einsteigerinnen und Einsteiger jederzeit willkommen.',
    icon: 'volleyball',
    color: 'var(--c-accent)',
    ageGroups: ['jugend', 'erwachsene'],
  },
  {
    slug: 'leichtathletik',
    name: 'Leichtathletik',
    teaser: 'Laufen, Werfen, Springen',
    description:
      'Vielseitige Grundlagenarbeit für Kinder und Jugendliche, dazu Lauftreffs für alle, die einfach in Bewegung bleiben wollen.',
    icon: 'athletics',
    color: 'var(--c-primary)',
    ageGroups: ['kinder', 'jugend', 'erwachsene'],
  },
  {
    slug: 'turnen',
    name: 'Turnen',
    teaser: 'Für die Kleinsten bis Erwachsene',
    description:
      'Eltern-Kind-Turnen, Kinderturnen und Gymnastikgruppen für Erwachsene – Bewegung von Anfang an.',
    icon: 'gym',
    color: 'var(--c-sun-dark)',
    ageGroups: ['kinder', 'erwachsene'],
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    teaser: 'Teamsport für alle Level',
    description:
      'Offenes Hallentraining, bei dem Technik und Spaß am Spiel im Vordergrund stehen. Vorkenntnisse sind nicht nötig.',
    icon: 'basketball',
    color: 'var(--c-primary-light)',
    ageGroups: ['jugend', 'erwachsene'],
  },
  {
    slug: 'tanzen',
    name: 'Tanzen',
    teaser: 'Bewegung mit Musik',
    description:
      'Von Kindertanz bis zur Tanzgymnastik für Erwachsene – Rhythmus, Koordination und gute Laune.',
    icon: 'dance',
    color: 'var(--c-accent)',
    ageGroups: ['kinder', 'jugend', 'erwachsene'],
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    teaser: 'Gemeinsam die Region erkunden',
    description:
      'Wanderungen und Touren durch das Rössinger Umland – gemütliches Tempo, gute Gespräche, gemeinsame Einkehr.',
    icon: 'hiking',
    color: 'var(--c-primary)',
    ageGroups: ['erwachsene'],
  },
  {
    slug: 'dart',
    name: 'Dart',
    teaser: 'Geselligkeit & Zielgenauigkeit',
    description:
      'Wöchentlicher Dart-Abend im Vereinsheim – Freizeitrunde, Ligabetrieb und offene Boards für Neugierige.',
    icon: 'dart',
    color: 'var(--c-sun-dark)',
    ageGroups: ['jugend', 'erwachsene'],
  },
];
