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
        cream: {
          DEFAULT: "#faf8f5",
          50: "#fdfcfb",
          100: "#faf8f5",
          200: "#f5f0ea",
          300: "#ebe3d8",
        },
        maple: {
          DEFAULT: "#d4213d",
          50: "#fef2f3",
          100: "#fde3e6",
          200: "#fcccd2",
          300: "#f9a0ab",
          400: "#f46d7e",
          500: "#d4213d",
          600: "#c01b35",
          700: "#a0122a",
          800: "#851326",
          900: "#721425",
        },
        sage: {
          DEFAULT: "#8ba888",
          50: "#f3f6f3",
          100: "#e3ebe2",
          200: "#c8d7c6",
          300: "#a3bca0",
          400: "#8ba888",
          500: "#618a5d",
          600: "#4c6e49",
          700: "#3d583b",
          800: "#334832",
          900: "#2b3c2a",
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
