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
    allowedHosts: ['hic-system.onrender.com'], // ✅ allow your live domain
  },
  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['hic-system.onrender.com'], // ✅ same for preview
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: false,
  },
})
