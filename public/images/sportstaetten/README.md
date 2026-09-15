# Fotos der Sportstätten

Diese Dateien zeigt die Kontaktseite im Abschnitt „Unsere Sportstätten“
(`/kontakt#sportstaetten`). Solange eine Datei fehlt, erscheint automatisch ein
gestalteter Platzhalter mit dem Hinweis „Foto folgt“ – kein kaputtes Bild.

| Datei | Ort | Status |
|---|---|---|
| `sporthalle.jpg` | Alfred-Stubenrauch-Sporthalle, Loderwinkel 2A | vorhanden |
| `dorfbrunnen.jpg` | Dorfbrunnen, Vordereingang | vorhanden |
| `dorfbrunnen-hintereingang.jpg` | Dorfbrunnen, Hintereingang | vorhanden |
| `dorfbrunnen-glasfront.jpg` | Dorfbrunnen, verglaste Front | vorhanden, retuschiert |
| `sportplatz.jpg` | VSV-Sportplatz, Zum Klay 6 | vorhanden |
| `feuerplatz.jpg` | Feuerplatz am Sportplatz | vorläufig, siehe unten |
| `vereinsheim.jpg` | Vereinsheim am Sportplatz | vorhanden, siehe unten |

**Format**

* Querformat 4 : 3 als JPG. Hauptbild einer Sportstätte 1024 × 768 px,
  Nebenansichten 640 × 480 px – die stehen nur als kleine Vorschau darunter.
  Eine Datei bleibt unter 220 KB; `tools/optimize.py` setzt beides selbst.
* Der Bildausschnitt wird per `object-fit: cover` gefüllt – Motiv mittig halten.
* Alternativtexte stehen in `src/data/site.ts` bei der jeweiligen Sportstätte
  und sind mit dem Foto abzugleichen.

**Bearbeitung**

Die vorhandenen Bilder sind aufbereitete Fassungen der Originalaufnahmen
(4032 × 3024 px): Schwarz- und Weißpunkt gesetzt, Tiefen angehoben, Kontrast
und Sättigung moderat verstärkt, auf 1280 × 960 px skaliert und leicht
nachgeschärft. Die Originale bitte unbearbeitet aufbewahren – bei einer
Neubearbeitung ist von ihnen auszugehen, nicht von diesen Dateien.

In `dorfbrunnen-glasfront.jpg` war der Fotograf in der Scheibe gespiegelt. Die
Spiegelung ist herausretuschiert: Der Bereich wurde zeilenweise aus dem
Streifen daneben rekonstruiert, damit die waagerechten Linien erhalten bleiben.

**Das Vereinsheim ist ein Sonderfall**

Es gibt nur eine Aufnahme, und davor herrscht Betrieb: rund fünfzehn Personen
an Biertischen. Die herauszuretuschieren ist bei dieser Menge nicht möglich –
dahinter liegen Tische, Türen und weitere Personen, es gibt keine Fläche zum
Rekonstruieren. Ein 4:3-Fenster oberhalb der Köpfe zeigt nur Dachziegel.

Genommen ist deshalb der Streifen oberhalb der Köpfe mit Dach,
Willkommensbanner und Fassade: 1024 × 290 statt 4:3. Dafür trägt eine
Sportstätte in `site.ts` optional ein eigenes Seitenverhältnis (`ratio`).

Eine Aufnahme ohne Betrieb würde das ablösen und wäre die bessere Lösung.

**Personen auf Fotos**

`feuerplatz.jpg` zeigt erkennbare Personen und ist deshalb nur so lange
vertretbar, wie die Seite nicht öffentlich ist. **Vor dem Livegang** entweder
die Einwilligung der Abgebildeten einholen (Recht am eigenen Bild, KUG/DSGVO)
oder das Bild gegen eine Aufnahme ohne Personen tauschen. Auf allen übrigen
Bildern ist niemand erkennbar. Bei Fotos von Kindern und Jugendlichen ist
zusätzlich die Einwilligung der Erziehungsberechtigten nötig.
