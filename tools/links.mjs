import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, extname } from 'node:path';

const dist = resolve('dist/client');
const origin = 'https://vsv-roessing.de';

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) htmlFiles.push(p);
  }
})(dist);

const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};

const problems = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const pagePath = '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  for (const [, raw] of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
    const href = raw.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|sms:|javascript:)/.test(href)) continue;
    const url = new URL(href, origin + pagePath);
    if (url.origin !== origin) continue;
    checked++;
    const where = `${relative(dist, file)}: ${href}`;
    const path = decodeURIComponent(url.pathname);
    const isFile = extname(path) !== '';

    let target;
    if (isFile) {
      target = join(dist, path);
      if (!existsSync(target)) problems.push(`${where} → Datei fehlt`);
    } else {
      if (!path.endsWith('/')) problems.push(`${where} → ohne „/“ am Ende`);
      target = join(dist, path, 'index.html');
      if (!existsSync(target)) problems.push(`${where} → Seite fehlt`);
    }

    if (url.hash && !isFile && existsSync(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!idsOf(target).has(id)) problems.push(`${where} → Anker #${id} fehlt`);
    }
  }
}

console.log(`${htmlFiles.length} Seiten, ${checked} interne Links geprüft.`);
if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`${problems.length} Problem(e).`);
  process.exit(1);
}
console.log('Alle internen Links in Ordnung.');
