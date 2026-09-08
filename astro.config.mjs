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
    // 'directory' erzeugt /kontakt/index.html. Nötig, weil es sowohl die
    // Seite /sportangebote als auch die Detailseiten /sportangebote/<sparte>
    // gibt – im 'file'-Format kollidieren Datei und Verzeichnis.
    // Verzeichnis-Indizes liefern Cloudflare und die Synology Web Station
    // gleichermaßen aus.
    format: 'directory',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
