# Monu Saini // AI-Native SDE Portfolio

> **Production-grade Next.js 15 App Router portfolio** crafted with the **Agentic Terminal & Telemetry** aesthetic, tailored to Monu Saini's experience as a **Python Developer & AI Automation Engineer**.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Create Production Build
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Runtime**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom cyber-terminal design system (`#08090d` slate, emerald `#10b981`, and cyan `#06b6d4` glowing accents)
- **Typography**: Google Fonts (`Space Grotesk` & `JetBrains Mono`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Agent API**: Next.js App Router Route Handler (`/api/chat`) with intelligent semantic fallback

---

## ⚡ Core Features & Interactivity

1. **Live Telemetry Status Bar (`TelemetryHeader.tsx`)**:
   - Live system status: `DEV_AGENT::TECH2SAINI`, `STATUS: AVAILABLE_IMMEDIATELY`
   - Real-time latency fluctuation simulation (`14ms`)
   - Region: `IN-NORTH`, Uptime: `99.98%`
   - Quick navigation anchors (`ABOUT`, `PROJECTS`, `SKILLS`, `TIMELINE`, `AI_AGENT`, `HIRE_ME`)

2. **Interactive Bash CLI (`TerminalEmulator.tsx`)**:
   - Interactive terminal supporting real commands:
     - `whoami`: Monu's profile, qualifications, and focus
     - `skills`: Breakdown of Python, Django, n8n, MCP, AWS, SQL, and Docker
     - `projects`: Deep dive into production systems
     - `experience`: Professional freelance timeline and impacts
     - `education`: MCA (AKTU, 7.5 CGPA), BCA (RU, 7.5 CGPA), IANT Diploma
     - `contact`: Direct email, phone, location & LinkedIn
     - `hire`: Celebratory hire protocol launcher
     - `clear`: Clears the screen buffer
   - Command history navigation (Up / Down arrow keys)
   - Clickable quick-command chips

3. **"Ask Monu's Digital Twin" (`DigitalTwinChat.tsx`)**:
   - Simulated AI Agent Proxy trained on Monu's real background
   - Handles natural questions on:
     - Hands-on experience with AI Agent workflows & Model Context Protocol (MCP)
     - Core backend frameworks (Django, Flask, FastAPI)
     - Roles & preferred locations (Noida, Gurugram, Delhi, Jaipur, Remote)
     - Project specifics (WhatsApp AI Agent, Fake News Detector, KSecure Dark Patterns)
   - Realistic typing indicator with smart contextual synthesis

4. **Featured Production Systems (`ProjectsSection.tsx`)**:
   - **WhatsApp AI Agent for Autonomous Blogging** (n8n, WhatsApp Cloud API, Google Blogger)
   - **Fake News Detection & Fact-Checking System** (Django REST, XGBoost, Gemini AI)
   - **KSecure: Dark Patterns Recognition Chrome Extension** (Manifest v3, Flask, Naive Bayes)
   - **Optimiseres: eCommerce Platform & MCP Automation** (Python, Flask, MCP, CI/CD)

5. **Core Technical Matrix (`SkillsMatrix.tsx`)**:
   - Categorized skills with proficiency levels & badges
   - Dynamic tab filtering: `[ALL]`, `[BACKEND & PYTHON]`, `[AI & AGENTS]`, `[CLOUD & DEVOPS]`

6. **Experience & Education Timeline (`ExperienceTimeline.tsx`)**:
   - Detailed timeline of Monu's 2+ years as a Freelance Python Developer
   - Degrees from AKTU, University of Rajasthan, and IANT

7. **Direct Contact & Scheduling Portal (`ContactSection.tsx`)**:
   - One-click copy for email (`monusainideveloper@gmail.com`)
   - Direct call/WhatsApp link (`+91 8696807790`)
   - Interactive transmission form for interview inquiries

---

## 📁 Project Structure

```text
F:\Projects\Test Portfolio\
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts         # Digital Twin API route
│   │   ├── globals.css              # Cyber-terminal styling & scrollbars
│   │   ├── layout.tsx               # SEO Metadata & Font configs
│   │   └── page.tsx                 # Root dashboard assembly
│   ├── components/
│   │   ├── ContactSection.tsx       # Direct contact channels & inquiry form
│   │   ├── DigitalTwinChat.tsx      # Interactive AI Digital Twin Q&A
│   │   ├── ExperienceTimeline.tsx   # Professional & academic timeline
│   │   ├── Footer.tsx               # Terminal branding & footer links
│   │   ├── HeroSection.tsx          # Main headline, bio, and command prompt
│   │   ├── MetricsGrid.tsx          # Real impact metrics (10+ AI projects, 2+ yrs)
│   │   ├── ProjectsSection.tsx      # Detailed project cards with live links
│   │   ├── SkillsMatrix.tsx         # Filterable tech stack matrix
│   │   ├── TelemetryHeader.tsx      # Sticky telemetry bar
│   │   └── TerminalEmulator.tsx     # Full-featured Bash CLI
│   ├── data/
│   │   └── portfolio-data.ts        # Central data source for all content
│   └── types/
│       └── portfolio.ts             # TypeScript definitions
├── preview_templates/               # Preliminary template archives
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 🌐 Deploy to Vercel (1-Click)

The repository is fully configured for zero-config Vercel deployment:
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial AI-native SDE portfolio"
   git remote add origin https://github.com/tech2saini/portfolio.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com/) and click **Deploy**.
