import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://store-site-backend-static.ak.epicgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/get-games/, '/freeGamesPromotions?locale=uk-UA&country=UA&allowCountries=UA'),
      },
    },
  },
})