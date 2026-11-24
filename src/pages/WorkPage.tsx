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
        title="Our Work & Projects | Ttech SOLUTIONS"
        description="Projects built by Ttech SOLUTIONS: MovieFlix (live at movieflix.stream), a hands-free social media autopilot, CIRO agentic AI automation, MCVT multi-camera vehicle tracking, the Nikkah Junction matchmaking platform and a YouTube auto-uploader."
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
