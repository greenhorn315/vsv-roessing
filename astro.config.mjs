// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Bei Go-Live auf die echte Domain umstellen (wird für Sitemap,
// Canonical-URLs und Open-Graph-Bilder gebraucht).
export const SITE_URL = 'https://vsv-roessing.de';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // Jede Seite liegt als Verzeichnis-Index vor (/kontakt/index.html), ihre
  // kanonische Adresse ist also /kontakt/. Alle internen Links enden deshalb
  // auf „/“ – ein Link auf /kontakt würde bei Cloudflare erst umgeleitet.
  // 'always' lässt den Entwicklungsserver Adressen ohne Schrägstrich
  // ablehnen, damit so ein Link schon lokal auffällt.
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // 'directory' erzeugt /kontakt/index.html. Diese Form liefert jeder
    // Webserver ohne Zusatzregeln aus – Cloudflare genauso wie die Synology
    // Web Station. Das 'file'-Format (kontakt.html) bräuchte dagegen einen
    // Server, der /kontakt stillschweigend auf kontakt.html abbildet.
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
