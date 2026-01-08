import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@coralcss/core': path.resolve(__dirname, '../dist'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
