# Sparten-Piktogramme

Ein Piktogramm je Sparte, benannt nach dem `slug` aus `src/data/sports.ts`.
Eingebunden über `src/components/Pictogram.astro` in den Sportkarten und auf
den Spartenseiten.

| Datei | Sparte | Quelle |
|---|---|---|
| `fussball.png` | Fußball | DOSB `icon_fussball` |
| `volleyball.png` | Volleyball | DOSB `icon_volleyball` |
| `leichtathletik.png` | Leichtathletik | DOSB `icon_leichtathletik` |
| `turnen.png` | Turnen | DOSB `icon_Geraeteturnen_Sprung` |
| `basketball.png` | Basketball | DOSB `icon_basketball` |
| `tanzen.png` | Tanzen | DOSB `icon_modern_dance` |
| `outdoor.png` | Outdoor | DOSB `icon_wandern` |
| `yoga.png` | Yoga | DOSB `icon_yoga` |
| `dart.png` | Dart | DOSB `icon_darts` |

## Format

Alle neun Dateien stammen aus dem DOSB-Satz. PNG, 256 × 256, transparent außerhalb des Rahmens, schwarz auf
weiß. Aus den DOSB-Vorlagen (500 px) erzeugt, indem auf den tatsächlichen
Rahmen zugeschnitten und ohne Verzerrung auf ein quadratisches Feld zentriert
wurde – die Vorlagen sind teils 504 px breit.

Dargestellt werden sie mit 64 px in den Sportkarten und 88 px auf den
Spartenseiten. 256 px deckt damit auch Bildschirme mit dreifacher Auflösung ab.

## Herkunft und Nennung

Die DOSB-Piktogramme sind kostenlos und lizenzfrei für nicht-kommerzielle
Nutzung durch Vereine. Bedingung ist die Nennung `©DOSB/Sportdeutschland` –
sie steht im Impressum unter „Copyright".
