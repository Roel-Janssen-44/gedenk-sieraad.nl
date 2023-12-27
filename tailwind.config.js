/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.125rem",
        xs: "2rem",
      },
    },
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        primary: "#c79385",
        secondary: "#FAF3F4",
      },
    },
  },
  plugins: [],
};
