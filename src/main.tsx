import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

// Guard against environment iframe TypeError for read-only fetch getter & websocket HMR errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    const msg = e?.message || '';
    if (
      (msg.includes('fetch') && msg.includes('getter')) ||
      msg.includes('WebSocket') ||
      msg.includes('websocket') ||
      msg.includes('closed without opened')
    ) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e?.reason;
    const msg = (reason && (reason.message || reason.stack || String(reason))) || '';
    if (
      msg.includes('WebSocket') ||
      msg.includes('websocket') ||
      msg.includes('closed without opened') ||
      msg.includes('failed to connect')
    ) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

/**
 * Keep exactly one of each SEO tag in <head>. On pre-rendered pages whose
 * code loads lazily, React adds its own <title>/<meta>/<link rel=canonical>
 * next to the pre-rendered copies instead of reusing them. The newest copy
 * (React's, always current for the page) wins; older duplicates are removed.
 */
function dedupeHeadTags() {
  const keyOf = (el: Element): string | null => {
    if (el.tagName === 'TITLE') return 'title';
    if (el.tagName === 'META') {
      const k = el.getAttribute('name') || el.getAttribute('property');
      return k ? `meta:${k}` : null;
    }
    if (el.tagName === 'LINK' && el.getAttribute('rel') === 'canonical') return 'canonical';
    return null;
  };
  const latest = new Map<string, Element>();
  for (const el of Array.from(document.head.children)) {
    const key = keyOf(el);
    if (!key) continue;
    const previous = latest.get(key);
    if (previous) previous.remove();
    latest.set(key, el);
  }
}
new MutationObserver(dedupeHeadTags).observe(document.head, { childList: true });

const container = document.getElementById('root')!;
// Production pages are pre-rendered (scripts/prerender.mjs): reuse that HTML
// instead of rebuilding it. In development the root is empty, so render fresh.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
