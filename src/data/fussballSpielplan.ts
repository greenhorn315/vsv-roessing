/**
 * Spielplan der Ü40-Mannschaft.
 *
 * Quelle: der am Sportplatz ausgehängte Plan, abgetippt vom Foto des Blattes
 * „Ü40“. Erfasst sind nur die Partien ab dem 14. September 2026; die Spiele
 * davor sind bereits gelaufen – genauso gehalten wie beim Dart-Spielplan.
 *
 * Auf dem Aushang war der 11.09.2026 durchgestrichen und handschriftlich auf
 * Dienstag, den 08.09.2026 vorverlegt. Beide Termine liegen vor dem Stichtag
 * und stehen deshalb nicht in der Liste.
 *
 * Heim- oder Auswärtsspiel steht im Aushang nicht als Wort, sondern in der
 * Reihenfolge: „Ü40 – Gegner“ ist ein Heimspiel, „Gegner – Ü40“ auswärts.
 * Heimspiele finden auf dem VSV-Sportplatz statt.
 */

import type { Spiel } from './spielplan';
import { nachTermin } from './spielplan';

/** Name der Mannschaft, so wie er auf dem Aushang steht. */
export const fussballTeam = 'Ü40';

/** Spielstätte der Heimspiele, siehe venues in site.ts. */
export const fussballSpielstaette = 'VSV-Sportplatz';

/** Stand des abgetippten Aushangs. */
export const fussballSpielplanStand = 'September 2026';

export const fussballSpiele: Spiel[] = nachTermin([
  { date: '2026-09-25', time: '19:00', opponent: 'SV Groß Düngen', home: false },
  { date: '2026-10-02', time: '19:00', opponent: 'SV BW Neuhof', home: true },
  { date: '2026-10-09', time: '19:00', opponent: 'SG Himmelsthür/Sorsum/Emmerke', home: false },
  { date: '2026-10-30', time: '19:00', opponent: 'SC Itzum', home: true },
]);
