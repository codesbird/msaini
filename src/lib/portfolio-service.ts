import { database, isFirebaseConfigured } from "./firebase";
import { ref, get, set, onValue, off } from "firebase/database";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skillCategories as defaultSkillCategories,
  experienceData as defaultExperienceData,
  educationData as defaultEducationData,
  digitalTwinQA as defaultDigitalTwinQA,
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
  lastUpdated: new Date().toISOString(),
};

const LOCAL_STORAGE_KEY = "monu_saini_portfolio_data";

// Helper to get cached or local data if Firebase is not yet connected
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

// Fetch once (e.g. for SSR or initial state)
export async function fetchPortfolioData(): Promise<PortfolioData> {
  if (isFirebaseConfigured() && database) {
    try {
      const portfolioRef = ref(database, "portfolio");
      const snapshot = await get(portfolioRef);
      if (snapshot.exists()) {
        const val = snapshot.val();
        return {
          personalInfo: val.personalInfo || defaultPortfolioData.personalInfo,
          metrics: val.metrics || defaultPortfolioData.metrics,
          projects: val.projects || defaultPortfolioData.projects,
          skillCategories: val.skillCategories || defaultPortfolioData.skillCategories,
          experienceData: val.experienceData || defaultPortfolioData.experienceData,
          educationData: val.educationData || defaultPortfolioData.educationData,
          digitalTwinQA: val.digitalTwinQA || defaultPortfolioData.digitalTwinQA,
          lastUpdated: val.lastUpdated || defaultPortfolioData.lastUpdated,
        };
      }
    } catch (err) {
      console.warn("Error reading from Firebase Realtime Database, using local fallback:", err);
    }
  }
  return getLocalFallbackData();
}

// Subscribe to real-time changes
export function subscribeToPortfolio(callback: (data: PortfolioData) => void): () => void {
  if (isFirebaseConfigured() && database) {
    try {
      const portfolioRef = ref(database, "portfolio");
      const unsubscribe = onValue(portfolioRef, (snapshot) => {
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
            lastUpdated: val.lastUpdated || defaultPortfolioData.lastUpdated,
          };
          callback(merged);
        } else {
          callback(getLocalFallbackData());
        }
      });

      return () => off(portfolioRef, "value", unsubscribe);
    } catch (err) {
      console.warn("Failed to subscribe to Firebase:", err);
    }
  }

  // If not configured, trigger once with local data
  callback(getLocalFallbackData());
  return () => {};
}

// Update a single section
export async function updatePortfolioSection<K extends keyof PortfolioData>(
  sectionKey: K,
  data: PortfolioData[K]
): Promise<boolean> {
  const timestamp = new Date().toISOString();

  // Save to LocalStorage first for instant local persistence
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

  // Save to Firebase Realtime Database if active
  if (isFirebaseConfigured() && database) {
    try {
      const sectionRef = ref(database, `portfolio/${sectionKey}`);
      await set(sectionRef, data);
      await set(ref(database, "portfolio/lastUpdated"), timestamp);
      return true;
    } catch (err) {
      console.error("Firebase update error:", err);
      return false;
    }
  }

  return true;
}

// One-click Seed Initial Data to Firebase
export async function seedFirebaseWithDefaults(): Promise<boolean> {
  if (isFirebaseConfigured() && database) {
    try {
      const portfolioRef = ref(database, "portfolio");
      await set(portfolioRef, {
        ...defaultPortfolioData,
        lastUpdated: new Date().toISOString(),
      });
      return true;
    } catch (err) {
      console.error("Firebase seeding error:", err);
      return false;
    }
  }
  return false;
}
