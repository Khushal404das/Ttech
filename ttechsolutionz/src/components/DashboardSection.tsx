import React from 'react';
import {
  BotMessageSquare,
  MapPin,
  FileText,
  Database,
  ArrowRight,
  Sparkles,
  Compass,
  Zap,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';
import type { AppSection } from '../types';
import type { User } from 'firebase/auth';

interface DashboardSectionProps {
  onSelectSection: (section: AppSection) => void;
  user: User | null;
  onSignIn: () => void;
  notesCount: number;
  savedPlacesCount: number;
  chatCount: number;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  onSelectSection,
  user,
  onSignIn,
  notesCount,
  savedPlacesCount,
  chatCount,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Workspace Integrated Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              OmniHub
            </span>
            {user ? `, ${user.displayName || 'User'}` : ''}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Switch effortlessly between workspaces using the header navigation menu above.
            Equipped with multi-turn Gemini AI reasoning, Google Maps grounding, and real-time
            Firestore persistence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectSection('chat')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <BotMessageSquare className="w-4 h-4" />
              <span>Launch Gemini Chat</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onSelectSection('maps')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Explore Places Grounding</span>
            </button>
          </div>
        </div>

        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Sync Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Saved Places</p>
            <p className="text-2xl font-bold text-white mt-1">{savedPlacesCount}</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Synced in Firestore
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-sky-400" />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Workspace Notes</p>
            <p className="text-2xl font-bold text-white mt-1">{notesCount}</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Live Realtime Sync
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Chat Turns</p>
            <p className="text-2xl font-bold text-white mt-1">{chatCount}</p>
            <p className="text-[11px] text-indigo-400 mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Gemini 3.5 &amp; 3.1
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <BotMessageSquare className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Firebase Auth Status</p>
            <p className="text-sm font-semibold text-white mt-2 truncate max-w-[130px]">
              {user ? (user.displayName || 'Signed In') : 'Not Connected'}
            </p>
            <button
              onClick={user ? () => onSelectSection('profile') : onSignIn}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 underline mt-1 block cursor-pointer"
            >
              {user ? 'Manage account' : 'Sign in with Google'}
            </button>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Interactive Section Launchpads */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>Application Workspaces</span>
          <span className="text-xs font-normal text-slate-400">(Switch anytime via the top header)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Chatbot */}
          <div
            onClick={() => onSelectSection('chat')}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BotMessageSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Gemini Chatbot
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                  Multi-Turn
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Maintain conversational threads with specialized AI roles (Speedy, General,
                Deep Architect) and custom system instructions.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Open Chat Interface</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Maps Grounding */}
          <div
            onClick={() => onSelectSection('maps')}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-sky-400" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  Maps Discovery
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60">
                  Maps Grounding
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Discover places, restaurants, and landmarks with real-time Google Maps grounding
                using gemini-3.5-flash with live links and review snippets.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-sky-400 group-hover:text-sky-300">
              <span>Explore Locations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Notes & Persistence */}
          <div
            onClick={() => onSelectSection('notes')}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Workspace Notes
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                  Firestore Sync
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Organize thoughts, place summaries, and AI reasoning. Changes sync instantly
                to your cloud database for permanent persistence.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
              <span>View Your Notes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
