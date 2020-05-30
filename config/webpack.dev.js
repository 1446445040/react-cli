const { DefinePlugin } = require('webpack')
const portfinder = require('portfinder')
const merge = require('webpack-merge')
const env = require('./env')
const commonConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    quiet: true, // 不打印日志
    hot: true,
    clientLogLevel: 'error',
    overlay: true, // 是否将错误显示在网页中
    historyApiFallback: true,
    port: new Promise((resolve, reject) => {
      portfinder.getPort(
        { port: env.port, stopPort: env.port + 1000 },
        (err, port) => {
          if (!err) {
            console.log('项目运行端口：' + port)
            resolve(port)
          } else {
            reject(env.port)
          }
        }
      )
    })
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
