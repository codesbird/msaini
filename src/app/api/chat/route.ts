import { NextResponse } from "next/server";
import { digitalTwinQA, personalInfo, projects } from "@/data/portfolio-data";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const lower = message.toLowerCase();

    // 1. Check curated QA database for high-confidence keyword match
    for (const qa of digitalTwinQA) {
      if (
        lower.includes(qa.question.toLowerCase().slice(0, 15)) ||
        qa.keywords.some((k) => lower.includes(k))
      ) {
        return NextResponse.json({ reply: qa.answer });
      }
    }

    // 2. Project-specific queries
    for (const p of projects) {
      if (lower.includes(p.title.toLowerCase().slice(0, 8)) || lower.includes(p.id)) {
        return NextResponse.json({
          reply: `"${p.title}" (${p.date}): ${p.description} Tech Stack: ${p.techStack.join(
            ", "
          )}. Measurable Impact: ${p.metrics.value}.`,
        });
      }
    }

    // 3. Education / College queries
    if (lower.includes("education") || lower.includes("mca") || lower.includes("bca") || lower.includes("college") || lower.includes("degree")) {
      return NextResponse.json({
        reply: `${personalInfo.name} holds a Master of Computer Applications (MCA) from Dr. A.P.J. Abdul Kalam Technical University (Sep 2023 - May 2025, CGPA 7.5) and a BCA from the University of Rajasthan (CGPA 7.5), plus an Advanced Networking Diploma from IANT.`,
      });
    }

    // 4. Default contextual answer
    return NextResponse.json({
      reply: `Thanks for asking! Monu Saini is a Python Developer and AI Automation Engineer with 2+ years of experience in backend development, AI agent pipelines (n8n, MCP), and data engineering. He is actively seeking full-time Software Developer roles in Delhi NCR, Jaipur, or Remote. You can reach him at ${personalInfo.email} or call ${personalInfo.phone}.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        reply: "System notice: Digital Twin is running on static fallback mode. Monu is available for hire immediately!",
      },
      { status: 200 }
    );
  }
}
