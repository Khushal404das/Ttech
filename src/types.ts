export type AppSection = 
  | 'home' 
  | 'services' 
  | 'dotnet-stack' 
  | 'estimator' 
  | 'portfolio' 
  | 'ai-scoper' 
  | 'testimonials' 
  | 'faq'
  | 'inquiry'
  | 'dashboard'
  | 'chat'
  | 'maps'
  | 'notes'
  | 'profile';

export interface FAQItem {
  id: string;
  category: 'process' | 'pricing' | 'support';
  categoryLabel: string;
  question: string;
  summary: string;
  answer: string;
  keyPoints?: string[];
  recommendedAction?: {
    label: string;
    section: AppSection;
    parameter?: string;
  };
}

export interface AgencyService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  highlightBadge: string;
  technologies: string[];
  deliverables: string[];
  timeline: string;
  featuredInBanner: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'SaaS & WebApps' | 'Enterprise .NET' | 'UI/UX Design' | 'E-Commerce' | 'AI Automation';
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  architecturePreview: string;
  demoType: 'dashboard' | 'ecommerce' | 'api' | 'ui';
  testimonialQuote?: string;
  clientRole?: string;
}

export interface TechStackCategory {
  category: string;
  description: string;
  technologies: {
    name: string;
    description: string;
    icon: string;
    isPrimary?: boolean;
    badge?: string;
  }[];
}

export interface ProjectInquiry {
  id?: string;
  clientName: string;
  email: string;
  phone?: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  preferredTech: string;
  projectDescription: string;
  estimatedFeatures?: string[];
  status: 'new' | 'in_review' | 'contacted' | 'booked';
  createdAt?: any;
}

export interface QuoteConfig {
  serviceType: string;
  targetPlatform: string[];
  features: string[];
  preferredStack: string;
  urgency: 'standard' | 'accelerated' | 'enterprise';
}

export interface AIScopeResult {
  projectName: string;
  recommendedArchitecture: {
    frontend: string;
    backend: string;
    database: string;
    cloudHosting: string;
    security: string;
  };
  keyModules: {
    title: string;
    description: string;
    techComponent: string;
  }[];
  sprintPhases: {
    phase: string;
    durationWeeks: number;
    deliverables: string[];
  }[];
  ballparkCostRange: string;
  estimatedDuration: string;
  strategicAdvice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export type GeminiModelType = 'gemini-3.8-flash' | 'gemini-flash-latest' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';

export interface ChatPersona {
  id: string;
  name: string;
  model: GeminiModelType;
  description: string;
  systemInstruction: string;
  icon: string;
  badge: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        reviewText?: string;
        authorAttribution?: {
          displayName?: string;
          photoUri?: string;
        };
      }>;
    };
  };
}

export interface SavedPlace {
  id?: string;
  title: string;
  uri?: string;
  address?: string;
  notes?: string;
  category?: string;
  createdAt?: any;
}

export interface WorkspaceNote {
  id?: string;
  title: string;
  content: string;
  category: 'General' | 'AI Insights' | 'Places' | 'Ideas';
  createdAt?: any;
  updatedAt?: any;
}
