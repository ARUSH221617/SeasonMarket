/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "#FF6550",
  secondary: "#FF6C66",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  // prefix: 'tw-',
  darkMode: "class",
  plugins: [],
};
