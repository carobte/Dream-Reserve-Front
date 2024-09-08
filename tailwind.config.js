// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#276F62',
        'custom-green-opacity': '#276F62',
        'custom-green-form': '#276F62',
        'custom-navy-blue': '#ABF5E8',
        'custom-navy-blue-opacity': '#ABF5E8'
      },
    },
  },
  plugins: [],
}
