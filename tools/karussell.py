"""Fotos fuer das Karussell im Hero aufbereiten.

Die Aufnahme vom Saisonabschluss vor dem Vereinsheim gehoerte hier einmal
dazu und ist wieder draussen: Auf ihr sind Kinder erkennbar. Das Vereinsheim
zeigt seit dem 22. September eine eigene Aufnahme ohne Personen,
aufbereitet von tools/optimize.py.

Wie tools/optimize.py, aber mit Hochformat 4:5 als Zielformat und einem
Bildausschnitt je Foto: Bei querformatigen Aufnahmen entscheidet der
Ausschnitt, ob das Motiv im Bild bleibt.

Das Skript bereitet nur noch die Vorlage vor: Farbkorrektur, Ausschnitt,
grosszuegige Groesse, hohe JPEG-Qualitaet. Die ausgelieferten Groessen und
Formate (AVIF, WebP, JPEG in 400, 560 und 800 px Breite) rechnet Astro beim
Bauen daraus – siehe src/components/HeroKarussell.astro. Geschrieben wird
direkt nach src/assets/karussell/.

Die beiden 300 px breiten Vorschaubilder von der alten Website sind seit dem
22. September draussen: An ihre Stelle sind zwei Aufnahmen vom Sportabzeichen-
Tag getreten, in voller Aufloesung und mit demselben Motiv. hochskalieren()
bleibt trotzdem stehen – fuer den naechsten Fall dieser Art.

Falls doch wieder eine Vorschau von der alten Website gebraucht wird: Deren
Dateinamen enden auf „-300x200“ oder „-300x225“, das Namensschema von
WordPress. Das Original liegt im selben Verzeichnis unter demselben Namen
ohne diesen Zusatz.
"""
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import pathlib

SRC = pathlib.Path('karussell')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'karussell'
OUT.mkdir(parents=True, exist_ok=True)

# Mindestgroesse der Vorlage, 4:5: Die groesste ausgelieferte Variante ist
# 800 px breit. Kleinere Vorlagen werden mit hochskalieren() auf dieses Mass
# gebracht.
BREITE, HOEHE = 800, 1000
# Hoechstgroesse der Vorlage: 1600 x 2000 px, also 2000 px an der langen
# Kante. Groessere Aufnahmen werden darauf verkleinert.
MAX_BREITE = 1600
QUALITAET = 90

# Leichter Weichzeichner vor dem Nachschaerfen, in Pixeln. Nimmt genau die
# Blattstruktur heraus, die im JPEG teuer und fuers Motiv ohne Belang ist;
# was danach nachgeschaerft wird, sind wieder die tragenden Kanten. Eingefuehrt,
# als die Vorlage selbst ausgeliefert wurde und unter 210 KB bleiben musste;
# die Varianten, die Astro daraus rechnet, profitieren genauso. Die Werte sind
# fuer 800 px Breite ausgemessen – bei groesseren Vorlagen beim naechsten Lauf
# pruefen.
WEICHZEICHNEN = {
    'leichtathletik-weitsprung.jpg': 0.5,
    # Dichtes Laub ueber die ganze obere Bildhaelfte, deshalb etwas mehr.
    'sportabzeichen-aufwaermen.jpg': 0.7,
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
        # 4:5 in hoechstens MAX_BREITE, sonst so gross, wie der Ausschnitt
        # hergibt – aber mindestens BREITE (dann wie bisher per LANCZOS
        # vergroessert, etwa beim Dart-Bild mit 852 px Hoehe).
        b = max(BREITE, min(MAX_BREITE, im.width, round(im.height * BREITE / HOEHE)))
        im = ImageOps.fit(im, (b, round(b * HOEHE / BREITE)), Image.LANCZOS, centering=ausschnitt)
        weich = WEICHZEICHNEN.get(ziel.name)
        if weich:
            im = im.filter(ImageFilter.GaussianBlur(weich))
        if schaerfe:
            im = im.filter(
                ImageFilter.UnsharpMask(radius=1.4, percent=int(schaerfe * 100), threshold=3)
            )
    # Hohe Qualitaet ohne Groessendeckel: Das ist die Vorlage, nicht die
    # ausgelieferte Datei. Komprimiert wird beim Bauen (astro.config.mjs).
    im.save(ziel, 'JPEG', quality=QUALITAET, optimize=True, progressive=True)
    return im, ziel.stat().st_size


#                                    ausschnitt   schwarz weiss gamma tiefen kontr saett schaerfe
REZEPTE = {
    # Gegenlicht mit heller Wolkendecke, dunkle Trikots: Tiefen oeffnen.
    '19.09.08_Leichtathletik_Gruppenfoto_3-scaled.jpg': (
        'gruppenfoto.jpg', (0.50, 0.58), 0.02, 0.99, 1.06, 0.09, 1.08, 1.06, 0.45),
    # Buehnenlicht: aufhellen, aber die Farbstimmung nicht wegziehen.
    '20260905-JAZZ-Dance Auftritt.JPG': (
        'jazzdance.jpg', (0.50, 0.60), 0.01, 1.00, 1.26, 0.10, 1.06, 0.98, 0.40),
    # Nachmittagssonne von der Seite, tiefe Schatten im Gruen: Tiefen oeffnen,
    # Kontrast nur massvoll. Hochformat, also kein Ausschnitt noetig.
    '20260922-Sportabzeichen-Weitsprung.JPG': (
        'leichtathletik-weitsprung.jpg', (0.50, 0.50), 0.02, 0.99, 1.08, 0.09, 1.06, 1.04, 0.45),
    # Ausschnitt ganz nach rechts: Dort stehen alle mit dem Ruecken zur Kamera.
    # Weiter links sind Gesichter im Halbprofil zu sehen.
    '20260922-Sportabzeichen-Aufwaermen.JPG': (
        'sportabzeichen-aufwaermen.jpg', (0.95, 0.50), 0.02, 0.99, 1.06, 0.08, 1.08, 1.05, 0.45),
    # Sonniger Tag mit tiefen Schatten unter den Baeumen: Tiefen oeffnen, dann
    # nur massvoll anziehen. Ausschnitt leicht nach links, damit die ganze
    # Gruppe samt Brueckenanfang im Hochformat bleibt.
    '19e7a73d2e2.jpg': (
        'freitagsradler.jpg', (0.46, 0.55), 0.02, 0.99, 1.06, 0.10, 1.06, 1.06, 0.45),
    # Abendsonne, goldenes Licht: nur massvoll anziehen, sonst kippt die Stimmung.
    '19e55eceb65.jpg': (
        'freitagsradler-umland.jpg', (0.55, 0.55), 0.03, 0.98, 1.02, 0.05, 1.08, 1.06, 0.45),
    # Gegenlicht direkt in die Sonne: Tiefen oeffnen, damit die Raeder nicht
    # zu blossen Silhouetten werden, Lichter unangetastet lassen.
    '19e55eced99.jpg': (
        'freitagsradler-abendlicht.jpg', (0.40, 0.55), 0.01, 1.00, 1.04, 0.09, 1.08, 1.08, 0.45),
    # Wintersonne hinter dem Schloss, tiefe Schatten im Vordergrund.
    '19c61787d53.jpg': (
        'freitagsradler-schloss.jpg', (0.62, 0.50), 0.02, 0.99, 1.10, 0.12, 1.08, 1.06, 0.45),
    # Sonniger Tag, leicht flau: Tiefen oeffnen, dann massvoll anziehen.
    # Ausschnitt bewusst nach rechts: Am linken Bildrand stand ein Kind der
    # gegnerischen Mannschaft im Profil, mit klar erkennbarem Gesicht. So
    # faellt es aus dem Bild – und der Mannschaftskreis steht vollstaendig drin.
    '22.06.19_Fussball_U7_Turnier_23-2048x1365.jpg': (
        'fussball-u7.jpg', (0.58, 0.58), 0.03, 0.98, 1.04, 0.06, 1.10, 1.08, 0.45),
    # Halle, Kunstlicht ueber blauem Belag.
    # Der Dateiname der Vorlage nennt einen Vornamen; die Datei auf der Website
    # heisst bewusst neutral.
    '23-02-12-Elise-LM-Huerdenstart-2048x1536.jpg': (
        'leichtathletik-huerden.jpg', (0.33, 0.55), 0.02, 0.99, 1.04, 0.06, 1.08, 1.06, 0.45),
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
