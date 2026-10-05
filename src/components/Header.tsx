import React, { useState } from 'react';
import {
  LayoutDashboard,
  BotMessageSquare,
  MapPin,
  FileText,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  LogIn,
  LogOut,
  Database,
  ChevronDown,
} from 'lucide-react';
import type { AppSection } from '../types';
import type { User } from 'firebase/auth';

interface HeaderProps {
  activeSection: AppSection;
  onSelectSection: (section: AppSection) => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  notesCount: number;
  savedPlacesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  user,
  onSignIn,
  onSignOut,
  notesCount,
  savedPlacesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: Array<{
    id: AppSection;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
  }> = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'chat',
      label: 'Gemini Chat',
      icon: BotMessageSquare,
      badge: 'AI',
    },
    {
      id: 'maps',
      label: 'Maps Discovery',
      icon: MapPin,
      badge: savedPlacesCount > 0 ? savedPlacesCount : undefined,
    },
    {
      id: 'notes',
      label: 'Workspace Notes',
      icon: FileText,
      badge: notesCount > 0 ? notesCount : undefined,
    },
    {
      id: 'profile',
      label: 'Database & Auth',
      icon: Database,
    },
  ];

  const handleNavClick = (section: AppSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white  border-b border-[#DCE8F8] text-[#0B1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-[#2563EB]/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-[#0B1220]" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  OmniHub
                </span>
                <span className="hidden sm:inline-block ml-1.5 text-xs font-medium px-1.5 py-0.5 rounded bg-indigo-950 text-[#2563EB] border border-indigo-800/60">
                  AI Suite
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Menu (Switching using internal component state) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-xl border border-[#DCE8F8]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-[#0B1220] shadow-md shadow-indigo-600/30'
                      : 'text-[#7B8AA3] hover:text-[#475569] hover:bg-[#F1F7FF]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B1220]' : 'text-[#7B8AA3]'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full font-semibold ${
                        isActive
                          ? 'bg-indigo-700/80 text-[#0B1220] border border-indigo-400/40'
                          : 'bg-[#F1F7FF] text-[#475569] border border-[#60A5FA]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Auth & Profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F1F7FF] text-[#475569] transition-colors cursor-pointer border border-[#DCE8F8]"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/40"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-purple-600 flex items-center justify-center text-xs font-bold text-[#0B1220]">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden lg:inline-block text-xs font-medium max-w-[110px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#7B8AA3]" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-[#DCE8F8] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#DCE8F8]">
                      <p className="text-xs font-semibold text-[#475569] truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-[#7B8AA3] truncate">{user.email || 'Guest user'}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('profile');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#475569] hover:bg-[#F1F7FF] flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#7B8AA3]" />
                      Account & Firestore
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[#0B1220] text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#7B8AA3] hover:text-[#0B1220] hover:bg-[#F1F7FF] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DCE8F8] bg-white/95 px-4 pt-3 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-[#0B1220]'
                    : 'text-[#475569] hover:bg-[#F1F7FF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F7FF] text-[#475569] border border-[#60A5FA]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

