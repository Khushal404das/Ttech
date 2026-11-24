/**
 * Pre-render the main pages to static HTML after `vite build`.
 *
 * For each route it renders the React app on the server and writes
 * dist/<route>/index.html containing:
 *   - the page's own <title>, description, Open Graph & canonical tags in <head>
 *   - the full page content inside <div id="root">
 * The browser then "hydrates" that HTML (see src/main.tsx) instead of
 * starting from an empty page. Unknown URLs get dist/app-shell.html.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const SITE_URL = 'https://ttechsolutionz.dev';

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html has no empty <div id="root"></div> — was it already pre-rendered?');
}

// Plain SPA shell for any URL we did not pre-render (e.g. the 404 page)
fs.writeFileSync(path.join(dist, 'app-shell.html'), template);

const { render, routes } = await import(pathToFileURL(ssrEntry).href);

// React 19 emits <title>/<meta>/<link> from react-helmet-async first in the output
const HEAD_TAGS = /^(?:<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)+/;

// Default tags in index.html that each page replaces with its own
const stripDefaults = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, '');

for (const { path: route } of routes) {
  const { html } = await render(route);
  const headMatch = html.match(HEAD_TAGS);
  const headTags = headMatch ? headMatch[0] : '';
  const body = html.slice(headTags.length);

  if (!headTags.includes('<title')) throw new Error(`No <title> rendered for ${route}`);
  if (body.length < 2000) throw new Error(`Suspiciously little content rendered for ${route}`);

  const page = stripDefaults(template)
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outDir = route === '/' ? dist : path.join(dist, route.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), page);
  const title = (headTags.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  console.log(`prerendered ${route.padEnd(10)} ${(page.length / 1024).toFixed(0).padStart(4)} KB  ${title}`);
}

// sitemap.xml generated from the same route list, so it never goes stale
const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join(`
`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${routes.length} URLs`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
