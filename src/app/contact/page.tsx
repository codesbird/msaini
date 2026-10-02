import type { Metadata } from "next";
import Link from "next/link";
import { TelemetryHeader } from "@/components/TelemetryHeader";
import { Footer } from "@/components/Footer";
import { personalInfo } from "@/data/portfolio-data";
import { ContactClientView } from "./ContactClientView";

export const metadata: Metadata = {
  title: "Contact Monu Saini // Python Developer & AI Automation Engineer",
  description:
    "Direct contact channels and interview scheduling for Monu Saini — Python Developer and AI Automation Engineer based in Jaipur and New Delhi. Open to full-time Software Developer, Backend SDE, and AI roles in Noida, Gurugram, Delhi, Jaipur, or Remote.",
  keywords: [
    "Contact Monu Saini",
    "Hire Monu Saini",
    "Monu Saini Email",
    "Monu Saini Phone",
    "Monu Saini WhatsApp",
    "Monu Saini LinkedIn",
    "Python Developer Interview",
    "Software Developer Noida",
    "Python Developer Delhi",
    "AI Automation Engineer Hire",
    "Tech2Saini Contact",
    "codesbird",
  ],
  authors: [{ name: "Monu Saini", url: "https://www.linkedin.com/in/monupydev" }],
  openGraph: {
    title: "Contact Monu Saini // Python Developer & AI Automation Engineer",
    description:
      "Direct contact channels and interview scheduling for Monu Saini. Available immediately for full-time Software Developer, Python Backend SDE, and AI Automation Engineer positions.",
    type: "website",
    url: "https://monusaini.dev/contact",
    images: [
      {
        url: "/images/monu-saini-python-developer.jpg",
        width: 1200,
        height: 800,
        alt: "Contact Monu Saini, Python Developer & AI Automation Engineer",
      },
    ],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Monu Saini",
    description:
      "Direct contact channels and interview scheduling form for Monu Saini, Python Developer & AI Automation Engineer.",
    url: "https://monusaini.dev/contact",
    mainEntity: {
      "@type": "Person",
      "@id": "https://monusaini.dev/#monu-saini",
      name: "Monu Saini",
      jobTitle: "Python Developer & AI Automation Engineer",
      email: personalInfo.email,
      telephone: personalInfo.phone,
      url: "https://monusaini.dev/",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "India",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Recruitment & Technical SDE Hiring",
          email: personalInfo.email,
          telephone: personalInfo.phone,
          availableLanguage: ["English", "Hindi"],
        },
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
    },
  };

  return (
    <div className="min-h-screen text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Schema.org ContactPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Top Fixed Telemetry Navigation */}
      <TelemetryHeader data={personalInfo} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">CONTACT_MONU_SAINI</span>
        </nav>

        {/* Interactive Contact View */}
        <ContactClientView info={personalInfo} />

        {/* Footer */}
        <Footer data={personalInfo} />
      </main>
    </div>
  );
}
