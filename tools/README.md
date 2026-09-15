# Hilfsskripte

Kleine Python-Skripte, die nicht zum Build gehören. Sie sind hier abgelegt,
damit sich nachvollziehen und wiederholen lässt, wie Bilder aufbereitet wurden
und wie die Checkliste entsteht.

```
pip install Pillow
mkdir sportstaetten          # Originale hier hineinlegen
python3 retusche.py          # optional, entfernt eine Spiegelung
python3 optimize.py          # schreibt nach optimiert/
cp optimiert/*.jpg ../public/images/sportstaetten/
```

**`optimize.py`** – pro Bild eigene Werte statt einer Pauschaleinstellung:
Schwarz- und Weißpunkt, Gamma, eine eigene Kurve zum Anheben der Tiefen,
Kontrast, Sättigung und Nachschärfen. Ausgabe 1280 × 960, JPEG unter 300 KB.
Die Werte stehen in `REZEPTE`, der Schlüssel ist der Dateiname des Originals.

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
