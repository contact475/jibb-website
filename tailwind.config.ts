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
        // Primary palette
        primary: "#00236f",
        "primary-container": "#1e3a8a",
        "on-primary": "#ffffff",
        "on-primary-container": "#90a8ff",
        "primary-fixed": "#dce1ff",
        "primary-fixed-dim": "#b6c4ff",

        // Secondary (Saffron/Orange)
        secondary: "#a73a00",
        "secondary-container": "#fd651e",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#571a00",
        "secondary-fixed": "#ffdbce",
        "secondary-fixed-dim": "#ffb599",

        // Tertiary
        tertiary: "#4c1439",
        "tertiary-container": "#672a50",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#e294bf",
        "tertiary-fixed": "#ffd8ea",
        "tertiary-fixed-dim": "#ffaeda",

        // Surface & Background
        background: "#faf8ff",
        "on-background": "#131b2e",
        surface: "#faf8ff",
        "on-surface": "#131b2e",
        "surface-variant": "#dae2fd",
        "on-surface-variant": "#444651",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "surface-bright": "#faf8ff",
        "surface-dim": "#d2d9f4",
        "surface-tint": "#4059aa",

        // Other
        outline: "#757682",
        "outline-variant": "#c5c5d3",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "inverse-surface": "#283044",
        "inverse-on-surface": "#eef0ff",
        "inverse-primary": "#b6c4ff",
      },
      fontFamily: {
        headline: ["'Playfair Display'", "serif"],
        body: ["Inter", "'Noto Sans JP'", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
