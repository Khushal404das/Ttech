import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { OrganizationStructuredData, WebsiteStructuredData } from '../components/StructuredData';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { ProcessSection } from '../components/ProcessSection';
import { CTASection } from '../components/CTASection';
import { RecentWorkSection } from '../components/RecentWorkSection';
import { Footer } from '../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();

  const handleOpenConsultation = () => navigate('/contact');
  const handleOpenEstimator = () => navigate('/services');
  const handleExploreStack = () => navigate('/services');

  return (
    <>
      <SEO
        title="Ttech SOLUTIONS | Web, App, SaaS & AI Development Agency"
        description="Software agency in Pakistan building fast websites, mobile apps, SaaS platforms and AI automation for clients worldwide. Fixed quotes, full code ownership."
        canonical="/"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <main className="flex-1">
        <HeroSection
          onOpenEstimator={handleOpenEstimator}
          onOpenConsultation={handleOpenConsultation}
          onExploreStack={handleExploreStack}
        />
        <StatsSection />
        <RecentWorkSection />
        <ProcessSection />
        <CTASection
          onOpenConsultation={handleOpenConsultation}
          onOpenEstimator={handleOpenEstimator}
        />
        <Footer onOpenConsultation={handleOpenConsultation} />
      </main>
    </>
  );
}
