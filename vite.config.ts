import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    // Fix Tailwind not working
    postcss: {
      plugins: [tailwindcss()]
    },
    // Enable sourcemaps
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
