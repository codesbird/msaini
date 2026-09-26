"use client";

import React, { useState, useRef, useEffect } from "react";
import { DigitalTwinQA, PersonalInfo } from "@/types/portfolio";
import { digitalTwinQA as defaultDigitalTwinQA, personalInfo as defaultPersonalInfo } from "@/data/portfolio-data";
import { Bot, Send, Sparkles, CornerDownLeft, User } from "lucide-react";

interface Message {
  sender: "user" | "agent";
  text: string;
  time: string;
}

export function DigitalTwinChat({
  qaList,
  info,
}: {
  qaList?: DigitalTwinQA[];
  info?: PersonalInfo;
}) {
  const activeQA = qaList && qaList.length > 0 ? qaList : defaultDigitalTwinQA;
  const activeInfo: PersonalInfo = info || defaultPersonalInfo;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: `Hello! I am ${activeInfo.name}'s Digital Twin (AI Agent Proxy). Ask me anything about Monu's hands-on experience with Python, AI agent workflows (n8n, MCP), backend architectures, or his availability for full-time Software Developer roles!`,
      time: "Just now",
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAgentResponse = async (query: string): Promise<string> => {
    // 1. First check if there is an exact or close match in curated QA
    const lowerQuery = query.toLowerCase();

    for (const qa of activeQA) {
      if (
        lowerQuery.includes(qa.question.toLowerCase().slice(0, 15)) ||
        qa.keywords.some((k) => lowerQuery.includes(k))
      ) {
        return qa.answer;
      }
    }

    // 2. Try calling our Next.js API route if available
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data.reply;
      }
    } catch {
      // Fallback
    }

    // 3. Smart contextual fallback
    return `Thank you for asking! ${activeInfo.name} is a dedicated Python Developer with 2+ years of experience in backend development, AI agent pipelines (n8n, MCP), and web applications. He holds an MCA degree from AKTU and is actively interviewing for Software Developer opportunities in Delhi NCR, Jaipur, or Remote. Feel free to connect directly via email at ${activeInfo.email} or LinkedIn at ${activeInfo.linkedin}.`;
  };

  const handleSend = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(async () => {
      const reply = await getAgentResponse(text);
      const agentMsg: Message = {
        sender: "agent",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputPrompt);
  };

  return (
    <section
      id="agent-chat"
      className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-term-card to-slate-900 border border-cyan-500/30 glow-cyan space-y-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white font-mono">Ask {activeInfo.name.split(" ")[0]}&apos;s Digital Twin</h2>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  AI AGENT PROXY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Trained on {activeInfo.name}&apos;s Python engineering skills, projects, and career background.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MODEL: CONTEXT_ACTIVE</span>
          </div>
        </div>

        {/* Chat Thread */}
        <div
          ref={chatScrollRef}
          className="bg-black/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 h-[280px] overflow-y-auto space-y-4 font-mono text-xs"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "agent" && (
                <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-xl px-4 py-2.5 leading-relaxed ${
                  m.sender === "user"
                    ? "bg-cyan-950/70 border border-cyan-800 text-cyan-100"
                    : "bg-slate-900 border border-slate-800 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-60">
                  <span>{m.sender === "user" ? "You" : "Digital Twin"}</span>
                  <span>{m.time}</span>
                </div>
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>

              {m.sender === "user" && (
                <div className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>Digital Twin is synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestion Chips */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Suggested prompts:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {activeQA.slice(0, 4).map((qa, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qa.question)}
                className="text-left px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-all truncate"
              >
                💡 &quot;{qa.question}&quot;
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 font-mono">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask anything about Python, n8n agents, Django, or interview availability..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <button
            type="submit"
            disabled={isTyping || !inputPrompt.trim()}
            className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>SEND</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
