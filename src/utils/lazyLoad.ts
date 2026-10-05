/**
 * Lazy Loading Utilities
 * Use these utilities to optimize image and component loading
 */

/**
 * Lazy load images with intersection observer
 * Usage: Add data-src attribute to images and call this function
 */
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Preload critical resources
 */
export const preloadCriticalAssets = (assets: string[]) => {
  assets.forEach((asset) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (asset.endsWith('.js')) {
      link.as = 'script';
    } else if (asset.endsWith('.css')) {
      link.as = 'style';
    } else if (asset.match(/\.(woff|woff2|ttf)$/)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (asset.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
      link.as = 'image';
    }
    
    link.href = asset;
    document.head.appendChild(link);
  });
};

/**
 * Defer non-critical scripts
 */
export const deferNonCriticalScripts = () => {
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    newScript.src = script.getAttribute('src') || '';
    newScript.defer = true;
    script.parentNode?.replaceChild(newScript, script);
  });
};
