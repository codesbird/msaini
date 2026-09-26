"use client";

import React, { useState } from "react";
import { SkillCategory } from "@/types/portfolio";
import { skillCategories as defaultSkillCategories } from "@/data/portfolio-data";
import { Code2, Server, Sparkles, Cloud } from "lucide-react";

export function SkillsMatrix({ categories }: { categories?: SkillCategory[] }) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const allCats = categories && categories.length > 0 ? categories : defaultSkillCategories;

  const icons: Record<string, React.ReactNode> = {
    code: <Code2 className="w-4 h-4 text-cyan-400" />,
    server: <Server className="w-4 h-4 text-emerald-400" />,
    sparkles: <Sparkles className="w-4 h-4 text-purple-400" />,
    cloud: <Cloud className="w-4 h-4 text-amber-400" />,
  };

  const filteredCategories =
    activeTab === "all"
      ? allCats
      : allCats.filter((cat) => {
          if (activeTab === "backend") return cat.title.includes("Backend") || cat.title.includes("Languages");
          if (activeTab === "ai") return cat.title.includes("AI");
          if (activeTab === "cloud") return cat.title.includes("Cloud");
          return true;
        });

  return (
    <section id="skills" className="space-y-6">
      {/* Header with filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-term-border pb-4 gap-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">// 03. SYSTEM_CAPABILITIES</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">Core Technical Matrix</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            [ALL]
          </button>
          <button
            onClick={() => setActiveTab("backend")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "backend"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            [BACKEND &amp; PYTHON]
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "ai"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            [AI &amp; AGENTS]
          </button>
          <button
            onClick={() => setActiveTab("cloud")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "cloud"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            [CLOUD &amp; DEVOPS]
          </button>
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-term-card border border-term-border hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800/80">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                {icons[category.icon] || <Code2 className="w-4 h-4 text-cyan-400" />}
              </div>
              <h3 className="font-mono text-sm font-bold text-white tracking-wide">{category.title}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.skills?.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between font-mono text-xs hover:border-cyan-500/30 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-white font-medium block">{skill.name}</span>
                    {skill.badge && <span className="text-[10px] text-cyan-400 block">{skill.badge}</span>}
                  </div>
                  {skill.level && (
                    <span className="text-[11px] text-slate-400 font-semibold bg-slate-800 px-1.5 py-0.5 rounded">
                      {skill.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
