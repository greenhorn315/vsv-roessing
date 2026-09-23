# VSV Rössing von 1897 e.V. – Website

Relaunch der Vereinswebsite als statische Astro-Seite, ausgeliefert über Cloudflare.

## Schnellstart

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # Typprüfung + Produktions-Build nach dist/
npm run preview  # Build lokal testen
```

## Projektstruktur

```
src/
├── content/       Content Collections: vom Verein gepflegt, schemageprüft
├── content.config.ts   Schema je Collection
├── data/          Inhalte – hier wird gepflegt (Beiträge, Sportarten, News …)
├── styles/        global.css: Tailwind-Einstieg, daisyUI-Thema „vsv“, Basisstile
├── components/    Wiederverwendbare Bausteine (Tailwind-Klassen, teils noch scoped <style>)
├── layouts/       BaseLayout: <head>, SEO, Schema.org, Header/Footer
└── pages/         Eine Datei = eine URL
    └── sportangebote/[slug].astro  erzeugt je Sportart eine Detailseite
public/
├── images/        Fotos (siehe images/README.md)
└── favicon.svg
```

### Inhalte pflegen

Fast alles steckt in `src/data/` und braucht keine HTML-Kenntnisse:

| Datei | Inhalt |
|---|---|
| `site.ts` | Vereinsname, Adresse, E-Mail, Social, Navigation, Kennzahlen |
| `sports.ts` | Die neun Sportarten inkl. Altersgruppen für den Filter |
| `membership.ts` | Beitragstabelle, Rechenwerte des Familienrechners, Beitrittsschritte |
| `news.ts` | Meldungen (neueste zuerst) |
| `trainings.ts` | Trainingszeiten |
| `testimonials.ts` | Zitate von Mitgliedern |

### Content Collections

Was der Verein selbst pflegt und was keine Logik mitbringt, liegt als Astro
Content Collection unter `src/content/` – in YAML statt TypeScript, also ohne
Programmierkenntnisse zu bearbeiten.

| Datei | Inhalt |
|---|---|
| `vorstand.yaml` | Ämter und Namen des Vorstands, in der Reihenfolge `order` |

Der Unterschied zu `src/data/`: Dort steht, was die Seite selbst ausmacht und
oft Logik mitträgt – abgeleitete Zahlen, Verweise zwischen Dateien. Das bleibt
in TypeScript.

Das Schema in `src/content.config.ts` wird **beim Bauen geprüft**. Eine fehlende
Pflichtangabe, ein leerer Wert oder ein verschriebener Schlüssel bricht den Build
ab und nennt den betroffenen Eintrag – statt still eine leere Stelle auf der
Seite zu erzeugen.

Schreibt jemand versehentlich `nmae:` statt `name:`, sieht das so aus:

```
[InvalidContentEntryDataError] vorstand → kassenwart data does not match collection schema.
  ****: Unrecognized key: "nmae"
```

Dass auch dieser Fall auffällt, liegt an `.strict()` im Schema: Ohne das
ignoriert Zod jeden Schlüssel, den es nicht kennt, und der Name wäre still
verschwunden.

Die generierten Typen liegen unter `.astro/` und gehören nicht ins Repository;
`astro check` und `astro build` erzeugen sie selbst.

## Design-System

Gestaltet wird mit **Tailwind CSS 4** und **daisyUI 5**. Alles, was das
Aussehen bestimmt, steht an einer Stelle: `src/styles/global.css`.

* **Thema** `vsv` (daisyUI, nur hell): **Primär** Tannengrün `#14453D`
  (`primary`) · **Sekundär** helleres Grün `#2F7A64` (`secondary`) ·
  **Akzent** Korall für Text und Buttons `#C9401F` (`accent`) · **Sonne**
  `#FFC857` (`warning`) · Seitenhintergrund `#F5F8F6` (`base-200`), Flächen
  weiß (`base-100`), Text `#1C2A24` (`base-content`).
* **Zusatzfarben** im `@theme`-Block, z. B. `coral` (das helle Korall
  `#FF6B4A`, nur dekorativ – mit weißer Schrift zu kontrastarm), `muted`
  für gedämpften Text, `tint-green`, `sun-soft`, `border`, `border-strong`.
* **Schriften** Fraunces für Überschriften (`font-display`) und Source Sans 3
  für Fließtext (`font-sans`, Standard). Sie werden **lokal** ausgeliefert
  (`@fontsource-variable`) – keine Verbindung zu Google Fonts, damit
  DSGVO-konform.
* **Schriftgrößen** fluid von `text-step--1` bis `text-step-4`; Überschriften
  h1–h4 bekommen sie automatisch.
* **Abstände** nach Tailwinds 4px-Raster (`p-4` = 1rem), dazu `py-section`
  für den Abstand zwischen Abschnitten und `max-w-site` (1180px) für die
  Inhaltsbreite.
* **Bausteine** kommen aus daisyUI statt aus eigenem CSS: `btn` (Varianten
  `btn-accent`, `btn-outline`, `btn-on-dark`, `btn-link`), außerdem `card`,
  `badge`, `alert`, `table`, `breadcrumbs`, `steps`, `stats`, Formularfelder
  (`input`, `select`, `textarea`, `fieldset`) und `menu`/`navbar`.
* **Neue Gestaltung** möglichst mit vorhandenen Utilities und
  daisyUI-Klassen direkt im Markup. Fehlt ein Wert, gehört er als Variable
  in den `@theme`-Block (Farbe `--color-…`, Abstand `--spacing-…`, Radius
  `--radius-…`) – dann gibt es die passende Klasse automatisch. Eigene
  Klassen nur über `@utility` in `global.css`.
* Die alten Variablen (`--c-*`, `--sp-*`, `--step-*` …) und Hilfsklassen
  (`.container`, `.section`, `.eyebrow` …) gibt es noch, bis alle Komponenten
  umgestellt sind; siehe `docs/tailwind-migration.md`.
* Zielniveau Barrierefreiheit: WCAG 2.1 AA (Kontraste, Tastaturbedienung,
  sichtbarer Fokus, `prefers-reduced-motion`).
* Das Vorschaubild `public/og-default.png` (1200 × 630) wird beim Teilen in
  WhatsApp, Facebook & Co. angezeigt.

## Deployment (Cloudflare)

Statischer Build, kein Server nötig.

* **Pages/Workers via Git:** Build-Befehl `npm run build`, Output-Verzeichnis `dist`.
* **Manuell:** `npm run deploy` (nutzt `wrangler.jsonc`).

Der Build nutzt `format: 'directory'` (`kontakt/index.html`). Das ist nötig,
weil es sowohl die Übersicht `/sportangebote` als auch die Detailseiten
`/sportangebote/<sportart>` gibt – als flache Dateien würden Datei und
Verzeichnis kollidieren. Verzeichnis-Indizes liefern Cloudflare und die
Synology Web Station gleichermaßen aus.

## Offene Punkte vor dem Livegang

Dieselbe Liste gibt es als PDF zum Ausdrucken und Abhaken:
`python3 tools/checkliste.py [zieldatei.pdf]` (benötigt `reportlab`).
Inhalt und Nummerierung stimmen mit diesem Abschnitt überein; das Datum im
Fußbereich steht als `STAND` oben im Skript.

- [ ] Vier quadratische Bilder für den Social-Bereich und `public/og-default.png`
      einsetzen (Platzhalter greifen bis dahin automatisch)
- [ ] Einwilligung der abgebildeten Personen einholen – betrifft mehrere
      Bilder im Karussell und das Foto vom Feuerplatz
- [ ] Einwilligung auch beim **MTV Elze** einholen: Auf dem Aufwärmbild vom
      Sportabzeichen-Tag sind dessen Mitglieder zu sehen. Erkennbare Gesichter
      zeigt das Bild keine, alle stehen mit dem Rücken zur Kamera
- [x] Vereinsheim mit eigenen Aufnahmen ohne Betrieb: Eingang als Hauptbild,
      Gaststube als zweite Ansicht, beide im üblichen 4:3. Der Behelfsstreifen
      oberhalb der Köpfe und das Sonderfeld `ratio` sind entfallen
- [x] Weitsprunganlage als zweite Ansicht des Sportplatzes – der Rasenplatz
      allein zeigte nicht, dass dort auch Leichtathletik stattfindet
- [x] Die beiden unscharfen 300-px-Karussellbilder sind ersetzt: zwei
      Aufnahmen vom Sportabzeichen-Tag am 22. September, volle Auflösung,
      dasselbe Motiv
- [ ] Aufenthaltsraum im Vereinsheim noch einmal fotografieren: Auf der
      vorhandenen Aufnahme stehen Stühle gestapelt und ein Grill mitten im
      Raum. Aufgeräumt wäre das eine dritte Ansicht wert
- [x] Beiträge in `src/data/membership.ts` gegen die Vereinsformulare
      abgeglichen und vom Kassenwart bestätigt: 4 € für Kinder und
      Jugendliche, 7,50 € einzeln, 15 € für Familien mit minderjährigen
      Kindern; Einzug jährlich am 1. Juni, Kündigung zum Quartalsende
- [x] Vorstand vollständig in `src/data/vorstand.ts`: 1. Vorsitzender Erich
      Könneke, 2. Vorsitzender Uwe Speer, Kassenwart Thomas Kuse,
      Schriftführerin Monika Koch
- [ ] Vereinschronik: Der Geschichtsabschnitt in `src/pages/verein.astro` ist
      weiter ein Platzhaltertext
- [x] Impressum aus der Altseite übernommen (`src/data/impressum.ts`)
- [x] Datenschutzerklärung neu verfasst (`src/data/datenschutz.ts`): beschreibt
      die Verarbeitung dieser Seite statt der bisherigen WordPress-Funktionen.
      Der übernommene Originaltext liegt als Referenz in
      `src/data/datenschutz-uebernommen.ts` und wird nicht ausgeliefert.
- [ ] **Datenschutzerklärung rechtlich prüfen lassen** und Abschnitt 4 um den
      Hosting-Anbieter, die Speicherdauer der Logfiles und den Vertrag zur
      Auftragsverarbeitung nach Art. 28 DSGVO ergänzen. Bewusst
      anbieterneutral formuliert, weil der Umzug in die Originalumgebung
      noch aussteht.
- [x] Gesetzesverweise im Impressum aktualisiert (DDG, MStV, DSA). Die
      Änderungen gehören auch ins Original übernommen.
- [ ] Kontaktformular an einen Versand-Endpunkt anbinden. Aktuell baut das
      Formular nach clientseitiger Prüfung eine fertige `mailto:`-Nachricht.
      Für echten Versand genügt es, im `submit`-Handler in
      `src/pages/kontakt.astro` statt `window.location.href` ein
      `fetch(endpoint, { method: 'POST', body: data })` zu setzen. Achtung:
      Danach muss Abschnitt 8 der Datenschutzerklärung neu geschrieben werden,
      denn dann werden die Eingaben tatsächlich an einen Server übertragen.
- [x] PDF-Formulare unter `public/downloads/` hinterlegt und auf
      `/mitglied-werden#formulare` verlinkt
- [ ] Die Eintrittserklärung nennt nur sechs Sportarten zum Ankreuzen (Dart,
      Fußball, Leichtathletik, Turnen, Volleyball, Wandern). Auf der Website
      stehen neun; Basketball, Tanzen und Yoga fehlen im Formular, und
      „Wandern" heißt inzwischen „Outdoor". Das Formular gehört aktualisiert.
- [x] Wortwahl: Auf der Website ist überall von **Sportarten** die Rede statt
      von „Sparten". Der Titel „Spartenleitung" bleibt, das ist die Bezeichnung
      im Verein
- [ ] `site` in `astro.config.mjs` auf die finale Domain setzen
- [ ] Detailtexte der Sportarten in `src/data/sports.ts` fachlich prüfen
- [ ] Zuordnung klären: welche einzelnen Angebote gehören zu welcher
      Sportart? Befüllt sind Outdoor (Wandern, Nordic Walking, Radwandern,
      Boßeln) und Leichtathletik (Laufen, Springen, Werfen). Es fehlen
      Fußball, Volleyball, Turnen, Basketball, Tanzen, Yoga und Dart.
- [ ] Yoga: Spartenleitung benennen, Altersgruppe bestätigen, Mitbringsel und
      Kurzbeschreibung ergänzen. Übungsleitung und Trainingszeit stehen seit
      dem 15. September; die Altersgruppe „Erwachsene" ist eine Annahme, die
      Seite weist die fehlenden Angaben sichtbar aus.
- [ ] Ansprechpartner je Sportart ergänzen (`contact` in `src/data/sports.ts`).
      Der Titel im Verein ist „Spartenleitung“ und bleibt so stehen. Bisher nur
      Outdoor; die übrigen fallen auf die Vorstandsadresse zurück.

### Trainingszeiten

Die 37 Gruppen in `src/data/trainings.ts` stammen überwiegend aus der
Übungsleiterliste von 2022 und sind nicht bestätigt. Bestätigt sind seit dem
22. September die vier Leichtathletik-Gruppen und zwei Fußballgruppen. Der Hinweis darauf steht als
`trainingsStand` überall dort, wo Zeiten angezeigt werden.

- [ ] Stimmen die 37 Gruppen noch? Verteilung: Turnen 10 · Leichtathletik 9 ·
      Fußball 8 · Tanzen 6 · Basketball 1 · Dart 1 · Volleyball 1 · Yoga 1
- [x] Keine Gruppe mehr ohne Übungsleitung: Die als „Ü32" geführte Gruppe ist
      in Wahrheit die Ü40 und wird von Roman Veselý geleitet
- [ ] Zwei Gruppen ohne Zielgruppe: Turnen „Montagsturner" und „Basketball"
- [ ] Zwei Zeiten stehen als „nach Absprache": Freitagsradler und
      Leichtathletik „Lauf- und Sprungtraining"
- [ ] Zwei Trainingsorte fehlen: „Volleyball mixed" und „Kinderturnen ab 9".
      Bewusst nicht erfunden.
- [ ] Outdoor hat keine Trainingszeiten. Die Sportart ist im Aufbau, Zeiten
      und Turnus werden auf der Versammlung am 10. Oktober 2026 festgelegt.
- [ ] Einwilligung der Übungsleitungen zur Namensnennung einholen, bevor die
      Seite öffentlich wird.
