/**
 * Company FAQ — written for people AND AI answer engines (ChatGPT,
 * Perplexity, Google AI Overviews): every answer opens with the direct
 * answer (a number, yes/no or timeframe), then explains. Facts and prices
 * match chat-advisor.ts and src/data/landingPages.ts — keep them in sync.
 */
export interface FaqItem {
  q: string;
  a: string;
  /** Optional internal link to read more */
  link?: { label: string; href: string };
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQ_UPDATED = '2026-11-26';

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'About Ttech SOLUTIONS',
    items: [
      {
        q: 'What is Ttech SOLUTIONS?',
        a: 'Ttech SOLUTIONS is a software development agency based in Pakistan that builds websites, e-commerce stores, mobile apps, SaaS platforms, custom business software and AI automation for clients in Pakistan and worldwide. Its motto is "Think. Transform. Trust."',
      },
      {
        q: 'Where is Ttech SOLUTIONS located?',
        a: 'Ttech SOLUTIONS is based in Pakistan and works remotely with clients worldwide. Projects run over video calls, WhatsApp updates and live demo links, with meetings scheduled in the client\'s time zone.',
      },
      {
        q: 'What services does Ttech SOLUTIONS offer?',
        a: 'Ttech SOLUTIONS offers business websites, e-commerce stores, Android and iOS apps, SaaS platforms, custom business software (CRM, ERP, inventory, school and clinic systems), AI chatbots and automation, computer vision, and UI/UX design.',
        link: { label: 'All services', href: '/services' },
      },
      {
        q: 'What technologies does Ttech SOLUTIONS use?',
        a: 'Ttech SOLUTIONS mainly uses React, Next.js and TypeScript for web, ASP.NET Core (.NET) and Node.js for back ends, React Native or Flutter for mobile apps, PostgreSQL, SQL Server and Firebase for data, and AWS, Azure, Google Cloud, Vercel or Cloudflare for hosting. For AI work it uses Python, n8n, Gemini and Groq models.',
      },
    ],
  },
  {
    title: 'Pricing & payments',
    items: [
      {
        q: 'How much does a website cost with Ttech SOLUTIONS?',
        a: 'A professional business website costs $1,500 – $3,500 and takes 3–4 weeks. The exact price is a fixed written quote based on the number of pages, design and features such as booking or online payments.',
        link: { label: 'Web development', href: '/web-development-company-pakistan' },
      },
      {
        q: 'How much does a mobile app cost?',
        a: 'A mobile app for both Android and iOS costs $5,000 – $12,000 and takes 6–10 weeks. One React Native or Flutter codebase serves both platforms, which keeps the cost lower than building two separate apps.',
        link: { label: 'Mobile app development', href: '/mobile-app-development-pakistan' },
      },
      {
        q: 'How much does an e-commerce store cost?',
        a: 'An online store costs $3,500 – $7,500 and takes 5–8 weeks, including product catalogue, cart, checkout with JazzCash, Easypaisa, cards or cash on delivery, and an admin dashboard.',
        link: { label: 'E-commerce development', href: '/ecommerce-website-development' },
      },
      {
        q: 'How much does a SaaS platform or custom software cost?',
        a: 'A SaaS MVP costs $3,500 – $6,500 (4–8 weeks) and a full SaaS platform $7,000 – $18,000+. Custom business software such as a CRM, ERP or inventory system costs $4,000 – $15,000+ and takes 6–12 weeks.',
      },
      {
        q: 'How much does AI automation or a chatbot cost?',
        a: 'AI automation and chatbot projects cost $2,500 – $10,000+ and take 3–8 weeks. A single chatbot or automation sits at the lower end; multi-step AI systems and computer vision cost more.',
        link: { label: 'AI & automation', href: '/ai-automation-services' },
      },
      {
        q: 'How do payments work?',
        a: 'Payments are split into three milestones: 30% to start, 40% at the mid-project demo and 30% at launch. There are no hidden fees — the price is agreed in a written quote before work begins.',
      },
    ],
  },
  {
    title: 'Process & timelines',
    items: [
      {
        q: 'How do I start a project with Ttech SOLUTIONS?',
        a: 'Start with a free 30-minute consultation call. Within 24 hours you receive a written proposal with features, timeline and a fixed price; after approval the team designs the screens, builds in two-week sprints with live demos, then launches.',
        link: { label: 'Book a free call', href: '/contact' },
      },
      {
        q: 'How long does it take to build a website or app?',
        a: 'A business website takes 3–4 weeks, an online store 5–8 weeks, a SaaS MVP 4–8 weeks and a mobile app 6–10 weeks. Larger platforms take 8–12+ weeks.',
      },
      {
        q: 'Will I see progress during the project?',
        a: 'Yes. Ttech SOLUTIONS works in two-week sprints and shares a live demo link after each sprint, so you can test the real product as it is built and give feedback early.',
      },
    ],
  },
  {
    title: 'Ownership & support',
    items: [
      {
        q: 'Do I own the source code?',
        a: 'Yes — clients own 100% of the source code, designs, database and accounts (domain, hosting, GitHub) after the final payment. There is no vendor lock-in.',
      },
      {
        q: 'What support do I get after launch?',
        a: 'Every project includes 30 days of free bug fixes after launch. Optional monthly maintenance plans cover updates, security patches, backups, monitoring and small changes.',
      },
      {
        q: 'Can Ttech SOLUTIONS redesign or improve an existing website?',
        a: 'Yes. Ttech SOLUTIONS redesigns existing websites and apps — modern design, faster loading, mobile responsiveness and new features — while keeping your content and search rankings.',
      },
    ],
  },
  {
    title: 'Contact',
    items: [
      {
        q: 'How can I contact Ttech SOLUTIONS?',
        a: 'Contact Ttech SOLUTIONS on WhatsApp at +92 348 9763998, by email at teatech.solutionz@gmail.com, or through the contact form at ttechsolutionz.dev/contact. Proposals are sent within 24 hours.',
        link: { label: 'Contact page', href: '/contact' },
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
