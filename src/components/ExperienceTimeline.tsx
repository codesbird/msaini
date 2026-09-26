import React from "react";
import { experienceData, educationData } from "@/data/portfolio-data";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="space-y-12">
      {/* Experience Section */}
      <div className="space-y-6">
        <div className="border-b border-term-border pb-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">// 04. EXPERIENCE_LOG</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            Professional Engineering Journey
          </h2>
        </div>

        <div className="space-y-6">
          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-term-card border border-term-border space-y-4 font-mono hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  </div>
                  <div className="text-xs text-cyan-400 mt-0.5">{exp.company}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                  <span className="text-slate-600">|</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                {exp.description.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Qualifications */}
      <div className="space-y-6">
        <div className="border-b border-term-border pb-4">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">// ACADEMIC_CREDENTIALS</span>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">Education &amp; Foundations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-term-card border border-term-border flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-800/40 text-emerald-400">
                    <GraduationCap className="w-4 h-4" />
                  </span>
                  <span className="text-emerald-400 font-bold">{edu.grade}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-sans">{edu.degree}</h3>
                  <div className="text-slate-400 text-[11px] mt-1">{edu.institution}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">{edu.period}</div>
                </div>

                <div className="text-[11px] text-slate-300 font-sans space-y-1 pt-1 leading-relaxed">
                  {edu.highlights.map((h, hIdx) => (
                    <p key={hIdx} className="text-slate-400">
                      • {h}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
