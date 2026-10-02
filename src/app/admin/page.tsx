"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchPortfolioData,
  updatePortfolioSection,
  seedFirebaseWithDefaults,
  defaultPortfolioData,
} from "@/lib/portfolio-service";
import { defaultSmtpConfig } from "@/data/portfolio-data";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  PortfolioData,
  Project,
  SkillCategory,
  Experience,
  Education,
  DigitalTwinQA,
  MetricItem,
  SmtpConfig,
} from "@/types/portfolio";
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
  Mail,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Send,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "profile" | "metrics" | "projects" | "skills" | "timeline" | "ai" | "smtp"
  >("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    server: true,
    auth: true,
    routing: true,
    test: true,
  });

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "monu2026";

  const navItems = [
    {
      id: "profile" as const,
      num: "01",
      label: "Hero & Profile",
      sub: "Bio, roles & social links",
      icon: User,
    },
    {
      id: "metrics" as const,
      num: "02",
      label: "Live Metrics",
      sub: `${data.metrics?.length || 4} telemetry counters`,
      badge: `${data.metrics?.length || 4}`,
      icon: Zap,
    },
    {
      id: "projects" as const,
      num: "03",
      label: "Projects Matrix",
      sub: `${data.projects?.length || 0} showcase projects`,
      badge: `${data.projects?.length || 0}`,
      icon: FolderGit2,
    },
    {
      id: "skills" as const,
      num: "04",
      label: "Skills Engine",
      sub: `${data.skillCategories?.length || 0} skill categories`,
      badge: `${data.skillCategories?.length || 0}`,
      icon: Layers,
    },
    {
      id: "timeline" as const,
      num: "05",
      label: "Career Timeline",
      sub: `${(data.experienceData?.length || 0) + (data.educationData?.length || 0)} milestones`,
      badge: `${(data.experienceData?.length || 0) + (data.educationData?.length || 0)}`,
      icon: BookOpen,
    },
    {
      id: "ai" as const,
      num: "06",
      label: "AI Digital Twin",
      sub: `${data.digitalTwinQA?.length || 0} dataset entries`,
      badge: `${data.digitalTwinQA?.length || 0}`,
      icon: Bot,
    },
    {
      id: "smtp" as const,
      num: "07",
      label: "SMTP Mail Relay",
      sub: data.smtpConfig?.enabled ? "Active & Routing" : "Standby (Disabled)",
      statusDot: data.smtpConfig?.enabled ? "bg-emerald-400" : "bg-slate-500",
      icon: Mail,
    },
  ];

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

  const handleTestSmtp = async () => {
    setTestingSmtp(true);
    setTestResult(null);
    try {
      const activeConfig = data.smtpConfig || defaultPortfolioData.smtpConfig || defaultSmtpConfig;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          config: activeConfig,
        }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setTestResult({ success: true, message: resJson.message });
      } else {
        setTestResult({
          success: false,
          error: resJson.error || "Handshake failed. Please verify host, user, and password.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || "Network error when attempting SMTP verification.",
      });
    } finally {
      setTestingSmtp(false);
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
        <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                CMS CONTROL CENTER
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 hidden sm:inline">
                  DYNAMIC
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isFirebaseConfigured() ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                ></span>
                <span className="hidden sm:inline">
                  {isFirebaseConfigured() ? "Firebase Realtime DB: Connected" : "Local Cache Mode (No Firebase URL)"}
                </span>
                <span className="sm:hidden text-[10px]">
                  {isFirebaseConfigured() ? "DB Connected" : "Local Mode"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleSeedDefaults}
              disabled={saving}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] transition-colors"
              title="Populate Firebase Realtime Database with initial portfolio data"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Seed Defaults</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 text-cyan-300 font-semibold text-[11px] transition-colors"
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-term-border bg-term-bg/95 backdrop-blur-md p-4 space-y-3 font-mono text-xs animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider font-semibold pb-1 border-b border-slate-800">
              <span>Telemetry Modules</span>
              <span className="text-cyan-400">7 Sections</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-lg flex items-center justify-between text-left transition-all ${
                      isActive
                        ? "bg-cyan-950/90 text-cyan-300 border border-cyan-500/60 font-bold shadow-md shadow-cyan-950/50"
                        : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-850"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`p-1.5 rounded shrink-0 ${
                          isActive
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-slate-500 text-[10px] mr-1">{item.num}.</span>
                        <span>{item.label}</span>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Admin Layout with Sidebar */}
      <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-20 space-y-4">
            {/* Mobile Module Quick Switcher */}
            <div className="lg:hidden flex items-center justify-between p-3.5 rounded-xl bg-term-card border border-term-border text-xs font-mono shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {(() => {
                    const current = navItems.find((i) => i.id === activeTab);
                    const CurIcon = current?.icon || User;
                    return <CurIcon className="w-4 h-4" />;
                  })()}
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Active Module
                  </div>
                  <div className="text-white font-bold text-xs">
                    {navItems.find((i) => i.id === activeTab)?.label}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <span>Modules</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Desktop Sidebar Module Navigation Panel */}
            <div className="hidden lg:block bg-term-card border border-term-border rounded-xl p-3.5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider font-mono">
                    Telemetry Modules
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono">
                  7 Sections
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="mt-3 space-y-1.5 font-mono">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-950/80 to-slate-900/90 text-white border-l-2 border-l-cyan-400 border-y border-r border-cyan-800/50 shadow-md shadow-cyan-950/30"
                          : "bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-1.5 rounded-md shrink-0 transition-colors ${
                            isActive
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-slate-800/70 text-slate-500 group-hover:text-slate-300 border border-slate-700/50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-[11px] font-semibold truncate flex items-center gap-1.5 ${
                              isActive ? "text-cyan-200" : "text-slate-300 group-hover:text-white"
                            }`}
                          >
                            <span className="text-slate-500 text-[10px]">{item.num}.</span>
                            <span>{item.label}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">{item.sub}</div>
                        </div>
                      </div>

                      <div className="shrink-0 pl-2 flex items-center gap-1.5">
                        {item.statusDot && (
                          <span className={`w-2 h-2 rounded-full ${item.statusDot}`}></span>
                        )}
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                              isActive
                                ? "bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold"
                                : "bg-slate-800 text-slate-400 border border-slate-700"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive
                              ? "text-cyan-400 translate-x-0.5"
                              : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* System Status & Quick Actions Card */}
            <div className="hidden lg:block bg-term-card border border-term-border rounded-xl p-3.5 shadow-lg space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Persistence Engine</span>
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                    isFirebaseConfigured()
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-amber-950 text-amber-400 border border-amber-800"
                  }`}
                >
                  {isFirebaseConfigured() ? "ONLINE" : "LOCAL"}
                </span>
              </div>

              <div className="space-y-1.5 text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cloud Region:</span>
                  <span className="text-slate-300 font-mono">IN-NORTH / SG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Database:</span>
                  <span className="text-slate-300 font-mono truncate max-w-[140px]" title="Firebase Realtime Database">
                    Firebase RTDB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Uptime:</span>
                  <span className="text-emerald-400 font-mono font-bold">99.98%</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <button
                  onClick={handleSeedDefaults}
                  disabled={saving}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] flex items-center justify-center gap-2 transition-colors font-mono"
                >
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Seed Firebase Defaults</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <Link
                    href="/about"
                    target="_blank"
                    className="p-1.5 rounded bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>/about</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <Link
                    href="/contact"
                    target="_blank"
                    className="p-1.5 rounded bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>/contact</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Module Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-8">

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

        {/* TAB 7: SMTP Relay Configuration (Editable with Accordion) */}
        {activeTab === "smtp" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-6 font-mono text-xs">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">SMTP RELAY &amp; EMAIL DISPATCHER</h2>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                      data.smtpConfig?.enabled
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : "bg-amber-950 text-amber-400 border-amber-800"
                    }`}
                  >
                    {data.smtpConfig?.enabled ? "LIVE_RELAY_ACTIVE" : "STANDBY_MODE"}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] pt-0.5">
                  Route incoming recruiter transmissions from /contact and home page directly to your inbox.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveSection("smtpConfig")}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition-all glow-emerald"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save SMTP Settings"}</span>
                </button>
              </div>
            </div>

            {/* Accordion Container */}
            <div className="space-y-4">
              {/* Accordion 1: Server Connection & Protocols */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion("server")}
                  className="w-full p-4 bg-slate-900/90 hover:bg-slate-850 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                      <Cpu className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-white font-bold">1. SMTP Server &amp; Connection Protocols</div>
                      <div className="text-[11px] text-slate-400">Host, port, SSL/TLS, and relay status toggle</div>
                    </div>
                  </div>
                  {openAccordions.server ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openAccordions.server && (
                  <div className="p-4 sm:p-5 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    {/* Quick Provider Presets */}
                    <div className="space-y-1.5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Quick Presets:</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                host: "smtp.gmail.com",
                                port: 587,
                                secure: false,
                              },
                            });
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                            data.smtpConfig?.host === "smtp.gmail.com" && data.smtpConfig?.port === 587 && !data.smtpConfig?.secure
                              ? "bg-cyan-950 border-cyan-400 text-cyan-300 font-bold"
                              : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          ⚡ Gmail Port 587 (STARTTLS - Recommended)
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                host: "smtp.gmail.com",
                                port: 465,
                                secure: true,
                              },
                            });
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                            data.smtpConfig?.host === "smtp.gmail.com" && data.smtpConfig?.port === 465 && data.smtpConfig?.secure
                              ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold"
                              : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          🔒 Gmail Port 465 (Direct SSL)
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                host: "smtp.sendgrid.net",
                                port: 587,
                                secure: false,
                              },
                            });
                          }}
                          className="px-2.5 py-1 rounded text-[11px] border bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
                        >
                          🌐 SendGrid Port 587
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-slate-300 text-[11px] font-semibold">SMTP Host</label>
                        <input
                          type="text"
                          value={data.smtpConfig?.host || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                host: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. smtp.gmail.com or smtp.sendgrid.net"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 text-[11px] font-semibold">Port</label>
                        <input
                          type="number"
                          value={data.smtpConfig?.port || 587}
                          onChange={(e) => {
                            const newPort = parseInt(e.target.value, 10) || 587;
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                port: newPort,
                                secure: newPort === 465,
                              },
                            });
                          }}
                          placeholder="587 or 465"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Protocol Mismatch Helper Callout */}
                    {data.smtpConfig?.secure && (data.smtpConfig?.port === 587 || data.smtpConfig?.port === 25) && (
                      <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-[11px] space-y-1.5 font-sans">
                        <div className="font-bold flex items-center gap-1.5 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Protocol Mismatch Detected: Port 587 + Direct SSL</span>
                        </div>
                        <p>
                          Port 587 uses <strong>STARTTLS</strong> (upgrades from cleartext). Direct SSL is only supported on <strong>Port 465</strong>. Connecting with direct SSL on port 587 triggers OpenSSL <em>&quot;wrong version number&quot;</em> error.
                        </p>
                        <div className="flex gap-2 pt-1 font-mono">
                          <button
                            type="button"
                            onClick={() =>
                              setData({
                                ...data,
                                smtpConfig: {
                                  ...(data.smtpConfig || defaultSmtpConfig),
                                  port: 465,
                                  secure: true,
                                },
                              })
                            }
                            className="px-2 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800/60 text-amber-200 border border-amber-700 text-[10px]"
                          >
                            Switch to Port 465 (Keep SSL)
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setData({
                                ...data,
                                smtpConfig: {
                                  ...(data.smtpConfig || defaultSmtpConfig),
                                  secure: false,
                                },
                              })
                            }
                            className="px-2 py-0.5 rounded bg-cyan-900/60 hover:bg-cyan-800/60 text-cyan-200 border border-cyan-700 text-[10px]"
                          >
                            Use STARTTLS on Port 587
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <label className="flex items-center space-x-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                        <input
                          type="checkbox"
                          checked={data.smtpConfig?.secure || false}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                secure: isChecked,
                                port: isChecked
                                  ? 465
                                  : data.smtpConfig?.port === 465
                                  ? 587
                                  : data.smtpConfig?.port || 587,
                              },
                            });
                          }}
                          className="rounded border-slate-700 text-cyan-500 focus:ring-0 w-4 h-4 bg-slate-800"
                        />
                        <div>
                          <div className="text-slate-200 font-semibold">Use SSL / Direct TLS (Port 465)</div>
                          <div className="text-[10px] text-slate-500">
                            {data.smtpConfig?.secure
                              ? "Active: Direct SMTPS (Port 465)"
                              : "Unchecked: Uses STARTTLS on Port 587"}
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                        <input
                          type="checkbox"
                          checked={data.smtpConfig?.enabled || false}
                          onChange={(e) =>
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                enabled: e.target.checked,
                              },
                            })
                          }
                          className="rounded border-slate-700 text-emerald-500 focus:ring-0 w-4 h-4 bg-slate-800"
                        />
                        <div>
                          <div className="text-slate-200 font-semibold">Enable Live SMTP Dispatch</div>
                          <div className="text-[10px] text-slate-500">When disabled, inquiries are safely queued in database</div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Authentication Credentials */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion("auth")}
                  className="w-full p-4 bg-slate-900/90 hover:bg-slate-850 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800/80">
                      <Shield className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-white font-bold">2. Authentication &amp; Credentials</div>
                      <div className="text-[11px] text-slate-400">Username, account password, or app-specific key</div>
                    </div>
                  </div>
                  {openAccordions.auth ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openAccordions.auth && (
                  <div className="p-4 sm:p-5 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 text-[11px] font-semibold">SMTP Username / Email</label>
                        <input
                          type="text"
                          value={data.smtpConfig?.user || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                user: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. monusainideveloper@gmail.com"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 text-[11px] font-semibold">SMTP Password / App Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={data.smtpConfig?.pass || ""}
                            onChange={(e) =>
                              setData({
                                ...data,
                                smtpConfig: {
                                  ...(data.smtpConfig || defaultSmtpConfig),
                                  pass: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter 16-character Google App Password or SMTP key"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 pr-10 text-white focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-300 leading-relaxed font-sans">
                      <strong>Tip for Gmail / Google Workspace:</strong> Enable 2-Step Verification in Google Account, then generate an <em>App Password</em> (under Security &rarr; 2-Step Verification &rarr; App passwords). Paste the 16-character code above.
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Sender & Destination Routing */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion("routing")}
                  className="w-full p-4 bg-slate-900/90 hover:bg-slate-850 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-white font-bold">3. Sender Identity &amp; Destination Routing</div>
                      <div className="text-[11px] text-slate-400">Header envelope From address and inbox receiver destination</div>
                    </div>
                  </div>
                  {openAccordions.routing ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openAccordions.routing && (
                  <div className="p-4 sm:p-5 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 text-[11px] font-semibold">From Header / Sender Identity</label>
                        <input
                          type="text"
                          value={data.smtpConfig?.fromEmail || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                fromEmail: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. Monu Saini Portfolio <monusainideveloper@gmail.com>"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 text-[11px] font-semibold">Destination Email (Where inquiries go)</label>
                        <input
                          type="email"
                          value={data.smtpConfig?.toEmail || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              smtpConfig: {
                                ...(data.smtpConfig || defaultSmtpConfig),
                                toEmail: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. monusainideveloper@gmail.com"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 4: Handshake & Test Dispatcher */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion("test")}
                  className="w-full p-4 bg-slate-900/90 hover:bg-slate-850 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/80">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-white font-bold">4. Live Handshake Verification &amp; Test Mailer</div>
                      <div className="text-[11px] text-slate-400">Validate credentials and test delivery in real-time</div>
                    </div>
                  </div>
                  {openAccordions.test ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openAccordions.test && (
                  <div className="p-4 sm:p-5 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    <p className="text-slate-300 text-xs font-sans">
                      Test the configured server connection without leaving the CMS. This verifies the TLS handshake and dispatches a diagnostic message to <code className="text-cyan-400">{data.smtpConfig?.toEmail || "destination inbox"}</code>.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleTestSmtp}
                        disabled={testingSmtp}
                        className="px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold flex items-center gap-2 transition-all disabled:opacity-50 text-xs"
                      >
                        {testingSmtp ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                            <span>VERIFYING HANDSHAKE...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Run SMTP Handshake &amp; Send Test Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    {testResult && (
                      <div
                        className={`p-3.5 rounded-lg border text-xs font-mono ${
                          testResult.success
                            ? "bg-emerald-950/50 border-emerald-800/70 text-emerald-300"
                            : "bg-red-950/50 border-red-800/70 text-red-300"
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          {testResult.success ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span>{testResult.message}</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                              <span>Handshake Error: {testResult.error}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
          </main>
        </div>
      </div>
    </div>
  );
}
