/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 20px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [],
};
