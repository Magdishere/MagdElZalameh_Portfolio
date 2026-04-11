/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#888888",
        background: "#050505",
        secondary: "#AAAAAA",
        accent: "#111111",
      },
      gridTemplateColumns: {
        'dashboard': '250px 1fr',
      }
    },
  },
  plugins: [],
}
