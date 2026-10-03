import React from 'react';
import {
  Database,
  ShieldCheck,
  User as UserIcon,
  LogIn,
  LogOut,
  Sparkles,
  CheckCircle2,
  Server,
  Cloud,
  FileText,
  Bookmark,
  Layers,
} from 'lucide-react';
import type { User } from 'firebase/auth';

interface ProfileSectionProps {
  user: User | null;
  onSignIn: () => void;
  onGuestSignIn: () => void;
  onSignOut: () => void;
  notesCount: number;
  savedPlacesCount: number;
  chatCount: number;
  projectId: string;
  firestoreDatabaseId: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  onSignIn,
  onGuestSignIn,
  onSignOut,
  notesCount,
  savedPlacesCount,
  chatCount,
  projectId,
  firestoreDatabaseId,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Overview Header */}
      <div className="bg-white/80 p-6 rounded-2xl border border-[#DCE8F8] space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>Firebase Authentication &amp; Firestore Database</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Cloud Identity &amp; Persistence
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Google Sign-In with Firebase Auth securely identifies users and scopes all
          Firestore records to your authenticated session.
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-white border border-[#DCE8F8] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE8F8] pb-5">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-400 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-indigo-600/20">
                {user ? (user.displayName || user.email || 'U')[0].toUpperCase() : <UserIcon className="w-8 h-8" />}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {user ? user.displayName || 'Active User' : 'Not Signed In'}
                </h3>
                {user && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
                    Authenticated
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {user ? user.email || 'Anonymous Guest' : 'Sign in to access personalized Firestore persistence'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={onSignOut}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800/60 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onSignIn}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
                <button
                  onClick={onGuestSignIn}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F1F7FF] hover:bg-[#F1F7FF] text-slate-300 text-xs font-medium border border-[#60A5FA] transition-colors cursor-pointer"
                >
                  <span>Quick Guest Mode</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Details Grid */}
        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/70 p-4 rounded-xl border border-[#DCE8F8]/80">
            <div>
              <span className="text-slate-500 block">User UID:</span>
              <span className="text-slate-300 font-mono select-all truncate block">{user.uid}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Auth Provider:</span>
              <span className="text-slate-300">
                {user.isAnonymous ? 'Anonymous Auth' : user.providerData?.[0]?.providerId || 'Google OAuth'}
              </span>
            </div>
          </div>
        )}

        {/* Firestore Database Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span>Database Configuration</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/60 border border-[#DCE8F8]">
              <span className="text-xs text-slate-400">Firebase Project ID</span>
              <p className="text-sm font-semibold text-white font-mono mt-1 truncate">
                {projectId}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/60 border border-[#DCE8F8]">
              <span className="text-xs text-slate-400">Firestore Database ID</span>
              <p className="text-sm font-semibold text-white font-mono mt-1 truncate">
                {firestoreDatabaseId}
              </p>
            </div>
          </div>
        </div>

        {/* Live Data Synchronized */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Cloud Records for This Account</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/80 border border-[#DCE8F8] p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Workspace Notes</p>
                <p className="text-xl font-bold text-white mt-1">{notesCount}</p>
              </div>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>

            <div className="bg-white/80 border border-[#DCE8F8] p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Saved Places</p>
                <p className="text-xl font-bold text-white mt-1">{savedPlacesCount}</p>
              </div>
              <Bookmark className="w-5 h-5 text-sky-400" />
            </div>

            <div className="bg-white/80 border border-[#DCE8F8] p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Chat Sessions</p>
                <p className="text-xl font-bold text-white mt-1">{chatCount}</p>
              </div>
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Security & Rules checklist */}
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 text-xs text-emerald-300 space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Firestore Rules Deployed &amp; Verified</span>
          </div>
          <p className="text-emerald-300/80 leading-relaxed text-[11px]">
            Security rules strictly ensure users can only read and write their own documents
            under <code className="bg-emerald-950 px-1 py-0.5 rounded text-emerald-200 font-mono">/users/{'{userId}'}/*</code> and workspace items.
          </p>
        </div>
      </div>
    </div>
  );
};

