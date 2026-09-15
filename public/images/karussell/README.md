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
| `dartscheibe.jpg` | Dartpfeil in der Scheibe, Symbolbild | 1280 × 852 |
| `dart.jpg` | Steeldarts in der Scheibe, Symbolbild | 742 × 416 |

**Format**

Hochformat 4 : 5, 800 × 1000 px, JPG unter 180 KB. Aufbereitet mit
`tools/karussell.py`; dort stehen je Bild die Tonwerte und der Bildausschnitt.
Am Desktop steht das Karussell im Hochformat, auf schmalen Geräten im Format
4 : 3 – der Ausschnitt wird per `object-fit: cover` gefüllt.

**Vier Vorlagen sind klein**

`leichtathletik-kinder`, `leichtathletik-jugend` und `freitagsradler` stammen
als 300-px-Vorschaubilder von der alten Website, `dart` misst 742 × 416 und
liefert im 4:5-Ausschnitt nur 332 px Breite. Alle vier sind hochskaliert und
kräftiger nachgeschärft, bleiben aber weicher als die übrigen. Sobald bessere
Aufnahmen vorliegen: in `tools/karussell.py` die Quelldatei tauschen und das
Skript neu laufen lassen.

**Personen auf Fotos**

Auf mehreren Bildern sind Personen erkennbar, auf `leichtathletik-kinder.jpg`
ein Kind. **Vor dem Livegang** ist die Einwilligung der Abgebildeten
einzuholen, bei Minderjährigen die der Erziehungsberechtigten (Recht am
eigenen Bild, KUG/DSGVO) – oder das betreffende Bild zu tauschen. Solange die
Seite nicht öffentlich ist, ist die Verwendung vertretbar.

`dart.jpg` und `dartscheibe.jpg` sind Symbolbilder von Wikimedia Commons
(`File:Darts_in_board.png` und `File:Pexels-pixabay-262438.jpg`), dort beide
als CC0 ausgewiesen. Die Ecke unten rechts
trägt im Original einen PDC-Schriftzug; sie liegt außerhalb des mittigen
4:5-Ausschnitts und ist damit nicht im Bild – wegretuschiert wurde nichts. Der
PDC-Schriftzug rechts im Bild ist Teil der Scheibenumrandung selbst.

Ein fremdes Kürzel auf einer als CC0 markierten Datei ist auf Commons oft ein
Hinweis darauf, dass die Freigabe strittig sein kann. Vor dem Livegang lohnt
ein Blick auf die Dateiseite. Ein eigenes Foto aus dem Dorfbrunnen wäre
ohnehin schöner.
