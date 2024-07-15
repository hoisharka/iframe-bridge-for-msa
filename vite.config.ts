import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'example',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'example/index.html'),
        iframe: path.resolve(__dirname, 'example/iframe.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
