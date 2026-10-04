/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

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
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/404"      element={<NotFoundPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
