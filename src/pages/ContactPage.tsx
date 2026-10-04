import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { InquirySection } from '../components/InquirySection';
import { Footer } from '../components/Footer';

export default function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Accept pre-fill values from estimator / portfolio navigation state
  const state = (location.state as {
    service?: string;
    stack?: string;
    budget?: string;
    timeline?: string;
    description?: string;
  } | null) ?? {};

  const handleOpenConsultation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Contact Us | Ttech SOLUTIONS - Get a Free Consultation"
        description="Ready to build your software project? Contact Ttech SOLUTIONS for a free consultation. Expert software development, SaaS, and web application services."
        canonical="/contact"
      />
      <main className="flex-1 pt-20">
      <InquirySection
        initialService={state.service}
        initialStack={state.stack}
        initialBudget={state.budget}
        initialTimeline={state.timeline}
        initialDescription={state.description}
      />
      <Footer onOpenConsultation={handleOpenConsultation} />
    </main>
    </>
  );
}
