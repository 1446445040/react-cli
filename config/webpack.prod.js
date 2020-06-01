const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        cache: true, // 文件缓存
        parallel: true, // 多进程压缩
        terserOptions: {
          compress: {
            collapse_vars: true, // 内嵌变量
            reduce_vars: true // 提取常量
          },
          output: {
            comments: false // 是否保留注释
          }
        }
      })
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    // 使用hash值作为模块id
    new HashedModuleIdsPlugin({
      hashDigest: 'hex'
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [/\.map$/, /hot-update\.js$/]
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
