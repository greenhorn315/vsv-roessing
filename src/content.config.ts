/**
 * Content Collections.
 *
 * Hier stehen Inhalte, die der Verein pflegt, nicht die Website-Logik: Sie
 * liegen unter `src/content/` in einem Format, das sich ohne TypeScript-
 * Kenntnisse bearbeiten lässt, und Astro prüft sie beim Bauen gegen das
 * Schema. Ein Tippfehler im Schlüssel oder eine fehlende Pflichtangabe bricht
 * den Build mit einer klaren Meldung ab, statt still eine leere Stelle auf der
 * Seite zu erzeugen.
 *
 * Abgrenzung zu `src/data/`: Dort liegt weiter alles, was die Seite selbst
 * ausmacht – Sportarten, Trainingszeiten, Rechtstexte, Beitragssätze. Vieles
 * davon trägt Logik mit sich (abgeleitete Zahlen, Verweise zwischen Dateien)
 * und ist in TypeScript besser aufgehoben.
 */
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
// Nicht aus 'astro:content' – der Re-Export von z ist dort abgekündigt – und
// auch nicht aus 'zod': Das wäre eine undeklarierte Abhängigkeit, die zu einer
// anderen Zod-Version auflösen könnte als die, mit der Astro prüft.
import { z } from 'astro/zod';

const vorstand = defineCollection({
  // Pfad ab dem Projektstamm, nicht ab src/content/.
  loader: file('src/content/vorstand.yaml'),
  schema: z.object({
    /** Reihenfolge auf der Vereinsseite, aufsteigend. */
    order: z.number().int().positive(),
    /** Amtsbezeichnung, wie sie der Verein selbst führt. */
    role: z.string().min(1),
    /**
     * Ohne Namen erscheint an der Stelle ein zurückhaltendes „Name folgt“.
     * Gedacht für den Zeitraum zwischen zwei Amtsinhabern – besser als eine
     * erfundene Angabe oder eine Lücke in der Liste.
     */
    name: z.string().min(1).optional(),
  })
    // .strict(), damit auch ein verschriebener Schlüssel auffällt: Ohne das
    // würde aus „nmae: Thomas Kuse“ still ein Amt ohne Namen, statt eines
    // Fehlers beim Bauen.
    .strict(),
});

export const collections = { vorstand };
