/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import { LANDING_PAGES } from './data/landingPages';

// Home is bundled with the app so the first screen paints fast; every other
// page is split into its own chunk and only downloaded when visited.
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

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
