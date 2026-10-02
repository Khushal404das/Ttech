/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ProjectEstimatorSection } from './components/ProjectEstimatorSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CTASection } from './components/CTASection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import type { AppSection } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('home');

  const [estimatorService, setEstimatorService] = useState<string>('SaaS Platform & Multi-Tenant App');
  const [estimatorStack, setEstimatorStack] = useState<string>('.NET Core 9 + React 19 (Enterprise)');

  const [inquiryService, setInquiryService] = useState<string>('SaaS Platform & Web App');
  const [inquiryStack, setInquiryStack] = useState<string>('.NET Core 9 + React 19 (Enterprise)');
  const [inquiryBudget, setInquiryBudget] = useState<string>('$4,500 - $8,000 USD');
  const [inquiryTimeline, setInquiryTimeline] = useState<string>('6 - 8 Weeks');
  const [inquiryDescription, setInquiryDescription] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 96;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  const handleSelectSection = (section: AppSection) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'services') {
      scrollToSection('services');
    } else if (section === 'dotnet-stack') {
      scrollToSection('dotnet-stack');
    } else if (section === 'estimator') {
      scrollToSection('estimator');
    } else if (section === 'portfolio') {
      scrollToSection('portfolio');
    } else if (section === 'ai-scoper') {
      scrollToSection('ai-scoper');
    } else if (section === 'testimonials') {
      scrollToSection('testimonials');
    } else if (section === 'faq') {
      scrollToSection('faq');
    } else if (section === 'inquiry') {
      scrollToSection('contact');
    }
  };

  const handleOpenConsultation = (serviceTitle?: string) => {
    if (serviceTitle) {
      setInquiryService(serviceTitle);
    }
    setActiveSection('inquiry');
    scrollToSection('contact');
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setEstimatorService(serviceTitle);
    setInquiryService(serviceTitle);
    setActiveSection('estimator');
    scrollToSection('estimator');
  };

  const handleLockEstimate = (estimateSummary: {
    serviceType: string;
    stack: string;
    features: string[];
    urgency: string;
    budgetRange: string;
    timeline: string;
  }) => {
    setInquiryService(estimateSummary.serviceType);
    setInquiryStack(estimateSummary.stack);
    setInquiryBudget(estimateSummary.budgetRange);
    setInquiryTimeline(estimateSummary.timeline);
    setInquiryDescription(
      `Locked Estimate Details:\n- Selected Modules: ${estimateSummary.features.join(', ')}\n- Delivery Urgency: ${estimateSummary.urgency}`
    );
    setActiveSection('inquiry');
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 flex flex-col font-sans">
      {/* Global canvas particle background */}
      <AnimatedBackground />

      {/* Everything above canvas */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Navbar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Main Content */}
        <main className="flex-1">
          {/* 1. Hero — full screen with typewriter + parallax */}
          <HeroSection
            onOpenEstimator={() => {
              setActiveSection('estimator');
              scrollToSection('estimator');
            }}
            onOpenConsultation={() => handleOpenConsultation()}
            onExploreStack={() => {
              setActiveSection('dotnet-stack');
              scrollToSection('dotnet-stack');
            }}
          />

          {/* 2. Animated stats counters */}
          <StatsSection />

          {/* 3. Services */}
          <ServicesSection
            onSelectServiceForQuote={handleSelectServiceForQuote}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 4. How we work — process timeline */}
          <ProcessSection />

          {/* 5. Project estimator */}
          <ProjectEstimatorSection
            initialService={estimatorService}
            initialStack={estimatorStack}
            onLockEstimate={handleLockEstimate}
          />

          {/* 6. Portfolio */}
          <PortfolioSection
            onSelectProjectForConsultation={(projName) => handleOpenConsultation(projName)}
          />

          {/* 7. CTA banner */}
          <CTASection
            onOpenConsultation={() => handleOpenConsultation()}
            onOpenEstimator={() => { setActiveSection('estimator'); scrollToSection('estimator'); }}
          />

          {/* 8. Testimonials carousel */}
          <TestimonialsSection />

          {/* 9. Contact inquiry */}
          <InquirySection
            initialService={inquiryService}
            initialStack={inquiryStack}
            initialBudget={inquiryBudget}
            initialTimeline={inquiryTimeline}
            initialDescription={inquiryDescription}
          />
        </main>

        {/* Footer */}
        <Footer
          onSelectSection={handleSelectSection}
          onOpenConsultation={() => handleOpenConsultation()}
        />
      </div>
    </div>
  );
}
