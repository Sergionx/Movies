/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#63ADF2",
        secondary: "#304D6D",
        terciary1: "#82A0BC",
        terciary2: "#A7CCED",
        terciary3: "#545E75",
        
        
      }
    },
  },
  plugins: [],
}