import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import coral from '@coral-css/core/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    coral({
      darkMode: 'class',
    }),
  ],
})
