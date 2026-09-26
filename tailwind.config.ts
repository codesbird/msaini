import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-space)", "Space Grotesk", "sans-serif"],
      },
      colors: {
        term: {
          bg: "#08090d",
          card: "#0d1017",
          cardHover: "#131824",
          border: "#1c2333",
          borderHighlight: "#2d3748",
          emerald: "#10b981",
          cyan: "#06b6d4",
          amber: "#f59e0b",
          purple: "#8b5cf6",
          blue: "#3b82f6",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-line": "glow 4s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
