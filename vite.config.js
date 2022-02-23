const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wordle: resolve(__dirname, 'wordle/index.html')
      }
    },
	outDir: 'docs/'
  }
})