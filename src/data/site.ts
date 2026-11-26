/**
 * Date the service pages and case studies were last reviewed. Shown on the
 * pages ("Last updated …") and sent to search/AI engines as dateModified.
 * Update it whenever you change prices or page content.
 */
export const CONTENT_UPDATED = '2026-11-26';

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
