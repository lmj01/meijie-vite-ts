const {resolve} = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // here make the entry.js guide to html file
      // used for multi pages
      main: resolve(__dirname, 'index.html') 
    }
  },
  plugins: [vue()]
})
