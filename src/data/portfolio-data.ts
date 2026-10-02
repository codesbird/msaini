import { Project, Experience, Education, SkillCategory, DigitalTwinQA, PersonalInfo, SmtpConfig, AdminSecurityConfig } from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Monu Saini",
  handle: "tech2saini",
  pronouns: "He/Him",
  title: "Python Developer & AI Automation Engineer",
  subtitle: "Data Engineering | AI & Backend SDE | AWS | SQL | APIs & CI/CD",
  statusBadge: "OPEN TO SOFTWARE DEVELOPER ROLES",
  availabilityStatus: "AVAILABLE_IMMEDIATELY",
  openToRoles: ["Software Developer", "Python Developer", "Backend SDE", "AI Automation Engineer"],
  preferredLocations: ["Noida", "Gurugram", "Delhi", "Jaipur", "Remote"],
  location: "Jaipur, Rajasthan & New Delhi, India",
  email: "monusainideveloper@gmail.com",
  phone: "+91 8696807790",
  linkedin: "https://www.linkedin.com/in/monupydev",
  github: "https://github.com/tech2saini",
  yearsOfExp: "2+",
  aiProjectsCount: "10+",
  clientSatisfaction: "100%",
  followersCount: "2,900+",
  bio: "MCA graduate and Software Developer with 2+ years of hands-on experience building reliable Python backends, autonomous AI agent workflows (n8n, MCP, WhatsApp API), and data-driven web applications. Passionate about transforming manual processes into autonomous, sub-second pipelines.",
  resumeUrl: "",
};

export const projects: Project[] = [
  {
    id: "whatsapp-ai-agent",
    title: "Autonomous WhatsApp AI Agent for Blogging",
    tagline: "Instant Google Blogger generation & publishing directly from WhatsApp chats",
    category: "AI_AGENT",
    status: "FEATURED",
    date: "Sep 2025",
    description:
      "An autonomous n8n-powered WhatsApp AI agent workflow that automates the entire blog lifecycle. Users can generate article titles, write comprehensive multi-section posts, publish instantly to Google Blogger, and rewrite or delete live posts simply by texting commands over WhatsApp.",
    highlights: [
      "Zero-friction publishing pipeline turning hours of research and drafting into sub-minute WhatsApp chats",
      "Integrated with WhatsApp Cloud API webhooks, n8n orchestration graphs, and Google Blogger REST APIs",
      "Built-in intent parsing for drafting, reviewing, formatting Markdown, and managing live article state",
    ],
    techStack: ["n8n", "Python", "WhatsApp Cloud API", "Google Blogger API", "REST APIs", "LLM Orchestration"],
    metrics: {
      label: "Workflow Velocity",
      value: "Hours → Minutes (90% faster)",
    },
    links: {
      live: "https://lnkd.in/g3kSaMqX",
      github: "https://github.com/tech2saini",
    },
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detection & Fact-Checking System",
    tagline: "Machine Learning & Gemini AI cross-verification platform",
    category: "MACHINE_LEARNING",
    status: "PRODUCTION",
    date: "Dec 2024 – May 2025",
    description:
      "A machine-learning powered web application that analyzes news headlines and claims to flag disinformation. Combines NLP vectorization, an XGBoost classifier, and Google Gemini AI for contextual real-time cross-verification against trusted journalistic sources.",
    highlights: [
      "Architected backend in Django and Django REST Framework with secure user authentication and role management",
      "Engineered an NLP feature pipeline paired with an XGBoost classification model",
      "Integrated real-time fact-checking verification and interactive analytics dashboards",
    ],
    techStack: ["Python", "Django", "Django REST Framework", "XGBoost", "Gemini AI", "NLP", "JavaScript", "Bootstrap"],
    metrics: {
      label: "Model Accuracy",
      value: "92.4% Detection Accuracy",
    },
    links: {
      github: "https://github.com/tech2saini",
    },
  },
  {
    id: "ksecure-dark-patterns",
    title: "KSecure: Dark Patterns Recognition Chrome Extension",
    tagline: "Real-time NLP detection of deceptive UI patterns on eCommerce websites",
    category: "BROWSER_EXT",
    status: "ACTIVE",
    date: "Sep 2024 – Oct 2024",
    description:
      "A proactive security browser extension that inspects, classifies, and highlights manipulative 'dark patterns' (fake countdowns, disguised ads, hidden costs, forced continuity) on shopping websites to protect consumer privacy and decisions.",
    highlights: [
      "Engineered a lightweight Chrome Manifest v3 extension with real-time DOM token extraction",
      "Powered by a Flask NLP backend utilizing a Bernoulli Naive Bayes text classifier",
      "Visual indicators, severity classification badges, and categorized safety warnings via interactive popups",
    ],
    techStack: ["JavaScript", "Chrome Extension (Manifest v3)", "Python", "Flask", "Naive Bayes", "NLP", "HTML/CSS"],
    metrics: {
      label: "Classification Speed",
      value: "Sub-50ms Real-time DOM Analysis",
    },
    links: {
      github: "https://github.com/tech2saini",
    },
  },
  {
    id: "optimiseres-ecommerce",
    title: "Optimiseres: eCommerce Platform & MCP Automation",
    tagline: "Modern responsive web platform with automated CI/CD & MCP tooling",
    category: "ECOMMERCE",
    status: "ACTIVE",
    date: "Jun 2025 – Jul 2025",
    description:
      "Developed a modern marketing and service portal for an eCommerce consultancy, featuring dynamic service pages, portfolio galleries, animated counters, and in-house MCP (Model Context Protocol) integration for Walmart Seller Central & Ads management.",
    highlights: [
      "Built with Python, Flask, and JavaScript with automated Vercel–GitHub CI/CD deployment pipelines",
      "Collaborated on in-house MCP tooling enabling AI CLI agents to automate ad changes and seller central data collation",
      "Engineered responsive components, automated testimonial engines, and transactional email notification hooks",
    ],
    techStack: ["Python", "Flask", "JavaScript", "Bootstrap", "MCP (Model Context Protocol)", "GitHub Actions", "Vercel"],
    metrics: {
      label: "Deployment",
      value: "100% Automated CI/CD",
    },
    links: {
      live: "https://walmart.optimiseres.com",
      github: "https://github.com/tech2saini",
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Core",
    icon: "code",
    skills: [
      { name: "Python", level: "90%", badge: "Advanced" },
      { name: "JavaScript", level: "88%", badge: "Proficient" },
      { name: "SQL", level: "85%", badge: "Core" },
      { name: "C / C++", level: "75%", badge: "Academic" },
      { name: "Bash / Shell", level: "82%", badge: "Automation" },
      { name: "HTML5 / CSS3", level: "93%", badge: "Fluent" },
    ],
  },
  {
    title: "Backend & Web Frameworks",
    icon: "server",
    skills: [
      { name: "Django & DRF", level: "86%", badge: "Production" },
      { name: "Flask", level: "88%", badge: "Production" },
      { name: "FastAPI", level: "80%", badge: "Async" },
      { name: "RESTful APIs", level: "85%", badge: "Architecture" },
      { name: "React.js", level: "82%", badge: "Modern UI" },
      { name: "WebSockets & Webhooks", level: "78%", badge: "Event-Driven" },
    ],
  },
  {
    title: "AI, Agents & Machine Learning",
    icon: "sparkles",
    skills: [
      { name: "AI Agent Workflows (n8n)", level: "85%", badge: "Autonomous" },
      { name: "Model Context Protocol (MCP)", level: "80%", badge: "Frontier AI" },
      { name: "Google Gemini & Claude APIs", level: "84%", badge: "LLMs" },
      { name: "XGBoost & Scikit-learn", level: "78%", badge: "ML Models" },
      { name: "NLP & Text Processing", level: "80%", badge: "Classification" },
      { name: "NumPy & Pandas", level: "75%", badge: "Data Engineering" },
    ],
  },
  {
    title: "Cloud, DevOps & Databases",
    icon: "cloud",
    skills: [
      { name: "AWS (S3, EC2)", level: "75%", badge: "Cloud Infra" },
      { name: "PostgreSQL & MySQL", level: "82%", badge: "RDBMS" },
      { name: "SQLite & Firebase", level: "80%", badge: "Databases" },
      { name: "Docker & Containerization", level: "74%", badge: "DevOps" },
      { name: "Git & GitHub CI/CD", level: "85%", badge: "Version Control" },
      { name: "Linux Server (Ubuntu)", level: "84%", badge: "SysAdmin" },
    ],
  },
];

export const experienceData: Experience[] = [
  {
    role: "Python Developer & Automation Engineer",
    company: "Freelance / Self-Employed",
    type: "Freelance",
    period: "Jul 2023 – Present",
    location: "Jaipur, India / Global Clients",
    description: [
      "Engineered and deployed bespoke Python backends, RESTful microservices, and automation pipelines for international and domestic clients.",
      "Designed autonomous AI agent integrations utilizing n8n, WhatsApp Cloud API, and LLM APIs to eliminate repetitive manual workflows.",
      "Developed full-stack web applications with Django and Flask, incorporating database ORM optimizations, testing, and debugging to guarantee 100% client satisfaction.",
      "Built automated data scrapers, test suites with Selenium, and headless terminal utilities to streamline client operations.",
    ],
    skills: ["Python", "Django", "Flask", "n8n", "AI Agents", "AWS", "SQL", "Selenium", "Docker"],
  },
];

export const educationData: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    period: "Sep 2023 – May 2025",
    grade: "CGPA: 7.5 / 10",
    highlights: [
      "Specialization in Software Engineering, Advanced Database Systems, and Distributed Computing.",
      "Coursework: Python, OOPs, Data Structures & Algorithms, React, Docker, AI/ML Integration, DBMS.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Rajasthan, Jaipur",
    period: "Jul 2020 – Aug 2023",
    grade: "CGPA: 7.5 / 10",
    highlights: [
      "Core Foundations: Object-Oriented Programming, Database Management Systems, SQL, Web Technologies.",
    ],
  },
  {
    degree: "Diploma in Advanced Networking & System Administration",
    institution: "IANT (Institute of Advance Network Technology)",
    period: "Aug 2019 – Jul 2020",
    grade: "Grade: A",
    highlights: [
      "Certifications: SCSU, Linux Server, Windows Server, CCNA Networking, Computer Hardware & Security.",
    ],
  },
];

export const digitalTwinQA: DigitalTwinQA[] = [
  {
    question: "What is your hands-on experience with AI Agents and MCP?",
    answer:
      "I have built production-grade AI agent workflows, including an autonomous WhatsApp Agent powered by n8n that writes, edits, and publishes complete articles to Google Blogger via conversational commands. I also have practical experience with the Model Context Protocol (MCP), integrating it with LLMs like Claude and ChatGPT to automate Walmart Seller Central and advertising workflows.",
    keywords: ["agent", "mcp", "ai", "whatsapp", "n8n", "llm", "claude"],
  },
  {
    question: "What are your core backend frameworks and Python skills?",
    answer:
      "My primary backend stack is Python with Django, Django REST Framework, and Flask. I build clean RESTful APIs, manage authentication, database ORMs (PostgreSQL/MySQL/SQLite), and integrate background tasks. I emphasize test-driven development, edge-case debugging, and modular architecture.",
    keywords: ["python", "backend", "django", "flask", "api", "rest", "sql"],
  },
  {
    question: "What roles and locations are you open to?",
    answer:
      "I am actively seeking Software Developer, Python Developer, Backend SDE, and AI Automation Engineer roles. I am open to full-time opportunities in Noida, Gurugram, Delhi, Jaipur, as well as Remote positions globally.",
    keywords: ["role", "job", "location", "open to", "hiring", "delhi", "noida", "jaipur", "remote"],
  },
  {
    question: "Can you tell me about the Fake News Detection project?",
    answer:
      "The Fake News Detection System is a Django-powered web app built with machine learning. It uses NLP vectorization and an XGBoost classification model to evaluate news validity. It also incorporates Google Gemini AI to perform real-time contextual fact-checking against trusted sources, accompanied by user authentication and visual analytics dashboards.",
    keywords: ["fake news", "fact check", "xgboost", "machine learning", "gemini", "nlp"],
  },
  {
    question: "What is the KSecure Dark Patterns Chrome extension?",
    answer:
      "KSecure is a Chrome Manifest v3 extension designed to protect online shoppers. It parses DOM text in real time and sends it to a Flask NLP service powered by a Bernoulli Naive Bayes classifier. It identifies deceptive UI tactics—such as fake scarcity, forced continuity, and hidden charges—displaying severity warnings directly in the browser.",
    keywords: ["ksecure", "dark patterns", "extension", "chrome", "naive bayes"],
  },
  {
    question: "How can I contact or interview Monu?",
    answer:
      "You can email Monu directly at monusainideveloper@gmail.com, call +91 8696807790, or connect via LinkedIn at linkedin.com/in/monupydev. He is ready to join high-impact engineering teams immediately.",
    keywords: ["contact", "email", "phone", "interview", "hire", "reach"],
  },
];

export const defaultSmtpConfig: SmtpConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  user: process.env.SMTP_USER || "monusainideveloper@gmail.com",
  pass: process.env.SMTP_PASS || "",
  fromEmail: process.env.SMTP_FROM || "Monu Saini Portfolio <monusainideveloper@gmail.com>",
  toEmail: process.env.SMTP_TO || "monusainideveloper@gmail.com",
  enabled: process.env.SMTP_ENABLED === "true" || false,
};

export const defaultSecurityConfig: AdminSecurityConfig = {
  email: "monusainideveloper@gmail.com",
  customPassword: "",
  mfaEnabled: false,
  mfaSecret: "",
  mfaQrUrl: "",
  backupCodes: ["MONU-8941", "SAINI-2390", "DEV-5512", "GATE-7740"],
};
