/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-custom': '#191624'
      },
      fontFamily: {
        body: ['DM Sans', 'san-serif']
      }
    }
  },
  plugins: []
}
