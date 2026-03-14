import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        impressum: resolve(__dirname, 'src/impressum.html'),
        datenschutz: resolve(__dirname, 'src/datenschutz.html'),
      },
    },
  },
  publicDir: '../public',
})
