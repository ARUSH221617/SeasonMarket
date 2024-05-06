/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#111827",
        light: "#F3F4F6",
        primary: "#F3F4F6",
        secondary: "#F3F4F6",
        accent: "#F3F4F6",
        success: "#F3F4F6",
        warning: "#F3F4F6",
        danger: "#F3F4F6",
        info: "#F3F4F6",
        background: "#F3F4F6",
        foreground: "#F3F4F6",
        muted: "#F3F4F6",
        card: "#F3F4F6",
        border: "#F3F4F6",
        input: "#F3F4F6",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
