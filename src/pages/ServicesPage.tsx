import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BreadcrumbStructuredData } from '../components/StructuredData';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectEstimatorSection } from '../components/ProjectEstimatorSection';
import { AIConsultantSection } from '../components/AIConsultantSection';
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

  const handleTransferToInquiry = (data: {
    service?: string;
    stack?: string;
    budget?: string;
    timeline?: string;
    description?: string;
  }) => {
    navigate('/contact', { state: data });
  };

  return (
    <>
      <SEO
        title="Services: Websites, Apps, SaaS & AI | Ttech SOLUTIONS"
        description="Websites, e-commerce, mobile apps, SaaS platforms, custom business software, UI/UX design and AI automation. Get a free project estimate."
        canonical="/services"
      />
      <BreadcrumbStructuredData items={[{ name: 'Services', path: '/services' }]} />
      <main className="flex-1 pt-20">
      <ServicesSection
        onSelectServiceForQuote={handleSelectServiceForQuote}
        onOpenConsultation={handleOpenConsultation}
      />
      <ProjectEstimatorSection
        initialService={estimatorService}
        initialStack={estimatorStack}
        onLockEstimate={handleLockEstimate}
      />
      <AIConsultantSection
        onOpenConsultation={handleOpenConsultation}
        onTransferToInquiry={handleTransferToInquiry}
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
