import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          primary: "#D90416",
          primaryDark: "#A30010",
          secondary: "#FF6A00",
          accent: "#FFB000",
          background: "var(--background)",
          surface: "#FFFFFF",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        premium: "0 4px 24px rgba(217, 4, 22, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
        "premium-lg": "0 12px 40px rgba(217, 4, 22, 0.12), 0 4px 12px rgba(0,0,0,0.06)",
        glow: "0 0 40px rgba(255, 106, 0, 0.25)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
