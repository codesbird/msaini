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

export default function Home() {
  return (
    <div className="min-h-screen text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Fixed Telemetry Navigation */}
      <TelemetryHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
        {/* Top Hero & Terminal Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left: Hero Info & CTAs (7 Cols) */}
          <div className="lg:col-span-7">
            <HeroSection />
          </div>

          {/* Right: Interactive Terminal Emulator (5 Cols) */}
          <div className="lg:col-span-5">
            <TerminalEmulator />
          </div>
        </section>

        {/* Real Metrics Telemetry Grid */}
        <MetricsGrid />

        {/* AI Digital Twin Chat Section */}
        <DigitalTwinChat />

        {/* Featured Production Projects & AI Systems */}
        <ProjectsSection />

        {/* Core Skills & Frameworks Matrix */}
        <SkillsMatrix />

        {/* Professional Experience & Education Timeline */}
        <ExperienceTimeline />

        {/* Contact & Scheduling Section */}
        <ContactSection />

        {/* Terminal Footer */}
        <Footer />
      </main>
    </div>
  );
}
