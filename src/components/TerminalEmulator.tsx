"use client";

import React, { useState, useRef, useEffect } from "react";
import { PortfolioData } from "@/types/portfolio";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skillCategories as defaultSkillCategories,
  experienceData as defaultExperienceData,
  educationData as defaultEducationData,
} from "@/data/portfolio-data";
import { RotateCcw } from "lucide-react";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

interface ActiveTyping {
  command: string;
  currentCommand: string;
  output: string;
  currentOutput: string;
  isTypingCommand: boolean;
  isTypingOutput: boolean;
}

export function TerminalEmulator({ data }: { data?: PortfolioData }) {
  const pInfo = data?.personalInfo || defaultPersonalInfo;
  const pProjects = data?.projects || defaultProjects;
  const pExp = data?.experienceData || defaultExperienceData;
  const pEdu = data?.educationData || defaultEducationData;

  const [inputVal, setInputVal] = useState("");
  // Start initially empty per user request
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeItem, setActiveItem] = useState<ActiveTyping | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const cancelledRef = useRef<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);

  // Auto-scroll on any log or stream progress
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history, activeItem]);

  // Clean stop for intro sequence
  const stopIntro = () => {
    cancelledRef.current = true;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setActiveItem(null);
    setIsExecuting(false);
  };

  // Dynamic typing intro script for the first 2 questions
  const startIntro = () => {
    // Stop any ongoing sequence
    stopIntro();

    cancelledRef.current = false;
    setIsExecuting(true);
    setHistory([]);
    setActiveItem(null);

    const questions = [
      {
        command: "whoami",
        output: `${pInfo.name} // ${pInfo.title}.\n${pInfo.subtitle}.\nBased in ${pInfo.location}. Open to full-time SDE roles.`,
      },
      {
        command: "skills --summary",
        output: "Core: Python 3, Django, Flask, FastAPI, n8n AI Agents, Model Context Protocol (MCP), AWS S3/EC2, PostgreSQL, Docker, Selenium, RESTful APIs.",
      },
    ];

    const sleep = (ms: number) =>
      new Promise<boolean>((resolve) => {
        const t = setTimeout(() => resolve(!cancelledRef.current), ms);
        timeoutsRef.current.push(t);
      });

    const run = async () => {
      // Short delay after render before typing begins
      const initOk = await sleep(600);
      if (!initOk || cancelledRef.current) return;

      for (let qIdx = 0; qIdx < questions.length; qIdx++) {
        if (cancelledRef.current) return;
        const q = questions[qIdx];

        // 1. Initialize active typing state for the command
        setActiveItem({
          command: q.command,
          currentCommand: "",
          output: q.output,
          currentOutput: "",
          isTypingCommand: true,
          isTypingOutput: false,
        });

        // 2. Type the command string character-by-character
        for (let i = 0; i < q.command.length; i++) {
          if (cancelledRef.current) return;
          const char = q.command[i];
          setActiveItem((prev) => (prev ? { ...prev, currentCommand: prev.currentCommand + char } : null));
          const ok = await sleep(45 + Math.random() * 25);
          if (!ok || cancelledRef.current) return;
        }

        // 3. Command typed: pause briefly (simulating Enter keystroke)
        setActiveItem((prev) => (prev ? { ...prev, isTypingCommand: false, isTypingOutput: true } : null));
        const enterOk = await sleep(300);
        if (!enterOk || cancelledRef.current) return;

        // 4. Stream stdout response dynamically
        const fullOutput = q.output;
        for (let i = 0; i < fullOutput.length; i += 2) {
          if (cancelledRef.current) return;
          const chunk = fullOutput.slice(0, i + 2);
          setActiveItem((prev) => (prev ? { ...prev, currentOutput: chunk } : null));
          const ok = await sleep(12);
          if (!ok || cancelledRef.current) return;
        }

        setActiveItem((prev) => (prev ? { ...prev, currentOutput: fullOutput, isTypingOutput: false } : null));
        const pauseOk = await sleep(250);
        if (!pauseOk || cancelledRef.current) return;

        // 5. Commit completed question & answer to history log
        setHistory((prev) => [...prev, { command: q.command, output: q.output }]);
        setCommandList((prev) => [...prev, q.command]);
        setActiveItem(null);

        // Pause before typing next command
        if (qIdx < questions.length - 1) {
          const nextOk = await sleep(650);
          if (!nextOk || cancelledRef.current) return;
        }
      }

      setIsExecuting(false);
    };

    run().catch(() => {});
  };

  // Launch dynamic intro on initial mount
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startIntro();
    }

    return () => {
      stopIntro();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const executeCommand = (cmdRaw: string) => {
    // If auto-typing is active when user interacts, gracefully stop it
    stopIntro();

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
  - projects     : Production systems (${pProjects.map((p) => p.title.slice(0, 15)).join(", ")}...)
  - experience   : Professional timeline & freelance client deliverables
  - education    : Degrees (${pEdu.map((e) => e.degree.slice(0, 10)).join(", ")}...)
  - contact      : Direct email, phone, location & LinkedIn
  - hire         : Launch hiring protocol & quick connect
  - clear        : Wipe the terminal buffer`;
        break;

      case "whoami":
        output = `${pInfo.name} — ${pInfo.title}
${pEdu[0]?.degree || "MCA Graduate"} & Foundations.
2+ years building high-leverage Python automation pipelines, AI agent workflows (n8n, MCP), and resilient backends.
Current Status: ${pInfo.statusBadge} (${pInfo.preferredLocations?.join(", ") || "Delhi, Jaipur, Remote"}).`;
        break;

      case "skills":
        output = `CORE COMPETENCIES:
[LANGUAGES] Python (90%), JavaScript (88%), SQL, C/C++, Bash, HTML5/CSS3
[FRAMEWORKS] Django, Django REST Framework, Flask, FastAPI, React.js
[AI & AGENTS] n8n AI Agent Workflows, MCP (Model Context Protocol), Gemini AI, Claude API, XGBoost, Scikit-learn, NLP
[INFRA & DB]  AWS (S3, EC2), PostgreSQL, MySQL, SQLite, Docker, Git CI/CD, Ubuntu Linux Server`;
        break;

      case "skills --summary":
        output = `Core: Python 3, Django, Flask, FastAPI, n8n AI Agents, Model Context Protocol (MCP), AWS S3/EC2, PostgreSQL, Docker, Selenium, RESTful APIs.
Tip: Type "skills" to view full categorized breakdown.`;
        break;

      case "projects":
        output = pProjects
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
        output = pExp
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
        output = pEdu
          .map((ed) => `• ${ed.degree} — ${ed.institution} (${ed.period}) [${ed.grade}]`)
          .join("\n");
        break;

      case "contact":
        output = `DIRECT CHANNELS:
Email:    ${pInfo.email}
Phone:    ${pInfo.phone}
LinkedIn: ${pInfo.linkedin}
GitHub:   ${pInfo.github}
Location: ${pInfo.location}`;
        break;

      case "hire":
      case "sudo hire":
        output = `[INITIATING HIRE PROTOCOL]
Target Candidate: ${pInfo.name}
Role Fit: Software Developer / Python Backend SDE / AI Automation Engineer
Status: Immediately Available for Interview & Onboarding
Reach out directly via email (${pInfo.email}) or phone (${pInfo.phone})!`;
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
        <div className="flex items-center space-x-2.5 text-[11px] font-semibold shrink-0">
          {isExecuting ? (
            <div className="flex items-center space-x-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>EXECUTING</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CLI_READY</span>
            </div>
          )}
          <button
            onClick={startIntro}
            title="Replay terminal intro sequence"
            className="text-slate-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-slate-800"
            aria-label="Replay terminal intro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
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

        {/* Completed History Commands */}
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">visitor@{pInfo.handle}</span>:
              <span className="text-cyan-400">~</span>$
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="text-slate-300 pl-4 border-l-2 border-cyan-500/40 whitespace-pre-wrap leading-relaxed text-[11.5px]">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Dynamic Typing Item */}
        {activeItem && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">visitor@{pInfo.handle}</span>:
              <span className="text-cyan-400">~</span>$
              <span className="text-white font-semibold">{activeItem.currentCommand}</span>
              {activeItem.isTypingCommand && (
                <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse ml-0.5"></span>
              )}
            </div>
            {activeItem.currentOutput && (
              <div className="text-slate-300 pl-4 border-l-2 border-cyan-500/40 whitespace-pre-wrap leading-relaxed text-[11.5px]">
                {activeItem.currentOutput}
                {activeItem.isTypingOutput && (
                  <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-1 align-middle"></span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Ready Prompt Line with blinking cursor when idle */}
        {!isExecuting && !activeItem && (
          <div className="flex items-center space-x-2 text-slate-500">
            <span className="text-emerald-400/80">visitor@{pInfo.handle}</span>:
            <span className="text-cyan-400/80">~</span>$
            <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse"></span>
          </div>
        )}
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
