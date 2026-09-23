"""Vorlagen fuer die Fotos der Sportstaetten aufbereiten.

Pro Bild eigene Werte statt einer Pauschaleinstellung: Gegenlicht- und
Truebwetteraufnahmen brauchen vor allem aufgehellte Tiefen und mehr Kontrast,
gute Aufnahmen nur einen leichten Feinschliff.

Das Skript bereitet nur noch die Vorlage vor: Farbkorrektur, Ausschnitt auf
4:3, grosszuegige Groesse, hohe JPEG-Qualitaet. Die Groessen und Formate, die
tatsaechlich ausgeliefert werden (AVIF, WebP, JPEG in mehreren Breiten),
rechnet Astro beim Bauen daraus – siehe src/components/VenueGallery.astro.
Geschrieben wird direkt nach src/assets/sportstaetten/.
"""
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import pathlib, sys

SRC = pathlib.Path('sportstaetten')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'sportstaetten'
OUT.mkdir(parents=True, exist_ok=True)

# Groesse der Vorlage, 4:3. Grosszuegig bemessen: Astro rechnet daraus nur
# kleiner, nie groesser. Die Kacheln sind hoechstens rund 560 px breit, die
# groesste ausgelieferte Variante 1024 px – 2000 px lassen Luft fuer einen
# spaeteren Einsatz in voller Seitenbreite. Ist die Vorlage kleiner, bleibt es
# bei ihrer Groesse; hochgerechnet wird nicht.
GROESSE = (2000, 1500)
QUALITAET = 90

# Vorab-Ausschnitt in Pixeln der Vorlage, bevor auf die Zielgroesse skaliert
# wird. Noetig, wo nicht die Bildmitte das Motiv ist.
ZUSCHNITT = {
    # Hochformat als Vorlage: Die Bahn laeuft von unten ins Bild. Fuer die
    # 4:3-Kachel bleibt das obere Drittel mit Anlauf, Absprungbalken und
    # Sandgrube; der lange Vordergrund faellt weg.
    'sportplatz-weitsprunganlage.jpg': (0, 441, 3024, 2709),
}


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
    im = Image.open(quelle)
    im = ImageOps.exif_transpose(im).convert('RGB')
    im = tonwertkurve(im, schwarz, weiss, gamma, tiefen)
    im = ImageEnhance.Contrast(im).enhance(kontrast)
    im = ImageEnhance.Color(im).enhance(saettigung)
    box = ZUSCHNITT.get(ziel.name)
    if box:
        im = im.crop(box)
    # 4:3 in hoechstens GROESSE, aber nicht groesser als die Vorlage hergibt.
    breite = min(GROESSE[0], im.width, round(im.height * 4 / 3))
    groesse = (breite, round(breite * 3 / 4))
    im = ImageOps.fit(im, groesse, Image.LANCZOS, centering=(0.5, 0.5))
    if schaerfe:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=int(schaerfe * 100), threshold=3))
    # Hohe Qualitaet ohne Groessendeckel: Das ist die Vorlage, nicht die
    # ausgelieferte Datei. Komprimiert wird beim Bauen (astro.config.mjs).
    im.save(ziel, 'JPEG', quality=QUALITAET, optimize=True, progressive=True)
    return im, ziel.stat().st_size


# schwarz  weiss  gamma  tiefen  kontrast  saettigung  schaerfe
REZEPTE = {
    # Abendsonne von vorn, Fassade links im Schatten: Tiefen oeffnen, den
    # ohnehin kraeftigen Himmel nicht weiter anziehen.
    'Alfred-Stubenrauch-Halle+ZumDorfbrunnen-Vorn.JPG': (
        'sporthalle.jpg', 0.02, 0.99, 1.10, 0.10, 1.06, 1.04, 0.45),
    # Heller Eingangsbereich mit hellen Waenden: Lichter unangetastet lassen.
    'Eingang-Sporthalle.JPG': (
        'sporthalle-eingang.jpg', 0.02, 1.00, 1.02, 0.06, 1.04, 1.04, 0.45),
    'ZumDorfbrunnen-Vorn.JPG': (
        'dorfbrunnen.jpg', 0.02, 0.99, 1.06, 0.08, 1.06, 1.04, 0.45),
    # Tiefer Schatten unter dem Vordach; retuschierte Fassung, siehe retusche.py
    'retuschiert/ZumDorfbrunnen-Hinten.JPG': (
        'dorfbrunnen-hinten.jpg', 0.02, 0.99, 1.12, 0.12, 1.06, 1.04, 0.45),
    # Schon gut belichtet: nur Dunst nehmen und Gruen etwas kraeftigen.
    'Sportplatz.JPG':                   ('sportplatz.jpg',   0.03, 0.98, 1.00, 0.02, 1.12, 1.10, 0.45),
    # Abendlicht am Feuer: Stimmung erhalten, nur Tiefen oeffnen.
    'Feuerstelle.JPG':                  ('feuerplatz.jpg',   0.01, 1.00, 1.14, 0.10, 1.08, 1.02, 0.40),
    # Tartanbahn in der Nachmittagssonne: Das Rot ist ohnehin kraeftig, hier
    # nur Kontrast und Tiefen, keine zusaetzliche Sattigung.
    'Weitsprunganlage mit Tartanbahn.JPG': (
        'sportplatz-weitsprunganlage.jpg', 0.02, 0.99, 1.04, 0.06, 1.08, 1.00, 0.45),
    # Vereinsheim im Schatten des Vordachs, gleichmaessig aber flau: Kontrast
    # anziehen, den Klinker etwas kraeftigen, Banner darf nicht ausfressen.
    'Vereinsheim-Eingang.JPG': (
        'vereinsheim.jpg', 0.02, 0.99, 1.04, 0.05, 1.10, 1.08, 0.45),
    # Innenaufnahme mit Kunstlicht: Tiefen oeffnen, Farbe nur leicht anheben,
    # sonst kippt das warme Holz ins Orange.
    'Vereinsheim-Gaststaette.JPG': (
        'vereinsheim-gaststaette.jpg', 0.02, 0.99, 1.08, 0.08, 1.06, 1.02, 0.40),
}


for name, (ziel, *werte) in REZEPTE.items():
    quelle = pathlib.Path(name) if '/' in name else SRC / name
    if not quelle.exists():
        print('fehlt:', name); continue
    im, groesse = verarbeite(quelle, OUT / ziel, *werte)
    print(f'{name:35s} -> {ziel:22s} {im.size} {groesse // 1024} KB')
