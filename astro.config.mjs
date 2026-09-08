// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Bei Go-Live auf die echte Domain umstellen (wird für Sitemap,
// Canonical-URLs und Open-Graph-Bilder gebraucht).
export const SITE_URL = 'https://vsv-roessing.de';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Erzeugt /kontakt.html statt /kontakt/index.html – passt zu
    // Cloudflare Workers Static Assets und zu einfachen Webservern (Synology).
    format: 'file',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
