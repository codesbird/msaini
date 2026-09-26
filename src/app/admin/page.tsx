"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchPortfolioData,
  updatePortfolioSection,
  seedFirebaseWithDefaults,
  defaultPortfolioData,
} from "@/lib/portfolio-service";
import { isFirebaseConfigured } from "@/lib/firebase";
import { PortfolioData, Project, SkillCategory, Experience, Education, DigitalTwinQA, MetricItem } from "@/types/portfolio";
import { FileUpload } from "@/components/admin/FileUpload";
import {
  Shield,
  Save,
  Database,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  LogOut,
  FolderGit2,
  Cpu,
  User,
  Zap,
  BookOpen,
  Bot,
  Layers,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "profile" | "metrics" | "projects" | "skills" | "timeline" | "ai"
  >("profile");

  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "monu2026";

  // Check auth session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch portfolio data
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchPortfolioData();
    setData(result);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passInput === adminPass) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassInput("");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveSection = async <K extends keyof PortfolioData>(sectionKey: K) => {
    setSaving(true);
    const success = await updatePortfolioSection(sectionKey, data[sectionKey]);
    setSaving(false);
    if (success) {
      showToast(`Section "${String(sectionKey)}" synced to Firebase Realtime Database!`);
    } else {
      showToast(`Saved to local cache (Configure Firebase in .env to sync to cloud)`);
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("Seed default portfolio data to Firebase Realtime Database?")) return;
    setSaving(true);
    const ok = await seedFirebaseWithDefaults();
    setSaving(false);
    if (ok) {
      showToast("Successfully seeded initial data to Firebase!");
      loadData();
    } else {
      showToast("Firebase credentials not configured yet. Using local fallback.");
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-term-bg flex items-center justify-center p-4 selection:bg-cyan-500/30">
        <div className="max-w-md w-full p-8 rounded-2xl bg-term-card border border-term-border space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">ADMIN TERMINAL ACCESS</h1>
              <span className="text-[11px] text-slate-400">Security Gate // Monu Saini Portfolio</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-slate-400 block text-[11px]">Passphrase</label>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="Enter admin password (default: monu2026)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-red-400 text-[11px] flex items-center gap-1.5 bg-red-950/40 p-2.5 rounded-lg border border-red-800/40">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Invalid passphrase. Try &apos;monu2026&apos; or check .env.local.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>AUTHENTICATE</span>
              <Shield className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors text-[11px]">
              &larr; Return to Live Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-term-bg text-slate-200 font-sans selection:bg-cyan-500/30 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/80 text-emerald-300 font-mono text-xs shadow-2xl flex items-center gap-2 glow-emerald animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-term-bg/90 border-b border-term-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                CMS CONTROL CENTER
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  DYNAMIC
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isFirebaseConfigured() ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                ></span>
                <span>
                  {isFirebaseConfigured() ? "Firebase Realtime DB: Connected" : "Local Cache Mode (No Firebase URL)"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSeedDefaults}
              disabled={saving}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px]"
              title="Populate Firebase Realtime Database with initial portfolio data"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Seed Firebase Defaults</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 text-cyan-300 font-semibold text-[11px]"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-term-border pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "profile"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <User className="w-4 h-4" />
            <span>01. Hero &amp; Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "metrics"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>02. Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "projects"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>03. Projects ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "skills"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>04. Skills Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "timeline"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>05. Experience &amp; Education</span>
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "ai"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>06. AI Digital Twin</span>
          </button>
        </div>

        {/* TAB 1: Profile & Hero */}
        {activeTab === "profile" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">HERO &amp; IDENTITY SETTINGS</h2>
                <p className="text-slate-400 text-[11px]">Controls top headline, bio, contact links, and badges</p>
              </div>
              <button
                onClick={() => handleSaveSection("personalInfo")}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Save Profile"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.name}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, name: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Handle / CLI Identifier</label>
                <input
                  type="text"
                  value={data.personalInfo.handle}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, handle: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Title</label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, title: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Subtitle</label>
                <input
                  type="text"
                  value={data.personalInfo.subtitle}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, subtitle: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Status Badge</label>
                <input
                  type="text"
                  value={data.personalInfo.statusBadge}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, statusBadge: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Availability Status</label>
                <input
                  type="text"
                  value={data.personalInfo.availabilityStatus}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, availabilityStatus: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Phone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, phone: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, linkedin: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">GitHub URL</label>
                <input
                  type="text"
                  value={data.personalInfo.github}
                  onChange={(e) =>
                    setData({ ...data, personalInfo: { ...data.personalInfo, github: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-[11px]">Personal Bio</label>
              <textarea
                rows={3}
                value={data.personalInfo.bio}
                onChange={(e) =>
                  setData({ ...data, personalInfo: { ...data.personalInfo, bio: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white resize-none font-sans text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Preferred Locations (comma-separated)</label>
                <input
                  type="text"
                  value={data.personalInfo.preferredLocations.join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: {
                        ...data.personalInfo,
                        preferredLocations: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              {/* Vercel Blob File Upload for Resume PDF */}
              <FileUpload
                label="Resume PDF Upload (Vercel Blob Storage)"
                accept=".pdf,.doc,.docx"
                currentUrl={data.personalInfo.resumeUrl}
                onUploaded={(url) =>
                  setData({
                    ...data,
                    personalInfo: { ...data.personalInfo, resumeUrl: url },
                  })
                }
              />
            </div>
          </div>
        )}

        {/* TAB 2: Metrics Grid */}
        {activeTab === "metrics" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">KEY METRICS TELEMETRY</h2>
                <p className="text-slate-400 text-[11px]">Customize the 4 real-time telemetry impact numbers</p>
              </div>
              <button
                onClick={() => handleSaveSection("metrics")}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
              >
                <Save className="w-4 h-4" />
                <span>Save Metrics</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>METRIC #{idx + 1}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Value (e.g. 10+, 2+ YRS, 100%)</label>
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => {
                        const newMetrics = [...data.metrics];
                        newMetrics[idx].value = e.target.value;
                        setData({ ...data, metrics: newMetrics });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Label</label>
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => {
                        const newMetrics = [...data.metrics];
                        newMetrics[idx].label = e.target.value;
                        setData({ ...data, metrics: newMetrics });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Subtext</label>
                    <input
                      type="text"
                      value={m.subtext}
                      onChange={(e) => {
                        const newMetrics = [...data.metrics];
                        newMetrics[idx].subtext = e.target.value;
                        setData({ ...data, metrics: newMetrics });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Projects Management */}
        {activeTab === "projects" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">PROJECTS &amp; SYSTEMS MANAGEMENT</h2>
                <p className="text-slate-400 text-[11px]">
                  Add, edit, delete, or upload Vercel Blob screenshots for projects
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    const newProj: Project = {
                      id: `proj-${Date.now()}`,
                      title: "New Autonomous System",
                      tagline: "Short summary of innovation",
                      category: "AI_AGENT",
                      status: "ACTIVE",
                      date: "2026",
                      description: "Detailed system architecture description...",
                      highlights: ["Key feature highlight 1", "Key feature highlight 2"],
                      techStack: ["Python", "FastAPI", "Docker"],
                      metrics: { label: "Performance", value: "Sub-10ms" },
                      links: { github: "https://github.com/tech2saini" },
                    };
                    setData({ ...data, projects: [newProj, ...data.projects] });
                  }}
                  className="px-3.5 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>

                <button
                  onClick={() => handleSaveSection("projects")}
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Projects</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj, pIdx) => (
                <div
                  key={proj.id || pIdx}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className="text-cyan-400 font-bold">PROJECT #{pIdx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = data.projects.filter((_, i) => i !== pIdx);
                        setData({ ...data, projects: updated });
                      }}
                      className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-slate-400 text-[11px]">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].title = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Category</label>
                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].category = e.target.value as any;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      >
                        <option value="AI_AGENT">AI_AGENT</option>
                        <option value="MACHINE_LEARNING">MACHINE_LEARNING</option>
                        <option value="BACKEND_API">BACKEND_API</option>
                        <option value="BROWSER_EXT">BROWSER_EXT</option>
                        <option value="ECOMMERCE">ECOMMERCE</option>
                      </select>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-slate-400 text-[11px]">Tagline</label>
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].tagline = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Date / Period</label>
                      <input
                        type="text"
                        value={proj.date}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].date = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[pIdx].description = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-sans text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        value={proj.techStack.join(", ")}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].techStack = e.target.value.split(",").map((s) => s.trim());
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Impact Metric Value</label>
                      <input
                        type="text"
                        value={proj.metrics?.value || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].metrics = {
                            label: updated[pIdx].metrics?.label || "Impact",
                            value: e.target.value,
                          };
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">GitHub URL</label>
                      <input
                        type="text"
                        value={proj.links?.github || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].links = { ...updated[pIdx].links, github: e.target.value };
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Live URL</label>
                      <input
                        type="text"
                        value={proj.links?.live || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].links = { ...updated[pIdx].links, live: e.target.value };
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>

                  {/* Vercel Blob Screenshot Upload */}
                  <FileUpload
                    label="Project Screenshot / Architecture Diagram (Vercel Blob Storage)"
                    accept="image/*"
                    currentUrl={proj.imageUrl}
                    onUploaded={(url) => {
                      const updated = [...data.projects];
                      updated[pIdx].imageUrl = url;
                      setData({ ...data, projects: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Skills Matrix */}
        {activeTab === "skills" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">SKILLS MATRIX</h2>
                <p className="text-slate-400 text-[11px]">Manage skill categories, proficiency levels, and badges</p>
              </div>
              <button
                onClick={() => handleSaveSection("skillCategories")}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
              >
                <Save className="w-4 h-4" />
                <span>Save Skills</span>
              </button>
            </div>

            <div className="space-y-6">
              {data.skillCategories.map((cat, cIdx) => (
                <div key={cIdx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...data.skillCategories];
                        updated[cIdx].title = e.target.value;
                        setData({ ...data, skillCategories: updated });
                      }}
                      className="bg-transparent text-white font-bold text-sm border-b border-cyan-500/40 pb-1"
                    />
                    <button
                      onClick={() => {
                        const updated = [...data.skillCategories];
                        updated[cIdx].skills.push({ name: "New Skill", level: "80%", badge: "Proficient" });
                        setData({ ...data, skillCategories: updated });
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700 text-[11px] flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Skill
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex-1 space-y-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updated = [...data.skillCategories];
                              updated[cIdx].skills[sIdx].name = e.target.value;
                              setData({ ...data, skillCategories: updated });
                            }}
                            className="w-full bg-transparent text-white font-medium"
                          />
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={skill.level || ""}
                              onChange={(e) => {
                                const updated = [...data.skillCategories];
                                updated[cIdx].skills[sIdx].level = e.target.value;
                                setData({ ...data, skillCategories: updated });
                              }}
                              placeholder="90%"
                              className="w-12 bg-slate-800 text-[10px] p-0.5 rounded text-center text-slate-300"
                            />
                            <input
                              type="text"
                              value={skill.badge || ""}
                              onChange={(e) => {
                                const updated = [...data.skillCategories];
                                updated[cIdx].skills[sIdx].badge = e.target.value;
                                setData({ ...data, skillCategories: updated });
                              }}
                              placeholder="Badge"
                              className="w-20 bg-slate-800 text-[10px] p-0.5 rounded text-cyan-400"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills = updated[cIdx].skills.filter((_, i) => i !== sIdx);
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Timeline (Experience & Education) */}
        {activeTab === "timeline" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">EXPERIENCE &amp; EDUCATION</h2>
                <p className="text-slate-400 text-[11px]">Work positions and degrees from AKTU &amp; RU</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={async () => {
                    setSaving(true);
                    await updatePortfolioSection("experienceData", data.experienceData);
                    await updatePortfolioSection("educationData", data.educationData);
                    setSaving(false);
                    showToast("Timeline synced to Firebase Realtime Database!");
                  }}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Timeline</span>
                </button>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Professional Positions</h3>
              {data.experienceData.map((exp, eIdx) => (
                <div key={eIdx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...data.experienceData];
                        updated[eIdx].role = e.target.value;
                        setData({ ...data, experienceData: updated });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...data.experienceData];
                        updated[eIdx].company = e.target.value;
                        setData({ ...data, experienceData: updated });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const updated = [...data.experienceData];
                        updated[eIdx].period = e.target.value;
                        setData({ ...data, experienceData: updated });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => {
                        const updated = [...data.experienceData];
                        updated[eIdx].location = e.target.value;
                        setData({ ...data, experienceData: updated });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-emerald-400 uppercase">Academic Credentials</h3>
              {data.educationData.map((edu, edIdx) => (
                <div key={edIdx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...data.educationData];
                        updated[edIdx].degree = e.target.value;
                        setData({ ...data, educationData: updated });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-white font-bold sm:col-span-2"
                    />
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={(e) => {
                        const updated = [...data.educationData];
                        updated[edIdx].grade = e.target.value;
                        setData({ ...data, educationData: updated });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-emerald-400 font-bold"
                    />
                  </div>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const updated = [...data.educationData];
                      updated[edIdx].institution = e.target.value;
                      setData({ ...data, educationData: updated });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AI Digital Twin */}
        {activeTab === "ai" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">AI DIGITAL TWIN KNOWLEDGE BASE</h2>
                <p className="text-slate-400 text-[11px]">
                  Add or edit conversational answers used by your interactive AI agent proxy
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    const newQA: DigitalTwinQA = {
                      question: "New custom question?",
                      answer: "Curated answer that the AI agent will return...",
                      keywords: ["custom", "topic"],
                    };
                    setData({ ...data, digitalTwinQA: [newQA, ...data.digitalTwinQA] });
                  }}
                  className="px-3.5 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add QA Pair</span>
                </button>

                <button
                  onClick={() => handleSaveSection("digitalTwinQA")}
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
                >
                  <Save className="w-4 h-4" />
                  <span>Save AI Knowledge</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {data.digitalTwinQA.map((qa, qIdx) => (
                <div key={qIdx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold">QA #{qIdx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = data.digitalTwinQA.filter((_, i) => i !== qIdx);
                        setData({ ...data, digitalTwinQA: updated });
                      }}
                      className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">User Question</label>
                    <input
                      type="text"
                      value={qa.question}
                      onChange={(e) => {
                        const updated = [...data.digitalTwinQA];
                        updated[qIdx].question = e.target.value;
                        setData({ ...data, digitalTwinQA: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Agent Answer</label>
                    <textarea
                      rows={2}
                      value={qa.answer}
                      onChange={(e) => {
                        const updated = [...data.digitalTwinQA];
                        updated[qIdx].answer = e.target.value;
                        setData({ ...data, digitalTwinQA: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-300 font-sans text-xs resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Trigger Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={qa.keywords.join(", ")}
                      onChange={(e) => {
                        const updated = [...data.digitalTwinQA];
                        updated[qIdx].keywords = e.target.value.split(",").map((s) => s.trim());
                        setData({ ...data, digitalTwinQA: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-400 text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
