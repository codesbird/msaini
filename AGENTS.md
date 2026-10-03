# Project Memory & Agent Directives — Monu Saini Portfolio

This file serves as persistent workspace memory and operating guidelines for all agents working on this codebase.

## 👤 Profile & Context
- **Candidate**: Monu Saini (`tech2saini`)
- **Core Title**: Python Developer & AI Automation Engineer (Data Engineering | AI & Backend SDE | AWS | SQL)
- **Degrees**: Master of Computer Applications (MCA) from AKTU (2023–2025, CGPA 7.5), BCA from University of Rajasthan (2020–2023, CGPA 7.5), IANT Diploma (Grade A)
- **Target Roles**: Software Developer, Python Backend SDE, AI Automation Engineer
- **Preferred Locations**: Noida, Gurugram, Delhi, Jaipur, and Remote
- **Contact**: `monusainideveloper@gmail.com` | `+91 8696807790` | `linkedin.com/in/monupydev` | `github.com/tech2saini`
- **Git Commit Identity**: All commits in this repository must use:
  - Name: `codesbird`
  - Email: `hackingkali789@gmail.com`

## 🛠️ Stack & Architectural Principles
- **Framework**: Next.js 15 App Router, TypeScript, Tailwind CSS, React 19.
- **Theme**: Agentic Terminal & Telemetry (`#08090d` dark slate with cyan `#06b6d4` & emerald `#10b981` accents).
- **Header Directive**: Latency indicator and availability status are permanently excluded from header per user preference (`REGION: IN-NORTH` and `UPTIME: 99.98%` only).
- **Home Page Hero Layout**: Grid container inside `<main>` uses `items-baseline` (`align-items: baseline`) to align the Hero Bio and Terminal Emulator along their baseline.
- **Data Source**: Always maintain [`src/data/portfolio-data.ts`](./src/data/portfolio-data.ts) as the single source of truth for fallback data.
- **Cloud Persistence**:
  - **Firebase Realtime Database (RTDB)**:
    - Endpoint: `https://portfolio-35cfd-default-rtdb.asia-southeast1.firebasedatabase.app` (Singapore / `asia-southeast1`).
    - Server-side Admin SDK: [`src/lib/firebase-admin.ts`](./src/lib/firebase-admin.ts) using `firebase-admin` v14 modular imports (`firebase-admin/app` and `firebase-admin/database`).
    - API Route: [`src/app/api/portfolio/route.ts`](./src/app/api/portfolio/route.ts) with `GET` (read data), `POST` (update section), and `PUT` (one-click default data seeding).
    - Client-side listener: [`src/lib/firebase.ts`](./src/lib/firebase.ts) & [`src/lib/portfolio-service.ts`](./src/lib/portfolio-service.ts) with real-time UI synchronization and static fallback.
- **Dynamic Admin Dashboard & Sidebar Architecture**:
  - Dedicated CMS control panel at `/admin`.
  - **Layout**: Complete left-aligned, full-height sidebar (`w-72 xl:w-80 fixed inset-y-0 left-0 bg-term-bg border-r border-term-border`) with 8 navigation telemetry modules (`profile`, `metrics`, `projects`, `skills`, `timeline`, `ai`, `smtp`, `security`).
  - **Clean Sidebar**: Sidebar footer contains only the Sign Out button. Admin header contains only module title and external "View Site" link (`/about` and `/contact` links removed from admin side).
- **Admin Authentication, MFA & Security Gate**:
  - **Login Gate**: Admin login requires registered email (`monusainideveloper@gmail.com`) and password (default `monu2026` or custom via `securityConfig.customPassword`).
  - **Two-Factor Authentication (2FA / TOTP)**: Managed in **Tab 08: Security & MFA**. Supports standard TOTP (Google Authenticator, Microsoft Authenticator, Authy) with auto-generated scannable QR code (`qrcode`), Base32 secret key, live token tester, and 4 emergency single-use backup codes (`MONU-XXXX`).
  - **Forgot Password Recovery**: Self-service recovery workflow dispatching 6-digit expiring OTP codes via the configured SMTP mail relay (with local dev fallback and hardcoded emergency override `MONU-RECOVER-2026`).
  - **Auth Route Handler**: [`src/app/api/auth/route.ts`](./src/app/api/auth/route.ts) supporting `generate-mfa`, `verify-mfa`, `send-recovery-code`, and `reset-password`.
- **SMTP Mail Relay & Lead Routing**: Managed via [`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts) with `nodemailer`, live handshake diagnostics, and database fallback; configured via multi-section Accordion in CMS.
- **Dedicated SEO Routes**: Full-featured dedicated `/about` (with Schema.org `Person` JSON-LD, entity aliases, media gallery, and `/llms.txt`) and `/contact` (with `ContactPage` Schema.org and interactive scheduling).
- **File & Image Uploads**: **Vercel Blob Storage** (`@vercel/blob` via [`src/app/api/upload/route.ts`](./src/app/api/upload/route.ts) & `FileUpload.tsx`) with automatic local base64 fallback. Resume (`resumeUrl`) and avatar (`avatarUrl`) links persist across reloads.
- **AI Digital Twin**: Managed via [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts) with curated QA and semantic matching.
- **Interactive Terminal Resume NPM Package**: Maintained at [`cli/`](./cli/) under package name `tech2saini` with zero external runtime dependencies for instant execution via `npx tech2saini` and `npx tech2saini --connect --role=python-sde`.
