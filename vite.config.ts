import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const env = loadEnv('all', process.cwd())

export default defineConfig({
  plugins: [vuePlugin(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: env['VITE_SERVER_URL'],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
