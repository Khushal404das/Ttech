/**
 * Server entry used ONLY at build time (scripts/prerender.mjs) to turn each
 * main page into real HTML, so search engines and link previews see the
 * content and the right <title>/<meta> without running JavaScript.
 */
import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { PROJECTS } from './data/projects';
import { LANDING_PAGES } from './data/landingPages';

export { PROJECTS, LANDING_PAGES };
export { FAQ_GROUPS } from './data/faq';
export { CONTENT_UPDATED } from './data/site';

type Route = {
  path: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  /** Images on the page, listed in the sitemap for Google Images */
  images?: { src: string; title: string }[];
};

const projectImages = (p: (typeof PROJECTS)[number]) => [
  ...(p.image ? [{ src: p.image.src, title: p.image.alt }] : []),
  ...(p.gallery || []).map((g) => ({ src: g.src, title: g.alt })),
];

/** Every page to pre-render and list in sitemap.xml */
export const routes: Route[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly', images: [{ src: '/og-image.jpg', title: 'Ttech SOLUTIONS — websites, apps, SaaS and AI automation' }] },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  {
    path: '/work',
    priority: 0.9,
    changefreq: 'weekly',
    images: PROJECTS.filter((p) => p.image).map((p) => ({ src: p.image!.src, title: p.image!.alt })),
  },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/faq', priority: 0.8, changefreq: 'monthly' },
  ...LANDING_PAGES.map((p) => ({
    path: `/${p.slug}`,
    priority: 0.9,
    changefreq: 'monthly' as const,
    images: [{ src: `/og/${p.slug}.jpg`, title: p.h1 }],
  })),
  ...PROJECTS.map((p) => ({
    path: `/work/${p.slug}`,
    priority: 0.7,
    changefreq: 'monthly' as const,
    images: projectImages(p),
  })),
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
];

async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk as any));
  return Buffer.concat(chunks).toString('utf8');
}

export async function renderOnce(url: string): Promise<{ html: string; helmet: any }> {
  const helmetContext: { helmet?: any } = {};
  // prerender (unlike renderToString) waits for lazy-loaded pages to finish
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StaticRouter>
    </HelmetProvider>,
    // React normally moves any Suspense section bigger than ~12 KB into a
    // hidden "stream later" block plus a swap <script>. For static pages we
    // want everything in place, so never split.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const html = await streamToString(prelude);
  return { html, helmet: helmetContext.helmet };
}

// Render once to load lazy page chunks, then again for the final HTML, and
// refuse to ship any page that still contains streaming placeholders.
export async function render(url: string): Promise<{ html: string; helmet: any }> {
  await renderOnce(url);
  const result = await renderOnce(url);
  if (/<template\b|\$RC\(|hidden id="S:/.test(result.html)) {
    throw new Error(`Pre-render of ${url} still contains streaming placeholders`);
  }
  return result;
}
