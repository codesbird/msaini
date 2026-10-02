"use client";

import React, { useState } from "react";
import { PersonalInfo } from "@/types/portfolio";
import { personalInfo as defaultPersonalInfo } from "@/data/portfolio-data";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Check, Copy } from "lucide-react";

export function ContactSection({ data }: { data?: PersonalInfo }) {
  const info: PersonalInfo = data || defaultPersonalInfo;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="space-y-8 pt-4">
      <div className="border-b border-term-border pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">// 06. INITIATE_COMMUNICATION</span>
        <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
          Let&apos;s Build Systems Together
        </h2>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Open to full-time Software Developer, Python Backend SDE, and AI Automation Engineer roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-term-card border border-term-border space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-300">
              Direct Access Channels
            </h3>

            {/* Email */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3 truncate">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-500 block uppercase">Primary Email</span>
                  <a
                    href={`mailto:${info.email}`}
                    className="text-white hover:text-cyan-400 transition-colors truncate block"
                  >
                    {info.email}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white shrink-0 ml-2"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Phone / WhatsApp</span>
                <a href={`tel:${info.phone}`} className="text-white hover:text-emerald-400 transition-colors">
                  {info.phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Base Location</span>
                <span className="text-slate-300">{info.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/50 hover:bg-blue-900/40 text-blue-300 flex items-center justify-center gap-2 transition-all font-semibold"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn ({info.followersCount})</span>
              </a>

              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center justify-center gap-2 transition-all font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-7 rounded-2xl bg-term-card border border-term-border space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-white font-bold text-sm">TRANSMIT INQUIRY / SCHEDULE CALL</span>
              <span className="text-[11px] text-emerald-400">ENCRYPTED_ENDPOINT</span>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 space-y-2 text-center">
                <Check className="w-8 h-8 mx-auto text-emerald-400" />
                <h4 className="font-bold text-sm">Transmission Received!</h4>
                <p className="text-xs text-slate-300 font-sans">
                  Thank you for reaching out. {info.name.split(" ")[0]} will review your message and reply via email or phone shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Your Name / Company</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex (Engineering Recruiter)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@techcompany.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px]">Role / Inquiry Type</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Developer Role (Noida / Remote)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px]">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share role specifics, tech requirements, or schedule an intro interview..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400 resize-none font-sans text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING INQUIRY...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>TRANSMIT MESSAGE TO {info.name.toUpperCase()}</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
