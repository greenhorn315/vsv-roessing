import type { AgeGroup } from './sports';

/**
 * Trainingszeiten der Sparten.
 *
 * Quelle: Übungsleiterliste des VSV mit Stand 2022. Die Angaben sind noch
 * nicht vom Verein bestätigt – Gruppen können weggefallen, Zeiten verschoben
 * und Übungsleitungen gewechselt sein. Ein Trainingsort steht nur dort, wo
 * ihn die Liste ausdrücklich nennt; die übrigen Orte fehlen noch.
 */

export const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;

export type Weekday = (typeof weekdays)[number];

/** Zielgruppen-Einstieg: „Für wen ist was?“ */
export type AudienceKey = 'kinder' | 'jugend' | 'frauen' | 'maenner' | 'alle';

export const audienceLabels: Record<AudienceKey, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  frauen: 'Frauen',
  maenner: 'Männer',
  alle: 'Offen für alle',
};

/** Halbjahr, in dem eine Gruppe stattfindet. Ohne Angabe: ganzjährig. */
export type Season = 'winter' | 'sommer';

export const seasonLabels: Record<Season, string> = {
  winter: 'Winterhalbjahr',
  sommer: 'Sommerhalbjahr',
};

export interface Training {
  title: string;
  day: Weekday;
  /** Anzeigetext, entweder eine Uhrzeit, eine Spanne oder „nach Absprache“. */
  time: string;
  place?: string;
  /** Passende Sparte (slug aus sports.ts). */
  sport?: string;
  /** Für wen die Gruppe gedacht ist, in Worten. */
  audience?: string;
  /** Kurzer Zusatz, z. B. „14-tägig“ oder ein zweiter Termin im Winter. */
  note?: string;
  /** Übungsleitung; leere Liste heißt: die Gruppe sucht jemanden. */
  trainers?: string[];
  ageGroups?: AgeGroup[];
  /**
   * Für welchen Einstieg die Gruppe gelistet wird. Eine Gruppe kann in
   * mehreren stehen – „Damen“ etwa bei Frauen und bei Jugendlichen.
   */
  audienceGroups?: AudienceKey[];
  season?: Season;
}

/** Hinweis, der überall dort steht, wo Trainingszeiten angezeigt werden. */
export const trainingsStand =
  'Hallenzeiten nach dem Hallenplan Winter 2025/26, übrige Angaben nach der ' +
  'Übungsleiterliste von 2022 und noch nicht bestätigt.';

const alleTrainings: Training[] = [
  // Fußball
  {
    title: 'Damen',
    day: 'Mo',
    time: '19:00',
    sport: 'fussball',
    audience: 'Frauen ab 16 Jahren',
    note: 'Im Winter donnerstags 20:00 in der Sporthalle',
    trainers: ['Johanna Kasten'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['frauen', 'jugend'],
  },
  {
    title: 'I. Herren',
    day: 'Di',
    time: '19:00',
    sport: 'fussball',
    audience: 'Männer',
    note: 'Im Winter montags 20:00 in der Sporthalle',
    trainers: ['Dustin Schiewe'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['maenner'],
  },
  {
    title: 'Ü32',
    day: 'Di',
    time: '19:00',
    sport: 'fussball',
    audience: 'Männer ab 32 Jahren',
    note: 'Übungsleitung offen',
    trainers: [],
    ageGroups: ['erwachsene'],
    audienceGroups: ['maenner'],
  },
  {
    title: 'G-Jugend',
    day: 'Mi',
    time: '16:30–17:30',
    sport: 'fussball',
    audience: 'Kinder, etwa 5 bis 6 Jahre',
    trainers: ['Johanna Kasten', 'Marlene Ahrens'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'F-Jugend II',
    day: 'Mi',
    time: '17:30–18:30',
    sport: 'fussball',
    audience: 'Kinder, etwa 7 bis 8 Jahre',
    trainers: ['Roman Vesely'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'F-Jugend I',
    day: 'Fr',
    time: '16:30–17:30',
    sport: 'fussball',
    audience: 'Kinder, etwa 7 bis 8 Jahre',
    trainers: ['Luca Busche', 'Felix Satow'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'E-Jugend',
    day: 'Fr',
    time: '17:30–18:30',
    sport: 'fussball',
    audience: 'Kinder, etwa 9 bis 10 Jahre',
    trainers: ['Thomas Bajgier', 'Felix Satow'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },

  // Volleyball
  {
    title: 'Volleyball mixed',
    day: 'Mo',
    time: '20:00',
    sport: 'volleyball',
    audience: 'Erwachsene, gemischt',
    trainers: ['Gunnar Wolpert'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['alle'],
  },

  // Turnen
  {
    title: 'Montagsturner',
    day: 'Mo',
    time: '15:45–16:45',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    note: 'Zielgruppe noch zu klären',
    trainers: ['Monika Koch'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'move your body',
    day: 'Mi',
    time: '18:00–19:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Erwachsene',
    trainers: ['Denise Hoffmann'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'Frauengymnastik',
    day: 'Do',
    time: '10:30–11:30',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Frauen, vormittags',
    trainers: ['Monika Koch'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['frauen'],
  },
  {
    title: 'Eltern-Kind-Turnen',
    day: 'Do',
    time: '15:00–16:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Kleinkinder mit einem Elternteil',
    trainers: ['Elke Winkler'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Kinderturnen ab 3',
    day: 'Do',
    time: '16:00–17:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Kinder ab 3 Jahren',
    trainers: ['Elke Winkler'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Jugendturnen ab 6',
    day: 'Do',
    time: '17:00–18:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Kinder ab 6 Jahren',
    trainers: ['Elke Winkler'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Kinderturnen ab 9',
    day: 'Do',
    time: '18:00–19:00',
    sport: 'turnen',
    audience: 'Kinder ab 9 Jahren',
    note: '14-tägig',
    trainers: ['Elke Winkler'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Fit for fun',
    day: 'Do',
    time: '19:00–20:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Erwachsene',
    trainers: ['Monika Koch'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'Freitagsturner',
    day: 'Fr',
    time: '19:30–21:30',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'turnen',
    audience: 'Männer',
    note: 'Gymnastik, gelegentlich auch Yoga. Im Sommerhalbjahr fährt dieselbe Gruppe als „Freitagsradler“.',
    season: 'winter',
    trainers: ['Olaf Elbeshausen'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['maenner']
  },
  {
    title: 'Freitagsradler',
    day: 'Fr',
    time: 'nach Absprache',
    place: 'Treffpunkt am VSV-Sportplatz',
    sport: 'turnen',
    audience: 'Männer',
    note: 'Touren mit Gravelbike oder E-Bike durch das Rössinger Umland, anschließend Grillen am Feuerplatz beim VSV-Sportplatz. Im Winterhalbjahr turnt dieselbe Gruppe als „Freitagsturner“ in der Halle.',
    season: 'sommer',
    ageGroups: ['erwachsene'],
    audienceGroups: ['maenner'],
  },

  // Tanzen
  {
    title: 'Jazz Dance Frauen',
    day: 'Mi',
    time: '19:00–20:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'tanzen',
    audience: 'Frauen',
    trainers: ['Britta Ahrens'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['frauen'],
  },
  {
    title: 'Jazz Dance Jugend',
    day: 'Mi',
    time: '20:00–21:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'tanzen',
    audience: 'Jugendliche',
    trainers: ['Britta Ahrens'],
    ageGroups: ['jugend'],
    audienceGroups: ['jugend'],
  },
  {
    title: 'Jazzdance Sweeties',
    day: 'Sa',
    time: '9:00–9:45',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'tanzen',
    audience: 'Kinder ab 3 Jahren bis zur 1. Klasse',
    trainers: ['Louisa Maiwald'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Jazzdance Butterflies',
    day: 'Sa',
    time: '9:45–10:30',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'tanzen',
    audience: 'Kinder der 2. bis 5. Klasse',
    trainers: ['Louisa Maiwald'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Jazzdance Nameless',
    day: 'Sa',
    time: '10:30–11:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'tanzen',
    audience: 'Jugendliche ab der 6. Klasse',
    trainers: ['Louisa Maiwald'],
    ageGroups: ['jugend'],
    audienceGroups: ['jugend'],
  },
  {
    title: 'Jazzdance JAM-Touch',
    day: 'Sa',
    time: '11:00–12:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'tanzen',
    audience: 'ab 15 Jahren',
    trainers: ['Britta Ahrens'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['jugend', 'alle'],
  },

  // Basketball
  {
    title: 'Basketball',
    day: 'Sa',
    time: '14:00–16:00',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'basketball',
    note: 'Altersgruppe noch zu klären',
    trainers: ['Lennart Ahrens'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['jugend', 'alle'],
  },

  // Leichtathletik
  {
    title: 'Spielerische Grundlagen',
    day: 'Mo',
    time: '17:00–18:00',
    sport: 'leichtathletik',
    audience: 'Kinder von 4 bis 7 Jahren',
    trainers: ['Alexandra Stichnoth'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Hochsprung',
    day: 'Mo',
    time: '18:00–20:00',
    sport: 'leichtathletik',
    audience: 'Leistungsgruppe',
    trainers: ['Claudia Losch'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'fit for school',
    day: 'Di',
    time: '16:30–18:00',
    sport: 'leichtathletik',
    audience: 'Kinder von 8 bis 11 Jahren',
    trainers: ['Olga Schmidt'],
    ageGroups: ['kinder'],
    audienceGroups: ['kinder'],
  },
  {
    title: 'Jugend-Leistungsgruppe',
    day: 'Di',
    time: '18:00–19:30',
    sport: 'leichtathletik',
    audience: 'Jugendliche',
    trainers: ['Olga Schmidt'],
    ageGroups: ['jugend'],
    audienceGroups: ['jugend'],
  },
  {
    title: 'Erwachsene',
    day: 'Di',
    time: '19:30–21:30',
    sport: 'leichtathletik',
    audience: 'Erwachsene',
    trainers: ['Svenja Ebeling'],
    ageGroups: ['erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'Wurfgruppe',
    day: 'Do',
    time: '18:00–19:30',
    sport: 'leichtathletik',
    audience: 'Leistungsgruppe',
    trainers: ['Vivien Sekul'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'Sprint- und Sprunggruppe',
    day: 'Do',
    time: '18:30–20:00',
    place: 'SLZ Hannover',
    sport: 'leichtathletik',
    audience: 'Leistungsgruppe',
    trainers: ['Britta Härke'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'Lauf- und Sprungtraining',
    day: 'Fr',
    time: 'nach Absprache',
    place: 'Sportplatz Nordstemmen',
    sport: 'leichtathletik',
    audience: 'Leistungsgruppe',
    trainers: ['Britta Härke'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['alle'],
  },
  {
    title: 'Krafttraining',
    day: 'Sa',
    time: '12:00–14:00',
    sport: 'leichtathletik',
    audience: 'Leistungsgruppe',
    trainers: ['Claudia Losch'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['alle'],
  },

  // Yoga
  {
    title: 'Yoga',
    day: 'Fr',
    time: '18:30–19:30',
    place: 'Alfred-Stubenrauch-Sporthalle',
    sport: 'yoga',
    audience: 'Erwachsene',
    note: 'Übungsleitung offen',
    trainers: [],
    ageGroups: ['erwachsene'],
    audienceGroups: ['alle'],
  },

  // Dart
  {
    title: 'Dart-Training',
    day: 'Mo',
    time: 'ab 19:00',
    sport: 'dart',
    audience: 'von 14 bis 60 Jahren, alle Spielstärken',
    trainers: ['Marina Miska'],
    ageGroups: ['jugend', 'erwachsene'],
    audienceGroups: ['jugend', 'alle'],
  },
];

/**
 * Beginn in Minuten nach Mitternacht, für die Sortierung. Termine ohne feste
 * Uhrzeit („nach Absprache“) stehen am Ende ihres Tages.
 */
const beginn = (time: string): number => {
  const treffer = time.match(/(\d{1,2}):(\d{2})/);
  if (!treffer) return 24 * 60;
  return Number(treffer[1]) * 60 + Number(treffer[2]);
};

/** Alle Trainings, sortiert nach Wochentag und Uhrzeit. */
export const trainings: Training[] = [...alleTrainings].sort(
  (a, b) =>
    weekdays.indexOf(a.day) - weekdays.indexOf(b.day) ||
    beginn(a.time) - beginn(b.time),
);

/** Die Trainings einer Sparte, in derselben Reihenfolge. */
export const trainingsOfSport = (slug: string): Training[] =>
  trainings.filter((training) => training.sport === slug);

/** Nach Wochentagen gruppiert; Tage ohne Training fallen weg. */
export const trainingsByDay = (): { day: Weekday; entries: Training[] }[] =>
  weekdays
    .map((day) => ({
      day,
      entries: trainings.filter((training) => training.day === day),
    }))
    .filter((gruppe) => gruppe.entries.length > 0);

/** Alle Gruppen eines Zielgruppen-Einstiegs, in der Reihenfolge der Woche. */
export function trainingsFuer(key: AudienceKey): Training[] {
  return trainings.filter((t) => t.audienceGroups?.includes(key));
}

/**
 * Kennzahlen des Vereins, aus den Trainingsdaten abgeleitet – so bleiben sie
 * richtig, wenn Gruppen dazukommen oder wegfallen.
 */
export const vereinsZahlen = (() => {
  const uebungsleitungen = new Set<string>();
  let ohneLeitung = 0;
  for (const t of trainings) {
    if (!t.trainers || t.trainers.length === 0) ohneLeitung++;
    t.trainers?.forEach((name) => uebungsleitungen.add(name));
  }
  return {
    gruppen: trainings.length,
    uebungsleitungen: uebungsleitungen.size,
    kinderangebote: trainingsFuer('kinder').length,
    trainingstage: new Set(trainings.map((t) => t.day)).size,
    ohneLeitung,
  };
})();
