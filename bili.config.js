module.exports = {
  input: 'src/index.js',
  plugins: {
    vue: true,
  },
  output: {
    moduleName: 'confirmationBox',
    extractCSS: false,
    dir: 'lib',
    format: 'umd-min',
  },
}
