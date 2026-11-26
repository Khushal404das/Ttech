import React from 'react';
import { SOCIAL_PROFILES } from './SocialLinks';

const SITE = 'https://ttechsolutionz.dev';
export const ORG_ID = `${SITE}/#organization`;

/** JSON-LD for Google. "<" is escaped so the JSON can never close the script tag. */
export const JsonLd: React.FC<{ data: unknown }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);

/**
 * The business itself. Only verifiable facts — no ratings, reviews or
 * founding date we can't back up.
 */
export const OrganizationStructuredData: React.FC = () => (
  <JsonLd
    data={{
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: 'Ttech SOLUTIONS',
      alternateName: 'Ttech Solutionz',
      url: `${SITE}/`,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 512, height: 512 },
      image: `${SITE}/og-image.jpg`,
      description:
        'Software development agency building websites, web applications, SaaS platforms, mobile apps and AI automation for businesses in Pakistan and worldwide.',
      slogan: 'Think. Transform. Trust.',
      telephone: '+92-348-9763998',
      email: 'teatech.solutionz@gmail.com',
      priceRange: '$$',
      address: { '@type': 'PostalAddress', addressCountry: 'PK' },
      areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Place', name: 'Worldwide' }],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+92-348-9763998',
          email: 'teatech.solutionz@gmail.com',
          availableLanguage: ['English', 'Urdu'],
          url: `${SITE}/contact`,
        },
      ],
      knowsAbout: [
        'Website development',
        'Web application development',
        'SaaS development',
        'Mobile app development',
        'E-commerce development',
        'AI automation',
        'Chatbot development',
        'Computer vision',
        'UI/UX design',
      ],
      sameAs: SOCIAL_PROFILES.map((p) => p.href),
    }}
  />
);

/** The website (no SearchAction — the site has no search page). */
export const WebsiteStructuredData: React.FC = () => (
  <JsonLd
    data={{
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Ttech SOLUTIONS',
      url: `${SITE}/`,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
    }}
  />
);

/** Breadcrumb trail shown by Google under the page title, e.g. Home › Work › CIRO. */
export const BreadcrumbStructuredData: React.FC<{ items: { name: string; path: string }[] }> = ({ items }) => (
  <JsonLd
    data={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${SITE}${item.path}`,
      })),
    }}
  />
);

/** A case study as a piece of work by the agency. */
export const CaseStudyStructuredData: React.FC<{
  name: string;
  description: string;
  path: string;
  image: string;
  keywords: string[];
  sameAs?: string[];
}> = ({ name, description, path, image, keywords, sameAs }) => (
  <JsonLd
    data={{
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      description,
      url: `${SITE}${path}`,
      image: `${SITE}${image}`,
      keywords: keywords.join(', '),
      inLanguage: 'en',
      creator: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      ...(sameAs && sameAs.length ? { sameAs } : {}),
    }}
  />
);
