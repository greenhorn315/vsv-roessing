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
| `sportplatz-weitsprunganlage.jpg` | Weitsprunganlage am Sportplatz | 22.09.2026 |
| `feuerplatz.jpg` | Feuerplatz am Sportplatz | siehe unten |
| `vereinsheim.jpg` | Vereinsheim, Eingang | 22.09.2026 |
| `vereinsheim-gaststaette.jpg` | Vereinsheim, Gaststube | 22.09.2026 |

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

**Aufnahmen vom 22. September 2026**

Das Vereinsheim war bis dahin ein Behelf: Es gab nur eine Aufnahme mit Betrieb
davor, rund fünfzehn Personen an Biertischen, und gezeigt wurde allein der
personenfreie Streifen oberhalb der Köpfe – 1024 × 290 statt 4:3. Dafür trug
eine Sportstätte in `site.ts` ein eigenes Seitenverhältnis (`ratio`).

Das ist erledigt. Der Verein hat Aufnahmen ohne Betrieb geliefert: die
Eingangsseite mit Willkommensbanner und Aushangkasten als Hauptbild, die
Gaststube als zweite Ansicht. Beide im üblichen 4:3, das Feld `ratio` ist
damit ersatzlos entfallen.

Vom selben Tag stammt die Weitsprunganlage als zweite Ansicht des
Sportplatzes. Sie zeigt das Einzige, was der Rasenplatz nicht zeigt: dass hier
auch Leichtathletik stattfindet. Die beiden Personen am Ende der Bahn harken
die Grube und sind nicht erkennbar.

Eine dritte Aufnahme vom Vereinsheim – der Aufenthaltsraum mit Dartscheibe und
Durchgang zur Terrasse – liegt vor, ist aber nicht übernommen: Darauf stehen
Stühle gestapelt und ein Grill mitten im Raum. Sobald der Raum hergerichtet
ist, wäre das eine dritte Ansicht wert.

**Personen auf Fotos**

`feuerplatz.jpg` zeigt erkennbare Personen und ist deshalb nur so lange
vertretbar, wie die Seite nicht öffentlich ist. **Vor dem Livegang** entweder
die Einwilligung der Abgebildeten einholen (Recht am eigenen Bild, KUG/DSGVO)
oder das Bild gegen eine Aufnahme ohne Personen tauschen. Auf allen übrigen
Bildern ist niemand erkennbar. Bei Fotos von Kindern und Jugendlichen ist
zusätzlich die Einwilligung der Erziehungsberechtigten nötig.
