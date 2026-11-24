/**
 * Ttech SOLUTIONS project advisor.
 *
 * Used when Gemini is not configured or unavailable. Unlike the old keyword
 * matcher it:
 *  - matches whole words only ("help" no longer triggers the IP answer),
 *  - reads the WHOLE conversation, so it remembers the project type, budget
 *    and timeline the visitor already gave,
 *  - guides the visitor step by step (what → features → budget → timeline →
 *    contact) and always ends with one clear next step.
 *
 * Also exports the server-side system prompt used for Gemini so both paths
 * give the same facts.
 */

export type ChatTurn = { role: string; content: string };

/* ------------------------------------------------------------------ */
/* Company facts — single source of truth                              */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  whatsappUrl: 'https://wa.me/923489763998',
  phone: '+92 348 9763998',
  email: 'teatech.solutionz@gmail.com',
};

interface ProjectType {
  id: string;
  label: string;
  /** whole-word / phrase patterns */
  patterns: RegExp[];
  price: string;
  weeks: string;
  features: string[];
  question: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'restaurant',
    label: 'restaurant / food ordering platform',
    patterns: [/\b(restaurant|resturant|cafe|café|food|menu|table booking|reservation|takeaway|delivery app|bakery|hotel)\b/],
    price: '$2,500 – $6,500',
    weeks: '4–7 weeks',
    features: ['Online menu with categories & add-ons', 'Online ordering with cart & checkout', 'Table reservations', 'Admin panel for orders, menu & prices', 'WhatsApp / SMS order notifications'],
    question: 'Do you need online ordering with delivery, table reservations, or both?',
  },
  {
    id: 'ecommerce',
    label: 'e-commerce store',
    patterns: [/\b(e-?commerce|online (store|shop)|shop|store|marketplace|sell (products|online)|cart|checkout|shopify|woocommerce)\b/],
    price: '$3,500 – $7,500',
    weeks: '5–8 weeks',
    features: ['Product catalog with search & filters', 'Cart, checkout & payment gateway (Stripe / JazzCash / Easypaisa)', 'Order tracking & customer accounts', 'Admin dashboard for stock, orders & discounts', 'SEO-ready, fast mobile pages'],
    question: 'Roughly how many products will you sell, and which payment methods do you need?',
  },
  {
    id: 'mobile',
    label: 'mobile app',
    patterns: [/\b(mobile app|app for (android|ios|iphone)|android|ios|iphone app|flutter|react native|play store|app store)\b/],
    price: '$5,000 – $12,000',
    weeks: '6–10 weeks',
    features: ['iOS + Android from one codebase (React Native / Flutter)', 'User sign-up & login', 'Push notifications', 'Admin web panel', 'Play Store & App Store publishing'],
    question: 'What is the main thing users will do in the app?',
  },
  {
    id: 'saas',
    label: 'SaaS platform',
    patterns: [/\b(saas|subscription (app|platform|software)|multi-?tenant|software as a service)\b/],
    price: '$3,500 – $6,500 for an MVP, $7,000 – $18,000+ for a full platform',
    weeks: '4–8 weeks for an MVP',
    features: ['User accounts, teams & roles', 'Subscription billing (Stripe)', 'Core feature module(s)', 'Admin & analytics dashboard', 'Secure cloud hosting with backups'],
    question: 'What problem does your SaaS solve, and who are the users?',
  },
  {
    id: 'business-software',
    label: 'custom business software (ERP / CRM / dashboard)',
    patterns: [/\b(erp|crm|inventory|pos|point of sale|dashboard|portal|management system|hr system|payroll|billing system|accounting|internal tool|automation)\b/],
    price: '$4,000 – $15,000+',
    weeks: '6–12 weeks',
    features: ['Role-based staff access', 'Records, workflows & approvals', 'Reports & dashboards', 'Excel / PDF export', 'Integrations with your existing tools'],
    question: 'Which process do you want to manage (e.g. inventory, sales, HR), and how many staff will use it?',
  },
  {
    id: 'education',
    label: 'education / LMS platform',
    patterns: [/\b(school|college|university|lms|e-?learning|online course|courses|academy|students?|tuition)\b/],
    price: '$3,500 – $9,000',
    weeks: '5–9 weeks',
    features: ['Student & teacher portals', 'Courses, video lessons & quizzes', 'Attendance & results', 'Fee payments', 'Parent notifications'],
    question: 'Is it for a school (students, attendance, results) or for selling online courses?',
  },
  {
    id: 'healthcare',
    label: 'healthcare / clinic system',
    patterns: [/\b(clinic|hospital|doctor|patient|pharmacy|medical|healthcare|appointment|telemedicine|dental)\b/],
    price: '$4,000 – $12,000',
    weeks: '6–10 weeks',
    features: ['Online appointment booking', 'Patient records', 'Doctor schedules', 'Prescriptions & billing', 'Secure, privacy-compliant data storage'],
    question: 'Do you mainly need appointment booking, patient records, or a full clinic management system?',
  },
  {
    id: 'realestate',
    label: 'real estate platform',
    patterns: [/\b(real estate|property|properties|rental|housing|plots?|agency listings)\b/],
    price: '$3,000 – $8,000',
    weeks: '5–8 weeks',
    features: ['Property listings with photos & maps', 'Search by location, price & type', 'Agent / owner dashboards', 'Inquiry & lead capture', 'Featured listings'],
    question: 'Will owners/agents post listings themselves, or will only your team add properties?',
  },
  {
    id: 'ai',
    label: 'AI / chatbot solution',
    patterns: [/\b(ai|chatbot|chat bot|gpt|gemini|machine learning|ml|automation bot|ai agent|llm)\b/],
    price: '$2,500 – $10,000+',
    weeks: '3–8 weeks',
    features: ['AI chatbot trained on your business info', 'Website / WhatsApp integration', 'Document or data Q&A', 'Workflow automation', 'Admin view of conversations'],
    question: 'What should the AI do — answer customer questions, automate a task, or analyse data?',
  },
  {
    id: 'website',
    label: 'business website',
    patterns: [/\b(website|web site|landing page|portfolio|company site|business site|wordpress|webpage|web page|blog)\b/],
    price: '$1,500 – $3,500',
    weeks: '3–4 weeks',
    features: ['Modern, mobile-responsive design', 'Pages: Home, About, Services, Contact', 'Contact form & WhatsApp button', 'Basic SEO & Google Analytics', 'Fast hosting setup'],
    question: 'What is the website for (your business type), and roughly how many pages do you need?',
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const has = (text: string, re: RegExp) => re.test(text);

function detectProject(text: string): ProjectType | undefined {
  const found = PROJECT_TYPES.find((p) => p.patterns.some((re) => re.test(text)));
  if (found) return found;
  // Generic wording
  if (/\b(web app|web application|web portal|web platform)\b/.test(text)) return PROJECT_TYPES.find((p) => p.id === 'saas');
  if (/\b(apps?|application)\b/.test(text)) return PROJECT_TYPES.find((p) => p.id === 'mobile');
  return undefined;
}

function extractBudget(text: string): string | undefined {
  const m =
    text.match(/(\$|usd|rs\.?|pkr)\s?\d[\d,.]*\s?(k|lakh|lac)?/i) ||
    text.match(/\d[\d,.]*\s?(k|lakh|lac|dollars|usd|pkr|rupees)\b/i);
  return m ? m[0].trim() : undefined;
}

function extractTimeline(text: string): string | undefined {
  const m = text.match(/\b(\d+\s?(day|days|week|weeks|month|months))\b|\b(asap|urgent|next month|this month)\b/i);
  return m ? m[0].trim() : undefined;
}

const contactBlock = () =>
  `• **WhatsApp:** [${CONTACT.phone}](${CONTACT.whatsappUrl})\n• **Email:** ${CONTACT.email}\n• **Project form:** [Contact page](/contact) — we reply with a proposal within 24 hours`;

/* ------------------------------------------------------------------ */
/* Intents (checked on the latest message, whole words only)           */
/* ------------------------------------------------------------------ */

const INTENT = {
  greeting: /^(hi+|hello|hey|hiya|salam|salaam|assalam(u| o)?alaikum|aoa|good (morning|afternoon|evening))\b/,
  thanks: /\b(thanks|thank you|thx|shukriya|jazakallah|great|perfect|awesome)\b/,
  bye: /\b(bye|goodbye|see you|that'?s all|no thanks)\b/,
  price: /\b(cost|costs|price|prices|pricing|quote|quotation|budget|how much|charges?|fees?|rates?|expensive|cheap|affordable|estimate)\b/,
  timeline: /\b(how long|timeline|time ?frame|deadline|duration|deliver(y|ed)?|when (can|will)|how many (weeks|days|months)|turnaround)\b/,
  process: /\b(process|how (do|does|to) (we |you |i )?(start|begin|work|proceed)|steps?|get started|start a project|next step|roadmap|guide me|guidance|what do you need|how it works|onboarding)\b/,
  payment: /\b(payment terms|payment plan|how (do|can|should) (i|we) pay|advance payment|installments?|milestone payments?|deposit|invoice)\b/,
  stack: /\b(tech stack|stack|technolog(y|ies)|framework|language|\.net|asp\.net|c#|react|next\.?js|node|python|django|laravel|php|database|postgres|sql|mongodb|hosting|cloud|aws|azure)\b/,
  ownership: /\b(source code|code ownership|own the code|ownership|intellectual property|ip rights|copyright|github|repo(sitory)?)\b/,
  support: /\b(support|maintenance|warranty|bugs?|after launch|post-?launch|updates?)\b/,
  contact: /\b(contact|whatsapp|phone|call|email|reach|talk to (a |someone|human|person)|meeting|consultation|hire|speak)\b/,
  portfolio: /\b(portfolio|previous work|past (work|projects)|examples?|case stud(y|ies)|clients|samples?|demo)\b/,
  services: /\b(services|what do you (do|offer|build)|what can you (do|build)|offerings)\b/,
  location: /\b(where are you|located|location|office|country|pakistan|timezone|time zone)\b/,
  seo: /\b(seo|google ranking|rank on google|marketing|ads)\b/,
  redesign: /\b(redesign|revamp|update my (website|site|app)|existing (website|site|app)|improve my)\b/,
};

/* ------------------------------------------------------------------ */
/* Main entry                                                          */
/* ------------------------------------------------------------------ */

export function advisorReply(history: ChatTurn[]): string {
  const userTurns = history.filter((m) => m.role === 'user').map((m) => String(m.content || ''));
  const last = (userTurns[userTurns.length - 1] || '').trim();
  const q = last.toLowerCase();
  const all = userTurns.join(' \n ').toLowerCase();

  // What we know from the whole conversation
  const project = detectProject(q) || detectProject(all);
  const budget = extractBudget(all);
  const timeline = extractTimeline(all);
  const wordCount = q.split(/\s+/).filter(Boolean).length;

  // --- Small talk ---------------------------------------------------
  if (has(q, INTENT.greeting) && wordCount <= 4) {
    return `👋 **Hi! Welcome to Ttech SOLUTIONS.**

I'm your **AI technology consultant**. I'll help you choose the right solution, plan the features, and estimate cost and timeline.

**What would you like to build?** For example:
• A business website
• An online store
• A mobile app
• A SaaS or custom business software (CRM, inventory, school or clinic system)

Just describe your idea in a sentence or two.`;
  }

  if (has(q, INTENT.bye) && wordCount <= 5) {
    return `Thanks for chatting with Ttech SOLUTIONS! 👋 Whenever you're ready, reach us here:\n\n${contactBlock()}`;
  }

  if (has(q, INTENT.thanks) && wordCount <= 5) {
    return project
      ? `You're welcome! 😊 Want me to put together the next step for your **${project.label}**? You can leave your number on the **Fast Callback** tab, or message us on [WhatsApp](${CONTACT.whatsappUrl}) for a free consultation.`
      : `You're welcome! 😊 Is there anything else you'd like to know — pricing, timelines, or how we start a project?`;
  }

  // --- Specific questions (answer, then tie back to their project) ---
  // Visitor is GIVING a budget for a known project → continue the guided flow below
  const statingBudget = Boolean(project && extractBudget(q));

  if (!statingBudget && (has(q, INTENT.price) || has(q, INTENT.payment))) {
    const paymentInfo = `**How payment works:** 30% to start (after design & plan approval) → 40% at the mid-project demo → 30% at launch, when you receive the full source code. No hidden fees.`;
    if (project) {
      return `💰 **Estimated cost for your ${project.label}**

• **Typical range:** ${project.price}
• **Typical delivery:** ${project.weeks}

The final price depends on the number of features, design complexity and integrations.${budget ? ` You mentioned a budget of **${budget}** — we'll shape the scope to fit it.` : ''}

${paymentInfo}

**To give you an exact quote:** ${project.question}`;
    }
    return `💰 **Ballpark pricing**

• **Business website:** $1,500 – $3,500 · 3–4 weeks
• **E-commerce store:** $3,500 – $7,500 · 5–8 weeks
• **Mobile app (iOS + Android):** $5,000 – $12,000 · 6–10 weeks
• **SaaS MVP:** $3,500 – $6,500 · 4–8 weeks
• **Custom business software:** $4,000 – $15,000+ · 6–12 weeks

${paymentInfo}

**What are you planning to build?** Tell me a little about it and I'll narrow the estimate down.`;
  }

  const statingTimeline = Boolean(project && extractTimeline(q) && !/\b(how long|when)\b/.test(q));
  if (!statingTimeline && has(q, INTENT.timeline)) {
    return `⏱️ **Timeline${project ? ` for your ${project.label}` : ''}**

${project ? `A typical ${project.label} project takes **${project.weeks}**.` : `Most websites take **3–4 weeks**, apps and SaaS MVPs **4–10 weeks**, and larger platforms **8–12+ weeks**.`}${timeline ? ` You mentioned **${timeline}** — tell us if that's a hard deadline and we'll plan the scope around it.` : ''}

**How we deliver:**
1. **Discovery (2–5 days):** requirements, features & fixed quote
2. **Design (1–2 weeks):** clickable Figma design for your approval
3. **Development:** 2-week sprints, with a live demo link after each sprint
4. **Launch:** deployment, testing & handover + 30-day free bug-fix warranty

${project ? project.question : 'What would you like to build?'}`;
  }

  if (has(q, INTENT.process)) {
    return `🗺️ **How to start a project with Ttech**

1. **Tell us your idea** — here in chat, on [WhatsApp](${CONTACT.whatsappUrl}), or via the [Contact page](/contact).
2. **Free consultation call (30 min)** — we understand your goals and suggest the best approach.
3. **Proposal & fixed quote** — features, timeline and price in writing, within 24 hours.
4. **Design** — you approve the screens before we write code.
5. **Build in 2-week sprints** — you see live progress after every sprint.
6. **Launch & handover** — you get 100% of the source code + 30 days of free support.

${project ? `For your **${project.label}**, the first thing we need to know: ${project.question}` : `**To begin: what would you like to build?**`}`;
  }

  if (has(q, INTENT.ownership)) {
    return `🔒 **You own everything.** After the final payment you receive 100% of the source code, designs, database and accounts (GitHub, hosting, domain). No lock-in — you can continue with us or any other team.\n\n${project ? project.question : 'What are you planning to build?'}`;
  }

  if (has(q, INTENT.support)) {
    return `🛡️ **Support after launch**

• **30 days of free bug fixes** after every launch
• Optional monthly maintenance plans: updates, security patches, backups, small changes and monitoring

${project ? `Would you like maintenance included in the quote for your ${project.label}?` : 'What would you like us to build or maintain?'}`;
  }

  if (has(q, INTENT.contact)) {
    return `📞 **Talk to our team**

${contactBlock()}

You can also use the **Fast Callback** tab at the top of this chat — leave your name and number and we'll call you.`;
  }

  if (has(q, INTENT.portfolio)) {
    return `📂 You can see our recent projects on the [Work page](/work) — websites, SaaS dashboards, e-commerce and mobile apps.

${project ? `If you'd like examples similar to your **${project.label}**, message us on [WhatsApp](${CONTACT.whatsappUrl}) and we'll share relevant demos.` : 'What kind of project are you planning? I can point you to similar work.'}`;
  }

  if (has(q, INTENT.location)) {
    return `🌍 Ttech SOLUTIONS is based in **Pakistan** and works with clients worldwide. We work remotely with regular video calls, WhatsApp updates and live demo links, and we adjust meeting times to your time zone.\n\n${project ? project.question : 'What would you like to build?'}`;
  }

  if (has(q, INTENT.seo)) {
    return `📈 Every site we build is **SEO-ready**: fast loading, mobile-friendly, proper titles & meta tags, sitemap, Google Search Console and Analytics setup. Ongoing SEO content and ad campaigns can be added as a monthly service.\n\n${project ? project.question : 'Do you already have a website, or do you need a new one?'}`;
  }

  if (has(q, INTENT.redesign)) {
    return `🔧 Yes — we redesign and improve existing websites and apps: modern design, faster speed, mobile responsiveness, and new features, while keeping your content and SEO.

**Please share:**
1. Your current website / app link
2. What you don't like about it now
3. Any new features you want`;
  }

  if (has(q, INTENT.stack)) {
    return `🛠️ **Technologies we use**

• **Websites & web apps:** React, Next.js, TypeScript
• **Backends & APIs:** ASP.NET Core (.NET), Node.js
• **Mobile:** React Native / Flutter (iOS + Android)
• **Databases:** PostgreSQL, SQL Server, Firebase
• **Hosting:** AWS, Azure, Google Cloud, Vercel

We pick the stack that fits your budget and growth plans — you don't need to know the tech; we'll recommend it.

${project ? project.question : 'What are you planning to build?'}`;
  }

  if (has(q, INTENT.services)) {
    return `🧩 **What we build**

• Business websites & landing pages
• E-commerce stores
• Mobile apps (iOS + Android)
• SaaS platforms
• Custom business software — CRM, ERP, inventory, school, clinic systems
• AI chatbots & automation
• UI/UX design

**Which of these is closest to what you need?**`;
  }

  // --- Visitor described (or is describing) a project ---------------
  if (project) {
    const isNewMention = detectProject(q)?.id === project.id;
    const asked = history.filter((m) => m.role !== 'user').map((m) => String(m.content || '')).join('\n');

    // First time they mention it → recommend features + ask the key question
    if (isNewMention && !asked.includes(`for your ${project.label}`) && !asked.includes(`**${project.label}**`)) {
      return `👍 **Good choice — ${/^[aeiou]/i.test(project.label) ? 'an' : 'a'} ${project.label}.** Based on similar projects, I'd recommend starting with:

${project.features.map((f) => `• ${f}`).join('\n')}

**Typical cost:** ${project.price} · **Delivery:** ${project.weeks}

To plan it properly: **${project.question}**`;
    }

    // They're answering our questions → move to the next missing detail
    if (!budget) {
      return `Got it, thanks! 📝 That helps a lot for your **${project.label}**.

**Do you have a budget range in mind?** (For this type of project it is usually ${project.price}.) If you're not sure, that's fine — we can suggest a version that fits.`;
    }
    if (!timeline) {
      return `Thanks! With a budget of **${budget}** we can plan the right scope for your **${project.label}**.

**When would you like to launch?** (Typical delivery: ${project.weeks}.)`;
    }
    return `✅ **Here's a summary of your project**

• **Project:** ${project.label}
• **Budget:** ${budget}
• **Timeline:** ${timeline}

**Next step:** let's get you a written proposal with exact features and a fixed price (free, within 24 hours):

${contactBlock()}

Or tap **"Send chat to project form"** above the chat box — your conversation is copied into the form automatically.`;
  }

  // --- Unknown / off-topic ---------------------------------------------
  return `I'm Ttech's AI technology consultant — I help businesses plan the right software solution. 🙂

I can answer questions like:
• "How much does a website / app cost?"
• "How long will my project take?"
• "How do we get started?"

**What would you like to build?** Describe your idea and I'll suggest features, a budget range and a timeline. For anything else, our team is on [WhatsApp](${CONTACT.whatsappUrl}).`;
}

/* ------------------------------------------------------------------ */
/* Gemini system prompt (server-side, not taken from the browser)      */
/* ------------------------------------------------------------------ */

export const SYSTEM_PROMPT = `# Role
You are "Ttech AI Consultant" — a senior technology consultant at Ttech SOLUTIONS ("Think. Transform. Trust."), a software agency based in Pakistan serving clients worldwide. You think like an experienced solutions architect and business consultant: you understand the client's business goal first, then recommend the right solution, explain trade-offs honestly, and give a clear plan.

# Language
- Always reply in clear, professional English, even if the visitor writes in another language. If they write in another language, answer in simple English that is easy to understand.

# How you consult
1. Understand: ask focused discovery questions — one or two at a time — about the business, target users, the problem to solve, must-have features, budget and timeline.
2. Advise: give expert recommendations, not just facts. Suggest the right type of solution (e.g. website vs web app vs mobile app), an MVP scope (what to build first vs later), a suitable tech approach in plain language, and point out risks or things they may have missed (payments, admin panel, hosting, security, SEO, maintenance).
3. Estimate: give realistic ballpark cost and timeline ranges from the price guide below, explaining what makes it cheaper or more expensive.
4. Next step: once you understand the project, summarise it (goal, key features, recommended approach, budget, timeline) and invite them to a free consultation / written proposal via WhatsApp, email, the Contact page (/contact), or the "Send chat to project form" button in this chat.

# Style
- Professional, confident and warm — like a trusted consultant, not a salesperson.
- Concise: usually under 160 words. Use short paragraphs and markdown bullets; bold key numbers. Avoid jargon unless the visitor is technical.
- End every reply with ONE clear question or next step.

# Boundaries
- Stay on software, technology and business-digitalisation topics. Politely redirect anything unrelated back to their project.
- Never invent clients, case studies, discounts, guarantees or prices outside the guide below. If unsure, say the team will confirm in the proposal.
- Never ask for passwords or payment details in chat.

# Company facts
- Services: business websites, e-commerce stores, mobile apps (iOS + Android), SaaS platforms, custom business software (CRM, ERP, inventory, school, clinic systems), AI chatbots & automation, UI/UX design.
- Technology: React, Next.js, TypeScript, ASP.NET Core (.NET), Node.js, React Native / Flutter, PostgreSQL, SQL Server, Firebase, AWS / Azure / Google Cloud.
- Price guide (USD): business website $1,500–3,500 (3–4 weeks); e-commerce $3,500–7,500 (5–8 weeks); mobile app $5,000–12,000 (6–10 weeks); SaaS MVP $3,500–6,500 (4–8 weeks), full SaaS $7,000–18,000+; custom business software $4,000–15,000+ (6–12 weeks). Final price is a fixed quote after discovery.
- Payments: 30% at start, 40% at mid-project demo, 30% at launch. No hidden fees.
- Process: free consultation → written proposal within 24 hours → design approval → 2-week sprints with live demos → launch.
- Client owns 100% of the source code, designs and accounts. 30 days of free bug fixes after launch; optional monthly maintenance plans.
- Contact: WhatsApp ${CONTACT.phone} (${CONTACT.whatsappUrl}), email ${CONTACT.email}, Contact page /contact. Past work: /work.`;
