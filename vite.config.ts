const {resolve} = require('path')
import { defineConfig, UserConfig } from 'vite'
import { RollupOptions } from 'rollup';
import vue from '@vitejs/plugin-vue'
const rootPath: string = process.cwd() || '';
// https://vitejs.dev/config/
const currentRollupOption : RollupOptions = {
  // https://rollupjs.org/guide/en/#big-list-of-options
  // here make the entry.js guide to html file
  // used for multi pages
  input: {
    main: resolve(__dirname, 'index.html'),
    page1: resolve(__dirname, 'page1/index.html'),
  }
}

const currentConfig: UserConfig = {
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
  optimizeDeps: {
    include: ['axios'], // 包不会被预构建，即不使用ESM模块或类型
  },
  logLevel: 'info', // 'info' | 'warn' | 'error' | 'silent'
  server: {
    port: 3001,
    strictPort: true,
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
    // generate manifest.json in outDir
    manifest: true,
    minify: false,
    rollupOptions: currentRollupOption,
  }
}

export default defineConfig(({mode}) => {
  console.log('-mode-', mode)
  return currentConfig
})
