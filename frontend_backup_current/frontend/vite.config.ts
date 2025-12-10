import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      // ❌ Removed "~backend/client"
      // ❌ Removed "~backend"
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
    allowedHosts: [
      'hic-system.onrender.com',
      'localhost',
      '.onrender.com',
      '0.0.0.0',
    ],
  },

  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['*'],
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
  },
})

