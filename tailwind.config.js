/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#EAB308', // Dortmund Yellow
        'dark': '#0F172A',
        'darker': '#020617',
      }
    },
  },
  plugins: [],
}
