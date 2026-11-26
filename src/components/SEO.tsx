import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://ttechsolutionz.dev';
const SITE_NAME = 'Ttech SOLUTIONS';
const DEFAULT_OG_IMAGE = '/og-image.jpg';

interface SEOProps {
  title?: string;
  description?: string;
  /** Path of this page, e.g. "/services" (used for canonical + og:url) */
  canonical?: string;
  /** 1200×630 JPG/PNG for link previews (see scripts/generate-og-images.py) */
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Per-page <head> tags: title, description, canonical, robots, Open Graph
 * (Facebook, WhatsApp, LinkedIn) and X/Twitter cards. Pre-rendered at build
 * time, so crawlers and link previews see them without running JavaScript.
 */
export const SEO: React.FC<SEOProps> = ({
  title = 'Ttech SOLUTIONS | Software, SAAS, Web & UI/UX Development Agency',
  description = 'Ttech SOLUTIONS - Think. Transform. Trust. Modern, fast, secure custom software, web applications, SaaS, .NET enterprise solutions, UI/UX designs, and AI automation.',
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogType = 'website',
  noindex = false,
}) => {
  const url = canonical ? `${SITE_URL}${canonical === '/' ? '/' : canonical}` : `${SITE_URL}/`;
  const image = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const imageAlt = ogImageAlt || title;
  const isJpg = /\.jpe?g$/i.test(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <link rel="canonical" href={url} />

      {/* Open Graph — Facebook, WhatsApp, LinkedIn */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      {isJpg && <meta property="og:image:type" content="image/jpeg" />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TtechSolutionz" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};
