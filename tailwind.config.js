/** @type {import('tailwindcss').Config} */

const colors = {
  primary: {
    DEFAULT: "#FF6550",
    50: "rgba(255, 102, 80, 0.1)",
  },
  secondary: {
    DEFAULT: "#FF6C66",
    50: "rgba(255, 108, 102, 0.1)",
    75: "rgba(255, 108, 102, 0.15)",
    100: "rgba(255, 108, 102, 0.2)",
    200: "rgba(255, 108, 102, 0.3)",
    800: "rgba(255, 108, 102, 0.8)",
  },
};

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
