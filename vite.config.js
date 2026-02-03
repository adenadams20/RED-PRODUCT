import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/',

  server: {
    port: 5174,
    strictPort: true,

    proxy: {
      '/api': {
        target: 'https://backend-laravel.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
