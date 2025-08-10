/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
      },
      colors: {
        purple: {
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
