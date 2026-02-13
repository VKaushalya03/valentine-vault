/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ea2a33",
        "background-light": "#f8f6f6",
        "background-dark": "#211111",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
