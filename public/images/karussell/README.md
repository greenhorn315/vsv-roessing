# Bilder des Karussells im Hero

Diese Bilder rollieren auf der Startseite an der Stelle, an der später ein
einzelnes Vereinsfoto stehen soll. Die Reihenfolge, die Bildunterschriften und
die Alternativtexte stehen in `src/data/karussell.ts`.

| Datei | Motiv | Vorlage |
|---|---|---|
| `gruppenfoto.jpg` | Leichtathletik, Gruppe im VSV-Trikot | 2560 × 1707 |
| `jazzdance.jpg` | Jazz Dance, Auftritt | 4032 × 3024 |
| `leichtathletik-kinder.jpg` | Kindergruppe beim Sprung | 300 × 200 |
| `freitagsradler.jpg` | Radgruppe am Feldweg | 300 × 225 |
| `leichtathletik-jugend.jpg` | Jugendliche beim Aufwärmen | 300 × 200 |
| `dart.jpg` | Dartpfeil in einer E-Dart-Scheibe, Symbolbild | 1280 × 852 |

**Format**

Hochformat 4 : 5, 800 × 1000 px, JPG unter 180 KB. Aufbereitet mit
`tools/karussell.py`; dort stehen je Bild die Tonwerte und der Bildausschnitt.
Am Desktop steht das Karussell im Hochformat, auf schmalen Geräten im Format
4 : 3 – der Ausschnitt wird per `object-fit: cover` gefüllt.

**Drei Vorlagen sind zu klein**

`leichtathletik-kinder`, `leichtathletik-jugend` und `freitagsradler` stammen
als 300-px-Vorschaubilder von der alten Website. Sie sind hochskaliert und
kräftiger nachgeschärft, bleiben aber weicher als die übrigen. Sobald bessere
Aufnahmen vorliegen: in `tools/karussell.py` die Quelldatei tauschen und das
Skript neu laufen lassen – alle Bilder hier sind Platzhalter, bis eigenes
Material da ist.

**Personen auf Fotos**

Auf mehreren Bildern sind Personen erkennbar, auf `leichtathletik-kinder.jpg`
ein Kind. **Vor dem Livegang** ist die Einwilligung der Abgebildeten
einzuholen, bei Minderjährigen die der Erziehungsberechtigten (Recht am
eigenen Bild, KUG/DSGVO) – oder das betreffende Bild zu tauschen. Solange die
Seite nicht öffentlich ist, ist die Verwendung vertretbar.

`dart.jpg` ist ein Symbolbild von Wikimedia Commons
(`File:Pexels-pixabay-262438.jpg`), dort als CC0 ausgewiesen. Es zeigt eine
E-Dart-Scheibe – die Dart-Gruppe des Vereins spielt E-Darts, nicht Steel. Ein
Bild mit Bristle-Scheibe und Steeldarts wäre fachlich falsch. Ein eigenes Foto
aus dem Dorfbrunnen wäre ohnehin schöner.
