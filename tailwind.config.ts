import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0d0d0d",
        ink: "#f7f7f2",
        muted: "#a7a29a",
        gold: "#d7b56d",
        champagne: "#f3e7c8",
        graphite: "#171717",
        midnight: "#10131b",
        amethyst: "#8b5cf6",
        cobalt: "#38bdf8",
        pine: "#2dd4bf",
        border: "rgba(255,255,255,0.12)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 80px rgba(0,0,0,0.42)",
        gold: "0 20px 60px rgba(215,181,109,0.15)"
      },
      backgroundImage: {
        "lux-hover": "linear-gradient(135deg, #8b5cf6, #38bdf8)",
        "metal-line":
          "linear-gradient(90deg, rgba(215,181,109,0.16), rgba(255,255,255,0.06), rgba(45,212,191,0.1))"
      }
    }
  },
  plugins: []
};

export default config;
