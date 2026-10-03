import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { ProcessSection } from '../components/ProcessSection';
import { CTASection } from '../components/CTASection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Footer } from '../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();

  const handleOpenConsultation = () => navigate('/contact');
  const handleOpenEstimator = () => navigate('/services');
  const handleExploreStack = () => navigate('/services');

  return (
    <main className="flex-1">
      <HeroSection
        onOpenEstimator={handleOpenEstimator}
        onOpenConsultation={handleOpenConsultation}
        onExploreStack={handleExploreStack}
      />
      <StatsSection />
      <ProcessSection />
      <CTASection
        onOpenConsultation={handleOpenConsultation}
        onOpenEstimator={handleOpenEstimator}
      />
      <TestimonialsSection />
      <Footer onOpenConsultation={handleOpenConsultation} />
    </main>
  );
}
