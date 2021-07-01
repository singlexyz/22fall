import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  base: './',
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/form/details': 'https://app.gter.net/',
      '/form/submit': 'https://app.gter.net/',
    }
  }
})
