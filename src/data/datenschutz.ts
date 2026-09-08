import type { LegalBlock } from './legal';

/**
 * Datenschutzerklärung – ENTWURF.
 *
 * Beschreibt die Verarbeitung, die auf dieser Website tatsächlich
 * stattfindet, und ersetzt damit den von der bisherigen WordPress-Seite
 * übernommenen Text (liegt als Referenz in datenschutz-uebernommen.ts).
 *
 * ⚠️ Noch nicht rechtlich geprüft. Vor dem Livegang zu klären:
 *   - Abschnitt 4: Name des Hosting-Anbieters, Speicherdauer der Logfiles
 *     und der Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Bewusst
 *     anbieterneutral formuliert, weil der Umzug in die Originalumgebung
 *     noch aussteht.
 *   - Abschnitt 8 gilt für das Kontaktformular in seinem jetzigen Zustand
 *     (öffnet das E-Mail-Programm). Sobald ein echter Versand-Endpunkt
 *     angebunden ist, muss dieser Abschnitt neu geschrieben werden.
 *   - Eigene E-Mail-Adresse für den Datenschutzbeauftragten erwägen.
 */

export const blocks: LegalBlock[] = [
  {
    "type": "text",
    "text": "Diese Erklärung beschreibt, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden, zu welchem Zweck das geschieht und welche Rechte Ihnen dabei zustehen."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "1. Verantwortlicher"
  },
  {
    "type": "text",
    "text": "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:"
  },
  {
    "type": "lines",
    "lines": [
      "Volkssportvereinigung von 1897 Rössing e.V.",
      "Vertreten durch den 1. Vorsitzenden Erich Könneke",
      "Pfarrstr. 6",
      "31171 Nordstemmen",
      "Deutschland",
      "Telefon: +49 (0) 50 69 / 74 15",
      "E-Mail: vorstand@vsv-roessing.de"
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "2. Datenschutzbeauftragter"
  },
  {
    "type": "text",
    "text": "Der Datenschutzbeauftragte des Verantwortlichen ist:"
  },
  {
    "type": "lines",
    "lines": [
      "Thomas Kuse",
      "Volkssportvereinigung von 1897 Rössing e.V.",
      "Pfarrstr. 6",
      "31171 Nordstemmen",
      "Deutschland",
      "E-Mail: vorstand@vsv-roessing.de"
    ]
  },
  {
    "type": "text",
    "text": "Bei allen Fragen und Anregungen zum Datenschutz können Sie sich jederzeit direkt an unseren Datenschutzbeauftragten wenden."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "3. Grundsätzliches"
  },
  {
    "type": "text",
    "text": "Sie können diese Website nutzen, ohne personenbezogene Daten anzugeben. Es gibt keine Registrierung, keine Benutzerkonten und keine Kommentarfunktion. Personenbezogene Daten verarbeiten wir nur, wenn Sie uns von sich aus kontaktieren, sowie in dem technisch unvermeidbaren Umfang, den der Abruf einer Website mit sich bringt."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "4. Aufruf der Website und Server-Logfiles"
  },
  {
    "type": "text",
    "text": "Beim Aufruf dieser Website übermittelt Ihr Browser automatisch Daten an den Server, auf dem die Website liegt. Diese Übermittlung ist technisch notwendig, damit die Seite überhaupt an Sie ausgeliefert werden kann."
  },
  {
    "type": "text",
    "text": "Dabei werden üblicherweise folgende Daten verarbeitet: Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, der Name und die Größe der abgerufenen Datei, die Meldung über den erfolgreichen Abruf, die zuvor besuchte Seite (Referrer) sowie Browsertyp und Betriebssystem."
  },
  {
    "type": "text",
    "text": "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt darin, die Website technisch bereitzustellen, ihre Stabilität zu sichern und Angriffe abzuwehren. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt, und wir werten sie nicht aus, um Rückschlüsse auf einzelne Personen zu ziehen."
  },
  {
    "type": "text",
    "text": "Die Website wird bei einem Dienstleister gehostet, mit dem ein Vertrag über die Verarbeitung im Auftrag nach Art. 28 DSGVO besteht. Angaben zum Anbieter und zur Speicherdauer der Logfiles ergänzen wir hier."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "5. Verschlüsselte Übertragung"
  },
  {
    "type": "text",
    "text": "Diese Website wird über eine verschlüsselte Verbindung (TLS) ausgeliefert. Sie erkennen das an dem „https://“ in der Adresszeile Ihres Browsers. Die Daten, die Sie an uns übermitteln, können dadurch nicht ohne Weiteres von Dritten mitgelesen werden."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "6. Cookies, Analyse und Tracking"
  },
  {
    "type": "text",
    "text": "Diese Website setzt keine Cookies. Es werden keine Analyse- oder Statistikwerkzeuge eingesetzt, kein Tracking betrieben, keine Werbenetzwerke eingebunden und keine Profile gebildet. Ein Einwilligungsbanner ist deshalb nicht erforderlich."
  },
  {
    "type": "text",
    "text": "Der Familienbeitragsrechner auf der Seite „Mitglied werden“ rechnet ausschließlich in Ihrem Browser. Ihre Eingaben werden weder gespeichert noch an uns übermittelt."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "7. Schriftarten"
  },
  {
    "type": "text",
    "text": "Die verwendeten Schriftarten (Fraunces und Source Sans 3) werden zusammen mit der Website ausgeliefert. Es besteht keine Verbindung zu Google Fonts oder einem anderen externen Schriftendienst, es werden dafür also keine Daten an Dritte übertragen."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "8. Kontaktaufnahme"
  },
  {
    "type": "text",
    "text": "Wenn Sie uns per E-Mail schreiben, verarbeiten wir Ihre Angaben ausschließlich, um Ihre Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um die Anbahnung oder Durchführung einer Mitgliedschaft geht, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der Beantwortung von Anfragen."
  },
  {
    "type": "text",
    "text": "Das Kontaktformular auf dieser Website überträgt Ihre Eingaben nicht an einen Server. Es öffnet Ihr eigenes E-Mail-Programm mit einer vorbereiteten Nachricht, die Sie selbst absenden. Wir erhalten Ihre Angaben also erst, wenn Sie diese E-Mail tatsächlich verschicken."
  },
  {
    "type": "text",
    "text": "Wir bewahren Anfragen so lange auf, wie es zur Bearbeitung erforderlich ist, und löschen sie anschließend, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "9. Links zu anderen Websites"
  },
  {
    "type": "text",
    "text": "Diese Website verlinkt auf externe Angebote, unter anderem auf unsere Profile bei Instagram und Facebook. Dabei handelt es sich um einfache Verweise, nicht um eingebettete Inhalte oder Social-Media-Plugins. Erst wenn Sie einen solchen Link anklicken, werden Daten an den jeweiligen Anbieter übertragen. Auf dessen Datenverarbeitung haben wir keinen Einfluss; es gelten dann die Datenschutzbestimmungen des Anbieters."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "10. Empfänger der Daten"
  },
  {
    "type": "text",
    "text": "Eine Weitergabe Ihrer Daten an Dritte findet nicht statt, ausgenommen an den Hosting-Dienstleister im Rahmen der Auftragsverarbeitung sowie in Fällen, in denen wir gesetzlich zur Weitergabe verpflichtet sind. Eine Übermittlung in Länder außerhalb der Europäischen Union ist nicht beabsichtigt."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "11. Ihre Rechte"
  },
  {
    "type": "text",
    "text": "Ihnen stehen gegenüber dem Verantwortlichen folgende Rechte zu: Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen eine Verarbeitung, die auf einem berechtigten Interesse beruht (Art. 21 DSGVO)."
  },
  {
    "type": "text",
    "text": "Haben Sie in eine Verarbeitung eingewilligt, können Sie diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt."
  },
  {
    "type": "text",
    "text": "Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die oben genannten Kontaktdaten."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "12. Beschwerderecht bei der Aufsichtsbehörde"
  },
  {
    "type": "text",
    "text": "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren (Art. 77 DSGVO). Die für uns zuständige Behörde ist:"
  },
  {
    "type": "lines",
    "lines": [
      "Die Landesbeauftragte für den Datenschutz Niedersachsen",
      "Prinzenstraße 5",
      "30159 Hannover",
      "Telefon: +49 (0) 511 120 4500",
      "E-Mail: poststelle@lfd.niedersachsen.de",
      "Website: www.lfd.niedersachsen.de"
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "13. Keine automatisierte Entscheidungsfindung"
  },
  {
    "type": "text",
    "text": "Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 DSGVO findet nicht statt."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "14. Änderungen dieser Datenschutzerklärung"
  },
  {
    "type": "text",
    "text": "Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage oder die Verarbeitung auf dieser Website ändert – etwa wenn Funktionen hinzukommen oder der Hosting-Anbieter wechselt. Es gilt jeweils die hier abrufbare Fassung."
  }
];
