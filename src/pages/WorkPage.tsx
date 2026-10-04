import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
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
    <>
      <SEO
        title="Portfolio & Case Studies | Ttech SOLUTIONS"
        description="Explore our portfolio of successful software projects, SaaS platforms, enterprise applications, and UI/UX designs. Real client results and testimonials."
        canonical="/work"
      />
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
    </>
  );
}
