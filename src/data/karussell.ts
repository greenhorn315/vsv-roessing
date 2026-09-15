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
 *
 * Bilder mit erkennbaren Kindergesichtern kommen hier gar nicht erst hinein.
 * Die Aufnahme vom Saisonabschluss vor dem Vereinsheim ist deshalb wieder
 * entfernt worden; als Bild der Sportstätte dient nur der personenfreie
 * Streifen oberhalb der Köpfe.
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
    // Ausschnitt bewusst nach rechts gesetzt: Am linken Bildrand stand ein Kind
    // der gegnerischen Mannschaft im Profil, mit erkennbarem Gesicht.
    src: '/images/karussell/fussball-u7.jpg',
    alt: 'Kindermannschaft in weißen Trikots steht Arm in Arm im Kreis auf dem Rasen, von hinten gesehen',
    caption: 'Fußball – die U7 beim Turnier',
  },
  {
    src: '/images/karussell/freitagsradler.jpg',
    alt: 'Sieben Radfahrende mit Helmen stehen mit ihren Rädern auf einer Holzbrücke über einem Bach',
    caption: 'Freitagsradler im Sommerhalbjahr',
  },
  {
    src: '/images/karussell/jazzdance.jpg',
    alt: 'Tanzgruppe sitzt im Bühnenlicht auf einem Holzboden vor einer Bühne',
    caption: 'Jazz Dance – Auftritt',
  },
  {
    src: '/images/karussell/leichtathletik-huerden.jpg',
    alt: 'Läuferin im Trikot mit dem Aufdruck „VSV Rössing“ steht am Start einer Hürdenbahn in einer Halle',
    caption: 'Leichtathletik – am Start der Hürdenbahn',
  },
  {
    src: '/images/karussell/freitagsradler-abendlicht.jpg',
    alt: 'Radfahrende auf einem Feldweg, die tiefstehende Abendsonne blendet von rechts',
    caption: 'Freitagsradler – Heimweg im Abendlicht',
  },
  {
    src: '/images/karussell/leichtathletik-kinder.jpg',
    alt: 'Kind springt bei einem Leichtathletik-Training über einen Kasten',
    caption: 'Leichtathletik – Kindergruppe',
  },
  {
    src: '/images/karussell/freitagsradler-umland.jpg',
    alt: 'Radfahrergruppe steht mit ihren Rädern am Feldrand, dahinter Felder und eine helle Halde',
    caption: 'Freitagsradler – unterwegs im Umland',
  },
  {
    src: '/images/karussell/leichtathletik-jugend.jpg',
    alt: 'Jugendliche beim Aufwärmen auf einer Rasenfläche',
    caption: 'Leichtathletik – Jugendtraining',
  },
  {
    // Winteraufnahme – deshalb ohne Bezug aufs Sommerhalbjahr beschriftet.
    src: '/images/karussell/freitagsradler-schloss.jpg',
    alt: 'Abgestelltes Fahrrad auf einer Wiese, dahinter Schloss Marienburg mit seinen neugotischen Türmen',
    caption: 'Radtour zur Marienburg',
  },
  {
    // E-Dart-Scheibe – die Dart-Gruppe spielt E-Darts, nicht Steel.
    src: '/images/karussell/dart.jpg',
    alt: 'Dartpfeil mit rot-weißem Flight steckt in einer E-Dart-Scheibe',
    caption: 'Dart – jede Woche im Dorfbrunnen',
    credit: 'Symbolbild: Wikimedia Commons, CC0',
  },
];
