import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Eye, Server, Mail, Phone, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

export default function PrivacyPage() {
  const lastUpdated = 'October 5, 2026';

  return (
    <>
      <SEO
        title="Privacy Policy | Ttech SOLUTIONS"
        description="Read the Ttech SOLUTIONS Privacy Policy. Learn how we handle your data, protect client confidentiality, and adhere to global data security standards."
        canonical="/privacy"
      />
      <main className="flex-1 pt-24 pb-16 bg-[#F8FBFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE8F8] shadow-sm mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EAF2FF] border border-[#DCE8F8] text-[#2563EB] text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Trust & Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] font-display tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-[#475569] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <span>Last updated: {lastUpdated}</span>
            </p>
          </div>

          {/* Policy Content */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE8F8] shadow-sm space-y-10 text-[#475569] text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3 flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-[#2563EB]" />
                1. Information We Collect
              </h2>
              <p className="mb-3">
                At Ttech SOLUTIONS, we value your privacy and are committed to protecting the confidential information of our clients, prospective partners, and website visitors. We collect only the information necessary to provide software engineering and technical consulting services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-[#0B1220]">Inquiry Information:</strong> When you request a consultation, project estimate, or architectural proposal, we collect your name, email address, phone number, project specifications, and budget parameters.
                </li>
                <li>
                  <strong className="text-[#0B1220]">Technical & Usage Data:</strong> We may collect anonymous browser metadata, operating system details, device type, and referring URLs to optimize page performance and user experience.
                </li>
                <li>
                  <strong className="text-[#0B1220]">Client Project Assets:</strong> Source code, wireframes, database schemas, and architectural briefs shared under signed Non-Disclosure Agreements (NDAs).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3 flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-[#2563EB]" />
                2. How We Use Your Information
              </h2>
              <p className="mb-3">
                Your data is strictly utilized for professional engineering engagements:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reviewing project requirements and preparing architectural estimates.</li>
                <li>Communicating sprint milestones, status updates, and deliverables.</li>
                <li>Executing client contracts and issuing itemized invoices.</li>
                <li>Protecting our infrastructure against automated spam, abuse, and unauthorized access.</li>
              </ul>
              <p className="mt-3">
                We never sell, rent, monetize, or disclose your personal contact information to third-party marketing brokers or advertising networks.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3 flex items-center gap-2.5">
                <Server className="w-5 h-5 text-[#2563EB]" />
                3. Client Code & Intellectual Property Confidentiality
              </h2>
              <p>
                All proprietary software specifications, database models, business logic, and codebases shared with Ttech SOLUTIONS remain your exclusive property. We operate under strict mutual Non-Disclosure Agreements (NDAs). Our engineering teams adhere to secure coding standards, using encrypted Git repositories and least-privilege cloud access controls.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                4. Cookies and Analytical Tracking
              </h2>
              <p className="mb-3">
                Our website uses minimal, privacy-conscious cookies solely to remember user preferences (such as theme and navigation state) and evaluate aggregate website telemetry:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-[#0B1220]">Essential Cookies:</strong> Required for secure session persistence, CSRF protection, and form delivery.
                </li>
                <li>
                  <strong className="text-[#0B1220]">Analytical Cookies:</strong> Used only with your consent to gather anonymous metrics on page load times and user interaction patterns.
                </li>
              </ul>
              <p className="mt-3">
                You can manage or disable cookies at any time via your browser settings or our cookie preference banner.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                5. Data Retention & Your Rights (GDPR & CCPA)
              </h2>
              <p className="mb-3">
                Depending on your jurisdiction, you have statutory rights concerning your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to request access to the personal data we hold about you.</li>
                <li>The right to request rectification of inaccurate contact details.</li>
                <li>The right to request permanent deletion of your inquiry data from our records.</li>
                <li>The right to restrict or object to the processing of your data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                6. Contact Our Privacy & Security Officer
              </h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your data rights, please contact our team directly:
              </p>
              <div className="p-6 rounded-2xl bg-[#F8FBFF] border border-[#DCE8F8] space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#2563EB]" />
                  <a
                    href="mailto:teatech.solutionz@gmail.com"
                    className="font-medium text-[#2563EB] hover:underline"
                  >
                    teatech.solutionz@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2563EB]" />
                  <a
                    href="tel:+923489763998"
                    className="font-medium text-[#2563EB] hover:underline"
                  >
                    +92 348 9763998
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer onOpenConsultation={() => window.location.assign('/contact')} />
    </>
  );
}
