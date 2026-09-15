"""Die offenen Punkte zum Website-Relaunch als PDF setzen.\n\nAufruf: python3 checkliste.py [zieldatei.pdf]   (benoetigt reportlab)\n"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, KeepTogether)

import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else 'VSV-Roessing-Offene-Punkte.pdf'
STAND = '15. September 2026'
GRUEN = colors.HexColor('#14453D')
HELL  = colors.HexColor('#2F7A64')
GRAU  = colors.HexColor('#4B5D56')
LINIE = colors.HexColor('#DCE6E1')
SAND  = colors.HexColor('#FFF6E5')

ss = getSampleStyleSheet()
S = {
 'titel':   ParagraphStyle('titel', parent=ss['Title'], fontName='Helvetica-Bold',
                           fontSize=19, leading=23, textColor=GRUEN, alignment=TA_LEFT,
                           spaceAfter=2),
 'unter':   ParagraphStyle('unter', parent=ss['Normal'], fontSize=10, leading=14,
                           textColor=GRAU, spaceAfter=11),
 'kapitel': ParagraphStyle('kapitel', parent=ss['Heading2'], fontName='Helvetica-Bold',
                           fontSize=12.5, leading=16, textColor=GRUEN,
                           spaceBefore=10, spaceAfter=1),
 'kaphint': ParagraphStyle('kaphint', parent=ss['Normal'], fontSize=8.7, leading=11.6,
                           textColor=GRAU, spaceAfter=5),
 'punkt':   ParagraphStyle('punkt', parent=ss['Normal'], fontName='Helvetica-Bold',
                           fontSize=10, leading=13.5, textColor=colors.HexColor('#1C2A24')),
 'detail':  ParagraphStyle('detail', parent=ss['Normal'], fontSize=8.9, leading=11.8,
                           textColor=GRAU, spaceBefore=1.5),
 'notiz':   ParagraphStyle('notiz', parent=ss['Normal'], fontSize=8.9, leading=12.4,
                           textColor=colors.HexColor('#5E4A0C')),
}

def kasten(inhalt):
    t = Table([[Paragraph(inhalt, S['notiz'])]], colWidths=[165*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), SAND),
        ('LINEBEFORE',(0,0),(0,-1), 2.2, colors.HexColor('#FFC857')),
        ('LEFTPADDING',(0,0),(-1,-1), 8), ('RIGHTPADDING',(0,0),(-1,-1), 8),
        ('TOPPADDING',(0,0),(-1,-1), 7), ('BOTTOMPADDING',(0,0),(-1,-1), 7),
    ]))
    return t

def kaestchen():
    """Leeres Quadrat zum Abhaken."""
    k = Table([['']], colWidths=[3.8*mm], rowHeights=[3.8*mm])
    k.setStyle(TableStyle([
        ('BOX',(0,0),(-1,-1), 0.8, HELL),
        ('LEFTPADDING',(0,0),(-1,-1), 0), ('RIGHTPADDING',(0,0),(-1,-1), 0),
        ('TOPPADDING',(0,0),(-1,-1), 0), ('BOTTOMPADDING',(0,0),(-1,-1), 0),
    ]))
    return k

def punkt(titel, detail=None):
    """Eine Zeile mit Ankreuzkästchen."""
    rechts = [Paragraph(titel, S['punkt'])]
    if detail:
        rechts.append(Paragraph(detail, S['detail']))
    t = Table([[kaestchen(), rechts]], colWidths=[9*mm, 156*mm])
    t.setStyle(TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('LEFTPADDING',(0,0),(-1,-1), 0), ('RIGHTPADDING',(0,0),(-1,-1), 0),
        ('TOPPADDING',(0,0),(0,0), 4.2),
        ('TOPPADDING',(1,0),(1,0), 3.2), ('BOTTOMPADDING',(0,0),(-1,-1), 3.8),
        ('LINEBELOW',(0,0),(-1,-1), 0.5, LINIE),
    ]))
    return t

def ohne_verwaiste_ueberschriften(story):
    """Eine Kapitelüberschrift darf nicht allein am Seitenfuß stehen bleiben.

    Überschrift, erklärender Absatz und der erste Punkt gehen deshalb als ein
    Block in den Umbruch. Das geschieht hier am fertigen Ablauf statt an jeder
    Aufrufstelle – so bleibt der Inhalt weiter als schlichte Liste lesbar.
    """
    raus, i = [], 0
    while i < len(story):
        f = story[i]
        if isinstance(f, Paragraph) and f.style.name == 'kapitel':
            block, j = [f], i + 1
            # erklärender Absatz, falls vorhanden
            while j < len(story) and isinstance(story[j], Paragraph) \
                    and story[j].style.name == 'kaphint':
                block.append(story[j]); j += 1
            # der erste Punkt
            if j < len(story) and isinstance(story[j], Table):
                block.append(story[j]); j += 1
            raus.append(KeepTogether(block))
            i = j
        else:
            raus.append(f); i += 1
    return raus


class Doc(BaseDocTemplate):
    def afterFlowable(self, flowable):
        pass

def rahmen(canvas, doc):
    canvas.saveState()
    b, h = A4
    # Kopfbalken
    canvas.setFillColor(GRUEN)
    canvas.rect(0, h-14*mm, b, 14*mm, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont('Helvetica-Bold', 9.5)
    canvas.drawString(20*mm, h-9.3*mm, 'VSV Rössing von 1897 e.V.')
    canvas.setFont('Helvetica', 9.5)
    canvas.drawRightString(b-20*mm, h-9.3*mm, 'Website-Relaunch – offene Punkte')
    # Fußzeile
    canvas.setFillColor(GRAU); canvas.setFont('Helvetica', 7.8)
    canvas.drawString(20*mm, 11*mm, f'Stand: {STAND}')
    canvas.drawCentredString(b/2, 11*mm, 'github.com/greenhorn315/vsv-roessing')
    canvas.drawRightString(b-20*mm, 11*mm, f'Seite {doc.page}')
    canvas.setStrokeColor(LINIE); canvas.setLineWidth(0.5)
    canvas.line(20*mm, 15*mm, b-20*mm, 15*mm)
    canvas.restoreState()

doc = Doc(OUT, pagesize=A4, leftMargin=20*mm, rightMargin=20*mm,
          topMargin=22*mm, bottomMargin=20*mm,
          title='VSV Rössing – Offene Punkte Website-Relaunch',
          author='VSV Rössing von 1897 e.V.')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
doc.addPageTemplates([PageTemplate(id='std', frames=[frame], onPage=rahmen)])

story = []
story.append(Paragraph('Offene Punkte zum Website-Relaunch', S['titel']))
story.append(Paragraph(
    'Was noch geklärt werden muss, bevor die neue Seite öffentlich gehen kann. '
    'Die drei Punkte im ersten Abschnitt sind die, für die Antworten aus dem Verein nötig sind.',
    S['unter']))

story.append(kasten(
    '<b>Für das Gespräch am Freitag.</b> Zu diesen vier Punkten kommt die Website ohne '
    'Antworten aus dem Verein nicht weiter. Alles andere lässt sich unabhängig davon erledigen.'))
story.append(Spacer(1, 8))

story = []
story.append(Paragraph('Offene Punkte zum Website-Relaunch', S['titel']))
story.append(Paragraph(
    'Was noch zu klären ist, bevor die neue Seite öffentlich gehen kann. '
    'Fortgeschrieben zum ' + STAND + '; erledigte Punkte stehen am Schluss.',
    S['unter']))

story.append(kasten(
    '<b>Antworten aus dem Verein nötig.</b> Die Abschnitte 1 bis 5 kommen ohne Auskunft '
    'aus dem Verein nicht weiter. Die Abschnitte 6 bis 9 lassen sich unabhängig davon '
    'abarbeiten, müssen aber vor dem Livegang erledigt sein.'))
story.append(Spacer(1, 8))

# ---------- 1 ----------
story.append(Paragraph('1 · Spartenstruktur', S['kapitel']))
story.append(Paragraph(
    'Jede Sparte soll auf ihrer Seite die Sportarten zeigen, die zu ihr gehören – jeweils '
    'mit Piktogramm. Für Outdoor ist das umgesetzt und dient als Muster: Wandern, '
    'Nordic Walking, Radwandern, Boßeln. Bei den übrigen acht Sparten fehlt die Zuordnung.',
    S['kaphint']))
for t, d in [
  ('Welche Sportarten gehören zu welcher Sparte?',
   'Offen für: Fußball, Volleyball, Leichtathletik, Turnen, Basketball, Tanzen, Yoga, Dart.'),
  ('Gibt es Sportarten, die zu keiner der neun Sparten passen?',
   'Dann käme entweder eine Sparte dazu oder die Sportart zu einer bestehenden.'),
  ('Stimmen die neun Sparten so?',
   'Fußball · Volleyball · Leichtathletik · Turnen · Basketball · Tanzen · Outdoor · Yoga · Dart'),
  ('Ansprechpartner je Sparte',
   'Bisher nur Outdoor (Michael Horn). Die übrigen acht fallen auf die Vorstandsadresse '
   'zurück. Name und Kontaktweg je Sparte wären besser.'),
]:
    story.append(punkt(t, d))

# ---------- 2 ----------
story.append(Paragraph('2 · Yoga', S['kapitel']))
story.append(Paragraph(
    'Die Übungsleitung steht seit dem 15. September: Sandra Dettmer, Heike Husmann und '
    'Christoph Nowothnig. Trainingszeit ist Freitag 18:30–19:30 in der Sporthalle. '
    'Die Seite weist die verbliebenen Lücken sichtbar aus.', S['kaphint']))
for t, d in [
  ('Spartenleitung', 'Noch nicht benannt – deshalb läuft der Kontakt über den Vorstand.'),
  ('Altersgruppe bestätigen',
   'Auf der Seite steht „Erwachsene“. Das ist eine Annahme. Offen für Frauen und Männer '
   'ist vermerkt, ebenso dass zurzeit nur Frauen teilnehmen.'),
  ('Was mitbringen?', 'Matte, bequeme Kleidung, Decke? Steht bisher nirgends.'),
  ('Kurzbeschreibung', 'Zwei, drei Sätze: Was erwartet Neugierige?'),
]:
    story.append(punkt(t, d))

# ---------- 3 ----------
story.append(Paragraph('3 · Formulare', S['kapitel']))
story.append(Paragraph(
    'Die Beiträge sind geklärt und vom Kassenwart bestätigt: 4 € für Kinder und '
    'Jugendliche, 7,50 € einzeln, 15 € für Familien mit minderjährigen Kindern. '
    'Alle vier Formulare stehen als PDF auf der Seite. Offen ist nur noch eine '
    'Stelle in den Formularen selbst.', S['kaphint']))
for t, d in [
  ('Die Eintrittserklärung kennt nur sechs Sportarten',
   'Zum Ankreuzen stehen dort Dart, Fußball, Leichtathletik, Turnen, Volleyball und '
   'Wandern. Auf der Website sind es neun – Basketball, Tanzen und Yoga fehlen, und '
   '„Wandern“ heißt inzwischen „Outdoor“.'),
  ('Gibt es eine Aufnahmegebühr?',
   'In keinem der Formulare erwähnt. Wenn es keine gibt, gehört das auf die Seite – '
   'das ist ein Argument.'),
]:
    story.append(punkt(t, d))

# ---------- 4 ----------
story.append(Paragraph('4 · Fußball – Mannschaften und Spielpläne', S['kapitel']))
story.append(Paragraph(
    'Der Spielplan der Ü40 steht auf der Fußball-Seite; gespielte Partien fallen von '
    'selbst heraus. Für Dart sind alle drei Teams erfasst. Ob weitere Mannschaften einen '
    'Spielplan haben, ist offen.', S['kaphint']))
for t, d in [
  ('Welche Mannschaften stellt der Fußball?',
   'Erfasst sind I. Herren, Ü32, Ü40 und vier Jugendgruppen. Die Damenmannschaft ist '
   'entfallen und wurde entfernt.'),
  ('Gibt es weitere Spielpläne?',
   'Als Aushang oder Foto genügt. Die Struktur nimmt sie ohne Änderung auf.'),
  ('Spielt die Ü32 im Wettbewerb?',
   'Sie steht ohne Spielplan und ohne Übungsleitung in den Daten.'),
]:
    story.append(punkt(t, d))

# ---------- 5 ----------
story.append(Paragraph('5 · Trainingszeiten', S['kapitel']))
story.append(Paragraph(
    'In den Daten stehen 35 Gruppen mit 25 Übungsleitungen. Hallenzeiten und Trainingsorte '
    'stammen aus dem Hallenplan Winter 2025/26, alles Übrige aus der Übungsleiterliste von '
    '2022 und ist nicht bestätigt. Verteilung: Turnen 10 · Leichtathletik 9 · Fußball 6 · '
    'Tanzen 6 · Volleyball 1 · Basketball 1 · Yoga 1 · Dart 1.', S['kaphint']))
for t, d in [
  ('Stimmen die 35 Gruppen noch?',
   'Der Abgleich mit der Liste von 2022 ist der größte verbliebene Unsicherheitsfaktor.'),
  ('Eine Gruppe ohne Übungsleitung: Fußball „Ü32“',
   'Unklar, ob die Stelle offen ist oder nur der Name in der Liste fehlt.'),
  ('Zwei Gruppen ohne Zielgruppe: „Montagsturner“ und „Basketball“',
   'Für wen sind die Angebote – Kinder, Jugend, Erwachsene, Frauen, Männer?'),
  ('Zwei Trainingsorte fehlen: „Volleyball mixed“ und „Kinderturnen ab 9“',
   'Bewusst nicht erfunden. Siehe auch die Widersprüche unten.'),
  ('Zwei Zeiten stehen als „nach Absprache“',
   'Freitagsradler und Leichtathletik „Lauf- und Sprungtraining“.'),
  ('Outdoor hat keine Trainingszeiten',
   'Die Sparte ist in Gründung. Zeiten und Turnus werden auf der Versammlung am '
   'Samstag, 10. Oktober 2026 um 15:00 Uhr festgelegt. Ein Ort für die Versammlung fehlt noch.'),
  ('Einwilligung der Übungsleitungen zur Namensnennung',
   '25 Namen stehen auf der Seite. Vor dem Livegang einholen.'),
]:
    story.append(punkt(t, d))

story.append(Paragraph('Widersprüche zwischen Hallenplan und Liste von 2022', S['kapitel']))
story.append(Paragraph(
    'Sechs Stellen, an denen die Quellen nicht zusammenpassen. Nichts davon wurde '
    'geändert – die Belege sind zu dünn.', S['kaphint']))
for t, d in [
  ('Volleyball ist verschwunden',
   'Die Liste nennt „Volleyball mixed“ montags 20:00 in der Halle. Im Hallenplan steht '
   'dort Fußball Herren. Gibt es die Gruppe noch?'),
  ('Kinderturnen ab 9 hat die Halle verloren',
   'Der Slot Donnerstag 18:00–19:00 gehört im Plan der Freiwilligen Feuerwehr.'),
  ('Wurfgruppe fehlt im Plan',
   'Die Liste nennt sie donnerstags 18:00. Montags steht „LA Hoch/Wurf“ – vermutlich '
   'mit dem Hochsprung zusammengelegt.'),
  ('Krafttraining an drei verschiedenen Tagen',
   'Liste: Samstag 12:00–14:00. Hallenplan: Freitag 15:30–17:00 und Sonntag 10:30–12:30. '
   'Sonntag kennen unsere Daten bisher gar nicht.'),
  ('Montagsturner stehen im Plan als „Herren“',
   'Montag 15:30–17:00. Das ist eine der Gruppen mit offener Zielgruppe – der Hallenplan '
   'legt eine Männergruppe nahe. Bestätigen, dann ist ein Punkt weg.'),
  ('Der Donnerstag 20:00 der früheren Damenmannschaft',
   'Die Fußball-Damen gibt es nicht mehr. Ist die Hallenzeit inzwischen anders belegt '
   'oder frei geworden?'),
]:
    story.append(punkt(t, d))

# ---------- 6 ----------
story.append(Paragraph('6 · Fotos und Einwilligungen', S['kapitel']))
story.append(Paragraph(
    'Im Karussell auf der Startseite laufen zwölf Bilder, die Übersicht der Sportstätten '
    'zeigt fünf Orte. Alle Bilder sind ausdrücklich Platzhalter, bis eigenes Material da ist.',
    S['kaphint']))
for t, d in [
  ('Einwilligung für die Personen auf den Bildern',
   'Recht am eigenen Bild, KUG/DSGVO. Bei Kindern und Jugendlichen schriftlich von den '
   'Erziehungsberechtigten. Betroffen sind mehrere Karussellbilder und das Foto vom '
   'Feuerplatz. Sinnvoll gemeinsam mit der Namensfreigabe abfragen: Name ja/nein, '
   'Foto ja/nein.'),
  ('Zwei Karussellbilder sind zu klein',
   'Die beiden Leichtathletik-Aufnahmen liegen nur als 300-px-Vorschaubilder der alten '
   'Website vor. Das Original liegt bei WordPress im selben Verzeichnis unter demselben '
   'Namen ohne den Zusatz „-300x200“.'),
  ('Vereinsheim ohne Betrieb fotografieren',
   'Die vorhandene Aufnahme zeigt rund fünfzehn Personen davor. Verwendet wird derzeit '
   'nur der Streifen oberhalb der Köpfe mit Dach und Willkommensbanner.'),
  ('Vier quadratische Bilder für den Social-Bereich',
   'Mindestens 400 × 400 px. Bis dahin zeigt die Seite gestaltete Platzhalter.'),
  ('Vorschaubild fürs Teilen',
   'public/og-default.png, 1200 × 630 px – erscheint in WhatsApp und Facebook.'),
  ('Ein eigenes Dart-Foto aus dem Dorfbrunnen',
   'Das jetzige ist ein Symbolbild von Wikimedia Commons.'),
]:
    story.append(punkt(t, d))

# ---------- 7 ----------
story.append(Paragraph('7 · Inhalte und Material', S['kapitel']))
story.append(Paragraph('Nicht dringend, aber nötig vor dem Livegang.', S['kaphint']))
for t, d in [
  ('Von Sportarten sprechen, nicht von Sparten',
   'Die Sparte ist die vereinsinterne Gliederung und für jemanden, der eine Sportart '
   'sucht, ohne Belang. Betroffen sind rund 40 Stellen, darunter „Alle Sparten im '
   'Überblick“ und „Nach Sparte“ auf der Angebotsseite sowie die Kennzahl „Sparten“. '
   'Im Organigramm darf „Spartenleitung“ bleiben – dort ist die Struktur das Thema.'),
  ('Vorstand', 'Namen und Ämter für die Vereinsseite.'),
  ('Vereinschronik', 'Der Geschichtsabschnitt ist bisher ein Platzhaltertext.'),
  ('Sparten-Detailtexte fachlich prüfen',
   'Die Beschreibungen in src/data/sports.ts sind aus dem Altbestand gebaut.'),
  ('Social-Media-Adressen', 'Die echten Links zu Instagram und Facebook, ggf. WhatsApp-Gruppe.'),
]:
    story.append(punkt(t, d))

# ---------- 8 ----------
story.append(Paragraph('8 · Technik und Recht', S['kapitel']))
story.append(Paragraph('Erledigt die Technik, nicht der Verein – bis auf die Prüfung.',
                       S['kaphint']))
for t, d in [
  ('Datenschutzerklärung prüfen lassen',
   'Neu verfasst, beschreibt die tatsächliche Verarbeitung dieser Seite. Sollte jemand '
   'mit juristischem Blick ansehen.'),
  ('Hosting-Angaben ergänzen',
   'Beim Umzug in die Originalumgebung: Anbieter, Speicherdauer der Logfiles, '
   'Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Abschnitt 4 ist bewusst '
   'anbieterneutral formuliert.'),
  ('Kontaktformular anbinden',
   'Öffnet derzeit das E-Mail-Programm mit fertiger Nachricht. Bei echtem Versand muss '
   'Abschnitt 8 der Datenschutzerklärung neu geschrieben werden, denn dann gehen die '
   'Eingaben tatsächlich an einen Server.'),
  ('Domain eintragen', 'In astro.config.mjs auf die endgültige Adresse setzen.'),
  ('Prototyp-Kennzeichnung entfernen',
   'Ein Schalter in src/data/site.ts nimmt Banner und Suchmaschinen-Sperre gemeinsam weg.'),
]:
    story.append(punkt(t, d))

# ---------- 9 ----------
story.append(Paragraph('9 · Für die bestehende Seite vsv-roessing.de', S['kapitel']))
story.append(Paragraph(
    'Beim Übernehmen der Rechtstexte gefunden. Betrifft nicht die neue Seite, sondern die alte.',
    S['kaphint']))
for t, d in [
  ('Veraltete Gesetzesverweise im Impressum',
   '§ 5 TMG → § 5 DDG · § 55 Abs. 2 RStV → § 18 Abs. 2 MStV · §§ 8 bis 10 TMG → '
   'Art. 4 bis 6 DSA. Auf der neuen Seite bereits korrigiert.'),
  ('„LSB“ im Haftungsausschluss',
   'Rest aus einer Mustervorlage: „Für fremde Hinweise ist der LSB nur dann '
   'verantwortlich…“. Steht im Impressum und in der Datenschutzerklärung.'),
]:
    story.append(punkt(t, d))

story.append(Spacer(1, 12))
story.append(kasten(
    '<b>Seit dem 11. September erledigt:</b> Trainingszeiten aus dem Hallenplan 2025/26 '
    'eingearbeitet · Freitagsturner und Freitagsradler als eine Gruppe abgebildet · '
    'Ansprechpartner der Outdoor-Sparte · Damenmannschaft entfernt · Übungsleitung Yoga '
    'eingetragen, Angebot als offen für Frauen und Männer ausgewiesen · Spielplan der Ü40 '
    'und Ligaspiele der drei Dart-Teams · Fotos der fünf Sportstätten, Vereinsheim '
    'eingeschlossen · Karussell auf der Startseite · Kasten „Für die zweite '
    'Lebenshälfte“ · Mitgliedsbeiträge nach den Vereinsformularen, Familienrechner '
    'entsprechend · vier Formulare als PDF im Downloadbereich.'))

doc.build(ohne_verwaiste_ueberschriften(story))
print('PDF erzeugt:', OUT)
