const AutoPreFixer = require('autoprefixer')
const CssMinimizer = require('cssnano')

module.exports = {
  plugins: [
    AutoPreFixer,
    CssMinimizer({
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    })
  ]
}
