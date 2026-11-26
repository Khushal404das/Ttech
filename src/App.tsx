/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { lazyWithRetry } from './utils/lazyWithRetry';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import { LANDING_PAGES } from './data/landingPages';

// Home is bundled with the app so the first screen paints fast; every other
// page is split into its own chunk and only downloaded when visited.
const ServicesPage = lazyWithRetry(() => import('./pages/ServicesPage'));
const WorkPage = lazyWithRetry(() => import('./pages/WorkPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const PrivacyPage = lazyWithRetry(() => import('./pages/PrivacyPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));
const CaseStudyPage = lazyWithRetry(() => import('./pages/CaseStudyPage'));
const LandingPage = lazyWithRetry(() => import('./pages/LandingPage'));
const FaqPage = lazyWithRetry(() => import('./pages/FaqPage'));

export default function App() {
  return (
    <Routes>
      {/*
        Layout wraps all pages. It renders <Navbar> once and never unmounts it,
        so the blue indicator slides smoothly between nav links on every
        page navigation instead of snapping on re-mount.
      */}
      <Route element={<Layout />}>
        <Route path="/"         element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work"     element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/faq"      element={<FaqPage />} />
        <Route path="/privacy"  element={<PrivacyPage />} />
        <Route path="/terms"    element={<TermsPage />} />
        {/* Service landing pages for local search, e.g. /web-development-company-pakistan */}
        {LANDING_PAGES.map((page) => (
          <Route key={page.slug} path={`/${page.slug}`} element={<LandingPage page={page} />} />
        ))}
        <Route path="/404"      element={<NotFoundPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
