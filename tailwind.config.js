/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"]
      },
      colors: {
        primary: "#5046e4",
        secondary: "#c4cffa",
        gradientFrom: "#7e22ce",
        gradientTo: "#2563eb",
      }
    },
  },
  plugins: [],
}

