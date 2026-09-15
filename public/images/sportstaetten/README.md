# Fotos der Sportstätten

Diese Dateien zeigt die Kontaktseite im Abschnitt „Unsere Sportstätten“
(`/kontakt#sportstaetten`). Solange eine Datei fehlt, erscheint automatisch ein
gestalteter Platzhalter mit dem Hinweis „Foto folgt“ – kein kaputtes Bild.

| Datei | Ort | Aufnahme |
|---|---|---|
| `sporthalle.jpg` | Alfred-Stubenrauch-Sporthalle, Loderwinkel 2A | 15.09.2026 |
| `sporthalle-eingang.jpg` | Turnhalleneingang | 15.09.2026 |
| `dorfbrunnen.jpg` | Dorfbrunnen, Eingang | 15.09.2026 |
| `dorfbrunnen-hinten.jpg` | Dorfbrunnen, Rückseite | 15.09.2026, retuschiert |
| `sportplatz.jpg` | VSV-Sportplatz, Zum Klay 6 | 14.09.2026 |
| `feuerplatz.jpg` | Feuerplatz am Sportplatz | siehe unten |
| `vereinsheim.jpg` | Vereinsheim am Sportplatz | Behelf, siehe unten |

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

In `dorfbrunnen-hinten.jpg` war der Fotograf in der Scheibe gespiegelt. Die
Spiegelung ist herausretuschiert (`tools/retusche.py`): Der Bereich wurde
zeilenweise neu aufgebaut – Grundton aus dem Streifen daneben, darauf dessen
Feinstruktur –, damit die waagerechten Linien der Bretterwand dahinter
erhalten bleiben.

**Aufnahmen vom 15. September 2026**

Die Bilder von Halle und Dorfbrunnen sind gegen ältere Aufnahmen ausgetauscht:
klarer Himmel, Abendsonne, beide Schilder lesbar. Der Turnhalleneingang ist neu
dazugekommen – das ist die Tür, durch die man tatsächlich hineingeht, und sie
war auf keinem der bisherigen Bilder zu sehen.

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
