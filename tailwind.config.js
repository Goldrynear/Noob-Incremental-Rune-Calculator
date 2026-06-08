/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        shell: {
          950: "#090b10",
          900: "#0f131b",
          850: "#141922",
          800: "#1a202b",
          700: "#252d3a",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 0, 0, 0.22)",
      },
    },
  },
  plugins: [],
};
