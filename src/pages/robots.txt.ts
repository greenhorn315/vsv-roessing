import type { APIRoute } from 'astro';
import { isPrototype } from '../data/site';

/**
 * Solange die Seite ein Entwurf ist, wird sie komplett für Suchmaschinen
 * gesperrt – sonst konkurriert sie mit der echten Vereinsseite.
 */
export const GET: APIRoute = ({ site }) => {
  const body = isPrototype
    ? ['User-agent: *', 'Disallow: /', ''].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
