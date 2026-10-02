"use client";

import React, { useState, useEffect } from "react";
import { TelemetryHeader } from "@/components/TelemetryHeader";
import { HeroSection } from "@/components/HeroSection";
import { TerminalEmulator } from "@/components/TerminalEmulator";
import { MetricsGrid } from "@/components/MetricsGrid";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { subscribeToPortfolio, defaultPortfolioData } from "@/lib/portfolio-service";
import { PortfolioData } from "@/types/portfolio";

export default function Home() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);

  useEffect(() => {
    // Realtime subscription to Firebase Realtime Database with local cache fallback
    const unsubscribe = subscribeToPortfolio((liveData) => {
      setData(liveData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Fixed Telemetry Navigation */}
      <TelemetryHeader data={data.personalInfo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
        {/* Top Hero & Terminal Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline pt-2">
          {/* Left: Hero Info & CTAs (7 Cols) */}
          <div className="lg:col-span-7">
            <HeroSection data={data.personalInfo} />
          </div>

          {/* Right: Interactive Terminal Emulator (5 Cols) */}
          <div className="lg:col-span-5">
            <TerminalEmulator data={data} />
          </div>
        </section>

        {/* Real Metrics Telemetry Grid */}
        <MetricsGrid items={data.metrics} />

        {/* AI Digital Twin Chat Section */}
        <DigitalTwinChat qaList={data.digitalTwinQA} info={data.personalInfo} />

        {/* Featured Production Projects & AI Systems */}
        <ProjectsSection items={data.projects} />

        {/* Core Skills & Frameworks Matrix */}
        <SkillsMatrix categories={data.skillCategories} />

        {/* Professional Experience & Education Timeline */}
        <ExperienceTimeline expItems={data.experienceData} eduItems={data.educationData} />

        {/* Contact & Scheduling Section */}
        <ContactSection data={data.personalInfo} />

        {/* Terminal Footer */}
        <Footer data={data.personalInfo} />
      </main>
    </div>
  );
}
