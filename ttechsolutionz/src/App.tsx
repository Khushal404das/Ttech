/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BannerShowcase } from './components/BannerShowcase';
import { TechLogosMarquee } from './components/TechLogosMarquee';
import { ServicesSection } from './components/ServicesSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectEstimatorSection } from './components/ProjectEstimatorSection';
import { AIScoperSection } from './components/AIScoperSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { QuickChatFAB } from './components/QuickChatFAB';
import type { AppSection, AIScopeResult } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('home');

  // Pre-fill states for the quote estimator and contact form
  const [estimatorService, setEstimatorService] = useState<string>('SaaS Platform & Multi-Tenant App');
  const [estimatorStack, setEstimatorStack] = useState<string>('.NET Core 9 + React 19 (Enterprise)');

  // Contact form initial states
  const [inquiryService, setInquiryService] = useState<string>('SaaS Platform & Web App');
  const [inquiryStack, setInquiryStack] = useState<string>('.NET Core 9 + React 19 (Enterprise)');
  const [inquiryBudget, setInquiryBudget] = useState<string>('$4,500 - $8,000 USD');
  const [inquiryTimeline, setInquiryTimeline] = useState<string>('6 - 8 Weeks');
  const [inquiryDescription, setInquiryDescription] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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

  const handleOpenEstimatorWithStack = (stackName: string) => {
    setEstimatorStack(stackName);
    setInquiryStack(stackName);
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

  const handleApplyScopeToInquiry = (scope: AIScopeResult) => {
    setInquiryService(scope.projectName);
    setInquiryStack(scope.recommendedArchitecture.backend + ' + ' + scope.recommendedArchitecture.frontend);
    setInquiryBudget(scope.ballparkCostRange);
    setInquiryTimeline(scope.estimatedDuration);
    setInquiryDescription(
      `AI Architecture Scope Recommendation:\n- Frontend: ${scope.recommendedArchitecture.frontend}\n- Backend: ${scope.recommendedArchitecture.backend}\n- Database: ${scope.recommendedArchitecture.database}\n- Security: ${scope.recommendedArchitecture.security}\n- Key Modules: ${scope.keyModules.map(m => m.title).join(', ')}`
    );
    setActiveSection('inquiry');
    scrollToSection('contact');
  };

  const handleQuickChatTransfer = (data: {
    service?: string;
    stack?: string;
    budget?: string;
    timeline?: string;
    description?: string;
  }) => {
    if (data.service) setInquiryService(data.service);
    if (data.stack) setInquiryStack(data.stack);
    if (data.budget) setInquiryBudget(data.budget);
    if (data.timeline) setInquiryTimeline(data.timeline);
    if (data.description) setInquiryDescription(data.description);
    setActiveSection('inquiry');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 flex flex-col font-sans">
      {/* Top Fixed Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenEstimator={() => {
          setActiveSection('estimator');
          scrollToSection('estimator');
        }}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive Laptop/Mobile Simulator */}
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

        {/* Master Panoramic Cyber Banner Showcase (Inspired by WhatsApp & Agency Banners) */}
        <BannerShowcase
          onStartProject={() => handleOpenConsultation('Full-Stack Digital Transformation')}
          onExploreServices={() => {
            setActiveSection('services');
            scrollToSection('services');
          }}
        />

        {/* Core Services Section from Banners */}
        <ServicesSection
          onSelectServiceForQuote={handleSelectServiceForQuote}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Full-Stack Technology Suite with Infinite Marquee & Official Logos */}
        <TechLogosMarquee />

        {/* .NET Core & Modern Polyglot Tech Stack Explorer */}
        <TechStackSection
          onOpenEstimatorWithStack={handleOpenEstimatorWithStack}
        />

        {/* Interactive Cost & Timeline Estimator */}
        <ProjectEstimatorSection
          initialService={estimatorService}
          initialStack={estimatorStack}
          onLockEstimate={handleLockEstimate}
        />

        {/* Featured Case Studies & Portfolio */}
        <PortfolioSection
          onSelectProjectForConsultation={(projName) => handleOpenConsultation(projName)}
        />

        {/* AI-Powered Project Scoper & Technical Architecture Advisor */}
        <AIScoperSection
          onApplyScopeToInquiry={handleApplyScopeToInquiry}
        />

        {/* Client Reviews & Agency Trust Guarantees */}
        <TestimonialsSection />

        {/* Frequently Asked Questions (Development Process, Pricing & Support) Accordion */}
        <FAQSection
          onSelectSection={handleSelectSection}
          onOpenConsultation={handleOpenConsultation}
          onOpenEstimator={() => {
            setActiveSection('estimator');
            scrollToSection('estimator');
          }}
        />

        {/* Interactive Consultation Form connected to Firestore */}
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

      {/* Floating Action Button & Real-Time Quick Chat Modal */}
      <QuickChatFAB
        onTransferToInquiry={handleQuickChatTransfer}
        onOpenEstimator={(stack) => handleOpenEstimatorWithStack(stack || '.NET Core 9 + React 19 (Enterprise)')}
      />
    </div>
  );
}
