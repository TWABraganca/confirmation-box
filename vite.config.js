import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'

const path = require('path')

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'ConfirmationBox',
      fileName: (format) => `confirmation-box.${format}.js`,
    },
  },
  rollupOptions: {
    external: ['vue'],
    output: {
      globals: {
        vue: 'Vue',
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
