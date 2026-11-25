import React from 'react';
import { RefreshCw } from 'lucide-react';
import { isChunkLoadError, reloadOnceForNewBuild } from '../utils/lazyWithRetry';

interface Props {
  children: React.ReactNode;
  /** Changing this (e.g. the URL) clears the error, so navigating away works */
  resetKey: string;
}

interface State {
  error: Error | null;
}

/**
 * Catches errors while rendering a page so visitors see a friendly message
 * with a Reload button — never a blank white screen. The navbar stays usable.
 */
export class PageErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Page failed to render:', error);
    // Most often an outdated file after a new deploy: reload once automatically
    if (isChunkLoadError(error)) reloadOnceForNewBuild();
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="flex min-h-[70svh] flex-1 items-center justify-center bg-[#F8FBFF] px-4 pt-24">
        <div className="max-w-md rounded-3xl border border-[#DCE8F8] bg-white p-8 text-center shadow-sm">
          <h1 className="font-display text-2xl font-extrabold text-[#0B1220]">This page didn&apos;t load properly</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#475569]">
            It&apos;s usually a brief connection hiccup or a just-released update. Reloading fixes it.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-[#1D4ED8]"
          >
            <RefreshCw className="h-4 w-4" /> Reload page
          </button>
        </div>
      </main>
    );
  }
}
