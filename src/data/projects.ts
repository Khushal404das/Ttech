/**
 * Ttech case studies — the single source for the Work page cards and the
 * /work/<slug> case-study pages. Everything here describes real projects;
 * numbers come only from the projects themselves (e.g. MCVT's demo run).
 */

export type ProjectCategory = 'AI & Computer Vision' | 'Automation' | 'Web Apps';

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'github' | 'live';
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  category: ProjectCategory;
  tagline: string;
  /** SEO description for the case-study page */
  seoDescription: string;
  problem: string;
  solution: string;
  features: string[];
  results: string[];
  highlights: { label: string; value: string }[];
  technologies: string[];
  image?: { src: string; alt: string; fit?: 'cover' | 'contain'; background?: string };
  /** Extra screenshots shown on the case-study page */
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
  /** Gradient used for the cover when there is no screenshot */
  accent: string;
  links: ProjectLink[];
  /** Service landing page this project relates to (internal linking) */
  relatedService?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'movieflix',
    title: 'MovieFlix — Movie & Series Streaming Platform',
    shortTitle: 'MovieFlix',
    client: 'Live product',
    category: 'Web Apps',
    tagline: 'A fast movie & series platform that works on the web, Android and iPhone from one codebase.',
    seoDescription:
      'Case study: how Ttech SOLUTIONS built MovieFlix (movieflix.stream), a Next.js movie and series platform with per-title SEO pages, accounts and installable Android & iOS apps.',
    problem:
      'Movie fans jump between slow, cluttered sites to find something to watch, check the trailer and see the cast — and most of those sites are painful to use on a phone. The goal was one fast, clean platform that feels like an app on every device and can be found on Google title by title.',
    solution:
      'We built MovieFlix with Next.js 14 (App Router). The catalogue, trailers, cast, seasons and episodes come from the TMDB API and are fetched on the server, so pages load fast and the API keys never reach the browser. Every movie and show gets its own search-friendly page, and the same codebase is installable as a web app, an Android APK and an iOS PWA.',
    features: [
      'Movies, TV series and anime with trailers, cast, seasons and episodes',
      'Account sign-in with Google or email, plus a personal "My List"',
      'Installable on Android (APK) and iPhone (PWA) — no app-store wait',
      'Free classics section with public-domain films from the Internet Archive',
      'Server-side data fetching with caching, so pages stay fast',
      'Unique SEO title, description and preview image for every title',
    ],
    results: [
      'Live and publicly available at movieflix.stream',
      'One codebase serves web, Android and iOS users',
      'Every title is its own indexable page, bringing in search traffic',
      'API keys stay on the server, never exposed to visitors',
    ],
    highlights: [
      { label: 'Status', value: 'Live' },
      { label: 'Platforms', value: 'Web · Android · iOS' },
      { label: 'Framework', value: 'Next.js 14' },
    ],
    technologies: ['Next.js 14', 'React', 'TypeScript', 'TMDB API', 'Internet Archive API', 'PWA', 'Vercel'],
    image: { src: '/projects/movieflix.webp', alt: 'MovieFlix home page on desktop' },
    accent: 'from-[#7F1D1D] via-[#B91C1C] to-[#111827]',
    links: [
      { label: 'Visit movieflix.stream', href: 'https://movieflix.stream', kind: 'live' },
      { label: 'GitHub', href: 'https://github.com/Khushal404das/movieflix', kind: 'github' },
    ],
    relatedService: 'web-development-company-pakistan',
  },
  {
    slug: 'social-autopilot',
    title: 'Social Autopilot — Hands-free Social Media',
    shortTitle: 'Social Autopilot',
    client: 'In-house automation',
    category: 'Automation',
    tagline: 'An n8n workflow that writes, designs and publishes branded posts and videos twice a day — automatically.',
    seoDescription:
      'Case study: an n8n + AI automation that writes, designs and publishes branded posts twice a day and weekly reels to Facebook, Instagram, X and TikTok (LinkedIn-ready), with Telegram reports.',
    problem:
      'Posting consistently on Facebook, Instagram, X, LinkedIn and TikTok takes hours every week — writing captions, designing images, cutting videos and uploading to each platform. Small teams skip days, and their pages go quiet exactly when they need to look active.',
    solution:
      'We built an automation that runs the whole routine on its own. n8n workflows schedule the work; an AI model (via Groq) writes on-brand posts from a company profile of facts, tone and rules; a small Python service renders branded images and short videos with FFmpeg; and the official platform APIs publish everything. It runs in Docker on a PC or a free cloud server.',
    features: [
      'Twice a day (10:00 and 18:00): picks the next idea, writes the post with AI and checks it',
      'Renders a branded post image and a short TikTok video automatically',
      'Publishes to Facebook, Instagram, X and TikTok — LinkedIn built in, switched on when needed',
      'Weekly 30-second reel, plus weekly competitor & trend research that queues new ideas',
      'Brand profile (facts, tone, rules) keeps every post on-message',
      'Saves a history of every post and sends a Telegram summary, with an alert if anything fails',
    ],
    results: [
      'New branded content goes out twice a day with no manual work',
      'One consistent brand voice across every connected network',
      'Problems surface immediately on Telegram instead of going unnoticed',
      'Currently powering Ttech’s own social media accounts',
    ],
    highlights: [
      { label: 'Posting', value: '2× daily' },
      { label: 'Workflow steps', value: '17' },
      { label: 'Manual work', value: 'None' },
    ],
    technologies: ['n8n', 'Python', 'Groq AI', 'FFmpeg', 'Meta Graph API', 'X API', 'TikTok API', 'Docker', 'Telegram Bot'],
    image: {
      src: '/projects/social-autopilot-n8n.webp',
      alt: 'The Social Autopilot daily-post workflow in n8n, from schedule to Telegram summary',
      fit: 'contain',
      background: '#F5F5F5',
    },
    gallery: [
      {
        src: '/projects/social-autopilot-post.webp',
        alt: 'A post generated and published automatically by Social Autopilot',
        caption: 'A real post the system wrote, designed and published on its own',
        width: 720,
        height: 900,
      },
    ],
    accent: 'from-[#1E3A8A] via-[#2563EB] to-[#0B1220]',
    links: [{ label: 'See it on Instagram', href: 'https://www.instagram.com/ttechsolutionz/', kind: 'live' }],
    relatedService: 'ai-automation-services',
  },
  {
    slug: 'mcvt-system',
    title: 'MCVT — Multi-Camera Vehicle Tracking',
    shortTitle: 'MCVT',
    client: 'Research & development',
    category: 'AI & Computer Vision',
    tagline: 'Follows any vehicle across a whole camera network — detect, track, re-identify and replay its full journey.',
    seoDescription:
      'Case study: MCVT, an AI traffic-surveillance system using YOLOv8, DeepSORT and ResNet re-identification to follow a vehicle across multiple CCTV cameras and auto-stitch its journey video.',
    problem:
      'Finding where one vehicle went across a network of CCTV cameras normally means watching hours of footage, camera by camera, and guessing when it appears in the next one. It is slow, tiring and easy to miss.',
    solution:
      'We built an AI pipeline that watches every camera at once. YOLOv8 detects each vehicle, DeepSORT tracks it within each camera, and a ResNet50-IBN re-identification model (trained on VeRi-776) recognises the same vehicle in other cameras, so it keeps one global ID everywhere. A web dashboard lets an operator click a vehicle and follow it as the system switches to the best camera view automatically.',
    features: [
      'Live multi-camera grid with every vehicle detected and labelled',
      'One global ID per vehicle across all cameras (cross-camera re-identification)',
      'Click a vehicle to follow it — the best camera view switches automatically',
      '"Replay journey": every clip of that vehicle stitched in time order with FFmpeg',
      'Journey video emailed to the operator on request',
      'Vehicle gallery with search by ID, type, colour and camera',
    ],
    results: [
      'Demo run: 6 camera feeds processed together in real time',
      'Demo run: 44 unique vehicles identified and 41 cross-camera re-identifications',
      'A vehicle’s full route can be reviewed in one click instead of hours of footage',
    ],
    highlights: [
      { label: 'Cameras (demo)', value: '6' },
      { label: 'Vehicles identified', value: '44' },
      { label: 'Cross-camera Re-IDs', value: '41' },
    ],
    technologies: ['Python', 'PyTorch', 'YOLOv8', 'DeepSORT', 'ResNet50-IBN', 'OpenCV', 'FFmpeg', 'PHP', 'WebSockets', 'SQLite'],
    image: { src: '/projects/mcvt-dashboard.webp', alt: 'MCVT dashboard tracking vehicles across six cameras' },
    accent: 'from-[#0E7490] via-[#0891B2] to-[#0B1220]',
    links: [{ label: 'GitHub', href: 'https://github.com/Khushal404das/MCVT-system', kind: 'github' }],
    relatedService: 'ai-automation-services',
  },
  {
    slug: 'ciro-ai',
    title: 'CIRO — AI Crisis Response Orchestrator',
    shortTitle: 'CIRO',
    client: 'In-house product',
    category: 'Automation',
    tagline: 'An agentic AI command centre that turns live signals into classified incidents and response plans.',
    seoDescription:
      'Case study: CIRO, a Flutter emergency-response dashboard where specialised AI agents fuse signals, verify them, classify incidents and recommend which units to send.',
    problem:
      'In an emergency, operators are flooded with reports from social media, dispatch calls and sensors at the same time. Checking which reports are real, working out what kind of incident it is and deciding which units to send all takes precious minutes.',
    solution:
      'We designed CIRO as a command centre where a team of specialised AI agents handles each step of that workflow, and the operator stays in control. Live weather data feeds into the agents, and an "Agent Trace" view shows exactly why each recommendation was made, so the operator can trust or override it.',
    features: [
      'Signal Fusion agent: groups reports from social media, calls and IoT sensors by location',
      'Credibility agent: checks reports against ground-truth data such as traffic and weather',
      'Classification agent: identifies the incident type (e.g. flooding vs. a burst water main)',
      'Resource Allocation agent: recommends which units to send, based on distance and capacity',
      'Live map, incident feed and real-time unit tracking',
      '"Agent Trace" explains every recommendation step by step',
    ],
    results: [
      'From raw signals to a recommended response in one dashboard',
      'Every AI decision is explainable through the Agent Trace',
      'Live weather data automatically adjusts incident severity',
      'Smooth, real-time interface even while processing thousands of signals',
    ],
    highlights: [
      { label: 'Workflow', value: 'Multi-agent AI' },
      { label: 'Live data', value: 'Weather API' },
      { label: 'Explainability', value: 'Agent Trace' },
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Open-Meteo API', 'Agentic AI'],
    accent: 'from-[#78350F] via-[#D97706] to-[#0B1220]',
    // Live demo (ciro-ai-two.vercel.app) currently returns 404 — add it back once redeployed.
    links: [{ label: 'GitHub', href: 'https://github.com/Khushal404das/CIRO-AI', kind: 'github' }],
    relatedService: 'ai-automation-services',
  },
  {
    slug: 'nikkah-junction',
    title: 'Nikkah Junction — Matchmaking Platform',
    shortTitle: 'Nikkah Junction',
    client: 'Team project',
    category: 'Web Apps',
    tagline: 'A secure matrimonial platform with verified profiles, smart match suggestions and private messaging.',
    seoDescription:
      'Case study: Nikkah Junction, a PHP & MySQL matrimonial web platform with admin-verified profiles, compatibility-based matching, private messaging and email verification.',
    problem:
      'People looking for a life partner online worry about fake profiles and privacy, and many matrimonial sites make it hard to find genuinely compatible matches.',
    solution:
      'We built a matchmaking web application around trust. Every profile is reviewed by an admin before it goes live, accounts are verified by email, and members get match suggestions based on compatibility instead of endless scrolling. Conversations happen privately inside the platform. It was built as a two-person team project.',
    features: [
      'Detailed member profiles with personal details, interests and preferences',
      'Admin review: profiles are approved or rejected before they become visible',
      'Email verification and secure password reset',
      'Compatibility-based match suggestions',
      'Private in-app messaging between members',
      'Member dashboard for matches, messages and settings',
    ],
    results: [
      'Every visible profile has been checked by an admin',
      'Members only see suggested matches that fit their preferences',
      'All conversations stay private inside the platform',
    ],
    highlights: [
      { label: 'Profiles', value: 'Admin-verified' },
      { label: 'Matching', value: 'Compatibility' },
      { label: 'Messaging', value: 'Private' },
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'PHPMailer'],
    image: { src: '/projects/nikah-home.webp', alt: 'Nikkah Junction home page', background: '#FFF4E0' },
    gallery: [
      { src: '/projects/nikah-dashboard.webp', alt: 'Nikkah Junction member dashboard overview', caption: 'Dashboard — users, matches, messages and pending profile approvals at a glance', width: 1571, height: 752 },
    ],
    accent: 'from-[#831843] via-[#DB2777] to-[#0B1220]',
    links: [{ label: 'GitHub', href: 'https://github.com/Khushal404das/Nikkah-Junction', kind: 'github' }],
    relatedService: 'web-development-company-pakistan',
  },
  {
    slug: 'youtube-auto-uploader',
    title: 'YouTube Auto-Uploader',
    shortTitle: 'YouTube Auto-Uploader',
    client: 'In-house automation',
    category: 'Automation',
    tagline: 'Drop a video in a folder and it is published to YouTube with its title, description and tags — on schedule.',
    seoDescription:
      'Case study: a Python automation that watches a folder and uploads every new video to YouTube with its title, description and tags on a daily schedule, using the YouTube Data API.',
    problem:
      'Uploading videos one by one — typing titles, descriptions and tags for each — is slow and easy to forget. YouTube’s daily upload limit for API apps makes bulk uploading even harder to manage by hand.',
    solution:
      'We built a small background tool that watches a folder and uploads every new video through the official YouTube Data API. It waits until each file has finished saving, applies the right title, description, tags and category, and keeps a record so nothing is uploaded twice. A daily scheduled run uploads the next batch automatically.',
    features: [
      'Watches a folder and picks up new videos automatically',
      'Per-video titles, descriptions, tags and category from a simple config file',
      'Only uploads files once they have finished saving',
      'Remembers every upload, so nothing is ever posted twice',
      'Handles YouTube’s daily quota by pausing and resuming automatically',
      'Daily scheduled run with Windows Task Scheduler',
    ],
    results: [
      'Videos go live on schedule with zero manual steps',
      'No duplicate uploads',
      'Recovers on its own when YouTube’s daily limit is reached',
    ],
    highlights: [
      { label: 'Uploads', value: 'Automatic' },
      { label: 'Schedule', value: 'Daily batch' },
      { label: 'Duplicates', value: 'Never' },
    ],
    technologies: ['Python', 'YouTube Data API v3', 'OAuth 2.0', 'Windows Task Scheduler'],
    accent: 'from-[#7F1D1D] via-[#DC2626] to-[#0B1220]',
    links: [],
    relatedService: 'ai-automation-services',
  },
];

export const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'AI & Computer Vision', 'Automation', 'Web Apps'];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
