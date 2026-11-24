import React from 'react';

/** JSON-LD for Google. "<" is escaped so the JSON can never close the script tag. */
export const JsonLd: React.FC<{ data: unknown }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);

export const OrganizationStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ttech SOLUTIONS",
    "alternateName": "Ttech Solutionz",
    "url": "https://ttechsolutionz.dev",
    "logo": "https://ttechsolutionz.dev/logo.png",
    "description": "Enterprise-grade software development agency specializing in SaaS platforms, web applications, .NET Core solutions, React development, and UI/UX design.",
    "telephone": "+92-348-9763998",
    "email": "teatech.solutionz@gmail.com",
    "sameAs": [
      "https://linkedin.com/company/ttech-solutionz",
      "https://www.instagram.com/ttechsolutionz/",
      "https://www.facebook.com/profile.php?id=61594013625946",
      "https://x.com/TtechSolutionz",
      "https://www.threads.com/@ttechsolutionz",
      "https://www.tiktok.com/@ttechsolutionz"
    ],
    "priceRange": "$$",
    "serviceType": [
      "Software Development",
      "Web Application Development",
      "SaaS Platform Development",
      "UI/UX Design",
      "Enterprise Software Solutions",
      ".NET Core Development",
      "React Development",
      "AI Automation"
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "name": "Global"
    },
    "slogan": "Think. Transform. Trust.",
    "foundingDate": "2020"
  };

  // Rendered inline (not via Helmet) so it is also present in the pre-rendered HTML
  return <JsonLd data={structuredData} />;
};

export const WebsiteStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ttech SOLUTIONS",
    "url": "https://ttechsolutionz.dev",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ttechsolutionz.dev/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Rendered inline (not via Helmet) so it is also present in the pre-rendered HTML
  return <JsonLd data={structuredData} />;
};

export const ServiceStructuredData: React.FC<{ service: { name: string; description: string; url: string } }> = ({ service }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Ttech SOLUTIONS",
      "url": "https://ttechsolutionz.dev"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "name": "Global"
    },
    "url": service.url
  };

  // Rendered inline (not via Helmet) so it is also present in the pre-rendered HTML
  return <JsonLd data={structuredData} />;
};
