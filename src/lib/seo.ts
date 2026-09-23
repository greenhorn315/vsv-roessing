import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { site } from './site';
import { nachOrder } from './reihenfolge';
import { getSportNames } from './sportarten';
import { kommendeSpiele, nachTermin } from './spielplan';

/**
 * Strukturierte Daten (JSON-LD, schema.org) für Suchmaschinen. BaseLayout
 * gibt je Seite einen `@graph` aus: immer den Verein samt Sportstätten,
 * dazu, was die Seite selbst mitbringt – Brotkrumen, Spieltermine.
 *
 * Knoten verweisen per `@id` aufeinander, statt den Verein in jedem Termin
 * zu wiederholen.
 */

export type JsonLdNode = Record<string, unknown>;

/** Absolute Adresse zu einem Pfad der Seite. */
const absolut = (pfad: string, origin: string) => new URL(pfad, origin).href;

export const vereinId = (origin: string) => `${origin}/#verein`;
const ortId = (origin: string, id: string) => `${origin}/#ort-${id}`;

/**
 * Nur echte Profile nach `sameAs`. In `site.social` stehen bis zum Livegang
 * Platzhalter – die nackte Startseite von Instagram oder Facebook, bei
 * WhatsApp gar nichts. Die würden Suchmaschinen das falsche Profil
 * zuordnen, deshalb zählt eine Adresse erst, wenn sie auf einen Pfad zeigt.
 */
function echteProfile(): string[] {
  return Object.values(site.social)
    .map((eintrag) => eintrag.url)
    .filter((url) => {
      if (!url) return false;
      try {
        const { protocol, pathname } = new URL(url);
        return protocol === 'https:' && pathname.replace(/\/+$/, '') !== '';
      } catch {
        return false;
      }
    });
}

type Sportstaette = CollectionEntry<'sportstaetten'>;

async function getSportstaetten(): Promise<Sportstaette[]> {
  return (await getCollection('sportstaetten')).sort(nachOrder);
}

function ortKnoten(origin: string, { id, data }: Sportstaette): JsonLdNode {
  return {
    '@type': 'SportsActivityLocation',
    '@id': ortId(origin, id),
    name: data.name,
    ...(data.alias && { alternateName: data.alias }),
    ...(data.street && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.street,
        postalCode: data.postalCode,
        addressLocality: data.city,
        addressCountry: site.address.country,
      },
    }),
  };
}

/** Der Verein und seine Sportstätten – auf jeder Seite gleich. */
export async function vereinsKnoten(origin: string, description: string): Promise<JsonLdNode[]> {
  const orte = await getSportstaetten();
  const sameAs = echteProfile();
  return [
    {
      '@type': 'SportsClub',
      '@id': vereinId(origin),
      name: site.name,
      legalName: site.legalName,
      alternateName: site.shortName,
      foundingDate: String(site.founded),
      description,
      url: absolut('/', origin),
      // Das Wappen liegt noch in public/; das Touch-Icon ist quadratisch
      // und bleibt beim Umzug der Bilder an seinem Platz.
      logo: absolut('/apple-touch-icon.png', origin),
      image: absolut('/og-default.png', origin),
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
      sport: await getSportNames(),
      location: orte.map(({ id }) => ({ '@id': ortId(origin, id) })),
      ...(sameAs.length > 0 && { sameAs }),
    },
    ...orte.map((ort) => ortKnoten(origin, ort)),
  ];
}

export interface Brotkrume {
  label: string;
  /** Fehlt beim letzten Glied, der aktuellen Seite. */
  href?: string;
}

/** BreadcrumbList aus denselben Einträgen wie die sichtbaren Brotkrumen. */
export function brotkrumenKnoten(items: Brotkrume[], seite: URL): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? absolut(item.href, seite.origin) : seite.href,
    })),
  };
}

/**
 * Abstand von Europe/Berlin zu UTC an einem Tag, z. B. „+02:00“. Mittags
 * gelesen: Die Zeitumstellung liegt nachts, alle Spiele am Abend.
 */
function berlinOffset(isoDatum: string): string {
  const teile = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    timeZoneName: 'longOffset',
  }).formatToParts(new Date(`${isoDatum}T12:00:00Z`));
  const name = teile.find((t) => t.type === 'timeZoneName')?.value ?? 'GMT+01:00';
  return name === 'GMT' ? '+00:00' : name.replace('GMT', '');
}

/**
 * Kommende Partien einer Sportart als SportsEvent. Ohne Spielplan-Datei
 * gibt es keine Knoten. Den Ort kennen wir nur bei Heimspielen – er kommt
 * über `spielstaette` aus sportstaetten.yaml. Auswärts bleibt er offen,
 * statt ihn zu erfinden.
 */
export async function spielKnoten(sport: string, sportName: string, origin: string): Promise<JsonLdNode[]> {
  const plan = await getEntry('spielplaene', sport);
  if (!plan) return [];
  const { team, spielstaette } = plan.data;
  const heimOrt = spielstaette
    ? (await getSportstaetten()).find((o) => o.data.name === spielstaette || o.data.alias === spielstaette)
    : undefined;
  if (spielstaette && !heimOrt) {
    throw new Error(`spielplaene/${sport}.yaml: Spielstätte „${spielstaette}“ fehlt in sportstaetten.yaml.`);
  }

  return kommendeSpiele(nachTermin(plan.data.spiele)).map((spiel) => {
    const wir = {
      '@type': 'SportsTeam',
      name: [site.shortName, spiel.team ?? team].filter(Boolean).join(' '),
      parentOrganization: { '@id': vereinId(origin) },
    };
    const gegner = { '@type': 'SportsTeam', name: spiel.opponent };
    const [heim, gast] = spiel.home ? [wir, gegner] : [gegner, wir];
    return {
      '@type': 'SportsEvent',
      name: `${heim.name} – ${gast.name}`,
      sport: sportName,
      startDate: `${spiel.date}T${spiel.time}:00${berlinOffset(spiel.date)}`,
      homeTeam: heim,
      awayTeam: gast,
      // Ausrichter und Ort nur bei Heimspielen; auswärts richtet der Gegner aus.
      ...(spiel.home && { organizer: { '@id': vereinId(origin) } }),
      ...(spiel.home && heimOrt && { location: { '@id': ortId(origin, heimOrt.id) } }),
      ...(spiel.note && { description: spiel.note }),
    };
  });
}
