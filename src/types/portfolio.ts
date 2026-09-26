export interface PersonalInfo {
  name: string;
  handle: string;
  pronouns: string;
  title: string;
  subtitle: string;
  statusBadge: string;
  availabilityStatus: string;
  openToRoles: string[];
  preferredLocations: string[];
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  yearsOfExp: string;
  aiProjectsCount: string;
  clientSatisfaction: string;
  followersCount: string;
  bio: string;
  avatarUrl?: string;
  resumeUrl?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  subtext: string;
  icon?: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "AI_AGENT" | "MACHINE_LEARNING" | "BACKEND_API" | "BROWSER_EXT" | "ECOMMERCE";
  status: "ACTIVE" | "PRODUCTION" | "FEATURED";
  date: string;
  description: string;
  highlights: string[];
  techStack: string[];
  imageUrl?: string;
  metrics: {
    label: string;
    value: string;
  };
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level?: string;
    badge?: string;
  }[];
}

export interface DigitalTwinQA {
  question: string;
  answer: string;
  keywords: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  metrics: MetricItem[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experienceData: Experience[];
  educationData: Education[];
  digitalTwinQA: DigitalTwinQA[];
  lastUpdated?: string;
}
