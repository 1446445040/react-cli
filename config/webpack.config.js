const Config = require('webpack-chain')
const paths = require('./paths')
const setModule = require('./modules')
const setPlugins = require('./plugins')
const setResolve = require('./resolve')

const config = new Config()
const isDev = process.env.NODE_ENV === 'development'

config.entry('app')
  .add(`${paths.srcPath}/index.js`)
  .end()

config.mode(isDev ? 'development' : 'production')

config.output
  .path(paths.outputPath)
  .publicPath(paths.publicPuth)

if (!isDev) {
  config.devtool('cheap-module-source-map')
  config.output
    .filename('js/[name].[contenthash:8].js')
    .chunkFilename('js/[name].[contenthash:8].js')
} else {
  config.devtool('cheap-module-eval-source-map')
  config.output
    .filename('js/[name].[hash].js')
    .chunkFilename('js/[name].[hash].js')
}

config.devServer
  .quiet(true)
  .clientLogLevel('none') // 客户端控制台不输出日志
  .overlay(true) // 直接将错误显示到网页上
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
setResolve(config)

module.exports = config.toConfig()
