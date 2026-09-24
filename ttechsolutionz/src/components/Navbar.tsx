import React, { useState, useEffect } from 'react';
import { TtechLogo } from './TtechLogo';
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Code2,
  Calculator,
  Laptop,
  Layers,
  MessageSquare,
  Bot,
  PhoneCall,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { AppSection } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  onSelectSection: (section: AppSection) => void;
  onOpenEstimator: () => void;
  onOpenConsultation: () => void;
  inquiryCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  onOpenEstimator,
  onOpenConsultation,
  inquiryCount = 0,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: AppSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Laptop },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'dotnet-stack', label: '.NET & Tech', icon: Code2 },
    { id: 'estimator', label: 'Cost Estimator', icon: Calculator },
    { id: 'portfolio', label: 'Work', icon: Laptop },
    { id: 'ai-scoper', label: 'AI Scoper', icon: Bot },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (section: AppSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-cyan-950/60 shadow-2xl shadow-cyan-950/20 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <TtechLogo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center group bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            <button
              onClick={onOpenEstimator}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 text-cyan-300 border border-cyan-800/50 hover:bg-cyan-950/60 hover:border-cyan-500/60 transition-all cursor-pointer shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Quote</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Let&apos;s Build Together</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-500" />
              )}
            </button>

            <button
              onClick={onOpenConsultation}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-2 pb-5 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80 animate-in slide-in-from-top-3 duration-200">
          {/* Mobile Theme Switcher Bar */}
          <div className="flex items-center justify-between p-2.5 mb-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Appearance</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-300" />
                <span>Light</span>
              </button>
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="w-3 h-3 text-cyan-200" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                onOpenEstimator();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 border border-cyan-800/50 text-cyan-300 text-xs font-semibold"
            >
              <Calculator className="w-4 h-4" />
              <span>Project Cost Estimator</span>
            </button>
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30"
            >
              <span>Ready to Build? Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
