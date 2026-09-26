import React from "react";
import { MetricItem } from "@/types/portfolio";
import { personalInfo } from "@/data/portfolio-data";
import { Zap, Bot, Award, Users } from "lucide-react";

export function MetricsGrid({ items }: { items?: MetricItem[] }) {
  const defaultMetrics: MetricItem[] = [
    {
      label: "AI & ML PROJECTS",
      value: personalInfo.aiProjectsCount,
      subtext: "n8n Agents, MCP & Classifiers",
      icon: "Bot",
      color: "text-cyan-400",
    },
    {
      label: "INDUSTRY EXPERIENCE",
      value: personalInfo.yearsOfExp,
      subtext: "Years in Backend & Automation",
      icon: "Zap",
      color: "text-amber-400",
    },
    {
      label: "CLIENT SATISFACTION",
      value: personalInfo.clientSatisfaction,
      subtext: "Delivered with zero regression",
      icon: "Award",
      color: "text-emerald-400",
    },
    {
      label: "LINKEDIN NETWORK",
      value: personalInfo.followersCount,
      subtext: "Followers & Tech Community",
      icon: "Users",
      color: "text-purple-400",
    },
  ];

  const list = items && items.length > 0 ? items : defaultMetrics;

  const getIcon = (idx: number) => {
    const icons = [Bot, Zap, Award, Users];
    return icons[idx % icons.length];
  };

  const getColor = (idx: number) => {
    const colors = ["text-cyan-400", "text-amber-400", "text-emerald-400", "text-purple-400"];
    return colors[idx % colors.length];
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {list.map((m, idx) => {
        const Icon = getIcon(idx);
        const color = m.color || getColor(idx);
        return (
          <div
            key={idx}
            className="p-5 rounded-xl bg-term-card border border-term-border space-y-1 hover:border-slate-700 transition-all group"
          >
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>{m.label}</span>
              <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">{m.value}</div>
            <div className="text-[11px] text-slate-400 font-mono truncate">{m.subtext}</div>
          </div>
        );
      })}
    </section>
  );
}
