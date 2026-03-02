import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep React separate for better caching
          vendor: ['react', 'react-dom'],
          // Optional: Add Three.js to its own chunk since it's large
          three: ['three'],
        },
      },
    },
  },
})
