/**
 * Impressum – Wortlaut wortgleich von https://vsv-roessing.de/ übernommen.
 *
 * Abweichung vom Original: Die Gesetzesverweise sind auf den aktuellen Stand
 * gebracht, der Rest ist wortgleich.
 *   § 5 TMG            -> § 5 DDG            (DDG seit 14.05.2024)
 *   § 55 Abs. 2 RStV   -> § 18 Abs. 2 MStV   (MStV seit 07.11.2020)
 *   § 7 Abs. 1 TMG     -> Verweis entfällt; die Vorschrift hat im DDG keine
 *                         wortgleiche Entsprechung, die Verantwortlichkeit
 *                         für eigene Inhalte folgt aus den allgemeinen Gesetzen
 *   §§ 8 bis 10 TMG    -> Art. 4 bis 6 DSA i.V.m. § 7 DDG; die alten
 *                         Paragraphen sind ersatzlos entfallen
 * Diese Änderungen gehören auch ins Original übernommen.
 *
 * Aufbau der Blöcke: siehe LegalBlock in legal.ts.
 */

import type { LegalBlock } from './legal';

export const intro = 'Verantwortlich für den Inhalt dieser Seite:';

export const blocks: LegalBlock[] = [
  { type: 'heading', level: 2, text: 'Angaben gemäß § 5 DDG:' },
  {
    type: 'lines',
    lines: [
      'Volkssportvereinigung von 1897 Rössing e.V.',
      'Pfarrstr. 6',
      '31171 Nordstemmen',
      'Vertreten durch:',
      '1. Vorsitzenden Erich Könneke',
    ],
  },

  { type: 'heading', level: 2, text: 'Kontakt:' },
  { type: 'lines', lines: ['Telefon: +49 (0) 50 69 / 74 15'] },

  { type: 'heading', level: 2, text: 'Bankverbindungen:' },
  {
    type: 'lines',
    lines: [
      'Volksbank eG Hildesheim Lehrte Pattensen',
      'IBAN: DE83 2519 3331 2643 6582 00',
      'BIC: GENODEF1PAT',
    ],
  },

  { type: 'heading', level: 2, text: 'Registereintrag:' },
  {
    type: 'lines',
    lines: [
      'Eintragung im Vereinsregister.',
      'Registergericht: Amtsgericht Hildesheim',
      'Registernummer: VR140049',
    ],
  },

  {
    type: 'heading',
    level: 2,
    text: 'Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:',
  },
  { type: 'lines', lines: ['keine USt, da Kleinstunternehmen'] },

  { type: 'heading', level: 2, text: 'Steuernummer' },
  { type: 'lines', lines: ['30/216/40704, Finanzamt Hildesheim'] },

  {
    type: 'heading',
    level: 2,
    text: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:',
  },
  {
    type: 'lines',
    lines: [
      'Erich Könneke, Volkssportvereinigung von 1897 Rössing e.V., Pfarrstr. 6, 31171 Nordstemmen',
    ],
  },

  { type: 'heading', level: 2, text: 'Haftungsausschluss:' },

  { type: 'heading', level: 3, text: 'Haftung für Inhalte' },
  {
    type: 'text',
    text: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.',
  },
  {
    type: 'text',
    text: 'Nach den Artikeln 4 bis 6 der Verordnung (EU) 2022/2065 (Digital Services Act) in Verbindung mit § 7 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
  },

  { type: 'heading', level: 3, text: 'Haftung für Links' },
  {
    type: 'text',
    text: 'Unser Online-Angebot enthält Links zu anderen Websites. Wir haben keinen Einfluss darauf, dass deren Betreiber die Datenschutzbestimmungen einhalten. Wir sind als Anbieter für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Von diesen eigenen Inhalten sind unter Umständen Links auf die von anderen Anbietern bereitgehaltenen Inhalte zu unterscheiden. Für fremde Inhalte, die über Links zur Nutzung bereitgestellt werden, übernehmen wir keine Verantwortung und machen uns deren Inhalt nicht zu Eigen. Für illegale, fehlerhafte oder unvollständige Inhalte sowie für Schäden, die durch die Nutzung oder Nichtnutzung der Informationen entstehen, haftet allein der Anbieter der Website, auf die verwiesen wurde. Für fremde Hinweise ist der LSB nur dann verantwortlich, wenn er von ihnen, das heißt auch von einem eventuellen rechtswidrigen bzw. strafbaren Inhalt, positive Kenntnis hat, und es technisch möglich und zumutbar ist, deren Nutzung zu verhindern.',
  },

  { type: 'heading', level: 3, text: 'Urheberrecht' },
  {
    type: 'text',
    text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
  },

  { type: 'heading', level: 2, text: 'Copyright:' },
  { type: 'lines', lines: ['Piktogramme | Copyright-Hinweis ©DOSB/Sportdeutschland'] },
];

/**
 * Im Original folgt hier eine Überschrift „Datenschutz“ ohne eigenen Text.
 * Auf dieser Seite gibt es dafür eine eigene Unterseite, auf die verwiesen
 * wird – eine leere Überschrift wäre für Lesende wertlos.
 */
export const datenschutzHinweis = {
  heading: 'Datenschutz',
  linkLabel: 'Zur Datenschutzerklärung',
  href: '/datenschutz',
};
