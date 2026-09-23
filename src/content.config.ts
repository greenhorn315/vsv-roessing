/**
 * Content Collections.
 *
 * Hier stehen alle Inhalte, die der Verein pflegt: Sportarten, Trainingszeiten,
 * Sportstätten, Meldungen, Beiträge, Spielpläne, Rechtstexte. Sie liegen unter
 * `src/content/` in YAML oder Markdown – Formaten, die sich ohne TypeScript-
 * Kenntnisse bearbeiten lassen –, und Astro prüft sie beim Bauen gegen das
 * Schema. Ein Tippfehler im Schlüssel oder eine fehlende Pflichtangabe bricht
 * den Build mit einer klaren Meldung ab, statt still eine leere Stelle auf der
 * Seite zu erzeugen.
 *
 * Was sich aus den Inhalten ableiten lässt – Anzahl der Sportarten, sortierte
 * Trainingszeiten, Kennzahlen, Rechenwerte des Familienrechners – steht nicht
 * hier, sondern als Funktion in `src/lib/`. So gibt es für jede Angabe genau
 * eine Stelle, an der sie gepflegt wird.
 *
 * Zur Reihenfolge: Astro liefert die Einträge einer Collection in keiner
 * verlässlichen Reihenfolge, auch nicht in der Reihenfolge der YAML-Datei.
 * Wo es darauf ankommt, steht deshalb ein `order` am Eintrag (siehe
 * src/lib/reihenfolge.ts). Die Trainingszeiten brauchen keines, sie werden
 * nach Wochentag und Uhrzeit sortiert.
 */
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
// Nicht aus 'astro:content' – der Re-Export von z ist dort abgekündigt – und
// auch nicht aus 'zod': Das wäre eine undeklarierte Abhängigkeit, die zu einer
// anderen Zod-Version auflösen könnte als die, mit der Astro prüft.
import { z } from 'astro/zod';
import { AGE_GROUPS, AUDIENCE_KEYS, SEASONS, SPORT_COLORS, weekdays } from './lib/labels';

// Zu .strict(), das an jedem Schema hängt: Es fängt auch verschriebene
// Schlüssel ab. Ohne das ignoriert Zod alles, was hier nicht steht: Wer sich
// in der YAML-Datei beim Schlüssel „name“ vertippt, bekäme still ein Amt ohne
// Namen statt eines Fehlers beim Bauen. Genau dieser Tippfehler ist in einer
// handgepflegten Datei der wahrscheinlichste.

/** Nicht leerer Text – ein leerer Wert ist fast immer ein Versehen. */
const text = () => z.string().min(1);

/** Position in der Reihenfolge auf der Seite, aufsteigend. Lücken sind erlaubt. */
const order = () => z.number().int().positive();

/**
 * Kalenderdatum als „JJJJ-MM-TT“. YAML liest ein solches Datum ohne
 * Anführungszeichen schon selbst als Datum, mit Anführungszeichen als Text;
 * beides wird hier zum selben ISO-Text, mit dem die Spielpläne vergleichen
 * und sortieren.
 */
const isoDatum = () =>
  z.coerce.date().transform((datum) => datum.toISOString().slice(0, 10));

const vorstand = defineCollection({
  // Pfad ab dem Projektstamm, nicht ab src/content/.
  loader: file('src/content/vorstand.yaml'),
  schema: z.object({
    /** Reihenfolge auf der Vereinsseite, aufsteigend. */
    order: order(),
    /** Amtsbezeichnung, wie sie der Verein selbst führt. */
    role: text(),
    /**
     * Ohne Namen erscheint an der Stelle ein zurückhaltendes „Name folgt“.
     * Gedacht für den Zeitraum zwischen zwei Amtsinhabern – besser als eine
     * erfundene Angabe oder eine Lücke in der Liste.
     */
    name: text().optional(),
  }).strict(),
});

/**
 * Sportarten, je Datei eine. Der Dateiname ist der Slug in der Adresse
 * (/sportangebote/<dateiname>), der Markdown-Text unter den Angaben der
 * Fließtext der Detailseite.
 */
const sportarten = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sportarten' }),
  schema: z.object({
    /** Reihenfolge in Übersicht, Organigramm und Weiter-Navigation. */
    order: order(),
    name: text(),
    /** Kurzzeile auf der Karte der Startseite. */
    teaser: text(),
    /** Längerer Text für die Übersicht der Sportarten und die Detailseite. */
    description: text(),
    /** Kurze Stichpunkte („Das erwartet dich“). */
    highlights: z.array(text()).optional(),
    /** Wo wird diese Sportart trainiert? */
    venue: text().optional(),
    /** Was sollte man zum ersten Training mitbringen? */
    bring: text().optional(),
    /**
     * Hinweis für Sportarten, die sich gerade im Aufbau befinden oder bei
     * denen Angaben fehlen. Wird auf der Detailseite hervorgehoben.
     */
    status: z.object({
      label: text(),
      text: text(),
      /** Stichpunkte unter „Als Nächstes geplant“. */
      next: z.array(text()).optional(),
    }).strict().optional(),
    /** Dateiname des Piktogramms in public/piktogramme/ ohne Endung. */
    pictogram: text(),
    /** Einzelne Angebote, die zu dieser Sportart gehören, z. B. Boßeln bei Outdoor. */
    activities: z.array(
      z.object({
        name: text(),
        /**
         * Dateiname in public/piktogramme/ ohne Endung. Fehlt der Wert, zeigt
         * die Seite einen leeren Rahmen – besser als die Aktivität zu
         * verschweigen.
         */
        pictogram: text().optional(),
        /** Kurzer Zusatz, z. B. „Weit- und Hochsprung“. */
        note: text().optional(),
      }).strict(),
    ).optional(),
    /** Akzentfarbe der Karte als Name eines Farbtokens, siehe src/lib/labels.ts. */
    color: z.enum(SPORT_COLORS),
    ageGroups: z.array(z.enum(AGE_GROUPS)).min(1),
    /**
     * Ansprechpartner der Sportart – im Verein „Spartenleitung“ genannt.
     * Ohne Eintrag verweist die Seite auf die Sammeladresse des Vorstands.
     */
    contact: z.object({
      name: text(),
      /** Funktion, z. B. „Spartenleitung Outdoor“. */
      role: text().optional(),
      email: z.email().optional(),
      /** In der Schreibweise, wie sie angezeigt werden soll. */
      phone: text().optional(),
    }).strict().optional(),
  }).strict(),
});

/** Trainingsgruppen. Quellen und Entscheidungen stehen oben in der YAML-Datei. */
const trainings = defineCollection({
  loader: file('src/content/trainings.yaml'),
  schema: z.object({
    title: text(),
    day: z.enum(weekdays),
    /** Anzeigetext: eine Uhrzeit, eine Spanne oder „nach Absprache“. */
    time: text(),
    place: text().optional(),
    /**
     * Zugehörige Sportart. Ein Verweis statt freien Textes: Ein Slug, zu dem
     * es keine Datei in src/content/sportarten/ gibt, bricht den Build ab.
     */
    sport: reference('sportarten'),
    /** Für wen die Gruppe gedacht ist, in Worten. */
    audience: text().optional(),
    /** Kurzer Zusatz, z. B. „14-tägig“ oder ein zweiter Termin im Winter. */
    note: text().optional(),
    /** Übungsleitung; leere Liste heißt: die Gruppe sucht jemanden. */
    trainers: z.array(text()).optional(),
    ageGroups: z.array(z.enum(AGE_GROUPS)).optional(),
    /**
     * Für welchen Einstieg „Für wen ist was?“ die Gruppe gelistet wird. Eine
     * Gruppe kann in mehreren stehen.
     */
    audienceGroups: z.array(z.enum(AUDIENCE_KEYS)).optional(),
    /** Halbjahr; ohne Angabe ganzjährig. */
    season: z.enum(SEASONS).optional(),
  }).strict(),
});

const sportstaetten = defineCollection({
  loader: file('src/content/sportstaetten.yaml'),
  schema: z.object({
    order: order(),
    name: text(),
    /** Zweiter gebräuchlicher Name, z. B. auf Karten. Wird als „auch …“ gezeigt. */
    alias: text().optional(),
    street: text().optional(),
    postalCode: z.string().regex(/^\d{5}$/, 'fünfstellige Postleitzahl, in Anführungszeichen').optional(),
    city: text().optional(),
    /** Was dort stattfindet. */
    note: text(),
    /** Was vor Ort zur Verfügung steht, z. B. Umkleiden. */
    facilities: text().optional(),
    /**
     * Fotos unter public/images/sportstaetten/. Das erste ist das Hauptbild,
     * weitere erscheinen als kleine Ansichten darunter. Fehlt eine Datei,
     * zeigt die Seite automatisch einen Platzhalter statt eines kaputten
     * Bildes.
     */
    photos: z.array(
      z.object({
        src: text(),
        alt: text(),
        /** Kurze Bildunterschrift für die kleinen Ansichten. */
        caption: text().optional(),
      }).strict(),
    ).optional(),
  }).strict(),
});

/**
 * Meldungen, je Datei eine. Der Text der Meldung ist der Inhalt unter den
 * Angaben und wird als schlichter Text gezeigt.
 */
const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    /**
     * Reihenfolge von Hand, nicht nach Datum: Oben steht, was gerade zählt –
     * zuerst die jüngste Meldung, darunter die nächsten Termine. Aus dem
     * Datum allein lässt sich das nicht ableiten, weil eine ältere Meldung
     * durchaus noch vor einem kommenden Termin stehen soll.
     */
    order: order(),
    date: z.coerce.date(),
    title: text(),
  }).strict(),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials.yaml'),
  schema: z.object({
    order: order(),
    text: text(),
    author: text(),
    role: text(),
  }).strict(),
});

/** Bilder im Karussell der Startseite. */
const karussell = defineCollection({
  loader: file('src/content/karussell.yaml'),
  schema: z.object({
    order: order(),
    src: text(),
    alt: text(),
    /** Kurze Bildunterschrift, sichtbar über dem Bild. */
    caption: text(),
    /** Quelle, wenn das Bild nicht vom Verein stammt. */
    credit: text().optional(),
  }).strict(),
});

/**
 * Spielpläne, je Sportart eine Datei; der Dateiname ist der Slug der
 * Sportart. Die Kopfangaben beschreiben den Aushang, `spiele` die Partien.
 */
const spielplaene = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/spielplaene' }),
  schema: z.object({
    /** Saison, z. B. „2026/2027“. */
    saison: text().optional(),
    /** Stand des abgetippten Aushangs, z. B. „September 2026“. */
    stand: text().optional(),
    /** Name der Mannschaft, wenn nur eine antritt. */
    team: text().optional(),
    /** Spielstätte der Heimspiele, siehe sportstaetten.yaml. */
    spielstaette: text().optional(),
    spiele: z.array(
      z.object({
        /** Datum; ein Spiel am Tag des Bauens zählt noch als kommend. */
        date: isoDatum(),
        time: text(),
        /** Gegner in der Schreibweise des Spielplans. */
        opponent: text(),
        /** true = Heimspiel an der eigenen Spielstätte. */
        home: z.boolean(),
        /** Mannschaft, wenn eine Sportart mit mehreren antritt. */
        team: text().optional(),
        /** Zusatz aus dem Aushang, etwa „Pokal“. */
        note: text().optional(),
      }).strict(),
    ),
  }).strict(),
});

/** Beitragssätze für die Tabelle und den Familienrechner. */
const beitraege = defineCollection({
  loader: file('src/content/mitgliedschaft/beitraege.yaml'),
  schema: z.object({
    order: order(),
    label: text(),
    /** Monatsbeitrag in Euro. Abgebucht wird jährlich. */
    monthly: z.number().positive(),
    yearly: z.number().positive(),
    note: text().optional(),
  }).strict(),
});

const beitragsregeln = defineCollection({
  loader: file('src/content/mitgliedschaft/beitragsregeln.yaml'),
  schema: z.object({ order: order(), text: text() }).strict(),
});

const formulare = defineCollection({
  loader: file('src/content/mitgliedschaft/formulare.yaml'),
  schema: z.object({
    order: order(),
    title: text(),
    text: text(),
    /** Pfad unter public/. Die Dateigröße wird beim Bauen daraus gelesen. */
    file: z.string().regex(/^\/downloads\/.+\.pdf$/, 'Pfad der Form /downloads/<datei>.pdf'),
    pages: z.number().int().positive(),
  }).strict(),
});

const beitrittsschritte = defineCollection({
  loader: file('src/content/mitgliedschaft/beitrittsschritte.yaml'),
  schema: z.object({
    order: order(),
    title: text(),
    text: text(),
  }).strict(),
});

/**
 * Impressum und Datenschutzerklärung als Markdown. Der Wortlaut ist
 * Rechtstext und wird nicht umformuliert; Hinweise zur Herkunft stehen oben
 * in der jeweiligen Datei.
 */
const rechtliches = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/rechtliches' }),
  schema: z.object({
    /** Fettgedruckter Satz über dem Text (Impressum). */
    intro: text().optional(),
    /** Verweis auf die Datenschutzerklärung am Ende (Impressum). */
    datenschutzHinweis: z.object({
      heading: text(),
      linkLabel: text(),
      href: text(),
    }).strict().optional(),
  }).strict(),
});

export const collections = {
  vorstand,
  sportarten,
  trainings,
  sportstaetten,
  news,
  testimonials,
  karussell,
  spielplaene,
  beitraege,
  beitragsregeln,
  formulare,
  beitrittsschritte,
  rechtliches,
};
