/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        red: "#C73B0F",
        rose900: "#260F08",
        rose500: "#87635A",
        rose400: "#AD8A85",
        rose300: "#CAAFA7",
        rose100: "#F5EEEC",
        rose50: "#FCF8F6",
        green: "#1EA575",
        black: "#000000",
        white: "#FFFFFF",
      },

      fontFamily: {
        primary: ["Red Hat Text", "sans-serif"],
      },
    },
  },
  plugins: [],
};
