import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        mist: "var(--color-mist)",
        botanical: "var(--color-botanical)",
        carbon: "var(--color-carbon)",
        stone: "var(--color-stone)",
        clay: "var(--color-clay)"
      },
      borderRadius: {
        sm: "6px",
        md: "8px"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(23, 32, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
