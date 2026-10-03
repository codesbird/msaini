#!/usr/bin/env node

/**
 * tech2saini — Monu Saini's Interactive Terminal Card & Resume
 *
 * Runs via `npx tech2saini` or `npx tech2saini --connect --role=python-sde`
 * Built with zero external runtime dependencies for blazing-fast execution.
 */

const readline = require("readline");

// ANSI Styling Helpers
const reset = "\x1b[0m";
const bold = "\x1b[1m";
const dim = "\x1b[2m";
const italic = "\x1b[3m";
const underline = "\x1b[4m";

const cyan = "\x1b[36m";
const emerald = "\x1b[32m";
const yellow = "\x1b[33m";
const purple = "\x1b[35m";
const blue = "\x1b[34m";
const red = "\x1b[31m";
const white = "\x1b[37m";
const gray = "\x1b[90m";

// Bright variants
const bCyan = "\x1b[96m";
const bEmerald = "\x1b[92m";
const bWhite = "\x1b[97m";

// Parse CLI Flags
const args = process.argv.slice(2);
const flags = {
  connect: args.includes("--connect") || args.includes("-c"),
  json: args.includes("--json") || args.includes("-j"),
  help: args.includes("--help") || args.includes("-h"),
  role: null,
};

for (const arg of args) {
  if (arg.startsWith("--role=")) {
    flags.role = arg.split("=")[1].toLowerCase();
  }
}

// Data Payload
const profile = {
  name: "Monu Saini",
  handle: "tech2saini",
  title: "Python Developer & AI Automation Engineer",
  specialties: ["Data Engineering", "AI & Backend SDE", "AWS", "SQL", "n8n Agents", "MCP"],
  location: "Jaipur, Rajasthan & New Delhi, India",
  availability: "Immediately Available for Full-Time Roles",
  targetRoles: ["Software Developer", "Python Backend SDE", "AI Automation Engineer"],
  preferredLocations: ["Noida", "Gurugram", "Delhi", "Jaipur", "Remote"],
  contacts: {
    email: "monusainideveloper@gmail.com",
    phone: "+91 8696807790",
    linkedin: "https://www.linkedin.com/in/monupydev",
    github: "https://github.com/tech2saini",
    portfolio: "https://monusaini.dev",
  },
  education: [
    {
      degree: "MCA (Master of Computer Applications) - Software Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      period: "2023 – 2025",
      score: "CGPA 7.5",
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "University of Rajasthan",
      period: "2020 – 2023",
      score: "CGPA 7.5",
    },
    {
      degree: "Diploma in Advanced Networking & System Administration",
      institution: "IANT",
      period: "2019 – 2020",
      score: "Grade A",
    },
  ],
  skills: {
    languages: ["Python 3.12", "SQL", "JavaScript (ESNext)", "C/C++", "Bash"],
    frameworks: ["Django", "Django REST Framework (DRF)", "FastAPI", "Flask", "Node.js"],
    ai_automation: ["n8n Workflow Automation", "Model Context Protocol (MCP)", "Gemini AI", "Claude API", "XGBoost", "Scikit-learn", "Selenium"],
    cloud_devops: ["AWS (S3, EC2)", "Docker", "PostgreSQL", "MySQL", "SQLite", "Firebase RTDB", "Git / GitHub CI/CD", "Linux (Ubuntu)"],
  },
  projects: [
    {
      name: "Autonomous WhatsApp AI Agent for Blogging",
      stack: "n8n, Python, WhatsApp Cloud API, Google Blogger API, LLM Orchestration",
      description: "Generates, reviews, publishes, and deletes blog posts autonomously directly via WhatsApp chat messages. Reduces production time from 3 hours to minutes.",
    },
    {
      name: "Fake News Detection & Fact-Checking System",
      stack: "Python, Django, DRF, XGBoost, NLP, Gemini AI, Bootstrap",
      description: "Achieved 92.4% classification accuracy with real-time contextual fact verification against trusted journalistic sources.",
    },
    {
      name: "KSecure — Dark Patterns Recognition Chrome Extension",
      stack: "JavaScript (Manifest v3), Python, Flask, Bernoulli Naive Bayes, NLP",
      description: "Sub-50ms real-time DOM parsing and classification of deceptive UI patterns on e-commerce platforms.",
    },
    {
      name: "Optimiseres — eCommerce Platform & MCP Automation",
      stack: "Python, Flask, JavaScript, MCP (Model Context Protocol), Vercel CI/CD",
      description: "Marketing portal with in-house Model Context Protocol (MCP) integration for Walmart Seller Central & Ads management.",
    },
  ],
};

// Handle --json
if (flags.json) {
  console.log(JSON.stringify(profile, null, 2));
  process.exit(0);
}

// Handle --help
if (flags.help) {
  console.log(`
${bCyan}${bold}tech2saini${reset} — Monu Saini's Interactive Terminal Resume & Developer Card

${bold}USAGE:${reset}
  ${emerald}npx tech2saini${reset} [options]

${bold}OPTIONS:${reset}
  ${cyan}--connect${reset}, ${cyan}-c${reset}           Display direct contact channels (Email, Phone, LinkedIn, GitHub)
  ${cyan}--role=<role>${reset}         Filter overview by target role:
                        ${yellow}python-sde${reset}    (Python, Django, FastAPI, Backend & Databases)
                        ${yellow}ai-engineer${reset}   (n8n, MCP, LLMs, Agents & Automation)
  ${cyan}--json${reset}, ${cyan}-j${reset}              Output resume data in raw JSON format
  ${cyan}--help${reset}, ${cyan}-h${reset}              Show this help menu

${bold}EXAMPLES:${reset}
  ${gray}$${reset} npx tech2saini
  ${gray}$${reset} npx tech2saini --connect --role=python-sde
  ${gray}$${reset} npx tech2saini --role=ai-engineer
  ${gray}$${reset} npx tech2saini --json
`);
  process.exit(0);
}

// Clear screen or print clean top separator
console.log("");

// ASCII Art Logo
const banner = `
${bCyan}${bold}  ███╗   ███╗ ██████╗ ███╗   ██╗██╗   ██╗   ███████╗ █████╗ ██╗███╗   ██╗██╗
  ████╗ ████║██╔═══██╗████╗  ██║██║   ██║   ██╔════╝██╔══██╗██║████╗  ██║██║
  ██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║   ███████╗███████║██║██╔██╗ ██║██║
  ██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║   ╚════██║██╔══██║██║██║╚██╗██║██║
  ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝   ███████║██║  ██║██║██║ ╚████║██║
  ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝    ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝${reset}
`;

console.log(banner);

// Telemetry Status Bar
console.log(`  ${bEmerald}● ACTIVE${reset} ${gray}|${reset} ${purple}REGION: IN-NORTH${reset} ${gray}|${reset} ${yellow}UPTIME: 99.98%${reset} ${gray}|${reset} ${bCyan}DEV_AGENT::TECH2SAINI${reset}`);
console.log(`  ${gray}─────────────────────────────────────────────────────────────────────────────────${reset}`);

// Profile Header
console.log(`  ${bold}${bWhite}Monu Saini${reset}  ${gray}(@tech2saini)${reset}`);
console.log(`  ${bCyan}${profile.title}${reset}`);
console.log(`  ${dim}Data Engineering | AI & Backend SDE | AWS Cloud | SQL | Agentic Systems${reset}`);
console.log(`  ${gray}📍 ${profile.location}${reset}`);
console.log(`  ${emerald}🚀 ${profile.availability}${reset}`);

console.log(`  ${gray}─────────────────────────────────────────────────────────────────────────────────${reset}`);

// Role-Specific Highlights or Full Summary
if (flags.role === "python-sde") {
  console.log(`\n  ${yellow}${bold}[ FOCUSED VIEW: PYTHON BACKEND SDE ]${reset}`);
  console.log(`  ${white}Key Competencies:${reset} ${cyan}Python 3.12, Django, DRF, FastAPI, PostgreSQL, AWS, Docker, REST APIs${reset}`);
  console.log(`  ${white}Database & Architecture:${reset} ${dim}Relational schemas, ORM optimization, Redis caching, microservices${reset}`);
  console.log(`  ${white}Production Match:${reset} ${emerald}Fake News Detection API (Django+XGBoost), Optimiseres MCP Gateway${reset}`);
} else if (flags.role === "ai-engineer" || flags.role === "automation") {
  console.log(`\n  ${yellow}${bold}[ FOCUSED VIEW: AI AUTOMATION ENGINEER ]${reset}`);
  console.log(`  ${white}Key Competencies:${reset} ${cyan}n8n Orchestration, Model Context Protocol (MCP), Gemini AI, Claude API, NLP${reset}`);
  console.log(`  ${white}Agent Capabilities:${reset} ${dim}Autonomous multi-step tooling, WhatsApp bot triggers, content pipelines${reset}`);
  console.log(`  ${white}Production Match:${reset} ${emerald}Autonomous WhatsApp AI Agent for Blogging, KSecure Dark Pattern Detector${reset}`);
} else {
  // Full Skills Grid
  console.log(`\n  ${bCyan}${bold}⚡ CORE TECH STACK${reset}`);
  console.log(`  ${bold}Languages:${reset}     ${cyan}${profile.skills.languages.join(", ")}${reset}`);
  console.log(`  ${bold}Backends:${reset}      ${cyan}${profile.skills.frameworks.join(", ")}${reset}`);
  console.log(`  ${bold}AI & Auto:${reset}     ${emerald}${profile.skills.ai_automation.join(", ")}${reset}`);
  console.log(`  ${bold}Cloud/DevOps:${reset}  ${purple}${profile.skills.cloud_devops.join(", ")}${reset}`);
}

// Projects Showcase
console.log(`\n  ${bCyan}${bold}🛠️ FEATURED PRODUCTION PROJECTS${reset}`);
profile.projects.forEach((proj, index) => {
  console.log(`  ${yellow}${bold}${index + 1}. ${proj.name}${reset}`);
  console.log(`     ${gray}Stack:${reset} ${dim}${proj.stack}${reset}`);
  console.log(`     ${white}${proj.description}${reset}`);
});

// Education
console.log(`\n  ${bCyan}${bold}🎓 EDUCATION & CREDENTIALS${reset}`);
profile.education.forEach((edu) => {
  console.log(`  • ${bold}${edu.degree}${reset} (${edu.period})`);
  console.log(`    ${gray}${edu.institution} — ${emerald}${edu.score}${reset}`);
});

// Connect Channels
console.log(`\n  ${gray}─────────────────────────────────────────────────────────────────────────────────${reset}`);
console.log(`  ${bEmerald}${bold}📬 DIRECT CONNECT CHANNELS${reset}`);
console.log(`  ${bold}Email:${reset}     ${bCyan}${profile.contacts.email}${reset}`);
console.log(`  ${bold}Phone:${reset}     ${white}${profile.contacts.phone}${reset}`);
console.log(`  ${bold}LinkedIn:${reset}  ${blue}${underline}${profile.contacts.linkedin}${reset}`);
console.log(`  ${bold}GitHub:${reset}    ${purple}${underline}${profile.contacts.github}${reset}`);
console.log(`  ${bold}Portfolio:${reset} ${emerald}${underline}${profile.contacts.portfolio}${reset}`);
console.log(`  ${gray}─────────────────────────────────────────────────────────────────────────────────${reset}`);

// If --connect flag was passed, give a friendly confirmation
if (flags.connect) {
  console.log(`\n  ${bEmerald}✓ Connection endpoint resolved successfully.${reset}`);
  console.log(`  ${dim}Ready to schedule an interview or discuss Python Backend / AI Agent roles!${reset}\n`);
} else {
  console.log(`\n  ${gray}Tip: Run ${cyan}npx tech2saini --connect --role=python-sde${gray} for filtered telemetry.${reset}\n`);
}
