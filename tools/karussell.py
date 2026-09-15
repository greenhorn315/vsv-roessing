"""Fotos fuer das Karussell im Hero aufbereiten.

Wie tools/optimize.py, aber mit Hochformat 4:5 als Zielformat und einem
Bildausschnitt je Foto: Bei querformatigen Aufnahmen entscheidet der
Ausschnitt, ob das Motiv im Bild bleibt.

Drei der Vorlagen sind nur 300 px breite Vorschaubilder von der alten
Website. Fuer sie greift hochskalieren() – scharf wie die grossen werden sie
dadurch nicht. Ihre Dateinamen enden auf „-300x200“ beziehungsweise
„-300x225“; das ist das Namensschema, mit dem WordPress Vorschaubilder ablegt.
Das Original liegt im selben Verzeichnis unter demselben Namen ohne diesen
Zusatz. Sobald es vorliegt, hier nur die Datei tauschen und neu laufen lassen.
"""
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import pathlib

SRC = pathlib.Path('karussell')
OUT = pathlib.Path('karussell-optimiert')
OUT.mkdir(exist_ok=True)

BREITE, HOEHE = 800, 1000
MAX_BYTES = 180 * 1024


def tonwertkurve(img, schwarz=0.0, weiss=1.0, gamma=1.0, tiefen=0.0):
    """Schwarz-/Weisspunkt setzen, Gamma anwenden, Tiefen separat anheben."""
    lut = []
    for i in range(256):
        v = i / 255.0
        v = (v - schwarz) / max(weiss - schwarz, 1e-6)
        v = min(max(v, 0.0), 1.0)
        if gamma != 1.0:
            v = v ** (1.0 / gamma)
        if tiefen:
            v = v + tiefen * (1.0 - v) ** 3
        lut.append(int(round(min(max(v, 0.0), 1.0) * 255)))
    return img.point(lut * len(img.getbands()))


def kantenmaske(bild):
    """Weiss an Kanten, schwarz in glatten Flaechen."""
    kanten = bild.convert('L').filter(ImageFilter.FIND_EDGES)
    kanten = kanten.filter(ImageFilter.GaussianBlur(2.0))
    # Alles unter der Schwelle gilt als Flaeche, darueber weich ansteigend
    schwelle, spanne = 6, 26
    return kanten.point(
        lambda v: 0 if v < schwelle else min(255, int((v - schwelle) * 255 / spanne))
    )


def hochskalieren(bild, breite, hoehe):
    """Kleine Vorlagen vergroessern, ohne dass sie kruemelig werden.

    Das Problem der 300-px-Vorlagen ist nicht allein die fehlende Aufloesung,
    sondern die JPEG-Blockstruktur darin. Wer die einfach hochzieht und dann
    nachschaerft, schaerft die Bloecke mit. Deshalb: erst die Bloecke daempfen,
    solange sie klein sind, dann in Schritten vergroessern, und am Ende nur
    echte Kanten schaerfen – Flaechen wie Himmel, Rasen und Wege bleiben glatt,
    denn dort faellt das Rauschen als „pixelig“ auf.
    """
    entblockt = bild.filter(ImageFilter.MedianFilter(3))
    bild = Image.blend(bild, entblockt, 0.55).filter(ImageFilter.GaussianBlur(0.4))

    while bild.width * 1.5 < breite:
        bild = bild.resize((int(bild.width * 1.5), int(bild.height * 1.5)), Image.LANCZOS)
    bild = bild.resize((breite, hoehe), Image.LANCZOS)

    scharf = bild.filter(ImageFilter.UnsharpMask(radius=1.9, percent=95, threshold=2))
    glatt = bild.filter(ImageFilter.GaussianBlur(0.7))
    return Image.composite(scharf, glatt, kantenmaske(bild))


def verarbeite(quelle, ziel, ausschnitt, schwarz, weiss, gamma, tiefen,
               kontrast, saettigung, schaerfe):
    im = ImageOps.exif_transpose(Image.open(quelle)).convert('RGB')
    klein = im.width < BREITE          # Vorschaubild von der alten Website
    im = tonwertkurve(im, schwarz, weiss, gamma, tiefen)
    im = ImageEnhance.Contrast(im).enhance(kontrast)
    im = ImageEnhance.Color(im).enhance(saettigung)
    if klein:
        # Erst den Ausschnitt in Originalgroesse nehmen, dann vergroessern –
        # nicht umgekehrt, sonst wird Material hochskaliert, das wegfaellt.
        b = min(im.width, round(im.height * BREITE / HOEHE))
        h = round(b * HOEHE / BREITE)
        im = ImageOps.fit(im, (b, h), Image.LANCZOS, centering=ausschnitt)
        im = hochskalieren(im, BREITE, HOEHE)
    else:
        im = ImageOps.fit(im, (BREITE, HOEHE), Image.LANCZOS, centering=ausschnitt)
        if schaerfe:
            im = im.filter(
                ImageFilter.UnsharpMask(radius=1.4, percent=int(schaerfe * 100), threshold=3)
            )
    for q in (84, 80, 76, 72, 68):
        im.save(ziel, 'JPEG', quality=q, optimize=True, progressive=True)
        if ziel.stat().st_size <= MAX_BYTES:
            break
    return im, ziel.stat().st_size


#                                    ausschnitt   schwarz weiss gamma tiefen kontr saett schaerfe
REZEPTE = {
    # Gegenlicht mit heller Wolkendecke, dunkle Trikots: Tiefen oeffnen.
    '19.09.08_Leichtathletik_Gruppenfoto_3-scaled.jpg': (
        'gruppenfoto.jpg', (0.50, 0.58), 0.02, 0.99, 1.06, 0.09, 1.08, 1.06, 0.45),
    # Buehnenlicht: aufhellen, aber die Farbstimmung nicht wegziehen.
    '20260905-JAZZ-Dance Auftritt.JPG': (
        'jazzdance.jpg', (0.50, 0.60), 0.01, 1.00, 1.26, 0.10, 1.06, 0.98, 0.40),
    # Kleine Vorlagen von der alten Website.
    '21.04.20_Leichtathletik_Training_Di-Jugend_2-300x200.jpg': (
        'leichtathletik-jugend.jpg', (0.50, 0.50), 0.03, 0.98, 1.00, 0.03, 1.08, 1.06, 0),
    '21.06.07_Leichtathletik_Kindergruppe_Training_2-300x200.jpg': (
        'leichtathletik-kinder.jpg', (0.32, 0.50), 0.02, 0.99, 1.14, 0.10, 1.10, 1.05, 0),
    '2205_Turnen_Freitagsturner_1-300x225.jpg': (
        'freitagsradler.jpg', (0.55, 0.55), 0.04, 0.96, 1.00, 0.03, 1.18, 1.10, 0),
    # Bewusst dunkles Motiv: Tiefen leicht oeffnen, Kontrast nur wenig.
    'Pexels-pixabay-262438.jpg': (
        'dart.jpg', (0.45, 0.50), 0.01, 1.00, 1.08, 0.05, 1.05, 1.02, 0.40),
}

for name, (ziel, ausschnitt, *werte) in REZEPTE.items():
    quelle = SRC / name
    if not quelle.exists():
        print('fehlt:', name)
        continue
    im, groesse = verarbeite(quelle, OUT / ziel, ausschnitt, *werte)
    print(f'{name[:44]:46s} -> {ziel:26s} {im.size} {groesse // 1024} KB')
