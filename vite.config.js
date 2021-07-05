import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  base: '/form/22fallGroup/',
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/form/22fallGroup/groupList': 'https://app.gter.net/',
      '/form/details': 'https://app.gter.net/',
      '/form/submit': 'https://app.gter.net/'
    }
  }
})
