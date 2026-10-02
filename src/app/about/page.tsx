import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TelemetryHeader } from "@/components/TelemetryHeader";
import { Footer } from "@/components/Footer";
import { personalInfo } from "@/data/portfolio-data";
import {
  Terminal,
  ExternalLink,
  Github,
  Linkedin,
  Cpu,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Bot,
  MapPin,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Server,
  Cloud,
  ArrowRight,
  Globe,
  Share2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Monu Saini // Python Developer & AI Automation Engineer",
  description:
    "Monu Saini is a Python Developer and AI Automation Engineer based in Jaipur, India. Specializing in Python backend development, Django, Flask, FastAPI, AI agents, n8n, MCP, REST APIs, AWS and automation.",
  keywords: [
    "Monu Saini",
    "Python Developer",
    "AI Automation Engineer",
    "Monu Saini GNIOT",
    "Monu Saini MCA",
    "Monu Saini AKTU",
    "Monu Saini IANT",
    "Monu Saini Python Developer",
    "Tech2Saini",
    "codesbird",
    "devmonusaini",
    "monupydev",
    "Django",
    "Flask",
    "FastAPI",
    "n8n AI Agents",
    "Model Context Protocol",
    "MCP",
  ],
  authors: [{ name: "Monu Saini", url: "https://www.linkedin.com/in/monupydev" }],
  openGraph: {
    title: "About Monu Saini // Python Developer & AI Automation Engineer",
    description:
      "Monu Saini is a Python Developer and AI Automation Engineer based in Jaipur, India. Specializing in Python backend development, Django, Flask, FastAPI, AI agents, n8n, MCP, REST APIs, AWS and automation.",
    type: "profile",
    images: [
      {
        url: "/images/monu-saini-python-developer.jpg",
        width: 1200,
        height: 800,
        alt: "Monu Saini, Python Developer and AI Automation Engineer",
      },
    ],
  },
};

const externalProfiles = [
  {
    platform: "GitHub (Primary)",
    handle: "Tech2Saini",
    url: "https://github.com/Tech2Saini",
    description: "Main open-source portfolio, production repositories, AI agent workflows & backend pipelines.",
    role: "Primary Developer Account",
    badge: "Active",
  },
  {
    platform: "GitHub (Commit Identity)",
    handle: "codesbird",
    url: "https://github.com/codesbird",
    description: "System engineering commit identity, CI/CD integrations & repository management.",
    role: "Engineering Commits",
    badge: "Verified Alias",
  },
  {
    platform: "GitHub (Research)",
    handle: "devmonusaini",
    url: "https://github.com/devmonusaini",
    description: "Experimental automation scripts, microservices research & prototypes.",
    role: "Research & Sandbox",
    badge: "Verified Alias",
  },
  {
    platform: "LinkedIn",
    handle: "monupydev",
    url: "https://www.linkedin.com/in/monupydev/",
    description: "Professional networking profile with 2,900+ followers, engineering posts & industry connections.",
    role: "Professional Network",
    badge: "2,900+ Followers",
  },
  {
    platform: "HackerRank",
    handle: "tech2saini",
    url: "https://www.hackerrank.com/profile/tech2saini",
    description: "Algorithms, Python problem-solving certifications, and data structures challenges.",
    role: "Skill Verification",
    badge: "Verified Profile",
  },
  {
    platform: "Freelancer",
    handle: "monusaini786",
    url: "https://www.freelancer.com/u/monusaini786",
    description: "Client deliverables, Python automation scripts, web scrapers & backend APIs.",
    role: "Client Deliverables",
    badge: "100% Satisfaction",
  },
  {
    platform: "Instagram",
    handle: "@mr.saini.ji_1",
    url: "https://www.instagram.com/mr.saini.ji_1/",
    description: "Public personal and lifestyle handle connecting authentic offline identity to online presence.",
    role: "Personal Identity",
    badge: "Public Profile",
  },
];

const mediaGallery = [
  {
    file: "monu-saini-python-developer.jpg",
    title: "Monu Saini — Python Developer",
    alt: "Monu Saini, Python Developer and AI Automation Engineer",
    badge: "Core Stack",
    description: "Official profile card highlighting Python 3, Django, Flask, FastAPI, AWS S3/EC2, and PostgreSQL.",
    dimensions: "1200 x 800 JPEG",
  },
  {
    file: "monu-saini-gniot.jpg",
    title: "Academic Footprint — GNIOT / AKTU",
    alt: "Monu Saini at GNIOT Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    badge: "MCA Alumni",
    description: "Master of Computer Applications credential card from Dr. A.P.J. Abdul Kalam Technical University (AKTU).",
    dimensions: "1200 x 800 JPEG",
  },
  {
    file: "monu-saini-profile.jpg",
    title: "Verified Developer Identity",
    alt: "Monu Saini Profile - Software Developer and AI Automation Specialist",
    badge: "Entity Card",
    description: "Comprehensive entity card reconciling aliases Tech2Saini, codesbird, devmonusaini, and monupydev.",
    dimensions: "1200 x 800 JPEG",
  },
  {
    file: "monu-saini-ai-automation-engineer.jpg",
    title: "AI Automation Engineer",
    alt: "Monu Saini AI Automation Engineer & Python Backend SDE",
    badge: "AI & Agents",
    description: "Autonomous agent workflows, n8n orchestration, WhatsApp Cloud API, and Model Context Protocol (MCP).",
    dimensions: "1200 x 800 JPEG",
  },
];

const canonicalProjects = [
  {
    id: "whatsapp-ai-agent",
    title: "Autonomous WhatsApp AI Agent for Blogging",
    slug: "/#projects",
    techStack: ["n8n", "Python", "WhatsApp Cloud API", "Google Blogger API", "REST APIs"],
    summary:
      "Autonomous AI agent workflow orchestrating the complete blog creation, editing, publishing, and deletion lifecycle to Google Blogger directly via WhatsApp chat messages.",
    impact: "Reduces publishing cycle from hours to sub-minute conversational actions.",
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detection & Fact-Checking System",
    slug: "/#projects",
    techStack: ["Python", "Django", "Django REST Framework", "XGBoost", "Gemini AI", "NLP"],
    summary:
      "Full-stack machine learning web application evaluating news headline authenticity with a 92.4% accuracy XGBoost model and real-time Google Gemini AI contextual cross-verification.",
    impact: "Real-time fact checking against verified journalistic sources.",
  },
  {
    id: "ksecure",
    title: "KSecure – Dark Patterns Recognition Chrome Extension",
    slug: "/#projects",
    techStack: ["JavaScript Manifest v3", "Python", "Flask", "Bernoulli Naive Bayes", "NLP"],
    summary:
      "Browser extension parsing DOM text in sub-50ms to classify deceptive e-commerce UI patterns (hidden charges, countdown scarcity, forced continuity) with severity warnings.",
    impact: "Real-time consumer protection against predatory e-commerce design.",
  },
  {
    id: "optimiseres-mcp",
    title: "Optimiseres – eCommerce Platform & MCP Automation",
    slug: "/#projects",
    techStack: ["Python", "Flask", "JavaScript", "Model Context Protocol (MCP)", "Vercel CI/CD"],
    summary:
      "Corporate marketing and service platform with in-house Model Context Protocol (MCP) integration allowing LLM agents to automate Walmart Seller Central and advertising workflows.",
    impact: "100% automated CI/CD deployment pipeline with frontier AI protocol integration.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://monusaini.dev/#monu-saini",
    name: "Monu Saini",
    alternateName: [
      "Tech2Saini",
      "monusaini786",
      "monupydev",
      "codesbird",
      "devmonusaini",
      "mr.saini.ji_1",
    ],
    jobTitle: "Python Developer & AI Automation Engineer",
    description:
      "Monu Saini is a Python Developer and AI Automation Engineer based in Jaipur, India. He specializes in Python backend development, Django, Flask, FastAPI, AI agents, n8n, MCP, REST APIs, AWS and automation.",
    url: "https://monusaini.dev/about",
    image: "https://monusaini.dev/images/monu-saini-python-developer.jpg",
    email: "monusainideveloper@gmail.com",
    telephone: "+91 8696807790",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "India",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
        alternateName: "AKTU / GNIOT (Greater Noida Institute of Technology)",
        url: "https://aktu.ac.in",
      },
      {
        "@type": "EducationalOrganization",
        name: "University of Rajasthan",
        alternateName: "Rajasthan University",
        url: "https://uniraj.ac.in",
      },
      {
        "@type": "EducationalOrganization",
        name: "IANT (Institute of Advance Network Technology)",
        url: "https://iantindia.com",
      },
    ],
    knowsAbout: [
      "Python",
      "Django",
      "Django REST Framework",
      "Flask",
      "FastAPI",
      "AI Agents",
      "n8n Workflows",
      "Model Context Protocol (MCP)",
      "REST APIs",
      "AWS",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Linux",
      "Machine Learning",
      "XGBoost",
      "Selenium Automation",
    ],
    sameAs: [
      "https://github.com/Tech2Saini",
      "https://github.com/codesbird",
      "https://github.com/devmonusaini",
      "https://www.linkedin.com/in/monupydev/",
      "https://www.hackerrank.com/profile/tech2saini",
      "https://www.freelancer.com/u/monusaini786",
      "https://www.instagram.com/mr.saini.ji_1/",
    ],
  };

  return (
    <div className="min-h-screen text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Schema.org Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Fixed Telemetry Navigation */}
      <TelemetryHeader data={personalInfo} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">ABOUT_MONU_SAINI</span>
        </nav>

        {/* 1. Explicit Identity & Hero Statement */}
        <section className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold uppercase tracking-wider">CANONICAL IDENTITY RECORD // TECH2SAINI</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Monu Saini —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">
                Python Developer &amp; AI Automation Engineer
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 font-normal">
              Building autonomous AI agents, Python backends, APIs and resilient automation systems.
            </p>
          </div>

          {/* Primary Canonical Quote Box */}
          <div className="p-6 rounded-2xl bg-term-card border-l-4 border-cyan-500 border border-term-border shadow-xl space-y-3">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Professional Bio &amp; Positioning</span>
            </div>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-medium">
              &ldquo;Monu Saini is a Python Developer and AI Automation Engineer based in Jaipur, India. He specializes in Python backend development, Django, Flask, FastAPI, AI agents, n8n, MCP, REST APIs, AWS and automation.&rdquo;
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Jaipur, Rajasthan &amp; New Delhi, India</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Immediate Full-Time Availability</span>
              <span>•</span>
              <span>Target: Noida, Gurugram, Delhi, Jaipur &amp; Remote</span>
            </div>
          </div>

          {/* Direct CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/monupydev/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-blue-950/60 text-blue-300 border border-blue-800/60 hover:bg-blue-900/60 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn (2,900+ Followers)</span>
            </a>

            <a
              href="https://github.com/Tech2Saini"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-slate-800/90 text-white border border-slate-700 hover:bg-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub (@Tech2Saini)</span>
            </a>

            <Link
              href="/#projects"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-all flex items-center gap-2 glow-emerald"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Production Projects</span>
            </Link>

            <a
              href="/llms.txt"
              target="_blank"
              className="px-4 py-2.5 rounded-lg bg-purple-950/50 text-purple-300 border border-purple-800/50 hover:bg-purple-900/50 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all font-mono"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>/llms.txt</span>
            </a>
          </div>
        </section>

        {/* 2. "Elsewhere on the Web" (Verified Identity Reconciler) */}
        <section id="elsewhere" className="space-y-6">
          <div className="border-b border-term-border pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>01. ELSEWHERE ON THE WEB</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-1">
                Verified digital aliases &amp; public profiles belonging to Monu Saini.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
              ENTITY_VERIFIED
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-term-border text-xs text-slate-400 leading-relaxed font-mono">
            <span className="text-cyan-400 font-bold">SEO &amp; AI Entity Reconciliation: </span>
            The handles <code className="text-slate-200">Tech2Saini</code>,{" "}
            <code className="text-slate-200">codesbird</code>,{" "}
            <code className="text-slate-200">devmonusaini</code>,{" "}
            <code className="text-slate-200">monupydev</code>,{" "}
            <code className="text-slate-200">monusaini786</code>, and{" "}
            <code className="text-slate-200">@mr.saini.ji_1</code> are officially authenticated aliases belonging to the same individual, Monu Saini.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalProfiles.map((p, idx) => (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-term-card border border-term-border hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-slate-300">{p.platform}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-cyan-300 transition-colors">
                      {p.badge}
                    </span>
                  </div>

                  <div className="text-base font-mono font-bold text-white flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
                    <span>{p.handle}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-cyan-400/80 pt-2 border-t border-slate-800/80">
                  Role: {p.role}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 3. Media & Professional Photo Gallery */}
        <section id="media" className="space-y-6">
          <div className="border-b border-term-border pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                <span>02. MEDIA &amp; PROFESSIONAL VISUAL FOOTPRINT</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-1">
                Public professional images and canonical visual assets for press, search engines &amp; speaking.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
              CANONICAL_MEDIA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaGallery.map((m, idx) => (
              <div
                key={idx}
                className="bg-term-card border border-term-border rounded-xl overflow-hidden shadow-lg flex flex-col group hover:border-emerald-500/50 transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-slate-950 border-b border-term-border overflow-hidden">
                  <Image
                    src={`/images/${m.file}`}
                    alt={m.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-slate-700 text-[10px] font-mono text-cyan-400">
                    {m.badge}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-slate-700 text-[10px] font-mono text-slate-400">
                    {m.dimensions}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between font-mono">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white font-mono">{m.title}</h3>
                    <p className="text-xs text-slate-400 font-sans">{m.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <code className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded truncate max-w-[240px]">
                      /images/{m.file}
                    </code>
                    <a
                      href={`/images/${m.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <span>View Asset</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Academic Background & University Entity Linkage */}
        <section id="education" className="space-y-6">
          <div className="border-b border-term-border pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <span>03. EDUCATION &amp; ACADEMIC INSTITUTIONS</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-1">
                Formal computer science degrees and networking certifications.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-400">
              ACADEMIC_CREDENTIALS
            </span>
          </div>

          <div className="space-y-4">
            {/* MCA */}
            <div className="p-5 rounded-xl bg-term-card border border-term-border space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Master of Computer Applications (MCA) — Software Engineering
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 flex-wrap">
                    <a
                      href="https://aktu.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-cyan-300 font-semibold"
                    >
                      <span>Dr. A.P.J. Abdul Kalam Technical University (AKTU)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-600">/</span>
                    <a
                      href="https://gniotgroup.edu.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-slate-300"
                    >
                      Greater Noida Institute of Technology (GNIOT)
                    </a>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-emerald-400 font-semibold">Sep 2023 – May 2025</div>
                  <div className="text-slate-400">CGPA: 7.5 / 10</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Specialized in Software Engineering, Advanced Database Systems, and Distributed Computing. Coursework emphasized Python backend design, Object-Oriented Software Engineering, Data Structures &amp; Algorithms, Docker containerization, and Machine Learning API integrations.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">#Monu Saini GNIOT</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">#Monu Saini MCA</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">#Monu Saini AKTU</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">Software Engineering</span>
              </div>
            </div>

            {/* BCA */}
            <div className="p-5 rounded-xl bg-term-card border border-term-border space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <a
                      href="https://uniraj.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-cyan-300 font-semibold"
                    >
                      <span>University of Rajasthan, Jaipur</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-emerald-400 font-semibold">Jul 2020 – Aug 2023</div>
                  <div className="text-slate-400">CGPA: 7.5 / 10</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Rigorous computer science foundational curriculum encompassing Object-Oriented Programming, Database Management Systems (SQL), Web Technologies, Operating Systems, and C/C++ architecture.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">#Monu Saini BCA</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">#Rajasthan University</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">OOPs &amp; DBMS</span>
              </div>
            </div>

            {/* Diploma IANT */}
            <div className="p-5 rounded-xl bg-term-card border border-term-border space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Diploma in Advanced Networking &amp; System Administration
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <a
                      href="https://iantindia.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-cyan-300 font-semibold"
                    >
                      <span>IANT (Institute of Advance Network Technology)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-emerald-400 font-semibold">Aug 2019 – Jul 2020</div>
                  <div className="text-slate-400">Grade: A</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Hands-on systems administration and infrastructure certifications including SCSU, Linux Server administration (Ubuntu/CentOS), Windows Server management, Cisco CCNA routing and switching, and computer hardware security.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">#Monu Saini IANT</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Linux Administration</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">CCNA Networking</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Production Systems & Individual Deep Links */}
        <section id="projects" className="space-y-6">
          <div className="border-b border-term-border pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>04. PRODUCTION SYSTEMS &amp; ARCHITECTURAL PROJECTS</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-1">
                Real-world autonomous AI pipelines, fact-checking systems &amp; backend microservices.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
              PORTFOLIO_PROJECTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {canonicalProjects.map((proj) => (
              <div
                key={proj.id}
                id={proj.id}
                className="p-5 rounded-xl bg-term-card border border-term-border hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-semibold">{proj.impact}</span>
                    <Link
                      href={proj.slug}
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </Link>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {proj.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 italic">
                  Written &amp; Engineered by Monu Saini — Python Developer &amp; AI Automation Engineer
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. AI Crawlers & LLM Transparency */}
        <section id="llms" className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-800/40 space-y-4 font-mono">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 text-purple-300 font-semibold text-sm">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>AI SEARCH &amp; LLM DISCOVERABILITY STANDARD</span>
              </div>
              <span className="text-xs text-purple-400 border border-purple-800/60 px-2 py-0.5 rounded bg-purple-950/60">
                STANDARDS_COMPLIANT
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              To guarantee seamless indexing by conversational agents, LLM search engines (Perplexity, ChatGPT Search, Claude, Google Gemini), and research web crawlers, a canonical plaintext summary file is exposed at <code className="text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded">/llms.txt</code>.
            </p>

            <div className="p-3 bg-black/60 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="text-slate-500"># Plaintext AI endpoint</div>
              <div>
                curl -s <span className="text-emerald-400">https://monusaini.dev/llms.txt</span>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="/llms.txt"
                target="_blank"
                className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>Read /llms.txt Specification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. Direct Contact / Hire Section */}
        <section className="p-8 rounded-2xl bg-term-card border border-term-border text-center space-y-6">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Accelerate Your Backend &amp; AI Systems?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Monu Saini is open to full-time Software Developer, Python Backend SDE, and AI Automation Engineer roles in Noida, Gurugram, Delhi, Jaipur, or Remote.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a
              href="mailto:monusainideveloper@gmail.com"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all flex items-center gap-2 glow-emerald"
            >
              <Mail className="w-4 h-4" />
              <span>monusainideveloper@gmail.com</span>
            </a>

            <a
              href="tel:+918696807790"
              className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>+91 8696807790</span>
            </a>

            <Link
              href="/#contact"
              className="px-4 py-2.5 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/60 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Direct Scheduling Form</span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer data={personalInfo} />
      </main>
    </div>
  );
}
