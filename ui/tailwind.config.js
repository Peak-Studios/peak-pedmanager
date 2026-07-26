/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peak: {
          bg: '#0d0f0e',
          surface: 'rgba(13, 15, 14, 0.96)',
          card: '#161917',
          border: 'rgba(255, 255, 255, 0.11)',
          accent: '#b8ff65',
          accentHover: '#a3f547',
          ink: '#f7f7f5',
          muted: '#a7aaa5',
          danger: '#ff6b65'
        }
      }
    },
  },
  plugins: [],
}
