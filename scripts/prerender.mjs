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
// Static hosts (Cloudflare Pages, Netlify) serve 404.html with a real 404
// status for unknown URLs. Without it they answer EVERY missing file —
// including old script files after a deploy — with the home page, which
// broke page loading. The app shell shows the site's own "not found" page.
// The 404 page must never be indexed by search engines
fs.writeFileSync(
  path.join(dist, '404.html'),
  template.replace('</head>', `    <meta name="robots" content="noindex" />
  </head>`),
);

const { render, routes, PROJECTS, LANDING_PAGES } = await import(pathToFileURL(ssrEntry).href);

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

  // "/" → dist/index.html, "/services" → dist/services.html.
  // Hosts (Cloudflare, Express below) serve services.html at /services with
  // no trailing-slash redirect, matching the canonical URLs.
  const outFile = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  const title = (headTags.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  console.log(`prerendered ${route.padEnd(10)} ${(page.length / 1024).toFixed(0).padStart(4)} KB  ${title}`);
}

// sitemap.xml generated from the same route list, so it never goes stale.
// Includes <image:image> entries so screenshots can appear in Google Images.
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);
let imageCount = 0;
const urls = routes
  .map((r) => {
    const images = (r.images || [])
      .map((img) => {
        imageCount++;
        return `
    <image:image>
      <image:loc>${SITE_URL}${xml(img.src)}</image:loc>
      <image:title>${xml(img.title)}</image:title>
    </image:image>`;
      })
      .join('');
    return `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>${images}
  </url>`;
  })
  .join(`
`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${routes.length} URLs, ${imageCount} images`);

// llms.txt — a plain-text guide to the site for AI assistants and AI search
// (ChatGPT, Perplexity, Google AI Overviews). Proposed standard: llmstxt.org
const llms = `# Ttech SOLUTIONS

> Software development agency (Think. Transform. Trust.) based in Pakistan, working with clients worldwide. We build business websites, e-commerce stores, mobile apps, SaaS platforms, custom business software and AI automation. Fixed written quotes, milestone payments (30/40/30), 100% source-code ownership and 30 days of free bug fixes after launch.

Contact: WhatsApp +92 348 9763998 · teatech.solutionz@gmail.com · ${SITE_URL}/contact

## Services

${LANDING_PAGES.map((p) => `- [${p.h1}](${SITE_URL}/${p.slug}): ${p.seoDescription} Typical investment ${p.pricing.range}, ${p.pricing.timeline}.`).join(`
`)}
- [All services](${SITE_URL}/services)

## Case studies

${PROJECTS.map((p) => `- [${p.title}](${SITE_URL}/work/${p.slug}): ${p.tagline} Built with ${p.technologies.join(', ')}.`).join(`
`)}

## Company

- [Home](${SITE_URL}/)
- [Work](${SITE_URL}/work)
- [Contact / free 30-minute consultation](${SITE_URL}/contact)
- [Privacy policy](${SITE_URL}/privacy)
- [Terms and conditions](${SITE_URL}/terms)
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
console.log(`llms.txt: ${LANDING_PAGES.length} services, ${PROJECTS.length} case studies`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
