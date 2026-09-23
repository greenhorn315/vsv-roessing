# Bilder

Fotos, Piktogramme und das Vereinswappen liegen hier unter `src/assets/` und
nicht unter `public/`: Astro rechnet beim Bauen aus jeder Datei die passenden
Größen in AVIF und WebP (mit JPEG als Rückfall) und schreibt `srcset` und
`sizes` selbst. Die Dateien hier sind also **Vorlagen**, nicht das, was
ausgeliefert wird – lieber etwas zu groß als zu klein.

Ein verschriebener Dateiname oder eine fehlende Datei bricht den Build ab,
statt still eine Lücke auf der Seite zu lassen.

| Ordner / Datei | Format | Vorlage | Verwendet in |
|---|---|---|---|
| `karussell/*.jpg` | Hochformat 4:5 | ab 800 × 1000 px, siehe `karussell/README.md` | `src/content/karussell.yaml` |
| `sportstaetten/*.jpg` | Querformat 4:3 | ab 1024 × 768 px, siehe `sportstaetten/README.md` | `src/content/sportstaetten.yaml` |
| `social/*.jpg` (auch `.png`, `.webp`) | quadratisch | ab 600 × 600 px | Social-Bereich der Startseite |
| `piktogramme/*.png` | 256 × 256, transparent | siehe `piktogramme/README.md` | `pictogram:` in `src/content/sportarten/` |
| `logo-vsv.png` | Wappen, transparent | 275 × 320 px | Kopfzeile |

**Social-Bereich**

Den Ordner `social/` gibt es noch nicht. Solange darin keine Bilder liegen,
zeigen die vier Kacheln einen gestalteten Platzhalter – ohne dass der Browser
dafür etwas lädt. Sobald Dateien darin liegen, werden sie nach Dateinamen
sortiert in die Kacheln gesetzt (also z. B. `1.jpg` … `4.jpg`); es muss dafür
nichts weiter eingetragen werden.

**Bleibt in `public/`**

Was unter einer festen Adresse erreichbar sein muss: Favicons,
`apple-touch-icon.png`, das Vorschaubild `og-default.png` (1200 × 630 px, für
WhatsApp und Facebook – die brauchen eine gleichbleibende absolute Adresse)
und die PDF-Formulare unter `downloads/`.

**Bitte beachten**

* Vorlagen als JPG in hoher Qualität, lange Kante höchstens rund 2000 px.
  Kleiner rechnet Astro selbst; `tools/` hilft beim Zuschneiden und bei der
  Farbkorrektur.
* Bei Fotos von Kindern und Jugendlichen ist eine schriftliche Einwilligung der
  Erziehungsberechtigten nötig (Recht am eigenen Bild, KUG/DSGVO), bevor die
  Bilder online gehen.
