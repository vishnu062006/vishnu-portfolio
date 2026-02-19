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
        bg: {
          0: "#04060a",
          1: "#080c12",
          2: "#0c1018",
          3: "#10151f",
        },
        surface: "#141926",
        accent: "#3d7eff",
        cyan: "#22d3ee",
        "text-1": "#eef0f7",
        "text-2": "#8892a8",
        "text-3": "#3e4557",
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "sans-serif"],
        body: ["Cabinet Grotesk", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
        serif: ["Instrument Serif", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) both",
        pulse: "pulse 2s infinite",
        shimmer: "shimmer 4s linear infinite",
        blink: "blink 1s infinite",
        grain: "grainShift 0.5s steps(1) infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to: { backgroundPosition: "200% center" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        grainShift: {
          "0%":  { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(3%,1%)" },
          "30%": { transform: "translate(-1%,4%)" },
          "40%": { transform: "translate(2%,-2%)" },
          "50%": { transform: "translate(-3%,3%)" },
          "60%": { transform: "translate(1%,-1%)" },
          "70%": { transform: "translate(-2%,2%)" },
          "80%": { transform: "translate(3%,-3%)" },
          "90%": { transform: "translate(-1%,1%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
