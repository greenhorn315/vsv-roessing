// Ganzseitige Screenshots aller Seiten für den Vorher-nachher-Vergleich.
// Aufruf: npm run build && npm run screenshots -- <zielordner>
//
// Liefert dist/ über einen eigenen kleinen Server auf einem freien Port aus
// statt über `astro preview`: Der läuft nach Programmende weiter und blockiert
// den Port, sodass ein zweiter Lauf still die alte Seite fotografiert.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const out = process.argv[2] ?? 'screenshots';
const dist = resolve('dist');
const routes = [
  '/', '/sportangebote/', '/sportangebote/fussball/', '/sportangebote/outdoor/',
  '/sportangebote/dart/', '/sportangebote/yoga/', '/mitglied-werden/', '/verein/',
  '/kontakt/', '/impressum/', '/datenschutz/', '/gibt-es-nicht/',
];
const viewports = { mobil: { width: 390, height: 844 }, desktop: { width: 1280, height: 900 } };
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.pdf': 'application/pdf',
};

const server = createServer(async (req, res) => {
  let path = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try {
    if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(await readFile(join(dist, '404.html')).catch(() => ''));
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, viewport] of Object.entries(viewports)) {
    // reducedMotion stoppt Karussell und Einblend-Animationen.
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      // Lazy geladene Bilder vor dem Foto einmal ins Bild scrollen.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle');
      const file = (route.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'start') + `.${name}.png`;
      await page.screenshot({ path: `${out}/${file}`, fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
