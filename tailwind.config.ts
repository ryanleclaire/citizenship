import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a2744",
          50: "#f0f3f7",
          100: "#d9e0eb",
          200: "#b3c1d7",
          300: "#8da2c3",
          400: "#4d6a9a",
          500: "#2d4a72",
          600: "#1a2744",
          700: "#151f36",
          800: "#101828",
          900: "#0b101a",
        },
        red: {
          DEFAULT: "#E31837",
          50: "#fef2f3",
          100: "#fde3e6",
          200: "#fcccd2",
          300: "#f9a0ab",
          400: "#f46d7e",
          500: "#E31837",
          600: "#cc1530",
          700: "#a0112a",
          800: "#851326",
          900: "#721425",
        },
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
