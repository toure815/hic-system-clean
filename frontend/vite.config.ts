import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~backend/client': path.resolve(__dirname, './client'),
      '~backend': path.resolve(__dirname, '../backend'),
    },
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0',
    allowedHosts: ['hic-system.onrender.com', 'localhost'], // ✅ Render + local dev
  },
  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['hic-system.onrender.com', 'localhost'], // ✅ ensures access in Render
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // ✅ no unnecessary mapping in prod
    minify: true,     // ✅ ensures smaller build & faster load
  },
})

