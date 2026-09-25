from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import pathlib, sys

SRC = pathlib.Path('sportstaetten')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'sportstaetten'
OUT.mkdir(parents=True, exist_ok=True)

GROESSE = (2000, 1500)
QUALITAET = 90

ZUSCHNITT = {
    'sportplatz-weitsprunganlage.jpg': (0, 441, 3024, 2709),
    # Aufnahmen vom 25. September 2026, Vorlagen 2576 × 1932 px.
    # Viel Himmel über dem Platz: oben knapp ein Drittel davon weg.
    'sportplatz.jpg': (138, 207, 2438, 1932),
    # Das Gebäude sitzt hoch im Bild, darunter viel Rasen: Ausschnitt nach oben.
    'vereinsheim.jpg': (168, 0, 2358, 1643),
    # Rechts die Glastür, in der sich der Fotograf spiegelt: abgeschnitten.
    'vereinsheim-terrasse.jpg': (0, 150, 2242, 1832),
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

def verarbeite(quelle, ziel, schwarz, weiss, gamma, tiefen, kontrast, saettigung, schaerfe):
    im = Image.open(quelle)
    im = ImageOps.exif_transpose(im).convert('RGB')
    im = tonwertkurve(im, schwarz, weiss, gamma, tiefen)
    im = ImageEnhance.Contrast(im).enhance(kontrast)
    im = ImageEnhance.Color(im).enhance(saettigung)
    box = ZUSCHNITT.get(ziel.name)
    if box:
        im = im.crop(box)
    breite = min(GROESSE[0], im.width, round(im.height * 4 / 3))
    groesse = (breite, round(breite * 3 / 4))
    im = ImageOps.fit(im, groesse, Image.LANCZOS, centering=(0.5, 0.5))
    if schaerfe:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=int(schaerfe * 100), threshold=3))
    im.save(ziel, 'JPEG', quality=QUALITAET, optimize=True, progressive=True)
    return im, ziel.stat().st_size

REZEPTE = {
    'Alfred-Stubenrauch-Halle+ZumDorfbrunnen-Vorn.JPG': (
        'sporthalle.jpg', 0.02, 0.99, 1.10, 0.10, 1.06, 1.04, 0.45),
    'Eingang-Sporthalle.JPG': (
        'sporthalle-eingang.jpg', 0.02, 1.00, 1.02, 0.06, 1.04, 1.04, 0.45),
    'ZumDorfbrunnen-Vorn.JPG': (
        'dorfbrunnen.jpg', 0.02, 0.99, 1.06, 0.08, 1.06, 1.04, 0.45),
    'retuschiert/ZumDorfbrunnen-Hinten.JPG': (
        'dorfbrunnen-hinten.jpg', 0.02, 0.99, 1.12, 0.12, 1.06, 1.04, 0.45),
    # Löst die Aufnahme vom 14.09. ab: Die neue zeigt auch die Laufbahn.
    'Sportplatz-Panorama.jpg': (
        'sportplatz.jpg', 0.02, 0.99, 1.00, 0.03, 1.06, 1.06, 0.40),
    # Retuschierte Fassung, siehe retusche.py: Spiegelung im Fenster entfernt.
    'retuschiert/Sportplatz-Eingang.jpg': (
        'sportplatz-eingang.jpg', 0.02, 0.99, 1.04, 0.06, 1.05, 1.03, 0.40),
    'Feuerstelle.JPG':                  ('feuerplatz.jpg',   0.01, 1.00, 1.14, 0.10, 1.08, 1.02, 0.40),
    'Weitsprunganlage mit Tartanbahn.JPG': (
        'sportplatz-weitsprunganlage.jpg', 0.02, 0.99, 1.04, 0.06, 1.08, 1.00, 0.45),
    # Löst die Nahaufnahme der Eingangstür vom 22.09. ab: Die Gesamtansicht
    # zeigt das ganze Haus, die Terrasse dieselbe Wand mit mehr Umgebung.
    'Vereinsheim-Gesamt.jpg': (
        'vereinsheim.jpg', 0.02, 0.99, 1.04, 0.06, 1.05, 1.04, 0.40),
    'Vereinsheim-Terrasse.jpg': (
        'vereinsheim-terrasse.jpg', 0.02, 0.99, 1.02, 0.04, 1.05, 1.03, 0.40),
    'Vereinsheim-Gaststaette.JPG': (
        'vereinsheim-gaststaette.jpg', 0.02, 0.99, 1.08, 0.08, 1.06, 1.02, 0.40),
}

for name, (ziel, *werte) in REZEPTE.items():
    quelle = pathlib.Path(name) if '/' in name else SRC / name
    if not quelle.exists():
        print('fehlt:', name); continue
    im, groesse = verarbeite(quelle, OUT / ziel, *werte)
    print(f'{name:35s} -> {ziel:22s} {im.size} {groesse // 1024} KB')
