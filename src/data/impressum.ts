import { site } from './site';

/**
 * Impressum – Wortlaut wie auf der bestehenden Website vsv-roessing.de.
 *
 * Zum Pflegen: Abschnitte als { heading, body } eintragen; `body` sind die
 * Zeilen des Abschnitts. Enthält eine Zeile die Vereins-E-Mail, wird daraus
 * automatisch ein anklickbarer Link.
 */

export interface ImpressumSection {
  heading: string;
  body: string[];
}

export const sections: ImpressumSection[] = [
  {
    heading: 'Angaben gemäß § 5 DDG',
    body: [site.name, `${site.address.postalCode} ${site.address.city}`],
  },
  {
    heading: 'Vertreten durch',
    body: ['Der Vorstand im Sinne des § 26 BGB – Namen werden ergänzt.'],
  },
  {
    heading: 'Kontakt',
    body: [`E-Mail: ${site.email}`],
  },
  {
    heading: 'Registereintrag',
    body: ['Vereinsregister und Registernummer werden ergänzt.'],
  },
  {
    heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    body: ['Wird ergänzt.'],
  },
];
