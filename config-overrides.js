const {
  override,
  useEslintRc,
  useBabelRc,
  enableEslintTypescript,
  addWebpackModuleRule
} = require('customize-cra')

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  enableEslintTypescript(),
  addWebpackModuleRule({
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader']
  })
)
