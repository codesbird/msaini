"use client";

import React, { useState, useRef, useEffect } from "react";
import { personalInfo, projects, skillCategories, experienceData, educationData } from "@/data/portfolio-data";
import { Terminal, Copy, Check, RotateCcw } from "lucide-react";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalEmulator() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "whoami",
      output: `${personalInfo.name} // ${personalInfo.title}. ${personalInfo.subtitle}.\nBased in ${personalInfo.location}. Open to full-time SDE roles.`,
    },
    {
      command: "skills --summary",
      output: "Core: Python 3, Django, Flask, FastAPI, n8n AI Agents, Model Context Protocol (MCP), AWS S3/EC2, PostgreSQL, Docker, Selenium, RESTful APIs.",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>(["whoami", "skills --summary"]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    setCommandList((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = `Available system commands:
  - whoami       : Identity, current focus & background
  - skills       : Full breakdown of Python, AI, Backend & Cloud skills
  - projects     : Production systems (WhatsApp Agent, Fake News ML, KSecure, MCP)
  - experience   : Professional timeline & freelance client deliverables
  - education    : Degrees (MCA from AKTU, BCA from RU, IANT Diploma)
  - contact      : Direct email, phone, location & LinkedIn
  - hire         : Launch hiring protocol & quick connect
  - clear        : Wipe the terminal buffer`;
        break;

      case "whoami":
        output = `${personalInfo.name} — ${personalInfo.title}
MCA Graduate (AKTU) & BCA (Rajasthan University).
2+ years building high-leverage Python automation pipelines, AI agent workflows (n8n, MCP), and resilient backends.
Current Status: ${personalInfo.statusBadge} (${personalInfo.preferredLocations.join(", ")} or Remote).`;
        break;

      case "skills":
        output = `CORE COMPETENCIES:
[LANGUAGES] Python (90%), JavaScript (88%), SQL, C/C++, Bash, HTML5/CSS3
[FRAMEWORKS] Django, Django REST Framework, Flask, FastAPI, React.js
[AI & AGENTS] n8n AI Agent Workflows, MCP (Model Context Protocol), Gemini AI, Claude API, XGBoost, Scikit-learn, NLP
[INFRA & DB]  AWS (S3, EC2), PostgreSQL, MySQL, SQLite, Docker, Git CI/CD, Ubuntu Linux Server`;
        break;

      case "projects":
        output = projects
          .map(
            (p, idx) =>
              `[${idx + 1}] ${p.title}
    Category: ${p.category} | Metric: ${p.metrics.value}
    Stack: ${p.techStack.join(", ")}
    Summary: ${p.tagline}`
          )
          .join("\n\n");
        break;

      case "experience":
        output = experienceData
          .map(
            (e) =>
              `[ROLE] ${e.role} @ ${e.company} (${e.period})
Location: ${e.location}
Key Impacts:
${e.description.map((d) => `  • ${d}`).join("\n")}`
          )
          .join("\n\n");
        break;

      case "education":
        output = educationData
          .map((ed) => `• ${ed.degree} — ${ed.institution} (${ed.period}) [${ed.grade}]`)
          .join("\n");
        break;

      case "contact":
        output = `DIRECT CHANNELS:
Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin}
GitHub:   ${personalInfo.github}
Location: ${personalInfo.location}`;
        break;

      case "hire":
      case "sudo hire":
        output = `[INITIATING HIRE PROTOCOL]
Target Candidate: ${personalInfo.name}
Role Fit: Software Developer / Python Backend SDE / AI Automation Engineer
Status: Immediately Available for Interview & Onboarding
Reach out directly via email (${personalInfo.email}) or phone (${personalInfo.phone})!`;
        break;

      default:
        output = `command not found: "${cmd}". Type "help" to view valid terminal commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdRaw, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      }
    }
  };

  return (
    <div id="terminal" className="bg-term-card border border-term-border rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[420px]">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-term-border flex items-center justify-between font-mono text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="text-slate-400 ml-2 font-mono truncate">
            bash — monu@portfolio: ~ (session: 0x8a1c)
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CLI_READY</span>
        </div>
      </div>

      {/* Terminal Output Log Area */}
      <div
        ref={outputRef}
        className="p-4 font-mono text-xs space-y-3 flex-1 overflow-y-auto overflow-x-hidden selection:bg-cyan-500/30"
      >
        <div className="text-slate-500 text-[11px]">
          DevAgent Interactive Terminal [Version 4.2.0-lts]. Type <span className="text-cyan-400 font-bold">help</span> for command list.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">visitor@monusaini</span>:
              <span className="text-cyan-400">~</span>$
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="text-slate-300 pl-4 border-l-2 border-cyan-500/40 whitespace-pre-wrap leading-relaxed text-[11.5px]">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Command Chips & Interactive Input Form */}
      <div className="p-3 bg-slate-900/80 border-t border-term-border space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="text-slate-500 text-[10px] self-center">Quick commands:</span>
          <button
            onClick={() => executeCommand("whoami")}
            className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors"
          >
            whoami
          </button>
          <button
            onClick={() => executeCommand("skills")}
            className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 hover:bg-slate-700 transition-colors"
          >
            skills
          </button>
          <button
            onClick={() => executeCommand("projects")}
            className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 hover:bg-slate-700 transition-colors"
          >
            projects
          </button>
          <button
            onClick={() => executeCommand("experience")}
            className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 transition-colors"
          >
            experience
          </button>
          <button
            onClick={() => executeCommand("contact")}
            className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors"
          >
            contact
          </button>
          <button
            onClick={() => executeCommand("clear")}
            className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
            title="Clear buffer"
          >
            clear
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2 font-mono text-xs">
          <span className="text-cyan-400 font-bold">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. 'help', 'projects', 'hire')..."
            className="w-full bg-transparent border-0 outline-none text-white placeholder-slate-500 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
