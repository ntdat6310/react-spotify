/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-custom': '#191624',
        'black-custom-hover': '#302a45'
      },
      fontFamily: {
        body: ['DM Sans', 'san-serif']
      }
    }
  },
  plugins: []
}
