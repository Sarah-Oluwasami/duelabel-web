import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Due Label brand (brand guidelines v1.0)
        navy: "#0B1F3B",
        blue: { DEFAULT: "#2563EB", dark: "#1D4FC4" },
        cyan: "#22D3EE",
        grey: "#F4F7FB",
        charcoal: "#111B27",
        muted: "#4B5B73",
        line: "#E3E9F2",
        mist: "#C8D3E6",
        ember: "#E8702A", // burnt orange: action moments only
        wa: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: { site: "1200px" },
      borderRadius: { card: "18px" },
    },
  },
  plugins: [],
};

export default config;
