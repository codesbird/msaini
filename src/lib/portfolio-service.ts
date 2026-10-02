import { database, isFirebaseConfigured } from "./firebase";
import { ref, onValue, off } from "firebase/database";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skillCategories as defaultSkillCategories,
  experienceData as defaultExperienceData,
  educationData as defaultEducationData,
  digitalTwinQA as defaultDigitalTwinQA,
  defaultSmtpConfig,
  defaultSecurityConfig,
} from "@/data/portfolio-data";
import { PortfolioData, MetricItem } from "@/types/portfolio";

export const defaultMetrics: MetricItem[] = [
  {
    label: "AI & ML PROJECTS",
    value: defaultPersonalInfo.aiProjectsCount,
    subtext: "n8n Agents, MCP & Classifiers",
    icon: "Bot",
    color: "text-cyan-400",
  },
  {
    label: "INDUSTRY EXPERIENCE",
    value: defaultPersonalInfo.yearsOfExp,
    subtext: "Years in Backend & Automation",
    icon: "Zap",
    color: "text-amber-400",
  },
  {
    label: "CLIENT SATISFACTION",
    value: defaultPersonalInfo.clientSatisfaction,
    subtext: "Delivered with zero regression",
    icon: "Award",
    color: "text-emerald-400",
  },
  {
    label: "LINKEDIN NETWORK",
    value: defaultPersonalInfo.followersCount,
    subtext: "Followers & Tech Community",
    icon: "Users",
    color: "text-purple-400",
  },
];

export const defaultPortfolioData: PortfolioData = {
  personalInfo: defaultPersonalInfo,
  metrics: defaultMetrics,
  projects: defaultProjects,
  skillCategories: defaultSkillCategories,
  experienceData: defaultExperienceData,
  educationData: defaultEducationData,
  digitalTwinQA: defaultDigitalTwinQA,
  smtpConfig: defaultSmtpConfig,
  securityConfig: defaultSecurityConfig,
  lastUpdated: new Date().toISOString(),
};

const LOCAL_STORAGE_KEY = "monu_saini_portfolio_data";

// Helper to get cached or local data
export const getLocalFallbackData = (): PortfolioData => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return { ...defaultPortfolioData, ...JSON.parse(stored) };
      }
    } catch {
      // Fallback
    }
  }
  return defaultPortfolioData;
};

// Fetch data (Server-side Admin route or client fallback)
export async function fetchPortfolioData(): Promise<PortfolioData> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const merged: PortfolioData = {
            personalInfo: json.data.personalInfo || defaultPortfolioData.personalInfo,
            metrics: json.data.metrics || defaultPortfolioData.metrics,
            projects: json.data.projects || defaultPortfolioData.projects,
            skillCategories: json.data.skillCategories || defaultPortfolioData.skillCategories,
            experienceData: json.data.experienceData || defaultPortfolioData.experienceData,
            educationData: json.data.educationData || defaultPortfolioData.educationData,
            digitalTwinQA: json.data.digitalTwinQA || defaultPortfolioData.digitalTwinQA,
            smtpConfig: json.data.smtpConfig || defaultPortfolioData.smtpConfig,
            securityConfig: json.data.securityConfig || defaultPortfolioData.securityConfig,
            lastUpdated: json.data.lastUpdated || defaultPortfolioData.lastUpdated,
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
      }
    } catch (e) {
      console.warn("Could not fetch from /api/portfolio, using local fallback:", e);
    }
  }
  return getLocalFallbackData();
}

// Real-time subscription to Firebase changes
export function subscribeToPortfolio(callback: (data: PortfolioData) => void): () => void {
  // If client-side Firebase is connected, attach listener
  if (isFirebaseConfigured() && database) {
    try {
      const portfolioRef = ref(database, "portfolio");
      const unsubscribe = onValue(
        portfolioRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            const merged: PortfolioData = {
              personalInfo: val.personalInfo || defaultPortfolioData.personalInfo,
              metrics: val.metrics || defaultPortfolioData.metrics,
              projects: val.projects || defaultPortfolioData.projects,
              skillCategories: val.skillCategories || defaultPortfolioData.skillCategories,
              experienceData: val.experienceData || defaultPortfolioData.experienceData,
              educationData: val.educationData || defaultPortfolioData.educationData,
              digitalTwinQA: val.digitalTwinQA || defaultPortfolioData.digitalTwinQA,
              smtpConfig: val.smtpConfig || defaultPortfolioData.smtpConfig,
              securityConfig: val.securityConfig || defaultPortfolioData.securityConfig,
              lastUpdated: val.lastUpdated || defaultPortfolioData.lastUpdated,
            };
            callback(merged);
          } else {
            // If empty in Firebase, try server API or local
            fetchPortfolioData().then(callback);
          }
        },
        (error) => {
          console.warn("Client RTDB listener error (falling back to /api/portfolio):", error);
          fetchPortfolioData().then(callback);
        }
      );

      return () => off(portfolioRef, "value", unsubscribe);
    } catch (err) {
      console.warn("Failed to subscribe to client Firebase:", err);
    }
  }

  // Initial load
  fetchPortfolioData().then(callback);
  return () => {};
}

// Update section via Server-Side Firebase Admin API
export async function updatePortfolioSection<K extends keyof PortfolioData>(
  sectionKey: K,
  data: PortfolioData[K]
): Promise<boolean> {
  const timestamp = new Date().toISOString();

  // Save to LocalStorage immediately for instant UX feedback
  if (typeof window !== "undefined") {
    try {
      const current = getLocalFallbackData();
      const updated = {
        ...current,
        [sectionKey]: data,
        lastUpdated: timestamp,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  // Push to Server-Side API using Firebase Admin SDK
  try {
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: sectionKey, data }),
    });

    if (res.ok) {
      return true;
    }
    const errData = await res.json();
    console.error("API error updating section:", errData);
  } catch (err) {
    console.error("Network error updating section via API:", err);
  }

  return true;
}

// One-click Seed Initial Data to Firebase via Admin API
export async function seedFirebaseWithDefaults(): Promise<boolean> {
  try {
    const res = await fetch("/api/portfolio", {
      method: "PUT",
    });

    if (res.ok) {
      // Also update local cache
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultPortfolioData));
      }
      return true;
    }
  } catch (err) {
    console.error("Error seeding Firebase via API:", err);
  }
  return false;
}
