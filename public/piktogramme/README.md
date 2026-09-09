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
    { name: 'Boßeln',        pictogram: 'boccia' },
  ],
}
```

Eine Sportart ohne `pictogram` bekommt einen gestrichelten leeren Rahmen.
Sie bleibt dadurch sichtbar, statt unter den Tisch zu fallen.

Für Boßeln gibt es kein eigenes DOSB-Piktogramm. Verwendet wird deshalb das
von Boccia – unverändert, das Motiv passt inhaltlich.

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
| `boccia` | Boccia/Boule | Sportart Boßeln |

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

## Verändern ist nicht erlaubt

Die Nutzungshinweise des DOSB untersagen das Einfügen oder Verändern von
Bestandteilen: keine zusätzlichen Grafiken, keine Logos, kein Text im
Piktogramm, keine Einbindung in ein Logo. Erlaubt ist nur die unveränderte
Verwendung, dazu die Farbvarianten aus dem Download.

Erlaubt bleibt, was wir tun: gleichmäßig skalieren und den transparenten Rand
beschneiden. Das ändert nichts am Motiv.

Fehlt eine Sportart im DOSB-Satz, sind die Wege: dort noch einmal suchen (über
200 Sportarten), eine vollständig eigene Zeichnung anfertigen, oder den
leeren Rahmen stehen lassen. Ein DOSB-Piktogramm als Vorlage zu ergänzen ist
keiner davon.

## Nennung

Bedingung der Nutzung ist der Hinweis `©DOSB/Sportdeutschland`. Er steht im
Impressum unter „Copyright".
