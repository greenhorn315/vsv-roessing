/**
 * Bilder für das Karussell im Hero.
 *
 * Es steht an der Stelle, an der später ein einzelnes Vereinsfoto stehen
 * soll – bis es das gibt, zeigt der Verein sich lieber in mehreren Bildern
 * als gar nicht. Aufbereitet mit tools/karussell.py, Hochformat 4:5.
 *
 * ⚠️ Vor dem Livegang zu klären: Auf mehreren Bildern sind Personen
 * erkennbar, auf einem ein Kind. Dafür braucht es die Einwilligung der
 * Abgebildeten beziehungsweise der Erziehungsberechtigten (Recht am eigenen
 * Bild, KUG/DSGVO). Solange die Seite nicht öffentlich ist, ist das vertretbar.
 */

export interface KarussellBild {
  src: string;
  alt: string;
  /** Kurze Bildunterschrift, sichtbar über dem Bild. */
  caption: string;
  /** Quelle, wenn das Bild nicht vom Verein stammt. */
  credit?: string;
}

export const karussellBilder: KarussellBild[] = [
  {
    src: '/images/karussell/gruppenfoto.jpg',
    alt: 'Gruppe in Trikots mit dem Aufdruck „VSV Rössing“ kniet auf einem Rasenplatz und streckt die Arme in die Luft',
    caption: 'Leichtathletik – gemeinsam am Start',
  },
  {
    src: '/images/karussell/jazzdance.jpg',
    alt: 'Tanzgruppe sitzt im Bühnenlicht auf einem Holzboden vor einer Bühne',
    caption: 'Jazz Dance – Auftritt',
  },
  {
    src: '/images/karussell/leichtathletik-kinder.jpg',
    alt: 'Kind springt bei einem Leichtathletik-Training über einen Kasten',
    caption: 'Leichtathletik – Kindergruppe',
  },
  {
    src: '/images/karussell/freitagsradler.jpg',
    alt: 'Radfahrergruppe auf einem Feldweg, im Hintergrund ein Windrad',
    caption: 'Freitagsradler im Sommerhalbjahr',
  },
  {
    src: '/images/karussell/leichtathletik-jugend.jpg',
    alt: 'Jugendliche beim Aufwärmen auf einer Rasenfläche',
    caption: 'Leichtathletik – Jugendtraining',
  },
  {
    src: '/images/karussell/dart.jpg',
    alt: 'Dartpfeil steckt in einer Dartscheibe',
    caption: 'Dart – Liga und Freizeitrunde',
    credit: 'Symbolbild: Pexels',
  },
];
