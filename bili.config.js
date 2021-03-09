module.exports = {
  input: 'src/index.js',
  plugins: {
    vue: { css: true },
  },
  output: {
    moduleName: 'confirmationBox',
    extractCSS: true,
    dir: 'lib',
    format: 'cjs',
  },
}
