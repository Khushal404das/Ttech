import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BreadcrumbStructuredData } from '../components/StructuredData';
import { PortfolioSection } from '../components/PortfolioSection';
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
        title="Our Work & Projects | Ttech SOLUTIONS"
        description="Case studies from Ttech SOLUTIONS: MovieFlix, a social media autopilot, CIRO AI agents, MCVT vehicle tracking, Nikkah Junction and a weather app."
        canonical="/work"
      />
      <BreadcrumbStructuredData items={[{ name: 'Work', path: '/work' }]} />
      <main className="flex-1 pt-20">
      <PortfolioSection
        onSelectProjectForConsultation={(projName) => handleOpenConsultation(projName)}
      />
      <CTASection
        onOpenConsultation={handleOpenConsultation}
        onOpenEstimator={() => navigate('/services')}
      />
      <Footer onOpenConsultation={handleOpenConsultation} />
    </main>
    </>
  );
}
