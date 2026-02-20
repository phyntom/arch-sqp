import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['electron']
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        external: ['electron']
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      react({
        jsxRuntime: 'automatic'
      }),
      tailwindcss()
    ],
    server: {
      watch: {
        usePolling: false,
        interval: 100
      },
      hmr: {
        overlay: true
      }
    }
  }
})
