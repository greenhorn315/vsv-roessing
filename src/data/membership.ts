/**
 * Beiträge, Formulare und Familienrechner.
 *
 * Quelle sind die Vereinsformulare vom September 2026: die Eintrittserklärung
 * nennt die drei Beitragssätze, der Antrag auf Ermäßigung den ermäßigten
 * Jahresbeitrag. Der Kassenwart hat die Sätze bestätigt.
 */

export interface Fee {
  label: string;
  /** Monatsbeitrag. Abgebucht wird jährlich, siehe beitragseinzug. */
  monthly: number;
  yearly: number;
  note?: string;
}

export const fees: Fee[] = [
  { label: 'Kinder und Jugendliche', monthly: 4, yearly: 48 },
  {
    label: 'Einzelbeitrag',
    monthly: 7.5,
    yearly: 90,
    note: 'Erwachsene und aktive Rentnerinnen und Rentner',
  },
  {
    label: 'Familienbeitrag',
    monthly: 15,
    yearly: 180,
    note: 'Familien mit minderjährigen Kindern – egal wie viele',
  },
];

/** Regeln rund um den Beitrag, wie sie in den Formularen stehen. */
export const beitragsregeln = {
  einzug:
    'Der Beitrag wird einmal im Jahr abgebucht, jeweils am 1. Juni für das laufende Kalenderjahr.',
  guenstigster:
    'Der Verein ermittelt für eine Familie automatisch den günstigsten Beitrag – ihr müsst nicht selbst rechnen.',
  kuendigung:
    'Kündigen könnt ihr jederzeit schriftlich zum Quartalsende, ohne Kündigungsfrist. Zu viel gezahlte Beiträge schreibt der Verein von selbst gut.',
  ermaessigung:
    'Bei Schulausbildung, Studium sowie Grundwehr- oder Ersatzdienst ermäßigt sich der Jahresbeitrag auf 48 €. Eine Berufsausbildung zählt nicht dazu; ein Nachweis ist nötig.',
} as const;

/**
 * Rechenwerte des Familienrechners – dieselben Sätze wie oben.
 * Der Familienbeitrag greift nur, wenn minderjährige Kinder dabei sind;
 * sonst zahlt jede erwachsene Person ihren Einzelbeitrag.
 */
export const calculator = {
  erwachsen: 7.5,
  kind: 4,
  familie: 15,
};

export interface Download {
  title: string;
  text: string;
  /** Pfad unter public/downloads/. */
  file: string;
  /** Dateigröße in Bytes, für die Anzeige neben dem Link. */
  bytes: number;
  pages: number;
}

export const downloads: Download[] = [
  {
    title: 'Aufnahmeantrag',
    text: 'Eintrittserklärung mit SEPA-Lastschriftmandat und Datenschutzhinweisen. Für neue Mitglieder genügt dieses eine Formular.',
    file: '/downloads/aufnahmeantrag.pdf',
    bytes: 138441,
    pages: 2,
  },
  {
    title: 'SEPA-Lastschriftmandat',
    text: 'Einzeln, falls sich eure Bankverbindung ändert. Ein neues Mandat ersetzt das alte.',
    file: '/downloads/sepa-lastschriftmandat.pdf',
    bytes: 42669,
    pages: 1,
  },
  {
    title: 'Antrag auf Beitragsermäßigung',
    text: 'Für Schulausbildung, Studium sowie Grundwehr- oder Ersatzdienst. Nachweis bitte beilegen.',
    file: '/downloads/beitragsermaessigung.pdf',
    bytes: 78020,
    pages: 1,
  },
  {
    title: 'Austrittserklärung',
    text: 'Kündigung zum Quartalsende. Familienmitglieder könnt ihr einzeln angeben.',
    file: '/downloads/austrittserklaerung.pdf',
    bytes: 107791,
    pages: 1,
  },
];

export const joinSteps = [
  {
    title: 'Formular holen',
    text: 'Aufnahmeantrag als PDF herunterladen – SEPA-Mandat ist schon darin enthalten.',
  },
  {
    title: 'Ausfüllen & senden',
    text: 'Per Post oder als Scan an den Vorstand – beides geht.',
  },
  {
    title: 'Loslegen',
    text: 'Einfach zum nächsten Training dazukommen. Fertig.',
  },
];
