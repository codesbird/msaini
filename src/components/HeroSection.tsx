"use client";

import React, { useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio-data";
import { Bot, FolderGit2, Copy, Check, Cpu, Sparkles, Linkedin, MapPin, Mail } from "lucide-react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const cliSnippet = `npx ${personalInfo.handle} --connect --role=python-sde`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cliSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="space-y-6 pt-2">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-semibold uppercase tracking-wider">{personalInfo.statusBadge}</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">{personalInfo.name}</span>.
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl text-slate-300 font-normal">
            Building Autonomous AI Agents &amp; Resilient Backends.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed pt-1">
          {personalInfo.bio}
        </p>
      </div>

      {/* Quick Terminal Command Bar */}
      <div className="p-3 bg-term-card border border-term-border rounded-xl font-mono text-xs text-slate-300 flex items-center justify-between max-w-2xl">
        <div className="flex items-center space-x-2 truncate">
          <span className="text-cyan-400 font-bold">$</span>
          <span className="text-emerald-400">npx</span>
          <span className="text-slate-200">{personalInfo.handle} --connect --role=python-sde</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 rounded text-[11px] flex items-center gap-1.5 transition-all shrink-0 ml-2"
          aria-label="Copy terminal run command"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Core Technology Chips */}
      <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
        <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
          Python 3.12
        </span>
        <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
          Django &amp; DRF
        </span>
        <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
          Flask / FastAPI
        </span>
        <span className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
          n8n AI Agents
        </span>
        <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
          MCP (Model Context Protocol)
        </span>
        <span className="px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
          AWS &amp; SQL
        </span>
        <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
          Docker &amp; Linux
        </span>
      </div>

      {/* Location & Preferred Workplaces */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>{personalInfo.location}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div>
          <span>Targeting: </span>
          <span className="text-slate-300">{personalInfo.preferredLocations.join(", ")}</span>
        </div>
      </div>

      {/* CTA Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-3">
        <Link
          href="#agent-chat"
          className="px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-all flex items-center gap-2 glow-emerald"
        >
          <Bot className="w-4 h-4" />
          <span>Query My Digital Twin</span>
        </Link>

        <Link
          href="#projects"
          className="px-5 py-2.5 rounded-lg bg-slate-800/90 text-white font-semibold text-xs sm:text-sm hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2"
        >
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span>View Production Systems</span>
        </Link>

        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-lg bg-blue-950/50 text-blue-300 border border-blue-800/50 hover:bg-blue-900/50 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn ({personalInfo.followersCount})</span>
        </a>
      </div>
    </section>
  );
}
