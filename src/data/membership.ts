/**
 * Beiträge und Familienrechner.
 * ⚠️ Platzhalterwerte aus dem Konzept – vor dem Livegang mit der
 * gültigen Beitragsordnung abgleichen.
 */

export interface Fee {
  label: string;
  monthly: number;
  note?: string;
}

export const fees: Fee[] = [
  { label: 'Kinder (bis 12 Jahre)', monthly: 4 },
  { label: 'Jugendliche (bis 18 Jahre)', monthly: 5 },
  { label: 'Erwachsene', monthly: 8 },
  { label: 'Familie (gedeckelt)', monthly: 18, note: 'egal wie viele Kinder' },
];

/** Rechenwerte des Familienrechners. */
export const calculator = {
  /** Durchschnittlicher Einzelbeitrag pro Person. */
  singleRate: 6,
  /** Basisbeitrag ab zwei Personen. */
  familyBase: 10,
  /** Aufschlag je weiterer Person. */
  familyStep: 4,
  /** Obergrenze – mehr zahlt eine Familie nie. */
  familyCap: 18,
};

export const joinSteps = [
  {
    title: 'Formular holen',
    text: 'Online ausfüllen oder als PDF unter „Mitglied werden" herunterladen.',
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
