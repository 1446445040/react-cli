const paths = require('./paths')

/**
 * @param{Config} config
 */
module.exports = config => {
  config
    .resolve
    .extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.json']).end()
    .alias.set('@', paths.srcPath)
}
