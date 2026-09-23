// Ganzseitige Screenshots aller Seiten für den Vorher-nachher-Vergleich.
// Aufruf: npm run build && node tools/screenshots.mjs <zielordner>
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const out = process.argv[2] ?? 'screenshots';
const port = 4399;
const routes = [
  '/', '/sportangebote/', '/sportangebote/fussball/', '/sportangebote/outdoor/',
  '/sportangebote/dart/', '/sportangebote/yoga/', '/mitglied-werden/', '/verein/',
  '/kontakt/', '/impressum/', '/datenschutz/', '/gibt-es-nicht/',
];
const viewports = { mobil: { width: 390, height: 844 }, desktop: { width: 1280, height: 900 } };

mkdirSync(out, { recursive: true });
const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 4000));

const browser = await chromium.launch();
try {
  for (const [name, viewport] of Object.entries(viewports)) {
    // reducedMotion stoppt Karussell und Einblend-Animationen.
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    for (const route of routes) {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle' });
      const file = (route.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'start') + `.${name}.png`;
      await page.screenshot({ path: `${out}/${file}`, fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}
