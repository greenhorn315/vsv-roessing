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
├── data/          Inhalte – hier wird gepflegt (Beiträge, Sportarten, News …)
├── styles/        global.css: Design-Tokens, Reset, Buttons, Layout-Primitives
├── components/    Wiederverwendbare Bausteine, CSS jeweils scoped im <style>
├── layouts/       BaseLayout: <head>, SEO, Schema.org, Header/Footer
└── pages/         Eine Datei = eine URL
    └── sportangebote/[slug].astro  erzeugt je Sparte eine Detailseite
public/
├── images/        Fotos (siehe images/README.md)
└── favicon.svg
```

### Inhalte pflegen

Fast alles steckt in `src/data/` und braucht keine HTML-Kenntnisse:

| Datei | Inhalt |
|---|---|
| `site.ts` | Vereinsname, Adresse, E-Mail, Social, Navigation, Kennzahlen |
| `sports.ts` | Die acht Sparten inkl. Altersgruppen für den Filter |
| `membership.ts` | Beitragstabelle, Rechenwerte des Familienrechners, Beitrittsschritte |
| `news.ts` | Meldungen (neueste zuerst) |
| `trainings.ts` | Trainingszeiten |
| `testimonials.ts` | Zitate von Mitgliedern |

## Design-System

Alle Farben, Schriftgrößen und Abstände sind Tokens in `src/styles/global.css`.

* **Primär** Tannengrün `#14453D` · **Akzent** Korall `#FF6B4A` (dekorativ)
  · **Akzent für Text/Buttons** `#C9401F` · **Sonne** `#FFC857`
* **Schriften** Fraunces (Headlines) + Source Sans 3 (Fließtext), fluid skaliert
* Schriften werden **lokal** ausgeliefert (`@fontsource-variable`) – keine
  Verbindung zu Google Fonts, damit DSGVO-konform.
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
`/sportangebote/<sparte>` gibt – als flache Dateien würden Datei und
Verzeichnis kollidieren. Verzeichnis-Indizes liefern Cloudflare und die
Synology Web Station gleichermaßen aus.

## Offene Punkte vor dem Livegang

- [ ] Fotos in `public/images/` einsetzen (Platzhalter greifen bis dahin automatisch)
- [ ] Beiträge in `src/data/membership.ts` gegen die Beitragsordnung prüfen
- [ ] Vorstandsnamen und Vereinschronik in `src/pages/verein.astro`
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
- [ ] PDF-Formulare hinterlegen
- [ ] `site` in `astro.config.mjs` auf die finale Domain setzen
- [ ] Sparten-Detailtexte in `src/data/sports.ts` fachlich prüfen
      (Trainingszeiten, Ansprechpartner je Sparte)
