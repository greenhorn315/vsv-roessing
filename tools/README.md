# Hilfsskripte für die Fotos

Zwei kleine Python-Skripte (nur Pillow nötig), mit denen die Fotos der
Sportstätten aufbereitet wurden. Sie gehören nicht zum Build – sie sind hier
abgelegt, damit sich die Bearbeitung bei neuen Aufnahmen nachvollziehen und
wiederholen lässt.

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
