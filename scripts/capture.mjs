// Build-time capture for the news-image entry: render design.html in a real
// headless Chromium and screenshot the front page as entry.png.
//
// This script runs only while building. The shipped program (main.ts) never
// opens a browser and never touches the network; it copies the PNG this
// script produces. Run from the entry directory with playwright-core on the
// module path, e.g. from ~/workspace/makefun/bounties so node_modules
// resolves (plain NODE_PATH is ignored by ESM imports).
//
// The run fails loudly on any page error or console error, so a broken page
// can never quietly become the entry image. The PNG must be 1024x1024 and
// under 1 MiB, the competition's limits.
import { chromium } from 'playwright-core';
import { statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const entryDir = dirname(scriptsDir);
const htmlPath = join(entryDir, 'design.html');
const pngPath = join(entryDir, 'entry.png');

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-gpu-sandbox', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });

let problems = 0;
page.on('pageerror', (err) => { console.log('pageerror:', String(err).slice(0, 300)); problems += 1; });
page.on('console', (msg) => {
  if (msg.type() === 'error') { console.log('console error:', msg.text().slice(0, 200)); problems += 1; }
});

await page.goto('file://' + htmlPath, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(400);

// Overflow check: the page is a fixed 1024x1024 sheet, so anything taller
// than that would be clipped silently. Fail loudly instead.
const overflow = await page.evaluate(() => {
  const sheet = document.querySelector('.sheet');
  return { scrollH: sheet.scrollHeight, clientH: sheet.clientHeight };
});
console.log(`page height: scroll=${overflow.scrollH} client=${overflow.clientH}`);

const sheet = await page.$('.sheet');
if (!sheet) { console.log('FAIL: .sheet element not found'); process.exit(1); }
await sheet.screenshot({ path: pngPath, type: 'png' });
await browser.close();

if (overflow.scrollH > overflow.clientH) {
  console.log(`FAIL: content overflows the 1024px sheet by ${overflow.scrollH - overflow.clientH}px`);
  process.exit(1);
}
if (problems > 0) { console.log(`FAIL: ${problems} page/console error(s)`); process.exit(1); }
const bytes = statSync(pngPath).size;
console.log(`entry.png bytes=${bytes} OK (<=1 MiB)`);
if (bytes > 1048576) { console.log('FAIL: entry.png over the 1 MiB cap'); process.exit(1); }
