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
| 7 | `leichtathletik-weitsprung.jpg` | Kind landet in der Sandgrube | 3024 × 4032 |
| 8 | `freitagsradler-umland.jpg` | Radgruppe am Feldrand | 1920 × 1080 |
| 9 | `sportabzeichen-aufwaermen.jpg` | Gruppe beim Aufwärmen | 4032 × 3024 |
| 10 | `freitagsradler-schloss.jpg` | Rad vor Schloss Marienburg, Winter | 1920 × 1080 |
| 11 | `dart.jpg` | Dartpfeil in einer E-Dart-Scheibe, Symbolbild | 1280 × 852 |

Die Reihenfolge wechselt bewusst zwischen den Sportarten, damit nicht zwei
gleiche Motive aufeinander folgen.

**Format**

Hochformat 4 : 5, 800 × 1000 px, JPG unter 210 KB. Aufbereitet mit
`tools/karussell.py`; dort stehen je Bild die Tonwerte und der Bildausschnitt.
Am Desktop steht das Karussell im Hochformat, auf schmalen Geräten im Format
4 : 3 – der Ausschnitt wird per `object-fit: cover` gefüllt.

**Die zwei unscharfen Bilder sind ersetzt**

Folie 7 und 9 waren 300-px-Vorschaubilder von der alten Website, fünffach
vergrößert und entsprechend krümelig. Beide sind am 22. September gegen
Aufnahmen vom Sportabzeichen-Tag getauscht – volle Auflösung, dasselbe Motiv:
ein Kind beim Weitsprung statt beim Sprung über den Kasten, eine Gruppe beim
Aufwärmen statt der Jugendlichen beim Aufwärmen.

`hochskalieren()` bleibt in `tools/karussell.py` stehen, für den nächsten Fall
dieser Art. Falls doch wieder eine Vorschau von der alten Website gebraucht
wird: Deren Dateinamen enden auf `-300x200`, so legt WordPress Vorschaubilder
ab, und **das Original liegt im selben Verzeichnis unter demselben Namen ohne
diesen Zusatz** – etwa

```
…/uploads/2021/06/21.06.07_Leichtathletik_Kindergruppe_Training_2-300x200.jpg
…/uploads/2021/06/21.06.07_Leichtathletik_Kindergruppe_Training_2.jpg   ← Original
```

**Warum 210 KB und nicht 180 KB**

Die älteren Vorlagen kamen schon webfertig von der alten Website und liegen
zwischen 120 und 180 KB. Die beiden neuen stammen direkt aus dem Telefon und
tragen über das ganze Bild feine Struktur – belaubte Bäume vor allem –, und
die kostet im JPEG richtig Platz. Unter 180 KB kämen sie nur mit sichtbaren
Artefakten. Stattdessen nimmt ein leichter Weichzeichner vor dem Nachschärfen
(`WEICHZEICHNEN` in `tools/karussell.py`) genau die Blattstruktur heraus, die
teuer und fürs Motiv ohne Belang ist; nachgeschärft werden danach wieder die
tragenden Kanten. Der Rest ist der Deckel bei 210 KB.

Die übrigen Bilder hier sind weiter Platzhalter, bis eigenes Material da ist.
Zum Tauschen: in `tools/karussell.py` die Quelldatei ersetzen und das Skript
neu laufen lassen.

Die Vorlage von `leichtathletik-huerden.jpg` trug einen Vornamen im
Dateinamen. Die Datei auf der Website heißt bewusst neutral – Dateinamen
stehen in der Adresszeile und sind damit öffentlich.

**Personen auf Fotos**

**Kindergesichter kommen hier nicht hinein.** Die Aufnahme vom Saisonabschluss
vor dem Vereinsheim war kurzzeitig Folie 7 und ist wieder entfernt worden, weil
darauf Kinder erkennbar sind. Das Vereinsheim hat inzwischen eine eigene
Aufnahme ohne Personen, siehe `public/images/sportstaetten/README.md`.

Die beiden Bilder vom Sportabzeichen-Tag sind nach derselben Regel gewählt:
Auf `leichtathletik-weitsprung.jpg` ist ein einzelnes Kind von hinten zu sehen,
ohne Gesicht. Bei `sportabzeichen-aufwaermen.jpg` liegt der Ausschnitt ganz
rechts, wo die ganze Gruppe mit dem Rücken zur Kamera steht; weiter links im
Original sind Gesichter im Halbprofil zu erkennen.

Auf dem Aufwärmbild sind auch Mitglieder des **MTV Elze** zu sehen, der die
Abnahme gemeinsam mit dem VSV durchgeführt hat. Für deren Einwilligung ist
der VSV nicht zuständig – das ist vor dem Livegang mit dem MTV zu klären.

Bei `fussball-u7.jpg` stand am linken Bildrand ein Kind der gegnerischen
Mannschaft im Profil. Der Ausschnitt ist deshalb nach rechts gesetzt, das Kind
liegt außerhalb des Bildes. Die eigene Mannschaft ist von hinten zu sehen,
ebenso die Läuferin auf `leichtathletik-huerden.jpg`.

Erwachsene sind weiter erkennbar – auf `freitagsradler.jpg` und
`freitagsradler-umland.jpg` mit deutlichen Gesichtern, auf `fussball-u7.jpg`
der Betreuer im Hintergrund. **Vor dem Livegang** ist die Einwilligung der Abgebildeten
einzuholen, bei Minderjährigen die der Erziehungsberechtigten (Recht am
eigenen Bild, KUG/DSGVO) – oder das betreffende Bild zu tauschen. Solange die
Seite nicht öffentlich ist, ist die Verwendung vertretbar.

`dart.jpg` ist ein Symbolbild von Wikimedia Commons
(`File:Pexels-pixabay-262438.jpg`), dort als CC0 ausgewiesen. Es zeigt eine
E-Dart-Scheibe – die Dart-Gruppe des Vereins spielt E-Darts, nicht Steel. Ein
Bild mit Bristle-Scheibe und Steeldarts wäre fachlich falsch. Ein eigenes Foto
aus dem Dorfbrunnen wäre ohnehin schöner.
