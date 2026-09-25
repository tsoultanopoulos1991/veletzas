/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#1b1e22",
          soft: "#33383f",
          muted: "#5b6169",
        },
        sand: {
          DEFAULT: "#f6f0e6",
          dark: "#ece2cf",
          deep: "#dfd0b0",
        },
        cream: "#fffaf3",
        accent: {
          DEFAULT: "#c2712f",
          dark: "#9c5a24",
          light: "#e0954f",
          soft: "#f4e1cb",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(27, 30, 34, 0.35)",
        card: "0 10px 30px -12px rgba(27, 30, 34, 0.25)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)",
        "grain-light": "radial-gradient(circle at 1px 1px, rgba(255,250,243,0.12) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.85s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
