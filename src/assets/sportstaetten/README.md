# Fotos der Sportstätten

Diese Dateien zeigt die Vereinsseite im Abschnitt „Unsere Sportstätten“
(`/verein/#sportstaetten`). Die Kontaktseite führt die Anschriften kurz in der
Seitenleiste auf und verweist dorthin. Eingetragen werden sie in
`src/content/sportstaetten.yaml`; ein verschriebener Dateiname bricht den Build
ab. Ein Ort ganz ohne Fotos bekommt einen gestalteten Platzhalter mit dem
Hinweis „Foto folgt“.

| Datei | Ort | Aufnahme |
|---|---|---|
| `sporthalle.jpg` | Alfred-Stubenrauch-Sporthalle, Loderwinkel 2A | 15.09.2026 |
| `sporthalle-eingang.jpg` | Turnhalleneingang | 15.09.2026 |
| `dorfbrunnen.jpg` | Dorfbrunnen, Eingang | 15.09.2026 |
| `dorfbrunnen-hinten.jpg` | Dorfbrunnen, Rückseite | 15.09.2026, retuschiert |
| `sportplatz.jpg` | VSV-Sportplatz, Zum Klay 6 | 25.09.2026 |
| `sportplatz-eingang.jpg` | Eingang zum Sportplatz | 25.09.2026, retuschiert |
| `sportplatz-weitsprunganlage.jpg` | Weitsprunganlage am Sportplatz | 22.09.2026 |
| `feuerplatz.jpg` | Feuerplatz am Sportplatz | siehe unten |
| `vereinsheim.jpg` | Vereinsheim, Gesamtansicht | 25.09.2026 |
| `vereinsheim-terrasse.jpg` | Vereinsheim, Terrasse | 25.09.2026 |
| `vereinsheim-gaststaette.jpg` | Vereinsheim, Gaststube | 22.09.2026 |

**Format**

* Querformat 4 : 3 als JPG. Die Dateien hier sind Vorlagen: Astro rechnet
  daraus beim Bauen AVIF, WebP und JPEG in mehreren Breiten (bis 1024 px), der
  Browser wählt davon. Die Aufnahmen vom 25. September liegen als
  2000 × 1500 px vor, die älteren noch als 1024 × 768 px (die Gaststube
  640 × 480) – so kamen sie aus der Zeit, als sie unverändert ausgeliefert
  wurden. Neue Vorlagen dürfen größer sein, siehe `tools/README.md`.
* Der Bildausschnitt wird per `object-fit: cover` gefüllt – Motiv mittig halten.
* Alternativtexte stehen in `src/content/sportstaetten.yaml` bei der jeweiligen Sportstätte
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

**Aufnahmen vom 25. September 2026**

Sportplatz und Vereinsheim sind neu fotografiert, bei klarem Himmel und ohne
Betrieb. Die Vorlagen kamen über den Chat und sind deshalb auf 2576 × 1932 px
verkleinert und ohne EXIF-Daten; für 2000 × 1500 px reicht das.

* **Sportplatz:** Die neue Übersicht löst die vom 14. September ab. Sie zeigt
  zusätzlich die Laufbahn am Rand des Platzes und passt so zur Leichtathletik,
  die hier im Sommerhalbjahr trainiert. Oben ist knapp ein Drittel des Himmels
  weggeschnitten.
* **Eingang zum Sportplatz** ist neu: das Geländer mit den Buchstaben VSV, das
  Kassenhäuschen, dahinter das Vereinsheim. So sieht man, wo man hineingeht.
  Im Fenster mit dem Ü40-Aushang spiegelte sich der Fotograf; die Stelle ist
  wie beim Dorfbrunnen retuschiert (`tools/retusche.py`), mit dem dunklen Holz
  links vom Aushang als Spender.
* **Vereinsheim:** Die Gesamtansicht von der Rasenfläche löst die Nahaufnahme
  der Eingangstür als Hauptbild ab. Dieselbe Wand mit Tür und Banner zeigt jetzt
  die Terrasse, mit mehr Umgebung. Rechts ist dort die Glastür abgeschnitten,
  in der sich der Fotograf als Umriss spiegelte.

**Personen auf Fotos**

`feuerplatz.jpg` zeigt erkennbare Personen und ist deshalb nur so lange
vertretbar, wie die Seite nicht öffentlich ist. **Vor dem Livegang** entweder
die Einwilligung der Abgebildeten einholen (Recht am eigenen Bild, KUG/DSGVO)
oder das Bild gegen eine Aufnahme ohne Personen tauschen. Auf allen übrigen
Bildern ist niemand erkennbar. Bei Fotos von Kindern und Jugendlichen ist
zusätzlich die Einwilligung der Erziehungsberechtigten nötig.
