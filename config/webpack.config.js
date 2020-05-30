const Config = require('webpack-chain')
const paths = require('./paths')
const setModule = require('./modules')
const setPlugins = require('./plugins')

const config = new Config()
const isDev = process.env.NODE_ENV === 'development'

config.entry('app')
  .add(paths.srcPath)
  .end()

config.mode(isDev ? 'development' : 'production')

config.output
  .path(paths.outputPath)
  .publicPath(paths.publicPuth)

if (!isDev) {
  config.output
    .filename('js/[name].[contenthash:8].js')
    .chunkFilename('js/[name].[contenthash:8].js')
} else {
  config.output
    .filename('js/[name].[hash].js')
    .chunkFilename('js/[name].[hash].js')
}

config.devServer
  .quiet(true)
  .clientLogLevel('error')
  .overlay(true)
  .historyApiFallback(true)

// 配合 Hoisting，优先采用es6 module语法，可使用启动参数 --display-optimization-bailout 查看降级处理的代码
config.resolve.mainFields.add('jsnext:main').add('browser').add('main')

config.optimization
  .splitChunks({
    cacheGroups: {
      // 提取node_modules
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial'
      },
      // 公共依赖
      common: {
        name: 'chunk-common',
        chunks: 'all',
        minSize: 20,
        minChunks: 2
      }
    }
  })

setModule(config)
setPlugins(config)

console.log(config.toString())

module.exports = config.toConfig()
