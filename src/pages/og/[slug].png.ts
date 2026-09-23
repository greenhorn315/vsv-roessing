import type { APIRoute, GetStaticPaths } from 'astro';
import { getSports, type Sport } from '../../lib/sportarten';
import { vorschaubild } from '../../lib/og';

/**
 * Vorschaubild je Sportart unter /og/<slug>.png – erscheint, wenn jemand
 * die Detailseite in WhatsApp, Facebook & Co. teilt. Die Startseite und alle
 * übrigen Seiten zeigen weiter public/og-default.png.
 */
export const getStaticPaths = (async () =>
  (await getSports()).map((sport) => ({ params: { slug: sport.id }, props: { sport } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { sport } = props as { sport: Sport };
  const png = await vorschaubild({
    titel: sport.data.name,
    unterzeile: sport.data.teaser,
    piktogramm: sport.data.pictogram,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
