const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')
const env = require('./env')
const commonConfig = require('./common')

const devConfig = {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: env.port,
    quiet: true, // 不打印日志
    hot: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
