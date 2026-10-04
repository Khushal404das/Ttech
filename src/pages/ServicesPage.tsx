import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ServicesSection } from '../components/ServicesSection';
import { TechStackSection } from '../components/TechStackSection';
import { ProjectEstimatorSection } from '../components/ProjectEstimatorSection';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';
import type { AppSection } from '../types';

export default function ServicesPage() {
  const navigate = useNavigate();

  const [estimatorService, setEstimatorService] = useState('SaaS Platform & Multi-Tenant App');
  const [estimatorStack, setEstimatorStack] = useState('.NET Core 9 + React 19 (Enterprise)');

  const handleOpenConsultation = (serviceTitle?: string) => {
    navigate('/contact', { state: { service: serviceTitle } });
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setEstimatorService(serviceTitle);
    setTimeout(() => {
      const el = document.getElementById('estimator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleLockEstimate = (estimateSummary: {
    serviceType: string;
    stack: string;
    features: string[];
    urgency: string;
    budgetRange: string;
    timeline: string;
  }) => {
    navigate('/contact', {
      state: {
        service: estimateSummary.serviceType,
        stack: estimateSummary.stack,
        budget: estimateSummary.budgetRange,
        timeline: estimateSummary.timeline,
        description: `Locked Estimate Details:\n- Selected Modules: ${estimateSummary.features.join(', ')}\n- Delivery Urgency: ${estimateSummary.urgency}`,
      },
    });
  };

  const handleFAQSelectSection = (section: AppSection) => {
    if (section === 'inquiry') navigate('/contact');
    else if (section === 'portfolio') navigate('/work');
    else if (section === 'estimator') {
      const el = document.getElementById('estimator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title="Services | Ttech SOLUTIONS - Software Development & Tech Solutions"
        description="Custom software development, SaaS platforms, web applications, .NET Core enterprise solutions, UI/UX design, and AI automation services. Get a free project estimate."
        canonical="/services"
      />
      <main className="flex-1 pt-20">
      <ServicesSection
        onSelectServiceForQuote={handleSelectServiceForQuote}
        onOpenConsultation={handleOpenConsultation}
      />
      <TechStackSection
        onOpenEstimatorWithStack={(stackName) => {
          setEstimatorStack(stackName);
          setTimeout(() => {
            const el = document.getElementById('estimator');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }}
      />
      <div id="estimator">
        <ProjectEstimatorSection
          initialService={estimatorService}
          initialStack={estimatorStack}
          onLockEstimate={handleLockEstimate}
        />
      </div>
      <FAQSection
        onSelectSection={handleFAQSelectSection}
        onOpenConsultation={handleOpenConsultation}
        onOpenEstimator={() => {
          const el = document.getElementById('estimator');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <Footer onOpenConsultation={handleOpenConsultation} />
    </main>
    </>
  );
}
