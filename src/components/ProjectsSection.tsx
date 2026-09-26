import React from "react";
import { Project } from "@/types/portfolio";
import { projects as defaultProjects } from "@/data/portfolio-data";
import { ExternalLink, Github, CheckCircle2, Cpu, Image as ImageIcon } from "lucide-react";

export function ProjectsSection({ items }: { items?: Project[] }) {
  const projectList = items && items.length > 0 ? items : defaultProjects;

  return (
    <section id="projects" className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-term-border pb-4 gap-2">
        <div>
          <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>// 02. SYSTEM_SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            Featured Systems &amp; Autonomous Workflows
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Production AI agents, machine learning engines &amp; cloud microservices
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectList.map((project) => (
          <div
            key={project.id}
            className="p-6 sm:p-7 rounded-2xl bg-term-card border border-term-border hover:border-cyan-500/50 transition-all flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              {/* Optional Project Screenshot / Architecture Image from Vercel Blob */}
              {project.imageUrl && (
                <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Top Meta */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                  ● {project.status}
                </span>
                <span className="text-slate-400">{project.date}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-cyan-400/90 font-mono mt-1">{project.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">{project.description}</p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                {project.highlights?.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/60 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <div className="text-slate-400">
                <span className="text-[10px] text-slate-500 block uppercase">Measurable Metric</span>
                <span className="text-emerald-400 font-bold">{project.metrics?.value || "Production Ready"}</span>
              </div>

              <div className="flex items-center space-x-3">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white p-1 flex items-center gap-1 transition-colors"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">Code</span>
                  </a>
                )}
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 p-1 flex items-center gap-1 font-semibold transition-colors"
                    title="Live Platform / Article"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
