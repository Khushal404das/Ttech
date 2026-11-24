import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { advisorReply, SYSTEM_PROMPT } from './chat-advisor';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// The Gemini key comes ONLY from the server environment (.env / hosting
// settings). Keys sent from the browser are ignored so nobody can swap it.
function getEffectiveKey(): string {
  return (process.env.GEMINI_API_KEY || '').trim();
}

function getAIClient() {
  const key = getEffectiveKey();
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

// Multi-turn Gemini Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  // Fallback consultant: guided, conversation-aware replies (works without Gemini)
  const fallback = (history: { role: string; content: string }[]) => advisorReply(history);

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required.' });
    }

    // Keep the last 16 turns, cap each message length
    const history = messages
      .slice(-16)
      .map((m: any) => ({
        role: m?.role === 'user' ? 'user' : 'model',
        content: String(m?.content || '').slice(0, 2000),
      }))
      .filter((m) => m.content.trim());

    const effectiveKey = getEffectiveKey();

    if (effectiveKey) {
      // Gemini requires the conversation to start with a user turn
      const firstUser = history.findIndex((m) => m.role === 'user');
      const contents = history.slice(Math.max(firstUser, 0)).map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      try {
        const ai = new GoogleGenAI({ apiKey: effectiveKey });
        // Visitors shouldn't wait long: 9s per model, ~14s overall, then the
        // built-in advisor answers instead.
        const deadline = Date.now() + 14000;
        for (const candidateModel of ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-flash-latest']) {
          const remaining = deadline - Date.now();
          if (remaining < 2000) break;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), Math.min(9000, remaining));
          try {
            const response = await ai.models.generateContent({
              model: candidateModel,
              contents,
              // System prompt lives on the server so visitors can't repurpose the bot
              config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.5,
                maxOutputTokens: 2048,
                abortSignal: controller.signal,
              },
            });
            clearTimeout(timer);
            if (response?.text) {
              return res.json({ text: response.text, role: 'model', model: candidateModel, provider: 'gemini-api' });
            }
          } catch (err: any) {
            clearTimeout(timer);
            const errMsg = controller.signal.aborted ? 'timed out' : String(err?.message || '');
            console.warn(`Gemini ${candidateModel} failed: ${errMsg.slice(0, 200)}`);
            if (/PERMISSION_DENIED|API_KEY_INVALID|\b40[13]\b/.test(errMsg)) break;
          }
        }
      } catch (genAiErr) {
        console.warn('Gemini client init error:', genAiErr);
      }
    }

    return res.json({ text: fallback(history), role: 'model', model: 'ttech-ai-advisor' });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const history = Array.isArray(req.body?.messages) ? req.body.messages : [];
    return res.json({ text: fallback(history), role: 'model', model: 'ttech-ai-advisor' });
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
        model: 'gemini-flash-latest',
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
          model: 'gemini-flash-latest',
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
