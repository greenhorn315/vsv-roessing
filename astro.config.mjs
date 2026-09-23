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
  image: {
    // Qualität je Format für alle Bilder aus src/assets/. Die Vorlagen sind
    // schon sorgfältig komprimierte JPEGs (tools/); mit Sharps Vorgabe 80
    // würden die Varianten in voller Breite größer als die Vorlage. Bei
    // diesen Werten ist im Vorher-nachher-Vergleich kein Unterschied zu sehen.
    service: {
      config: {
        jpeg: { quality: 72, mozjpeg: true },
        webp: { quality: 72 },
        avif: { quality: 50 },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
