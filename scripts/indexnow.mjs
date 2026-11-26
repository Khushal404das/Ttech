/**
 * Tell Bing (which powers ChatGPT search and Copilot), Yandex, Seznam and
 * other IndexNow engines that the site's pages changed, so they re-crawl
 * now instead of in days or weeks.
 *
 *   npm run indexnow        (run AFTER the new version is live)
 *
 * Reads the live sitemap and submits every URL in it. The key file in
 * public/<key>.txt proves we own the domain (it is meant to be public).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://ttechsolutionz.dev';
const HOST = 'ttechsolutionz.dev';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const keyFile = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (public/<32 hex chars>.txt) found');
const key = keyFile.replace('.txt', '');

const live = await fetch(`${SITE}/${keyFile}`);
if (!live.ok || (await live.text()).trim() !== key) {
  throw new Error(`Key file ${SITE}/${keyFile} is not live yet — deploy first, then run this again.`);
}

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(SITE));
const extra = [`${SITE}/llms.txt`, `${SITE}/llms-full.txt`];

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${keyFile}`, urlList: [...urlList, ...extra] }),
});
// 200 = accepted, 202 = accepted (key validation pending)
console.log(`IndexNow: submitted ${urlList.length + extra.length} URLs → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
