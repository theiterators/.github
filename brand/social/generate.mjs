// Renders the 1280x640 social preview cards (Settings > General > Social preview in each repository) from
// cards.json into png/<repo>.png, with the vendored Figtree and JetBrains Mono fonts and the logo in ../.
//
// Usage, from brand/social:  npm install && node generate.mjs [repo ...]
// With no arguments every card is rendered. --html also writes png/<repo>.html for inspection.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const here = dirname(fileURLToPath(import.meta.url));
const brand = join(here, '..');
const url = (p) => pathToFileURL(join(brand, p)).href;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Comments and strings get quiet colors; {{ }} marks the tokens that carry the point, drawn in orange.
function codeLine(raw) {
  if (raw === '') return '&nbsp;';
  const comment = /^\s*(\/\/|#)/.test(raw);
  let html = esc(raw);
  if (!comment) html = html.replace(/"[^"]*"/g, (m) => `<span class="str">${m}</span>`);
  html = html.replace(/\{\{(.+?)\}\}/g, '<b>$1</b>');
  return comment ? `<span class="com">${html}</span>` : html;
}

function cardHtml(card) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Figtree; src: url("${url('fonts/Figtree-Variable.ttf')}"); font-weight: 300 900; }
@font-face { font-family: "JetBrains Mono"; src: url("${url('fonts/JetBrainsMono-Variable.ttf')}"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1280px; height: 640px; overflow: hidden; }
body { background: #ffffff; color: #0d1553; font-family: Figtree, sans-serif; position: relative; }
.top { position: absolute; left: 72px; right: 72px; top: 56px; display: flex; justify-content: space-between; align-items: center; }
.top img { height: 34px; display: block; }
.top span { font-size: 22px; font-weight: 500; color: #202c5b; }
.name { position: absolute; left: 66px; top: 116px; right: 72px; font-weight: 900; font-size: 128px; line-height: 1; letter-spacing: -0.035em; white-space: nowrap; }
.line { position: absolute; left: 72px; top: 270px; right: 160px; font-size: 38px; font-weight: 500; line-height: 1.2; letter-spacing: -0.01em; color: #202c5b; }
.band { position: absolute; left: 0; right: 0; bottom: 0; height: 264px; background: #0d1553; display: flex; align-items: flex-start; padding: 40px 72px 0; }
pre { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-size: 26px; line-height: 1.38; color: #eef0f7; font-weight: 400; }
pre b { color: #ff7700; font-weight: 700; }
pre .str { color: #c3c6dc; }
pre .com { color: #a5a9c8; }
pre .com b { color: #ff7700; font-weight: 700; }
</style></head>
<body>
  <div class="top"><img src="${url('logo.svg')}" alt=""><span>github.com/theiterators/${esc(card.repo)}</span></div>
  <div class="name">${esc(card.repo)}</div>
  <div class="line">${esc(card.line)}</div>
  <div class="band"><pre>${card.code.map(codeLine).join('\n')}</pre></div>
</body></html>`;
}

const { cards } = JSON.parse(await readFile(join(here, 'cards.json'), 'utf8'));
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const keepHtml = process.argv.includes('--html');
await mkdir(join(here, 'png'), { recursive: true });

const browser = await chromium.launch({ channel: 'chromium', headless: true, args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
for (const card of cards.filter((c) => !only.length || only.includes(c.repo))) {
  const html = cardHtml(card);
  const htmlPath = join(here, 'png', `${card.repo}.html`);
  await writeFile(htmlPath, html);
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  // Long names shrink until they fit the width; the band and the line never move.
  const fit = await page.evaluate(() => {
    const el = document.querySelector('.name');
    const max = document.body.clientWidth - 72 - 66;
    let size = 128;
    while (el.scrollWidth > max && size > 60) { size -= 2; el.style.fontSize = size + 'px'; }
    const pre = document.querySelector('pre');
    const band = document.querySelector('.band');
    return { nameSize: size, codeFits: pre.scrollWidth <= band.clientWidth - 144 && pre.scrollHeight <= band.clientHeight - 32 };
  });
  await page.screenshot({ path: join(here, 'png', `${card.repo}.png`) });
  if (!keepHtml) await import('node:fs/promises').then((fs) => fs.rm(htmlPath));
  console.log(card.repo, JSON.stringify(fit));
}
await browser.close();
