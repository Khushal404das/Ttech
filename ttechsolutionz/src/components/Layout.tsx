import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AnimatedBackground } from './AnimatedBackground';
import type { ActivePage } from './Navbar';

/**
 * Persistent layout wrapper.
 * The Navbar lives here — outside <Routes> — so it NEVER unmounts
 * between navigations. This keeps the smooth indicator animation alive
 * when switching pages.
 */
export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive the active nav pill from the current URL
  const activePage: ActivePage = (() => {
    const p = location.pathname;
    if (p === '/services') return 'services';
    if (p === '/work')     return 'portfolio';
    if (p === '/contact')  return 'inquiry';
    return 'home';
  })();

  const handleOpenConsultation = () => {
    navigate('/contact');
  };

  return (
    <div className="relative min-h-screen bg-[#FBFAFF] text-[#4A4A63] flex flex-col font-sans">
      {/* Single canvas background — persists across page transitions */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Single Navbar instance — never unmounts, indicator animates smoothly */}
        <Navbar
          activePage={activePage}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Page content swaps here */}
        <Outlet />
      </div>
    </div>
  );
};
