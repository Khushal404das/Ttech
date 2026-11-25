import { lazy, type ComponentType } from 'react';

const RELOAD_KEY = 'ttech_chunk_reload_at';

/** True for the errors browsers throw when a code-split file can't be loaded. */
export function isChunkLoadError(error: unknown): boolean {
  const msg = String((error as any)?.message || error || '');
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk|Expected a JavaScript.*MIME type|is not a valid JavaScript MIME type/i.test(
    msg,
  );
}

/**
 * Reload the page once to pick up the newest build. A timestamp in
 * sessionStorage prevents a reload loop if the files are really gone.
 */
export function reloadOnceForNewBuild(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 30_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // storage blocked: still try one reload
  }
  window.location.reload();
  return true;
}

/**
 * React.lazy with recovery. When a page's code file fails to load — a flaky
 * connection, or an old page asking for files replaced by a newer deploy —
 * it retries once, then reloads the page once to get the current build.
 */
export function lazyWithRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (firstError) {
      await new Promise((r) => setTimeout(r, 600));
      try {
        return await factory();
      } catch (error) {
        if (typeof window !== 'undefined' && isChunkLoadError(error) && reloadOnceForNewBuild()) {
          // Keep showing the loading state while the page reloads
          return new Promise<never>(() => {});
        }
        throw error;
      }
    }
  });
}
