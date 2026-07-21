/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F1E6',
        cream: '#FBF7EF',
        oxblood: '#6B1E28',
        wine: '#3F0F17',
        gold: '#C9A227',
        'gold-light': '#E8D8A8',
        charcoal: '#2B2320',
        taupe: '#8A7A68',
        emerald: '#0B3D2E',
        terracotta: '#B5651D',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        editorial: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '6px',
      },
      boxShadow: {
        fabric: '0 8px 24px -6px rgba(43, 35, 32, 0.15), 0 2px 6px rgba(43, 35, 32, 0.08)',
      },
    },
  },
  plugins: [],
}
