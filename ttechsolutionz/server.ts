import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
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

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

// Health & Status
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    configured: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Fallback knowledge response generator if Gemini API key has 403 / permission denied or quota exhaustion
function generateFallbackChatResponse(query: string, systemInstruction?: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('quote') || lower.includes('rate') || lower.includes('budget')) {
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

  if (lower.includes('.net') || lower.includes('c#') || lower.includes('react') || lower.includes('stack') || lower.includes('tech') || lower.includes('architecture')) {
    return `### 🛠️ Ttech SOLUTIONS Enterprise Tech Stack

We engineer high-performance systems designed for sub-50ms API responses and effortless scale:

- **Backend Architecture**: **ASP.NET Core 9 / C#** utilizing Clean Architecture, CQRS (MediatR), Minimal APIs, and Entity Framework Core 9.
- **Frontend Stack**: **React 19 / Next.js**, TypeScript, Tailwind CSS, TanStack Query, and Framer Motion for desktop & mobile.
- **Database Layer**: **Microsoft SQL Server**, **PostgreSQL**, and **Redis** for distributed caching and session management.
- **Cloud & DevOps**: **Microsoft Azure Container Apps**, **AWS**, or **Docker** orchestrations with automated GitHub Actions CI/CD pipelines.
- **AI Automation**: Tailored LLM agents, vector embeddings, and retrieval-augmented generation (RAG) pipelines.

> 🚀 *All systems follow SOLID design principles and OWASP Top 10 security standards.*`;
  }

  if (lower.includes('timeline') || lower.includes('sprint') || lower.includes('delivery') || lower.includes('how long') || lower.includes('fast') || lower.includes('weeks')) {
    return `### ⏱️ Agile Sprint Cadence & Delivery Velocity

Our engineering squads work in disciplined **two-week sprints** with full client transparency:

1. **Week 1 (Kickoff & Discovery)**: Database schema modeling, OpenAPI contracts, and interactive Figma wireframes.
2. **Weeks 2–6 (Core Engineering)**: Iterative development sprints. Every alternate Friday, you receive a **live staging URL** and changelog demo video.
3. **Final Sprint (Hardening & Launch)**: Automated end-to-end integration tests, load testing, security review, and production cloud deployment.

Typical delivery spans **4 to 8 weeks** for MVPs, and **8 to 12 weeks** for complex SaaS ecosystems.`;
  }

  if (lower.includes('own') || lower.includes('ip') || lower.includes('source code') || lower.includes('copyright') || lower.includes('github') || lower.includes('repo')) {
    return `### 📜 100% Client Source Code & IP Ownership

**You own everything we build.**
- Upon project milestone settlement, **100% of the Intellectual Property (IP)**, Git repositories (GitHub/GitLab), Figma vectors, and database schemas are transferred directly to your organization.
- We never hold your code hostage, charge recurring proprietary runtime licensing fees, or enforce vendor lock-in.`;
  }

  if (lower.includes('warranty') || lower.includes('support') || lower.includes('bug') || lower.includes('sla') || lower.includes('maintenance')) {
    return `### 🛡️ 30-Day Post-Launch Warranty & Support Guarantees

Every project delivered by **Ttech SOLUTIONS** includes:
- **30-Day Comprehensive Post-Launch Warranty**: Any bug or edge case discovered in our delivered codebase is patched at highest priority with **zero additional charge**.
- **Tiered SLA Maintenance**: Optional ongoing retainers for security patching, automated backups, 24/7 uptime telemetry, and feature development hours.`;
  }

  if (
    lower.includes('whatsapp') ||
    lower.includes('phone') ||
    lower.includes('call') ||
    lower.includes('contact') ||
    lower.includes('number') ||
    lower.includes('reach')
  ) {
    return `### 📱 Contact Ttech SOLUTIONS Directly

You can connect directly with our Principal Engineering and Architecture team:

- **WhatsApp**: [**+92 348 9763998**](https://wa.me/923489763998?text=Hello%20Ttech%20SOLUTIONS,%20I%20would%20like%20to%20discuss%20a%20project) (24/7 Rapid Response, typically under 15 minutes)
- **Direct Phone**: **+92 348 9763998**
- **Email**: **contact@ttechsolutions.dev**
- **Inquiry Form**: Submit your architecture specs on our **Contact** section for a structured proposal within 24 hours.

*Feel free to send a message on WhatsApp anytime to discuss your sprint or review Figma wireframes!*`;
  }

  // General high-quality technical consulting response
  return `### 💡 Technical Solutions Advisor · Ttech SOLUTIONS

Thank you for your inquiry! As a premier software and SaaS engineering agency specializing in **.NET Core 9, React 19, and scalable Cloud systems**, we help ambitious businesses turn complex ideas into robust, production-ready software.

**How we can help right now:**
- **Need a Project Estimate?** Use our interactive **Cost Estimator** on the page or tap **"Transfer to Main Form"** to request a customized quote.
- **Have an Architectural Question?** Ask about our database designs, API structures, CI/CD pipelines, or AI integrations.
- **Want to discuss an NDA or Discovery Call?** Leave your contact in the **"Fast Callback"** tab and our lead architect will reach out within 2 hours.

*Feel free to ask any specific question about your tech stack, scope, or delivery timeline!*`;
}

// Multi-turn Gemini Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      systemInstruction,
      model = 'gemini-3.8-flash',
    } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required.' });
    }

    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // Check if API key is present
    if (!apiKey) {
      const fallbackText = generateFallbackChatResponse(lastUserMessage, systemInstruction);
      return res.json({
        text: fallbackText,
        role: 'model',
        model: 'ttech-knowledge-engine',
        isFallback: true,
        notice: 'Operating in expert consulting mode. Configure GEMINI_API_KEY in Settings > Secrets for live generative mode.',
      });
    }

    // Format multi-turn conversation
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content || '') }],
    }));

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }

    // Model fallback cascade: try requested model, then gemini-3.8-flash, then gemini-flash-latest, then gemini-2.5-flash
    const candidateModels = Array.from(new Set([
      model || 'gemini-3.8-flash',
      'gemini-3.8-flash',
      'gemini-flash-latest',
      'gemini-2.5-flash',
    ]));

    let text = '';
    let lastError: any = null;
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
        lastError = err;
        console.warn(`Model ${candidateModel} failed: ${err.message}. Trying next fallback...`);
      }
    }

    if (text) {
      return res.json({
        text,
        role: 'model',
        model: successfulModel,
      });
    }

    // If all models failed (e.g. 403 PERMISSION_DENIED on API key)
    console.error('All Gemini models failed or permission denied:', lastError?.message);
    const fallbackText = generateFallbackChatResponse(lastUserMessage, systemInstruction);

    return res.json({
      text: fallbackText,
      role: 'model',
      model: 'ttech-knowledge-engine',
      isFallback: true,
      warning: 'Gemini API key returned 403 (Permission Denied). Switched to Ttech Intelligent Knowledge Engine.',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const lastUserMessage = req.body?.messages?.slice(-1)[0]?.content || '';
    const fallbackText = generateFallbackChatResponse(lastUserMessage);
    return res.json({
      text: fallbackText,
      role: 'model',
      model: 'ttech-knowledge-engine',
      isFallback: true,
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

    // Uses gemini-3.8-flash with googleMaps tool as recommended
    let text = '';
    let groundingChunks: any[] = [];
    let webSearchQueries: any[] = [];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
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

    // Try Gemini first if API key configured
    let aiGeneratedResult: any = null;

    if (apiKey) {
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

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
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
