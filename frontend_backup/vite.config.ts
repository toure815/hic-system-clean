import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // ❗ REQUIRED for Render static hosting
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~backend/client': path.resolve(__dirname, './client'),
      '~backend': path.resolve(__dirname, '../backend'),
    },
  },

  plugins: [react()],

  // 🚀 Local Development
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0',
    allowedHosts: [
      'hic-system-clean.onrender.com',
      'localhost',
      '0.0.0.0',
      '.onrender.com',
    ],
  },

  // 🌐 Production Preview (Render)
  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['*'], // ← this MUST be '*'
  },

  // 🏗️ Production Build Config
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    assetsDir: 'assets',
  },
})

