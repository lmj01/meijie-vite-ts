const {resolve} = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const rootPath: String = process.cwd()
// https://vitejs.dev/config/
export default defineConfig({
  root: rootPath,
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  resolve: {
    alias: [
      {find: '@', replacement: resolve(__dirname, 'src')}
  ],
  },
  logLevel: 'info', // 'info' | 'warn' | 'error' | 'silent'
  server: {
    port: 3001,
    strrictPort: false,
    proxy: {
      '/api': {
        target: 'localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
  build: {
    minify: false,
    rollupOptions: {
      // here make the entry.js guide to html file
      // used for multi pages
      main: resolve(__dirname, 'index.html') 
    }
  }
})

