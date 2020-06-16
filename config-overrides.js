const {
  override,
  useEslintRc,
  useBabelRc,
  enableEslintTypescript
} = require('customize-cra')

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  enableEslintTypescript(),
  config => {
    const stylusLoader = {
      test: /\.styl$/,
      use: ['style-loader', 'css-loader', 'stylus-loader']
    }
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
    oneOf.unshift(stylusLoader)
    return config
  }
)
