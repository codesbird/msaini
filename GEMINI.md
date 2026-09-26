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

---

## 🎨 Design & Architecture Preferences
- **Theme**: **Agentic Terminal & Telemetry** (Cyber-clean dark aesthetic: `#08090d` slate, emerald `#10b981`, and cyan `#06b6d4` glowing accents, `JetBrains Mono` and `Space Grotesk` typography).
- **Framework**: **Next.js 15 (App Router)** with **React 19**, **TypeScript**, and **Tailwind CSS**.
- **Header Preference**: **No latency indicator** in the telemetry header (keep clean `REGION: IN-NORTH` and `UPTIME: 99.98%` only).
- **Data Source**: Decoupled single source of truth in [`src/data/portfolio-data.ts`](./src/data/portfolio-data.ts) with real-time cloud synchronization via **Firebase Realtime Database** (`src/lib/firebase.ts` & `src/lib/portfolio-service.ts`).
- **Dynamic Admin Dashboard**: Accessible at `/admin` (passphrase protected: default `monu2026`) allowing live edits to Hero, Metrics, Projects, Skills, Timeline, and Digital Twin QA.
- **File & Image Storage**: **Vercel Blob Storage** (`@vercel/blob` integrated via `/api/upload` & `FileUpload.tsx`) for screenshots, PDFs, and assets.
- **AI Agent API**: Next.js App Router Route Handler at [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts) with intelligent semantic response synthesis.

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
