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
// note
// las medidades de respnsive 
// sm: Para pantallas de 640px o más.
// md: Para pantallas de 768px o más.
// lg: Para pantallas de 1024px o más.
// xl: Para pantallas de 1280px o más.
// 2xl: Para pantallas de 1536px o más.