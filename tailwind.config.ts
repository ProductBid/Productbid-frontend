import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        pb: {
          bg: "var(--pb-bg)",
          card: "var(--pb-card)",
          border: "var(--pb-border)",
          primary: "var(--pb-primary)",
          "primary-soft": "var(--pb-primary-soft)",
          "text-primary": "var(--pb-text-primary)",
          "text-secondary": "var(--pb-text-secondary)",
          "text-muted": "var(--pb-text-muted)",
          "ticker-bg": "var(--pb-ticker-bg)",
          "hero-bg": "var(--pb-hero-bg)",
          "hero-price": "var(--pb-hero-price)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        card: "0 4px 20px -2px rgba(31, 27, 58, 0.05)",
        glow: "0 0 24px -4px rgba(91, 79, 232, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
