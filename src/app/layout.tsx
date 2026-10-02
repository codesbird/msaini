import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monusaini.dev"),
  title: "Monu Saini // Python Developer & AI Automation Engineer",
  description:
    "Portfolio of Monu Saini — Python Developer, Automation Engineer, Data Engineering, and AI Backend SDE. Specializing in AI agent workflows, n8n, MCP, Django, Flask, and distributed APIs.",
  keywords: [
    "Monu Saini",
    "Python Developer",
    "Automation Engineer",
    "AI Agents",
    "n8n",
    "MCP",
    "Django",
    "Flask",
    "FastAPI",
    "Software Development Engineer",
    "SDE",
    "Tech2Saini",
  ],
  authors: [{ name: "Monu Saini", url: "https://www.linkedin.com/in/monupydev" }],
  openGraph: {
    title: "Monu Saini // Python Developer & AI Automation Engineer",
    description:
      "Transforming manual processes into autonomous, sub-second pipelines. Explore projects in AI agent orchestration, machine learning fact checking, and backend architectures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {children}
      </body>
    </html>
  );
}
