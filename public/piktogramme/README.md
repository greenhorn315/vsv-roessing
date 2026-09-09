# Piktogramme

Alle Dateien stammen aus dem Sportdeutschland-Satz des DOSB.

## Benennung

Die Dateien heißen nach ihrem **Motiv**, nicht nach der Sparte. So kann
dasselbe Bild an zwei Stellen dienen: `wandern.png` ist zugleich das
Piktogramm der Sparte Outdoor und das der Sportart Wandern.

Zugeordnet wird in `src/data/sports.ts`:

```ts
{
  slug: 'outdoor',
  pictogram: 'wandern',          // Bild der Sparte
  activities: [
    { name: 'Wandern',        pictogram: 'wandern' },
    { name: 'Nordic Walking', pictogram: 'nordic-walking' },
    { name: 'Radwandern',     pictogram: 'radfahren' },
    { name: 'Boßeln' },        // ohne Piktogramm: leerer Rahmen
  ],
}
```

Eine Sportart ohne `pictogram` bekommt einen gestrichelten leeren Rahmen.
Sie bleibt dadurch sichtbar, statt unter den Tisch zu fallen.

## Vorrat

| Datei | Motiv | verwendet als |
|---|---|---|
| `fussball` | Fußball | Sparte Fußball |
| `volleyball` | Volleyball | Sparte Volleyball |
| `beachvolleyball` | Beachvolleyball | – |
| `leichtathletik` | Laufen | Sparte Leichtathletik |
| `weitsprung` | Weitsprung | – |
| `speerwurf` | Speerwurf | – |
| `geraeteturnen-sprung` | Sprung am Gerät | Sparte Turnen |
| `bodenturnen` | Bodenturnen | – |
| `gymnastik` | Gymnastik | – |
| `basketball` | Basketball | Sparte Basketball |
| `modern-dance` | Modern Dance | Sparte Tanzen |
| `wandern` | Wandern | Sparte Outdoor, Sportart Wandern |
| `nordic-walking` | Nordic Walking | Sportart Nordic Walking |
| `radfahren` | Radfahren | Sportart Radwandern |
| `yoga` | Yoga | Sparte Yoga |
| `darts` | Darts | Sparte Dart |

Die nicht zugeordneten liegen als Vorrat bereit, falls beim Klären der
Spartenstruktur weitere Sportarten dazukommen.

## Format

PNG, 256 × 256, transparent außerhalb des Rahmens, schwarz auf weiß. Aus den
DOSB-Vorlagen (500 px) erzeugt: auf den tatsächlichen Rahmen zugeschnitten,
dann ohne Verzerrung auf ein Quadrat zentriert – die Vorlagen sind teils
504 px breit und haben unterschiedlich viel Rand.

Dargestellt mit 64 px in Sportkarten und Sportartenliste, 88 px im Kopf der
Spartenseiten. 256 px deckt damit auch dreifache Bildschirmauflösung ab.

## Neues Piktogramm ergänzen

1. Auf sportdeutschland.de/piktogramme herunterladen (kostenlos und
   lizenzfrei für Vereine).
2. Aus dem ZIP `Piktogramme_schwarz_auf_weiss/…_500px.png` nehmen, auf den
   Rahmen zuschneiden und auf 256 × 256 zentrieren.
3. Nach Motiv benannt hier ablegen und in `sports.ts` eintragen.

## Nennung

Bedingung der Nutzung ist der Hinweis `©DOSB/Sportdeutschland`. Er steht im
Impressum unter „Copyright".
