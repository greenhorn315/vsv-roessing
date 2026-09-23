import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
// z aus astro/zod: Re-Export in astro:content ist abgekündigt, 'zod' direkt wäre undeklariert.
import { z } from 'astro/zod';
import { AGE_GROUPS, AUDIENCE_KEYS, SEASONS, SPORT_COLORS, weekdays } from './lib/labels';

// .strict() macht verschriebene Schlüssel zum Build-Fehler, statt sie still zu ignorieren.

const text = () => z.string().min(1);

const order = () => z.number().int().positive();

const isoDatum = () =>
  z.coerce.date().transform((datum) => datum.toISOString().slice(0, 10));

const vorstand = defineCollection({
  loader: file('src/content/vorstand.yaml'),
  schema: z.object({
    order: order(),
    role: text(),
    name: text().optional(),
  }).strict(),
});

const sportarten = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sportarten' }),
  schema: z.object({
    order: order(),
    name: text(),
    teaser: text(),
    description: text(),
    highlights: z.array(text()).optional(),
    venue: text().optional(),
    bring: text().optional(),
    status: z.object({
      label: text(),
      text: text(),
      next: z.array(text()).optional(),
    }).strict().optional(),
    pictogram: text(),
    activities: z.array(
      z.object({
        name: text(),
        pictogram: text().optional(),
        note: text().optional(),
      }).strict(),
    ).optional(),
    color: z.enum(SPORT_COLORS),
    ageGroups: z.array(z.enum(AGE_GROUPS)).min(1),
    contact: z.object({
      name: text(),
      role: text().optional(),
      email: z.email().optional(),
      phone: text().optional(),
    }).strict().optional(),
  }).strict(),
});

const trainings = defineCollection({
  loader: file('src/content/trainings.yaml'),
  schema: z.object({
    title: text(),
    day: z.enum(weekdays),
    time: text(),
    place: text().optional(),
    sport: reference('sportarten'),
    audience: text().optional(),
    note: text().optional(),
    trainers: z.array(text()).optional(),
    ageGroups: z.array(z.enum(AGE_GROUPS)).optional(),
    audienceGroups: z.array(z.enum(AUDIENCE_KEYS)).optional(),
    season: z.enum(SEASONS).optional(),
  }).strict(),
});

const sportstaetten = defineCollection({
  loader: file('src/content/sportstaetten.yaml'),
  schema: ({ image }) => z.object({
    order: order(),
    name: text(),
    alias: text().optional(),
    street: text().optional(),
    postalCode: z.string().regex(/^\d{5}$/, 'fünfstellige Postleitzahl, in Anführungszeichen').optional(),
    city: text().optional(),
    note: text(),
    facilities: text().optional(),
    photos: z.array(
      z.object({
        src: image(),
        alt: text(),
        caption: text().optional(),
      }).strict(),
    ).optional(),
  }).strict(),
});

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
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

const karussell = defineCollection({
  loader: file('src/content/karussell.yaml'),
  schema: ({ image }) => z.object({
    order: order(),
    src: image(),
    alt: text(),
    caption: text(),
    credit: text().optional(),
  }).strict(),
});

const spielplaene = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/spielplaene' }),
  schema: z.object({
    saison: text().optional(),
    stand: text().optional(),
    team: text().optional(),
    spielstaette: text().optional(),
    spiele: z.array(
      z.object({
        date: isoDatum(),
        time: text(),
        opponent: text(),
        home: z.boolean(),
        team: text().optional(),
        note: text().optional(),
      }).strict(),
    ),
  }).strict(),
});

const beitraege = defineCollection({
  loader: file('src/content/mitgliedschaft/beitraege.yaml'),
  schema: z.object({
    order: order(),
    label: text(),
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

const rechtliches = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/rechtliches' }),
  schema: z.object({
    intro: text().optional(),
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
