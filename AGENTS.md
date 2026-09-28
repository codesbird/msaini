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
- **Header Directive**: Latency indicator is permanently excluded from header per user preference (`REGION: IN-NORTH` and `UPTIME: 99.98%` only).
- **Data Source**: Always maintain [`src/data/portfolio-data.ts`](./src/data/portfolio-data.ts) as the single source of truth for fallback data.
- **Cloud Persistence**:
  - **Firebase Realtime Database (RTDB)**:
    - Endpoint: `https://portfolio-35cfd-default-rtdb.asia-southeast1.firebasedatabase.app` (Singapore / `asia-southeast1`).
    - Server-side Admin SDK: [`src/lib/firebase-admin.ts`](./src/lib/firebase-admin.ts) using `firebase-admin` v14 modular imports (`firebase-admin/app` and `firebase-admin/database`).
    - API Route: [`src/app/api/portfolio/route.ts`](./src/app/api/portfolio/route.ts) with `GET` (read data), `POST` (update section), and `PUT` (one-click default data seeding).
    - Client-side listener: [`src/lib/firebase.ts`](./src/lib/firebase.ts) & [`src/lib/portfolio-service.ts`](./src/lib/portfolio-service.ts) with real-time UI synchronization and static fallback.
- **Dynamic Admin Dashboard**: Dedicated CMS control panel at `/admin` (passphrase protected: default `monu2026` via `ADMIN_PASSWORD` / `NEXT_PUBLIC_ADMIN_PASSWORD`) for live edits across all sections.
- **File & Image Uploads**: **Vercel Blob Storage** (`@vercel/blob` via [`src/app/api/upload/route.ts`](./src/app/api/upload/route.ts) & `FileUpload.tsx`) with automatic local base64 fallback.
- **AI Digital Twin**: Managed via [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts) with curated QA and semantic matching.
