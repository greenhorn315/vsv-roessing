# Hilfsskripte

Kleine Python-Skripte, die nicht zum Build gehören. Sie sind hier abgelegt,
damit sich nachvollziehen und wiederholen lässt, wie Bilder aufbereitet wurden
und wie die Checkliste entsteht.

## Bilder: nur die Vorlage, nicht die Auslieferung

Die Fotos liegen unter `src/assets/`. Welche Größen und Formate der Browser
bekommt – AVIF, WebP und JPEG in mehreren Breiten –, rechnet Astro beim Bauen
selbst aus (`<Picture>` in den Komponenten, Qualität in `astro.config.mjs`).
Die Skripte hier kümmern sich nur noch um das, was Astro nicht kann: Farbe
und Tonwerte je Bild, den Bildausschnitt und Retusche. Sie schreiben eine
großzügige Vorlage (lange Kante bis 2000 px, JPEG-Qualität 90) direkt an ihren
Platz unter `src/assets/`.

```
pip install Pillow
mkdir sportstaetten          # Originale hier hineinlegen
python3 retusche.py          # optional, entfernt eine Spiegelung
python3 optimize.py          # schreibt nach ../src/assets/sportstaetten/
```

**`optimize.py`** – pro Bild eigene Werte statt einer Pauschaleinstellung:
Schwarz- und Weißpunkt, Gamma, eine eigene Kurve zum Anheben der Tiefen,
Kontrast, Sättigung und Nachschärfen. Ausgabe 4 : 3, höchstens 2000 × 1500 px
(kleinere Originale werden nicht hochgerechnet); Vorab-Ausschnitte stehen in
`ZUSCHNITT`. Die Werte stehen in `REZEPTE`, der Schlüssel ist der Dateiname
des Originals.

**`karussell.py`** – dasselbe für die Bilder des Karussells auf der
Startseite, aber im Hochformat 4 : 5, zwischen 800 × 1000 und 1600 × 2000 px.
Hier gehört zu jedem Rezept zusätzlich der Bildausschnitt, weil querformatige
Vorlagen beschnitten werden müssen. Zwei Sonderfälle: `hochskalieren()` für
zu kleine Vorlagen und `WEICHZEICHNEN` für Aufnahmen mit viel Laub, deren
Blattstruktur sonst in jeder Variante teuer wird.

```
mkdir karussell              # Originale hier hineinlegen
python3 karussell.py         # schreibt nach ../src/assets/karussell/
```

Die Dateien, die derzeit unter `src/assets/` liegen, stammen noch aus der Zeit,
als sie unverändert ausgeliefert wurden: 1024 × 768 bzw. 800 × 1000 px mit
Größendeckel. Beim nächsten Lauf mit den Originalen werden sie größer und
schärfer; an der Website muss dafür nichts geändert werden.

**`retusche.py`** – entfernt die Spiegelung des Fotografen aus
`ZumDorfbrunnen-1.JPG`. Der Bereich wird zeilenweise rekonstruiert: Grundton
als Verlauf zwischen den Rändern der Lücke, darauf die Feinstruktur aus dem
Streifen daneben. Die Koordinaten oben im Skript gelten nur für dieses Bild.

## Die Checkliste

**`checkliste.py`** setzt die offenen Punkte aus dem README als PDF zum
Ausdrucken und Abhaken.

```
pip install reportlab
python3 checkliste.py ../VSV-Roessing-Offene-Punkte.pdf
```

Das Datum im Fußbereich steht als `STAND` oben im Skript. Der Inhalt ist eine
Langfassung des Abschnitts „Offene Punkte vor dem Livegang" im README – beim
Ändern bitte beides nachziehen.

Kapitelüberschriften bleiben mit ihrem ersten Punkt zusammen; darum kümmert
sich `ohne_verwaiste_ueberschriften()` am fertigen Ablauf, nicht jede
Aufrufstelle einzeln.

## Linkprüfung

**`links.mjs`** geht alle Seiten in `dist/` durch und prüft jeden internen
Link: Ziel vorhanden, Seitenlinks mit `/` am Ende, Anker vorhanden auf der
Zielseite. Bricht mit einer Liste ab, wenn etwas nicht stimmt.

```
npm run build && npm run links
```
