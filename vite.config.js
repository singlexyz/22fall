import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize'

export default defineConfig({
  plugins: [
    reactRefresh(),
    htmlMinimize({
      filter: /\.x?html?$/,
      minifierOptions: {
        collapseWhitespace: true,
        html5: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      }
    })
  ],
  base: 'https://oss.gter.net/static/form/',
  // base: './',
  server: {
    proxy: {
      '/form/22fallGroup/groupList': 'https://app.gter.net/',
      '/form/details': 'https://app.gter.net/',
      '/form/submit': 'https://app.gter.net/',
      '/form/22fallGroup/show': 'https://app.gter.net/',
    }
  }
})
