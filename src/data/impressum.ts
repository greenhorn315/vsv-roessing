/**
 * Impressum.
 *
 * ⚠️ NOCH NICHT ÜBERNOMMEN. Hier gehört der Text von
 * https://vsv-roessing.de/impressum unverändert hinein. Bis dahin steht
 * `uebernommen` auf false und die Seite weist sich sichtbar als
 * unvollständig aus – ein Impressum mit erfundenen Angaben wäre schlimmer
 * als gar keins.
 *
 * Zum Einpflegen: Abschnitte als { heading, body } eintragen, wobei `body`
 * die Zeilen des Abschnitts sind, und anschließend `uebernommen` auf true
 * setzen. Der Rest der Seite passt sich automatisch an.
 */

export interface ImpressumSection {
  heading: string;
  body: string[];
}

export const uebernommen = false;

export const sections: ImpressumSection[] = [];
