import React from "react";
import { PersonalInfo } from "@/types/portfolio";
import { personalInfo as defaultPersonalInfo } from "@/data/portfolio-data";
import { Terminal } from "lucide-react";

export function Footer({ data }: { data?: PersonalInfo }) {
  const info: PersonalInfo = data || defaultPersonalInfo;

  return (
    <footer className="pt-16 pb-12 border-t border-term-border text-center space-y-4 font-mono text-xs text-slate-500">
      <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
        <a
          href={info.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          GITHUB
        </a>
        <a
          href={info.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          LINKEDIN
        </a>
        <a href={`mailto:${info.email}`} className="hover:text-cyan-400 transition-colors">
          EMAIL
        </a>
        <a href={`tel:${info.phone}`} className="hover:text-emerald-400 transition-colors">
          PHONE
        </a>
      </div>

      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        <span>Designed &amp; Architected for the AI Era. Built with Next.js 15, TypeScript &amp; Tailwind.</span>
      </div>

      <div className="text-[10px] text-slate-600">
        &copy; {new Date().getFullYear()} {info.name} ({info.handle}). All systems operational.
      </div>
    </footer>
  );
}
