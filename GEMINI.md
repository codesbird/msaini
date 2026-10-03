# Monu Saini Portfolio — Project Memory & Agent Guidelines

## 👤 Profile & Identity
- **Name**: Monu Saini (Tech2Saini)
- **Pronouns**: He/Him
- **Current Roles**: Python Developer | Automation Engineer | Data Engineering | AI & Backend SDE | AWS | SQL
- **Education**:
  - MCA (Master of Computer Applications) - Software Engineering, Dr. A.P.J. Abdul Kalam Technical University (Sep 2023 – May 2025, CGPA 7.5)
  - BCA (Bachelor of Computer Applications), University of Rajasthan (Jul 2020 – Aug 2023, CGPA 7.5)
  - Diploma in Advanced Networking & System Administration, IANT (Aug 2019 – Jul 2020, Grade: A)
- **Location**: Jaipur, Rajasthan & Chhatarpur, New Delhi, India
- **Open to Roles**: Software Developer, Python Developer, Backend SDE, AI Automation Engineer
- **Preferred Locations**: Noida, Gurugram, Delhi, Jaipur, and Remote
- **Contact Details**:
  - Email: `monusainideveloper@gmail.com`
  - Phone: `+91 8696807790`
  - LinkedIn: `https://www.linkedin.com/in/monupydev` (2,900+ followers)
  - GitHub: `https://github.com/tech2saini`
- **Git Commit Identity**:
  - Name: `codesbird`
  - Email: `hackingkali789@gmail.com`

---

## 🎨 Design & Architecture Preferences
- **Theme**: **Agentic Terminal & Telemetry** (Cyber-clean dark aesthetic: `#08090d` slate, emerald `#10b981`, and cyan `#06b6d4` glowing accents, `JetBrains Mono` and `Space Grotesk` typography).
- **Framework**: **Next.js 15 (App Router)** with **React 19**, **TypeScript**, and **Tailwind CSS**.
- **Header Preference**: **No latency indicator and no availability status** in the telemetry header (keep clean `REGION: IN-NORTH` and `UPTIME: 99.98%` only).
- **Home Page Hero Layout**: Top hero grid inside `<main>` (`src/app/page.tsx`) uses `items-baseline` (`align-items: baseline`) for optimal visual balance between the Left Bio and Right Terminal Emulator.
- **Data Source**: Decoupled single source of truth in [`src/data/portfolio-data.ts`](./src/data/portfolio-data.ts) with real-time cloud synchronization via **Firebase Realtime Database** (`src/lib/firebase.ts` & `src/lib/portfolio-service.ts`).
- **Firebase Realtime Database Setup**:
  - Database URL: `https://portfolio-35cfd-default-rtdb.asia-southeast1.firebasedatabase.app` (Singapore / `asia-southeast1`)
  - Admin SDK Integration: [`src/lib/firebase-admin.ts`](./src/lib/firebase-admin.ts) using modular imports from `firebase-admin/app` & `firebase-admin/database` with automatic newline formatting for `FIREBASE_PRIVATE_KEY`.
  - API Controller: [`src/app/api/portfolio/route.ts`](./src/app/api/portfolio/route.ts) with `GET` (fetch data), `POST` (update section), and `PUT` (one-click default data seeding).
- **Dynamic Admin Dashboard & Sidebar Architecture**:
  - Dedicated CMS control panel at `/admin`.
  - **Layout**: Complete left-aligned, full-height sidebar (`w-72 xl:w-80 fixed inset-y-0 left-0 bg-term-bg border-r border-term-border`) with 8 navigation telemetry modules (`profile`, `metrics`, `projects`, `skills`, `timeline`, `ai`, `smtp`, `security`).
  - **Clean Navigation**: Sidebar footer contains only the Sign Out button. Admin header contains only module title and external "View Site" link (`/about` and `/contact` links removed from admin side).
- **Admin Authentication, MFA & Security Gate**:
  - **Login Gate**: Admin login requires registered email (`monusainideveloper@gmail.com`) and password (default `monu2026` or custom via `securityConfig.customPassword`).
  - **Two-Factor Authentication (2FA / TOTP)**: Managed in **Tab 08: Security & MFA**. Supports standard TOTP (Google Authenticator, Microsoft Authenticator, Authy) with auto-generated scannable QR code (`qrcode`), Base32 secret key, live token tester, and 4 emergency single-use backup codes (`MONU-XXXX`).
  - **Forgot Password Recovery**: Self-service recovery workflow dispatching 6-digit expiring OTP codes via the configured SMTP mail relay (with local dev fallback and hardcoded emergency override `MONU-RECOVER-2026`).
  - **Auth Route Handler**: [`src/app/api/auth/route.ts`](./src/app/api/auth/route.ts) supporting `generate-mfa`, `verify-mfa`, `send-recovery-code`, and `reset-password`.
- **SMTP Mail Relay & Lead Routing**: Managed via [`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts) with `nodemailer`, live handshake diagnostics, and database fallback; configured via multi-section Accordion in CMS.
- **Dedicated SEO Routes**: Full-featured dedicated `/about` (with Schema.org `Person` JSON-LD, entity aliases, media gallery, and `/llms.txt`) and `/contact` (with `ContactPage` Schema.org and interactive scheduling).
- **File & Image Storage**: **Vercel Blob Storage** (`@vercel/blob` integrated via `/api/upload` & `FileUpload.tsx`) for screenshots, PDFs, and assets, with local base64 fallback. Uploaded resume (`resumeUrl`) and avatar (`avatarUrl`) persist in Firebase and display view/download links.
- **AI Agent API**: Next.js App Router Route Handler at [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts) with intelligent semantic response synthesis.
- **Interactive Terminal Resume NPM Package**:
  - **Live Package**: Published on public npm registry at [`tech2saini`](https://www.npmjs.com/package/tech2saini) (maintainer `sainitech`).
  - **Source Location**: Managed inside [`cli/`](./cli/) with [`cli/bin/index.js`](./cli/bin/index.js), [`cli/package.json`](./cli/package.json), and [`cli/README.md`](./cli/README.md).
  - **Architecture**: Zero external runtime dependencies, pure Node.js ANSI styling, 4.7 kB lightweight tarball for sub-second execution via `npx tech2saini`.
  - **Supported CLI Flags**: `--connect` (direct contact channels), `--role=python-sde` (Python backend highlights), `--role=ai-engineer` (n8n/MCP highlights), `--json` (machine-readable data), `--help`.
  - **Publishing & Updates**: Run from `cli/` directory. Requires npm access token with write/publish permissions (or 2FA bypass): `npm publish --access public`. Bump version in `cli/package.json` for new releases.

---

## 🚀 Key Production Projects
1. **Autonomous WhatsApp AI Agent for Blogging**:
   - Stack: n8n, Python, WhatsApp Cloud API, Google Blogger API, LLM Orchestration.
   - Highlights: Complete blog generation, editing, publishing, and deletion via WhatsApp chat messages. Reduces research and publishing time from hours to minutes.
2. **Fake News Detection & Fact-Checking System**:
   - Stack: Python, Django, Django REST Framework, XGBoost Classifier, Gemini AI, NLP, Bootstrap.
   - Highlights: 92.4% detection accuracy, real-time contextual fact-checking against trusted journalistic sources.
3. **KSecure – Dark Patterns Recognition Chrome Extension**:
   - Stack: JavaScript (Manifest v3), Python, Flask, Bernoulli Naive Bayes, NLP.
   - Highlights: Real-time sub-50ms DOM parsing and classification of deceptive UI patterns on shopping websites.
4. **Optimiseres – eCommerce Platform & MCP Automation**:
   - Stack: Python, Flask, JavaScript, MCP (Model Context Protocol), Vercel CI/CD.
   - Highlights: Marketing portal with in-house Model Context Protocol (MCP) integration for Walmart Seller Central & Ads management.

---

## 💻 Tech Stack Guidelines
- **Languages**: Python 3.12, JavaScript (ESNext), SQL, C/C++, Bash, HTML5/CSS3.
- **Backends**: Django, Django REST Framework, Flask, FastAPI, Node.js.
- **AI & Automation**: n8n, Model Context Protocol (MCP), Gemini AI, Claude API, XGBoost, Scikit-learn, Selenium.
- **Cloud & DevOps**: AWS (S3, EC2), PostgreSQL, MySQL, SQLite, Docker, Git/GitHub CI/CD, Ubuntu Linux.
