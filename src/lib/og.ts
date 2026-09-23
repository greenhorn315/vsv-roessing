import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { site } from './site';

/**
 * Vorschaubilder für WhatsApp, Facebook & Co. (Open Graph), beim Bauen
 * erzeugt. Satori setzt das Layout als SVG, sharp macht daraus ein PNG.
 *
 * Satori liest nur TTF, OTF und WOFF – kein WOFF2. Die Variable-Fonts der
 * Seite (`@fontsource-variable/…`) gibt es nur als WOFF2, deshalb kommen die
 * Schriften hier aus den statischen Paketen `@fontsource/fraunces` und
 * `@fontsource/source-sans-3`. Gebraucht wird nur der Zeichensatz „latin“,
 * der enthält auch Umlaute und ß.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const farben = {
  primary: '#14453D',
  accent: '#C9401F',
  sun: '#FFC857',
  text: '#FFFFFF',
  muted: '#CFE0DA',
};

const fromRoot = (...teile: string[]) => resolve(process.cwd(), ...teile);

let schriften: Promise<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: 'normal' }[]> | undefined;

function ladeSchriften() {
  schriften ??= Promise.all([
    readFile(fromRoot('node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff')).then(
      (data) => ({ name: 'Fraunces', data, weight: 600 as const, style: 'normal' as const }),
    ),
    readFile(fromRoot('node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff')).then(
      (data) => ({ name: 'Source Sans 3', data, weight: 400 as const, style: 'normal' as const }),
    ),
    readFile(fromRoot('node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff')).then(
      (data) => ({ name: 'Source Sans 3', data, weight: 700 as const, style: 'normal' as const }),
    ),
  ]);
  return schriften;
}

/** Piktogramm aus `src/assets/piktogramme/` als Data-URI. */
async function piktogramm(name: string | undefined): Promise<string | undefined> {
  if (!name) return undefined;
  const pfad = fromRoot('src/assets/piktogramme', `${name}.png`);
  if (!existsSync(pfad)) throw new Error(`Piktogramm „${name}.png“ fehlt in src/assets/piktogramme/`);
  return `data:image/png;base64,${(await readFile(pfad)).toString('base64')}`;
}

/** Minimaler Ersatz für JSX: Satori erwartet Objekte in Reacts Form. */
type Knoten = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Knoten => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

interface Vorschau {
  /** Große Überschrift, z. B. der Name der Sportart. */
  titel: string;
  /** Kurzer Satz darunter. */
  unterzeile?: string;
  /** Dateiname des DOSB-Piktogramms ohne Endung. */
  piktogramm?: string;
}

/** Erzeugt ein Vorschaubild 1200 × 630 als PNG. */
export async function vorschaubild({ titel, unterzeile, piktogramm: name }: Vorschau): Promise<Buffer> {
  const bild = await piktogramm(name);
  const titelGroesse = titel.length > 12 ? 92 : 118;

  const links = h(
    'div',
    { flexDirection: 'column', justifyContent: 'space-between', width: 640, height: '100%' },
    // Oben: Vereinsname als Pille mit Sonnenpunkt, wie auf og-default.png.
    h(
      'div',
      {
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 14,
        padding: '12px 26px 12px 22px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.12)',
        color: farben.text,
        fontSize: 26,
        fontWeight: 700,
      },
      h('div', { width: 14, height: 14, borderRadius: 999, background: farben.sun }),
      site.name,
    ),
    h(
      'div',
      { flexDirection: 'column' },
      h(
        'div',
        {
          fontFamily: 'Fraunces',
          fontWeight: 600,
          fontSize: titelGroesse,
          lineHeight: 1.02,
          color: farben.text,
          letterSpacing: -1,
        },
        titel,
      ),
      h('div', { width: 120, height: 10, borderRadius: 999, background: farben.accent, marginTop: 30 }),
      ...(unterzeile
        ? [h('div', { marginTop: 28, fontSize: 34, lineHeight: 1.3, color: farben.muted }, unterzeile)]
        : []),
    ),
    h('div', { fontSize: 28, fontWeight: 700, color: farben.text }, 'vsv-roessing.de'),
  );

  // Rechts: das Piktogramm unverändert auf weißer Karte, dahinter die Sonne.
  const rechts = h(
    'div',
    { position: 'relative', flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
    h('div', {
      position: 'absolute',
      width: 520,
      height: 520,
      borderRadius: 999,
      background: farben.sun,
      right: -150,
      top: -40,
    }),
    ...(bild
      ? [
          h(
            'div',
            {
              padding: 22,
              borderRadius: 48,
              background: '#FFFFFF',
              boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
            },
            { type: 'img', props: { src: bild, width: 300, height: 300 } },
          ),
        ]
      : []),
  );

  const svg = await satori(
    h(
      'div',
      {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        padding: '56px 0 56px 84px',
        background: farben.primary,
        fontFamily: 'Source Sans 3',
        overflow: 'hidden',
      },
      links,
      rechts,
    ) as never,
    { width: OG_WIDTH, height: OG_HEIGHT, fonts: await ladeSchriften() },
  );

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
