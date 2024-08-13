import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    globals: true,
    setupFiles: './test/setup.js',
    environment: 'jsdom'
  }
})
