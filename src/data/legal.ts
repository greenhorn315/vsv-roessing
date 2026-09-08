/**
 * Bausteine für Rechtstexte (Impressum, Datenschutzerklärung).
 *
 * Die Texte werden wortgleich von der bestehenden Website übernommen und
 * hier nur in Blöcke zerlegt, damit sie sich ohne HTML pflegen lassen:
 *   heading – Überschrift (level 2 = Abschnitt, 3 = Unterabschnitt)
 *   lines   – ein Absatz, dessen Einträge durch Zeilenumbrüche getrennt sind
 *   text    – ein Fließtextabsatz
 *
 * E-Mail-Adressen, Web-Adressen und Telefonnummern werden beim Rendern
 * automatisch verlinkt (siehe LegalContent.astro).
 */
export type LegalBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'lines'; lines: string[] }
  | { type: 'text'; text: string };
