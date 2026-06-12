import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      fontSize: {
        base: "14.5px",
      },
      colors: {
        accent: {
          DEFAULT: "#635BFF",
          soft: "#EEEDFF",
          text: "#5851E8",
        },
        teal: { DEFAULT: "#00B8AC" },
        gold: { DEFAULT: "#D4A017" },
        pink: { DEFAULT: "#E84393" },
        surface: {
          bg: "#F4F6FA",
          side: "#FFFFFF",
          card: "#FFFFFF",
          card2: "#F8F9FC",
        },
        ink: { DEFAULT: "#1A1F36" },
        muted: { DEFAULT: "#697386" },
        line: { DEFAULT: "#E3E8EE", strong: "#D5DCE6" },
        positive: { DEFAULT: "#0E8745", soft: "#E6F6EC" },
        negative: { DEFAULT: "#CD3D64", soft: "#FBE9EE" },
        warn: { DEFAULT: "#9A6700", soft: "#FFF4E0" },
        "gray-soft": { DEFAULT: "#F1F3F5" },
        fb: { DEFAULT: "#1877F2", soft: "#E7F0FE" },
        ig: { DEFAULT: "#D6336C", soft: "#FDEBF1" },
        border: "#E3E8EE",
        background: "#F4F6FA",
        foreground: "#1A1F36",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1F36",
        },
        primary: {
          DEFAULT: "#635BFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F8F9FC",
          foreground: "#1A1F36",
        },
        destructive: {
          DEFAULT: "#CD3D64",
          foreground: "#FFFFFF",
        },
        input: "#E3E8EE",
        ring: "#635BFF",
      },
      borderRadius: {
        card: "16px",
        badge: "6px",
        nav: "10px",
        lg: "16px",
        md: "10px",
        sm: "8px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,31,54,.06), 0 6px 20px rgba(26,31,54,.06)",
      },
      width: {
        sidebar: "248px",
        "sidebar-collapsed": "74px",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        "pulse-dot": {
          "0%": { boxShadow: "0 0 0 0 rgba(14,135,69,.3)" },
          "70%": { boxShadow: "0 0 0 7px rgba(14,135,69,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(14,135,69,0)" },
        },
      },
      animation: {
        rise: "rise 0.55s cubic-bezier(.2,.7,.3,1) forwards",
        "pulse-dot": "pulse-dot 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
