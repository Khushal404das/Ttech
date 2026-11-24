/**
 * Service landing pages aimed at specific Google searches
 * (e.g. "web development company in Pakistan"). Each page has its own
 * unique copy, pricing, FAQ and related case studies — no duplicated text.
 * Prices match the price guide used by the AI consultant (chat-advisor.ts).
 */

export interface LandingPage {
  slug: string;
  /** Short name for menus and internal links */
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Who this is for */
  idealFor: string[];
  includesTitle: string;
  includes: { title: string; text: string }[];
  whyUs: string[];
  pricing: { range: string; timeline: string; note: string };
  faq: { q: string; a: string }[];
  relatedProjects: string[];
  /** Pre-filled service on the contact form */
  contactService: string;
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'web-development-company-pakistan',
    navLabel: 'Web Development in Pakistan',
    seoTitle: 'Web Development Company in Pakistan | Ttech SOLUTIONS',
    seoDescription:
      'Ttech SOLUTIONS is a web development company in Pakistan building fast, mobile-friendly business websites and web apps with React and Next.js. Fixed quotes, 100% code ownership.',
    eyebrow: 'Web development · Pakistan',
    h1: 'Web Development Company in Pakistan',
    intro:
      'We design and build fast, mobile-friendly websites and web applications for businesses in Pakistan and abroad. You talk directly to the developers building your project, get a fixed written quote, and own 100% of the code when we hand it over.',
    idealFor: [
      'Businesses that need a professional website that brings in enquiries',
      'Startups that need a web app or MVP built properly the first time',
      'Companies replacing a slow or outdated website',
      'Overseas clients who want a reliable remote team in Pakistan',
    ],
    includesTitle: 'What you get',
    includes: [
      { title: 'Custom design', text: 'A modern design made for your brand — not a recycled template — approved by you before development starts.' },
      { title: 'Fast on every phone', text: 'Responsive layouts and optimised images, so your site loads quickly on mobile data across Pakistan.' },
      { title: 'Found on Google', text: 'Clean page titles, descriptions, sitemap and pre-rendered pages so search engines can read every page.' },
      { title: 'Leads straight to you', text: 'Contact forms, WhatsApp buttons and enquiries delivered to your email.' },
      { title: 'Easy to update', text: 'Edit your own content, or let us handle updates on a simple monthly plan.' },
      { title: 'Secure hosting setup', text: 'HTTPS, backups and deployment on reliable hosting, set up for you.' },
    ],
    whyUs: [
      'Fixed written quote within 24 hours — no hidden fees',
      'Pay in milestones: 30% to start, 40% at the demo, 30% at launch',
      'Live demo links every two weeks so you see progress',
      '100% source-code ownership and 30 days of free bug fixes',
    ],
    pricing: {
      range: '$1,500 – $3,500',
      timeline: '3–4 weeks for a business website',
      note: 'Web apps and larger platforms are quoted after a free consultation.',
    },
    faq: [
      {
        q: 'How much does a website cost in Pakistan?',
        a: 'A professional business website with us typically costs $1,500 – $3,500 depending on the number of pages, design complexity and features such as booking or online payments. You get a fixed written quote before any work starts.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'Most business websites take 3–4 weeks: about a week for design, then development, testing and launch. Web apps usually take 4–8 weeks for a first version.',
      },
      {
        q: 'Do you work with clients outside Pakistan?',
        a: 'Yes. We work remotely with clients worldwide through video calls, WhatsApp updates and live demo links, and we schedule meetings in your time zone.',
      },
      {
        q: 'Will I own the website and its code?',
        a: 'Yes. After the final payment you receive 100% of the source code, designs and accounts — domain, hosting and GitHub — with no lock-in.',
      },
    ],
    relatedProjects: ['movieflix', 'nikkah-junction'],
    contactService: 'Business Website',
  },
  {
    slug: 'restaurant-website-development',
    navLabel: 'Restaurant Websites',
    seoTitle: 'Restaurant Website & Online Ordering Development | Ttech SOLUTIONS',
    seoDescription:
      'Restaurant website development with online menus, online ordering, table reservations and WhatsApp orders. Cut delivery-app commissions. Fixed quotes from Ttech SOLUTIONS.',
    eyebrow: 'Restaurants · cafés · cloud kitchens',
    h1: 'Restaurant Website & Online Ordering Development',
    intro:
      'Take orders and table bookings directly on your own website instead of paying commission on every order to delivery apps. We build restaurant websites with a mouth-watering menu, simple online ordering and reservations that customers can use in seconds on their phone.',
    idealFor: [
      'Restaurants paying high commissions to delivery apps',
      'Cafés and bakeries that want online pre-orders and pickups',
      'Cloud kitchens that need their own ordering website',
      'Restaurants that take reservations by phone and want to automate it',
    ],
    includesTitle: 'Built for restaurants',
    includes: [
      { title: 'Digital menu', text: 'Categories, photos, prices, add-ons and spicy/vegetarian labels — easy for you to update.' },
      { title: 'Online ordering', text: 'Cart and checkout for delivery or pickup, with cash on delivery or online payment.' },
      { title: 'Table reservations', text: 'Customers choose a date, time and party size; you confirm with one tap.' },
      { title: 'Order alerts', text: 'New orders arrive instantly by WhatsApp or SMS, plus an admin screen for the kitchen.' },
      { title: 'Admin panel', text: 'Change menu items, prices, opening hours and offers yourself — no developer needed.' },
      { title: 'Local search', text: 'Set up to appear when nearby customers search for food on Google and Maps.' },
    ],
    whyUs: [
      'No commission on your own orders — the website is yours',
      'Designed mobile-first, because most food orders come from phones',
      'Fixed price, milestone payments and full ownership',
      'Free bug fixes for 30 days after launch, with optional monthly care',
    ],
    pricing: {
      range: '$2,500 – $6,500',
      timeline: '4–7 weeks',
      note: 'A menu-and-reservations website costs less; full online ordering with payments sits at the higher end.',
    },
    faq: [
      {
        q: 'Can customers order online and pay on delivery?',
        a: 'Yes. Customers can order for delivery or pickup and choose cash on delivery, or online payment if you want it.',
      },
      {
        q: 'How will I receive new orders?',
        a: 'Each new order appears in your admin panel and can also be sent instantly to your WhatsApp or by SMS, so staff never miss one.',
      },
      {
        q: 'Can I change the menu and prices myself?',
        a: 'Yes. The admin panel lets you add dishes, change prices and photos, mark items as sold out and update opening hours without any technical knowledge.',
      },
      {
        q: 'Why not just use delivery apps?',
        a: 'Delivery apps are useful for discovery, but they charge commission on every order and keep the customer relationship. Your own ordering site lets regular customers order directly, so you keep the full margin.',
      },
    ],
    relatedProjects: ['movieflix', 'social-autopilot'],
    contactService: 'Restaurant Website & Online Ordering',
  },
  {
    slug: 'ecommerce-website-development',
    navLabel: 'E-commerce Websites',
    seoTitle: 'E-commerce Website Development in Pakistan | Ttech SOLUTIONS',
    seoDescription:
      'E-commerce website development with product catalogues, cart, JazzCash, Easypaisa, card and COD payments, order tracking and an easy admin dashboard. Fixed quotes from Ttech SOLUTIONS.',
    eyebrow: 'Online stores · Pakistan & worldwide',
    h1: 'E-commerce Website Development',
    intro:
      'Sell online with a fast store that is easy for customers to buy from and easy for you to manage. We build online stores with the payment methods your customers actually use — JazzCash, Easypaisa, cards and cash on delivery — and an admin dashboard for stock and orders.',
    idealFor: [
      'Clothing, beauty and lifestyle brands selling on Instagram and WhatsApp today',
      'Shops that want to move from manual DM orders to a real store',
      'Businesses outgrowing Shopify themes or slow WordPress stores',
      'Brands that want to sell to customers abroad',
    ],
    includesTitle: 'Everything a store needs',
    includes: [
      { title: 'Product catalogue', text: 'Categories, variants such as size and colour, search and filters that help customers find products fast.' },
      { title: 'Local payments', text: 'JazzCash, Easypaisa, card payments and cash on delivery — whichever suits your customers.' },
      { title: 'Smooth checkout', text: 'A short, mobile-friendly checkout that reduces abandoned carts.' },
      { title: 'Orders & stock', text: 'An admin dashboard for orders, inventory, discounts and customer details.' },
      { title: 'Order updates', text: 'Confirmation and status updates by email or WhatsApp.' },
      { title: 'SEO-ready products', text: 'Every product gets its own search-friendly page, so you can be found on Google.' },
    ],
    whyUs: [
      'Payment methods that work for customers in Pakistan',
      'Fixed price agreed upfront, paid in milestones',
      'You own the store and all its data — no platform lock-in',
      '30 days of free bug fixes after launch',
    ],
    pricing: {
      range: '$3,500 – $7,500',
      timeline: '5–8 weeks',
      note: 'Depends on the number of products, payment methods and custom features.',
    },
    faq: [
      {
        q: 'Which payment methods can my store accept?',
        a: 'We can integrate JazzCash, Easypaisa, debit and credit cards through a payment gateway, bank transfer and cash on delivery.',
      },
      {
        q: 'Can I manage products and orders myself?',
        a: 'Yes. You get an admin dashboard to add products, update stock and prices, create discount codes and process orders.',
      },
      {
        q: 'Shopify or a custom store — which is better?',
        a: 'Shopify is quick to start but adds monthly fees and limits customisation. A custom store has no platform fees, fits your exact workflow and you own it fully. On a free call we will recommend what fits your budget.',
      },
      {
        q: 'How long does an online store take?',
        a: 'Most stores take 5–8 weeks, including design, payment setup, testing and launch.',
      },
    ],
    relatedProjects: ['movieflix', 'nikkah-junction'],
    contactService: 'E-Commerce Store',
  },
  {
    slug: 'mobile-app-development-pakistan',
    navLabel: 'Mobile App Development',
    seoTitle: 'Mobile App Development Company in Pakistan | Ttech SOLUTIONS',
    seoDescription:
      'Android and iOS app development in Pakistan with React Native and Flutter. One codebase for both platforms, admin panel, push notifications and app-store publishing. Fixed quotes.',
    eyebrow: 'Android & iOS · Pakistan',
    h1: 'Mobile App Development in Pakistan',
    intro:
      'We build Android and iPhone apps from a single codebase with React Native or Flutter — so you launch on both platforms for one budget. From the first screen design to publishing on the Play Store and App Store, we handle the whole journey.',
    idealFor: [
      'Startups launching their first app (MVP)',
      'Businesses that want a customer app for ordering, booking or loyalty',
      'Companies digitising field work with an internal staff app',
      'Founders who need an app plus an admin web panel',
    ],
    includesTitle: 'What we build',
    includes: [
      { title: 'iOS + Android together', text: 'One codebase with React Native or Flutter, so both apps stay in sync and cost less.' },
      { title: 'Sign-up & profiles', text: 'Login with phone, email or Google, and user profiles.' },
      { title: 'Push notifications', text: 'Bring users back with order updates, reminders and offers.' },
      { title: 'Admin web panel', text: 'Manage users, content and orders from your browser.' },
      { title: 'Payments & maps', text: 'In-app payments, location and maps where your app needs them.' },
      { title: 'Store publishing', text: 'We prepare listings and publish your app to the Play Store and App Store.' },
    ],
    whyUs: [
      'One budget for both platforms',
      'Clickable design prototype before any code is written',
      'Builds you can install and test on your phone every two weeks',
      'Full code ownership and 30 days of free bug fixes',
    ],
    pricing: {
      range: '$5,000 – $12,000',
      timeline: '6–10 weeks',
      note: 'A focused MVP sits at the lower end; apps with payments, maps and complex admin features cost more.',
    },
    faq: [
      {
        q: 'How much does it cost to build an app in Pakistan?',
        a: 'Most apps we build cost $5,000 – $12,000 for both Android and iOS, depending on features. We give you a fixed written quote after a free consultation.',
      },
      {
        q: 'Do I need separate apps for Android and iPhone?',
        a: 'No. With React Native or Flutter we build one codebase that runs as a native-feeling app on both platforms, which saves time and money.',
      },
      {
        q: 'Will you publish the app to the stores?',
        a: 'Yes. We prepare the store listings and handle publishing to Google Play and the Apple App Store under your developer accounts.',
      },
      {
        q: 'Can you start with a smaller first version?',
        a: 'Yes — we recommend it. We help you choose the core features for a first release (MVP), launch faster, then add more based on real user feedback.',
      },
    ],
    relatedProjects: ['ciro-ai', 'movieflix'],
    contactService: 'Mobile App (iOS & Android)',
  },
  {
    slug: 'ai-automation-services',
    navLabel: 'AI & Automation',
    seoTitle: 'AI Automation Services & Chatbot Development | Ttech SOLUTIONS',
    seoDescription:
      'AI automation services: AI chatbots, social media automation, document processing, computer vision and workflow automation with n8n, Python and modern AI models. See real case studies.',
    eyebrow: 'AI · automation · computer vision',
    h1: 'AI Automation Services & Chatbot Development',
    intro:
      'We automate the repetitive work that eats your team’s week — and add AI where it genuinely helps. From chatbots that answer customers to systems that post on social media every day by themselves, we build automations that run reliably and report back to you.',
    idealFor: [
      'Teams spending hours on repetitive copy-paste or posting tasks',
      'Businesses that want an AI chatbot trained on their own information',
      'Companies with documents, images or video that need processing',
      'Anyone who wants alerts and reports without checking dashboards',
    ],
    includesTitle: 'What we can automate',
    includes: [
      { title: 'AI chatbots', text: 'Website or WhatsApp assistants that answer questions from your own business information and hand over leads.' },
      { title: 'Social media automation', text: 'AI-written, branded posts and videos published on schedule — like our Social Autopilot.' },
      { title: 'Workflow automation', text: 'Connect your tools with n8n or custom code so data moves without manual work.' },
      { title: 'Computer vision', text: 'Detect, track and analyse objects in images or video — like our multi-camera vehicle tracking system.' },
      { title: 'Document processing', text: 'Extract and organise information from invoices, forms and reports.' },
      { title: 'Reports & alerts', text: 'Summaries and instant alerts sent to Telegram, WhatsApp or email.' },
    ],
    whyUs: [
      'Real, working automations in our portfolio — not just slides',
      'We start with the task that saves you the most time',
      'Clear explanations of what the AI does and where a human stays in control',
      'You own the workflows and code; no per-seat platform fees from us',
    ],
    pricing: {
      range: '$2,500 – $10,000+',
      timeline: '3–8 weeks',
      note: 'A single automation or chatbot costs less; multi-step AI systems and computer vision sit at the higher end.',
    },
    faq: [
      {
        q: 'What tasks can be automated?',
        a: 'Anything repetitive and rule-based is a good candidate: posting content, moving data between tools, answering common customer questions, processing documents, generating reports and sending alerts.',
      },
      {
        q: 'Will the AI chatbot give wrong answers?',
        a: 'We ground the chatbot in your own business information, give it clear rules and limits, and hand over to a human for anything it should not answer.',
      },
      {
        q: 'Do I need to pay for AI tools every month?',
        a: 'Some automations use AI models or services with small usage-based costs. We choose cost-effective options, often with free tiers, and tell you the running costs upfront.',
      },
      {
        q: 'Can you show automations you have built?',
        a: 'Yes — see our case studies: Social Autopilot (daily social media on autopilot), CIRO (AI agents for crisis response) and MCVT (AI vehicle tracking across multiple cameras).',
      },
    ],
    relatedProjects: ['social-autopilot', 'mcvt-system', 'ciro-ai'],
    contactService: 'AI & Automation',
  },
];

export const getLandingPage = (slug: string) => LANDING_PAGES.find((p) => p.slug === slug);
