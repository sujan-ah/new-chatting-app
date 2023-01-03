/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        purpal: "#11175D",
        primary: "#5F35F5",
        blue: "#03014C",
      },
      screens: {
        extsm: "412px",
      },
    },
  },
  plugins: [],
};
