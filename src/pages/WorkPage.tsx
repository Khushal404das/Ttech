import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioSection } from '../components/PortfolioSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export default function WorkPage() {
  const navigate = useNavigate();

  const handleOpenConsultation = (serviceTitle?: string) => {
    navigate('/contact', { state: { service: serviceTitle } });
  };

  return (
    <main className="flex-1 pt-20">
      <PortfolioSection
        onSelectProjectForConsultation={(projName) => handleOpenConsultation(projName)}
      />
      <TestimonialsSection />
      <CTASection
        onOpenConsultation={handleOpenConsultation}
        onOpenEstimator={() => navigate('/services')}
      />
      <Footer onOpenConsultation={handleOpenConsultation} />
    </main>
  );
}
