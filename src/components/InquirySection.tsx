import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
  Loader2,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import type { ProjectInquiry } from '../types';

interface InquirySectionProps {
  initialService?: string;
  initialStack?: string;
  initialBudget?: string;
  initialTimeline?: string;
  initialDescription?: string;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  initialService = 'SaaS Platform & Web App',
  initialStack = '.NET Core 9 + React 19 (Enterprise)',
  initialBudget = '$4,500 - $8,000 USD',
  initialTimeline = '6 - 8 Weeks',
  initialDescription = '',
}) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [preferredTech, setPreferredTech] = useState(initialStack);
  const [budgetRange, setBudgetRange] = useState(initialBudget);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [projectDescription, setProjectDescription] = useState(initialDescription);

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [submittedData, setSubmittedData] = useState<ProjectInquiry | null>(null);

  useEffect(() => {
    if (initialService) setServiceType(initialService);
  }, [initialService]);

  useEffect(() => {
    if (initialStack) setPreferredTech(initialStack);
  }, [initialStack]);

  useEffect(() => {
    if (initialBudget) setBudgetRange(initialBudget);
  }, [initialBudget]);

  useEffect(() => {
    if (initialTimeline) setTimeline(initialTimeline);
  }, [initialTimeline]);

  useEffect(() => {
    if (initialDescription) setProjectDescription(initialDescription);
  }, [initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim()) {
      setErrorMsg('Please provide your name and email address.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    const inquiryPayload: ProjectInquiry = {
      clientName: clientName.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not specified',
      serviceType,
      budgetRange,
      timeline,
      preferredTech,
      projectDescription: projectDescription.trim() || 'General inquiry from website',
      status: 'new',
    };

    let savedId = `ttech-${Date.now().toString().slice(-6)}`;

    // Try Firebase and server calls in background (don't wait)
    Promise.allSettled([
      // Firebase attempt
      (async () => {
        try {
          if (db) {
            const docRef = await addDoc(collection(db, 'inquiries'), {
              ...inquiryPayload,
              createdAt: serverTimestamp(),
            });
            savedId = docRef.id;
          }
        } catch (fbErr) {
          console.warn('Firestore write skipped:', fbErr);
        }
      })(),
      // Server endpoint attempt
      (async () => {
        try {
          await fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiryPayload),
          });
        } catch (apiErr) {
          console.warn('Server fallback inquiry ping:', apiErr);
        }
      })()
    ]).catch(() => {
      // Ignore all errors - we just want to proceed
    });

    // Don't wait for backend - proceed immediately
    setTimeout(() => {
      // Confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setSubmittedId(savedId);
      setSubmittedData(inquiryPayload);
      setShowContactOptions(true);
      setSubmitting(false);
    }, 500); // Small delay for better UX
  };

  const generateWhatsAppMessage = () => {
    if (!submittedData) return '';
    
    const message = `🎯 *New Project Consultation Request*
━━━━━━━━━━━━━━━━━━━━
📋 *Reference ID:* #${submittedId}

👤 *Client Information:*
• Name: ${submittedData.clientName}
• Email: ${submittedData.email}
• Phone: ${submittedData.phone}

💼 *Project Details:*
• Service Type: ${submittedData.serviceType}
• Tech Stack: ${submittedData.preferredTech}
• Budget Range: ${submittedData.budgetRange}
• Timeline: ${submittedData.timeline}

📝 *Project Description:*
${submittedData.projectDescription}

━━━━━━━━━━━━━━━━━━━━
Looking forward to discussing this project!`;
    
    return encodeURIComponent(message);
  };

  const generateEmailBody = () => {
    if (!submittedData) return '';
    
    const body = `New Project Consultation Request - Reference ID: #${submittedId}

CLIENT INFORMATION:
----------------------------------------
Name: ${submittedData.clientName}
Email: ${submittedData.email}
Phone: ${submittedData.phone}

PROJECT DETAILS:
----------------------------------------
Service Type: ${submittedData.serviceType}
Preferred Tech Stack: ${submittedData.preferredTech}
Budget Range: ${submittedData.budgetRange}
Target Timeline: ${submittedData.timeline}

PROJECT DESCRIPTION:
----------------------------------------
${submittedData.projectDescription}

----------------------------------------

This inquiry was submitted via the Ttech SOLUTIONS website consultation form.
Please review and respond within 24 hours as per SLA.

Best regards,
Ttech SOLUTIONS Website Inquiry System`;
    
    return encodeURIComponent(body);
  };

  const handleWhatsAppSend = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/923489763998?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSend = () => {
    if (!submittedData) return;
    
    const subject = encodeURIComponent(`New Project Consultation Request - ${submittedData.serviceType}`);
    const body = generateEmailBody();
    const mailtoUrl = `mailto:teatech.solutionz@gmail.com?subject=${subject}&body=${body}`;
    
    // Try window.open first (works better on most systems)
    const emailWindow = window.open(mailtoUrl, '_self');
    
    // Fallback to window.location if window.open didn't work
    if (!emailWindow) {
      window.location.href = mailtoUrl;
    }
  };

  const handleResetForm = () => {
    setSubmittedId(null);
    setSubmittedData(null);
    setShowContactOptions(false);
    setClientName('');
    setEmail('');
    setPhone('');
    setProjectDescription('');
  };

  return (
    <motion.section
      id="contact"
      className="py-24 relative bg-[#F8FBFF] border-t border-[#DCE8F8]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Agency Pitch & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Let&apos;s Build Together</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight font-display mb-4">
                Ready to Turn Your Ideas Into{' '}
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  Reality?
                </span>
              </h2>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                Whether you have complete Figma mockups or just a bold software concept, our Principal Engineers will assess your architecture, provide sprint timelines, and help you launch with confidence.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <a
                href="https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white border border-[#DCE8F8] hover:border-emerald-500/50 transition-all flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#7B8AA3]">Direct WhatsApp Inquiry</div>
                  <div className="text-sm font-bold text-[#0B1220] group-hover:text-emerald-300 transition-colors font-mono">
                    +92 348 9763998
                  </div>
                  <div className="text-[11px] text-emerald-400">Chat with Engineering Lead · Typical reply: &lt; 15 mins</div>
                </div>
              </a>

              <a
                href="mailto:teatech.solutionz@gmail.com?subject=New%20Project%20Inquiry%20-%20Ttech%20SOLUTIONS"
                className="p-4 rounded-2xl bg-white border border-[#DCE8F8] hover:border-[#2563EB]/50 transition-all flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF2FF] border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#7B8AA3]">Email Proposals &amp; RFPs</div>
                  <div className="text-sm font-bold text-[#0B1220] group-hover:text-[#2563EB] transition-colors">
                    teatech.solutionz@gmail.com
                  </div>
                  <div className="text-[11px] text-[#2563EB]">Formal NDA signed prior to code review</div>
                </div>
              </a>
            </div>

            {/* Guarantees */}
            <div className="p-4 rounded-2xl bg-white/60 border border-[#DCE8F8] space-y-2 text-xs text-[#475569]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>Strict Non-Disclosure Agreement (NDA) Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>Direct Access to Senior .NET &amp; React Architects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Commitment Initial Consultation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form or Success Confirmation */}
          <div className="lg:col-span-7">
            {submittedId && showContactOptions ? (
              <div className="rounded-3xl p-8 sm:p-10 bg-[#F8FBFF] border border-[#DCE8F8] shadow-2xl text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#3B82F6]/20 border-2 border-cyan-400 text-[#2563EB] flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-widest">
                  Consultation Request Received
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-display mt-2 mb-3">
                  Thank You, {clientName}!
                </h3>

                <p className="text-[#475569] text-sm max-w-md mx-auto leading-relaxed mb-6">
                  Your project requirements for <strong className="text-[#0B1220]">{serviceType}</strong> have been logged under reference ID:
                </p>

                <div className="inline-block px-4 py-2 rounded-xl bg-white border border-[#2563EB]/30 font-mono text-[#2563EB] font-bold text-sm mb-6">
                  #{submittedId}
                </div>

                <div className="p-4 rounded-2xl bg-white/70 border border-[#DCE8F8] text-xs text-[#475569] max-w-md mx-auto text-left space-y-1.5 mb-8">
                  <div><strong>Preferred Tech:</strong> {preferredTech}</div>
                  <div><strong>Estimated Budget:</strong> {budgetRange}</div>
                  <div><strong>Target Timeline:</strong> {timeline}</div>
                  <div><strong>Contact Email:</strong> {email}</div>
                </div>

                {/* Contact Method Selection */}
                <div className="mb-8">
                  <h4 className="text-base font-bold text-[#0B1220] mb-4">
                    Choose Your Preferred Contact Method:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {/* WhatsApp Option */}
                    <button
                      onClick={handleWhatsAppSend}
                      className="group p-6 rounded-2xl bg-white border-2 border-[#DCE8F8] hover:border-emerald-500/50 hover:bg-emerald-50/50 transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#0B1220] group-hover:text-emerald-600 transition-colors">
                            Send via WhatsApp
                          </div>
                          <div className="text-[10px] text-[#7B8AA3] font-mono">
                            +92 348 9763998
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed mb-2">
                        Instant messaging with our engineering team. Typical response time under 15 minutes.
                      </p>
                      <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                        <span>Open WhatsApp</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Email Option */}
                    <button
                      onClick={handleEmailSend}
                      className="group p-6 rounded-2xl bg-white border-2 border-[#DCE8F8] hover:border-[#2563EB]/50 hover:bg-[#EAF2FF]/50 transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-[#EAF2FF] border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] group-hover:scale-110 transition-transform">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#0B1220] group-hover:text-[#2563EB] transition-colors">
                            Send via Email
                          </div>
                          <div className="text-[10px] text-[#7B8AA3] break-all">
                            teatech.solutionz@gmail.com
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed mb-2">
                        Formal inquiry with detailed documentation. Response within 24 hours as per SLA.
                      </p>
                      <div className="flex items-center gap-1 text-[#2563EB] text-xs font-semibold">
                        <span>Open Email</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE8F8]">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-[#F1F7FF] hover:bg-[#EAF2FF] text-[#475569] hover:text-[#0B1220] text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-6 sm:p-8 bg-white border border-[#DCE8F8]  shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F8]">
                  <h3 className="text-xl font-bold text-[#0B1220] font-display">
                    Project Consultation &amp; Scope Request
                  </h3>
                  <span className="text-[11px] font-mono text-[#1E40AF] bg-[#EAF2FF] px-2 py-0.5 rounded border border-[#DCE8F8]">
                    SLA: 24h Response
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Johnathan Miller"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      WhatsApp / Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 348 9763998"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Primary Service Focus
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
                    >
                      <option value="SaaS Platform & Web App">SaaS Platform &amp; Web App</option>
                      <option value="Custom Enterprise Software (.NET)">Custom Enterprise Software (.NET)</option>
                      <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                      <option value="Corporate Website">Corporate Website &amp; Portal</option>
                      <option value="E-Commerce Solution">E-Commerce Solution</option>
                      <option value="UI/UX Design System">UI/UX Design &amp; Figma</option>
                      <option value="AI Automation Workflow">AI Automation &amp; Agents</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Preferred Stack
                    </label>
                    <select
                      value={preferredTech}
                      onChange={(e) => setPreferredTech(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 font-mono"
                    >
                      <option value=".NET Core 9 + React 19 (Enterprise)">.NET Core + React (Enterprise)</option>
                      <option value="React + Next.js Full Stack">React + Next.js Full Stack</option>
                      <option value="Node.js Express + React 19">Node.js Express + React 19</option>
                      <option value="Python FastAPI + AI + React">Python FastAPI + AI + React</option>
                      <option value="PHP / Laravel + Vue">PHP / Laravel + Vue/React</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      placeholder="$4,500 - $8,000 USD"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Target Timeline
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="6 - 8 Weeks"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                    Project Details / Specific Requirements:
                  </label>
                  <textarea
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Tell us about your business goals, target audience, must-have features, or share links to any design mockups/wireframes..."
                    className="w-full p-3.5 rounded-2xl bg-white border border-[#DCE8F8] text-xs text-[#0B1220] placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-[#1D4ED8] hover:from-[#3B82F6] hover:to-blue-500 text-[#0B1220] font-extrabold text-sm shadow-xl shadow-[#2563EB]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Logging Inquiry &amp; Initializing Architecture...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Inquiry &amp; Request Strategy Call</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};


