const vue = require('rollup-plugin-vue')

module.exports = {
  input: 'src/index.js',
  css: true,
  plugins: [vue({ css: true })],
  outDir: 'lib',
}
