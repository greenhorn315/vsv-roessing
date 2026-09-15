"""Spiegelungen des Fotografen in Glasflaechen entfernen.

Die Aufnahmen der Dorfbrunnen-Rueckseite zeigen den Fotografen in der Scheibe –
die aeltere wie die neue, die sie abgeloest hat. Dahinter liegt jeweils dieselbe gleichfoermige, waagerecht gestreifte
Bretterwand des Schuppens gegenueber – und genau das macht die Stelle
rekonstruierbar: Der Bereich wird zeilenweise neu aufgebaut, als Grundton der
mittlere Tonwert des Spenderstreifens in derselben Zeile, darauf dessen
Feinstruktur. Weil nur der Hochpassanteil uebernommen wird, entsteht
kein sichtbar gespiegeltes Muster; weil zeilenweise gearbeitet wird, bleiben
Heckenkante, Sockel und Pflaster auf Hoehe.

Fuer andere Motive taugt das nicht. Wo hinter der zu entfernenden Stelle
Tische, Tueren oder weitere Personen liegen, gibt es nichts zu klonen.
"""
from PIL import Image, ImageFilter, ImageOps
import pathlib

QUELLEN = pathlib.Path('sportstaetten')
ZIEL = pathlib.Path('retuschiert')

# Datei: (Luecke x0, x1, y0, y1), (Spenderstreifen x0, x1)
# Die Werte sind je Aufnahme ausgemessen und gelten nur fuer sie.
STELLEN = {
    'ZumDorfbrunnen-Hinten.JPG': ((1122, 1258, 1432, 1810), (1262, 1310)),
}

RAND = 16       # weiche Kante ringsum
TEXTUR = 0.75   # Anteil der uebernommenen Feinstruktur
FENSTER = 5     # halbe Breite des Tiefpasses fuer den Hochpass


def retuschiere(quelle, ziel, luecke, spender):
    X0, X1, Y0, Y1 = luecke
    SRC0, SRC1 = spender
    im = ImageOps.exif_transpose(Image.open(quelle)).convert('RGB')
    px = im.load()
    patch = im.copy()
    ppx = patch.load()

    breite = X1 - X0
    src_breite = SRC1 - SRC0

    for y in range(Y0, Y1):
        src = [px[SRC0 + i, y] for i in range(src_breite)]
        # Grundton aus dem Spenderstreifen, nicht aus den Raendern der Luecke:
        # Ein Rand kann im Fensterrahmen liegen, dann zieht ein Verlauf einen
        # hellen Schleier durch die Flaeche.
        grund = tuple(sum(p[c] for p in src) / src_breite for c in range(3))
        tief = []
        for i in range(src_breite):
            a, b = max(0, i - FENSTER), min(src_breite, i + FENSTER + 1)
            n = b - a
            tief.append(tuple(sum(src[k][c] for k in range(a, b)) / n for c in range(3)))
        hoch = [tuple(src[i][c] - tief[i][c] for c in range(3)) for i in range(src_breite)]

        for i in range(breite):
            j = i % (2 * src_breite)
            k = j if j < src_breite else 2 * src_breite - 1 - j
            ppx[X0 + i, y] = tuple(
                int(round(max(0, min(255, grund[c] + hoch[k][c] * TEXTUR))))
                for c in range(3)
            )

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

    ziel.parent.mkdir(parents=True, exist_ok=True)
    im.save(ziel, 'JPEG', quality=95, subsampling=0)
    return im.size


for name, (luecke, spender) in STELLEN.items():
    quelle = QUELLEN / name
    if not quelle.exists():
        print('fehlt:', name)
        continue
    groesse = retuschiere(quelle, ZIEL / name, luecke, spender)
    print(f'{name:28s} -> {ZIEL / name}  {groesse}')
