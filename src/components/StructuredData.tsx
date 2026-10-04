import React from 'react';
import { Helmet } from 'react-helmet-async';

export const OrganizationStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ttech SOLUTIONS",
    "alternateName": "Ttech Solutionz",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "description": "Enterprise-grade software development agency specializing in SaaS platforms, web applications, .NET Core solutions, React development, and UI/UX design.",
    "telephone": "+92-348-9763998",
    "email": "teatech.solutionz@gmail.com",
    "sameAs": [
      "https://facebook.com/Ttechsolutionz",
      "https://instagram.com/TtechSolutionz",
      "https://x.com/TtechSolutionz"
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

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export const WebsiteStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ttech SOLUTIONS",
    "url": "https://yourdomain.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://yourdomain.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
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
      "url": "https://yourdomain.com"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "name": "Global"
    },
    "url": service.url
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
