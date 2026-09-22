export interface NewsItem {
  /** ISO-Datum (YYYY-MM-DD) – Anzeigeformat wird daraus erzeugt. */
  date: string;
  title: string;
  text: string;
  href?: string;
}

/**
 * Die Startseite zeigt die ersten drei Einträge, in genau dieser Reihenfolge.
 * Oben steht deshalb, was gerade zählt: zuerst die jüngste Meldung, darunter
 * die nächsten Termine. Alte Einträge wandern heraus, nicht nach unten.
 */
export const news: NewsItem[] = [
  {
    date: '2026-09-22',
    title: 'Sportabzeichen 2026 auf dem Sportplatz abgenommen',
    text: 'Gemeinsam mit dem MTV Elze: aufwärmen, laufen, springen, werfen – Kinder und Erwachsene zusammen auf dem Platz.',
  },
  {
    date: '2026-09-14',
    title: 'Neue Bambini-Fußballgruppe startet',
    text: 'Für Kinder von 4–6 Jahren, immer sonntags auf dem VSV-Sportplatz.',
  },
  {
    date: '2026-09-28',
    title: 'Wandertag durchs Rössinger Umland',
    text: 'Gemeinsame Tour, Anmeldung über das Kontaktformular.',
  },
  {
    date: '2026-10-05',
    title: 'Volleyball-Freundschaftsspiel',
    text: 'Alfred-Stubenrauch-Sporthalle, Zuschauerinnen und Zuschauer willkommen.',
  },
];
