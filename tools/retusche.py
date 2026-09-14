"""Spiegelung des Fotografen in der Glasfront entfernen.

Die Scheibe spiegelt den dunklen Schuppen mit der Hecke davor – eine fast
ausschliesslich waagerecht verlaufende Struktur. Der Bereich wird deshalb
zeilenweise rekonstruiert: als Grundton ein Verlauf zwischen den beiden
Raendern der Luecke (haelt Heckenkante, Sockel und Pflaster auf Hoehe), darauf
die Feinstruktur aus dem Streifen rechts daneben. Weil nur der Hochpassanteil
uebernommen wird, entsteht keine sichtbar gespiegelte Kachel.
"""
from PIL import Image, ImageFilter
import pathlib

QUELLE = pathlib.Path('sportstaetten/ZumDorfbrunnen-1.JPG')
ZIEL = pathlib.Path('retuschiert/ZumDorfbrunnen-1.JPG')
ZIEL.parent.mkdir(exist_ok=True)

X0, X1 = 1088, 1242          # Luecke
Y0, Y1 = 1612, 2078
SRC0, SRC1 = 1244, 1300      # Spenderstreifen rechts daneben
RAND = 16                    # weiche Kante ringsum
TEXTUR = 0.75                # Anteil der uebernommenen Feinstruktur
FENSTER = 5                  # Halbe Breite des Tiefpasses fuer den Hochpass

im = Image.open(QUELLE).convert('RGB')
px = im.load()
patch = im.copy()
ppx = patch.load()

breite = X1 - X0
src_breite = SRC1 - SRC0

for y in range(Y0, Y1):
    links = px[X0 - 1, y]
    rechts = px[X1, y]
    src = [px[SRC0 + i, y] for i in range(src_breite)]
    # Tiefpass des Spenderstreifens, daraus die Feinstruktur
    tief = []
    for i in range(src_breite):
        a, b = max(0, i - FENSTER), min(src_breite, i + FENSTER + 1)
        n = b - a
        tief.append(tuple(sum(src[k][c] for k in range(a, b)) / n for c in range(3)))
    hoch = [tuple(src[i][c] - tief[i][c] for c in range(3)) for i in range(src_breite)]

    for i in range(breite):
        t = (i + 1) / (breite + 1)
        j = i % (2 * src_breite)
        k = j if j < src_breite else 2 * src_breite - 1 - j
        werte = []
        for c in range(3):
            basis = links[c] + (rechts[c] - links[c]) * t
            werte.append(int(round(max(0, min(255, basis + hoch[k][c] * TEXTUR)))))
        ppx[X0 + i, y] = tuple(werte)

bereich = (X0 - RAND, Y0 - RAND, X1 + RAND, Y1 + RAND)
weich = patch.crop(bereich).filter(ImageFilter.GaussianBlur(0.7))
patch.paste(weich, bereich)
wpx = patch.load()

for y in range(Y0 - RAND, Y1 + RAND):
    fy = 1.0
    if y < Y0:
        fy = (y - (Y0 - RAND)) / RAND
    elif y >= Y1:
        fy = ((Y1 + RAND) - y) / RAND
    for x in range(X0 - RAND, X1 + RAND):
        fx = 1.0
        if x < X0:
            fx = (x - (X0 - RAND)) / RAND
        elif x >= X1:
            fx = ((X1 + RAND) - x) / RAND
        a = max(0.0, min(1.0, fx * fy))
        if a <= 0:
            continue
        alt, neu = px[x, y], wpx[x, y]
        px[x, y] = tuple(int(round(alt[c] + (neu[c] - alt[c]) * a)) for c in range(3))

im.save(ZIEL, 'JPEG', quality=95, subsampling=0)
print('geschrieben:', ZIEL, im.size)
