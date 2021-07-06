import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [reactRefresh()],
  base: './',
  server: {
    proxy: {
      '/form/22fallGroup/groupList': 'https://app.gter.net/',
      '/form/details': 'https://app.gter.net/',
      '/form/submit': 'https://app.gter.net/',
      '/form/22fallGroup/show': 'https://app.gter.net/',
    }
  }
})
