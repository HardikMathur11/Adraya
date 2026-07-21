import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "var(--color-ivory)",
        cream: "var(--color-cream)",
        oxblood: "var(--color-oxblood)",
        wine: "var(--color-wine)",
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-light)",
        },
        charcoal: "var(--color-charcoal)",
        taupe: "var(--color-taupe)",
        emerald: "var(--color-emerald)",
        terracotta: "var(--color-terracotta)",
        accent: "var(--accent, #6B1E28)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        editorial: ["var(--font-editorial)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "6px",
      },
      boxShadow: {
        fabric: "0 8px 24px -6px rgba(43, 35, 32, 0.15), 0 2px 6px rgba(43, 35, 32, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
