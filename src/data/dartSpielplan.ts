/**
 * Spielplan der Dart-Mannschaften für die Saison 2026/2027.
 *
 * Quelle: der ausgehängte Spielplan des Vereins, abgetippt von den Fotos der
 * drei Blätter für A-, B- und C-Team. Erfasst sind nur die Partien ab dem
 * 14. September 2026; die Spiele davor sind bereits gelaufen.
 *
 * Zwei Stellen weichen bewusst vom Aushang ab:
 *
 * - Der Gegner des C-Teams am 20.02.2027 steht dort als „FC Ruthe 26ers A“,
 *   dieselbe Mannschaft also, gegen die am selben Tag zur selben Zeit auch
 *   das B-Team spielt. Das kann nicht sein. In der Klasse des C-Teams treten
 *   die übrigen Vereine jeweils mit ihrer nächsten Mannschaft an (Barrels &
 *   Bier B statt A, Rising Boyz C statt B), deshalb steht hier die
 *   B-Mannschaft.
 * - Der Ort heißt einheitlich Himmelsthür; das Blatt des A-Teams schreibt ihn
 *   ohne s.
 *
 * Am 11.12.2026 war der Gegner des A-Teams am Blattrand abgeschnitten. Nach
 * dem Rückspiel am 22.05.2027 ist es die B-Mannschaft der Dart Akademie.
 */

import type { Spiel } from './spielplan';
import { kommendeSpiele, nachTermin, spielDatum } from './spielplan';

export type DartTeam = 'A' | 'B' | 'C';

export interface DartSpiel extends Spiel {
  team: DartTeam;
  /** true = Heimspiel im Dorfbrunnen. */
  home: boolean;
}

export const dartSaison = '2026/2027';

const spiele: DartSpiel[] = [
  // A-Team
  { team: 'A', date: '2026-09-18', time: '19:00', opponent: 'Tus Grün Weiß Himmelsthür A', home: true },
  { team: 'A', date: '2026-09-25', time: '19:00', opponent: '1. Dartclub Hildesheim e.V. B', home: false },
  { team: 'A', date: '2026-10-09', time: '19:00', opponent: 'TSG Everode A', home: false },
  { team: 'A', date: '2026-10-23', time: '19:00', opponent: 'DV Arpke A', home: true },
  { team: 'A', date: '2026-11-06', time: '19:00', opponent: 'Tus Lühnde e.V. A', home: false },
  { team: 'A', date: '2026-11-28', time: '19:00', opponent: 'PDC Hannover e.V. A', home: false },
  { team: 'A', date: '2026-12-11', time: '19:00', opponent: 'Dart Akademie Hannover e.V. B', home: true },
  { team: 'A', date: '2027-01-09', time: '19:00', opponent: 'Die Zeitdiebe Herrenhausen e.V. A', home: false },
  { team: 'A', date: '2027-02-05', time: '19:00', opponent: '1. Dartclub Hildesheim e.V. B', home: true },
  { team: 'A', date: '2027-02-20', time: '19:00', opponent: 'SC Drop out Seelze e.V. A', home: false },
  { team: 'A', date: '2027-03-05', time: '19:00', opponent: 'Tus Grün Weiß Himmelsthür A', home: false },
  { team: 'A', date: '2027-03-19', time: '19:00', opponent: 'TSG Everode A', home: true },
  { team: 'A', date: '2027-04-10', time: '19:00', opponent: 'DV Arpke A', home: false },
  { team: 'A', date: '2027-04-23', time: '19:00', opponent: 'Tus Lühnde e.V. A', home: true },
  { team: 'A', date: '2027-05-07', time: '19:00', opponent: 'PDC Hannover e.V. A', home: true },
  { team: 'A', date: '2027-05-22', time: '19:00', opponent: 'Dart Akademie Hannover e.V. B', home: false },

  // B-Team
  { team: 'B', date: '2026-09-19', time: '14:00', opponent: 'SV Groß Düngen Darts A', home: true },
  { team: 'B', date: '2026-10-10', time: '19:00', opponent: 'Flying Owls Hörsum e.V. B', home: false },
  { team: 'B', date: '2026-10-24', time: '14:00', opponent: 'Sieben Zwerge Dart Team e.V. C', home: true },
  { team: 'B', date: '2026-11-07', time: '15:00', opponent: 'Blue Eagles Hildesheim A', home: false },
  { team: 'B', date: '2026-11-27', time: '19:00', opponent: 'Rising Boyz Hildesheim B', home: false },
  { team: 'B', date: '2026-12-12', time: '14:00', opponent: 'Thomy Roses DC Hildesheim C', home: true },
  { team: 'B', date: '2027-01-08', time: '19:00', opponent: 'Barrels & Bier 24 A', home: true },
  { team: 'B', date: '2027-02-06', time: '14:00', opponent: 'DC No Mercy e.V. E', home: true },
  { team: 'B', date: '2027-02-20', time: '18:00', opponent: 'FC Ruthe 26ers A', home: false },
  { team: 'B', date: '2027-03-06', time: '18:30', opponent: 'SV Groß Düngen Darts A', home: false },
  { team: 'B', date: '2027-03-20', time: '14:00', opponent: 'Flying Owls Hörsum e.V. B', home: true },
  { team: 'B', date: '2027-04-10', time: '15:00', opponent: 'Sieben Zwerge Dart Team e.V. C', home: false },
  { team: 'B', date: '2027-04-24', time: '14:00', opponent: 'Blue Eagles Hildesheim A', home: true },
  { team: 'B', date: '2027-05-08', time: '14:00', opponent: 'Rising Boyz Hildesheim B', home: true },
  { team: 'B', date: '2027-05-22', time: '16:00', opponent: 'Thomy Roses DC Hildesheim C', home: false },

  // C-Team
  { team: 'C', date: '2026-09-19', time: '19:00', opponent: 'TSV Söhlde e.V. C', home: true },
  { team: 'C', date: '2026-10-09', time: '19:00', opponent: 'TSG Everode B', home: false },
  { team: 'C', date: '2026-10-24', time: '19:00', opponent: 'Egentown Steelers B', home: true },
  { team: 'C', date: '2026-11-07', time: '14:00', opponent: 'Egentown Steelers C', home: false },
  { team: 'C', date: '2026-11-27', time: '19:00', opponent: 'Rising Boyz Hildesheim C', home: false },
  { team: 'C', date: '2026-12-12', time: '19:00', opponent: 'Tus Grün Weiß Himmelsthür D', home: true },
  { team: 'C', date: '2027-01-09', time: '15:00', opponent: 'DC Donkeys Freden e.V. C', home: false },
  { team: 'C', date: '2027-02-06', time: '19:00', opponent: 'Barrels & Bier 24 B', home: true },
  { team: 'C', date: '2027-02-20', time: '18:00', opponent: 'FC Ruthe 26ers B', home: false },
  { team: 'C', date: '2027-03-06', time: '19:00', opponent: 'TSV Söhlde e.V. C', home: false },
  { team: 'C', date: '2027-03-20', time: '19:00', opponent: 'TSG Everode B', home: true },
  { team: 'C', date: '2027-04-10', time: '19:00', opponent: 'Egentown Steelers B', home: false },
  { team: 'C', date: '2027-04-24', time: '19:00', opponent: 'Egentown Steelers C', home: true },
  { team: 'C', date: '2027-05-08', time: '19:00', opponent: 'Rising Boyz Hildesheim C', home: true },
  { team: 'C', date: '2027-05-22', time: '19:00', opponent: 'Tus Grün Weiß Himmelsthür D', home: false },
];

/** Alle erfassten Partien, sortiert nach Datum, Uhrzeit und Mannschaft. */
export const dartSpiele: DartSpiel[] = nachTermin(spiele);

/** Die Partien ab dem Stichtag; ein Spiel am heutigen Tag zählt noch dazu. */
export const kommendeDartSpiele = (stichtag: Date = new Date()): DartSpiel[] =>
  kommendeSpiele(dartSpiele, stichtag);

/** Datum als „Fr, 18.09.2026“. */
export const dartDatum = spielDatum;
