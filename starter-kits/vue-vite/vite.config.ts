import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    vue(),
    coral({
      darkMode: 'class',
    }),
  ],
})
