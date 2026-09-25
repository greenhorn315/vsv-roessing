from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import pathlib

SRC = pathlib.Path('karussell')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'karussell'
OUT.mkdir(parents=True, exist_ok=True)

BREITE, HOEHE = 800, 1000
MAX_BREITE = 1600
QUALITAET = 90

# Fester Ausschnitt in Pixeln der Vorlage, vor dem Einpassen ins Hochformat.
# Für Querformate, bei denen ein Mittelpunkt allein zu viel Rasen oder Himmel
# übrig lässt.
ZUSCHNITT = {
    # Sportfest vom 25.09.2026: Zelte und Flutlicht, ohne den halben Platz davor.
    'sportfest-flutlicht.jpg': (490, 296, 1521, 1585),
}

WEICHZEICHNEN = {
    'leichtathletik-weitsprung.jpg': 0.5,
    'sportabzeichen-aufwaermen.jpg': 0.7,
}

def tonwertkurve(img, schwarz=0.0, weiss=1.0, gamma=1.0, tiefen=0.0):
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
    kanten = bild.convert('L').filter(ImageFilter.FIND_EDGES)
    kanten = kanten.filter(ImageFilter.GaussianBlur(2.0))
    schwelle, spanne = 6, 26
    return kanten.point(
        lambda v: 0 if v < schwelle else min(255, int((v - schwelle) * 255 / spanne))
    )

def hochskalieren(bild, breite, hoehe):
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
    box = ZUSCHNITT.get(ziel.name)
    if box:
        im = im.crop(box)
    klein = im.width < BREITE
    im = tonwertkurve(im, schwarz, weiss, gamma, tiefen)
    im = ImageEnhance.Contrast(im).enhance(kontrast)
    im = ImageEnhance.Color(im).enhance(saettigung)
    if klein:
        b = min(im.width, round(im.height * BREITE / HOEHE))
        h = round(b * HOEHE / BREITE)
        im = ImageOps.fit(im, (b, h), Image.LANCZOS, centering=ausschnitt)
        im = hochskalieren(im, BREITE, HOEHE)
    else:
        b = max(BREITE, min(MAX_BREITE, im.width, round(im.height * BREITE / HOEHE)))
        im = ImageOps.fit(im, (b, round(b * HOEHE / BREITE)), Image.LANCZOS, centering=ausschnitt)
        weich = WEICHZEICHNEN.get(ziel.name)
        if weich:
            im = im.filter(ImageFilter.GaussianBlur(weich))
        if schaerfe:
            im = im.filter(
                ImageFilter.UnsharpMask(radius=1.4, percent=int(schaerfe * 100), threshold=3)
            )
    im.save(ziel, 'JPEG', quality=QUALITAET, optimize=True, progressive=True)
    return im, ziel.stat().st_size

REZEPTE = {
    '19.09.08_Leichtathletik_Gruppenfoto_3-scaled.jpg': (
        'gruppenfoto.jpg', (0.50, 0.58), 0.02, 0.99, 1.06, 0.09, 1.08, 1.06, 0.45),
    '20260905-JAZZ-Dance Auftritt.JPG': (
        'jazzdance.jpg', (0.50, 0.60), 0.01, 1.00, 1.26, 0.10, 1.06, 0.98, 0.40),
    '20260922-Sportabzeichen-Weitsprung.JPG': (
        'leichtathletik-weitsprung.jpg', (0.50, 0.50), 0.02, 0.99, 1.08, 0.09, 1.06, 1.04, 0.45),
    # Ausschnitt rechts: dort nur Rücken zur Kamera.
    '20260922-Sportabzeichen-Aufwaermen.JPG': (
        'sportabzeichen-aufwaermen.jpg', (0.95, 0.50), 0.02, 0.99, 1.06, 0.08, 1.08, 1.05, 0.45),
    '19e7a73d2e2.jpg': (
        'freitagsradler.jpg', (0.46, 0.55), 0.02, 0.99, 1.06, 0.10, 1.06, 1.06, 0.45),
    '19e55eceb65.jpg': (
        'freitagsradler-umland.jpg', (0.55, 0.55), 0.03, 0.98, 1.02, 0.05, 1.08, 1.06, 0.45),
    '19e55eced99.jpg': (
        'freitagsradler-abendlicht.jpg', (0.40, 0.55), 0.01, 1.00, 1.04, 0.09, 1.08, 1.08, 0.45),
    '19c61787d53.jpg': (
        'freitagsradler-schloss.jpg', (0.62, 0.50), 0.02, 0.99, 1.10, 0.12, 1.08, 1.06, 0.45),
    # Ausschnitt rechts: links stand ein Kind mit erkennbarem Gesicht.
    '22.06.19_Fussball_U7_Turnier_23-2048x1365.jpg': (
        'fussball-u7.jpg', (0.58, 0.58), 0.03, 0.98, 1.04, 0.06, 1.10, 1.08, 0.45),
    # Zieldatei bewusst neutral benannt: die Vorlage nennt einen Vornamen.
    '23-02-12-Elise-LM-Huerdenstart-2048x1536.jpg': (
        'leichtathletik-huerden.jpg', (0.33, 0.55), 0.02, 0.99, 1.04, 0.06, 1.08, 1.06, 0.45),
    # Abendlicht mit Flutlicht, der Rasen ist schon sehr gelb: Sättigung leicht zurück.
    '20260925-Sportfest.jpg': (
        'sportfest-flutlicht.jpg', (0.50, 0.50), 0.02, 0.99, 1.02, 0.06, 1.04, 0.97, 0.35),
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
