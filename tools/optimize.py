"""Fotos der Sportstaetten fuer die Website aufbereiten.

Pro Bild eigene Werte statt einer Pauschaleinstellung: Gegenlicht- und
Truebwetteraufnahmen brauchen vor allem aufgehellte Tiefen und mehr Kontrast,
gute Aufnahmen nur einen leichten Feinschliff.
"""
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import pathlib, sys

SRC = pathlib.Path('sportstaetten')
OUT = pathlib.Path('optimiert')
OUT.mkdir(exist_ok=True)

# Zielgroessen je Bild: Hauptbilder stehen in einer zweispaltigen Kachel und
# brauchen fuer hochaufloesende Displays rund 1024 px, die Nebenansichten
# darunter werden nur als kleine Vorschau gezeigt.
GROESSEN = {
    'sporthalle.jpg': (1024, 768),
    'dorfbrunnen.jpg': (1024, 768),
    'sportplatz.jpg': (1024, 768),
    'feuerplatz.jpg': (1024, 768),
    'dorfbrunnen-hintereingang.jpg': (640, 480),
    'dorfbrunnen-glasfront.jpg': (640, 480),
    # Breiter Streifen statt 4:3 – siehe ZUSCHNITT.
    'vereinsheim.jpg': (1024, 290),
}

# Vorab-Ausschnitt in Pixeln der Vorlage, bevor auf die Zielgroesse skaliert
# wird. Noetig, wo nicht die Bildmitte das Motiv ist.
ZUSCHNITT = {
    # Vom Vereinsheim gibt es nur eine Aufnahme mit Betrieb davor. Personen
    # herauszuretuschieren ist bei dieser Menge nicht moeglich, ein 4:3-Fenster
    # ohne Personen zeigt nur Dachziegel. Bleibt der Streifen oberhalb der
    # Koepfe: Dach, Willkommensbanner und Fassade, dafuer breit statt 4:3.
    'vereinsheim.jpg': (0, 0, 2048, 580),
}
STANDARD = (1024, 768)
MAX_BYTES = 220 * 1024


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
            # wirkt stark in den Tiefen, klingt zu den Lichtern hin aus
            v = v + tiefen * (1.0 - v) ** 3
        lut.append(int(round(min(max(v, 0.0), 1.0) * 255)))
    return img.point(lut * len(img.getbands()))


def verarbeite(quelle, ziel, schwarz, weiss, gamma, tiefen, kontrast, saettigung, schaerfe):
    groesse = GROESSEN.get(ziel.name, STANDARD)
    im = Image.open(quelle)
    im = ImageOps.exif_transpose(im).convert('RGB')
    im = tonwertkurve(im, schwarz, weiss, gamma, tiefen)
    im = ImageEnhance.Contrast(im).enhance(kontrast)
    im = ImageEnhance.Color(im).enhance(saettigung)
    box = ZUSCHNITT.get(ziel.name)
    if box:
        im = im.crop(box)
    im = ImageOps.fit(im, groesse, Image.LANCZOS, centering=(0.5, 0.5))
    if schaerfe:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=int(schaerfe * 100), threshold=3))
    for q in (82, 78, 74, 70, 66):
        im.save(ziel, 'JPEG', quality=q, optimize=True, progressive=True)
        if ziel.stat().st_size <= MAX_BYTES:
            break
    return im, ziel.stat().st_size


# schwarz  weiss  gamma  tiefen  kontrast  saettigung  schaerfe
REZEPTE = {
    # Trueber Himmel, flaues Bild: Weisspunkt runter, klar mehr Kontrast.
    'Alfred-Stubenrauch-Halle (2).JPG': ('sporthalle.jpg',   0.04, 0.96, 1.00, 0.05, 1.22, 1.12, 0.55),
    # Gegenlicht unter dem Vordach: Tiefen deutlich anheben, dann Kontrast.
    'Alfred-Stubenrauch-Halle (1).JPG': ('dorfbrunnen-hintereingang.jpg', 0.02, 0.99, 1.10, 0.14, 1.20, 1.10, 0.55),
    # retuschierte Fassung, siehe retusche.py
    'retuschiert/ZumDorfbrunnen-1.JPG': ('dorfbrunnen-glasfront.jpg', 0.02, 0.99, 1.08, 0.12, 1.18, 1.08, 0.50),
    # Bewoelkt, leicht flau: moderat anziehen.
    'ZumDorfbrunnen-2.JPG':             ('dorfbrunnen.jpg',  0.04, 0.96, 1.00, 0.04, 1.20, 1.12, 0.55),
    # Schon gut belichtet: nur Dunst nehmen und Gruen etwas kraeftigen.
    'Sportplatz.JPG':                   ('sportplatz.jpg',   0.03, 0.98, 1.00, 0.02, 1.12, 1.10, 0.45),
    # Abendlicht am Feuer: Stimmung erhalten, nur Tiefen oeffnen.
    'Feuerstelle.JPG':                  ('feuerplatz.jpg',   0.01, 1.00, 1.14, 0.10, 1.08, 1.02, 0.40),
    # Abendsonne, tiefe Schatten an der Fassade.
    '22.07.12_Leichtathletik_Saisonabschluss_3.jpeg': (
        'vereinsheim.jpg', 0.02, 0.99, 1.08, 0.10, 1.06, 1.06, 0.45),
}

for name, (ziel, *werte) in REZEPTE.items():
    quelle = pathlib.Path(name) if '/' in name else SRC / name
    if not quelle.exists():
        print('fehlt:', name); continue
    im, groesse = verarbeite(quelle, OUT / ziel, *werte)
    print(f'{name:35s} -> {ziel:22s} {im.size} {groesse // 1024} KB')
