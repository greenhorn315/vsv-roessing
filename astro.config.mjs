// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Beim Livegang auf die echte Domain umstellen.
export const SITE_URL = 'https://vsv-roessing.de';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  image: {
    // Vorlagen sind schon komprimiert; mit Sharps Vorgabe 80 würden die Varianten größer.
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
