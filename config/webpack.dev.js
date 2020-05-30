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
    hot: true,
    clientLogLevel: 'error',
    overlay: true // 是否将错误显示在网页中
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300, // 防抖
    poll: 1000
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
