/**
 * Der Vereinsvorstand.
 *
 * Angaben vom Verein, 22. September 2026. Der 1. Vorsitzende steht ohnehin
 * schon im Impressum – § 5 DDG verlangt die Vertretungsberechtigten, und
 * `impressum.ts` nennt ihn dort wortgleich wie die Altseite. Beide Stellen
 * müssen zusammenpassen; der Impressumstext ist bewusst eine unveränderte
 * Übernahme und wird deshalb nicht aus dieser Datei erzeugt.
 *
 * Alle vier Ämter sind benannt. Das Feld `name` bleibt trotzdem optional: Bei
 * einem Wechsel ist eine Stelle vorübergehend unbesetzt, und dann soll dort
 * ein zurückhaltendes „Name folgt" stehen statt einer erfundenen Angabe.
 */

export interface Vorstandsposten {
  /** Amtsbezeichnung, wie sie der Verein selbst führt. */
  role: string;
  /** Ohne Namen erscheint an der Stelle ein zurückhaltender Hinweis. */
  name?: string;
}

export const vorstand: Vorstandsposten[] = [
  { role: '1. Vorsitzender', name: 'Erich Könneke' },
  { role: '2. Vorsitzender', name: 'Uwe Speer' },
  { role: 'Kassenwart', name: 'Thomas Kuse' },
  { role: 'Schriftführerin', name: 'Monika Koch' },
];
