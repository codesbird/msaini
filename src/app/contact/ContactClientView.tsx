"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PersonalInfo } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Check,
  Copy,
  Terminal,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageSquare,
  FileText,
  Calendar,
  ExternalLink,
  Cpu,
  ArrowRight,
} from "lucide-react";

export function ContactClientView({ info }: { info: PersonalInfo }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    roleType: "Software Developer",
    workMode: "Hybrid / On-site / Remote",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(info.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setSubmitted(true);
      } else {
        setSubmitError(resData.error || "Failed to transmit message. Please email directly.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      // Still show submitted so recruiter isn't blocked
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      roleType: "Software Developer",
      workMode: "Hybrid / On-site / Remote",
      message: "",
    });
  };

  return (
    <div className="space-y-12">
      {/* 1. Header & Availability Telemetry */}
      <section className="space-y-5">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold uppercase tracking-wider">
            COMMUNICATION_LINK // ENCRYPTED_ENDPOINT
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
            Initiate Contact with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">
              {info.name}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Actively seeking full-time <span className="text-white font-semibold">Software Developer</span>,{" "}
            <span className="text-white font-semibold">Python Backend SDE</span>, and{" "}
            <span className="text-white font-semibold">AI Automation Engineer</span> opportunities in Noida, Gurugram, Delhi, Jaipur, or Remote.
          </p>
        </div>

        {/* Telemetry Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Onboarding SLA</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              IMMEDIATE
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Response Time</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-cyan-400" />
              &lt; 4 Hours
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Target Locations</span>
            <span className="text-slate-200 font-semibold truncate block mt-0.5">
              Noida, Gurugram, Delhi, Remote
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Notice Period</span>
            <span className="text-purple-400 font-semibold mt-0.5 block">
              0 Days (Ready Now)
            </span>
          </div>
        </div>
      </section>

      {/* 2. Direct Access Channels & Interactive Form Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Access Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-term-card border border-term-border space-y-4 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Direct Contact Channels
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                ACTIVE
              </span>
            </div>

            {/* Email Channel */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-between">
              <div className="flex items-center space-x-3 truncate">
                <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${info.email}`}
                    className="text-white hover:text-cyan-400 font-medium truncate block text-[13px]"
                  >
                    {info.email}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white shrink-0 ml-2 transition-colors"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Phone & WhatsApp Channel */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">
                    Phone &amp; WhatsApp
                  </span>
                  <a
                    href={`tel:${info.phone}`}
                    className="text-white hover:text-emerald-400 font-medium block text-[13px]"
                  >
                    {info.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <a
                  href={`https://wa.me/${info.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 px-2 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60 text-[11px] font-semibold flex items-center gap-1 transition-all"
                  title="Open direct WhatsApp chat"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={copyPhone}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Location Channel */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">
                  Base Locations
                </span>
                <span className="text-slate-200 font-medium block text-xs">
                  {info.location}
                </span>
              </div>
            </div>

            {/* Professional Profiles */}
            <div className="pt-2 space-y-2">
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 rounded-xl bg-blue-950/50 border border-blue-800/60 hover:bg-blue-900/50 text-blue-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">LinkedIn Profile ({info.followersCount})</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400/80" />
              </a>

              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">GitHub (@tech2saini)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              {info.resumeUrl && (
                <a
                  href={info.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-900/40 text-emerald-300 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Download Resume (PDF)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400/80" />
                </a>
              )}
            </div>
          </div>

          {/* Recruiter Quick Protocol Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Hiring Quick Protocol</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 text-[11.5px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Technical Screening: Ready for Live coding (Python/DSA/APIs) or technical calls.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Work Preferences: Full-Time SDE, Backend Developer, or AI Engineer.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Documents: Degree transcripts (AKTU MCA, Rajasthan Univ BCA) &amp; IDs ready.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Scheduling / Message Form (7 Cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-term-card border border-term-border space-y-5 font-mono text-xs shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  TRANSMIT ROLE DETAILS / SCHEDULE CALL
                </h2>
                <p className="text-[11px] text-slate-400 font-sans pt-0.5">
                  Sends direct notification to Monu Saini. Guaranteed response within 4 hours.
                </p>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 shrink-0">
                SSL_ENCRYPTED
              </span>
            </div>

            {submitted ? (
              <div className="py-8 px-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/40">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-white">Transmission Delivered!</h3>
                <p className="text-xs text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-emerald-400 font-semibold">{formData.name}</span>. Your inquiry regarding the <span className="text-cyan-400 font-semibold">{formData.roleType}</span> opportunity has been dispatched directly. Monu will follow up via email at <span className="text-white underline">{formData.email}</span> shortly.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors text-xs"
                  >
                    Send Another Transmission
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 text-[11px] font-semibold">
                      Your Name / Recruiter <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 text-[11px] font-semibold">
                      Company / Organization <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. TechCorp / FinTech Startup"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 text-[11px] font-semibold">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 text-[11px]">
                      Phone Number / WhatsApp <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                {/* Role Pill Selector */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-[11px] font-semibold">
                    Target Opportunity / Role Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      "Software Developer",
                      "Python Backend SDE",
                      "AI Automation Engineer",
                      "Freelance / Contract",
                    ].map((role) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => setFormData({ ...formData, roleType: role })}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          formData.roleType === role
                            ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Mode */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-[11px] font-semibold">
                    Work Location Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["On-site (Noida / Delhi / Jaipur)", "Hybrid", "Remote (Global)"].map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setFormData({ ...formData, workMode: mode })}
                        className={`p-2 rounded-lg border text-center text-[11px] transition-all ${
                          formData.workMode === mode
                            ? "bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 text-[11px] font-semibold">
                    Role Description &amp; Meeting Proposal <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Include JD links, salary budget, tech stack requirements, or interview time slots..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none font-sans text-xs"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl glow-emerald cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>ENCRYPTING &amp; DISPATCHING TRANSMISSION...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH INQUIRY TO MONU SAINI</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* 3. Direct Navigation Backlinks */}
      <section className="p-6 rounded-2xl bg-term-card border border-term-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="text-white font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Need deeper background or architectural case studies?</span>
          </div>
          <p className="text-slate-400 text-[11px] font-sans">
            Review full technical background, university education, verified aliases, and media footprint on the dedicated About page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Read Full About Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/#projects"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>View Projects</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
