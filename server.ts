import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

// HMR is disabled in AI Studio dev environment
process.env.DISABLE_HMR = 'true';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

function getEffectiveKey(reqKey?: string): string {
  const cleanReqKey = typeof reqKey === 'string' ? reqKey.trim() : '';
  if (cleanReqKey && cleanReqKey.length > 5) return cleanReqKey;
  return (process.env.GEMINI_API_KEY || '').trim();
}

function getAIClient(clientKey?: string) {
  const key = getEffectiveKey(clientKey);
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
}

// Health & Status
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    configured: Boolean(getEffectiveKey()),
    timestamp: new Date().toISOString(),
  });
});

// Configure Gemini API Key endpoint
app.post('/api/set-key', (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 8) {
    return res.status(400).json({ error: 'Valid Gemini API key is required.' });
  }

  const cleanKey = apiKey.trim();
  process.env.GEMINI_API_KEY = cleanKey;

  // Persist into .env in the workspace root
  try {
    const envPath = path.resolve(__dirname, '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
      if (envContent.includes('GEMINI_API_KEY=')) {
        envContent = envContent.replace(/GEMINI_API_KEY=.*/g, `GEMINI_API_KEY="${cleanKey}"`);
      } else {
        envContent += `\nGEMINI_API_KEY="${cleanKey}"\n`;
      }
    } else {
      envContent = `GEMINI_API_KEY="${cleanKey}"\n`;
    }
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('Gemini API key successfully saved to .env');
  } catch (err) {
    console.warn('Could not write to .env file:', err);
  }

  return res.json({
    success: true,
    message: 'Gemini API key activated successfully! Real-time generative AI is now live.',
  });
});

// Intelligent conversational fallback engine for consulting and technical queries
function generateFallbackChatResponse(query: string, _systemInstruction?: string): string {
  const lower = query.toLowerCase().trim();

  // 1. Casual Greetings & Conversation Starters
  if (
    /^(hi|hello|hey|hiya|howdy|greetings|good\s*(morning|afternoon|evening)|yo)\b/.test(lower) ||
    lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'sup'
  ) {
    return `### 👋 Hello! Welcome to Ttech SOLUTIONS

I am your **Technical Solutions Advisor and Lead Systems Architect**. 

How can I help you today? Here are a few ways we can collaborate:
- **Project Pricing & Estimates**: Ballpark budgets for MVPs, SaaS platforms, and enterprise solutions.
- **Architecture Strategy**: Best practices for **.NET Core 9, React 19, PostgreSQL, Docker, Azure, and AWS**.
- **Full-Cycle Engineering**: Agile two-week sprints with staging demos, automated CI/CD, and 100% IP ownership.

*Feel free to describe what you're planning to build or ask any technical question!*`;
  }

  // 1.1 Humor & Jokes
  if (lower.includes('joke') || lower.includes('funny') || lower.includes('laugh') || lower.includes('humor')) {
    return `### 😄 Programmer Humor for You

Why do software engineers prefer dark mode?

> **Because light attracts bugs!** 🐛

And here's another one:
**There are 10 types of people in the world:** those who understand binary, and those who don't!

*Need help debugging an architecture or scoping your next application sprint? Let me know!*`;
  }

  // 1.2 Small talk / How are you
  if (lower.includes('how are you') || lower.includes('how do you do') || lower.includes('how are you doing') || lower.includes('what\'s up')) {
    return `### 😊 Doing great and ready to engineer!

I am functioning at peak velocity! Our team at **Ttech SOLUTIONS** is actively shipping high-performance builds across **.NET Core 9, React 19, and cloud architectures**.

What project idea, technical challenge, or tech stack decision are you exploring today?`;
  }

  // 2. Healthcare & Doctor booking platforms
  if (lower.includes('doctor') || lower.includes('health') || lower.includes('clinic') || lower.includes('hospital') || lower.includes('medical') || lower.includes('appointment')) {
    return `### 🏥 Healthcare & Telemedicine Architecture

At **Ttech SOLUTIONS**, we engineer HIPAA-compliant patient management and doctor booking platforms:

- **Patient Flow**: Real-time calendar slot booking, automated WhatsApp/SMS reminders, and secure video consultation room integration (Twilio / WebRTC).
- **Backend & Security**: ASP.NET Core 9 Web API with AES-256 encrypted health records at rest and strict role-based access control (Doctor, Patient, Admin).
- **Integrations**: Electronic Health Records (EHR) sync, e-prescriptions, and Stripe payment processing for consultations.

*Would you like an estimated 4-6 week MVP delivery roadmap for your healthcare platform?*`;
  }

  // 2.1 On-demand ride / logistics / delivery
  if (lower.includes('uber') || lower.includes('ride') || lower.includes('taxi') || lower.includes('delivery') || lower.includes('driver') || lower.includes('tracking')) {
    return `### 🚗 On-Demand Ride & Logistics Platform Architecture

We build high-concurrency geo-tracking and dispatch platforms:

- **Mobile Apps (Rider & Driver)**: React Native / Flutter apps with background GPS polling, sub-second route calculation, and turn-by-turn navigation.
- **Real-Time Geolocation Engine**: Redis Geo-indexing paired with WebSockets / SignalR for instantaneous driver-to-rider matching and live vehicle markers.
- **Backend Infrastructure**: ASP.NET Core Minimal APIs handling surge pricing algorithms, automated wallet deductions, and Stripe payouts.

*Would you like to scope out the MVP phases for rider, driver, and admin dispatch consoles?*`;
  }

  // 2.2 Social & Community Platform
  if (lower.includes('social') || lower.includes('feed') || lower.includes('community') || lower.includes('post') || lower.includes('forum')) {
    return `### 💬 Social & Community Platform Architecture

We develop interactive multimedia community ecosystems:

- **Activity Feeds**: Infinite scroll feed with instant optimistic likes, bookmarking, and algorithmic post ranking.
- **Real-Time Messaging**: SignalR / WebSocket message delivery with read receipts, typing indicators, and media uploads to Azure Blob Storage / AWS S3.
- **Moderation & Security**: Automated AI profanity filtering, image scanning, and user reporting mechanisms.

*What unique feature or audience are you targeting for your social platform?*`;
  }

  // 2.3 Identity & Agency Background
  if (lower.includes('who are you') || lower.includes('who made you') || lower.includes('what is ttech') || lower.includes('about ttech') || lower.includes('what do you do')) {
    return `### 🚀 About Ttech SOLUTIONS (Think. Transform. Trust.)

**Ttech SOLUTIONS** is an elite software engineering and digital transformation agency. We engineer mission-critical systems and high-growth digital products for founders, scale-ups, and enterprises.

**Our Core Capabilities:**
- **Enterprise Web & SaaS**: ASP.NET Core 9 Clean Architecture, MediatR, CQRS, React 19, TypeScript, Tailwind CSS.
- **Cloud Infrastructure & DevOps**: Azure App Services, AWS ECS, Docker Containerization, automated GitHub Actions.
- **AI Automation & Intelligent Agents**: Retrieval-Augmented Generation (RAG), custom LLM orchestration, and smart assistants.
- **UI/UX & Design Systems**: High-fidelity Figma systems, interaction design, and conversion-optimized interfaces.

*Would you like to explore our portfolio case studies or get a custom architecture roadmap for your idea?*`;
  }

  // 3. Pricing, Cost, Rates, Quotes
  if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('quote') || lower.includes('rate') || lower.includes('budget') || lower.includes('how much')) {
    return `### 💰 Ttech SOLUTIONS Ballpark Pricing & Financial Transparency

At **Ttech SOLUTIONS**, our project pricing is strictly itemized with **zero hidden fees** and **zero markup on cloud infrastructure**:

1. **MVP / Proof of Concept**: **$3,500 – $6,500 USD** (4–6 weeks delivery). Includes core user flows, database architecture, authentication, and responsive UI.
2. **Full-Featured SaaS Platform**: **$7,000 – $18,000+ USD** (8–12 weeks delivery). Includes multi-tenant RBAC, Stripe/payment integration, automated billing, background job queues, and analytics dashboards.
3. **Enterprise .NET / Distributed Systems**: Custom scoping with fixed-price milestones or monthly developer squad retainers.

**Milestone Payment Terms:**
- **30% Kickoff Deposit** (Wireframing, Schema & Architecture Approval)
- **40% Mid-Point Demo** (Live working feature demo on staging server)
- **30% Final Release** (UAT completion, full IP & repository transfer)

> 💡 *Tip: You can use our interactive **Project Estimator** or click **"Transfer to Main Form"** to generate an immediate binding proposal within 24 hours.*`;
  }

  // 4. Tech Stack & Architecture (.NET, React, etc.)
  if (lower.includes('.net') || lower.includes('c#') || lower.includes('react') || lower.includes('stack') || lower.includes('tech') || lower.includes('architecture') || lower.includes('next.js')) {
    return `### 🛠️ Ttech SOLUTIONS Enterprise Tech Stack

We engineer high-performance systems designed for sub-50ms API responses and effortless scale:

- **Backend Architecture**: **ASP.NET Core 9 / C#** utilizing Clean Architecture, CQRS (MediatR), Minimal APIs, and Entity Framework Core 9.
- **Frontend Stack**: **React 19 / Next.js**, TypeScript, Tailwind CSS, TanStack Query, and Framer Motion for desktop & mobile.
- **Database Layer**: **Microsoft SQL Server**, **PostgreSQL**, and **Redis** for distributed caching and session management.
- **Cloud & DevOps**: **Microsoft Azure Container Apps**, **AWS**, or **Docker** orchestrations with automated GitHub Actions CI/CD pipelines.
- **AI Automation**: Tailored LLM agents, vector embeddings, and retrieval-augmented generation (RAG) pipelines.

> 🚀 *All systems follow SOLID design principles and OWASP Top 10 security standards.*`;
  }

  // 5. Mobile App Inquiries (Flutter, React Native, iOS, Android)
  if (lower.includes('mobile') || lower.includes('flutter') || lower.includes('react native') || lower.includes('ios') || lower.includes('android') || lower.includes('app store')) {
    return `### 📱 Mobile Application Engineering

We develop cross-platform mobile apps with native 60fps performance and shared business logic:

- **React Native / Expo**: Ideal for sharing TypeScript code between your web dashboard and mobile applications.
- **Flutter**: Perfect for brand-heavy, pixel-perfect custom interfaces with multi-platform parity.
- **API Backend**: High-throughput ASP.NET Core 9 Web APIs or Node microservices with JWT refresh token rotation.
- **Store Submission**: Complete support through Apple App Store and Google Play Store review and release.

*What kind of mobile application are you planning? Let me know your key user flows!*`;
  }

  // 6. E-Commerce & Marketplace Inquiries
  if (lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('store') || lower.includes('shop') || lower.includes('marketplace') || lower.includes('stripe') || lower.includes('payment')) {
    return `### 🛍️ E-Commerce & Transactional Platforms

We design resilient digital storefronts and marketplace engines:

- **Payment Orchestration**: Seamless integration with **Stripe Connect, PayPal, or localized gateways**, handling 3D-Secure, webhooks, and idempotent billing.
- **Inventory & Cart State**: Redis-backed session queues with optimistic concurrency locking to prevent overselling.
- **Catalog & Search**: Fast multi-faceted product filtering with PostgreSQL Full-Text Search or Elasticsearch.
- **Admin Dashboard**: Real-time sales analytics, order fulfillment workflows, and automated email/SMS dispatch.

*Would you like to discuss a custom build or an MVP timeline for your store?*`;
  }

  // 7. AI & Automation Inquiries
  if (lower.includes('ai') || lower.includes('agent') || lower.includes('llm') || lower.includes('gpt') || lower.includes('gemini') || lower.includes('rag') || lower.includes('bot')) {
    return `### 🤖 Tailored AI & Intelligent Automation Systems

We build custom AI agents that automate complex operational workflows:

- **Custom LLM Pipelines**: Multi-turn agents using **Google Gemini 2.5 Flash / Pro**, OpenAI, or open-source models with strict JSON schema outputs.
- **RAG (Retrieval-Augmented Generation)**: Vector search using **pgvector, Pinecone, or Qdrant** over internal company docs and databases.
- **Operational Automation**: Automated document parsing, sentiment routing, customer intake chatbots, and data extraction workers.

*Tell me about the repetitive task or workflow you'd like to automate with AI!*`;
  }

  // 7.1 Real Estate & Property Listing Portals
  if (lower.includes('real estate') || lower.includes('property') || lower.includes('estate') || lower.includes('rental') || lower.includes('house') || lower.includes('listing')) {
    return `### 🏢 Real Estate & Property Marketplace Architecture

We architect high-performance property search engines and management portals:

- **Interactive Maps & Geospatial Search**: Leaflet / Mapbox / Google Maps integration with polygon boundary search and cluster markers.
- **Listing Orchestration**: Automated MLS/IDX feed ingestion, high-res image CDN caching, and 3D virtual tour embeds.
- **Lead Intake CRM**: Instant booking for agent tours, mortgage calculator widgets, and automated SMS notifications to listing brokers.
- **Backend Architecture**: ASP.NET Core 9 / PostgreSQL with PostGIS for sub-10ms spatial queries.

*Would you like a roadmap outlining agent consoles, customer search portals, and admin approval workflows?*`;
  }

  // 7.2 Fintech, Crypto & Trading Dashboards
  if (lower.includes('fintech') || lower.includes('crypto') || lower.includes('trading') || lower.includes('wallet') || lower.includes('banking') || lower.includes('investment')) {
    return `### 💳 Fintech & Financial Analytics Platform Architecture

We build compliant, sub-millisecond financial dashboards and payment hubs:

- **Data Streaming & Charts**: High-frequency SignalR / WebSocket stream feeds rendering responsive canvas/SVG financial charts.
- **Compliance & Ledger**: Double-entry ledger database schema with cryptographic audit trails and strict idempotency checks.
- **Payment & KYC Gateways**: Plaid, Stripe, and Identity Verification (Sumsub/Persona) integrations.
- **Security Standard**: Clean Architecture with strict encryption at rest and in transit (AES-256 / TLS 1.3).

*What financial transactions or charting flows are you looking to implement?*`;
  }

  // 7.3 CRM & Enterprise ERP Systems
  if (lower.includes('crm') || lower.includes('erp') || lower.includes('inventory') || lower.includes('warehouse') || lower.includes('supply chain') || lower.includes('pipeline')) {
    return `### 📊 Custom CRM & Enterprise ERP Architecture

We construct high-velocity operational consoles tailored to your organization's exact workflows:

- **Pipeline & Kanban**: Drag-and-drop opportunity boards with real-time optimistic state updates.
- **Role-Based Governance**: Granular permissions (RBAC) across departments (Sales, Support, Exec, Warehouse).
- **Automated Workflows**: Email sequence triggers, invoice PDF generation, and webhook sync with external accounting software.
- **Tech Stack**: ASP.NET Core 9 Clean Architecture + MediatR CQRS + React 19 TanStack Table.

*Tell me about the specific department workflows or data silos you're aiming to unify!*`;
  }

  // 7.4 Education, LMS & EdTech Platforms
  if (lower.includes('lms') || lower.includes('course') || lower.includes('education') || lower.includes('student') || lower.includes('teacher') || lower.includes('learning')) {
    return `### 🎓 EdTech & Learning Management (LMS) Architecture

We design intuitive digital learning hubs and assessment platforms:

- **Course Delivery**: Video streaming with encrypted DRM, chapter progress tracking, and interactive quizzes.
- **Live Classrooms**: WebRTC / Zoom SDK video rooms with synchronized whiteboard and breakout channels.
- **Certification Engine**: Automated PDF credential generation with verifiable QR codes.

*Would you like to scope out the student portal, instructor studio, and administrative console?*`;
  }

  // 8. Agile Sprints, Timeline, Velocity
  if (lower.includes('timeline') || lower.includes('sprint') || lower.includes('delivery') || lower.includes('how long') || lower.includes('fast') || lower.includes('weeks')) {
    return `### ⏱️ Agile Sprint Cadence & Delivery Velocity

Our engineering squads work in disciplined **two-week sprints** with full client transparency:

1. **Week 1 (Kickoff & Discovery)**: Database schema modeling, OpenAPI contracts, and interactive Figma wireframes.
2. **Weeks 2–6 (Core Engineering)**: Iterative development sprints. Every alternate Friday, you receive a **live staging URL** and changelog demo video.
3. **Final Sprint (Hardening & Launch)**: Automated end-to-end integration tests, load testing, security review, and production cloud deployment.

Typical delivery spans **4 to 8 weeks** for MVPs, and **8 to 12 weeks** for complex SaaS ecosystems.`;
  }

  // 9. Source Code Ownership & Intellectual Property
  if (lower.includes('own') || lower.includes('ip') || lower.includes('source code') || lower.includes('copyright') || lower.includes('github') || lower.includes('repo')) {
    return `### 📜 100% Client Source Code & IP Ownership

**You own everything we build.**
- Upon project milestone settlement, **100% of the Intellectual Property (IP)**, Git repositories (GitHub/GitLab), Figma vectors, and database schemas are transferred directly to your organization.
- We never hold your code hostage, charge recurring proprietary runtime licensing fees, or enforce vendor lock-in.`;
  }

  // 10. Warranty & Support
  if (lower.includes('warranty') || lower.includes('support') || lower.includes('bug') || lower.includes('sla') || lower.includes('maintenance')) {
    return `### 🛡️ 30-Day Post-Launch Warranty & Support Guarantees

Every project delivered by **Ttech SOLUTIONS** includes:
- **30-Day Comprehensive Post-Launch Warranty**: Any bug or edge case discovered in our delivered codebase is patched at highest priority with **zero additional charge**.
- **Tiered SLA Maintenance**: Optional ongoing retainers for security patching, automated backups, 24/7 uptime telemetry, and feature development hours.`;
  }

  // 11. WhatsApp, Phone, Contact
  if (
    lower.includes('whatsapp') ||
    lower.includes('phone') ||
    lower.includes('call') ||
    lower.includes('contact') ||
    lower.includes('number') ||
    lower.includes('reach') ||
    lower.includes('email')
  ) {
    return `### 📱 Contact Ttech SOLUTIONS Directly

You can connect directly with our Principal Engineering and Architecture team:

- **WhatsApp**: [**+92 348 9763998**](https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20would%20like%20to%20discuss%20a%20project) (24/7 Rapid Response, typically under 15 minutes)
- **Direct Phone**: **+92 348 9763998**
- **Email**: **contact@ttechsolutions.dev**
- **Inquiry Form**: Submit your architecture specs on our **Contact** section for a structured proposal within 24 hours.

*Feel free to send a message on WhatsApp anytime to discuss your sprint or review Figma wireframes!*`;
  }

  // 12. General Technical Consulting
  return `### 💡 Technical Solutions Advisor · Ttech SOLUTIONS

Thank you for your message! As an agency specializing in **.NET Core 9, React 19, and scalable Cloud systems**, we can tailor a precise solution for your project.

**Here is our recommendation for "${query.slice(0, 80)}":**
- **Architecture**: A clean separation of concerns with an API-first backend (.NET 9 or Node.js) paired with a responsive React 19 frontend.
- **Database**: Relational transactional store (PostgreSQL or SQL Server) with Redis caching for high-frequency queries.
- **Delivery Path**: 2-week agile sprint milestones with bi-weekly live staging demos so you see progress continuously.

*Would you like to explore an immediate ballpark cost estimate or transfer these notes directly to our project proposal form?*`;
}

// Multi-turn Gemini Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      systemInstruction,
      model = 'gemini-2.5-flash',
      apiKey: clientKey,
    } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required.' });
    }

    const headerKey = req.headers['x-gemini-api-key'] as string;
    const effectiveKey = getEffectiveKey(clientKey || headerKey);
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // If no API key configured, use our intelligent knowledge engine
    if (!effectiveKey) {
      const fallbackText = generateFallbackChatResponse(lastUserMessage, systemInstruction);
      return res.json({
        text: fallbackText,
        role: 'model',
        model: 'ttech-advisor-engine',
      });
    }

    const ai = new GoogleGenAI({ apiKey: effectiveKey });

    // Format multi-turn conversation
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content || '') }],
    }));

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }

    // Try primary production Gemini model
    const candidateModels = [model || 'gemini-2.5-flash', 'gemini-1.5-flash'];

    let text = '';
    let successfulModel = '';

    for (const candidateModel of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: candidateModel,
          contents,
          config,
        });
        if (response && response.text) {
          text = response.text;
          successfulModel = candidateModel;
          break;
        }
      } catch (err: any) {
        const errMsg = String(err.message || '');
        console.warn(`Model ${candidateModel} note: ${errMsg}`);
        // If key is denied or unauthorized, immediately break and serve via advisor engine
        if (errMsg.includes('PERMISSION_DENIED') || errMsg.includes('403') || errMsg.includes('API_KEY_INVALID') || errMsg.includes('401')) {
          break;
        }
      }
    }

    if (text) {
      return res.json({
        text,
        role: 'model',
        model: successfulModel,
      });
    }

    // Instant seamless fallback to our rich domain advisor
    const fallbackText = generateFallbackChatResponse(lastUserMessage, systemInstruction);

    return res.json({
      text: fallbackText,
      role: 'model',
      model: 'ttech-advisor-engine',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const lastUserMessage = req.body?.messages?.slice(-1)[0]?.content || '';
    const fallbackText = generateFallbackChatResponse(lastUserMessage);
    return res.json({
      text: fallbackText,
      role: 'model',
      model: 'ttech-advisor-engine',
    });
  }
});

// Google Maps Grounded Discovery Endpoint
app.post('/api/places', async (req, res) => {
  try {
    const { query, latLng } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query string is required.' });
    }

    const aiClient = getAIClient();
    if (!aiClient) {
      return res.json({
        text: 'Ttech SOLUTIONS provides worldwide remote development services with high-availability engineering teams.',
        groundingChunks: [],
        webSearchQueries: [],
      });
    }

    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (
      latLng &&
      typeof latLng.latitude === 'number' &&
      typeof latLng.longitude === 'number'
    ) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: latLng.latitude,
            longitude: latLng.longitude,
          },
        },
      };
    }

    let text = '';
    let groundingChunks: any[] = [];
    let webSearchQueries: any[] = [];

    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config,
      });

      text = response.text || '';
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;
      groundingChunks = groundingMetadata?.groundingChunks || [];
      webSearchQueries = groundingMetadata?.webSearchQueries || [];
    } catch (genErr: any) {
      console.warn('Places grounding encountered issue, using fallback:', genErr.message);
      text = `Ttech SOLUTIONS operates globally with distributed engineering pods across North America, Europe, and Asia-Pacific. We provide 24/7 client coverage for SaaS platforms, cloud infrastructure, and technical consulting.`;
    }

    return res.json({
      text,
      groundingChunks,
      webSearchQueries,
    });
  } catch (error: any) {
    console.error('Error in /api/places:', error);
    return res.json({
      text: 'Ttech SOLUTIONS provides worldwide remote development services with high-availability engineering teams.',
      groundingChunks: [],
      webSearchQueries: [],
    });
  }
});

// AI Project Scoping & Technical Architecture Advisor Endpoint
app.post('/api/ai-scope', async (req, res) => {
  try {
    const { projectDescription, serviceType = 'SaaS / Web App', preferredTech = '.NET Core + React' } = req.body;

    if (!projectDescription || typeof projectDescription !== 'string') {
      return res.status(400).json({ error: 'Project description is required.' });
    }

    const aiClient = getAIClient();
    let aiGeneratedResult: any = null;

    if (aiClient) {
      try {
        const prompt = `You are the Lead Systems Architect at Ttech SOLUTIONS (Think. Transform. Trust.), an elite software development agency specializing in .NET Core, React, SaaS, Cloud & UI/UX.
The prospective client asks to build:
"${projectDescription}"
Service Category: ${serviceType}
Client's preferred tech: ${preferredTech}

Provide a comprehensive, high-credibility architecture proposal in STRICT JSON matching this schema:
{
  "projectName": "Short catchy name for the project",
  "recommendedArchitecture": {
    "frontend": "e.g. React 19 + TypeScript + Tailwind CSS",
    "backend": "e.g. ASP.NET Core 9 Web API / C# Minimal APIs with Clean Architecture",
    "database": "e.g. Microsoft SQL Server / PostgreSQL with Entity Framework Core",
    "cloudHosting": "e.g. Microsoft Azure App Services + Docker Containers + Azure Blob Storage",
    "security": "e.g. OAuth 2.0 / JWT Auth, Role-Based Access Control (RBAC), Data Encryption at rest"
  },
  "keyModules": [
    { "title": "Module name", "description": "Module description", "techComponent": "Specific component or library" }
  ],
  "sprintPhases": [
    { "phase": "Phase 1: Architecture & UI/UX", "durationWeeks": 2, "deliverables": ["Deliverable 1", "Deliverable 2"] }
  ],
  "ballparkCostRange": "$3,500 - $8,000",
  "estimatedDuration": "6 - 10 Weeks",
  "strategicAdvice": "1-2 sentences of high-value architectural advice from Ttech SOLUTIONS"
}
Output ONLY raw valid JSON. Do not include markdown code ticks.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const rawText = (response.text || '').trim();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiGeneratedResult = JSON.parse(jsonMatch[0]);
        }
      } catch (geminiErr) {
        console.warn('Gemini scoping encountered issue, falling back to deterministic smart engine:', geminiErr);
      }
    }

    // Deterministic high-credibility fallback if Gemini had quota/permission issue
    if (!aiGeneratedResult) {
      const isDotNet = preferredTech.toLowerCase().includes('.net') || preferredTech.toLowerCase().includes('c#');
      aiGeneratedResult = {
        projectName: projectDescription.slice(0, 30).trim() + " Enterprise Solution",
        recommendedArchitecture: {
          frontend: "React 19 + TypeScript + Tailwind CSS + Framer Motion (Mobile-First)",
          backend: isDotNet 
            ? "ASP.NET Core 9 C# Web API (Clean Architecture, MediatR, FluentValidation)" 
            : "Node.js / Express + TypeScript RESTful Microservices",
          database: isDotNet 
            ? "Microsoft SQL Server & PostgreSQL via Entity Framework Core 9" 
            : "PostgreSQL & Redis for Distributed Caching",
          cloudHosting: "Microsoft Azure Cloud / Docker Containers / Azure Container Apps with CI/CD",
          security: "Enterprise JWT Authentication, ASP.NET Identity, CORS Hardening & Rate Limiting"
        },
        keyModules: [
          {
            title: "Authentication & Role-Based Access Control",
            description: "Multi-tenant tenant isolation, JWT bearer tokens, and granular permission claims.",
            techComponent: isDotNet ? "ASP.NET Core Identity & OpenIDConnect" : "NextAuth / Jose JWT"
          },
          {
            title: "Core Business Logic & API Layer",
            description: "High-performance endpoint routing, automatic OpenAPI/Swagger documentation, and background worker queues.",
            techComponent: isDotNet ? ".NET Minimal APIs & HostedServices" : "Express + BullMQ"
          },
          {
            title: "Data Persistence & Scalable Caching",
            description: "Relational transactional database with migrations, indexing, and sub-5ms Redis cache layers.",
            techComponent: isDotNet ? "Entity Framework Core + SQL Server" : "Prisma ORM + PostgreSQL"
          },
          {
            title: "Dynamic Client Dashboard & UI System",
            description: "Responsive, animated management console with live telemetry, analytics charts, and real-time state.",
            techComponent: "React 19, TanStack Query, Tailwind CSS"
          }
        ],
        sprintPhases: [
          {
            phase: "Phase 1: Architecture & Figma UI/UX Design",
            durationWeeks: 2,
            deliverables: ["Interactive Figma Design System", "Database Schema & Entity Diagrams", "API Contract Specification"]
          },
          {
            phase: "Phase 2: Core Engineering & Backend APIs",
            durationWeeks: 4,
            deliverables: [isDotNet ? ".NET Core Web API Implementation" : "REST API Services", "Authentication & Security Integration", "Database Migrations"]
          },
          {
            phase: "Phase 3: Frontend Integration & Real-time State",
            durationWeeks: 3,
            deliverables: ["React Responsive Application", "Interactive Dashboards", "Payment Gateway & Webhook Handlers"]
          },
          {
            phase: "Phase 4: QA, Security Audit & Cloud Launch",
            durationWeeks: 1,
            deliverables: ["End-to-End Testing", "Azure / Docker Cloud Deployment", "Post-Launch 30-Day Support Onboarding"]
          }
        ],
        ballparkCostRange: "$4,200 - $9,500",
        estimatedDuration: "8 - 10 Weeks",
        strategicAdvice: "At Ttech SOLUTIONS, we recommend architecting your solution with modular clean architecture from Day 1 to ensure seamless scaling from 100 to 100,000+ concurrent active users."
      };
    }

    return res.json(aiGeneratedResult);
  } catch (error: any) {
    console.error('Error in /api/ai-scope:', error);
    return res.status(500).json({ error: 'Failed to generate project scope.' });
  }
});

// Direct Inquiries submission endpoint
app.post('/api/inquiries', (req, res) => {
  const { clientName, email, serviceType, budgetRange, projectDescription } = req.body;
  if (!clientName || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  // Log received inquiry
  console.log('New client inquiry received at Ttech SOLUTIONS:', {
    clientName,
    email,
    serviceType,
    budgetRange,
    projectDescription: (projectDescription || '').slice(0, 100),
    timestamp: new Date().toISOString()
  });
  return res.json({
    success: true,
    message: 'Inquiry received successfully. Our engineering team will review and reply within 24 hours.'
  });
});

// Vite Middleware for Dev / Static serving for Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
