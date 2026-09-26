"use client";

import React, { useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio-data";
import { Terminal, Menu, X } from "lucide-react";

export function TelemetryHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-term-bg/90 border-b border-term-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-mono text-xs">
        {/* Left: Status Indicator & System Name */}
        <div className="flex items-center space-x-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Link href="#about" className="font-bold text-white tracking-wider hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEV_AGENT::{personalInfo.handle.toUpperCase()}</span>
          </Link>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline text-slate-400">
            STATUS: <span className="text-emerald-400 font-semibold">{personalInfo.availabilityStatus}</span>
          </span>
        </div>

        {/* Center: Live Telemetry */}
        <div className="hidden md:flex items-center space-x-6 text-slate-400">
          <div>
            REGION: <span className="text-purple-400 font-mono">IN-NORTH</span>
          </div>
          <div>
            UPTIME: <span className="text-amber-400 font-mono">99.98%</span>
          </div>
        </div>

        {/* Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5">
          <Link href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">
            01.ABOUT
          </Link>
          <Link href="#projects" className="text-slate-400 hover:text-cyan-400 transition-colors">
            02.PROJECTS
          </Link>
          <Link href="#skills" className="text-slate-400 hover:text-cyan-400 transition-colors">
            03.SKILLS
          </Link>
          <Link href="#experience" className="text-slate-400 hover:text-cyan-400 transition-colors">
            04.TIMELINE
          </Link>
          <Link href="#agent-chat" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            05.AI_AGENT
          </Link>
          <Link
            href="#contact"
            className="bg-cyan-950/60 text-cyan-400 border border-cyan-800/80 px-2.5 py-1 rounded hover:bg-cyan-900/60 transition-all font-semibold"
          >
            HIRE_ME
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <Link
            href="#contact"
            className="bg-cyan-950/60 text-cyan-400 border border-cyan-800/80 px-2 py-1 rounded text-[11px] font-semibold"
          >
            HIRE
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-term-card/95 border-b border-term-border px-4 py-4 space-y-3 font-mono text-xs">
          <div className="text-slate-500 pb-1 border-b border-slate-800">REGION: IN-NORTH | UPTIME: 99.98%</div>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            01. ABOUT
          </Link>
          <Link
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            02. PROJECTS
          </Link>
          <Link
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            03. SKILLS
          </Link>
          <Link
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            04. TIMELINE
          </Link>
          <Link
            href="#agent-chat"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-emerald-400 hover:text-emerald-300 py-1 font-semibold"
          >
            05. AI AGENT TWIN
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-400 hover:text-cyan-300 py-1 font-semibold"
          >
            06. CONTACT &amp; HIRE
          </Link>
        </div>
      )}
    </header>
  );
}
