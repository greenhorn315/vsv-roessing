# Bilder des Karussells im Hero

Diese Bilder rollieren auf der Startseite an der Stelle, an der später ein
einzelnes Vereinsfoto stehen soll. Die Reihenfolge, die Bildunterschriften und
die Alternativtexte stehen in `src/data/karussell.ts`.

| # | Datei | Motiv | Vorlage |
|---|---|---|---|
| 1 | `gruppenfoto.jpg` | Leichtathletik, Gruppe im VSV-Trikot | 2560 × 1707 |
| 2 | `fussball-u7.jpg` | U7 im Mannschaftskreis | 2048 × 1365 |
| 3 | `freitagsradler.jpg` | Radgruppe auf einer Holzbrücke | 1920 × 1080 |
| 4 | `jazzdance.jpg` | Jazz Dance, Auftritt | 4032 × 3024 |
| 5 | `leichtathletik-huerden.jpg` | Läuferin am Start der Hürdenbahn | 2048 × 1536 |
| 6 | `freitagsradler-abendlicht.jpg` | Radgruppe im Gegenlicht | 1920 × 1080 |
| 7 | `saisonabschluss.jpg` | Saisonabschluss vor dem Vereinsheim | 2048 × 1536 |
| 8 | `freitagsradler-umland.jpg` | Radgruppe am Feldrand | 1920 × 1080 |
| 9 | `leichtathletik-kinder.jpg` | Kindergruppe beim Sprung | 300 × 200 |
| 10 | `freitagsradler-schloss.jpg` | Rad vor Schloss Marienburg, Winter | 1920 × 1080 |
| 11 | `leichtathletik-jugend.jpg` | Jugendliche beim Aufwärmen | 300 × 200 |
| 12 | `dart.jpg` | Dartpfeil in einer E-Dart-Scheibe, Symbolbild | 1280 × 852 |

Die Reihenfolge wechselt bewusst zwischen den Sparten, damit nicht zwei
gleiche Motive aufeinander folgen.

**Format**

Hochformat 4 : 5, 800 × 1000 px, JPG unter 180 KB. Aufbereitet mit
`tools/karussell.py`; dort stehen je Bild die Tonwerte und der Bildausschnitt.
Am Desktop steht das Karussell im Hochformat, auf schmalen Geräten im Format
4 : 3 – der Ausschnitt wird per `object-fit: cover` gefüllt.

**Zwei Vorlagen sind zu klein – und die Originale gibt es**

`leichtathletik-kinder` und `leichtathletik-jugend` stammen als
300-px-Vorschaubilder von der alten Website. Ihre Dateinamen enden auf
`-300x200`; so legt WordPress Vorschaubilder ab.
**Das Original liegt im selben Verzeichnis unter demselben Namen ohne diesen
Zusatz** – etwa

```
…/uploads/2021/06/21.06.07_Leichtathletik_Kindergruppe_Training_2-300x200.jpg
…/uploads/2021/06/21.06.07_Leichtathletik_Kindergruppe_Training_2.jpg   ← Original
```

Das ist der wirksamste Hebel: Mit den Originalen wird aus einer fünffachen
Vergrößerung eine Verkleinerung.

Bis dahin greift `hochskalieren()` in `tools/karussell.py`: erst die
JPEG-Blockstruktur dämpfen, solange sie klein ist, dann in Schritten
vergrößern, am Ende nur echte Kanten schärfen und Flächen glatt lassen. Das
nimmt den krümeligen Eindruck, ersetzt aber keine Auflösung.

Alle Bilder hier sind Platzhalter, bis eigenes Material da ist. Zum Tauschen:
in `tools/karussell.py` die Quelldatei ersetzen und das Skript neu laufen
lassen.

Die Vorlage von `leichtathletik-huerden.jpg` trug einen Vornamen im
Dateinamen. Die Datei auf der Website heißt bewusst neutral – Dateinamen
stehen in der Adresszeile und sind damit öffentlich.

**Personen auf Fotos**

Auf mehreren Bildern sind Personen erkennbar – auf `freitagsradler.jpg` und
`saisonabschluss.jpg` Erwachsene und Kinder mit deutlich erkennbaren
Gesichtern, auf `leichtathletik-kinder.jpg` ein Kind. `fussball-u7.jpg` und
`leichtathletik-huerden.jpg` zeigen die Kinder von hinten. **Vor dem Livegang** ist die Einwilligung der Abgebildeten
einzuholen, bei Minderjährigen die der Erziehungsberechtigten (Recht am
eigenen Bild, KUG/DSGVO) – oder das betreffende Bild zu tauschen. Solange die
Seite nicht öffentlich ist, ist die Verwendung vertretbar.

`dart.jpg` ist ein Symbolbild von Wikimedia Commons
(`File:Pexels-pixabay-262438.jpg`), dort als CC0 ausgewiesen. Es zeigt eine
E-Dart-Scheibe – die Dart-Gruppe des Vereins spielt E-Darts, nicht Steel. Ein
Bild mit Bristle-Scheibe und Steeldarts wäre fachlich falsch. Ein eigenes Foto
aus dem Dorfbrunnen wäre ohnehin schöner.
