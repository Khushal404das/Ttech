import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileCheck, CheckCircle2, ShieldAlert, Award, Calendar, Mail, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

export default function TermsPage() {
  const lastUpdated = 'October 5, 2026';

  return (
    <>
      <SEO
        title="Terms and Conditions | Ttech SOLUTIONS"
        description="Review the terms and conditions for custom software development, SaaS platform engineering, sprint deliverables, and IP ownership with Ttech SOLUTIONS."
        canonical="/terms"
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
              <FileCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Commercial Terms</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] font-display tracking-tight mb-4">
              Terms & Conditions
            </h1>
            <p className="text-sm text-[#475569] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <span>Effective Date: {lastUpdated}</span>
            </p>
          </div>

          {/* Terms Body */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DCE8F8] shadow-sm space-y-10 text-[#475569] text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                1. Engagement Overview & Scope of Work
              </h2>
              <p className="mb-3">
                These Terms and Conditions govern the software development, engineering, architecture, design, and consulting services provided by <strong>Ttech SOLUTIONS</strong> (&quot;Agency&quot;, &quot;we&quot;, &quot;us&quot;) to our clients (&quot;Client&quot;, &quot;you&quot;).
              </p>
              <p>
                Each project begins with an agreed-upon Statement of Work (SOW) or written project specification detailing deliverables, estimated sprint timelines, milestones, and commercial investment. Any modifications to agreed scopes are executed via mutual written consent or structured change requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#2563EB]" />
                2. 100% Intellectual Property (IP) Ownership
              </h2>
              <p className="mb-3">
                We believe in absolute client ownership with zero vendor lock-in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Upon settlement of milestone invoices, <strong>100% of the custom source code</strong>, database schemas, API contracts, Figma vector files, and project assets become the exclusive property of the Client.
                </li>
                <li>
                  We transfer full administrative rights to your GitHub, GitLab, or cloud accounts (Azure, AWS, GCP) immediately upon project completion.
                </li>
                <li>
                  We do not charge recurring proprietary licensing fees for custom software authored for your organization.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                3. Milestone Billing & Payment Terms
              </h2>
              <p className="mb-3">
                Unless explicitly stated otherwise in an individual SOW, our standard milestone billing schedule is:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>30% Kickoff Deposit:</strong> Due upon contract signing prior to architectural discovery and wireframing.</li>
                <li><strong>40% Mid-Point Milestone:</strong> Due upon functional staging demonstration of core user flows.</li>
                <li><strong>30% Final Release:</strong> Due upon User Acceptance Testing (UAT) completion prior to production deployment and repository handover.</li>
              </ul>
              <p className="mt-3">
                Invoices are payable within 7 business days via bank wire, ACH, or major credit cards. Third-party cloud infrastructure charges (such as Azure hosting, database instances, or domain fees) are billed directly to the Client.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                4. 30-Day Post-Launch Warranty
              </h2>
              <p className="mb-3">
                Every project delivered by Ttech SOLUTIONS includes a <strong>complimentary 30-day post-launch warranty period</strong> commencing on the formal deployment date:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will fix any verifiable bugs, regressions, or system crashes originating from delivered code at highest priority with zero additional charges.</li>
                <li>The warranty does not cover issues resulting from unauthorized third-party code tampering, server outages caused by hosting providers, or new feature requests outside the original SOW.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                5. Client Responsibilities & Timely Reviews
              </h2>
              <p>
                To maintain sprint velocity and meet delivery commitments, the Client agrees to provide timely feedback, required API credentials, and approvals within 3 to 5 business days of sprint reviews. Delays in client feedback may lead to adjusted deployment timelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3 flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-[#2563EB]" />
                6. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall Ttech SOLUTIONS be liable for indirect, incidental, punitive, or consequential damages resulting from lost profits, business interruption, or data loss. Our aggregate liability arising under any project agreement shall not exceed the total fees paid by the Client to Ttech SOLUTIONS for the specific work order in dispute.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                7. Governing Law & Dispute Resolution
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with standard international commercial law. Parties agree to seek amicable resolution through good-faith mediation before initiating formal arbitration proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] font-display mb-3">
                8. Contact Information
              </h2>
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
